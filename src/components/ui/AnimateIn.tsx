'use client';

import { type ReactNode, type CSSProperties } from 'react';

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

export default function AnimateIn({
  children,
  className,
  style,
  id,
}: AnimateInProps) {
  return (
    <div className={className} style={style} id={id}>
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  return <div className={className}>{children}</div>;
}
