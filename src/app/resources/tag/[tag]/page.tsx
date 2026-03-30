import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getAllTags, getResourcesByTag, getResourcePath } from '@/lib/content';
import { ArrowRight, BookOpen, FileText, BarChart3 } from 'lucide-react';

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const resources = getResourcesByTag(tag);
  if (resources.length === 0) return {};
  return {
    title: `${tag} Resources — Stray Web Design`,
    description: `Browse our ${tag.toLowerCase()} resources: blog posts, white papers, and case studies.`,
    alternates: { canonical: `/resources/tag/${encodeURIComponent(tag)}` },
    robots: { index: false, follow: true },
  };
}

const typeIcons = {
  blog: BookOpen,
  'white-paper': FileText,
  'case-study': BarChart3,
} as const;

const typeLabels = {
  blog: 'Blog',
  'white-paper': 'White Paper',
  'case-study': 'Case Study',
} as const;

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const resources = getResourcesByTag(tag);
  if (resources.length === 0) notFound();

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Resources', href: '/resources' },
                  { label: tag },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {resources.length} {resources.length === 1 ? 'Resource' : 'Resources'}
              </p>
              <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                {tag}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                Everything we&apos;ve written about {tag.toLowerCase()} — blog posts, white
                papers, and case studies.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
              {resources.map((resource) => {
                const Icon = typeIcons[resource.type];
                return (
                  <StaggerItem key={resource.slug}>
                    <a
                      href={getResourcePath(resource)}
                      className="group flex h-full flex-col border border-border-default bg-surface-card p-6 transition-all hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Icon className="h-3.5 w-3.5" />
                        <span>{typeLabels[resource.type]}</span>
                        <span>·</span>
                        <span>{resource.readTime}</span>
                      </div>
                      <h2 className="mt-3 font-mono text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                        {resource.title}
                      </h2>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-text-secondary line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent">
                        Read more
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
