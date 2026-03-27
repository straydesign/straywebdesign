'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useClientEnv } from '@/lib/use-client-env';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  scrollLinked?: boolean;
}

function ScrollLinkedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ['0% 50%', '100% 50%']
  );

  return (
    <motion.span
      ref={ref}
      className={cn('bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: 'linear-gradient(90deg, var(--electric), var(--accent), var(--electric))',
        backgroundSize: '200% 100%',
        backgroundPosition,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </motion.span>
  );
}

export default function GradientText({
  children,
  className = '',
  animate = true,
  scrollLinked = false,
}: GradientTextProps) {
  const { mobile, reducedMotion: reduced } = useClientEnv();

  // On mobile or reduced motion: use CSS gradient animation (no framer-motion scroll hooks)
  if (scrollLinked && !reduced && !mobile) {
    return (
      <ScrollLinkedGradientText className={className}>
        {children}
      </ScrollLinkedGradientText>
    );
  }

  return (
    <span
      className={cn(animate && 'text-gradient-animated', className)}
      style={
        !animate
          ? {
              background: 'linear-gradient(135deg, var(--electric), var(--accent))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
