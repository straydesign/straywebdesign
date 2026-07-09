import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionKeyboardNav from '@/components/layout/SectionKeyboardNav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectShowcase from '@/components/sections/ProjectShowcase';

function SectionSkeleton() {
  return (
    <div className="section-padding" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="skeleton mb-4 h-4 w-24" />
          <div className="skeleton h-10 w-3/4" />
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
const FooterCTA = dynamic(() => import('@/components/sections/FooterCTA'), {
  loading: SectionSkeleton,
});
const Faq = dynamic(() => import('@/components/sections/Faq'), {
  loading: SectionSkeleton,
});

/* Single page, in Tom's order: honest intro up top → the work → contact on
   the surface → the service squares at the bottom, FAQ under those. */

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionKeyboardNav />
      <main id="main">
        <Hero />
        <About />
        <ProjectShowcase />
        <FooterCTA />
        <Services />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
