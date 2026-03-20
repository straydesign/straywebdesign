import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionKeyboardNav from '@/components/layout/SectionKeyboardNav';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Success from '@/components/sections/Success';
import SocialProof from '@/components/sections/SocialProof';
import TechnologyGap from '@/components/sections/TechnologyGap';
import FooterCTA from '@/components/sections/FooterCTA';

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
