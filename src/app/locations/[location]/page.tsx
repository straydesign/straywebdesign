import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { LOCATIONS, getLocationBySlug, getAllLocationSlugs } from '@/data/locations';
import { INDUSTRIES } from '@/data/industries';
import { ArrowRight, MapPin } from 'lucide-react';

export function generateStaticParams() {
  return getAllLocationSlugs().map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `Web Design in ${location.name}, PA — Stray Web Design`,
    description: `Custom websites for businesses in ${location.fullName}. ${location.description.slice(0, 120)}`,
    alternates: { canonical: `/locations/${slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Web Design in ${location.name}, PA`,
    description: location.description,
    url: `https://straywebdesign.co/locations/${slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Stray Web Design',
      url: 'https://straywebdesign.co',
      areaServed: {
        '@type': 'City',
        name: location.name,
        containedInPlace: {
          '@type': 'State',
          name: 'Pennsylvania',
        },
      },
    },
  };

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Locations', href: '/locations' },
                  { label: location.name },
                ]}
              />
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-electric" />
                <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                  {location.fullName}
                </p>
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Web Design in {location.name}, PA
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {location.context}
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Get Your Free Audit
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Location Stats */}
        <section className="border-b border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-3" staggerDelay={0.15}>
              <StaggerItem>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-navy">{location.population}</div>
                  <p className="mt-2 text-sm text-slate-600">Population</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-navy">{location.metroPopulation}</div>
                  <p className="mt-2 text-sm text-slate-600">Metro Area</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-navy">{INDUSTRIES.length}</div>
                  <p className="mt-2 text-sm text-slate-600">Industries Served</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Business Context */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                Why {location.name} Businesses Need a Professional Website
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {location.businessContext}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="bg-light-gray py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                Industries We Serve in {location.name}
              </h2>
            </AnimateIn>
            <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.05}>
              {INDUSTRIES.map((industry) => (
                <StaggerItem key={industry.slug}>
                  <a
                    href={`/locations/${slug}/${industry.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <h3 className="font-display text-sm font-bold text-navy group-hover:text-electric transition-colors">
                      {industry.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {industry.description.slice(0, 120)}...
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-electric">
                      View services
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Nearby Areas */}
        {location.nearbyAreas.length > 0 && (
          <section className="py-12">
            <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
              <AnimateIn>
                <p className="text-sm text-slate-500">
                  Also serving nearby areas:{' '}
                  {location.nearbyAreas.map((area, i) => (
                    <span key={area}>
                      <span className="font-medium text-slate-700">{area}</span>
                      {i < location.nearbyAreas.length - 1 && ', '}
                    </span>
                  ))}
                </p>
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
                Ready to stand out in {location.name}?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Free site audit for {location.name} businesses. We&apos;ll show you exactly
                exactly where your site stands right now.
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
