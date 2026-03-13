'use client';

import { TrendingDown, AlertTriangle, Clock } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import CountUp from '@/components/ui/CountUp';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { FAILURE_STATS } from '@/lib/constants';

const FAILURE_POINTS = [
  {
    icon: TrendingDown,
    title: 'Enterprise Competitors Invest Daily',
    description:
      'While you maintain WordPress plugins, big brands ship performance updates, AI optimizations, and accessibility improvements. The gap grows every week.',
  },
  {
    icon: AlertTriangle,
    title: 'Google Favors the Fast',
    description:
      'Google\'s Core Web Vitals reward enterprise-grade performance. Your WordPress site fails these metrics — pushing you below competitors in every search.',
  },
  {
    icon: Clock,
    title: 'Customers Choose the Better Experience',
    description:
      'When a customer compares your 4-second load time to a competitor\'s instant page load, they don\'t wait. They go where the experience matches their expectations.',
  },
];

export default function Failure() {
  return (
    <section className="section-padding relative bg-dark-navy text-white" aria-label="Stakes">
      <GrainOverlay />

      {/* Parallax reveal window effect */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(245,158,11,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-violet-400 uppercase">
            The Stakes
          </span>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            The Big Guys Aren&apos;t Waiting for You
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Every day your site stays the same, enterprise competitors pull
            further ahead. The gap widens. The customers you should be winning
            go to brands with better digital presence.
          </p>
        </AnimateIn>

        {/* Stats */}
        <AnimateIn delay={0.2} className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FAILURE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div className="font-display text-3xl font-bold text-violet-400 md:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Points */}
        <StaggerContainer
          className="mt-12 grid gap-6 md:grid-cols-3"
          staggerDelay={0.12}
        >
          {FAILURE_POINTS.map((point) => (
            <StaggerItem key={point.title}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <point.icon className="mb-4 h-8 w-8 text-violet-400" />
                <h3 className="font-display text-lg font-bold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {point.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
