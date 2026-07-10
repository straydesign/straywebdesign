import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import DeviceDuo from '@/components/ui/DeviceDuo';
import MagneticButton from '@/components/ui/MagneticButton';
import { PROJECTS } from '@/data/clients';
import { SITE } from '@/lib/constants';

/* /work/[slug] — one case-study page per live client site. Every fact on
   these pages comes from the project data in clients.ts, which is pulled
   from each site's actual code and public content. */

type Params = { slug: string };

// Only the three real client slugs exist — anything else 404s statically.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} — Case Study | ${SITE.name}`;
  const description = `How I designed and built ${project.displayUrl}, the live website for ${project.name}, a ${project.type.toLowerCase()} in ${project.place ?? 'Erie, PA'} — and how it runs day to day.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/work/${project.slug}`,
      type: 'article',
    },
  };
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
      <span aria-hidden className="text-accent/60">{'// '}</span>
      {children}
    </p>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE.url}/#work` },
      { '@type': 'ListItem', position: 3, name: project.name },
    ],
  };

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh] bg-surface-page pt-28 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="mx-auto max-w-6xl px-5 md:px-8">
          <AnimateIn>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Work', href: '/#work' },
                { label: project.name },
              ]}
            />

            <SectionEyebrow>case study — live client site</SectionEyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-text-primary">
              {project.name}
            </h1>
            <p className="mt-2 font-body text-base text-text-tertiary">
              {project.type}
              {project.place ? ` · ${project.place}` : ''}
            </p>

            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
              {project.caseStudy.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Visit {project.displayUrl}
                <span aria-hidden>→</span>
              </a>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="mt-14 md:mt-16">
              <DeviceDuo
                shot={project.shot}
                phoneShot={project.phoneShot}
                name={project.name}
                priority
              />
              <p className="mt-2 pr-[10%] text-right font-mono text-[11px] uppercase tracking-[0.1em] text-text-tertiary">
                <span aria-hidden className="text-accent/60">{'// '}</span>
                live · {project.displayUrl}
              </p>
            </div>
          </AnimateIn>

          <div className="mx-auto mt-16 max-w-3xl md:mt-20">
            <AnimateIn>
              <SectionEyebrow>what the site does</SectionEyebrow>
              <div className="mt-5 space-y-5">
                {project.caseStudy.built.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="font-body text-[15px] leading-relaxed text-text-secondary md:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>
              <ul className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border-default bg-surface-card px-3 py-1 font-mono text-[11px] text-text-secondary"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </AnimateIn>

            <AnimateIn>
              <div className="mt-14 md:mt-16">
                <SectionEyebrow>the design</SectionEyebrow>
                <p className="mt-5 font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                  {project.caseStudy.design}
                </p>
                <div className="mt-7 grid gap-6 rounded-lg border border-border-default bg-surface-card p-5 sm:grid-cols-2 md:p-6">
                  <div>
                    <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                      <span aria-hidden className="text-accent/60">{'// '}</span>palette
                    </p>
                    <ul className="mt-3 space-y-2">
                      {project.palette.map((c) => (
                        <li key={c.hex} className="flex items-center gap-2.5">
                          <span
                            aria-hidden
                            className="h-4 w-4 shrink-0 rounded-full border border-border-strong"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="font-mono text-[12px] text-text-secondary">
                            {c.hex.toUpperCase()}
                          </span>
                          <span className="font-body text-[13px] text-text-tertiary">
                            {c.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                      <span aria-hidden className="text-accent/60">{'// '}</span>type
                    </p>
                    <ul className="mt-3 space-y-2">
                      {project.typefaces.map((t) => (
                        <li key={t} className="font-body text-[15px] text-text-secondary">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn>
              <div className="mt-14 md:mt-16">
                <SectionEyebrow>how it runs</SectionEyebrow>
                <p className="mt-5 font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                  {project.caseStudy.runs}
                </p>
              </div>
            </AnimateIn>

            <AnimateIn>
              <div className="mt-16 rounded-lg border border-border-default/60 bg-surface-card p-8 text-center md:mt-20">
                <h2 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                  Want a site that works this hard?
                </h2>
                <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-text-secondary">
                  Tell me about your business and I&apos;ll come back with a
                  plan for what the site should actually do. You can also just
                  call: {SITE.phone}.
                </p>
                <div className="mt-6">
                  <MagneticButton href="/#contact" variant="primary">
                    Start a project
                  </MagneticButton>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn>
              <div className="mt-14">
                <SectionEyebrow>more live work</SectionEyebrow>
                <ul className="mt-4 space-y-3">
                  {others.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/work/${p.slug}`}
                        className="group inline-flex items-baseline gap-2 font-body text-base font-medium text-text-primary underline-offset-4 hover:underline"
                      >
                        {p.name}
                        <span className="font-body text-sm font-normal text-text-tertiary">
                          {p.type}
                        </span>
                        <span
                          aria-hidden
                          className="text-accent transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
