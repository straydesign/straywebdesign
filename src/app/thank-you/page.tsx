import type { Metadata } from 'next';
import Link from 'next/link';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import ConversionPixel from '@/components/ui/ConversionPixel';
import Vsl from '@/components/sections/Vsl';
import Proof from '@/components/sections/Proof';
import { PHONE_SMS, PHONE_TEL, SITE, VSL } from '@/lib/constants';

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
 *
 * The video and the proof gallery repeat from the landing page on purpose.
 * Almost nobody watched the video on the way in — they scanned the page, saw a
 * player, gave it thirty seconds and went to the survey. Commitment is what
 * buys attention, so the ask lands after it rather than before. Both are the
 * same components the landing page renders, so they can never drift apart.
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
  /* Annotated as boolean so the empty-string literal type doesn't make
     TypeScript read the guard below as permanently false. */
  const hasVsl: boolean = Boolean(VSL.src);

  return (
    <>
      <ConversionPixel formType="catalog_survey" />
      <LandingPageHeader />
      {/* No bottom padding: Proof is full-bleed and dark, and it closes the
          page. Padding here would leave a pale band between it and the footer. */}
      <main id="main" className="bg-surface-page pt-28 md:pt-36">
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

          {/* Gated on the file existing. A "watch this" heading above a player
              that never appears is a control promising something the build
              can't do — worse than no section at all. */}
          {hasVsl && (
            <div className="mt-14">
              <h2 className="font-display text-xl font-semibold tracking-tight text-text-primary">
                Watch this before I write back
              </h2>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary">
                Six minutes on how the builds further down this page actually got
                made. It answers most of what you were going to ask me.
              </p>
              <div className="mt-6">
                <Vsl />
              </div>
            </div>
          )}

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
                href={PHONE_TEL}
                className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent"
              >
                {SITE.phone}
              </a>
              <a
                href={PHONE_SMS}
                className="font-mono text-[13px] text-text-tertiary underline underline-offset-4 transition-colors hover:text-accent"
              >
                or text me
              </a>
            </div>
          </div>
        </div>

        {/* The same gallery the landing page renders. They scrolled past it on
            the way in; now they have a reason to actually look. */}
        <div className="mt-20 md:mt-28">
          <Proof />
        </div>
      </main>
      <Footer />
    </>
  );
}
