'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxWindowProps {
  imageUrl: string;
  alt: string;
  height?: string;
  overlayOpacity?: number;
}

export default function ParallaxWindow({
  imageUrl,
  alt,
  height = '60vh',
  overlayOpacity = 0.15,
}: ParallaxWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height }}
      role="img"
      aria-label={alt}
    >
      <motion.div
        className="absolute inset-0"
        style={
          prefersReducedMotion
            ? undefined
            : { y, scale }
        }
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: '130%',
            top: '-15%',
          }}
        />
      </motion.div>

      {/* Subtle overlay for contrast with surrounding sections */}
      <div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
