'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { VSL } from '@/lib/constants';

/**
 * The video at the top of the page — Tom introducing himself and what he'd do
 * for you, not a pitch.
 *
 * Until the file exists, this renders NOTHING. No placeholder frame, no
 * "coming soon", no play button that does nothing when pressed. A control that
 * promises something the build can't do is worse than an absent section, and
 * the page reads fine without it.
 *
 * To turn it on: drop the file in, set VSL.src in lib/constants, and add a
 * poster frame. Captions are burned into the video itself rather than served
 * as a track, because the player autoplays muted and almost nobody unmutes —
 * people read along instead.
 */
export default function Vsl() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!VSL.src) return null;

  function start() {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.currentTime = 0;
    void el.play();
    setPlaying(true);
  }

  return (
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
        onEnded={() => setPlaying(false)}
      />

      {/* One tap turns it into the real thing: sound on, from the top, with
          controls. Before that it's an ambient muted loop. */}
      {!playing && (
        <button
          type="button"
          onClick={start}
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
  );
}
