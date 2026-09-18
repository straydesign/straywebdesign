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

  return (
    <section className="cs-next px-4 py-16 md:px-8 md:py-24" aria-label="More work">
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
