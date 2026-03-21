'use client';

import { useRef, type ReactNode, type CSSProperties } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { SPRING_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  noTilt?: boolean;
  glowColor?: string;
}

/** Mobile: lightweight static card (no framer-motion hooks) */
function TiltCardStatic({
  children,
  className = '',
  style,
}: TiltCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm md:p-8',
        className
      )}
      style={style}
    >
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/** Desktop: 3D tilt with spring physics */
function TiltCardDesktop({
  children,
  className = '',
  style,
  noTilt = false,
  glowColor = 'rgba(59, 130, 246, 0.15)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [6, -6]),
    SPRING_CONFIG.snappy
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-6, 6]),
    SPRING_CONFIG.snappy
  );
  const glossX = useTransform(mouseX, [0, 1], [0, 100]);
  const glossY = useTransform(mouseY, [0, 1], [0, 100]);

  const shouldTilt = !noTilt && !reduced;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shouldTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg md:p-8',
        className
      )}
      style={{
        perspective: '800px',
        ...(shouldTilt ? { rotateX, rotateY } : {}),
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {shouldTilt && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: useTransform(
              [glossX, glossY],
              ([x, y]) =>
                `radial-gradient(ellipse at ${x}% ${y}%, ${glowColor} 0%, transparent 70%)`
            ),
          }}
        />
      )}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function TiltCard(props: TiltCardProps) {
  if (isMobile()) {
    return <TiltCardStatic {...props} />;
  }
  return <TiltCardDesktop {...props} />;
}
