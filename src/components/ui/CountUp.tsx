'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useClientEnv } from '@/lib/use-client-env';

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Mobile: vanilla JS count-up with IntersectionObserver */
function MobileCountUp({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className = '',
}: CountUpProps) {
  const { reducedMotion } = useClientEnv();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        if (reducedMotion) {
          setDisplay(value.toFixed(decimals));
          return;
        }

        const start = performance.now();
        const durationMs = duration * 1000;

        function animate(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / durationMs, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay((eased * value).toFixed(decimals));
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      },
      { rootMargin: '-50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Desktop: framer-motion spring-based count-up */
function DesktopCountUp({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
  className = '',
}: CountUpProps) {
  const { reducedMotion: reduced } = useClientEnv();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    motionValue.set(value);
  }, [isInView, value, motionValue, reduced, decimals]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function CountUp(props: CountUpProps) {
  const { mobile } = useClientEnv();
  if (mobile) {
    return <MobileCountUp {...props} />;
  }
  return <DesktopCountUp {...props} />;
}
