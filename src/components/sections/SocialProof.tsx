'use client';

import { ArrowRight, Award, Code2, Paintbrush, ShieldCheck } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import Carousel from '@/components/ui/Carousel';
import { CLIENT_PROFILES } from '@/lib/constants';

const CREDENTIALS = [
  { icon: Award, label: 'Lighthouse 100s' },
  { icon: Code2, label: 'Modern Stack' },
  { icon: Paintbrush, label: 'Custom Design' },
  { icon: ShieldCheck, label: 'Zero Plugins' },
];

function ProfileCard({
  industry,
  challenge,
  outcome,
}: {
  industry: string;
  challenge: string;
  outcome: string;
}) {
  return (
    <div className="w-[300px] rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm sm:w-[340px]">
      <p className="mb-3 text-sm font-semibold tracking-wide text-electric uppercase">
        {industry}
      </p>
      <p className="text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-navy">The problem: </span>
        {challenge}
      </p>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="flex items-start gap-2">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <p className="text-sm leading-relaxed text-slate-600">{outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="section-padding bg-white" aria-label="Industries and credentials">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            Who We Build For
          </span>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            Industries Where{' '}
            <GradientText>Every Client Counts</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We work with businesses where a single new patient, client, or
            contract is worth thousands. The website ROI is immediate.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-12">
          <Carousel
            speed={30}
            items={CLIENT_PROFILES.map((p, i) => (
              <ProfileCard key={i} {...p} />
            ))}
          />
        </AnimateIn>

        {/* Credential badges */}
        <StaggerContainer className="mt-12 text-center" staggerDelay={0.08}>
          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {CREDENTIALS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
                >
                  <Icon className="h-4 w-4 text-electric" />
                  <span className="text-sm font-medium text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Tech stack */}
        <StaggerContainer className="mt-8 text-center" staggerDelay={0.1}>
          <StaggerItem>
            <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
              Built with modern technology
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-slate-300">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
