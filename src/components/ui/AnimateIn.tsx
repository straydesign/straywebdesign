'use client';

import { type ReactNode, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/constants';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';
import { useAnimateInView } from '@/lib/use-animate-in-view';

type Direction = 'up' | 'down' | 'left' | 'right';

interface AnimateInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
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

const DIRECTION_KEYFRAMES: Record<Direction, string> = {
  up: 'css-fade-up',
  down: 'css-fade-down',
  left: 'css-fade-left',
  right: 'css-fade-right',
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
  const mobile = isMobile();
  const [mobileRef, inView] = useAnimateInView({ once: true, margin: '-50px' });

  // Reduced motion: render static
  if (prefersReducedMotion()) {
    return (
      <div className={className} style={style} id={id}>
        {children}
      </div>
    );
  }

  // Mobile: CSS animation + IntersectionObserver
  if (mobile) {
    const animationStyle: CSSProperties = inView
      ? {
          animation: `${DIRECTION_KEYFRAMES[direction]} ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s both`,
        }
      : { opacity: 0 };

    return (
      <div
        ref={mobileRef}
        className={className}
        style={{ ...style, ...animationStyle }}
        id={id}
      >
        {children}
      </div>
    );
  }

  // Desktop: framer-motion with blur filter
  const offset = offsets[direction];
  return (
    <motion.div
      className={className}
      style={style}
      id={id}
      initial={{
        opacity: 0,
        filter: 'blur(4px)',
        x: offset.x * distance,
        y: offset.y * distance,
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
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
  if (prefersReducedMotion() || isMobile()) {
    return <div className={className}>{children}</div>;
  }

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
  const mobile = isMobile();
  const [mobileRef, inView] = useAnimateInView({ once: true, margin: '-50px' });

  if (mobile) {
    const animationStyle: CSSProperties = inView
      ? {
          animation: `${DIRECTION_KEYFRAMES[direction]} ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) both`,
        }
      : { opacity: 0 };

    return (
      <div ref={mobileRef} className={className} style={animationStyle}>
        {children}
      </div>
    );
  }

  const offset = offsets[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          filter: 'blur(4px)',
          x: offset.x * distance,
          y: offset.y * distance,
        },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
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
