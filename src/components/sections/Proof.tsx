import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';
import { PROOF } from '@/data/proof';

/**
 * Proof — the four live sites, filed by what got catalogued so they read as
 * one mechanic at four scales. Gary's review runs across the top because it is
 * the only real quote there is, and a real one from a bar owner beats four
 * invented ones from anybody.
 *
 * Dark band. Ink comes from the --ink-dark-* tokens, which are measured
 * against this ground rather than eyeballed.
 */

const FEATURED = PROOF.find((p) => p.quote);

export default function Proof() {
  return (
    <section
      id="proof"
      className="bg-surface-dark py-20 md:py-28"
      aria-label="Client work"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimateIn>
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-ink-dark-primary">
            Four businesses in Erie, four lists that are now online.
          </h2>
        </AnimateIn>

        {FEATURED?.quote && (
          <AnimateIn delay={0.06}>
            <figure className="mt-12 border-l-2 border-accent pl-6 md:mt-14 md:pl-8">
              <blockquote className="max-w-3xl font-display text-[clamp(1.15rem,2.4vw,1.6rem)] leading-[1.4] tracking-tight text-ink-dark-primary">
                &ldquo;{FEATURED.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-body text-sm text-ink-dark-secondary">
                <span className="font-semibold text-ink-dark-primary">
                  {FEATURED.quote.who}
                </span>
                {' · '}
                {FEATURED.quote.role}
                <span className="mt-1 block font-mono text-[11px] text-ink-dark-tertiary">
                  {FEATURED.quote.source}
                </span>
              </figcaption>
            </figure>
          </AnimateIn>
        )}

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/10 md:mt-20 md:grid-cols-2">
          {PROOF.map((item, i) => (
            <li key={item.name} className="bg-surface-dark">
              <AnimateIn delay={i * 0.05}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-white/[0.04] md:p-8"
                >
                  <div className="overflow-hidden rounded border border-white/10">
                    <Image
                      src={item.shot}
                      alt={`${item.name} — the live site`}
                      width={1280}
                      height={800}
                      sizes="(min-width: 768px) 520px, 100vw"
                      className="w-full"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink-dark-primary md:text-xl">
                    {item.name}
                  </h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-ink-dark-secondary">
                    {item.catalogued}
                  </p>
                  <span className="mt-4 font-mono text-[11px] text-ink-dark-tertiary">
                    <span aria-hidden className="text-accent/70">{'// '}</span>
                    live · {item.displayUrl}
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </a>
              </AnimateIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
