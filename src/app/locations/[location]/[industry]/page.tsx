import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Accordion from '@/components/ui/Accordion';
import { getAllLocationSlugs, getLocationBySlug } from '@/data/locations';
import { getAllIndustrySlugs, getIndustryBySlug } from '@/data/industries';
import { SERVICES } from '@/data/services';
import { getIntersectionContent, getIntersectionFaqs } from '@/data/intersections';
import { ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  const locations = getAllLocationSlugs();
  const industries = getAllIndustrySlugs();
  return locations.flatMap((location) =>
    industries.map((industry) => ({ location, industry }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; industry: string }>;
}): Promise<Metadata> {
  const { location: locSlug, industry: indSlug } = await params;
  const location = getLocationBySlug(locSlug);
  const industry = getIndustryBySlug(indSlug);
  if (!location || !industry) return {};
  return {
    title: `${industry.name} Web Design in ${location.name}, PA — Stray Web Design`,
    description: `Custom websites for ${industry.name.toLowerCase()} in ${location.fullName}. Fast, accessible, conversion-focused design that outperforms ${industry.competitorExample}.`,
    alternates: { canonical: `/locations/${locSlug}/${indSlug}` },
    keywords: industry.keywords,
  };
}

export default async function LocationIndustryPage({
  params,
}: {
  params: Promise<{ location: string; industry: string }>;
}) {
  const { location: locSlug, industry: indSlug } = await params;
  const location = getLocationBySlug(locSlug);
  const industry = getIndustryBySlug(indSlug);
  if (!location || !industry) notFound();

  const intersectionContent = getIntersectionContent(indSlug, locSlug);
  const faqs = getIntersectionFaqs(indSlug, locSlug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${industry.name} Web Design in ${location.name}, PA`,
      description: `Custom websites for ${industry.name.toLowerCase()} in ${location.fullName}.`,
      url: `https://straywebdesign.co/locations/${locSlug}/${indSlug}`,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Stray Web Design',
        url: 'https://straywebdesign.co',
        areaServed: {
          '@type': 'City',
          name: location.name,
          containedInPlace: { '@type': 'State', name: 'Pennsylvania' },
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://straywebdesign.co' },
        { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://straywebdesign.co/locations' },
        { '@type': 'ListItem', position: 3, name: location.name, item: `https://straywebdesign.co/locations/${locSlug}` },
        { '@type': 'ListItem', position: 4, name: industry.shortName },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Locations', href: '/locations' },
                  { label: location.name, href: `/locations/${locSlug}` },
                  { label: industry.shortName },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                {industry.shortName} · {location.name}, PA
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                {industry.name} Web Design in {location.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {intersectionContent}
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Get Your Free Audit
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Services for this Industry in this Location */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                Our Services for {industry.name} in {location.name}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
                Every service is built specifically for how {industry.name.toLowerCase()} attract and
                retain {industry.patientOrClientTerm} in the {location.name} market.
              </p>
            </AnimateIn>
            <div className="mt-12 space-y-6">
              {SERVICES.map((service, i) => (
                <AnimateIn key={service.slug} delay={i * 0.08}>
                  <div className="rounded-xl border border-slate-200/60 bg-white p-6 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-navy md:text-xl">
                          {service.name}
                        </h3>
                        <p className="mt-2 leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {service.features.slice(0, 4).map((feature) => (
                            <li key={feature.title} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="mt-0.5 text-electric">✓</span>
                              <span>{feature.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={`/services/${service.slug}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-electric/10 px-4 py-2.5 text-sm font-semibold text-electric transition-colors hover:bg-electric/20"
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Challenges */}
        <section className="bg-light-gray py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                The Challenge for {location.name} {industry.name}
              </h2>
              <p className="mt-4 text-slate-600">
                Your {industry.patientOrClientTerm} are worth{' '}
                <span className="font-semibold text-navy">{industry.lifetimeValue}</span> over
                their lifetime. Here&apos;s what {location.name} businesses are up against:
              </p>
            </AnimateIn>
            <div className="mt-8 space-y-3">
              {industry.challenges.map((challenge, i) => (
                <AnimateIn key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-200/60 bg-white p-4">
                    <span className="mt-0.5 text-amber-500">⚠</span>
                    <p className="text-sm text-slate-600">{challenge}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Location Context */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                Why {location.name} for Your {industry.shortName} Business
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {location.businessContext}
              </p>
              {location.nearbyAreas.length > 0 && (
                <p className="mt-4 leading-relaxed text-slate-600">
                  We also serve {industry.name.toLowerCase()} in{' '}
                  {location.nearbyAreas.join(', ')} and the surrounding {location.name} area.
                  Every site we build is optimized to rank across these communities.
                </p>
              )}
            </AnimateIn>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-5 md:px-8">
              <AnimateIn>
                <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                  {industry.shortName} Web Design in {location.name} — FAQ
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <Accordion items={faqs} className="mt-10" />
              </AnimateIn>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy py-16 md:py-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Ready to outperform {industry.competitorExample} in {location.name}?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Free site audit for {industry.name.toLowerCase()} in {location.name}. We&apos;ll show
                you exactly where you stand vs. the local competition.
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
