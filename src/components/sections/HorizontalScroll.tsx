'use client';

import { useRef, type ReactNode, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';

interface HorizontalScrollProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode[];
  className?: string;
}

function HorizontalScrollAnimated({
  children,
  className = '',
  ...rest
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelCount = children.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(panelCount - 1) * 100}%`]
  );

  return (
    <section
      ref={containerRef}
      className={className}
      style={{ height: `${panelCount * 100}vh` }}
      {...rest}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          className="flex"
          style={{ x }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="flex h-screen w-screen flex-shrink-0 items-center justify-center px-8 md:px-16"
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalScrollStatic({
  children,
  className = '',
  ...rest
}: HorizontalScrollProps) {
  return (
    <section className={className} {...rest}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-5 md:px-8 max-w-7xl mx-auto py-16">
        {children.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </div>
    </section>
  );
}

export default function HorizontalScroll(props: HorizontalScrollProps) {
  if (isMobile() || prefersReducedMotion()) {
    return <HorizontalScrollStatic {...props} />;
  }
  return <HorizontalScrollAnimated {...props} />;
}
