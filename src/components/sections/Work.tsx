'use client';

import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import DeviceDuo from '@/components/ui/DeviceDuo';
import TextCard from '@/components/ui/TextCard';
import SectionHeading from '@/components/sections/SectionHeading';
import { PROOF } from '@/data/proof';
import { CASE_STUDIES } from '@/data/caseStudies';

/**
 * Work — the four live sites, and the first thing on the page.
 *
 * This is straydesign.co's Work section, ported rather than re-implemented, on
 * Tom's instruction: "just use the code and then make the changes from there."
 * Same SectionHeading, same TextCard, same alternating rows, same photoreal
 * device renders. What changes is the content — a client's site and what it
 * does for them, instead of a case study and what it taught me.
 *
 * Each row carries the case study as the primary action and the live site as
 * the secondary one, the same way the portfolio orders them. An earlier pass
 * here shipped the live site as the ONLY action, on my own reasoning that a
 * sales page wants fewer exits. That was wrong and Tom said so: a case study
 * is not an exit, it is the thing that makes somebody book.
 *
 * The two datasets were written apart, so a study is matched to its row by
 * live URL — the one field both are guaranteed to agree on.
 */
export default function Work() {
  return (
    <section id="work" className="scroll-mt-16 px-4 py-12 md:px-8 md:py-16" aria-label="Work">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Live client sites" title="WORK" className="mb-10 md:mb-14" />

        <div className="flex flex-col gap-16 md:gap-24">
          {PROOF.map((item, i) => {
            const flipped = i % 2 === 1;
            const study = CASE_STUDIES.find((c) => c.liveUrl === item.url);
            return (
              <AnimateIn key={item.name} direction="up">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={`flex justify-center ${flipped ? 'lg:order-2' : ''}`}>
                    <div className="w-full max-w-xl">
                      <DeviceDuo
                        shot={item.shot}
                        phoneShot={item.phoneShot}
                        alt={`${item.name} — desktop`}
                        phoneAlt={`${item.name} on a phone`}
                        priority={i === 0}
                      />
                    </div>
                  </div>

                  <div className={flipped ? 'lg:order-1' : ''}>
                    <TextCard padding="lg">
                      <p
                        className="mb-3 text-[15px] italic md:text-base"
                        style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}
                      >
                        Client site
                      </p>
                      <h3
                        className="mb-3 font-black leading-[1.1] tracking-wide"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--ink)',
                          fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[15px] leading-relaxed md:text-base" style={{ color: 'var(--ink-2)' }}>
                        {item.catalogued}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {study && (
                          <Link
                            href={`/work/${study.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider transition-opacity hover:opacity-85"
                            style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
                          >
                            Read the case study
                            <span aria-hidden>→</span>
                          </Link>
                        )}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider transition-colors"
                          style={{
                            color: 'var(--ink)',
                            border: '1px solid rgba(var(--hairline),0.22)',
                          }}
                        >
                          {item.displayUrl}
                          <span aria-hidden>↗</span>
                        </a>
                      </div>
                    </TextCard>
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
