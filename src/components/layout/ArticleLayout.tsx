import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import Link from 'next/link';
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
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Writing', href: '/resources' },
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
              Back to Writing
            </a>

            <div className="flex items-center gap-3">
              <span className="bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Blog
              </span>
              <span className="bg-surface-sunken px-3 py-1 text-xs font-medium text-text-secondary">
                {meta.tag}
              </span>
              <span className="text-xs text-text-secondary">
                {meta.readTime}
              </span>
            </div>

            <h1 className="mt-6 font-display tracking-tight text-3xl font-bold leading-tight text-text-primary md:text-4xl">
              {meta.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {meta.description}
            </p>

            <div className="mt-3 text-sm text-text-secondary">
              Published{' '}
              {/* parse at local noon — bare YYYY-MM-DD parses as UTC midnight
                  and renders a day early in US timezones */}
              {new Date(meta.date + 'T12:00:00').toLocaleDateString('en-US', {
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
              <h3 className="font-display tracking-tight text-xl font-bold text-text-primary">
                Launching something new?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
                Tell me what you&apos;re building. I&apos;ll come back with
                a plan for what the site should actually do.
              </p>
              <div className="mt-6">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center font-display font-semibold transition-colors bg-accent text-white hover:bg-accent/90 px-7 py-3.5 text-base"
                >
                  Let&apos;s talk
                </Link>
              </div>
            </div>
          </AnimateIn>
        </article>
      </main>
      <Footer />
    </>
  );
}
