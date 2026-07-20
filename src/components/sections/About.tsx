import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';

/* About — the positioning, first person. Tom, a freelance web designer:
   build for people excited about their work, grow the business by making
   things easier, pull the brand into one coherent whole. */

const PRINCIPLES = [
  {
    label: 'communicate',
    title: 'Make the message land',
    body: "Most sites bury the one thing that makes a business worth choosing. I find it and put it where customers actually look — so the right people get it in the first few seconds.",
  },
  {
    label: 'simplify',
    title: 'Smooth the day-to-day',
    body: 'Growth often just means making things easier — a clearer path to book or buy, content you and your team can update without me, the small frictions taken out from behind the scenes.',
  },
  {
    label: 'unify',
    title: 'One coherent brand',
    body: 'Photos, words, and every customer-facing detail pulled into a single voice. When the brand holds together, the whole offering feels more sure of itself.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-b border-border-default bg-surface-card py-20 md:py-28"
      aria-label="About"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <AnimateIn>
            <span className="eyebrow mb-5">About</span>
            <div className="mt-6 flex w-48 items-end overflow-hidden rounded-lg bg-accent/5 ring-1 ring-accent/15 md:w-56">
              <Image
                src="/images/tom.png"
                alt="Tom Sesler"
                width={800}
                height={913}
                sizes="(min-width: 768px) 224px, 192px"
                className="w-full"
              />
            </div>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.06] tracking-tight text-text-primary">
              Hi, I&apos;m Tom.
            </h2>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-text-secondary">
              I&apos;m a freelance web designer. I like working with people who
              are excited about what they do — where the passion you and your
              team put in is the whole point — and building a site that brings
              that same energy all the way to your customers.
            </p>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-tertiary">
              You work with me directly, start to finish: design, build, and the
              ongoing care once it&apos;s live.
            </p>
          </AnimateIn>

          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border-default bg-border-default">
            {PRINCIPLES.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 0.08}>
                <div className="bg-surface-card p-6 md:p-7">
                  <span className="eyebrow mb-2.5">{p.label}</span>
                  <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary">
                    {p.body}
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
