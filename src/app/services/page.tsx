import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ServiceCard from '@/components/ui/ServiceCard';
import { SERVICES } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Stray Web Design',
  description:
    'Custom website design, AI receptionist, SEO optimization, website management, landing pages, and analytics setup for Erie PA businesses.',
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        <section className="relative overflow-hidden bg-navy pt-28 pb-20" aria-label="Services overview">
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
                What We Build
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Services that outperform your competitors
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                From custom websites to AI-powered phone systems — everything your
                business needs to dominate online. No templates. No WordPress.
                No shortcuts.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="py-16 md:py-20" aria-label="All services">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {SERVICES.map((service) => (
                <StaggerItem key={service.slug}>
                  <ServiceCard service={service} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy py-16 md:py-20" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Not sure which services you need?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Start with a free site audit. We&apos;ll show you where your current site
                falls short and recommend exactly what will move the needle.
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
