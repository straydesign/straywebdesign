'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/constants';
import StrayLogo from '@/components/ui/StrayLogo';
import GrainOverlay from '@/components/ui/GrainOverlay';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0.5, ease: EASE_SMOOTH },
      };

  const staggeredFadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.5, delay, ease: EASE_SMOOTH },
        };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-5">
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
        <motion.div {...fadeUp}>
          <a href="/" aria-label="Go to homepage">
            <StrayLogo color="#3B82F6" width={64} height={32} />
          </a>
        </motion.div>

        <motion.p
          className="mt-8 font-display text-sm font-semibold uppercase tracking-wider text-electric"
          {...staggeredFadeUp(0.1)}
        >
          Something went wrong
        </motion.p>

        <motion.h1
          className="mt-4 font-display text-3xl font-bold text-white md:text-4xl"
          {...staggeredFadeUp(0.2)}
        >
          We hit an unexpected error
        </motion.h1>

        <motion.p
          className="mt-4 max-w-md text-base leading-relaxed text-slate-400"
          {...staggeredFadeUp(0.3)}
        >
          Don&apos;t worry — it&apos;s not you. Try refreshing the page, or
          head back home and start fresh.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          {...staggeredFadeUp(0.4)}
        >
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-electric px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-electric/25 transition-all hover:bg-electric/90 hover:shadow-xl hover:shadow-electric/30"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-600 px-7 py-3.5 text-base font-semibold text-slate-300 transition-all hover:border-white hover:text-white"
          >
            Go home
          </a>
        </motion.div>
      </div>
    </div>
  );
}
