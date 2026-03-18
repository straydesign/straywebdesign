import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import type { ResourceMeta } from '@/lib/content';
import type { ReactNode } from 'react';

interface ArticleLayoutProps {
  meta: ResourceMeta;
  children: ReactNode;
  jsonLd: Record<string, unknown>;
}

export default function ArticleLayout({ meta, children, jsonLd }: ArticleLayoutProps) {
  const typeLabel =
    meta.type === 'blog'
      ? 'Blog'
      : meta.type === 'white-paper'
        ? 'White Paper'
        : 'Case Study';

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          <AnimateIn>
            <a
              href="/resources"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-navy"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </a>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-electric/10 px-3 py-1 text-xs font-medium text-electric">
                {typeLabel}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {meta.tag}
              </span>
              <span className="text-xs text-slate-400">
                {meta.readTime}
              </span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
              {meta.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              {meta.description}
            </p>

            <div className="mt-3 text-sm text-slate-400">
              Published{' '}
              {new Date(meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <hr className="my-8 border-slate-200" />
            <div className="prose-custom">
              {children}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <hr className="my-10 border-slate-200" />
            <div className="rounded-2xl border border-slate-200/60 bg-light-gray p-8 text-center">
              <h3 className="font-display text-xl font-bold text-navy">
                Ready to see how your site stacks up?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
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
