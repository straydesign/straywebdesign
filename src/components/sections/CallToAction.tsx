'use client';

import { FileText, ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';

export default function CallToAction() {
  return (
    <section className="section-padding relative overflow-hidden" aria-label="Call to Action">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%), var(--warm-white)',
        }}
      />

      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <AnimateIn>
          <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Tell me about your business —{' '}
            <GradientText>I&apos;ll sketch the plan.</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Walk me through the business and I&apos;ll come back with a plan for
            exactly what the site needs to do. Back in 24 hours. No pitch, no
            pressure.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <MagneticButton href="/book" variant="primary" size="lg">
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#faq" variant="ghost" size="lg">
            <FileText className="h-4 w-4" />
            Learn More First
          </MagneticButton>
        </AnimateIn>

        <AnimateIn delay={0.4} className="mt-8">
          <p className="text-sm text-text-secondary">
            No credit card. No commitment. Just a plan for your business.
          </p>
          <p className="mt-2 text-xs text-text-secondary">
            For restaurants, practices, dealerships, service businesses, and shops that want a site that actually converts.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
