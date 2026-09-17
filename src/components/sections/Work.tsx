'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import DeviceDuo from '@/components/ui/DeviceDuo';
import { PROOF } from '@/data/proof';

/**
 * Work — the four live sites, and the first thing on the page.
 *
 * Tom, 2026-09-17: "I do wanna actually mirror the non-web design version more
 * closely... that means it just leads with the four sites that I've done."
 *
 * So this copies straydesign.co's Work section rather than the two-column card
 * grid it replaces: alternating rows, the device duo on one side and the story
 * on the other, on a light ground. Four sites in a 2x2 of small cards read as a
 * list of logos; one site per row at full width reads as work.
 *
 * The rows alternate sides on `lg` and stack in source order below it, so on a
 * phone every row is device-then-words and the rhythm survives.
 */
export default function Work() {
  return (
    <section id="work" className="scroll-mt-16 bg-surface-page py-20 md:py-28" aria-label="Work">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimateIn>
          <span className="eyebrow mb-4">Live sites</span>
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            Four businesses in Erie, four lists that are now online.
          </h2>
        </AnimateIn>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          {PROOF.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <AnimateIn key={item.name} direction="up">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={flipped ? 'lg:order-2' : ''}>
                    <DeviceDuo
                      shot={item.shot}
                      phoneShot={item.phoneShot}
                      name={item.name}
                      priority={i === 0}
                    />
                  </div>

                  <div className={flipped ? 'lg:order-1' : ''}>
                    <h3 className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-bold leading-[1.1] tracking-tight text-text-primary">
                      {item.name}
                    </h3>
                    <p className="mt-3 max-w-md font-body text-[17px] leading-relaxed text-text-secondary">
                      {item.catalogued}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 font-display text-base font-semibold text-accent transition-colors hover:text-accent/80"
                    >
                      {item.displayUrl}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
