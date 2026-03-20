'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface LighthouseGaugeProps {
  score: number;
  label: string;
  size?: number;
  className?: string;
  delay?: number;
}

function getScoreColor(score: number): string {
  if (score >= 90) return '#0cce6b';
  if (score >= 50) return '#ffa400';
  return '#ff4e42';
}

export default function LighthouseGauge({
  score,
  label,
  size = 120,
  className = '',
  delay = 0,
}: LighthouseGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const [animatedScore, setAnimatedScore] = useState(0);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getScoreColor(score);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setAnimatedScore(score);
      return;
    }
    const start = performance.now();
    const duration = 1500;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }

    const timeout = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, score, delay, prefersReducedMotion]);

  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div ref={ref} className={`flex flex-col items-center gap-2 ${className}`} role="img" aria-label={`${label}: ${score} out of 100`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-2xl font-bold"
            style={{ color }}
          >
            {animatedScore}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
}
