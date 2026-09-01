import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Survey from '@/components/sections/Survey';
import Scarcity from '@/components/sections/Scarcity';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import Proof from '@/components/sections/Proof';
import About from '@/components/sections/About';

/**
 * One page, one action.
 *
 * The order is not the conventional one and that is deliberate. Two parts of
 * it are load-bearing:
 *
 *  - The survey sits directly under the hero, not at the bottom. Somebody who
 *    is convinced by the video should not have to scroll past four sections
 *    hunting for the way in.
 *  - The FAQ sits ABOVE the proof. Brandon Willington split-tested moving FAQs
 *    up and it raised conversion close to every time he tried it, including on
 *    pages where he was sure the testimonials were the stronger asset. Anybody
 *    this far down is looking for a reason not to, and the answer has to reach
 *    them before the reason does.
 *
 * There is no nav. Every nav item is an exit.
 */
export default function Home() {
  return (
    <>
      <LandingPageHeader />
      <main id="main">
        <Hero />
        <Survey />
        <Scarcity />
        <HowItWorks />
        <Faq />
        <Proof />
        <About />
      </main>
      <Footer />
    </>
  );
}
