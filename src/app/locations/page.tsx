import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { LOCATIONS } from '@/data/locations';
import { ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Areas — Stray Web Design',
  description:
    'Professional web design for businesses in Meadville, Warren, Millcreek, and communities across northwest Pennsylvania and beyond.',
  alternates: { canonical: '/locations' },
};

export default function LocationsIndex() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Locations' },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Service Areas
              </p>
              <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                Web design for northwest Pennsylvania
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                We build websites for businesses across northwest Pennsylvania and
                beyond. Local knowledge, national-caliber design.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
              {LOCATIONS.map((location) => (
                <StaggerItem key={location.slug}>
                  <a
                    href={`/locations/${location.slug}`}
                    className="group flex h-full flex-col border border-border-default bg-surface-card p-6 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <h2 className="font-mono text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                        {location.name}, {location.state}
                      </h2>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {location.description}
                    </p>
                    <div className="mt-3 text-xs text-text-secondary">
                      Population: <span className="font-semibold text-text-primary">{location.population}</span>
                      {' · '}Metro: <span className="font-semibold text-text-primary">{location.metroPopulation}</span>
                    </div>
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

        <section className="relative overflow-hidden bg-surface-page py-16 md:py-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Don&apos;t see your area?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                We work with businesses across Pennsylvania and beyond. Book a free
                audit and we&apos;ll show you how a custom website can grow your business.
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
