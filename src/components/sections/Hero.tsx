'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import WordReveal from '@/components/ui/WordReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimateIn from '@/components/ui/AnimateIn';
import LighthouseGauge from '@/components/ui/LighthouseGauge';

const GlassShatter = dynamic(() => import('@/components/ui/GlassShatter'), {
  ssr: false,
});

const LIGHTHOUSE_COMPARISONS = [
  {
    label: 'Your Competitors Right Now',
    scores: { performance: 32, accessibility: 45, bestPractices: 56, seo: 62 },
  },
  {
    label: 'After Stray Web Design',
    scores: { performance: 96, accessibility: 100, bestPractices: 100, seo: 100 },
  },
];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Defer GlassShatter — skip on mobile (kills TBT), defer on desktop
  const [showShatter, setShowShatter] = useState(false);
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Skip entirely on mobile — 100+ animated elements destroy TBT
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    if (hasIdleCallback) {
      const id = window.requestIdleCallback(() => setShowShatter(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(() => setShowShatter(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-navy"
      aria-label="Hero"
      data-navbar-dark
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(59,130,246,0.12),transparent),radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(139,92,246,0.08),transparent)]" />
        <div className="absolute inset-0 animate-[drift_20s_ease-in-out_infinite] bg-[radial-gradient(ellipse_50%_40%_at_60%_30%,rgba(59,130,246,0.06),transparent)]" />
      </div>

      {/* Glass shatter effect — deferred, skipped on mobile */}
      {showShatter && <GlassShatter delay={1.8} />}

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24"
        style={{ y, opacity }}
      >
        {/* Full-width headline */}
        <AnimateIn delay={0.1}>
          <span className="mb-4 inline-block rounded-xl border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-electric backdrop-blur-sm sm:rounded-full">
            For Practices, Dealerships &amp; Professional Services in Erie
          </span>
        </AnimateIn>

        <h1 className="text-balance font-display text-[clamp(2.25rem,7vw,5rem)] font-extrabold leading-[1.08] tracking-tight text-white">
          <WordReveal text="Shatter What You Thought Was Possible" delay={0.3} />
        </h1>

        {/* Two-column: copy + Lighthouse */}
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <AnimateIn delay={0.7}>
              <p className="max-w-lg text-lg leading-relaxed text-slate-300 md:text-xl">
                Enterprise-grade sites for practices, firms, and dealerships — at a fraction of the cost.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.9} className="mt-8">
              <MagneticButton href="#contact" variant="primary" size="lg">
                Get Free Audit
              </MagneticButton>
            </AnimateIn>
          </div>

          <AnimateIn direction="right" delay={0.5} className="hidden lg:block">
            <div className="space-y-8">
              {LIGHTHOUSE_COMPARISONS.map((comp, idx) => (
                <div
                  key={comp.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-md"
                >
                  <h2 className="mb-4 text-center font-display text-sm font-semibold text-slate-300">
                    {comp.label}
                  </h2>
                  <div className="flex justify-center gap-6">
                    <LighthouseGauge
                      score={comp.scores.performance}
                      label="Perf"
                      size={90}
                      delay={idx * 0.8 + 0.5}
                    />
                    <LighthouseGauge
                      score={comp.scores.accessibility}
                      label="A11y"
                      size={90}
                      delay={idx * 0.8 + 0.7}
                    />
                    <LighthouseGauge
                      score={comp.scores.bestPractices}
                      label="BP"
                      size={90}
                      delay={idx * 0.8 + 0.9}
                    />
                    <LighthouseGauge
                      score={comp.scores.seo}
                      label="SEO"
                      size={90}
                      delay={idx * 0.8 + 1.1}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </motion.div>
    </section>
  );
}
