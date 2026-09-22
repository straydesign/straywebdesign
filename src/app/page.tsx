import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Start from '@/components/sections/Start';
import Setup from '@/components/sections/Setup';
import Menu from '@/components/sections/Menu';
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
 * your inventory so Google can find it — from the headline down. That is now
 * the Menu section, three quarters of the way in, framed as something the
 * build also gives you. What the page is about is engaging sites for strong
 * brands with passionate owners, and the four live builds in the hero are the
 * argument for it.
 *
 * The middle of the page is the run Tom dictated, in his order:
 *  - Setup, for somebody who just landed here or just had him walk in.
 *  - Menu, the catalogue, by what kind of place you run.
 *  - Editor, the back of the site, which nobody else shows you.
 *  - Why, the argument for any of it.
 *
 * HowItWorks was deleted rather than unmounted. Its three steps live in Setup
 * and Menu now, and a file on disk still arguing the old pitch is how the old
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
        <Setup />
        <Menu />
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
