import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionKeyboardNav from '@/components/layout/SectionKeyboardNav';
import Hero from '@/components/sections/Hero';
import HorizontalScroll from '@/components/sections/HorizontalScroll';
import Services from '@/components/sections/Services';
import ParallaxWindow from '@/components/ui/ParallaxWindow';
import Success from '@/components/sections/Success';
import PinnedComparison from '@/components/sections/PinnedComparison';
import SocialProof from '@/components/sections/SocialProof';
import TechnologyGap from '@/components/sections/TechnologyGap';
import FooterCTA from '@/components/sections/FooterCTA';

const HORIZONTAL_PANELS = [
  {
    title: 'Discover & Design',
    description:
      'We audit your current site, study your competitors, and design a custom strategy that positions you to win.',
    icon: '01',
  },
  {
    title: 'Build & Optimize',
    description:
      'Hand-coded, zero-plugin sites built for speed, accessibility, and search engine dominance.',
    icon: '02',
  },
  {
    title: 'Launch & Grow',
    description:
      'Ongoing SEO monitoring, content updates, and performance tracking. Your site gets better every month.',
    icon: '03',
  },
];

const COMPARISON_DATA = {
  title: 'Generic Template vs Custom Build',
  subtitle: 'See what you\'re really getting when you choose a template site.',
  before: {
    label: 'Generic Template',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format',
    points: [
      'Loads in 4–6 seconds',
      '13+ plugins to maintain',
      'Same layout as 50,000 other sites',
      'No structured data for AI search',
      'Accessibility score below 60',
    ],
    accent: 'red' as const,
  },
  after: {
    label: 'Stray Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format',
    points: [
      'Sub-1 second load time',
      'Zero plugins — pure code',
      'Custom design, built from scratch',
      'AI-ready JSON-LD structured data',
      'Lighthouse 100 across the board',
    ],
    accent: 'green' as const,
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionKeyboardNav />
      <main id="main">
        <Hero />

        {/* Design Process — horizontal scroll */}
        <HorizontalScroll className="bg-navy" data-navbar-dark>
          {HORIZONTAL_PANELS.map((panel) => (
            <div key={panel.title} className="mx-auto max-w-lg text-center">
              <span className="mb-4 inline-block font-display text-6xl font-black text-electric/20">
                {panel.icon}
              </span>
              <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
                {panel.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                {panel.description}
              </p>
            </div>
          ))}
        </HorizontalScroll>

        <Services />

        {/* Parallax break — web design on devices */}
        <ParallaxWindow
          imageUrl="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&q=80&auto=format"
          alt="Responsive web design displayed across multiple devices"
          height="50vh"
        />

        <Success />

        {/* Template vs Custom comparison */}
        <PinnedComparison {...COMPARISON_DATA} />

        <SocialProof />

        {/* Parallax break — analytics dashboard */}
        <ParallaxWindow
          imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format"
          alt="Analytics dashboard showing website performance metrics"
          height="50vh"
        />

        <TechnologyGap />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
