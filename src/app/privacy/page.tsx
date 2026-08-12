import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Stray Web Design',
  description:
    'How Stray Web Design handles your information: what the site collects, what it is used for, and who to contact about it.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — Stray Web Design',
    description:
      'How Stray Web Design handles your information: what the site collects, what it is used for, and who to contact about it.',
    url: 'https://straywebdesign.co/privacy',
    type: 'website',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-lg font-semibold text-text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh] bg-surface-page pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          <span className="eyebrow mb-3">Legal</span>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.02em] text-text-primary">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-sm text-text-tertiary">
            Effective August 10, 2026
          </p>

          <div className="mt-10 space-y-9 font-body text-[15px] leading-relaxed text-text-secondary">
            <p>
              This site, straywebdesign.co, is run by Stray Web Design (Tom
              Sesler), a web designer in Erie, PA. This page explains what
              information the site collects and what happens to it. The short
              version: I collect what you send me so I can respond, plus basic
              analytics, and I don&apos;t sell any of it.
            </p>

            <Section title="What I collect">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong className="font-semibold text-text-primary">Forms and bookings.</strong>{' '}
                  Name, email, phone number, business name, website address, and
                  whatever you write in the message or scheduling fields. If you
                  start a form and leave before submitting, the fields you
                  already typed may still reach me so I can follow up.
                </li>
                <li>
                  <strong className="font-semibold text-text-primary">Chat.</strong>{' '}
                  Messages you type in the site chat, including any contact
                  details you share there. Transcripts are sent to me.
                </li>
                <li>
                  <strong className="font-semibold text-text-primary">Analytics.</strong>{' '}
                  Pages visited, device and browser type, general location, and
                  how you found the site. If you arrive from an ad, the
                  campaign tags and click identifiers on that link.
                </li>
              </ul>
            </Section>

            <Section title="How I use it">
              <ul className="list-inside list-disc space-y-1">
                <li>Answering your inquiry and scheduling calls</li>
                <li>Seeing which pages and ads work, so I can improve them</li>
              </ul>
              <p className="mt-3">
                I don&apos;t sell your information, and I don&apos;t add you to
                a mailing list.
              </p>
            </Section>

            <Section title="Cookies, and why there&rsquo;s no banner">
              <p>
                Google Analytics sets a cookie to count traffic and tell repeat
                visits apart. That&apos;s the only cookie this site sets on its
                own. When an ad campaign is running, Google Ads and Meta
                (Facebook) also set cookies to measure whether an ad led to an
                inquiry; those scripts don&apos;t load when no campaign is
                running.
              </p>
              <p className="mt-3">
                You won&apos;t see a cookie banner, and that is deliberate. A
                banner asks permission after the measurement has already
                happened, and most of them do nothing once you click through. So
                instead this site reads the privacy signal your browser already
                sends, either Global Privacy Control or Do Not Track. If yours
                sends one, analytics never loads. No cookie. No pageview.
                Nothing to opt out of. Brave and the DuckDuckGo browser send that
                signal on their own, and Firefox sends it once you turn on
                &ldquo;tell websites not to sell my data&rdquo;.
              </p>
              <p className="mt-3">
                If your browser doesn&apos;t send one, you can still block
                cookies in its settings or install Google&apos;s{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline transition-colors hover:text-accent/80"
                >
                  Analytics Opt-out Browser Add-on
                </a>
                . The site works the same either way.
              </p>
            </Section>

            <Section title="Services that handle the data">
              <p>
                A few services help run this site, and only see what they need
                to do their job:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1">
                <li>Vercel, which hosts the site</li>
                <li>Google Analytics and Google Ads, for traffic and ad measurement</li>
                <li>Meta, for ad measurement when campaigns are running</li>
                <li>Web3Forms, which delivers form submissions to my inbox</li>
                <li>Anthropic, which processes chat messages so the chat widget can reply</li>
              </ul>
              <p className="mt-3">
                Inquiries are stored in my own lead-tracking system so I
                don&apos;t lose track of a conversation.
              </p>
            </Section>

            <Section title="Texts and email">
              <p>
                If you leave a phone number, I may text you back about your
                inquiry, usually to schedule a call. Reply STOP to any text
                and I&apos;ll stop. Message and data rates may apply.
              </p>
            </Section>

            <Section title="Social media publishing">
              <p>
                Stray Web Design also runs a private, self-hosted tool for
                scheduling and publishing its own social media posts (TikTok,
                Pinterest, Facebook, Instagram, Threads, X, YouTube, LinkedIn,
                Reddit). Through each platform&apos;s official login (OAuth),
                the tool stores only the access tokens and basic profile
                information for accounts Stray Web Design owns, and uses them
                only to publish content Stray Web Design creates. It does not
                collect, scrape, or store any other user&apos;s data, and it is
                not offered to anyone else. Tokens are kept only while an
                account stays connected; access can be revoked at any time from
                the tool or from each platform&apos;s connected-apps settings,
                which invalidates the stored tokens. None of this data is
                shared or sold.
              </p>
            </Section>

            <Section title="Do Not Track">
              <p>
                Some browsers send a Do Not Track or Global Privacy Control
                signal. I honour both. When the site sees one, analytics is not
                loaded for that visit at all.
              </p>
            </Section>

            <Section title="How long I keep it">
              <p>
                Inquiries and analytics are kept as long as they&apos;re useful
                for responding to you or running the business. Want your
                information deleted? Email me and I&apos;ll remove it.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this policy? Email{' '}
                <a
                  href="mailto:tom@straydesign.co"
                  className="text-accent underline transition-colors hover:text-accent/80"
                >
                  tom@straydesign.co
                </a>
                .
              </p>
              <p className="mt-3">Stray Web Design · Erie, PA</p>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
