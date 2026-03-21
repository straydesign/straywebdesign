'use client';

import { type ReactNode, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/constants';

// Detect mobile once at module level to avoid blur filter perf hit
let _isMobile: boolean | null = null;
function isMobile(): boolean {
  if (_isMobile === null) {
    _isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  }
  return _isMobile;
}

type Direction = 'up' | 'down' | 'left' | 'right';

interface AnimateInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  distance?: number;
  once?: boolean;
  id?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export default function AnimateIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className,
  style,
  distance = 24,
  once = true,
  id,
}: AnimateInProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion)
    return (
      <div className={className} style={style} id={id}>
        {children}
      </div>
    );

  const offset = offsets[direction];
  const mobile = isMobile();
  return (
    <motion.div
      className={className}
      style={style}
      id={id}
      initial={{
        opacity: 0,
        ...(mobile ? {} : { filter: 'blur(4px)' }),
        x: offset.x * distance,
        y: offset.y * distance,
      }}
      whileInView={{
        opacity: 1,
        ...(mobile ? {} : { filter: 'blur(0px)' }),
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 24,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  const offset = offsets[direction];
  const mobile = isMobile();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          ...(mobile ? {} : { filter: 'blur(4px)' }),
          x: offset.x * distance,
          y: offset.y * distance,
        },
        visible: {
          opacity: 1,
          ...(mobile ? {} : { filter: 'blur(0px)' }),
          x: 0,
          y: 0,
          transition: { duration, ease: EASE_SMOOTH },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
