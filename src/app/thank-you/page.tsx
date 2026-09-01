import type { Metadata } from 'next';
import Link from 'next/link';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import ConversionPixel from '@/components/ui/ConversionPixel';
import { SITE } from '@/lib/constants';

/**
 * The page after the survey. Most sites waste this one on a checkmark.
 *
 * The block in the middle is doing the work, and the ORDER is the mechanism:
 * name a group that is plainly not this person, let them agree they dislike
 * that group, and only then say what happens to people who behave that way
 * here. From that point on they are holding an identity they just agreed to.
 * Brandon Willington's show rate went 60% → 75% on this one addition.
 *
 * Nothing here says thank you, congratulations, or well done. This is the
 * middle of something, and copy that reads like an ending is a place to stop.
 *
 * The conversion pixel fires HERE and only here. The survey deliberately does
 * not fire it, so the disqualification route stays invisible to the ad
 * account.
 */
export const metadata: Metadata = {
  title: "What happens next — Stray Web Design",
  description: 'Your answers came through. Here is what happens now.',
  robots: { index: false, follow: false },
};

const ANSWERS = [
  {
    q: 'When do I hear back?',
    a: 'Same day, or the next morning if it comes in late. A real reply from me with what I think your catalog should look like, written by hand.',
  },
  {
    q: 'Is this a sales call?',
    a: "It's a conversation about your list and whether putting it online is worth the money. Sometimes the answer is no and I say so.",
  },
  {
    q: 'What should I have ready?',
    a: 'Nothing. If you want to move faster, a rough count of what you sell and any photos you already have will save us both a week.',
  },
];

export default function ThankYou() {
  return (
    <>
      <ConversionPixel formType="catalog_survey" />
      <LandingPageHeader />
      <main id="main" className="bg-surface-page pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <p className="font-mono text-[12px] text-text-tertiary">
            <span aria-hidden className="text-accent/60">{'// '}</span>
            your answers are in
          </p>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.06] tracking-tight text-text-primary">
            One thing before I write back.
          </h1>

          {/* The identity block. Group first, agreement second, expectation
              third. Reordering it removes the effect. */}
          <div className="mt-8 border-l-2 border-accent pl-6 md:pl-8">
            <p className="font-body text-lg leading-relaxed text-text-primary">
              Think about the worst customer you have ever had. The one who
              haggled over a price you had already agreed, went quiet for three
              weeks, then wanted it done by Friday.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-text-primary">
              You already know how much of your week that person cost you.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-text-secondary">
              I do the same thing you would. If somebody turns out to be that
              person with me, I give the money back and we stop. That is the same
              offer everyone gets: ninety days, no argument. I am telling
              you because it is the reason the people I do work with get
              answered the same day.
            </p>
          </div>

          <h2 className="mt-14 font-display text-xl font-semibold tracking-tight text-text-primary">
            The three things people ask at this point
          </h2>
          <dl className="mt-6 flex flex-col gap-6">
            {ANSWERS.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-base font-semibold text-text-primary">
                  {item.q}
                </dt>
                <dd className="mt-1.5 font-body text-[15px] leading-relaxed text-text-secondary">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 rounded-lg border border-border-default bg-surface-card p-6 md:p-7">
            <p className="font-display text-base font-semibold text-text-primary">
              Want to skip the back and forth?
            </p>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary">
              Put a time in the calendar now and we cover it in fifteen minutes
              instead of four emails. Bring whoever else decides, and it saves you
              relaying it later.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-accent px-6 py-3.5 font-display text-base font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Pick a time
              </Link>
              <a
                href={`tel:${SITE.phone.replace(/\D/g, '')}`}
                className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
