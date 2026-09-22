'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageSquare } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import BookingWizard from '@/components/booking/BookingWizard';
import { trackPageEngaged } from '@/lib/tracking';

export default function BookingForm() {
  useEffect(() => trackPageEngaged('/book'), []);
  return (
    <div className="relative min-h-[100dvh] bg-surface-page text-text-primary">
      {/* Back link */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 md:px-8">
        <AnimateIn>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-text-tertiary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </AnimateIn>
      </div>

      <div className="section-padding relative">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Info */}
            <AnimateIn>
              <span className="eyebrow mb-4">Get started</span>
              <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Let&apos;s <GradientText>Talk</GradientText>
              </h1>
              <p className="mt-4 font-body text-lg text-text-secondary">
                Tell me about the place. I&apos;ll call at the time you pick.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-text-primary">Thirty minutes on the phone</p>
                    <p className="font-body text-sm text-text-secondary">
                      What the place is, who walks in, and what you want the site to do for them
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-text-primary">A straight answer on price</p>
                    <p className="font-body text-sm text-text-secondary">
                      What it costs to build and what it costs to run, before you decide anything
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-text-primary">No pitch</p>
                    <p className="font-body text-sm text-text-secondary">
                      If a site is not the thing you need right now, I will tell you that
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <MessageSquare className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-text-primary">You keep what we work out</p>
                    <p className="font-body text-sm text-text-secondary">
                      Whatever we land on during the call is yours, whether you hire me or not
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
