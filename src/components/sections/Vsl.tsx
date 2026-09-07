'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { VSL } from '@/lib/constants';

/**
 * The video at the top of the page — Tom answering eight questions about what
 * he'd do for you, not a pitch.
 *
 * Until the file exists, this renders NOTHING. No placeholder frame, no
 * "coming soon", no play button that does nothing when pressed. A control that
 * promises something the build can't do is worse than an absent section, and
 * the page reads fine without it.
 *
 * Captions are burned into the video itself rather than served as a track,
 * because the player autoplays muted and almost nobody unmutes — people read
 * along instead.
 *
 * Under the player: one chip per question. Tapping one unmutes, jumps there
 * and shows the controls, so someone who only cares about price or upkeep
 * gets that answer without sitting through the rest. The chip for the part
 * currently playing is filled, so the row doubles as a progress read.
 */
function stamp(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Vsl() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  if (!VSL.src) return null;

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

        {/* One tap turns it into the real thing: sound on, from the top, with
            controls. Before that it's an ambient muted loop. */}
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
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-body text-[13px] leading-none transition-colors ${
                active
                  ? 'border-text-primary bg-text-primary text-white'
                  : 'border-border-default bg-surface-card text-text-secondary hover:border-border-strong hover:text-text-primary'
              }`}
            >
              <span className={`tabular-nums ${active ? 'text-white/70' : 'text-text-tertiary'}`}>
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
