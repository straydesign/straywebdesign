import type { Metadata } from 'next';
import Link from 'next/link';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import { SITE } from '@/lib/constants';

/**
 * The disqualification page. Reached only from the first survey question, and
 * deliberately holds NO ConversionPixel — the whole point of routing a bad fit
 * here is that the ad account never learns to go and find more of them.
 *
 * It also has to be worth landing on. Somebody with a hobby project asked an
 * honest question and deserves an honest answer, which is that they should not
 * be paying anybody for this yet.
 */
export const metadata: Metadata = {
  title: 'Probably not yet — Stray Web Design',
  description:
    'A catalog build is not the right spend for a project that is not a business yet. Here is what to do instead.',
  robots: { index: false, follow: false },
};

export default function NotAFit() {
  return (
    <>
      <LandingPageHeader />
      <main id="main" className="bg-surface-page pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <h1 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.06] tracking-tight text-text-primary">
            Save your money for now.
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
            What I build is for a business with something to sell and customers
            trying to find it. For a personal project or something you are still
            working out, paying me would be the wrong call, and I would rather
            say that here than on a call.
          </p>

          <h2 className="mt-12 font-display text-xl font-semibold tracking-tight text-text-primary">
            What I&apos;d actually do in your position
          </h2>
          <ul className="mt-5 flex flex-col gap-4 font-body text-[15px] leading-relaxed text-text-secondary">
            <li>
              <span className="font-semibold text-text-primary">
                Claim the Google Business Profile first.
              </span>{' '}
              It is free, it takes about twenty minutes, and it puts you on the
              map and in search before any website does.
            </li>
            <li>
              <span className="font-semibold text-text-primary">
                Then use a builder rather than paying a designer.
              </span>{' '}
              Squarespace or Wix will get you a page for the price of a couple
              of coffees a month. It will not scale to a real catalog, and that
              is a problem worth having later.
            </li>
            <li>
              <span className="font-semibold text-text-primary">
                Come back when there is a list.
              </span>{' '}
              The moment you have things with prices that people search for, the
              maths changes completely.
            </li>
          </ul>

          <p className="mt-12 font-body text-[15px] leading-relaxed text-text-tertiary">
            If I have read that wrong and this is a business, call me and tell
            me so —{' '}
            <a
              href={`tel:${SITE.phone.replace(/\D/g, '')}`}
              className="font-semibold text-text-primary underline underline-offset-4 hover:text-accent"
            >
              {SITE.phone}
            </a>
            .
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 font-body text-sm font-medium text-text-primary underline-offset-4 hover:underline"
          >
            <span aria-hidden>←</span>
            Back to the start
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
