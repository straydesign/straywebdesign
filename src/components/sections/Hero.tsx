'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import WordReveal from '@/components/ui/WordReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimateIn from '@/components/ui/AnimateIn';
import LighthouseGauge from '@/components/ui/LighthouseGauge';
import PersonalizedText from '@/components/ui/PersonalizedText';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-slate-900 to-navy" />
  ),
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

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero"
      data-navbar-dark
    >
      {/* 3D WebGL Background */}
      <HeroScene />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24"
        style={{ y, opacity }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <AnimateIn delay={0.1}>
              <span className="mb-4 inline-block rounded-xl border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-electric backdrop-blur-sm sm:rounded-full">
                <PersonalizedText field="badge" fallback="For Practices, Dealerships & Professional Services in Erie" />
              </span>
            </AnimateIn>

            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              <WordReveal text="Websites That Outperform Your Competitors" delay={0.3} />
            </h1>

            <AnimateIn delay={0.7} className="mt-6">
              <p className="max-w-lg text-lg leading-relaxed text-slate-300 md:text-xl">
                <PersonalizedText field="subheadline" fallback="Enterprise-grade sites for practices, firms, and dealerships — at a fraction of the cost." />
              </p>
            </AnimateIn>

            <AnimateIn delay={0.9} className="mt-8">
              <MagneticButton href="#contact" variant="primary" size="lg">
                <PersonalizedText field="cta" fallback="Get Free Audit" />
              </MagneticButton>
            </AnimateIn>
          </div>

          {/* Right: Lighthouse Comparison */}
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
