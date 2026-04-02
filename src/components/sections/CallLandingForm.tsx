'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Send, AlertTriangle, Monitor, Wrench, ShieldCheck } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import { SITE } from '@/lib/constants';
import { getUtmParams } from '@/hooks/useUtmParams';
import { trackLeadConversion } from '@/lib/tracking';

const inputClasses =
  'w-full border border-border-strong bg-surface-sunken px-4 py-3 font-mono text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none';

export default function CallLandingForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const utms = getUtmParams();

    try {
      const crmPayload = {
        name,
        email,
        website,
        form_type: 'booking',
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
            name,
            email,
            website,
            from_name: 'straywebdesign.co',
            subject: `[LP] Strategy Call from ${name}`,
          }),
        }),
      ]);

      const anySuccess =
        (crmRes.status === 'fulfilled' && crmRes.value.ok) ||
        (web3Res.status === 'fulfilled' && web3Res.value.ok);

      if (anySuccess) {
        trackLeadConversion({ form_type: 'booking' });
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
            Find out why your competitors are{' '}
            <GradientText>getting the calls</GradientText> you&apos;re not.
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-mono text-lg text-text-secondary">
            We&apos;ll pull up your site and your top competitor&apos;s site
            side-by-side and show you exactly where you&apos;re falling behind
            — and what to do about it. 15 minutes, zero pressure.
          </p>
        </AnimateIn>
      </section>

      {/* What to expect + Form */}
      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: what to expect */}
          <AnimateIn delay={0.1}>
            <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              What to Expect
            </span>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <Monitor className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">
                    We Pull Up Your Site Live
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    Screen-share walkthrough of how your site looks to Google
                    and how it compares to your top competitor.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <Wrench className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">
                    You Leave with 2-3 Fixes You Can Use This Week
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    Actionable recommendations you can act on immediately
                    — whether you hire us or not.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">
                    If We&apos;re Not a Fit, We&apos;ll Tell You
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    Honest assessment of where you stand. No pitch, no pressure.
                    We&apos;re based in Erie and we only work with local businesses.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: form */}
          <AnimateIn direction="right" delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="border border-border-default bg-surface-card p-7 md:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="lp-call-name"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Name *
                    </label>
                    <input
                      id="lp-call-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lp-call-email"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Email *
                    </label>
                    <input
                      id="lp-call-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClasses}
                      placeholder="you@business.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lp-call-website"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Website URL *
                    </label>
                    <input
                      id="lp-call-website"
                      type="url"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className={inputClasses}
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                </div>

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
                        See How I Stack Up
                      </>
                    )}
                  </MagneticButton>
                </div>

                <p className="mt-4 text-center font-mono text-[11px] text-text-tertiary">
                  We won&apos;t call you, we won&apos;t add you to a list.
                  Just a 15-minute call from a local web team.{' '}
                  <a href="/privacy" className="underline transition-colors hover:text-text-secondary">
                    Privacy Policy
                  </a>
                </p>
              </form>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
