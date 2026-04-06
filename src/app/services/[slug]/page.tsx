import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import CountUp from '@/components/ui/CountUp';
import Accordion from '@/components/ui/Accordion';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SERVICES, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import {
  CheckCircle,
  ArrowRight,
  PhoneIncoming,
  Database,
  UserRoundSearch,
  MousePointerClick,
  CalendarCheck,
  ArrowDownToLine,
  TrendingUp,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Stray Web Design`,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
  };
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

const ARCH_ICONS: Record<string, typeof PhoneIncoming> = {
  'phone-incoming': PhoneIncoming,
  database: Database,
  'user-round-search': UserRoundSearch,
  'mouse-pointer-click': MousePointerClick,
  'calendar-check': CalendarCheck,
  'arrow-down-to-line': ArrowDownToLine,
  'trending-up': TrendingUp,
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = SERVICES.filter((s) =>
    service.relatedServices.includes(s.slug)
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
    areaServed: {
      '@type': 'City',
      name: 'Erie',
      addressRegion: 'PA',
    },
    url: `https://straywebdesign.co/services/${slug}`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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

        {/* Hero */}
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20" aria-label="Service overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: service.shortName },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {service.shortName}
              </p>
              <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                {service.longDescription}
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Let's Talk
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

        {/* Features */}
        <section className="py-16 md:py-20" aria-label="Features included">
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

        {/* Architecture Deep Dive */}
        {service.architecture && service.architecture.length > 0 && (
          <section className="relative overflow-hidden bg-surface-page py-16 md:py-24" aria-label="System architecture">
            <GrainOverlay />
            <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-8">
              <AnimateIn>
                <p className="text-center text-sm font-semibold uppercase tracking-wider text-accent">
                  Under the Hood
                </p>
                <h2 className="mt-3 text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  How the System Actually Works
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-center text-text-tertiary">
                  This isn&apos;t a chatbot reading a script. It&apos;s a full customer intelligence
                  system connected to your business data, your calendar, and your CRM.
                </p>
              </AnimateIn>

              <div className="relative mt-14">
                {/* Vertical connecting line */}
                <div
                  className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-6"
                  aria-hidden="true"
                />

                <div className="space-y-10">
                  {service.architecture.map((layer, i) => {
                    const Icon = ARCH_ICONS[layer.icon] ?? Database;
                    return (
                      <AnimateIn key={i} delay={i * 0.08}>
                        <div className="relative flex gap-5 md:gap-6">
                          {/* Node dot */}
                          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-surface-page md:h-12 md:w-12">
                            <Icon className="h-4 w-4 text-accent md:h-5 md:w-5" />
                          </div>
                          {/* Content */}
                          <div className="pt-1">
                            <h3 className="font-mono text-base font-bold text-text-primary md:text-lg">
                              {layer.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-text-tertiary md:text-base">
                              {layer.description}
                            </p>
                          </div>
                        </div>
                      </AnimateIn>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process */}
        <section className="bg-light-gray py-16 md:py-20" aria-label="How it works">
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
        <section className="py-16 md:py-20" aria-label="Frequently asked questions">
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
          <section className="border-t border-border-default bg-light-gray py-16 md:py-20" aria-label="Related services">
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <AnimateIn>
                <h2 className="text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                  Related Services
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
                Ready to get started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                Free site audit — we&apos;ll show you exactly where your current site
                stands and how {service.shortName.toLowerCase()} can transform your business.
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
