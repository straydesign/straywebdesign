'use client';

import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import CountUp from '@/components/ui/CountUp';

const RESULTS_METRICS = [
  { value: 96, suffix: '+', label: 'Lighthouse Performance', decimals: 0 },
  { value: 100, suffix: '', label: 'Accessibility Score', decimals: 0 },
  { value: 0.8, suffix: 's', label: 'Average Load Time', decimals: 1 },
  { value: 40, suffix: '%+', label: 'More Conversions', decimals: 0 },
];

export default function Results() {
  return (
    <section id="results" className="overflow-hidden bg-navy py-20 md:py-28" aria-label="Results">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mb-16 max-w-xl">
          <p className="text-sm font-semibold tracking-widest text-electric uppercase">
            Proven Results
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
            Real numbers from sites we&apos;ve shipped.
          </h2>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4" staggerDelay={0.15}>
          {RESULTS_METRICS.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="border-t border-white/15 pt-6">
                <div className="font-mono text-[clamp(3rem,8vw,5.5rem)] font-bold leading-none tracking-tighter text-white">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </div>
                <p className="mt-3 text-sm tracking-wide text-slate-500 uppercase">
                  {metric.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
