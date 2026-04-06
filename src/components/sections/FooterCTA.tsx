'use client';

import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';

export default function FooterCTA() {
  return (
    <section
      id="contact"
      className="relative border-t border-border-default bg-surface-page py-16 md:py-24"
      aria-label="Contact"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8">
        <AnimateIn>
          <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
            Get Started
          </span>
          <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Ready to Outperform{' '}
            <GradientText>The Competition?</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-lg text-text-secondary">
            Tell us about your business. We&apos;ll show you exactly where you
            stand and what it would take to win.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-10">
          <MagneticButton href="/book" variant="primary" size="lg">
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </AnimateIn>

        <AnimateIn delay={0.3} className="mt-8">
          <p className="font-mono text-sm text-text-tertiary">
            No commitment. No pitch. Just an honest conversation about your site.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
