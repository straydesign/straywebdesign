'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import WordReveal from '@/components/ui/WordReveal';
import CountUp from '@/components/ui/CountUp';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimateIn from '@/components/ui/AnimateIn';
import LighthouseGauge from '@/components/ui/LighthouseGauge';
import { HERO_STATS } from '@/lib/constants';

const LIGHTHOUSE_COMPARISONS = [
  {
    label: 'Typical WordPress Site',
    scores: { performance: 32, accessibility: 45, bestPractices: 56, seo: 62 },
  },
  {
    label: 'After Stray Web Design',
    scores: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
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
    >
      {/* Gradient Mesh Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 50%), var(--warm-white)',
        }}
      />

      <motion.div
        className="mx-auto w-full max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24"
        style={{ y, opacity }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <AnimateIn delay={0.1}>
              <span className="mb-4 inline-block rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-sm font-medium text-electric">
                Enterprise-Grade Websites for Erie Businesses
              </span>
            </AnimateIn>

            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-navy md:text-5xl lg:text-6xl">
              <WordReveal text="Compete With the Big Guys — Starting With Your Website" delay={0.3} />
            </h1>

            <AnimateIn delay={0.7} className="mt-6">
              <p className="max-w-lg text-lg leading-relaxed text-slate-600 md:text-xl">
                National chains have fast, accessible, AI-optimized websites.
                Your Erie business deserves the same — without the corporate
                budget.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.9} className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="#problem" variant="primary" size="lg">
                See What&apos;s Wrong With Your Site
                <ArrowDown className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#contact" variant="ghost" size="lg">
                Get Free Audit
              </MagneticButton>
            </AnimateIn>

            {/* Stats */}
            <AnimateIn delay={1.1} className="mt-12">
              <div className="grid grid-cols-3 gap-6">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl font-bold text-navy md:text-3xl">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={'decimals' in stat ? stat.decimals : 0}
                      />
                    </div>
                    <p className="mt-1 text-xs leading-snug text-slate-500 md:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Right: Lighthouse Comparison */}
          <AnimateIn direction="right" delay={0.5} className="hidden lg:block">
            <div className="space-y-8">
              {LIGHTHOUSE_COMPARISONS.map((comp, idx) => (
                <div
                  key={comp.label}
                  className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
                >
                  <h3 className="mb-4 text-center font-display text-sm font-semibold text-slate-500">
                    {comp.label}
                  </h3>
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
