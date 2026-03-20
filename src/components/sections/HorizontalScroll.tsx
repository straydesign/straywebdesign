'use client';

import { useRef, type ReactNode, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface HorizontalScrollProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode[];
  className?: string;
}

export default function HorizontalScroll({
  children,
  className = '',
  ...rest
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const panelCount = children.length;

  const { scrollYProgress } = useScroll({
    target: prefersReducedMotion ? undefined : containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(panelCount - 1) * 100}%`]
  );

  if (prefersReducedMotion) {
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
