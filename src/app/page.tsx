import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Start from '@/components/sections/Start';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import Work from '@/components/sections/Work';
import Vsl from '@/components/sections/Vsl';
import KindWords from '@/components/sections/KindWords';
import About from '@/components/sections/About';

/**
 * One page, leading with the work.
 *
 * Reordered 2026-09-17 on Tom's call — "I do wanna actually mirror the non-web
 * design version more closely... that means it just leads with the four sites
 * that I've done." So the shape now follows straydesign.co: the work first,
 * then the words, then the way in.
 *
 *  - Work is the first thing under the headline. The question slides moved out
 *    of the hero to make room; they were sitting between the headline and the
 *    button.
 *  - The one real quote got its own section (KindWords) instead of running
 *    across the top of the work, which is how the portfolio does it.
 *  - Start moved to the bottom. It sat under the hero so nobody had to hunt
 *    for the way in, and that still holds: the hero button anchors to #start,
 *    so a convinced visitor is one click from it wherever it lives.
 *  - FAQ stays, on Tom's word.
 *
 * There is no nav. Every nav item is an exit.
 */
export default function Home() {
  return (
    <>
      <LandingPageHeader />
      <main id="main">
        <Hero />
        <Work />
        <Vsl />
        <HowItWorks />
        <KindWords />
        <Faq />
        <About />
        <Start />
      </main>
      <Footer />
    </>
  );
}
