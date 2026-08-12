import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import DeviceDuo from '@/components/ui/DeviceDuo';
import { PROJECTS, type Project } from '@/data/clients';
import { SITE } from '@/lib/constants';

/* /work — the gallery index. Every live client site grouped by the kind of
   business it is, so a visitor in a given industry lands on work like theirs
   and can open the full case study. Everything here comes from clients.ts,
   which is pulled from each site's real code and public content. */

export const metadata: Metadata = {
  title: `Work by Industry — Live Client Sites | ${SITE.name}`,
  description:
    'Every website I build, host, and manage for a real business, grouped by industry — bars and restaurants, specialty shops, and more. Open any case study or visit the live site.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: `Work by Industry — Live Client Sites | ${SITE.name}`,
    description:
      'Live client websites grouped by industry. Open any case study or visit the live site.',
    url: `${SITE.url}/work`,
    type: 'website',
  },
};

/* Group the real projects by their vertical, preserving first-seen order so
   the layout is deterministic (no invented ordering, no invented groups). */
function groupByVertical(projects: readonly Project[]): [string, Project[]][] {
  const order: string[] = [];
  const groups = new Map<string, Project[]>();
  for (const p of projects) {
    if (!groups.has(p.vertical)) {
      groups.set(p.vertical, []);
      order.push(p.vertical);
    }
    groups.get(p.vertical)!.push(p);
  }
  return order.map((v) => [v, groups.get(v)!]);
}

function GalleryCard({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <article className="flex flex-col rounded-lg border border-border-default bg-surface-card p-5 md:p-6">
      <DeviceDuo
        shot={project.shot}
        phoneShot={project.phoneShot}
        name={project.name}
        priority={priority}
      />
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-1 font-body text-sm text-text-tertiary">
          {project.type}
          {project.place ? ` · ${project.place}` : ''}
        </p>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border-default bg-surface-page px-3 py-1 font-mono text-[11px] text-text-secondary"
            >
              {chip}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-text-primary underline-offset-4 hover:underline"
          >
            Read the case study
            <span
              aria-hidden
              className="text-accent transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-text-tertiary underline-offset-4 transition-colors hover:text-text-secondary hover:underline"
          >
            Visit {project.displayUrl}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function WorkGalleryPage() {
  const groups = groupByVertical(PROJECTS);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Work by Industry',
    url: `${SITE.url}/work`,
    hasPart: PROJECTS.map((p) => ({
      '@type': 'WebSite',
      name: p.name,
      url: p.url,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE.url}/work` },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <AnimateIn>
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Work' }]}
            />
            <span className="eyebrow mb-3">The work — by industry</span>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-text-primary">
              Live sites, grouped by the kind of business.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
              Every site below is a real business I built, host, and still run.
              Find the work closest to yours, open the case study, or go straight
              to the live site.
            </p>
          </AnimateIn>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
            {groups.map(([vertical, projects], gi) => (
              <section key={vertical} aria-label={vertical}>
                <AnimateIn>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border-default pb-3">
                    <h2 className="font-display text-lg font-bold tracking-tight text-text-primary md:text-xl">
                      {vertical}
                    </h2>
                    <span className="font-mono text-[11px] text-text-tertiary">
                      {projects.length} {projects.length === 1 ? 'site' : 'sites'}
                    </span>
                  </div>
                </AnimateIn>
                <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
                  {projects.map((p, pi) => (
                    <AnimateIn key={p.slug} delay={pi * 0.08}>
                      <GalleryCard project={p} priority={gi === 0 && pi === 0} />
                    </AnimateIn>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <AnimateIn>
            <div className="mt-20 rounded-lg border border-border-default/60 bg-surface-card p-8 text-center">
              <h2 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                Don&apos;t see your industry yet?
              </h2>
              <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-text-secondary">
                The build is the same whatever the business: a site that does
                real work, that you can actually run. Tell me about yours, or
                just call {SITE.phone}.
              </p>
              <div className="mt-6">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center bg-accent px-7 py-3.5 font-display text-base font-semibold text-white transition-colors hover:bg-accent/90"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
