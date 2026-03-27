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
    ours: 'Your site is cached at 300+ edge locations globally. A visitor in Erie gets the same sub-second speed as someone in Tokyo.',
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
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
        isActive
          ? 'border-electric bg-electric text-white'
          : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-navy'
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
      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-display text-base font-bold text-navy">{tag.label}</h4>
          <button onClick={onClose} className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:text-navy" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{tag.what}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">The standard</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{tag.standard}</p>
          </div>
          <div className="rounded-xl bg-white p-4 ring-1 ring-electric/20">
            <p className="text-xs font-semibold tracking-wider text-electric uppercase">What we do</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{tag.ours}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activePerfTag, setActivePerfTag] = useState<number | null>(null);
  const [activeAiTag, setActiveAiTag] = useState<number | null>(null);

  return (
    <section id="services" className="bg-white" aria-label="Services">
      {/* Editorial feature 1 — Performance */}
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <AnimateIn className="md:col-span-7">
            <p className="text-sm font-semibold tracking-widest text-electric uppercase">
              01
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-navy">
              Performance is not a feature.{' '}
              <span className="text-slate-400">It&apos;s the foundation.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15} className="md:col-span-5 md:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-slate-500">
              Sub-1-second loads. Lighthouse 100s. WCAG AA accessible. Your site
              will outperform Fortune 500 companies on every metric Google measures.
            </p>
            <Link
              href="/services/website-design"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-electric"
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
        <div className="border-t border-slate-200" />
      </div>

      {/* Editorial feature 2 — AI & Search */}
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <AnimateIn className="md:col-span-5 md:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-slate-500">
              Structured data, llms.txt, and GEO mean ChatGPT and Perplexity
              cite your business — not someone else.
            </p>
            <Link
              href="/services/seo-optimization"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-electric"
            >
              See the strategy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateIn>
          <AnimateIn delay={0.15} className="md:col-span-7 md:order-first lg:order-last">
            <p className="text-sm font-semibold tracking-widest text-electric uppercase">
              02
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-navy">
              Built for the search engines{' '}
              <span className="text-slate-400">that don&apos;t exist yet.</span>
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
        <div className="border-t border-slate-200" />
      </div>

      {/* Add-ons — tight editorial strip */}
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-24 md:px-8 md:pt-20 md:pb-32">
        <AnimateIn>
          <p className="text-sm font-semibold tracking-widest text-electric uppercase">
            Also Available
          </p>
          <h3 className="mt-4 font-display text-2xl font-bold text-navy md:text-3xl">
            AI-Powered <GradientText>Add-Ons</GradientText>
          </h3>
        </AnimateIn>

        <AnimateIn delay={0.15} className="mt-10">
          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group flex flex-col justify-between bg-white p-6 transition-colors hover:bg-slate-50"
              >
                <div>
                  <p className="font-display text-base font-bold text-navy">
                    {addon.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {addon.line}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-electric opacity-0 transition-opacity group-hover:opacity-100">
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
            <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-tight text-navy">
              $2,500
            </p>
            <div>
              <p className="text-lg text-slate-500">
                to launch. <span className="font-semibold text-navy">$100/mo</span> after.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Hosting, support, SEO monitoring, content updates, analytics, ad infrastructure.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
