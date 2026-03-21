'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';

interface ComparisonSide {
  label: string;
  imageUrl: string;
  points: string[];
  accent: 'red' | 'green';
}

interface PinnedComparisonProps {
  title: string;
  subtitle?: string;
  before: ComparisonSide;
  after: ComparisonSide;
}

const accentColors = {
  red: 'border-red-400 text-red-500',
  green: 'border-emerald-400 text-emerald-500',
};

function PinnedComparisonStatic({
  title,
  subtitle,
  before,
  after,
}: PinnedComparisonProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-center text-lg text-slate-600">{subtitle}</p>
        )}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[before, after].map((side) => (
            <div key={side.label} className={`rounded-2xl border-2 p-6 ${accentColors[side.accent]}`}>
              <h3 className="font-display text-xl font-bold">{side.label}</h3>
              <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-slate-100">
                <img src={side.imageUrl} alt={side.label} className="h-full w-full object-cover" />
              </div>
              <ul className="mt-4 space-y-2">
                {side.points.map((point) => (
                  <li key={point} className="text-sm text-slate-600">
                    {side.accent === 'red' ? '\u2715' : '\u2713'} {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedComparisonAnimated({
  title,
  subtitle,
  before,
  after,
}: PinnedComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const afterOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const pointsOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={containerRef} style={{ height: '300vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <AnimateIn className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
            )}
          </AnimateIn>

          <div className="relative grid grid-cols-2 gap-6">
            {/* Before side */}
            <div className={`rounded-2xl border-2 p-6 ${accentColors[before.accent]}`}>
              <h3 className="font-display text-xl font-bold">{before.label}</h3>
              <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-slate-100">
                <img src={before.imageUrl} alt={before.label} className="h-full w-full object-cover" />
              </div>
              <motion.ul className="mt-4 space-y-2" style={{ opacity: pointsOpacity }}>
                {before.points.map((point) => (
                  <li key={point} className="text-sm text-slate-600">
                    {'\u2715'} {point}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* After side */}
            <motion.div
              className={`rounded-2xl border-2 p-6 ${accentColors[after.accent]}`}
              style={{ opacity: afterOpacity }}
            >
              <h3 className="font-display text-xl font-bold">{after.label}</h3>
              <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-slate-100">
                <img src={after.imageUrl} alt={after.label} className="h-full w-full object-cover" />
              </div>
              <motion.ul className="mt-4 space-y-2" style={{ opacity: pointsOpacity }}>
                {after.points.map((point) => (
                  <li key={point} className="text-sm text-slate-600">
                    {'\u2713'} {point}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PinnedComparison(props: PinnedComparisonProps) {
  if (isMobile() || prefersReducedMotion()) {
    return <PinnedComparisonStatic {...props} />;
  }
  return <PinnedComparisonAnimated {...props} />;
}
