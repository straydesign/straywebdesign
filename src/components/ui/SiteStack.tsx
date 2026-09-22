'use client';

import { useEffect, useRef } from 'react';
import MacBookFrame from '@/components/ui/MacBookFrame';
import { PROOF } from '@/data/proof';

/* SiteStack — the four live sites, on four depth planes, tilting toward
   whoever is looking at them.

   This sits in the hero because the page claims to build engaging sites, and a
   claim like that has to be true of the first screen or it is just a sentence.
   The slot it fills was an empty div left behind when the intro video came off
   in September.

   It is the ONE heavy pattern on the page. Everything else here is still,
   deliberately — a second moving thing would make both of them noise.

   Three things keep it from costing what an effect like this usually costs:
   the tilt is written to a CSS custom property inside a requestAnimationFrame,
   never to React state, so a pointer sweep does not re-render four next/image
   trees; only the front card is priority; and under prefers-reduced-motion no
   listener is attached at all and the fan just sits there. */

/** Back to front. The last one is nearest the viewer and carries the LCP. */
const CARDS = PROOF.map((p) => ({ name: p.name, shot: p.shot }));

const MAX_TILT_X = 5; // degrees, nodding
const MAX_TILT_Y = 9; // degrees, turning

export default function SiteStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let frame = 0;

    const write = (rx: number, ry: number) => {
      stage.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      stage.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    };

    const schedule = (fn: () => void) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        fn();
      });
    };

    /* Fine pointer: the stack turns toward the cursor while it is over the
       hero, and settles back when it leaves. */
    const onPointerMove = (e: PointerEvent) => {
      schedule(() => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        write(-y * 2 * MAX_TILT_X, x * 2 * MAX_TILT_Y);
      });
    };
    const onPointerLeave = () => schedule(() => write(0, 0));

    /* Coarse pointer: there is no cursor to follow, so the scroll does it.
       The turn runs across the window rather than across the element, which
       keeps it moving the whole time the hero is on screen. */
    const onScroll = () => {
      schedule(() => {
        const r = wrap.getBoundingClientRect();
        const progress = (r.top + r.height / 2) / window.innerHeight - 0.5;
        const clamped = Math.max(-0.5, Math.min(0.5, progress));
        write(-clamped * 2 * MAX_TILT_X, clamped * 2 * MAX_TILT_Y);
      });
    };

    if (coarse) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } else {
      wrap.addEventListener('pointermove', onPointerMove);
      wrap.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-3xl"
      style={{ perspective: '1600px' }}
      aria-hidden={false}
    >
      {/* The aspect ratio holds the box open before the images decode, so the
          headline above never moves once they land. */}
      <div className="relative aspect-[5/3]">
        <div
          ref={stageRef}
          className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          }}
        >
          {CARDS.map((card, i) => (
            /* The fan runs mostly sideways. A first pass stepped 6.5% across
               and 7% down, which stacked them so squarely that the back three
               showed nothing but their address bars — four sites claimed,
               one site visible. Sideways is what makes each one readable. */
            <div
              key={card.name}
              className="absolute w-[64%]"
              style={{
                left: `${i * 12}%`,
                top: `${i * 4.5}%`,
                zIndex: i,
                transform: `translateZ(${i * 60}px) rotateY(-9deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <MacBookFrame
                src={card.shot}
                alt={`${card.name}, built and running`}
                priority={i === CARDS.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
