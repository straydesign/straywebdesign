'use client';

import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import Carousel from '@/components/ui/Carousel';
import { CLIENT_PROFILES } from '@/lib/constants';

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
    <div className="w-[300px] rounded-xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm sm:w-[340px]">
      <p className="mb-3 text-sm font-semibold tracking-wide text-electric uppercase">
        {industry}
      </p>
      <p className="text-sm leading-relaxed text-slate-400">
        <span className="font-semibold text-white">The problem: </span>
        {challenge}
      </p>
      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="flex items-start gap-2">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <p className="text-sm leading-relaxed text-slate-400">{outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="bg-slate-950 py-20 text-white md:py-28" aria-label="Industries and credentials">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            Who We Build For
          </span>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Industries Where{' '}
            <GradientText scrollLinked>Every Client Counts</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            We work with businesses where a single new patient, client, or
            contract is worth thousands. The website ROI is immediate.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-12">
          <Carousel
            speed={30}
            fadeColor="#020617"
            items={CLIENT_PROFILES.map((p, i) => (
              <ProfileCard key={i} {...p} />
            ))}
          />
        </AnimateIn>

        {/* Credential badges and tech stack removed — not important */}
      </div>
    </section>
  );
}
