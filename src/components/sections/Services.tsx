'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';

interface TagInfo {
  label: string;
  what: string;
  standard: string;
  ours: string;
}

const PERFORMANCE_TAGS: TagInfo[] = [
  {
    label: 'Sub-1s LCP',
    what: 'Largest Contentful Paint — the time it takes for the main content on your page to become visible.',
    standard: 'Most local business sites load in 4-8 seconds. Google considers anything over 2.5s a poor experience.',
    ours: 'Our sites render the main content in under 1 second. That means visitors see your page before they even think about hitting the back button.',
  },
  {
    label: 'Global CDN',
    what: 'Content Delivery Network — your site is served from hundreds of locations worldwide, not a single server.',
    standard: 'Most small business sites run on a single shared hosting server, often in one city. Distance = delay.',
    ours: 'Your site is cached at 300+ edge locations globally. Your visitors get sub-second speed whether they\'re across town or across the world.',
  },
  {
    label: 'WCAG AA',
    what: 'Web Content Accessibility Guidelines — the international standard for making websites usable by people with disabilities.',
    standard: '96% of the top million websites have accessibility failures. Most local business sites have never been audited.',
    ours: 'Every page meets WCAG AA compliance — proper contrast ratios, keyboard navigation, screen reader support, and semantic markup.',
  },
  {
    label: 'Core Web Vitals',
    what: 'Google\'s three key metrics for page experience: loading speed (LCP), interactivity (INP), and visual stability (CLS).',
    standard: 'Only 42% of websites pass all three Core Web Vitals thresholds. It\'s a direct Google ranking signal.',
    ours: 'We pass all three with room to spare. Green scores across the board — not borderline, not "good enough."',
  },
  {
    label: 'Mobile-First',
    what: 'Designing for phones first, then scaling up to desktop — because that\'s how most people browse.',
    standard: 'Many agencies still design on desktop and "make it responsive" as an afterthought. Mobile layouts get squeezed and broken.',
    ours: 'Every component starts as a mobile design. Touch targets, scroll behavior, and readability are optimized for the device 60%+ of your visitors actually use.',
  },
  {
    label: 'Semantic HTML',
    what: 'Using the correct HTML elements for their intended purpose — headings, navigation, articles, buttons — so browsers, screen readers, and search engines understand your content.',
    standard: 'Template builders wrap everything in generic divs. Google and AI assistants can\'t tell your nav from your footer.',
    ours: 'Proper heading hierarchy, landmark regions, and structured elements. Search engines and AI assistants can parse every section of your site.',
  },
  {
    label: 'Zero Plugins',
    what: 'No third-party plugins or extensions that slow your site down and create security vulnerabilities.',
    standard: 'The average WordPress site runs 13 active plugins. Each one adds load time, security risk, and maintenance overhead.',
    ours: 'Everything is custom-built. No plugin chain, no dependency bloat, no attack surface. Just clean code that does exactly what it needs to.',
  },
  {
    label: 'Hand-Coded',
    what: 'Every line of code is written specifically for your business — no page builders, no drag-and-drop templates.',
    standard: 'Most agencies use WordPress themes or page builders that generate bloated, generic code. You get the same site as everyone else.',
    ours: 'Custom React components, optimized for your content. No unused CSS, no render-blocking scripts, no code you don\'t need.',
  },
];

const DESIGN_TAGS: TagInfo[] = [
  {
    label: 'Zero Templates',
    what: 'Every site is designed and coded from scratch. No themes, no page builders, no drag-and-drop.',
    standard: 'Most agencies start from a $59 ThemeForest template and customize the colors. You get the same layout as thousands of other businesses.',
    ours: 'Your site is one of one. Every layout, every component, every interaction is built specifically for your business and your customers.',
  },
  {
    label: 'Custom Design',
    what: 'Original visual design tailored to your brand — not a generic template with your logo dropped in.',
    standard: 'WordPress themes ship with preset layouts. Agencies swap the logo, change the hero image, and call it "custom." You can spot the template from a mile away.',
    ours: 'We design around your brand, your audience, and your market position. The result looks like nothing else in your industry — because it isn\'t.',
  },
  {
    label: 'Motion & Interaction',
    what: 'Purposeful animations and micro-interactions that guide attention and make the experience feel alive.',
    standard: 'Template sites are static pages. Maybe a fade-in. The experience feels flat and forgettable.',
    ours: 'Scroll-driven animations, hover states, page transitions, and interactive elements that make visitors want to keep exploring.',
  },
  {
    label: 'Beyond Referrals',
    what: 'A website that actively generates leads — not just a digital business card collecting dust.',
    standard: 'Most local business sites get built and forgotten. They exist, but they don\'t work. New customers still come from word of mouth alone.',
    ours: 'Your site becomes a growth channel. SEO, structured data, and conversion-optimized layouts bring in customers who\'ve never heard of you.',
  },
  {
    label: 'First Impression',
    what: 'Visitors judge your business in 0.05 seconds based on your website. That snap judgment determines whether they stay or bounce.',
    standard: 'A slow, dated WordPress site tells visitors your business is behind the times — even if it isn\'t. 75% of users judge credibility by design alone.',
    ours: 'Sub-second loads, polished design, and fluid interactions signal that your business is modern, professional, and worth their time.',
  },
  {
    label: 'Conversion-First',
    what: 'Every design decision serves a business goal — driving calls, bookings, form submissions, or foot traffic.',
    standard: 'Template sites put design choices in the hands of the theme developer, not your business strategy. CTAs are generic and buried.',
    ours: 'Strategic placement of calls-to-action, contact flows, and social proof. Every section is engineered to move visitors toward becoming customers.',
  },
  {
    label: 'Brand Authority',
    what: 'A website that positions you as the clear leader in your market — not one of many.',
    standard: 'When every competitor has the same WordPress theme with a stock photo hero, nobody stands out. You\'re competing on price, not presence.',
    ours: 'A site that makes competitors look outdated by comparison. The kind of web presence that makes people ask "who built that?"',
  },
];

