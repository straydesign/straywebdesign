'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';

interface Feature {
  number: string;
  headline: React.ReactNode;
  body: string;
  link: { label: string; href: string };
  tags: readonly string[];
}

const FEATURES: readonly Feature[] = [
  {
    number: '01',
    headline: (
      <>
        Visitors leave in 3 seconds if the site feels slow.{' '}
        <span className="text-text-tertiary">I build for that.</span>
      </>
    ),
    body: 'Sub-1-second loads, Lighthouse 100s, WCAG AA accessible.',
    link: { label: 'How I build', href: '/services/website-design' },
    tags: ['Sub-1s LCP', 'WCAG AA', 'Core Web Vitals', 'Mobile-first', 'Hand-coded'],
  },
  {
    number: '02',
    headline: (
      <>
        Indexable, fast, semantic{' '}
        <span className="text-text-tertiary">— so Google and AI assistants can read it.</span>
      </>
    ),
    body: 'Server-rendered HTML, real structured data, clean canonicals. The fundamentals Google’s 2026 GenAI search guide actually asks for.',
    link: { label: 'See the strategy', href: '/services/seo-optimization' },
    tags: ['Server-rendered', 'JSON-LD schema', 'Canonical URLs', 'Open Graph', 'FAQ schema'],
  },
  {
    number: '03',
    headline: (
      <>
        You have about 10 seconds to prove you’re worth their time.{' '}
        <span className="text-text-tertiary">I design for that.</span>
      </>
    ),
    body: 'Custom design, clear hierarchy, conversion-first copy. No templates, no plugin soup.',
    link: { label: 'See real examples', href: '/work' },
    tags: ['Zero templates', 'Custom design', 'Conversion-first', 'Motion & interaction'],
  },
];

function FeatureBlock({ feature, flip }: { feature: Feature; flip: boolean }) {
  const headlineCol = flip ? 'md:col-span-7 md:order-first lg:order-last' : 'md:col-span-7';
  const bodyCol = 'md:col-span-5 md:pb-2';

  return (
    <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
      <div className="grid items-end gap-8 md:grid-cols-12">
        {flip && (
          <AnimateIn className={bodyCol}>
            <p className="max-w-md font-mono text-lg leading-relaxed text-text-secondary">
              {feature.body}
            </p>
            <Link
              href={feature.link.href}
              className="group mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              {feature.link.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
        )}

        <AnimateIn delay={flip ? 0.15 : 0} className={headlineCol}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
            {feature.number}
          </p>
          <h2 className="mt-4 font-mono text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            {feature.headline}
          </h2>
        </AnimateIn>

        {!flip && (
          <AnimateIn delay={0.15} className={bodyCol}>
            <p className="max-w-md font-mono text-lg leading-relaxed text-text-secondary">
              {feature.body}
            </p>
            <Link
              href={feature.link.href}
              className="group mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              {feature.link.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
        )}
      </div>

      <AnimateIn delay={0.25}>
        <ul className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <li
              key={tag}
              className="border border-border-default px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </AnimateIn>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-surface-card pb-24 md:pb-32" aria-label="Services">
      {FEATURES.map((feature, i) => (
        <div key={feature.number}>
          <FeatureBlock feature={feature} flip={i === 1} />
          {i < FEATURES.length - 1 && (
            <div className="mx-auto mt-20 max-w-7xl px-5 md:mt-28 md:px-8">
              <div className="border-t border-border-default" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
