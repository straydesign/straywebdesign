'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { useClientEnv } from '@/lib/use-client-env';

function HeroBody() {
  return (
    <>
      <span className="mb-4 inline-block border border-border-strong bg-surface-card px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
        Pay only when it&apos;s working
      </span>

      <h1 className="text-balance font-mono text-[clamp(2.25rem,7vw,5rem)] font-bold leading-[1.08] tracking-tight text-text-primary">
        A website that brings you customers.{' '}
        <span className="text-text-tertiary">Built, hosted, and managed.</span>
      </h1>

      <div className="mt-8 max-w-xl">
        <p className="font-mono text-lg leading-relaxed text-text-secondary md:text-xl">
          Sub-1-second loads, page-one rankings, leads landing in your inbox.
          Hand-coded from scratch — no plugins, no platform fees, no surprises.
          I build it, host it, and keep it running.
        </p>

        <div className="mt-8 flex flex-col items-start gap-3">
          <MagneticButton href="#contact" variant="primary" size="lg">
            See what mine&apos;d be worth
          </MagneticButton>
          <p className="font-mono text-xs text-text-tertiary">
            <span className="font-semibold text-accent">$0 up front.</span>{' '}
            Pay only when it&apos;s live.
          </p>
        </div>
      </div>
    </>
  );
}

function HeroDesktop() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <motion.div
      className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24"
      style={{ y, opacity }}
    >
      <HeroBody />
    </motion.div>
  );
}

function HeroMobile() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16">
      <HeroBody />
    </div>
  );
}

export default function Hero() {
  const { mobile } = useClientEnv();

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-surface-page"
      aria-label="Hero"
    >
      {mobile ? <HeroMobile /> : <HeroDesktop />}
    </section>
  );
}
