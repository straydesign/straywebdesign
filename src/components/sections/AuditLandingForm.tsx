'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Send, AlertTriangle, FileSearch, Users, ListChecks } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import { SITE } from '@/lib/constants';
import { getUtmParams } from '@/hooks/useUtmParams';
import { usePartialCapture } from '@/hooks/usePartialCapture';
import { trackLeadConversion } from '@/lib/tracking';

const inputClasses =
  'w-full border border-border-strong bg-surface-sunken px-4 py-3 font-mono text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none';

export default function AuditLandingForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const getFields = useCallback(
    () => ({ name, email, phone, website }),
    [name, email, phone, website]
  );
  const { markSubmitted, markTouched } = usePartialCapture({
    formType: 'partial_abandon',
    getFields,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const hasEmail = email.trim().length > 0;
    const hasPhone = phone.trim().length > 0;
    if (!hasEmail && !hasPhone) {
      setErrorMsg('Please provide an email address or phone number so we can reach you.');
      return;
    }
    setErrorMsg(null);
    setStatus('sending');
    markSubmitted();

    const utms = getUtmParams();

    try {
      const crmPayload = {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        website: website || undefined,
        form_type: 'audit_request',
        submitted: true,
        ...utms,
      };

      const [crmRes, web3Res] = await Promise.allSettled([
        fetch(process.env.NEXT_PUBLIC_CRM_INBOUND_URL || 'https://stray-crm.vercel.app/api/leads/inbound', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(crmPayload),
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: SITE.web3formsKey,
            name: name || '',
            email: email || '',
            phone: phone || '',
            website: website || '',
            from_name: 'straywebdesign.co',
            subject: `[LP] Audit Request from ${name || phone || 'Unknown'}`,
          }),
        }),
      ]);

      const anySuccess =
        (crmRes.status === 'fulfilled' && crmRes.value.ok) ||
        (web3Res.status === 'fulfilled' && web3Res.value.ok);

      if (anySuccess) {
        trackLeadConversion({ form_type: 'audit_request' });
        router.push('/thank-you');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-surface-page pt-20">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-5 pt-12 text-center md:px-8 md:pt-20">
        <AnimateIn>
          <h1 className="font-mono text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
            Your website is{' '}
            <GradientText>losing you customers</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-mono text-lg text-text-secondary">
            We&apos;ll run your site through the same checks Google uses to rank
            you — and send you a plain-English report with the 3 things to fix
            first. Free, no strings.
          </p>
        </AnimateIn>
      </section>

      {/* Social proof strip */}
      <section className="mx-auto mt-10 max-w-2xl px-5 md:px-8">
        <AnimateIn delay={0.1}>
          <div className="border border-border-default bg-surface-card px-6 py-4 text-center">
            <p className="font-mono text-sm text-text-secondary">
              Most business websites load slower than Google recommends
              — every extra second costs you{' '}
              <span className="font-semibold text-accent">7% of your visitors</span>.
              We only work with local businesses ready to outperform their market.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* What you get + Form */}
      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: what you get */}
          <AnimateIn delay={0.15}>
            <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              What You Get
            </span>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <FileSearch className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">
                    Your Google Performance Score
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    How Google actually sees your site — scored and benchmarked
                    against your industry.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">
                    Side-by-Side vs. Your Top Competitor
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    See exactly where you&apos;re ahead and behind on the
                    metrics that actually drive revenue.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <ListChecks className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">
                    Your Top 3 Fixes, Ranked by Impact
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    What to fix first to get more customers — whether you
                    hire us or not.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: form */}
          <AnimateIn direction="right" delay={0.2}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-border-default bg-surface-card p-7 md:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="lp-audit-name"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Name
                    </label>
                    <input
                      id="lp-audit-name"
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); markTouched(); }}
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="lp-audit-email"
                        className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                      >
                        Email
                      </label>
                      <input
                        id="lp-audit-email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); markTouched(); }}
                        className={inputClasses}
                        placeholder="you@business.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lp-audit-phone"
                        className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                      >
                        Phone
                      </label>
                      <input
                        id="lp-audit-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); markTouched(); }}
                        className={inputClasses}
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lp-audit-website"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Website URL
                    </label>
                    <input
                      id="lp-audit-website"
                      type="text"
                      value={website}
                      onChange={(e) => { setWebsite(e.target.value); markTouched(); }}
                      className={inputClasses}
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                </div>

                <p className="mt-3 font-mono text-[11px] text-text-tertiary">
                  Just an email or phone number is all we need.
                </p>

                {errorMsg && (
                  <div role="alert" className="mt-4 flex items-center gap-2 font-mono text-sm text-red-600">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    {errorMsg}
                  </div>
                )}

                {status === 'error' && (
                  <div role="alert" className="mt-4 flex items-center gap-2 font-mono text-sm text-red-600">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="mt-6">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="skeleton inline-block h-4 w-4" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Show Me What&apos;s Wrong
                      </>
                    )}
                  </MagneticButton>
                </div>

                <p className="mt-4 text-center font-mono text-[11px] text-text-tertiary">
                  We won&apos;t call you, we won&apos;t add you to a list. Just
                  a free audit from a local web team.{' '}
                  <a href="/privacy" className="underline transition-colors hover:text-text-secondary">
                    Privacy Policy
                  </a>
                </p>
                <p className="mt-3 text-center font-mono text-[11px] text-text-tertiary">
                  We audit 10 sites per week to keep quality high.
                </p>
              </form>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
