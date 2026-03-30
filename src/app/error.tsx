'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-surface-page px-5">
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
        <motion.div {...fadeUp}>
          <Link href="/" aria-label="Go to homepage">
            <StrayLogo color="#16a34a" width={64} height={32} />
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 font-mono text-sm font-semibold uppercase tracking-wider text-accent"
          {...staggeredFadeUp(0.1)}
        >
          Something went wrong
        </motion.p>

        <motion.h1
          className="mt-4 font-mono text-3xl font-bold text-text-primary md:text-4xl"
          {...staggeredFadeUp(0.2)}
        >
          We hit an unexpected error
        </motion.h1>

        <motion.p
          className="mt-4 max-w-md text-base leading-relaxed text-text-tertiary"
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
            className="inline-flex items-center justify-center bg-accent px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 border-border-strong px-7 py-3.5 text-base font-semibold text-text-tertiary transition-all hover:border-white hover:text-white"
          >
            Go home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
