'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { VSL } from '@/lib/constants';

/**
 * The slot at the top of the page — Tom answering the questions people ask
 * before they say yes, not a pitch.
 *
 * Two modes, switched by VSL.video:
 *  - player off: one slide per question, his answers as text, blue on white.
 *    Arrows, the chip row and the keyboard all move between them.
 *  - player on: the video, autoplay muted with burnt-in captions, and a chip
 *    per chapter that unmutes and seeks.
 *
 * Until the video file exists the player mode renders NOTHING. A control that
 * promises something the build can't do is worse than an absent section.
 */
export default function Vsl() {
  /* Its own band since 2026-09-17. It used to sit inside the hero, between the
     headline and the button, which is the slot the work now leads with. At
     page level it has to bring its own width and padding — it was relying on
     the hero's container for both. */
  const inner = !VSL.video ? <Slides /> : VSL.src ? <Player /> : null;
  if (!inner) return null;
  return (
    <section className="border-b border-border-default bg-surface-page py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 md:px-8">{inner}</div>
    </section>
  );
}

const CHIP =
  'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-body text-[13px] leading-none transition-colors';
const CHIP_ON = 'border-accent bg-accent text-accent-ink';
const CHIP_OFF =
  'border-border-default bg-surface-card text-text-secondary hover:border-accent hover:text-accent';

/* ----- slides ---------------------------------------------------------- */

function Slides() {
  const [index, setIndex] = useState(0);
  const count = VSL.slides.length;
  const slide = VSL.slides[index];

  function go(next: number) {
    const wrapped = (next + count) % count;
    setIndex(wrapped);
    window.gtag?.('event', 'hero_slide', { slide: VSL.slides[wrapped].label, index: wrapped });
  }

  function onKey(e: KeyboardEvent<HTMLElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  }

  return (
    <div>
      <section
        aria-roledescription="carousel"
        aria-label="Questions people ask me before they say yes"
        tabIndex={0}
        onKeyDown={onKey}
        className="rounded-xl border border-border-default bg-white px-6 py-7 shadow-[0_20px_60px_rgba(16,18,22,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:px-12 md:py-10"
      >
        <div className="flex items-center justify-between gap-6">
          <p className="font-body text-sm tabular-nums text-accent">
            {index + 1} of {count}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous question"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-accent transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next question"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-accent transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Keyed on the index so the browser re-announces it as a new slide. */}
        <div key={index} aria-live="polite" className="mt-5 md:min-h-[19rem]">
          <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-accent md:text-3xl">
            {slide.q}
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {slide.a.map((line) => (
              <li
                key={line}
                className="flex gap-3 font-body text-base leading-relaxed text-accent md:text-lg"
              >
                <span aria-hidden className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav aria-label="Jump to a question" className="mt-3 flex flex-wrap gap-2">
        {VSL.slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => go(i)}
              aria-current={active ? 'true' : undefined}
              className={`${CHIP} ${active ? CHIP_ON : CHIP_OFF}`}
            >
              <span className={`tabular-nums ${active ? 'text-surface-page' : 'text-text-tertiary'}`}>
                {i + 1}
              </span>
              {s.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ----- player ---------------------------------------------------------- */

function stamp(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function Player() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  function start(at = 0) {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.currentTime = at;
    void el.play();
    setPlaying(true);
  }

  function jump(index: number) {
    const chapter = VSL.chapters[index];
    const el = videoRef.current;
    if (!chapter || !el) return;
    if (playing) {
      el.currentTime = chapter.t;
      void el.play();
    } else {
      start(chapter.t);
    }
    setCurrent(index);
    window.gtag?.('event', 'video_chapter', { chapter: chapter.label, index });
  }

  function follow() {
    const el = videoRef.current;
    if (!el) return;
    const t = el.currentTime;
    let index = 0;
    VSL.chapters.forEach((c, i) => {
      if (t >= c.t - 0.05) index = i;
    });
    if (index !== current) setCurrent(index);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-border-default bg-text-primary shadow-[0_20px_60px_rgba(16,18,22,0.16)]">
        {/* Captions are burnt into the file; the player autoplays muted and
            almost nobody unmutes, so people read along instead. */}
        <video
          ref={videoRef}
          className="aspect-video w-full"
          src={VSL.src}
          poster={VSL.poster}
          playsInline
          muted
          autoPlay
          loop={!playing}
          controls={playing}
          onTimeUpdate={follow}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            onClick={() => start(0)}
            className="absolute inset-0 flex items-center justify-center bg-text-primary/25 transition-colors hover:bg-text-primary/10"
            aria-label={VSL.label}
          >
            <span className="flex items-center gap-3 rounded-full bg-surface-card px-6 py-3.5 font-display text-base font-semibold text-text-primary shadow-lg">
              <Play className="h-4 w-4 fill-current" aria-hidden />
              {VSL.label}
            </span>
          </button>
        )}
      </div>

      <nav aria-label="Jump to a part of the video" className="mt-3 flex flex-wrap gap-2">
        {VSL.chapters.map((c, i) => {
          const active = i === current;
          return (
            <button
              key={c.t}
              type="button"
              onClick={() => jump(i)}
              aria-current={active ? 'true' : undefined}
              className={`${CHIP} ${active ? CHIP_ON : CHIP_OFF}`}
            >
              <span className={`tabular-nums ${active ? 'text-surface-page' : 'text-text-tertiary'}`}>
                {stamp(c.t)}
              </span>
              {c.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
