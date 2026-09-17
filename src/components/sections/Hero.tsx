'use client';

import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import Vsl from '@/components/sections/Vsl';
import { PHONE_SMS, PHONE_TEL, SITE } from '@/lib/constants';

/**
 * Hero — the headline states the result, not the thing being sold. "A website
 * with a product catalog" is a thing; somebody finding your item and driving
 * over is a result, and it's the only reason anyone buys the thing.
 *
 * The video sits directly under it and carries the introduction, so the copy
 * up here stays short. There is no nav above this — one message, one action.
 */
export default function Hero() {
  return (
    <section className="border-b border-border-default bg-surface-page pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn>
          <h1 className="text-balance font-display text-[clamp(2.2rem,5.6vw,4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-text-primary">
            Everything you sell,{' '}
            <span className="text-accent">where people are already looking</span>.
          </h1>

        </AnimateIn>

        <AnimateIn delay={0.08}>
          <div className="mt-10 md:mt-12">
            <Vsl />
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
