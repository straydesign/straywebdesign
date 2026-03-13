'use client';

import { Search, Palette, Rocket } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import { PLAN_STEPS } from '@/lib/constants';

const ICONS = {
  search: Search,
  palette: Palette,
  rocket: Rocket,
} as const;

export default function Plan() {
  return (
    <section id="plan" className="section-padding bg-white" aria-label="Our Process">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            The Plan
          </span>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            Three Steps to a{' '}
            <GradientText>Website That Works</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            No mystery. No months of back-and-forth. A clear, proven process
            from audit to launch.
          </p>
        </AnimateIn>

        <StaggerContainer
          className="mt-14 grid gap-8 md:grid-cols-3"
          staggerDelay={0.15}
        >
          {PLAN_STEPS.map((step) => {
            const Icon = ICONS[step.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={step.step}>
                <div className="relative rounded-2xl border border-slate-200/60 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10">
                      <Icon className="h-6 w-6 text-electric" />
                    </div>
                    <span className="font-display text-4xl font-extrabold text-slate-100">
                      {String(step.step).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
