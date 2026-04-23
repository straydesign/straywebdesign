import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionKeyboardNav from '@/components/layout/SectionKeyboardNav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/ui/Marquee';
import { FAQ_ITEMS } from '@/lib/constants';

function SectionSkeleton() {
  return (
    <div className="section-padding" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="skeleton mx-auto mb-4 h-4 w-24" />
          <div className="skeleton mx-auto h-10 w-3/4" />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="skeleton h-48" />
          <div className="skeleton h-48" />
        </div>
      </div>
    </div>
  );
}

const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: SectionSkeleton,
});
const Pricing = dynamic(() => import('@/components/sections/Pricing'), {
  loading: SectionSkeleton,
});
const Success = dynamic(() => import('@/components/sections/Success'), {
  loading: SectionSkeleton,
});
const SocialProof = dynamic(() => import('@/components/sections/SocialProof'), {
  loading: SectionSkeleton,
});
const TechnologyGap = dynamic(() => import('@/components/sections/TechnologyGap'), {
  loading: SectionSkeleton,
});
const CalEmbed = dynamic(() => import('@/components/sections/CalEmbed'), {
  loading: SectionSkeleton,
});
const FooterCTA = dynamic(() => import('@/components/sections/FooterCTA'), {
  loading: SectionSkeleton,
});

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema),
        }}
      />
      <Navbar />
      <SectionKeyboardNav />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Pricing />
        <Success />
        <SocialProof />
        <TechnologyGap />
        <CalEmbed />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
