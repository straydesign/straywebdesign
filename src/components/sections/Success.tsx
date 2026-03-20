'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import CountUp from '@/components/ui/CountUp';
import GradientText from '@/components/ui/GradientText';

const RESULTS_METRICS = [
  { value: 96, suffix: '+', label: 'Lighthouse Performance Score' },
  { value: 100, suffix: '', label: 'Accessibility Score' },
  { value: 0.8, suffix: 's', label: 'Average Load Time', decimals: 1 },
  { value: 40, suffix: '%+', label: 'More Contact Submissions' },
];

export default function Results() {
  return (
    <section id="results" className="section-padding bg-light-gray" aria-label="Results">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            Proven Results
          </span>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            From Underdog to{' '}
            <GradientText>Top Competitor</GradientText>
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {RESULTS_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-slate-200/60 bg-white p-6 text-center"
              >
                <div className="font-display text-3xl font-bold text-electric md:text-4xl">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals ?? 0}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
