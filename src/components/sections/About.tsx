import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';

/**
 * About — last on the page, and short.
 *
 * The version this replaced had three abstract principles in it ("Make the
 * message land", "One coherent brand"). Nobody has ever chosen a web designer
 * on the strength of a principle. What is here instead is who answers the
 * phone, what he actually does with his hands, and the guarantee — three
 * things a stranger can check.
 */

const FACTS = [
  {
    label: 'who you deal with',
    body: 'Me, from the first phone call through to the hosting. There is no account manager, and nobody you get passed to.',
  },
  {
    label: 'the photos',
    body: 'I take them. Your counter, your room, your food, your stock. Stock photos of somebody else’s shop are the fastest way to make a real business look fake.',
  },
  {
    label: 'the guarantee',
    body: 'The Stray Success Guarantee. Ninety days after the site goes live you decide whether it worked. If it did not, every dollar comes back. No form, and no call where I talk you out of it.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-card py-20 md:py-28"
      aria-label="About"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        {/* items-start, or the card column stretches to match the photo column
            and leaves a band of empty divider colour under the last card. */}
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <AnimateIn>
            <div className="flex w-44 items-end overflow-hidden rounded-lg bg-accent/5 ring-1 ring-accent/15 md:w-52">
              <Image
                src="/images/tom.png"
                alt="Tom Sesler"
                width={800}
                height={913}
                sizes="(min-width: 768px) 208px, 176px"
                className="w-full"
              />
            </div>
            <h2 className="mt-7 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold leading-[1.06] tracking-tight text-text-primary">
              I&apos;m Tom.
            </h2>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-text-secondary">
              I build websites for local businesses in Erie, and mostly for the
              kind where somebody has spent years getting good at one thing and
              never had a way to show it to the people already searching for it.
            </p>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-tertiary">
              Four of those are live right now. I built all four, I host all
              four, and I still keep them current.
            </p>
          </AnimateIn>

          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border-default bg-border-default">
            {FACTS.map((fact, i) => (
              <AnimateIn key={fact.label} delay={i * 0.08}>
                <div className="bg-surface-card p-6 md:p-7">
                  <p className="font-mono text-[11px] text-text-tertiary">
                    <span aria-hidden className="text-accent/60">{'// '}</span>
                    {fact.label}
                  </p>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
                    {fact.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
