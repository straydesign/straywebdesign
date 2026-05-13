'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';

interface TagInfo {
  label: string;
  what: string;
  standard: string;
  ours: string;
}

const PERFORMANCE_TAGS: TagInfo[] = [
  {
    label: 'Sub-1s LCP',
    what: 'Time until main content is visible.',
    standard: 'Most local sites: 4–8 seconds.',
    ours: 'Under 1 second.',
  },
  {
    label: 'Global CDN',
    what: 'Served from 300+ edge locations worldwide.',
    standard: 'Single shared server in one city.',
    ours: 'Sub-second loads everywhere.',
  },
  {
    label: 'WCAG AA',
    what: 'International accessibility standard.',
    standard: '96% of top sites fail this.',
    ours: 'Contrast, keyboard nav, screen readers, semantic markup.',
  },
  {
    label: 'Core Web Vitals',
    what: 'Google\'s ranking metrics for page experience.',
    standard: 'Only 42% of sites pass all three.',
    ours: 'All green, with room to spare.',
  },
  {
    label: 'Mobile-First',
    what: 'Designed for phones, scaled up to desktop.',
    standard: 'Most sites: designed on desktop, squeezed onto mobile.',
    ours: 'Mobile-first. Optimized for 60%+ of your traffic.',
  },
  {
    label: 'Semantic HTML',
    what: 'Correct elements so machines understand your content.',
    standard: 'Template builders wrap everything in generic divs.',
    ours: 'Proper hierarchy. Search and AI parse every section.',
  },
  {
    label: 'Zero Plugins',
    what: 'No third-party plugins slowing the site or opening security holes.',
    standard: 'Average WordPress site: 13 active plugins.',
    ours: 'Custom-built. No plugin chain, no attack surface.',
  },
  {
    label: 'Hand-Coded',
    what: 'Every line written for your business.',
    standard: 'WordPress themes generate bloated, generic code.',
    ours: 'Custom React, no unused CSS, no render-blocking scripts.',
  },
];

const DESIGN_TAGS: TagInfo[] = [
  {
    label: 'Zero Templates',
    what: 'Designed and coded from scratch.',
    standard: 'Most agencies start from a $59 ThemeForest template.',
    ours: 'One of one. Built for your business.',
  },
  {
    label: 'Custom Design',
    what: 'Original visual design tailored to your brand.',
    standard: 'WordPress themes with a logo swap.',
    ours: 'Designed around your brand, audience, and market position.',
  },
  {
    label: 'Motion & Interaction',
    what: 'Purposeful animation that guides attention.',
    standard: 'Static pages, maybe a fade-in.',
    ours: 'Scroll-driven reveals, hover states, page transitions.',
  },
  {
    label: 'Beyond Referrals',
    what: 'A site that actively generates leads.',
    standard: 'Most local sites get built and forgotten.',
    ours: 'SEO + structured data + conversion-first layouts.',
  },
  {
    label: 'First Impression',
    what: 'Visitors judge your business in 0.05 seconds.',
    standard: 'Slow, dated sites signal you\'re behind.',
    ours: 'Sub-second loads and polished design signal modern.',
  },
  {
    label: 'Conversion-First',
    what: 'Every design decision serves a business goal.',
    standard: 'Generic, buried CTAs.',
    ours: 'Strategic CTAs and contact flows engineered to convert.',
  },
  {
    label: 'Brand Authority',
    what: 'Positions you as the clear leader.',
    standard: 'Same theme as every competitor.',
    ours: 'A site that makes competitors look outdated.',
  },
];

const AI_TAGS: TagInfo[] = [
  {
    label: 'JSON-LD Schema',
    what: 'Structured data so machines understand your business.',
    standard: 'Most local sites have zero structured data.',
    ours: 'Full LocalBusiness, Service, FAQ, Organization schemas.',
  },
  {
    label: 'llms.txt',
    what: 'Machine-readable summary for AI language models.',
    standard: 'Almost no local sites have this.',
    ours: 'A clean file ChatGPT and Perplexity can read instantly.',
  },
  {
    label: 'GEO Optimized',
    what: 'Content structured so AI search tools cite you.',
    standard: 'Traditional SEO does nothing for AI answers.',
    ours: 'Citations, stats, and conversational formatting AI prefers.',
  },
  {
    label: 'FAQ Schema',
    what: 'Markup so your FAQs surface in search + AI.',
    standard: 'Plain text. Google can\'t pull individual Q&As.',
    ours: 'Every FAQ marked up so AI can quote you verbatim.',
  },
  {
    label: 'Open Graph',
    what: 'Tags controlling how links look when shared.',
    standard: 'Random image, truncated title — unprofessional.',
    ours: 'Custom OG image, title, description on every page.',
  },
  {
    label: 'AI Citations',
    what: 'AI recommendations cite their sources. You can be it.',
    standard: 'No structured data = invisible to AI.',
    ours: 'Structured data and stats throughout — AI cites you.',
  },
  {
    label: 'Rich Results',
    what: 'Enhanced Google listings with FAQs, ratings, business info.',
    standard: 'Plain blue link, two lines of text.',
    ours: 'Structured snippets that increase click-through.',
  },
  {
    label: 'Canonical URLs',
    what: 'Tells search which page is the "official" version.',
    standard: 'Duplicate content splits ranking power.',
    ours: 'Proper canonical on every page.',
  },
];

