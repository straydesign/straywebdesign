'use client';

import { useRef, useState, useCallback, type ReactNode, type CSSProperties } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { playClick } from '@/lib/sounds';

function isInternal(href: string): boolean {
  return href.startsWith('/') || href.startsWith('#');
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  style,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);
    // Only activate magnetic pull within 80px of button center
    if (dist > 80) {
      setPosition({ x: 0, y: 0 });
      return;
    }
    const strength = 0.15 * (1 - dist / 80);
    setPosition({ x: distX * strength, y: distY * strength });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const handleClick = useCallback(() => {
    playClick();
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } catch {
      // Vibration not available
    }
    onClick?.();
  }, [onClick]);

  const variants = {
    primary:
      'bg-electric text-white hover:bg-electric/90 shadow-lg shadow-electric/25 hover:shadow-xl hover:shadow-electric/30',
    secondary:
      'bg-navy text-white hover:bg-navy/90 shadow-lg shadow-navy/25',
    ghost:
      'bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-6 py-3.5 text-base sm:px-9 sm:py-4.5 sm:text-lg',
  };

  const buttonClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {href && isInternal(href) ? (
        <Link href={href} className={buttonClasses} style={style} onClick={handleClick}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} className={buttonClasses} style={style} onClick={handleClick}>
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={handleClick}
          className={buttonClasses}
          style={style}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
