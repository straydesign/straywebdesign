import Link from 'next/link';
import DeviceDuo from '@/components/ui/DeviceDuo';
import { CASE_STUDIES } from '@/data/caseStudies';
import { PROOF } from '@/data/proof';

/**
 * What to read next, at the foot of a case study.
 *
 * straydesign.co closes a study with its `NextProject`, which drives the
 * client shell through a `Page` union. This site has routes, so the same idea
 * is three links. The device render comes from PROOF, matched on the live URL
 * rather than on a slug — the two datasets were written apart and only the URL
 * is guaranteed to agree.
 */
export default function NextStudy({ currentSlug }: { currentSlug: string }) {
  const others = CASE_STUDIES.filter((c) => c.slug !== currentSlug);
  if (!others.length) return null;

  /* No horizontal padding utilities on the section, on purpose. The section
     rail is `position: fixed` and sits over the whole article, and what keeps
     the article's text out from under it is `--cs-pad`, which jumps to
     clamp(13rem, 17vw, 17.5rem) at the rail's breakpoint. Tailwind's `px-8`
     ignored that and started this strip at 32px, so the rail painted straight
     across the first card and the "More sites" line. The padding comes from
     --cs-pad in case-study.css instead — one token, so a change to the rail's
     width moves this with it. */
  return (
    <section className="cs-next py-16 md:py-24" aria-label="More work">
      <div className="mx-auto max-w-7xl">
        <p
          className="mb-8 text-[15px] italic md:text-base"
          style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}
        >
          More sites
        </p>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {others.map((c) => {
            const shot = PROOF.find((p) => p.url === c.liveUrl);
            return (
              <li key={c.slug}>
                <Link href={`/work/${c.slug}`} className="group block">
                  {shot && (
                    <DeviceDuo
                      shot={shot.shot}
                      phoneShot={shot.phoneShot}
                      alt={`${c.client} — desktop`}
                      phoneAlt={`${c.client} on a phone`}
                    />
                  )}
                  <h3
                    className="mt-4 font-black leading-[1.15] tracking-wide"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--ink)',
                      fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                    }}
                  >
                    {c.client}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                    {c.title}
                  </p>
                  <span
                    className="mt-3 inline-block text-[12px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--ink)' }}
                  >
                    Read the case study
                    <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
