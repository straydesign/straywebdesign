import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionKeyboardNav from '@/components/layout/SectionKeyboardNav';
import Hero from '@/components/sections/Hero';

const Services = dynamic(() => import('@/components/sections/Services'));
const Success = dynamic(() => import('@/components/sections/Success'));
const SocialProof = dynamic(() => import('@/components/sections/SocialProof'));
const TechnologyGap = dynamic(() => import('@/components/sections/TechnologyGap'));
const FooterCTA = dynamic(() => import('@/components/sections/FooterCTA'));

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionKeyboardNav />
      <main id="main">
        <Hero />
        <Services />
        <Success />
        <SocialProof />
        <TechnologyGap />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
