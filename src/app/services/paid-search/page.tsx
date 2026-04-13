import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import CountUp from '@/components/ui/CountUp';
import Accordion from '@/components/ui/Accordion';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getServiceBySlug, SERVICES } from '@/data/services';
import { CheckCircle, ArrowRight, Search, MousePointerClick, TrendingUp, DollarSign, BarChart3, Target, Eye, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Paid Search & Google Ads — Stray Web Design',
  description:
    'Google Ads campaigns built on conversion data, not guesswork. Landing pages, ad copy, tracking, and weekly optimization for local businesses.',
  alternates: { canonical: '/services/paid-search' },
};

function GoogleAdMockup({ business, headline1, headline2, description, url, sitelinks }: {
  business: string;
  headline1: string;
  headline2: string;
  description: string;
  url: string;
  sitelinks: readonly string[];
}) {
  return (
    <div className="border border-border-default bg-surface-card p-5">
      {/* Ad label */}
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800">
          Sponsored
        </span>
        <span className="text-text-secondary">{url}</span>
      </div>
      {/* Headlines */}
      <a className="mt-2 block text-lg font-medium leading-snug text-[#1a0dab] hover:underline md:text-xl">
        {headline1} — {headline2}
      </a>
      {/* Description */}
      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      {/* Sitelinks */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {sitelinks.map((link) => (
          <span key={link} className="text-sm text-[#1a0dab]">
            {link}
          </span>
        ))}
      </div>
    </div>
  );
}

function SearchResultMockup({ title, url, description }: {
  title: string;
  url: string;
  description: string;
}) {
  return (
    <div className="py-3">
      <span className="text-xs text-text-secondary">{url}</span>
      <p className="mt-0.5 text-base font-medium text-[#1a0dab] md:text-lg">
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}

function MetricCard({ icon: Icon, value, label, trend }: {
  icon: typeof TrendingUp;
  value: string;
  label: string;
  trend?: string;
}) {
  return (
    <div className="border border-border-default bg-surface-card p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-accent" />
        {trend && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-2xl font-bold text-text-primary md:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-text-tertiary">{label}</p>
    </div>
  );
}

function parseStat(stat: string): { value: number; prefix?: string; suffix?: string } {
  const cleaned = stat.replace(/,/g, '');
  const match = cleaned.match(/^([^0-9]*)(\d+\.?\d*)(.*)$/);
  if (!match) return { value: 0 };
  return {
    prefix: match[1] || undefined,
    value: parseFloat(match[2]),
    suffix: match[3] || undefined,
  };
}

export default function PaidSearchPage() {
  const service = getServiceBySlug('paid-search');
  if (!service) throw new Error('Service "paid-search" not found in data');
  const relatedServices = SERVICES.filter((s) =>
    (service.relatedServices ?? []).includes(s.slug)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Stray Web Design',
      url: 'https://straywebdesign.co',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: 'https://straywebdesign.co/services/paid-search',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero — The Pitch */}
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20 md:pb-28" aria-label="Paid search overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'Paid Search' },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Paid Search & Google Ads
              </p>
              <h1 className="mt-4 max-w-3xl font-mono text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                Stop hoping your ads work.
                <span className="text-accent"> Know they do.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                Imagine being excited to share your website with a friend or a potential
                client — and knowing that when you run ads, they will actually convert.
                Not because you got lucky. Because every piece — the ad, the landing page,
                the tracking — was built to work together.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                Let&apos;s stop leaving that up to chance. Proven methods to be seen,
                and proven systems to convert the customers who find you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href="/book" variant="primary">
                  Get a Free Ad Strategy
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border-default bg-surface-card py-12" aria-label="Key statistics">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4" staggerDelay={0.15}>
              {service.benefits.map((benefit, i) => {
                const parsed = parseStat(benefit.stat);
                return (
                  <StaggerItem key={i}>
                    <div className="text-center">
                      <div className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
                        <CountUp
                          value={parsed.value}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                        />
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{benefit.label}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* The Problem — Visual */}
        <section className="py-16 md:py-24" aria-label="The problem with most ads">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  The Problem
                </p>
                <h2 className="mt-3 font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  Most businesses send ad traffic here
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                  A homepage with ten different messages, five navigation options, and
                  zero connection to the ad they just clicked. Then they wonder why their
                  cost-per-lead is $200.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {/* Before — Homepage dump */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm font-semibold text-red-600">Without us — Traffic hits your homepage</span>
                  </div>
                  <div className="border-2 border-red-200 bg-red-50/50 p-6">
                    <div className="space-y-3">
                      <div className="h-3 w-3/4 rounded bg-red-200" />
                      <div className="flex gap-3">
                        <div className="h-2 w-16 rounded bg-red-200/70" />
                        <div className="h-2 w-16 rounded bg-red-200/70" />
                        <div className="h-2 w-16 rounded bg-red-200/70" />
                        <div className="h-2 w-16 rounded bg-red-200/70" />
                        <div className="h-2 w-16 rounded bg-red-200/70" />
                      </div>
                      <div className="mt-4 h-24 rounded bg-red-200/50" />
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-16 rounded bg-red-200/40" />
                        <div className="h-16 rounded bg-red-200/40" />
                        <div className="h-16 rounded bg-red-200/40" />
                      </div>
                      <div className="h-2 w-full rounded bg-red-200/30" />
                      <div className="h-2 w-5/6 rounded bg-red-200/30" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-20 rounded bg-red-200/40" />
                        <div className="h-20 rounded bg-red-200/40" />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm text-red-600">
                      <Eye className="h-4 w-4" />
                      <span>10 messages. 5 nav links. Visitor leaves.</span>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-2xl font-bold text-red-600">2.3% conversion rate</p>
                </div>

                {/* After — Dedicated landing page */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-600">With us — Traffic hits a dedicated page</span>
                  </div>
                  <div className="border-2 border-emerald-200 bg-emerald-50/50 p-6">
                    <div className="space-y-3">
                      <div className="h-4 w-2/3 rounded bg-emerald-300" />
                      <div className="h-2 w-1/2 rounded bg-emerald-200" />
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1">
                          <div className="h-2 w-full rounded bg-emerald-200/70" />
                          <div className="mt-2 h-2 w-5/6 rounded bg-emerald-200/70" />
                          <div className="mt-2 h-2 w-4/6 rounded bg-emerald-200/70" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded-full bg-emerald-300/60" />
                        <div className="flex-1">
                          <div className="h-2 w-3/4 rounded bg-emerald-200/60" />
                          <div className="mt-1 h-2 w-1/2 rounded bg-emerald-200/40" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded-full bg-emerald-300/60" />
                        <div className="flex-1">
                          <div className="h-2 w-3/4 rounded bg-emerald-200/60" />
                          <div className="mt-1 h-2 w-1/2 rounded bg-emerald-200/40" />
                        </div>
                      </div>
                      <div className="mx-auto mt-2 h-10 w-2/3 bg-emerald-400" />
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm text-emerald-600">
                      <Target className="h-4 w-4" />
                      <span>1 message. 1 action. Visitor converts.</span>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-2xl font-bold text-emerald-600">11.4% conversion rate</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Live Ad Mockup — What Your Ads Look Like */}
        <section className="relative overflow-hidden bg-surface-page py-16 md:py-24" aria-label="Ad mockup preview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  What It Looks Like
                </p>
                <h2 className="mt-3 font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  Your business, top of Google
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                  This is what it looks like when someone searches for your services.
                  Your ad — above every organic result, above every competitor.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="mx-auto mt-12 max-w-2xl">
                {/* Google search bar mockup */}
                <div className="rounded-t-xl border border-b-0 border-border-default bg-surface-card p-4">
                  <div className="flex items-center gap-3 rounded-full border border-border-strong bg-surface-card px-4 py-2.5">
                    <Search className="h-4 w-4 text-text-tertiary" />
                    <span className="text-sm text-text-primary md:text-base">best web designer near me</span>
                  </div>
                  <div className="mt-3 flex gap-4 border-b border-border-default pb-2 text-xs text-text-secondary">
                    <span className="border-b-2 border-[#1a73e8] pb-2 font-medium text-[#1a73e8]">All</span>
                    <span>Images</span>
                    <span>Maps</span>
                    <span>Shopping</span>
                  </div>
                </div>

                {/* Search results */}
                <div className="rounded-b-xl border border-t-0 border-border-default bg-surface-card px-4 pb-6">
                  <div className="divide-y divide-slate-100">
                    {/* Your ad — highlighted */}
                    <div className="relative py-4">
                      <div className="absolute -inset-x-2 -inset-y-1 bg-accent/10 ring-1 ring-accent/20" />
                      <div className="relative">
                        <GoogleAdMockup
                          business="Your Business"
                          headline1="Custom Websites That Convert"
                          headline2="Top-Rated Web Design"
                          description="Hand-coded, blazing fast websites that turn visitors into customers. 95+ Lighthouse scores. Sub-1s load times. Free site audit — see where you stand."
                          url="yourbusiness.com"
                          sitelinks={['Free Audit', 'Our Work', 'Pricing', 'Contact']}
                        />
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent">
                          <Sparkles className="h-3 w-3" />
                          <span>This is your ad. Above everyone else.</span>
                        </div>
                      </div>
                    </div>

                    {/* Competitor ads — faded */}
                    <div className="py-4 opacity-40">
                      <GoogleAdMockup
                        business="Competitor"
                        headline1="Web Design Services"
                        headline2="Affordable Websites"
                        description="We build websites for businesses. Call us today for a free quote on your next project..."
                        url="competitor-agency.com"
                        sitelinks={['Services', 'About']}
                      />
                    </div>

                    {/* Organic results — faded more */}
                    <div className="opacity-25">
                      <SearchResultMockup
                        title="10 Best Web Designers (2026) - Clutch"
                        url="clutch.co/web-designers"
                        description="Find the top web design companies. Compare reviews, portfolios, and pricing..."
                      />
                      <SearchResultMockup
                        title="Best Web Design Companies | Local Website Experts"
                        url="expertise.com/web-designers"
                        description="We researched the best web designers near you. Here are our top picks based on reviews and ratings..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Dashboard Mockup — Performance Metrics */}
        <section className="relative overflow-hidden bg-surface-page py-16 md:py-24" aria-label="Campaign performance">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Full Visibility
                </p>
                <h2 className="mt-3 font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  Know exactly where every dollar goes
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                  No black boxes. No mystery spend. Weekly reports that show you clicks,
                  conversions, cost-per-lead, and return on every dollar invested.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  icon={MousePointerClick}
                  value="2,847"
                  label="Clicks This Month"
                  trend="+18%"
                />
                <MetricCard
                  icon={Target}
                  value="342"
                  label="Conversions"
                  trend="+24%"
                />
                <MetricCard
                  icon={DollarSign}
                  value="$23"
                  label="Cost Per Lead"
                  trend="-12%"
                />
                <MetricCard
                  icon={BarChart3}
                  value="5.2x"
                  label="Return on Ad Spend"
                  trend="+31%"
                />
              </div>
            </AnimateIn>

            {/* Mini funnel */}
            <AnimateIn delay={0.35}>
              <div className="mx-auto mt-12 max-w-2xl">
                <div className="border border-border-default bg-surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                    Your Conversion Funnel
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      { label: 'Impressions', value: '48,200', width: '100%' },
                      { label: 'Clicks', value: '2,847', width: '58%' },
                      { label: 'Landing Page Views', value: '2,690', width: '55%' },
                      { label: 'Conversions', value: '342', width: '22%' },
                      { label: 'Revenue Generated', value: '$41,040', width: '85%' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center gap-4">
                        <div className="w-36 shrink-0 text-right text-sm text-text-tertiary md:w-44">
                          {row.label}
                        </div>
                        <div className="flex-1">
                          <div
                            className="flex h-8 items-center rounded bg-gradient-to-r from-accent to-accent/60 px-3 text-xs font-semibold text-white transition-all duration-1000"
                            style={{ width: row.width }}
                          >
                            {row.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Emotional pitch section */}
        <section className="py-16 md:py-24" aria-label="The real difference">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <div className="text-center">
                <h2 className="font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  This is the difference
                </h2>
                <div className="mx-auto mt-8 max-w-xl text-left">
                  <div className="space-y-6 text-lg leading-relaxed text-text-secondary">
                    <p>
                      Right now, someone in your city is searching for exactly what you sell.
                    </p>
                    <p>
                      They type it into Google. They see three ads. They click one.
                    </p>
                    <p>
                      If that ad is yours — and the page it lands on speaks directly to
                      what they searched for — they call. They book. They buy.
                    </p>
                    <p>
                      If it is not? That customer goes to whoever showed up instead.
                    </p>
                    <p className="font-semibold text-text-primary">
                      We make sure it is you. Every time someone searches, your business
                      is there — with the right message, the right page, and the right
                      reason to choose you.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Features */}
        <section className="bg-light-gray py-16 md:py-20" aria-label="Features included">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                What&apos;s Included
              </h2>
            </AnimateIn>
            <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {service.features.map((feature, i) => (
                <StaggerItem key={i}>
                  <div className="border border-border-default bg-surface-card p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <h3 className="font-mono font-bold text-text-primary">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-20" aria-label="How it works">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                How It Works
              </h2>
            </AnimateIn>
            <div className="mt-12 space-y-8">
              {service.process.map((step, i) => (
                <AnimateIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-lg font-bold text-text-primary">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-light-gray py-16 md:py-20" aria-label="Frequently asked questions">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Frequently Asked Questions
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <Accordion
                items={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
                className="mt-10"
              />
            </AnimateIn>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="border-t border-border-default py-16 md:py-20" aria-label="Related services">
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <AnimateIn>
                <h2 className="text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  Works Even Better With
                </h2>
              </AnimateIn>
              <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
                {relatedServices.map((rs) => (
                  <StaggerItem key={rs.slug}>
                    <a
                      href={`/services/${rs.slug}`}
                      className="group flex h-full flex-col border border-border-default bg-surface-card p-6 transition-all hover:-translate-y-1"
                    >
                      <h3 className="font-mono font-bold text-text-primary group-hover:text-accent transition-colors">
                        {rs.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                        {rs.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-surface-page py-16 md:py-20" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Ready to stop guessing?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                Free ad strategy session — we&apos;ll audit your market, show you what
                your competitors are spending, and map out a campaign that puts you
                in front of customers who are ready to buy.
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Let's Talk
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
