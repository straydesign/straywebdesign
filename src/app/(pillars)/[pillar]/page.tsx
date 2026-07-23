import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PILLARS, getPillar } from '@/data/pillars';
import { getResourcesByTag, getResourcePath } from '@/lib/content';
import { generatePillarJsonLd } from '@/lib/json-ld';
import { SITE } from '@/lib/constants';

/* /[pillar] — one page per buyer-question cluster. Everything on the page
   comes from src/data/pillars.ts: the head question, the real related
   searches (shown as pills, doubling as the SEO signal), and the honest
   answer bands. Related reading is pulled live by tag from the blog. */

type Params = { pillar: string };

// Only the six real pillar slugs exist — anything else 404s statically.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};

  return {
    title: `${pillar.metaTitle} — ${SITE.name}`,
    description: pillar.metaDescription,
    alternates: { canonical: `/${pillar.slug}` },
    openGraph: {
      title: `${pillar.metaTitle} — ${SITE.name}`,
      description: pillar.metaDescription,
      url: `/${pillar.slug}`,
      type: 'article',
    },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const related = getResourcesByTag(pillar.tag, 3);
  const jsonLd = generatePillarJsonLd(pillar);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="min-h-[100dvh]">
        {/* ── Hero: the question + the honest lead ── */}
        <section
          className="relative overflow-hidden border-b border-border-default bg-surface-page pt-28 pb-16 md:pt-36 md:pb-20"
          aria-label={pillar.question}
        >
          {/* faint color wash keyed to the cluster */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl"
            style={{ background: pillar.color, opacity: 0.08 }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Answers', href: '/#questions' },
                  { label: pillar.nav },
                ]}
              />
              <span
                className="mt-2 inline-flex items-center gap-2 font-mono text-[13px] font-medium"
                style={{ color: pillar.color }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: pillar.color }}
                />
                {pillar.nav}
              </span>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary">
                {pillar.question}
              </h1>
              <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-text-secondary md:text-xl">
                {pillar.lead}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ── Price tiers: honest ranges by business size (cost pillar only) ── */}
        {pillar.tiers && (
          <section
            className="border-b border-border-default bg-surface-page py-16 md:py-20"
            aria-label="Price ranges by business size"
          >
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                {pillar.tiers.map((tier, i) => (
                  <AnimateIn key={tier.label} delay={i * 0.06}>
                    <div className="flex h-full flex-col rounded-2xl border border-border-default bg-surface-card p-6 md:p-7">
                      <span
                        className="inline-flex items-center gap-2 font-mono text-[12px] font-medium"
                        style={{ color: pillar.color }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: pillar.color }}
                        />
                        {tier.label}
                      </span>
                      <p className="mt-3 font-body text-[14px] leading-relaxed text-text-secondary md:min-h-[4.5rem]">
                        {tier.who}
                      </p>
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="whitespace-nowrap font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                          {tier.build}
                        </span>
                        <span className="font-body text-sm text-text-tertiary">
                          to build
                        </span>
                      </div>
                      <div className="mt-1 font-body text-[15px] text-text-secondary">
                        {tier.monthly}
                      </div>
                      <ul className="mt-5 flex flex-col gap-2 border-t border-border-default pt-5">
                        {tier.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 font-body text-[13.5px] leading-snug text-text-secondary"
                          >
                            <svg
                              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="none"
                              style={{ color: pillar.color }}
                              aria-hidden="true"
                            >
                              <path
                                d="M4 10.5 L8 14 L16 5.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto pt-4 font-body text-[13px] leading-relaxed text-text-tertiary">
                        {tier.note}
                      </p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
              {pillar.tiersNote && (
                <AnimateIn delay={0.12}>
                  <p className="mt-6 max-w-2xl font-body text-[14px] leading-relaxed text-text-tertiary">
                    {pillar.tiersNote}
                  </p>
                </AnimateIn>
              )}
            </div>
          </section>
        )}

        {/* ── Honest-answer bands: dark, mirrors the question map ── */}
        <section
          className="bg-[#101216] py-16 md:py-24"
          aria-label="The honest answer"
        >
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="flex flex-col gap-4 md:gap-5">
              {pillar.bands.map((band, i) => (
                <AnimateIn key={band.title} delay={i * 0.06}>
                  <div
                    className="rounded-2xl border p-6 md:p-8"
                    style={{
                      borderColor: `${pillar.color}33`,
                      background: `${pillar.color}0a`,
                    }}
                  >
                    <span
                      className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 font-mono text-[12px] font-medium"
                      style={{
                        color: pillar.color,
                        background: `${pillar.color}1f`,
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: pillar.color }}
                      />
                      {`0${i + 1}`}
                    </span>
                    <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-[#F4F5F7] md:text-2xl">
                      {band.title}
                    </h2>
                    <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-[#c4c8d0] md:text-base">
                      {band.body}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* the real searches this page answers */}
            <AnimateIn delay={0.1}>
              <div className="mt-12 border-t border-white/10 pt-8">
                <p className="font-mono text-[12px] text-[#8A8F98]">
                  These are the searches this page is here to answer.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {pillar.queries.map((q) => (
                    <span
                      key={q}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 font-body text-[13px] text-[#cfd3da]"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Build-it-yourself paths (diy-or-hire) ── */}
        {pillar.buildPaths && (
          <section
            className="border-b border-border-default bg-surface-page py-16 md:py-24"
            aria-label="Ways to build it yourself"
          >
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              {pillar.buildPathsLead && (
                <AnimateIn>
                  <p className="max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
                    {pillar.buildPathsLead}
                  </p>
                </AnimateIn>
              )}
              <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
                {pillar.buildPaths.map((path, i) => (
                  <AnimateIn key={path.name} delay={i * 0.06}>
                    <div className="flex h-full flex-col rounded-2xl border border-border-default bg-surface-card p-6 md:p-7">
                      <span className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-text-primary">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: pillar.color }}
                        />
                        {path.name}
                      </span>
                      <p className="mt-2 font-mono text-[12px] text-text-tertiary">
                        {path.tools}
                      </p>
                      <p className="mt-4 font-body text-[14px] leading-relaxed text-text-secondary">
                        {path.what}
                      </p>
                      <div className="mt-auto flex flex-col gap-4 pt-6">
                        <div>
                          <p
                            className="font-body text-[12.5px] font-semibold"
                            style={{ color: pillar.color }}
                          >
                            Good for
                          </p>
                          <p className="mt-1 font-body text-[13.5px] leading-snug text-text-secondary">
                            {path.goodFor}
                          </p>
                        </div>
                        <div>
                          <p className="font-body text-[12.5px] font-semibold text-text-tertiary">
                            The catch
                          </p>
                          <p className="mt-1 font-body text-[13.5px] leading-snug text-text-secondary">
                            {path.theCatch}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Deep dives: teach the work, name the skill ── */}
        {pillar.deepDives?.map((dive) => (
          <section
            key={dive.heading}
            className="border-b border-border-default bg-surface-card py-16 md:py-24"
            aria-label={dive.heading}
          >
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <AnimateIn>
                <span
                  className="font-mono text-[12px]"
                  style={{ color: pillar.color }}
                >
                  {dive.kicker}
                </span>
                <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-[1.1] tracking-tight text-text-primary">
                  {dive.heading}
                </h2>
                <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
                  {dive.lead}
                </p>
              </AnimateIn>

              <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
                {dive.items.map((item, i) => (
                  <AnimateIn key={item.title} delay={i * 0.05}>
                    <div className="flex gap-4">
                      <span
                        className="mt-0.5 font-mono text-[13px] font-medium tabular-nums"
                        style={{ color: pillar.color }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 font-body text-[14.5px] leading-relaxed text-text-secondary">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              <AnimateIn delay={0.1}>
                <div className="mt-12 rounded-2xl border border-border-default bg-surface-page p-6 md:p-8">
                  <p
                    className="font-mono text-[12px]"
                    style={{ color: pillar.color }}
                  >
                    The honest part
                  </p>
                  <p className="mt-2.5 max-w-3xl font-body text-[15px] leading-relaxed text-text-primary md:text-base">
                    {dive.close}
                  </p>
                </div>
              </AnimateIn>
            </div>
          </section>
        ))}

        {/* ── Per-industry breakdowns (for-your-industry) ── */}
        {pillar.industries && (
          <section
            className="border-b border-border-default bg-surface-page py-16 md:py-24"
            aria-label="What each trade needs"
          >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              {pillar.industriesLead && (
                <AnimateIn>
                  <p className="max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
                    {pillar.industriesLead}
                  </p>
                </AnimateIn>
              )}
              <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {pillar.industries.map((ind, i) => (
                  <AnimateIn key={ind.name} delay={i * 0.05}>
                    <div className="flex h-full flex-col rounded-2xl border border-border-default bg-surface-card p-6">
                      <span className="inline-flex items-center gap-2.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: pillar.color }}
                        />
                        <span className="font-display text-lg font-bold tracking-tight text-text-primary">
                          {ind.name}
                        </span>
                      </span>
                      <p className="mt-2.5 font-body text-[13px] leading-snug text-text-tertiary">
                        {ind.customer}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {ind.mustHaves.map((m) => (
                          <li
                            key={m}
                            className="flex items-start gap-2.5 font-body text-[13.5px] leading-snug text-text-secondary"
                          >
                            <svg
                              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="none"
                              style={{ color: pillar.color }}
                              aria-hidden="true"
                            >
                              <path
                                d="M4 10.5 L8 14 L16 5.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {m}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto border-t border-border-default pt-4 font-body text-[13px] leading-relaxed text-text-tertiary">
                        {ind.note}
                      </p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related reading: live by tag ── */}
        <section
          className="border-b border-border-default bg-surface-card py-16 md:py-20"
          aria-label="Related reading"
        >
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <AnimateIn>
              <span className="eyebrow mb-4">Related reading</span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                More on this, from the writing.
              </h2>
            </AnimateIn>

            {related.length > 0 ? (
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {related.map((r, i) => (
                  <AnimateIn key={r.slug} delay={i * 0.06}>
                    <Link
                      href={getResourcePath(r)}
                      className="group flex h-full flex-col rounded-lg border border-border-default bg-surface-page p-6 transition-all hover:-translate-y-1 hover:border-border-strong"
                    >
                      <span className="font-mono text-[11px] text-text-tertiary">
                        {r.readTime}
                      </span>
                      <h3 className="mt-3 flex-1 font-display text-base font-semibold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-accent">
                        {r.title}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent">
                        Read
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            ) : (
              <AnimateIn delay={0.1}>
                <div className="mt-8 rounded-lg border border-dashed border-border-strong bg-surface-page p-8">
                  <p className="font-body text-base leading-relaxed text-text-secondary">
                    Nothing here yet. I am still writing for this one. In the
                    meantime, ask me directly and I will answer.
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {SITE.email}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="bg-surface-page py-16 md:py-24"
          aria-label="Start a project"
        >
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <AnimateIn>
              <div className="rounded-2xl border border-border-default bg-surface-card p-8 md:p-12">
                <h2 className="max-w-xl font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                  Still deciding?
                </h2>
                <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-text-secondary md:text-lg">
                  Tell me what you are working on and I will give you a straight
                  read on what your site should do, before you spend a dollar.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center bg-accent px-7 py-3.5 font-display text-base font-semibold text-white transition-colors hover:bg-accent/90"
                  >
                    Start a project
                  </Link>
                  <a
                    href={`tel:+18149640081`}
                    className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
