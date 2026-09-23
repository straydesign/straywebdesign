'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/* AnimateIn — the scroll reveal, and why it is built the way it is.

   This file was a no-op. It took a full props API — direction, delay,
   duration, distance, once — and rendered a bare div, so eighteen call sites
   across the page were asking for an entrance that never arrived. The props
   are unchanged; what follows is the behaviour they were always describing.

   NOTHING ALREADY ON SCREEN AT LOAD IS EVER HIDDEN.
     The usual version of this component renders its children transparent and
     waits for JavaScript to reveal them. Do that here and the hero headline —
     the page's LCP element — starts invisible and stays invisible until
     hydration. That is a measurable regression traded for an effect nobody
     can see, because the thing was already in the viewport.

     So the hidden state is applied at runtime rather than written into the
     markup, and only to elements that are BELOW THE FOLD when the page loads.
     Three things fall out of that for free: the server sends the visible
     state, so a reader without JavaScript gets the whole page; the hero never
     moves; and there is no flash, because useLayoutEffect runs before the
     browser paints.

   DIRECTION IS THE WAY IT TRAVELS, not the edge it comes from. `up` moves up
   into place from below, which is how every existing call site here means it,
   so `right` moves rightward from off to the left. Work reads each column's
   travel off which side it sits on, and the pair converges on the middle.

   Under prefers-reduced-motion nothing is armed at all: no transform, no
   observer, no transition. The element is simply there. */

type Direction = 'up' | 'down' | 'left' | 'right';

interface AnimateInProps {
  children: ReactNode;
  direction?: Direction;
  /** Seconds. Staggers a row of siblings. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
  /** Pixels travelled. Defaults to 24 vertical, 56 horizontal. */
  distance?: number;
  /** false re-hides the element when it leaves the viewport again. */
  once?: boolean;
  id?: string;
}

/** Unit vector of the START offset — the opposite of the way it travels. */
const FROM: Record<Direction, [number, number]> = {
  up: [0, 1],
  down: [0, -1],
  left: [1, 0],
  right: [-1, 0],
};

/* Decelerating, no overshoot. A spring on four stacked rows reads as wobble. */
const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

/* useLayoutEffect warns when React renders a client component on the server.
   What it wants to know is whether there is a DOM, and on the server there is
   nothing to measure anyway. */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function AnimateIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance,
  once = true,
  className,
  style,
  id,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  /* armed: this element is below the fold and motion is allowed, so it takes
     part. Until it is, the component renders exactly as it did before. */
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useBeforePaint(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!armed || !el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      /* A row starts moving once its top edge is a little past the fold, which
         puts the motion in the reader's path rather than behind them. */
      { rootMargin: '0px 0px -8% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [armed, once]);

  const hidden = armed && !shown;
  const [fx, fy] = FROM[direction];
  const d = distance ?? (direction === 'up' || direction === 'down' ? 24 : 56);

  const motion: CSSProperties = armed
    ? {
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translate3d(${fx * d}px, ${fy * d}px, 0)` : 'translate3d(0, 0, 0)',
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: hidden ? 'opacity, transform' : undefined,
      }
    : {};

  return (
    <div ref={ref} className={className} style={{ ...style, ...motion }} id={id}>
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance,
  duration,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  return (
    <AnimateIn className={className} direction={direction} distance={distance} duration={duration}>
      {children}
    </AnimateIn>
  );
}
