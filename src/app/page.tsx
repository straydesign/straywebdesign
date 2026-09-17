import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Start from '@/components/sections/Start';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import Proof from '@/components/sections/Proof';
import About from '@/components/sections/About';

/**
 * One page, one action, in the order of Brandon Willington's own landing page
 * (ahoy.whereu.com.au/withu, read 2026-09-08): headline → the letter → the
 * next step → how it works → testimonials and proof → FAQ → the founder.
 *
 *  - The booker sits directly under the hero, not at the bottom. Somebody who
 *    is convinced by the letter should not have to scroll past four sections
 *    hunting for the way in. It was a five-question survey until 2026-09-17;
 *    Tom cut it to contact details and a time.
 *  - Proof sits above the FAQ, the way his page runs it: the sites first, then
 *    "still not sure?" and the eighteen questions, then who he is.
 *  - His dates block (scarcity) has no Stray equivalent and was cut 2026-09-08.
 *
 * There is no nav. Every nav item is an exit.
 */
export default function Home() {
  return (
    <>
      <LandingPageHeader />
      <main id="main">
        <Hero />
        <Start />
        <HowItWorks />
        <Proof />
        <Faq />
        <About />
      </main>
      <Footer />
    </>
  );
}
