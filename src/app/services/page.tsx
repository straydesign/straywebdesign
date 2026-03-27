import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import GradientText from '@/components/ui/GradientText';

export const metadata: Metadata = {
  title: 'Services — Stray Web Design',
  description:
    'One partner for your entire web presence. Custom website, SEO, AI readiness, hosting, and ongoing management — all handled. $2,500 to launch, $100/mo after.',
  alternates: { canonical: '/services' },
};

const INCLUDED = [
  {
    title: 'Custom-Built Website',
    description:
      'Hand-coded with Next.js. Not a template, not WordPress, not a page builder. Your site is built from scratch for your business.',
  },
  {
    title: 'Sub-1s Performance',
    description:
      'Lighthouse 95+, Core Web Vitals green across the board. Your site loads before visitors think about leaving.',
  },
  {
    title: 'WCAG AA Accessibility',
    description:
      'Proper contrast, keyboard navigation, screen reader support, semantic HTML. Every visitor can use your site.',
  },
  {
    title: 'Full SEO + AI Readiness',
    description:
      'JSON-LD schema, llms.txt, GEO optimization, local SEO, sitemap generation. Rank on Google and get recommended by AI assistants.',
  },
  {
    title: '$100/mo Management',
    description:
      'Hosting, SSL, updates, SEO monitoring, content edits, analytics, and priority support. Your site stays fast, secure, and performing.',
  },
] as const;

const ADDONS = [
  {
    name: 'AI Receptionist',
    description: '24/7 AI phone answering. Qualifies leads, books appointments, texts back missed callers.',
    href: '/services/ai-receptionist',
  },
  {
    name: 'Multi-Channel AI',
    description: 'One AI brain across phone, SMS, and web chat. Consistent experience on every channel.',
    href: '/services/ai-receptionist',
  },
  {
    name: 'Smart Scheduling + CRM',
    description: 'Calendar sync, CRM pipeline integration, zero double-bookings. Leads flow in automatically.',
    href: '/services/website-management',
  },
  {
    name: 'Analytics & Personalization',
    description: 'Heatmaps, session replay, conversion tracking, and visitor intelligence. Know what works.',
    href: '/services/analytics-setup',
  },
  {
    name: 'Paid Search Management',
    description: 'Google Ads and Meta campaigns with dedicated landing pages built to convert.',
    href: '/services/paid-search',
  },
] as const;

const LEAVING_BEHIND = [
  'WordPress plugin hell',
  'Template sites that look like everyone else',
  'Juggling 6 different vendors',
  '"Good enough" performance',
  'Waiting 3 days for a content update',
  'Sites that break on mobile',
] as const;

export default function ServicesIndex() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20 md:pb-28" aria-label="Services overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services' },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                How It Works
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Your Entire Web Presence.{' '}
                <GradientText>Handled.</GradientText>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                You don&apos;t shop for individual services here. You get one partner who
                builds, launches, and manages everything — your website, your SEO,
                your AI readiness, your hosting. One engagement. Nothing falls through
                the cracks.
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Get Your Free Audit
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section className="py-16 md:py-24" aria-label="What every client gets">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                Standard. Not Optional.
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy md:text-4xl">
                What Every Client Gets
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                This isn&apos;t a menu. Every engagement includes all of this — because
                cutting corners on any of it means your site underperforms.
              </p>
            </AnimateIn>

            <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {INCLUDED.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex h-full gap-4 rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-electric" strokeWidth={3} />
                    <div>
                      <h3 className="font-display font-bold text-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Add-Ons ── */}
        <section className="border-t border-slate-200 bg-light-gray py-16 md:py-24" aria-label="Available add-ons">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                For Businesses That Want More
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy md:text-4xl">
                Available <GradientText>Add-Ons</GradientText>
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                Your website is the foundation. These extend what it can do — from
                answering your phone to running your ad campaigns.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.15} className="mt-12">
              <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                {ADDONS.map((addon) => (
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
                        {addon.description}
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
          </div>
        </section>

        {/* ── What You're Leaving Behind ── */}
        <section className="py-16 md:py-24" aria-label="What you are leaving behind">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-navy md:text-4xl">
                What You&apos;re Leaving Behind
              </h2>
            </AnimateIn>
            <StaggerContainer className="mt-10 space-y-4" staggerDelay={0.06}>
              {LEAVING_BEHIND.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50">
                      <X className="h-4 w-4 text-red-400" strokeWidth={2.5} />
                    </span>
                    <p className="text-lg text-slate-600">
                      No more <span className="font-semibold text-navy">{item.toLowerCase()}</span>.
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="border-t border-slate-200 bg-light-gray py-16 md:py-24" aria-label="Pricing">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                Transparent Pricing
              </p>
              <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
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
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
                No hidden fees. No hourly billing surprises. No contracts — cancel
                anytime, keep all your code. Every dollar goes into work that
                performs, not overhead.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-navy py-16 md:py-24" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Ready to stop piecing it together?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Free site audit. We&apos;ll show you where your current site falls short
                and exactly what a complete web presence looks like for your business.
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Get Your Free Audit
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
