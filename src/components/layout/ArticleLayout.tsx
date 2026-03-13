'use client';

import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import type { Resource } from '@/lib/resources';

function renderMarkdown(content: string): string {
  return content
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('## '))
        return `<h2 class="mt-10 mb-4 font-display text-2xl font-bold text-navy">${block.slice(3)}</h2>`;
      if (block.startsWith('### '))
        return `<h3 class="mt-8 mb-3 font-display text-xl font-semibold text-navy">${block.slice(4)}</h3>`;
      if (block.startsWith('| ')) {
        const rows = block.split('\n').filter((r) => !r.match(/^\|\s*[-|]+\s*\|$/));
        const isHeader = true;
        const tableRows = rows
          .map((row, i) => {
            const cells = row
              .split('|')
              .filter(Boolean)
              .map((c) => c.trim());
            const tag = i === 0 && isHeader ? 'th' : 'td';
            const cellClass =
              tag === 'th'
                ? 'px-4 py-2.5 text-left text-sm font-semibold text-navy bg-slate-50'
                : 'px-4 py-2.5 text-sm text-slate-600';
            return `<tr class="border-b border-slate-100">${cells.map((c) => `<${tag} class="${cellClass}">${c}</${tag}>`).join('')}</tr>`;
          })
          .join('');
        return `<div class="my-6 overflow-x-auto rounded-xl border border-slate-200/60"><table class="w-full">${tableRows}</table></div>`;
      }
      if (block.startsWith('- ') || block.startsWith('* ')) {
        const items = block.split('\n').map((line) => {
          const text = line.replace(/^[-*]\s+/, '');
          return `<li class="text-slate-600">${formatInline(text)}</li>`;
        });
        return `<ul class="my-4 space-y-2 pl-5 list-disc">${items.join('')}</ul>`;
      }
      if (block.match(/^\d+\.\s/)) {
        const items = block.split('\n').map((line) => {
          const text = line.replace(/^\d+\.\s+/, '');
          return `<li class="text-slate-600">${formatInline(text)}</li>`;
        });
        return `<ol class="my-4 space-y-2 pl-5 list-decimal">${items.join('')}</ol>`;
      }
      return `<p class="my-4 leading-relaxed text-slate-600">${formatInline(block)}</p>`;
    })
    .join('');
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-electric underline hover:text-electric/80" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

export default function ArticleLayout({ resource }: { resource: Resource }) {
  const typeLabel =
    resource.type === 'blog'
      ? 'Blog'
      : resource.type === 'white-paper'
        ? 'White Paper'
        : 'Case Study';

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-20">
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
                {resource.tag}
              </span>
              <span className="text-xs text-slate-400">
                {resource.readTime}
              </span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
              {resource.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              {resource.description}
            </p>

            <div className="mt-3 text-sm text-slate-400">
              Published{' '}
              {new Date(resource.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <hr className="my-8 border-slate-200" />
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(resource.content),
              }}
            />
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
