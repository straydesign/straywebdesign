'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';

interface ParallaxWindowProps {
  imageUrl: string;
  alt: string;
  height?: string;
  overlayOpacity?: number;
}

/** Desktop version with scroll-linked parallax */
function ParallaxWindowDesktop({
  imageUrl,
  alt,
  height = '60vh',
  overlayOpacity = 0.15,
}: ParallaxWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
        style={{ y, scale }}
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

      <div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

/** Mobile/reduced-motion version: static background */
function ParallaxWindowStatic({
  imageUrl,
  alt,
  height = '60vh',
  overlayOpacity = 0.15,
}: ParallaxWindowProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: '100%',
          }}
        />
      </div>
      <div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}

export default function ParallaxWindow(props: ParallaxWindowProps) {
  if (isMobile() || prefersReducedMotion()) {
    return <ParallaxWindowStatic {...props} />;
  }
  return <ParallaxWindowDesktop {...props} />;
}
