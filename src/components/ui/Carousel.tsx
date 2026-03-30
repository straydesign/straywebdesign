'use client';

import { useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

interface CarouselProps {
  items: ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  /** CSS color for the fade edges. Defaults to warm-white. */
  fadeColor?: string;
}

export default function Carousel({
  items,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  fadeColor,
}: CarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const animationName =
    direction === 'left' ? 'scroll-left' : 'scroll-right';

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-roledescription="carousel"
      aria-label="Auto-scrolling content"
    >
      {/* Pause / Play button — WCAG 2.2.2 */}
      <button
        type="button"
        onClick={() => setIsPaused((prev) => !prev)}
        aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
        className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center border border-border-default bg-surface-card text-text-secondary transition-colors hover:bg-surface-sunken hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {isPaused ? (
          <Play className="h-3.5 w-3.5" />
        ) : (
          <Pause className="h-3.5 w-3.5" />
        )}
      </button>

      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 md:w-32"
        style={{
          background: `linear-gradient(to right, ${fadeColor ?? 'var(--warm-white)'}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 md:w-32"
        style={{
          background: `linear-gradient(to left, ${fadeColor ?? 'var(--warm-white)'}, transparent)`,
        }}
      />
      <div
        className={`flex w-max gap-6 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {items.map((item, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden="true">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
