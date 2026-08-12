import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import { PILLARS } from '@/data/pillars';

/* QuestionsSection — a light band on the homepage. The six buyer-question
   clusters as color-coded cards, each linking to its pillar page. This is
   the on-site translation of the question map: a real search someone types,
   with a straight answer one click away. Data from src/data/pillars.ts.
   On phones the cards sit two-up so they read as cards, not full-width bars;
   eyebrow + slug use each pillar's `colorInk` (AA on white). */

export default function QuestionsSection() {
  return (
    <section
      id="questions"
      className="scroll-mt-24 bg-white py-20 md:py-28"
      aria-label="The questions this site answers"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimateIn>
          <p className="font-mono text-[12px] tracking-wide text-[#6b7280]">
            The six questions this whole site answers
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.08] tracking-tight text-[#0e1013]">
            What are you actually trying to figure out?
          </h2>
          <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-[#5b6069] md:text-base">
            Six questions people ask me before they ever hire anyone. Each one
            has a straight answer, and none of them is a pitch.
          </p>
        </AnimateIn>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <AnimateIn key={pillar.slug} delay={i * 0.05}>
              <Link
                href={`/${pillar.slug}`}
                className="group flex h-full flex-col rounded-xl border p-4 shadow-[0_1px_2px_rgba(16,18,22,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(16,18,22,0.09)] md:rounded-2xl md:p-6"
                style={{
                  borderColor: `${pillar.color}40`,
                  background: `${pillar.color}0a`,
                }}
              >
                <span className="inline-flex items-center gap-2 md:gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full md:h-3 md:w-3"
                    style={{ background: pillar.color }}
                  />
                  <span
                    className="font-display text-[11px] font-bold uppercase tracking-wide md:text-[13px]"
                    style={{ color: pillar.colorInk }}
                  >
                    {pillar.nav}
                  </span>
                </span>
                <p className="mt-3 flex-1 font-body text-[13px] leading-snug text-[#2b3037] md:mt-3.5 md:text-[15px]">
                  {pillar.question}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#6b7079] transition-colors group-hover:text-[#3a3f47] md:mt-5 md:text-[12px]">
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
