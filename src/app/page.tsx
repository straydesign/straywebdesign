import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Start from '@/components/sections/Start';
import Process from '@/components/sections/Process';
import Editor from '@/components/sections/Editor';
import Why from '@/components/sections/Why';
import Faq from '@/components/sections/Faq';
import Work from '@/components/sections/Work';
import KindWords from '@/components/sections/KindWords';
import About from '@/components/sections/About';

/**
 * One page, leading with the work.
 *
 * Reordered 2026-09-17 on Tom's call — "I do wanna actually mirror the non-web
 * design version more closely... that means it just leads with the four sites
 * that I've done." So the shape follows straydesign.co: the work first, then
 * the words, then the way in. His picture and the short version of who he is
 * sit directly under the headline, also his call that day.
 *
 * Repositioned 2026-09-22. The page used to sell one mechanism — catalogue
 * your inventory so Google can find it — from the headline down. On
 * 2026-09-29 the last of it, the Menu section, came off the page (Tom): the
 * catalogue pitch moves to a separate site, and this one is general web
 * design. What the page is about is engaging sites for strong brands with
 * passionate owners, and the four live builds in the hero are the argument
 * for it.
 *
 * The middle of the page is the run Tom dictated, in his order:
 *  - Process, how he builds your site, as a scroll-driven 3D demonstration.
 *    It took Setup's slot on 2026-09-29 and carries all of Setup's facts.
 *  - Editor, the back of the site, which nobody else shows you. Since
 *    2026-09-29 it is scroll-driven 3D too, in the same kit as Process.
 *  - Why, the argument for any of it.
 *
 * HowItWorks was deleted rather than unmounted. Its three steps live in Process
 * now, and a file on disk still arguing the old pitch is how the old
 * pitch comes back.
 *
 * Vsl.tsx stays wired into /thank-you only, gated on VSL.video, so it renders
 * nothing today. Do not remount it here because the file is still present.
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
        <Process />
        {/* Menu ("What you sell") unmounted 2026-09-29, Tom: straywebdesign is general web design now and the catalogue pitch moves to its own site. Menu.tsx stays on disk until that site exists. */}
        <Editor />
        <Why />
        <KindWords />
        <Faq />
        <Start />
      </main>
      <Footer />
    </>
  );
}
