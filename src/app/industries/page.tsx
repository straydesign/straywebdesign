import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { INDUSTRIES } from '@/data/industries';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve — Stray Web Design',
  description:
    'Custom websites for dental practices, financial advisors, car dealerships, law firms, restaurants, HVAC, and 14 more industries in Erie PA.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesIndex() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        <section className="relative overflow-hidden bg-navy pt-28 pb-20" aria-label="Industries overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Industries' },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                Industries We Serve
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Built for your industry, not a template
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Every industry has different challenges, different competitors, and different
                customer journeys. We build websites that understand yours.
              </p>
            </AnimateIn>
          </div>
        </section>

        <section className="py-16 md:py-20" aria-label="All industries">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.05}>
              {INDUSTRIES.map((industry) => (
                <StaggerItem key={industry.slug}>
                  <a
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <h2 className="font-display text-base font-bold text-navy group-hover:text-electric transition-colors">
                      {industry.name}
                    </h2>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                      {industry.description}
                    </p>
                    <div className="mt-3 text-xs text-slate-500">
                      {industry.patientOrClientTerm} worth{' '}
                      <span className="font-semibold text-navy">{industry.lifetimeValue}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-electric">
                      Learn more
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
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
                Don&apos;t see your industry?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                We build custom websites for any business where customer lifetime
                value matters. Book a free audit and we&apos;ll show you the opportunity.
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
