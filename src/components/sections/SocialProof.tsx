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
    <div className="w-[300px] border border-border-default bg-surface-card p-6 sm:w-[340px]">
      <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
        {industry}
      </p>
      <p className="font-mono text-sm leading-relaxed text-text-secondary">
        <span className="font-semibold text-text-primary">The problem: </span>
        {challenge}
      </p>
      <div className="mt-4 border-t border-border-default pt-4">
        <div className="flex items-start gap-2">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="font-mono text-sm leading-relaxed text-text-secondary">{outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="border-y border-border-default bg-surface-page py-20 md:py-28" aria-label="Industries and credentials">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
            Who This Is For
          </span>
          <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Businesses where{' '}
            <GradientText>one customer pays for the site.</GradientText>
          </h2>
          <p className="mt-4 font-mono text-lg text-text-secondary">
            If a single new patient, client, or contract is worth thousands to
            you, a site that actually converts pays for itself the first month.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-12">
          <Carousel
            speed={30}
            fadeColor="var(--surface-page)"
            items={CLIENT_PROFILES.map((p, i) => (
              <ProfileCard key={i} {...p} />
            ))}
          />
        </AnimateIn>

        <AnimateIn delay={0.3} className="mt-12 text-center">
          <p className="font-mono text-sm text-text-secondary">
            Run one of these? Let&apos;s map out the site.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 bg-accent px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90"
          >
            Tell me about your business
            <ArrowRight className="h-4 w-4" />
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
