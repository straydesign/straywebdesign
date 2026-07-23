import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import { PILLARS } from '@/data/pillars';

/* QuestionsSection — the dark spine of the homepage. The six buyer-question
   clusters as color-coded cards, each linking to its pillar page. This is
   the on-site translation of the question map: a real search someone types,
   with a straight answer one click away. Data from src/data/pillars.ts. */

export default function QuestionsSection() {
  return (
    <section
      id="questions"
      className="scroll-mt-24 bg-[#101216] py-20 md:py-28"
      aria-label="The questions this site answers"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimateIn>
          <p className="font-mono text-[12px] tracking-wide text-[#8A8F98]">
            The six questions this whole site answers
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.08] tracking-tight text-[#F4F5F7]">
            What are you actually trying to figure out?
          </h2>
          <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-[#9aa0aa] md:text-base">
            Six questions people ask me before they ever hire anyone. Each one
            has a straight answer, and none of them is a pitch.
          </p>
        </AnimateIn>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <AnimateIn key={pillar.slug} delay={i * 0.05}>
              <Link
                href={`/${pillar.slug}`}
                className="group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${pillar.color}44`,
                  background: `${pillar.color}0d`,
                }}
              >
                <span className="inline-flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: pillar.color }}
                  />
                  <span
                    className="font-display text-[13px] font-bold uppercase tracking-wide"
                    style={{ color: pillar.color }}
                  >
                    {pillar.nav}
                  </span>
                </span>
                <p className="mt-3.5 flex-1 font-body text-[15px] leading-snug text-[#d4d8df]">
                  {pillar.question}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-[#8A8F98] transition-colors group-hover:text-[#cfd3da]">
                  /{pillar.slug}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
