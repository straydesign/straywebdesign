'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  scrollLinked?: boolean;
}

export default function GradientText({
  children,
  className = '',
  animate: _animate = true,
  scrollLinked: _scrollLinked = false,
}: GradientTextProps) {
  return (
    <span className={cn('text-accent', className)}>
      {children}
    </span>
  );
}
