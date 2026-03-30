import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import RelatedPosts from '@/components/resources/RelatedPosts';
import type { ResourceMeta, Resource } from '@/lib/content';
import type { ReactNode } from 'react';

interface ArticleLayoutProps {
  meta: ResourceMeta;
  children: ReactNode;
  jsonLd: Record<string, unknown>;
  relatedPosts?: (Resource & { path: string })[];
}

export default function ArticleLayout({ meta, children, jsonLd, relatedPosts = [] }: ArticleLayoutProps) {
  const typeLabel =
    meta.type === 'blog'
      ? 'Blog'
      : meta.type === 'white-paper'
        ? 'White Paper'
        : 'Case Study';

  const typeDir =
    meta.type === 'blog'
      ? 'blog'
      : meta.type === 'white-paper'
        ? 'white-papers'
        : 'case-studies';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: typeLabel, href: `/resources#${meta.type}` },
    { label: meta.title },
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh] pt-28 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          <AnimateIn>
            <Breadcrumbs items={breadcrumbs} />
            <a
              href="/resources"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </a>

            <div className="flex items-center gap-3">
              <span className="bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {typeLabel}
              </span>
              <span className="bg-surface-sunken px-3 py-1 text-xs font-medium text-text-secondary">
                {meta.tag}
              </span>
              <span className="text-xs text-text-secondary">
                {meta.readTime}
              </span>
            </div>

            <h1 className="mt-6 font-mono text-3xl font-bold leading-tight text-text-primary md:text-4xl">
              {meta.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {meta.description}
            </p>

            <div className="mt-3 text-sm text-text-secondary">
              Published{' '}
              {new Date(meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <hr className="my-8 border-border-default" />
            <div className="prose-custom">
              {children}
            </div>
          </AnimateIn>

          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}

          <AnimateIn delay={0.3}>
            <hr className="my-10 border-border-default" />
            <div className="border border-border-default/60 bg-light-gray p-8 text-center">
              <h3 className="font-mono text-xl font-bold text-text-primary">
                Ready to see how your site stacks up?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
                Free Lighthouse audit for Erie businesses. We&apos;ll show you
                exactly where you stand vs. the competition.
              </p>
              <div className="mt-6">
                <MagneticButton href="/#contact" variant="primary">
                  Get Your Free Audit
                </MagneticButton>
              </div>
            </div>
          </AnimateIn>
        </article>
      </main>
      <Footer />
    </>
  );
}
