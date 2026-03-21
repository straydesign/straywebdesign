'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

// Use only opacity + y on mobile (filter: blur triggers expensive repaints)
const variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

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
