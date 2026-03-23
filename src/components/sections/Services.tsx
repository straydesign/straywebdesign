'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';

export default function Services() {
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

      {/* Capability tags — tight row */}
      <AnimateIn delay={0.2}>
        <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {[
              'Sub-1s LCP',
              'Global CDN',
              'WCAG AA',
              'Core Web Vitals',
              'Mobile-First',
              'Semantic HTML',
              'Zero Plugins',
              'Hand-Coded',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
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
              Your competitors are invisible to AI. Structured data, llms.txt,
              and GEO mean ChatGPT and Perplexity cite your business — not theirs.
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

      {/* Capability tags */}
      <AnimateIn delay={0.2}>
        <div className="mx-auto mt-10 max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {[
              'JSON-LD Schema',
              'llms.txt',
              'GEO Optimized',
              'FAQ Schema',
              'Open Graph',
              'AI Citations',
              'Rich Results',
              'Canonical URLs',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
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
