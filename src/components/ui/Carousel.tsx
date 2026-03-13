'use client';

import { type ReactNode } from 'react';

interface CarouselProps {
  items: ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function Carousel({
  items,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: CarouselProps) {
  const animationName =
    direction === 'left' ? 'scroll-left' : 'scroll-right';

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-roledescription="carousel"
      aria-label="Auto-scrolling content"
    >
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 md:w-32"
        style={{
          background:
            'linear-gradient(to right, var(--warm-white), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 md:w-32"
        style={{
          background:
            'linear-gradient(to left, var(--warm-white), transparent)',
        }}
      />
      <div
        className={`flex w-max gap-6 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ animation: `${animationName} ${speed}s linear infinite` }}
      >
        {items.map((item, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
