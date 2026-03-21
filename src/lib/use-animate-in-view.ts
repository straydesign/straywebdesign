'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook for CSS-based entrance animations.
 * Used on mobile to replace framer-motion's whileInView, saving ~130KB JS.
 *
 * Returns a ref and a boolean `inView` that flips to true once (fire-once by default).
 */
export function useAnimateInView(options?: {
  once?: boolean;
  margin?: string;
}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;
  const margin = options?.margin ?? '-50px';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return [ref, inView];
}
