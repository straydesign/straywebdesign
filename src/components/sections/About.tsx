import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';

/**
 * About — last on the page, and the one thing Tom asked to keep when the fat
 * came off (2026-09-08): the photo, the name, one paragraph. The three fact
 * cards that used to sit beside it (who you deal with, the photos, the
 * guarantee) are all said elsewhere now — the slides, and the FAQ, where the
 * Stray Success Guarantee is still named.
 */
export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-card py-20 md:py-28"
      aria-label="About"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
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
        </AnimateIn>
      </div>
    </section>
  );
}
