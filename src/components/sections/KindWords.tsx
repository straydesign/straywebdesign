import TextCard from '@/components/ui/TextCard';
import SectionHeading from '@/components/sections/SectionHeading';
import AnimateIn from '@/components/ui/AnimateIn';
import { PROOF } from '@/data/proof';

/**
 * KIND WORDS — straydesign.co's section, ported.
 *
 * It was a dark band with the quote hung off the top of the work gallery.
 * The portfolio gives testimonials their own light section with a kicker and
 * a display title, so this does the same.
 *
 * There is exactly one quote and it renders only if it exists. Sea Cave's and
 * Presque Isle's have been asked for and have not arrived; an empty card reads
 * as a missing quote, which is worse than no card.
 */
const FEATURED = PROOF.find((p) => p.quote);

const initialsOf = (who: string, role: string) => {
  const source = who.toLowerCase() === 'owner' ? role : who;
  return source
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
};

export default function KindWords() {
  if (!FEATURED?.quote) return null;
  const { text, who, role, source } = FEATURED.quote;

  return (
    <section className="px-4 py-12 md:px-8 md:py-16" aria-label="Kind words">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Clients, verbatim" title="KIND WORDS" className="mb-10 md:mb-14" />

        <AnimateIn direction="up">
          <div className="max-w-2xl">
            <TextCard padding="lg">
              <blockquote
                className="text-[17px] leading-relaxed md:text-lg"
                style={{ color: 'var(--ink)' }}
              >
                &ldquo;{text}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-[12px] font-bold"
                  style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
                >
                  {initialsOf(who, role)}
                </span>
                <span className="text-[13px] leading-snug" style={{ color: 'var(--ink-2)' }}>
                  <span className="block font-semibold" style={{ color: 'var(--ink)' }}>
                    {who}
                  </span>
                  {role}
                  <span className="mt-0.5 block text-[11px]">{source}</span>
                </span>
              </div>
            </TextCard>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
