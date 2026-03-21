'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
};

/**
 * Module-level flag: tracks whether the app has completed its first render.
 * Persists across component remounts (template.tsx remounts on every nav).
 *
 * CRITICAL for LCP: On the FIRST render (SSR + initial hydration), content must
 * be visible immediately — no opacity:0 initial state. The page transition
 * animation only fires on SUBSEQUENT route navigations (when pathname changes).
 */
let hasHydrated = false;

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  if (prefersReducedMotion()) {
    return <>{children}</>;
  }

  // Mobile: skip page transition entirely — no framer-motion needed
  if (isMobile()) {
    return <div key={pathname}>{children}</div>;
  }

  // First render: skip entrance animation to avoid LCP delay.
  // initial={false} tells framer-motion to start in the "enter" state (opacity:1).
  // Subsequent navigations: play the entrance animation normally.
  const skipInitial = !hasHydrated;
  hasHydrated = true;

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial={skipInitial ? false : 'hidden'}
      animate="enter"
      transition={{
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
