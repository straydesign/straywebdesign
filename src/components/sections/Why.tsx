import AnimateIn from '@/components/ui/AnimateIn';
import SectionHeading from '@/components/sections/SectionHeading';

/**
 * Why — the argument, in Tom's own beats and his own order, de-looped only.
 *
 * The last one is a promise about the future rather than a result from the
 * past, because no result exists yet and inventing one would be the easiest
 * lie on the page. What gets counted is calls and walk-ins, which is the same
 * answer the FAQ gives: traffic and time on page move whether or not anybody
 * buys anything.
 */

const REASONS = [
  {
    title: 'It is more engaging, and it is modern',
    body: 'It moves. It is built this year, for the phone somebody is holding, and it does not look like the thing their cousin put up in 2014.',
  },
  {
    title: 'It shows how much you care before anyone walks in',
    body: 'Somebody decides what kind of place you run before they meet you or see the room. The site is the only version of you they have got at that point.',
  },
  {
    title: 'It shows people how serious you are',
    body: 'Years of getting good at one thing does not show up on a page that was put together in an afternoon. A site that was made carefully reads as a business that is run carefully.',
  },
  {
    title: 'It earns more out of the people already looking you up',
    body: 'More of the people who find you get as far as calling, and more people find you in the first place.',
  },
];

export default function Why() {
  return (
    <section
      id="why"
      className="scroll-mt-16 border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Why it is better"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading kicker="Why this beats what you have now" title="WHY IT'S BETTER" className="mb-2" />

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
            Then I show you that with numbers, over the months after you go
            live. Calls and walk-ins, because those are the ones that reach
            your register.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
