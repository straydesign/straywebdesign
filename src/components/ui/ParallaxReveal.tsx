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
      {/* Blink — top lid comes down, bottom lid comes up, image stays fixed */}
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            className="blink-lid-top absolute inset-x-0 top-0 h-1/2 origin-top"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
          />
          <div
            className="blink-lid-bottom absolute inset-x-0 bottom-0 h-1/2 origin-bottom"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
          />
        </div>
      )}

      {/* Content — glass card, z-10 so blink lids (z-20) cover it */}
      {mobile || reduced ? (
        <div className="relative z-10 px-5 text-center">
          <div className="inline-block rounded-2xl border border-white/20 bg-white/10 px-8 py-6 shadow-lg backdrop-blur-md">
            <p className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl">
              {text}
            </p>
            {subtext && (
              <p className="mx-auto mt-3 max-w-md text-base text-white/70">{subtext}</p>
            )}
          </div>
        </div>
      ) : (
        <motion.div className="relative z-10 px-5 text-center" style={{ y, opacity }}>
          <div className="inline-block rounded-2xl border border-white/20 bg-white/10 px-10 py-8 shadow-lg backdrop-blur-md">
            <p className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {text}
            </p>
            {subtext && (
              <p className="mx-auto mt-3 max-w-md text-lg text-white/70">{subtext}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
