'use client';

import { ArrowLeft, ArrowRight, Calendar, Clock, MessageSquare } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import BookingWizard from '@/components/booking/BookingWizard';

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
                Get Started
              </span>
              <h1 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Let&apos;s <GradientText>Talk</GradientText>
              </h1>
              <p className="mt-4 font-mono text-lg text-text-secondary">
                Tell us a little about your business. We&apos;ll reach out to
                get the conversation started.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">30-Minute Discovery Call</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Quick, focused conversation about the business and what the site needs to do
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">Written Plan</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Customer, offer, and the one action the site needs to drive
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
