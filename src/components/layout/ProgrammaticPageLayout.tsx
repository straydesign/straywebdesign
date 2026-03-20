import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import CountUp from '@/components/ui/CountUp';
import Accordion from '@/components/ui/Accordion';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/ui/Breadcrumbs';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ProgrammaticPageLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  description: string;
  stats: Stat[];
  sections: { heading: string; content: string }[];
  faqs: FAQ[];
  jsonLd: Record<string, unknown>[];
  ctaText?: string;
}

export default function ProgrammaticPageLayout({
  breadcrumbs,
  title,
  subtitle,
  description,
  stats,
  sections,
  faqs,
  jsonLd,
  ctaText = 'Get Your Free Audit',
}: ProgrammaticPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20" aria-label="Overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs items={breadcrumbs} />
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                {subtitle}
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {description}
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  {ctaText}
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Stats */}
        {stats.length > 0 && (
          <section className="border-b border-slate-200 bg-white py-12" aria-label="Key statistics">
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4" staggerDelay={0.15}>
                {stats.map((stat, i) => (
                  <StaggerItem key={i}>
                    <div className="text-center">
                      <div className="font-display text-3xl font-bold text-navy md:text-4xl">
                        <CountUp
                          value={stat.value}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                        />
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* Content Sections */}
        <section className="py-16 md:py-20" aria-label="Details">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            {sections.map((section, i) => (
              <AnimateIn key={i} delay={i * 0.1}>
                <div className={i > 0 ? 'mt-12' : ''}>
                  <h2 className="font-display text-2xl font-bold text-navy">
                    {section.heading}
                  </h2>
                  <div
                    className="mt-4 leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="relative bg-light-gray py-16 md:py-20" aria-label="Frequently asked questions">
            <div className="mx-auto max-w-3xl px-5 md:px-8">
              <AnimateIn>
                <h2 className="text-center font-display text-2xl font-bold text-navy md:text-3xl">
                  Frequently Asked Questions
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <Accordion items={faqs} className="mt-10" />
              </AnimateIn>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy py-16 md:py-20" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Ready to outperform your competitors?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Free Lighthouse audit — we&apos;ll show you exactly where your site stands
                vs. the competition. No obligation, no sales pitch.
              </p>
              <div className="mt-8">
                <MagneticButton href="/book" variant="primary">
                  {ctaText}
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
