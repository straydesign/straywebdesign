import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { LOCATIONS, getLocationBySlug, getAllLocationSlugs, type Location } from '@/data/locations';
import { INDUSTRIES } from '@/data/industries';
import { ArrowRight, MapPin } from 'lucide-react';

/** Map area display names to location slugs (only areas that have their own page) */
const AREA_SLUG_MAP = new Map(
  LOCATIONS.map((loc) => [loc.name, loc.slug]),
);

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
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20">
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
                <MapPin className="h-5 w-5 text-accent" />
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {location.fullName}
                </p>
              </div>
              <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                Web Design in {location.name}, PA
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                {location.context}
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  Let's Talk
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Location Stats */}
        <section className="border-b border-border-default bg-surface-card py-12">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-3" staggerDelay={0.15}>
              <StaggerItem>
                <div className="text-center">
                  <div className="font-mono text-3xl font-bold text-text-primary">{location.population}</div>
                  <p className="mt-2 text-sm text-text-secondary">Population</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="font-mono text-3xl font-bold text-text-primary">{location.metroPopulation}</div>
                  <p className="mt-2 text-sm text-text-secondary">Metro Area</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="font-mono text-3xl font-bold text-text-primary">{INDUSTRIES.length}</div>
                  <p className="mt-2 text-sm text-text-secondary">Industries Served</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Business Context */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Why {location.name} Businesses Need a Professional Website
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {location.businessContext}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="bg-light-gray py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <AnimateIn>
              <h2 className="text-center font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Industries We Serve in {location.name}
              </h2>
            </AnimateIn>
            <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.05}>
              {INDUSTRIES.map((industry) => (
                <StaggerItem key={industry.slug}>
                  <a
                    href={`/locations/${slug}/${industry.slug}`}
                    className="group flex h-full flex-col border border-border-default bg-surface-card p-5 transition-all hover:-translate-y-1"
                  >
                    <h3 className="font-mono text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                      {industry.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-text-secondary line-clamp-2">
                      {industry.description.slice(0, 120)}...
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent">
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
                <p className="text-sm text-text-secondary">
                  Also serving nearby areas:{' '}
                  {location.nearbyAreas.map((area, i) => {
                    const areaSlug = AREA_SLUG_MAP.get(area);
                    return (
                      <span key={area}>
                        {areaSlug ? (
                          <a
                            href={`/locations/${areaSlug}`}
                            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent/80"
                          >
                            {area}
                          </a>
                        ) : (
                          <span className="font-medium text-text-primary">{area}</span>
                        )}
                        {i < location.nearbyAreas.length - 1 && ', '}
                      </span>
                    );
                  })}
                </p>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-surface-page py-16 md:py-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Ready to stand out in {location.name}?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                Free site audit for {location.name} businesses. We&apos;ll show you
                exactly where your site stands right now.
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
