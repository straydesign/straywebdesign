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

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  if (prefersReducedMotion()) {
    return <>{children}</>;
  }

  // Mobile: CSS page transition (no framer-motion execution)
  if (isMobile()) {
    return (
      <div key={pathname} className="css-page-transition">
        {children}
      </div>
    );
  }

  // Desktop: framer-motion
  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
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
