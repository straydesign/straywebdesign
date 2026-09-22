import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
import TextCard from "@/components/ui/TextCard";
import SectionHeading from "@/components/sections/SectionHeading";

/**
 * About — moved to the TOP 2026-09-17 on Tom's call: "the picture of me and
 * the short description should be at the top for the web design one." It sits
 * directly under the headline, ahead of the work.
 *
 * The one thing he asked to keep when the fat came off (2026-09-08): the
 * photo, the name, one paragraph. The three fact
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
        <SectionHeading
          kicker="Who's behind it"
          title="ABOUT"
          className="mb-10 md:mb-14"
        />
        <AnimateIn>
          <TextCard padding="md">
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
            <p className="mt-7 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.06] tracking-tight text-text-primary">
              I&apos;m Tom.
            </p>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-text-secondary">
              I build websites for people who have spent years getting good at
              one thing and never had a way to show it to the ones already
              looking for it.
            </p>
          </TextCard>
        </AnimateIn>
      </div>
    </section>
  );
}
