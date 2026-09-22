'use client';

import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import SiteStack from '@/components/ui/SiteStack';
import { PHONE_SMS, PHONE_TEL, SITE } from '@/lib/constants';

/**
 * Hero — the headline names who the work is for, and the four sites underneath
 * it are the argument.
 *
 * The old headline sold one mechanism: "Everything you sell, where people are
 * already looking." That is still what a catalogue does, and it is now a
 * section further down instead of the thing the whole page is about.
 *
 * Under it sat an empty div — the slot the intro video came out of in
 * September. A page claiming to build engaging sites cannot have a hole where
 * the engaging part goes, so the four live builds fill it, on four depth
 * planes, turning toward whoever is looking. There is no nav above this.
 */
export default function Hero() {
  return (
    <section className="border-b border-border-default bg-surface-page pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn>
          <h1 className="text-balance font-display text-[clamp(2.2rem,5.6vw,4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-text-primary">
            Engaging sites for{' '}
            <span className="text-accent">strong brands with passionate owners</span>.
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-text-secondary">
            Four of them are live and running right now. You are looking at all four.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <div className="mt-10 md:mt-12">
            <SiteStack />
          </div>
        </AnimateIn>

        <AnimateIn delay={0.14}>
          {/* Reads as beginning something, not as handing over your details.
              "Get in touch" is the version of this that doesn't work.

              Was "Start with a few questions" until 2026-09-17, which pointed
              at a five-question survey that no longer exists. A button naming
              a step the build does not have is the worst kind of dead control:
              it still works, it just lies about where it goes. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="#start"
              className="inline-flex items-center justify-center bg-accent px-8 py-4 font-display text-base font-semibold text-white transition-colors hover:bg-accent/90 sm:px-10 sm:py-4.5 sm:text-lg"
            >
              Pick a time
            </Link>
            {/* Call and text sit side by side because plenty of people will
                not ring a stranger but will send four words. The number is the
                weight; texting is the low-effort door next to it. */}
            <div className="flex flex-col gap-1">
              <a
                href={PHONE_TEL}
                className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent"
              >
                {SITE.phone}
              </a>
              {/* min-h-11 is the 44px touch target; the negative margin takes
                  the extra height back out of the layout so the line still sits
                  tight under the number. */}
              <a
                href={PHONE_SMS}
                className="-my-2.5 inline-flex min-h-11 w-fit items-center font-mono text-[13px] text-text-tertiary underline underline-offset-4 transition-colors hover:text-accent"
              >
                or text me
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
