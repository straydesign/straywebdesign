'use client';

import { type ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
};

/**
 * Page transition wrapper. Renders a plain div on the initial SSR + hydration
 * pass (no Framer Motion) to avoid hydration mismatches. After mount, subsequent
 * route navigations use motion.div for an entrance animation.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Skip animation on mobile / reduced motion
    const mobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!mobile && !reducedMotion) {
      setMounted(true);
    }
  }, []);

  // SSR + first hydration: plain div, no Framer Motion, zero mismatch risk
  if (!mounted) {
    return <div key={pathname}>{children}</div>;
  }

  // Client-side navigations: animate in
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
