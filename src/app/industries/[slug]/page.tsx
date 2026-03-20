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
import { INDUSTRIES, getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import { SERVICES } from '@/data/services';
import { RESOURCES, getResourcePath } from '@/lib/content';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Web Design — Stray Web Design`,
    description: industry.description,
    alternates: { canonical: `/industries/${slug}` },
    keywords: industry.keywords,
  };
}

function parseStat(value: string): { num: number; prefix?: string; suffix?: string } {
  const cleaned = value.replace(/,/g, '');
  const match = cleaned.match(/^([^0-9]*)(\d+\.?\d*)(.*)$/);
  if (!match) return { num: 0 };
  return {
    prefix: match[1] || undefined,
    num: parseFloat(match[2]),
    suffix: match[3] || undefined,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  // Find related blog posts by matching the industry tag
  const relatedPosts = RESOURCES.filter(
    (r) =>
      r.tag.toLowerCase().includes(industry.shortName.toLowerCase()) ||
      industry.shortName.toLowerCase().includes(r.tag.toLowerCase())
  ).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${industry.name} Web Design`,
    description: industry.description,
    url: `https://straywebdesign.co/industries/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Stray Web Design',
      url: 'https://straywebdesign.co',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map((faq) => ({
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
      <main id="main" className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20" aria-label="Industry overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Industries', href: '/industries' },
                  { label: industry.shortName },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                {industry.shortName} Web Design
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Web Design for {industry.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {industry.longDescription}
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Get Your Free Audit
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-slate-200 bg-white py-12" aria-label="Key statistics">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4" staggerDelay={0.15}>
              {industry.stats.map((stat, i) => {
                const parsed = parseStat(stat.value);
                return (
                  <StaggerItem key={i}>
                    <div className="text-center">
                      <div className="font-display text-3xl font-bold text-navy md:text-4xl">
                        <CountUp
                          value={parsed.num}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                        />
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-16 md:py-20" aria-label="Industry challenges">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                The Challenge for {industry.name}
              </h2>
              <p className="mt-4 text-slate-600">
                Your {industry.patientOrClientTerm} are worth{' '}
                <span className="font-semibold text-navy">{industry.lifetimeValue}</span> over
                their lifetime. But {industry.competitorExample} and other competitors are investing
                heavily in their digital presence. Here&apos;s what you&apos;re up against:
              </p>
            </AnimateIn>
            <div className="mt-8 space-y-4">
              {industry.challenges.map((challenge, i) => (
                <AnimateIn key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white p-5">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <p className="text-slate-600">{challenge}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-light-gray py-16 md:py-20" aria-label="How we help">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                How We Help {industry.name}
              </h2>
            </AnimateIn>
            <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {SERVICES.map((service) => (
                <StaggerItem key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <h3 className="font-display font-bold text-navy group-hover:text-electric transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-electric">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20" aria-label="Frequently asked questions">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                {industry.shortName} Web Design FAQ
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <Accordion
                items={industry.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
                className="mt-10"
              />
            </AnimateIn>
          </div>
        </section>

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 bg-light-gray py-16 md:py-20" aria-label="Related resources">
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <AnimateIn>
                <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                  {industry.shortName} Resources
                </h2>
              </AnimateIn>
              <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
                {relatedPosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <a
                      href={getResourcePath(post)}
                      className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                    >
                      <h3 className="font-display text-sm font-bold text-navy group-hover:text-electric transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-electric">
                        Read more
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy py-16 md:py-20" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Ready to outperform {industry.competitorExample}?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Free site audit for {industry.name.toLowerCase()}. We&apos;ll show you exactly
                where you stand vs. the competition — and how a custom site changes the game.
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Book Your Free Audit
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
