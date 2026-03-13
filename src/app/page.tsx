import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Guide from '@/components/sections/Guide';
import Plan from '@/components/sections/Plan';
import CallToAction from '@/components/sections/CallToAction';
import Success from '@/components/sections/Success';
import Failure from '@/components/sections/Failure';
import Services from '@/components/sections/Services';
import TechnologyGap from '@/components/sections/TechnologyGap';
import SocialProof from '@/components/sections/SocialProof';
import FooterCTA from '@/components/sections/FooterCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <Guide />
        <Plan />
        <CallToAction />
        <Success />
        <Failure />
        <Services />
        <TechnologyGap />
        <SocialProof />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
