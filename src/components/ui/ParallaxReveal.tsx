'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useClientEnv } from '@/lib/use-client-env';

interface ParallaxRevealProps {
  text: string;
  subtext?: string;
  className?: string;
  backgroundImage?: string;
}

export default function ParallaxReveal({ text, subtext, className = '', backgroundImage }: ParallaxRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mobile, reducedMotion: reduced } = useClientEnv();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <div
      ref={ref}
      className={`relative flex h-[50vh] items-center justify-center overflow-hidden bg-electric md:h-[60vh] ${className}`}
    >
      {/* Blink — photo lids that flash shut briefly to show the image */}
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Top lid — clips top half */}
          <div className="blink-lid-top absolute inset-x-0 top-0 h-1/2 origin-bottom overflow-hidden">
            <img
              src={backgroundImage}
              alt=""
              className="absolute top-0 left-0 h-auto w-full min-h-full object-cover object-center"
              style={{ minHeight: '200%' }}
            />
          </div>
          {/* Bottom lid — clips bottom half */}
          <div className="blink-lid-bottom absolute inset-x-0 bottom-0 h-1/2 origin-top overflow-hidden">
            <img
              src={backgroundImage}
              alt=""
              className="absolute bottom-0 left-0 h-auto w-full min-h-full object-cover object-center"
              style={{ minHeight: '200%' }}
            />
          </div>
        </div>
      )}

      {/* Content — highest layer */}
      {mobile || reduced ? (
        <div className="relative z-30 px-5 text-center">
          <p className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
            {text}
          </p>
          {subtext && (
            <p className="mx-auto mt-3 max-w-md text-base text-white/70">{subtext}</p>
          )}
        </div>
      ) : (
        <motion.div className="relative z-30 px-5 text-center" style={{ y, opacity }}>
          <p className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {text}
          </p>
          {subtext && (
            <p className="mx-auto mt-3 max-w-md text-lg text-white/70">{subtext}</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
