'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import MacBookFrame from '@/components/ui/MacBookFrame';
import { SITE } from '@/lib/constants';
import { useClientEnv } from '@/lib/use-client-env';

/* Hero — honest and forward: who I am, what I do, and the phone number +
   email right on the surface. */

function HeroBody() {
  return (
    <>
      <span className="mb-5 inline-flex items-center font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
        <span aria-hidden className="mr-1.5 text-accent/60">//</span>
        freelance web designer
      </span>

      <h1 className="text-balance font-display text-[clamp(2.2rem,5.4vw,4.1rem)] font-bold leading-[1.06] tracking-[-0.02em] text-text-primary">
        Hi, I&apos;m Tom.
        <br />
        I design and build websites for{' '}
        <span className="text-accent">consumer-facing businesses</span>.
      </h1>

      <div className="mt-6 max-w-xl">
        <p className="font-body text-lg leading-relaxed text-text-secondary md:text-xl">
          No agency and no account managers. You talk to me and I do the work.
          Every site below is real: open one and you&apos;re looking at an
          actual business&apos;s website that I built and still run.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2">
          <a
            href="tel:+18144028525"
            className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent md:text-xl"
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent md:text-xl"
          >
            {SITE.email}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <MagneticButton href="#work" variant="primary" size="lg">
            See the work
          </MagneticButton>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 font-body text-base font-medium text-text-primary underline-offset-4 hover:underline"
          >
            Start a project
            <span
              aria-hidden
              className="text-accent transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
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
      className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      style={{ y, opacity }}
    >
      <div>
        <HeroBody />
      </div>
      <div className="hidden lg:block">
        <MacBookFrame
          src="/images/work/andys.png"
          alt="Andy's Ale House — a site I designed, built, host, and manage"
          priority
        />
        <p className="mt-7 text-right font-mono text-[11px] uppercase tracking-[0.1em] text-text-tertiary">
          <span aria-hidden className="text-accent/60">// </span>
          live · andyspub.com
        </p>
      </div>
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
