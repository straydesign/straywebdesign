'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';

interface ParallaxRevealProps {
  /** The text to display over the parallax background */
  text: string;
  /** Optional subtext below the main text */
  subtext?: string;
  className?: string;
}

export default function ParallaxReveal({ text, subtext, className = '' }: ParallaxRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = isMobile();
  const reduced = prefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <div
      ref={ref}
      className={`relative flex h-[50vh] items-center justify-center overflow-hidden bg-slate-950 md:h-[60vh] ${className}`}
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,rgba(37,99,235,0.2),transparent),radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(37,99,235,0.1),transparent)]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      {mobile || reduced ? (
        <div className="relative z-10 px-5 text-center">
          <p className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
            {text}
          </p>
          {subtext && (
            <p className="mx-auto mt-3 max-w-md text-base text-slate-400">{subtext}</p>
          )}
        </div>
      ) : (
        <motion.div className="relative z-10 px-5 text-center" style={{ y, opacity }}>
          <p className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {text}
          </p>
          {subtext && (
            <p className="mx-auto mt-3 max-w-md text-lg text-slate-400">{subtext}</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
