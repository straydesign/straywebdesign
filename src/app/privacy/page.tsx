import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Stray Web Design',
  description: 'Privacy policy for Stray Web Design. How we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[100dvh] bg-surface-page text-text-primary">
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:px-8">
        <h1 className="font-mono text-3xl font-bold md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 font-mono text-sm text-text-tertiary">Last updated: March 31, 2026</p>

        <div className="mt-10 space-y-8 font-mono text-sm leading-relaxed text-text-secondary">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">Information We Collect</h2>
            <p>
              When you use our website or contact us, we may collect the following information:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>Name, email address, and phone number (when you submit a form or book a call)</li>
              <li>Your website URL (when you request an audit)</li>
              <li>Business name and industry</li>
              <li>Messages you send through our contact forms or chat widget</li>
              <li>Device and browser information, IP address, and pages visited (via analytics)</li>
              <li>Advertising campaign data such as UTM parameters and click identifiers</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">How We Use Your Information</h2>
            <ul className="list-inside list-disc space-y-1">
              <li>To respond to your inquiries and provide the services you request</li>
              <li>To send you relevant follow-up communications about your project or audit</li>
              <li>To improve our website, services, and advertising effectiveness</li>
              <li>To measure and optimize our advertising campaigns</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">Advertising & Analytics</h2>
            <p>
              We use Google Analytics, Meta (Facebook) Pixel, and Google Ads conversion tracking
              to understand how visitors find and use our site. These services may use cookies and
              similar technologies to collect data about your browsing activity. You can opt out of
              personalized advertising through your browser settings or by visiting{' '}
              <a href="https://optout.aboutads.info" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                optout.aboutads.info
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">SMS Communications</h2>
            <p>
              If you provide your phone number, we may send you text messages related to your
              inquiry or project. Message and data rates may apply. You can opt out at any time
              by replying STOP to any message. Message frequency varies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with service providers
              that help us operate our business (hosting, analytics, SMS delivery, CRM), but only
              as needed to provide our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and
              fulfill the purposes described in this policy. You can request deletion of your
              data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">Contact</h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a href="mailto:tom@straydesign.co" className="text-accent hover:underline">
                tom@straydesign.co
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
