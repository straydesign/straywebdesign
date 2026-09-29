import AnimateIn from '@/components/ui/AnimateIn';
import SectionHeading from '@/components/sections/SectionHeading';

/**
 * Why — what working with me is like.
 *
 * Rewritten 2026-09-29 (Tom: "focus more on what those positive reviews said,
 * positioning myself like that"). The five reasons are the five things local
 * owners thank a web designer for most, in order, from
 * Playbook/buyer-language-local-websites.md: responds (46), listened (44),
 * on time (35), fair price (34), patient plain language (30). Each is said as
 * a fact a buyer can check, never as a grade: the brand cannot call itself
 * responsive, it can say whose phone rings.
 *
 * The closing line is a promise about the future rather than a result from the
 * past, because no result exists yet and inventing one would be the easiest
 * lie on the page. What gets counted is calls, which is the same answer the
 * FAQ gives: traffic and time on page move whether or not anybody buys.
 */

const REASONS = [
  {
    title: 'You call me, and I answer',
    body: 'The number on this page is my own phone. Call or text it, before we start or a year after launch.',
  },
  {
    title: 'I listen first',
    body: 'The first call is you talking about your business and the people who come to you. The site is built from your answers.',
  },
  {
    title: 'You know when things happen',
    body: 'You see a first version about a week after your photos reach me. Nothing goes live until you say go.',
  },
  {
    title: 'The price is on the page',
    body: '$500 to $3,000 to build, and $20 to $100 a month to run it. Tell me what you run and you get your number the same day.',
  },
  {
    title: 'Plain words, one step at a time',
    body: 'I explain each change without the jargon. After launch I show you how the editor works, one step at a time.',
  },
];

export default function Why() {
  return (
    <section
      id="why"
      className="scroll-mt-16 border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="How I work"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading kicker="What working with me is like" title="HOW I WORK" className="mb-2" />

        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
          {REASONS.map((reason, i) => (
            <li key={reason.title}>
              <AnimateIn delay={i * 0.05}>
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary md:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                  {reason.body}
                </p>
              </AnimateIn>
            </li>
          ))}
        </ul>

        <AnimateIn delay={0.2}>
          <p className="mt-14 max-w-2xl border-l-2 border-accent pl-6 font-body text-lg leading-relaxed text-text-primary md:mt-16">
            Then I show you how it went, with numbers, over the months after
            you go live. I count calls and new customers.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
