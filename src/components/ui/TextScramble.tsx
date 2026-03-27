'use client';

import { useEffect, useState, useRef } from 'react';
import { useClientEnv } from '@/lib/use-client-env';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

interface TextScrambleProps {
  text: string;
  /** Delay before scramble starts (ms) */
  delay?: number;
  /** How long each character takes to resolve (ms) */
  speed?: number;
  className?: string;
}

export default function TextScramble({
  text,
  delay = 400,
  speed = 60,
  className = '',
}: TextScrambleProps) {
  const { reducedMotion } = useClientEnv();
  const [display, setDisplay] = useState(text);
  const resolved = useRef(false);

  useEffect(() => {
    if (reducedMotion || resolved.current) return;

    let frame: number;
    const chars = text.split('');
    const resolvedAt = chars.map(() => -1);
    let tick = 0;
    const totalTicks = chars.length * 3;

    const scramble = () => {
      tick++;
      const next = chars.map((char, i) => {
        // Each character resolves at a staggered point
        const resolveAt = Math.floor((i / chars.length) * totalTicks * 0.6) + 4;
        if (tick >= resolveAt) {
          if (resolvedAt[i] === -1) resolvedAt[i] = tick;
          return char;
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setDisplay(next.join(''));

      if (tick < totalTicks) {
        frame = window.setTimeout(scramble, speed);
      } else {
        setDisplay(text);
        resolved.current = true;
      }
    };

    // Start with random chars
    setDisplay(
      chars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );

    const timer = window.setTimeout(scramble, delay);

    return () => {
      clearTimeout(timer);
      clearTimeout(frame);
    };
  }, [text, delay, speed, reducedMotion]);

  return <span className={className}>{display}</span>;
}
