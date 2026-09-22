import AnimateIn from '@/components/ui/AnimateIn';
import SectionHeading from '@/components/sections/SectionHeading';

/**
 * Setup — what the first weeks are, for somebody who has either just landed
 * here or just had me walk into their shop.
 *
 * Replaces HowItWorks, which described a catalogue build in three steps and
 * assumed the visitor had already decided that was the thing they wanted. The
 * two steps here are the ones Tom names out loud: fine-tune the details to
 * your preferences, then get live quickly.
 *
 * No pictures. The two sections under this one are both screenshots, and the
 * quickest thing to read on a page of screens is a page of words.
 */

const STEPS = [
  {
    n: '01',
    title: 'We fine-tune the details to what you want',
    body: 'I write the first version and you correct it. Your photographs, your prices, your call on every line. You know your business and I do not, so the first draft is mine to get wrong.',
  },
  {
    n: '02',
    title: 'You go live quickly',
    body: 'About a week from the day your photographs and details reach me. Your current site stays up the whole time, your domain stays yours, and we switch when you say go.',
  },
];

export default function Setup() {
  return (
    <section
      id="setup"
      className="scroll-mt-16 border-b border-border-default bg-surface-card py-20 md:py-28"
      aria-label="What happens from here"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          kicker="You just landed here, or I just walked into your shop"
          title="FROM HERE"
          className="mb-2"
        />

        <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-14">
          {STEPS.map((step, i) => (
            <li key={step.n}>
              <AnimateIn delay={i * 0.06}>
                <div className="flex gap-4">
                  <span aria-hidden className="font-mono text-[13px] font-medium text-accent md:pt-1">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
