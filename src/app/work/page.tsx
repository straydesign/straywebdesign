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
    name: 'TechxRev',
    type: 'IT Services',
    description:
      'Ground-up build for an IT services company. Custom site with services breakdown, about page, and contact flow.',
    url: 'https://techxrev-rebuild.vercel.app',
    tag: 'Demo Site',
  },
  {
    name: "Andy's",
    type: 'Bar & Grill',
    description:
      'Pitch site for a bar and grill in Erie, PA. Next.js with Sanity CMS for menu and event management.',
    url: 'https://andys-mu.vercel.app',
    tag: 'Pitch Site',
  },
  {
    name: 'Bullfrog',
    type: 'Bar',
    description:
      'Pitch site for a neighborhood bar in Erie, PA. Dark, atmospheric design that matches the venue.',
    url: 'https://bullfrog.vercel.app',
    tag: 'Pitch Site',
  },
  {
    name: 'Iron Ink',
    type: 'Tattoo Shop',
    description:
      'Pitch site for a tattoo shop in Cuyahoga Falls, OH. Gallery-focused design with artist profiles and booking.',
    url: 'https://ironink.vercel.app',
    tag: 'Pitch Site',
  },
  {
    name: 'War Horse Ink',
    type: 'Tattoo Shop',
    description:
      'Pitch site for a 4-location tattoo shop across NE Ohio. Multi-location architecture with unified branding.',
    url: 'https://warhorse.vercel.app',
    tag: 'Pitch Site',
  },
  {
    name: 'Greenline',
    type: 'Lawn Care',
    description:
      'Portfolio demo for a lawn care company. Clean, professional design with service areas and seasonal content.',
    url: 'https://greenline-rust.vercel.app',
    tag: 'Demo Site',
  },
  {
    name: 'Gold Crown',
    type: 'Billiards Bar',
    description:
      'Pitch site for a billiards bar in Erie, PA. League schedules, events, and a vibe that matches the room.',
    url: 'https://goldcrown.vercel.app',
    tag: 'Pitch Site',
  },
  {
    name: 'Peach Street Pitch',
    type: '3-Venue Pitch',
    description:
      'Combined pitch page for three Peach Street venues in Erie, PA. One page, three businesses, one cohesive story.',
    url: 'https://peach-street-pitch.vercel.app',
    tag: 'Pitch Site',
  },
] as const;

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20" aria-label="Work overview">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <AnimateIn>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Work' },
                ]}
              />
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                Recent Builds
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Built to prove a point
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
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
                    className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-display text-lg font-bold text-navy transition-colors group-hover:text-electric">
                          {project.name}
                        </h2>
                        <p className="mt-0.5 text-sm font-medium text-slate-500">
                          {project.type}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:text-electric group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                    <span className="mt-4 inline-block self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {project.tag}
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy py-16 md:py-20" aria-label="Call to action">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <AnimateIn>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Want to see what we&apos;d build for you?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                Every project starts with a free site audit. We&apos;ll show you where
                your current site falls short and what enterprise-grade looks like for your business.
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
