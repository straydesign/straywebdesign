'use client';

import { useCallback, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import { SITE } from '@/lib/constants';
import { getUtmParams } from '@/hooks/useUtmParams';
import { trackLeadConversion } from '@/lib/tracking';

export default function FooterCTA() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vision, setVision] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter an email so I can get back to you.');
      return;
    }
    if (!vision.trim()) {
      setError('Tell me about the business so I can come back with something useful.');
      return;
    }
    setSubmitting(true);
    setError(null);

    const utms = getUtmParams();
    const crmUrl =
      process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
      'https://stray-crm.vercel.app/api/leads/inbound';

    const payload = {
      email,
      phone: phone || undefined,
      message: vision,
      form_type: 'new_business_request',
      submitted: true,
      ...utms,
    };

    await Promise.allSettled([
      fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          email,
          phone: phone || '',
          message: vision,
          subject: `Plan request: ${email}`,
          from_name: 'straywebdesign.co — plan request',
        }),
      }),
    ]);

    trackLeadConversion({ form_type: 'new_business_request' });
    setSubmitting(false);
    setSubmitted(true);
  }, [email, phone, vision]);

  return (
    <section
      id="contact"
      className="relative border-t border-border-default bg-surface-page py-16 md:py-24"
      aria-label="Contact"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
        <AnimateIn>
          <span className="mb-4 inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="mr-1.5 text-accent/60">//</span>
            start a project
          </span>
          <h2 className="font-display text-3xl font-bold leading-[1.06] tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            Tell me about the business.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-text-secondary">
            Drop your email and a few lines about what you do. I&apos;ll come
            back with a plan for exactly what the site needs to do — no pitch, no
            pressure.
          </p>
          <div className="mt-7 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8">
            <a
              href="tel:+18149640081"
              className="font-display text-2xl font-bold text-text-primary transition-colors hover:text-accent md:text-3xl"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="font-display text-2xl font-bold text-text-primary transition-colors hover:text-accent md:text-3xl"
            >
              {SITE.email}
            </a>
          </div>
          <p className="mt-3 font-body text-sm text-text-tertiary">
            Call, text, or email. I answer these myself. Prefer a set time?{' '}
            <Link
              href="/book"
              className="text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
            >
              Book a call →
            </Link>
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-8">
          {submitted ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-lg border border-accent/20 bg-accent/5 px-6 py-6">
              <CheckCircle className="h-8 w-8 text-accent" />
              <p className="font-display text-base font-semibold text-text-primary">
                Got it — I&apos;ll be in touch soon.
              </p>
              <p className="font-body text-sm text-text-secondary">
                A real reply from me, not an autoresponder. No spam.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mx-auto max-w-xl space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@business.com"
                  autoComplete="email"
                  aria-label="Email"
                  className="flex-1 border border-border-strong bg-surface-card px-4 py-3.5 font-mono text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Send it
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                autoComplete="tel"
                aria-label="Phone number (optional)"
                className="w-full border border-border-default bg-surface-card px-4 py-3 font-mono text-sm text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
              />

              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                required
                rows={4}
                placeholder="Who it serves, what you sell, what success looks like."
                aria-label="Tell me about your business"
                className="w-full resize-none border border-border-default bg-surface-card px-4 py-3 font-mono text-sm text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
              />

              {error && (
                <p role="alert" className="text-left font-mono text-sm text-red-500">
                  {error}
                </p>
              )}
            </form>
          )}
        </AnimateIn>

      </div>
    </section>
  );
}
