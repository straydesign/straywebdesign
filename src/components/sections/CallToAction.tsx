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
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            Ready to{' '}
            <GradientText>Close the Gap?</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            See exactly how your site stacks up against enterprise competitors.
            Free audit — we&apos;ll show you the gap and how to close it.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <MagneticButton href="#contact" variant="primary" size="lg">
            Get Your Free Site Audit
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#faq" variant="ghost" size="lg">
            <FileText className="h-4 w-4" />
            Learn More First
          </MagneticButton>
        </AnimateIn>

        <AnimateIn delay={0.4} className="mt-8">
          <p className="text-sm text-slate-400">
            No credit card. No commitment. Just data about your site.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            For dental practices, financial firms, dealerships, and professional services where every new client matters.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
