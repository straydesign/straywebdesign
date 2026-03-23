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
    <section id="results" className="bg-light-gray py-16 md:py-24" aria-label="Results">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            From Underdog to{' '}
            <GradientText scrollLinked>Top Competitor</GradientText>
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Real numbers from sites we&apos;ve shipped.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {RESULTS_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="border-l-2 border-electric bg-white py-5 pl-5 pr-4"
              >
                <div className="font-mono text-3xl font-bold tracking-tight text-navy md:text-4xl">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals ?? 0}
                  />
                </div>
                <p className="mt-1.5 text-sm text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
