import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Start from '@/components/sections/Start';
import HowItWorks from '@/components/sections/HowItWorks';
import Faq from '@/components/sections/Faq';
import Work from '@/components/sections/Work';
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
 *  - Tom's picture and the short version of who he is sit directly under the
 *    headline, on his call 2026-09-17. Work follows it.
 *  - The twelve question slides are OFF since 2026-09-18, Tom's call. They
 *    were the VSL's text mode — the deck that kept carrying the pitch after
 *    he turned the video off the day before. Vsl.tsx stays on disk and stays
 *    wired into /thank-you, where it is gated on VSL.video and so renders
 *    nothing today. Do not remount it here because the file is still present.
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
        <About />
        <Work />
        <HowItWorks />
        <KindWords />
        <Faq />
        <Start />
      </main>
      <Footer />
    </>
  );
}