const AI_TAGS: TagInfo[] = [
  {
    label: 'JSON-LD Schema',
    what: 'Structured data markup that tells search engines and AI exactly what your business is, what you offer, where you\'re located, and how to contact you.',
    standard: 'Most local business sites have zero structured data. Google has to guess what your business does from unstructured text.',
    ours: 'Full LocalBusiness, Service, FAQ, and Organization schemas. Google and AI assistants get a complete, machine-readable profile of your business.',
  },
  {
    label: 'llms.txt',
    what: 'A standardized file (like robots.txt) that gives AI language models a clean, structured summary of your business.',
    standard: 'Almost no local business sites have this. AI assistants have to scrape and guess from whatever HTML they find.',
    ours: 'A purpose-built file that tells ChatGPT, Perplexity, and other AI tools exactly who you are, what you do, and why someone should choose you.',
  },
  {
    label: 'GEO Optimized',
    what: 'Generative Engine Optimization — structuring your content so AI-powered search tools cite and recommend your business.',
    standard: 'Traditional SEO optimizes for link-based algorithms. It does nothing for the AI-generated answers that are replacing search results.',
    ours: 'Content structured with citations, statistics, and conversational formatting that AI models prefer when selecting sources to cite.',
  },
  {
    label: 'FAQ Schema',
    what: 'Structured markup that lets your frequently asked questions appear directly in Google search results and AI responses.',
    standard: 'Most FAQ pages are just text on a page. Google can\'t pull individual Q&As into search features or AI overviews.',
    ours: 'Every FAQ entry is marked up so Google can surface your answers directly in search results — and AI assistants can quote them verbatim.',
  },
  {
    label: 'Open Graph',
    what: 'Meta tags that control how your site looks when shared on social media, messaging apps, and link previews.',
    standard: 'Without Open Graph tags, shared links show a random image (or none) with a truncated title. Looks unprofessional.',
    ours: 'Custom OG images, titles, and descriptions for every page. Your links look polished everywhere they\'re shared.',
  },
  {
    label: 'AI Citations',
    what: 'When AI tools like ChatGPT or Perplexity recommend a business, they cite their source. Your site can be that source.',
    standard: 'Businesses without structured data and authoritative content are invisible to AI recommendation engines.',
    ours: 'Structured data, citations, and statistics embedded throughout your content make your site the authoritative source AI models cite.',
  },
  {
    label: 'Rich Results',
    what: 'Enhanced Google search listings that show star ratings, FAQs, pricing, images, or business details right in the results page.',
    standard: 'A plain blue link with two lines of text. That\'s what most local businesses get. It blends in with everything else.',
    ours: 'Your search listing stands out with structured snippets — FAQ dropdowns, business info, and visual enhancements that increase click-through rates.',
  },
  {
    label: 'Canonical URLs',
    what: 'Tags that tell search engines which version of a page is the "official" one, preventing duplicate content issues.',
    standard: 'Duplicate content confuses search engines and splits your ranking power across multiple URLs. Common with template sites.',
    ours: 'Every page has a proper canonical tag. No duplicate content diluting your search rankings.',
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

      {/* Divider */}
      <div className="mx-auto mt-20 max-w-7xl px-5 md:mt-28 md:px-8">
        <div className="border-t border-border-default" />
      </div>

      {/* Add-ons — tight editorial strip */}
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-24 md:px-8 md:pt-20 md:pb-32">
        <AnimateIn>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
            Also Available
          </p>
          <h3 className="mt-4 font-mono text-2xl font-bold text-text-primary md:text-3xl">
            AI-Powered <GradientText>Add-Ons</GradientText>
          </h3>
        </AnimateIn>

        <AnimateIn delay={0.15} className="mt-10">
          <div className="grid gap-px overflow-hidden border border-border-default bg-border-default sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'AI Receptionist',
                line: '24/7 call answering, lead qualification, appointment booking.',
                href: '/services/ai-receptionist',
              },
              {
                name: 'Multi-Channel AI',
                line: 'One brain across phone, SMS, and web chat.',
                href: '/services/ai-receptionist',
              },
              {
                name: 'Smart Scheduling',
                line: 'Calendar sync, CRM updates, zero double-bookings.',
                href: '/services/website-management',
              },
              {
                name: 'Analytics',
                line: 'Visitor tracking, heatmaps, conversion prediction.',
                href: '/services/analytics-setup',
              },
            ].map((addon) => (
              <Link
                key={addon.name}
                href={addon.href}
                className="group flex flex-col justify-between bg-surface-card p-6 transition-colors hover:bg-surface-page"
              >
                <div>
                  <p className="font-mono text-base font-bold text-text-primary">
                    {addon.name}
                  </p>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
                    {addon.line}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </AnimateIn>

        {/* Pricing — bold, not hidden */}
        <AnimateIn delay={0.2} className="mt-16 md:mt-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
            <p className="font-mono text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-tighter text-text-primary">
              $1,500+
            </p>
            <div>
              <p className="font-mono text-lg text-text-secondary">
                to launch. <span className="font-semibold text-text-primary">$100/mo</span> after.
              </p>
              <p className="mt-1 font-mono text-sm text-text-tertiary">
                Hosting, support, SEO monitoring, content updates, analytics, ad infrastructure.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
