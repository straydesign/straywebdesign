'use client';

import { ArrowLeft, ArrowRight, Calendar, Clock, MessageSquare } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import BookingWizard from '@/components/booking/BookingWizard';
import { SITE } from '@/lib/constants';

export default function BookingForm() {
  return (
    <div className="relative min-h-[100dvh] bg-surface-page text-text-primary">
      {/* Back link */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 md:px-8">
        <AnimateIn>
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-tertiary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </AnimateIn>
      </div>

      <div className="section-padding relative">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Info */}
            <AnimateIn>
              <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                Book a Call
              </span>
              <h1 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Let&apos;s <GradientText>Talk</GradientText>
              </h1>
              <p className="mt-4 font-mono text-lg text-text-secondary">
                Pick a time that works for you. We&apos;ll run a free Lighthouse
                audit before the call so we can hit the ground running.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">30-Minute Discovery Call</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Quick, focused conversation about your goals and current site
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">Free Lighthouse Audit</p>
                    <p className="font-mono text-sm text-text-secondary">
                      We&apos;ll run a full performance report before the call
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">No Pressure, No Pitch</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Honest assessment of where you stand — whether you hire us or not
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <MessageSquare className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">Actionable Takeaways</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Walk away with specific recommendations you can use immediately
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 border border-border-strong px-5 py-2.5 font-mono text-sm font-medium text-text-primary transition-colors hover:bg-surface-sunken"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE.phone}
                </a>
              </div>
            </AnimateIn>

            {/* Right: Booking Wizard */}
            <AnimateIn direction="right" delay={0.2}>
              <BookingWizard />
            </AnimateIn>
          </div>
        </div>
      </div>
    </div>
  );
}
