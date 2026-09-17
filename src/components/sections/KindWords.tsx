import AnimateIn from '@/components/ui/AnimateIn';
import { PROOF } from '@/data/proof';

/**
 * The one real quote, on its own.
 *
 * It used to run across the top of the proof wall. Split out 2026-09-17 to
 * mirror straydesign.co, which gives testimonials their own section rather
 * than hanging them off the work.
 *
 * There is exactly one, and it renders only if it exists. Sea Cave's and
 * Presque Isle's have been asked for and have not arrived; an empty slot reads
 * as a missing quote, which is worse than no slot.
 */
const FEATURED = PROOF.find((p) => p.quote);

export default function KindWords() {
  if (!FEATURED?.quote) return null;
  const { text, who, role, source } = FEATURED.quote;

  return (
    <section className="bg-surface-dark py-20 md:py-28" aria-label="What clients say">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn>
          <figure className="border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="font-display text-[clamp(1.15rem,2.4vw,1.6rem)] leading-[1.4] tracking-tight text-ink-dark-primary">
              &ldquo;{text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 font-body text-sm text-ink-dark-secondary">
              <span className="font-semibold text-ink-dark-primary">{who}</span>
              {' · '}
              {role}
              <span className="mt-1 block font-mono text-[11px] text-ink-dark-tertiary">
                {source}
              </span>
            </figcaption>
          </figure>
        </AnimateIn>
      </div>
    </section>
  );
}
