'use client';

import { Gauge, Accessibility, Brain } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import GradientText from '@/components/ui/GradientText';
import { PROBLEM_CARDS } from '@/lib/constants';

const ICONS = {
  gauge: Gauge,
  accessibility: Accessibility,
  brain: Brain,
} as const;

export default function Problem() {
  return (
    <section id="problem" className="section-padding bg-white" aria-label="The Problem">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            The Problem
          </span>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            Your Competitors Are{' '}
            <GradientText>Already Ahead</GradientText>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Corporate chains and national brands invest millions in web performance,
            accessibility, and AI optimization. Your site can&apos;t keep up — and
            customers notice the difference before they ever call you.
          </p>
        </AnimateIn>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-3"
          staggerDelay={0.12}
        >
          {PROBLEM_CARDS.map((card) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={card.title}>
                <TiltCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <Icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <span className="font-display text-2xl font-bold text-red-500">
                      {card.stat}
                    </span>
                    <p className="text-xs text-slate-500">{card.statLabel}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
