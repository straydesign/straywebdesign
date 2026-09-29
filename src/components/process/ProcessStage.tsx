'use client';

import { Canvas, useThree } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState, type RefObject } from 'react';
import type { StoryKey } from './lib/stories';

/*
 * The 3D stage behind a scroll-told section ("How I build your site", whose
 * step 6 carries the editor). Decoration only: every
 * word is in the server-rendered copy beside it, so this is aria-hidden and a
 * reader without it loses nothing but the demonstration.
 *
 * Nothing heavy loads until the section is a screen away. Under reduced motion
 * the library is never imported at all and the beats show their stills; the
 * same stills stand in when WebGL is missing or the context is lost (a lost
 * canvas paints white otherwise).
 */

const Scene = dynamic(() => import('./Scene'), { ssr: false });

/** Below this viewport width the reading line sits lower, under the half-height stage. */
const PHONE_MAX = 900;

/** Maps the reading line through each beat's anchors to a fractional formation index. */
function useScrollTarget(stage: RefObject<HTMLElement | null>, enabled: boolean) {
  const target = useRef(0);
  useEffect(() => {
    const section = stage.current?.closest('section');
    if (!enabled || !section) return;
    let anchors: { y: number; pose: number }[] = [];
    const measure = () => {
      anchors = [];
      section.querySelectorAll<HTMLElement>('[data-poses]').forEach((el) => {
        const poses = el.dataset.poses!.split(',').map(Number);
        const top = el.getBoundingClientRect().top + window.scrollY;
        const h = el.offsetHeight;
        poses.forEach((pose, i) => anchors.push({ y: top + (h * (i + 1)) / (poses.length + 1), pose }));
      });
    };
    const update = () => {
      if (!anchors.length) return;
      const line = window.scrollY + window.innerHeight * (window.innerWidth < PHONE_MAX ? 0.62 : 0.5);
      if (line <= anchors[0].y) return void (target.current = anchors[0].pose);
      const last = anchors[anchors.length - 1];
      if (line >= last.y) return void (target.current = last.pose);
      for (let i = 0; i < anchors.length - 1; i++) {
        const a = anchors[i];
        const b = anchors[i + 1];
        if (line < b.y) {
          const u = (line - a.y) / (b.y - a.y);
          // A short hold at each anchor; the change uses most of the scroll between.
          const t = Math.min(1, Math.max(0, (u - 0.1) / 0.8));
          target.current = a.pose + (b.pose - a.pose) * t;
          return;
        }
      }
    };
    const onResize = () => {
      measure();
      update();
    };
    onResize();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [stage, enabled]);
  return target;
}

/**
 * QA only (`?capture`): the render loop stops and the capture script steps it
 * with a fixed clock, so every recorded frame is exactly 1/60 s after the last.
 */
function CaptureClock() {
  const advance = useThree((s) => s.advance);
  useEffect(() => {
    const w = window as Window & { __advance?: (t: number) => void };
    w.__advance = (t) => advance(t);
    return () => void delete w.__advance;
  }, [advance]);
  return null;
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

type Mode = 'idle' | 'live' | 'capture' | 'still';

/**
 * QA params name the story they drive: `?capture` or `?still=N` drive the
 * process. `?capture=<key>` and `?still=N&story=<key>` would drive another.
 */
export default function ProcessStage({ story = 'process' }: { story?: StoryKey }) {
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('idle');
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(0);
  const target = useScrollTarget(stage, mode === 'live' || mode === 'capture');
  const stillTarget = useRef(0);

  useEffect(() => {
    const section = stage.current?.closest('section');
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const goStatic = () => section.classList.add('process--static');
    if (!webglAvailable()) return goStatic();

    const params = new URLSearchParams(window.location.search);
    const pose = params.get('still');
    if (pose !== null && (params.get('story') ?? 'process') === story) {
      stillTarget.current = Number(pose);
      setStill(Number(pose));
      setMode('still');
      return;
    }
    const capture = params.has('capture') && (params.get('capture') || 'process') === story;

    // Load once the section is a screen away; render only while it is on screen.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        setMode(capture ? 'capture' : 'live');
      },
      { rootMargin: '100% 0px 100% 0px' },
    );
    const seen = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    near.observe(section);
    seen.observe(section);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [story]);

  const onCreated = ({ gl }: { gl: { domElement: HTMLCanvasElement } }) => {
    gl.domElement.addEventListener('webglcontextlost', () => stage.current?.closest('section')?.classList.add('process--static'));
  };

  if (mode === 'still') {
    return (
      <div ref={stage} id={`${story}-still`} style={{ position: 'fixed', inset: '0 auto auto 0', width: 1200, height: 900, zIndex: 100 }} aria-hidden="true">
        <Canvas shadows dpr={1} camera={{ fov: 26, near: 0.1, far: 80 }} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}>
          <Suspense fallback={null}>
            <Scene key={still} story={story} target={stillTarget} still qa />
          </Suspense>
        </Canvas>
      </div>
    );
  }

  return (
    <div ref={stage} className="process__stage" aria-hidden="true">
      {mode !== 'idle' && (
        <div className="process__canvas">
          <Canvas
            frameloop={mode === 'capture' ? 'never' : inView ? 'always' : 'never'}
            shadows
            dpr={[1, Math.min(window.innerWidth < PHONE_MAX ? 1.75 : 2, window.devicePixelRatio)]}
            camera={{ fov: 26, near: 0.1, far: 80, position: [2, 4, 9] }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={onCreated}
          >
            {mode === 'capture' && <CaptureClock />}
            <Suspense fallback={null}>
              <Scene story={story} target={target} qa={mode === 'capture'} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
}