function TagPill({ tag, onClick, isActive }: { tag: TagInfo; onClick: () => void; isActive: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`border px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
        isActive
          ? 'border-accent bg-accent text-white'
          : 'border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary'
      }`}
    >
      {tag.label}
    </button>
  );
}

function TagDetail({ tag, onClose }: { tag: TagInfo; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-4 border border-border-default bg-surface-page p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-mono text-base font-bold text-text-primary">{tag.label}</h4>
          <button onClick={onClose} className="shrink-0 p-1 text-text-tertiary transition-colors hover:text-text-primary" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">{tag.what}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="border border-border-default bg-surface-card p-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">The standard</p>
            <p className="mt-1.5 font-mono text-sm leading-relaxed text-text-secondary">{tag.standard}</p>
          </div>
          <div className="border border-accent/30 bg-surface-card p-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">What we do</p>
            <p className="mt-1.5 font-mono text-sm leading-relaxed text-text-primary">{tag.ours}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activePerfTag, setActivePerfTag] = useState<number | null>(null);
  const [activeAiTag, setActiveAiTag] = useState<number | null>(null);
  const [activeDesignTag, setActiveDesignTag] = useState<number | null>(null);

  return (
    <section id="services" className="bg-surface-card" aria-label="Services">
      {/* Editorial feature 1 — Performance */}
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <AnimateIn className="md:col-span-7">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
              01
            </p>
            <h2 className="mt-4 font-mono text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
              Visitors leave in 3 seconds if the site feels slow.{' '}
              <span className="text-text-tertiary">I build for that.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15} className="md:col-span-5 md:pb-2">
            <p className="max-w-md font-mono text-lg leading-relaxed text-text-secondary">
              Every second of delay costs you 7% in conversions. Sub-1-second loads,
              Lighthouse 100s, WCAG AA accessible — so the traffic you already have
              actually converts.
            </p>
            <Link
              href="/services/website-design"
              className="group mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              How we build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
        </div>
      </div>

      {/* Capability tags — clickable */}
      <AnimateIn delay={0.2}>
        <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {PERFORMANCE_TAGS.map((tag, i) => (
              <TagPill
                key={tag.label}
                tag={tag}
                isActive={activePerfTag === i}
                onClick={() => setActivePerfTag(activePerfTag === i ? null : i)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activePerfTag !== null && (
              <TagDetail
                key={activePerfTag}
                tag={PERFORMANCE_TAGS[activePerfTag]}
                onClose={() => setActivePerfTag(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </AnimateIn>

      {/* Divider */}
      <div className="mx-auto mt-20 max-w-7xl px-5 md:mt-28 md:px-8">
        <div className="border-t border-border-default" />
      </div>

      {/* Editorial feature 2 — AI & Search */}
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <AnimateIn className="md:col-span-5 md:pb-2">
            <p className="max-w-md font-mono text-lg leading-relaxed text-text-secondary">
              When someone asks ChatGPT or Perplexity for a recommendation in your
              city, your business should be the one they name. Structured data,
              llms.txt, and GEO make that happen.
            </p>
            <Link
              href="/services/seo-optimization"
              className="group mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              See the strategy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
          <AnimateIn delay={0.15} className="md:col-span-7 md:order-first lg:order-last">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
              02
            </p>
            <h2 className="mt-4 font-mono text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
              Built for the search engines{' '}
              <span className="text-text-tertiary">that don&apos;t exist yet.</span>
            </h2>
          </AnimateIn>
        </div>
      </div>

      {/* Capability tags — clickable */}
      <AnimateIn delay={0.2}>
        <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {AI_TAGS.map((tag, i) => (
              <TagPill
                key={tag.label}
                tag={tag}
                isActive={activeAiTag === i}
                onClick={() => setActiveAiTag(activeAiTag === i ? null : i)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeAiTag !== null && (
              <TagDetail
                key={activeAiTag}
                tag={AI_TAGS[activeAiTag]}
                onClose={() => setActiveAiTag(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </AnimateIn>

      {/* Divider */}
      <div className="mx-auto mt-20 max-w-7xl px-5 md:mt-28 md:px-8">
        <div className="border-t border-border-default" />
      </div>

      {/* Editorial feature 3 — Design & First Impression */}
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <AnimateIn className="md:col-span-7">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
              03
            </p>
            <h2 className="mt-4 font-mono text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
              You have about 10 seconds to prove you&apos;re worth their time.{' '}
              <span className="text-text-tertiary">I design for that.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15} className="md:col-span-5 md:pb-2">
            <p className="max-w-md font-mono text-lg leading-relaxed text-text-secondary">
              Most sites explain what the business does — not why someone should
              care or take action. Modern design, clear hierarchy, and conversion-first
              copy so visitors actually pick up the phone.
            </p>
            <Link
              href="/work"
              className="group mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              See real examples
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
        </div>
      </div>

      {/* Capability tags — clickable */}
      <AnimateIn delay={0.2}>
        <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {DESIGN_TAGS.map((tag, i) => (
              <TagPill
                key={tag.label}
                tag={tag}
                isActive={activeDesignTag === i}
                onClick={() => setActiveDesignTag(activeDesignTag === i ? null : i)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeDesignTag !== null && (
              <TagDetail
                key={activeDesignTag}
                tag={DESIGN_TAGS[activeDesignTag]}
                onClose={() => setActiveDesignTag(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </AnimateIn>

      <div className="pb-24 md:pb-32" />
    </section>
  );
}
