'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import BookingWizard from '@/components/booking/BookingWizard';

/**
 * Start — contact details, then a time.
 *
 * Replaced the five-question survey 2026-09-17 on Tom's call: "literally just
 * put like a box to add contact information and then select a time, and that's
 * all we need."
 *
 * BookingWizard already runs contact -> date -> time -> confirm against the
 * live slots API, so this is the existing booker moved onto the landing page
 * rather than a second form that would need its own CRM wiring.
 *
 * Keeps id="start" — the hero button targets that anchor. It sits on the light
 * page surface rather than the dark band the survey used: BookingWizard was
 * built for /book, and its inputs, panels and slot grid are all styled for a
 * light ground.
 *
 * What went with the survey: the disqualifier that routed a bad fit to
 * /not-a-fit before the conversion pixel could fire, and the four profile
 * questions that arrived before the call. Both were deliberate; both are gone
 * by instruction, and /not-a-fit is now unreachable from the funnel.
 */
export default function Start() {
  return (
    <section id="start" className="scroll-mt-16 bg-surface-page py-20 md:py-28" aria-label="Start">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <AnimateIn>
          <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-text-primary">
            Leave your details and pick a time.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
            Thirty minutes on the phone. You get a plan for what the site should
            do whether you hire me or not.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <div className="mt-10 md:mt-12">
            <BookingWizard />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
