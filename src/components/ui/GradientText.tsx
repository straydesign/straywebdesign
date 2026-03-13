'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = '',
  animate = true,
}: GradientTextProps) {
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
