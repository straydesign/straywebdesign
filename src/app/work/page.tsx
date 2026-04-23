import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GrainOverlay from '@/components/ui/GrainOverlay';
import MagneticButton from '@/components/ui/MagneticButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Work — Stray Web Design',
  description:
    'Recent builds from Stray Web Design. Enterprise-grade websites for local businesses — bars, tattoo shops, IT companies, lawn care, and more.',
  alternates: { canonical: '/work' },
};

interface Project {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly url: string;
  readonly tag: string;
}

const PROJECTS: readonly Project[] = [
  {
    name: "Andy's Ale House & Grill",
    type: 'Bar & Restaurant',
    description:
      'Full website with CMS-powered menus, daily specials, events calendar, and contact form. Replaced a legacy WordPress site.',
    url: 'https://andys-mu.vercel.app',
    tag: 'Client Site',
  },
  {
    name: 'Bullfrog Bar',
    type: 'Bar & Live Music Venue',
    description:
      'Live music venue site with event listings, Sanity CMS for content management, and custom contact flow.',
    url: 'https://bullfrog-gilt.vercel.app',
    tag: 'Client Site',
  },
  {
    name: 'TechxRev',
    type: 'IT Services',
    description:
      'Ground-up build for an IT services company. Custom site with services breakdown, about page, and contact flow.',
    url: 'https://techxrev-rebuild.vercel.app',
    tag: 'Demo Site',
  },
  {
    name: 'Greenline',
    type: 'Lawn Care',
    description:
      'Portfolio demo for a lawn care company. Clean, professional design with service areas and seasonal content.',
    url: 'https://greenline-rust.vercel.app',
    tag: 'Demo Site',
  },
] as const;

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20" aria-label="Work overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Work' },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Recent Builds
              </p>
              <h1 className="mt-4 font-mono text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                Built to prove a point
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-tertiary">
                Every site here was built for a real business, to enterprise-grade standards,
                from scratch. No templates. No page builders.
                Just fast, accessible, AI-ready sites that show what&apos;s possible.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-16 md:py-20" aria-label="All projects">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {PROJECTS.map((project) => (
                <StaggerItem key={project.name}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col border border-border-default bg-surface-card p-6 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-mono text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                          {project.name}
                        </h2>
                        <p className="mt-0.5 text-sm font-medium text-text-secondary">
                          {project.type}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-text-tertiary transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                      {project.description}
                    </p>
                    <span className="mt-4 inline-block self-start bg-surface-sunken px-3 py-1 text-xs font-medium text-text-secondary">
                      {project.tag}
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-surface-page py-16 md:py-20" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-mono text-2xl font-bold text-text-primary md:text-3xl">
                Want to see what we&apos;d build for you?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
                Tell us about your business and we&apos;ll come back with a plan
                for exactly what the site needs to do. Back in 24 hours.
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
