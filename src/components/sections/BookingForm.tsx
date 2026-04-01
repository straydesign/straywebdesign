'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Calendar, Clock, MessageSquare } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import { SITE, BOOKING_TIMING_OPTIONS } from '@/lib/constants';
import { getUtmParams } from '@/hooks/useUtmParams';

const inputClasses =
  'w-full border border-border-strong bg-surface-sunken px-4 py-3 font-mono text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none';

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [website, setWebsite] = useState('');
  const [timing, setTiming] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const utms = getUtmParams();

    try {
      const crmPayload = {
        name,
        email,
        phone,
        company: business,
        website,
        message,
        timing,
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
            phone,
            business_name: business,
            website,
            preferred_timing: timing,
            message,
            from_name: 'straywebdesign.co',
            subject: `New Booking Request from ${name}`,
          }),
        }),
      ]);

      const anySuccess =
        (crmRes.status === 'fulfilled' && crmRes.value.ok) ||
        (web3Res.status === 'fulfilled' && web3Res.value.ok);

      if (anySuccess) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setBusiness('');
        setWebsite('');
        setTiming('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-surface-page text-text-primary">
      {/* Back link */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 md:px-8">
        <AnimateIn>
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-tertiary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </AnimateIn>
      </div>

      <div className="section-padding relative">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Info */}
            <AnimateIn>
              <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                Book a Call
              </span>
              <h1 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Let&apos;s <GradientText>Talk</GradientText>
              </h1>
              <p className="mt-4 font-mono text-lg text-text-secondary">
                Tell us about your business and we&apos;ll set up a quick call to
                discuss how we can help you compete with the big guys.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">15-Minute Discovery Call</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Quick, focused conversation about your goals and current site
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">Free Lighthouse Audit</p>
                    <p className="font-mono text-sm text-text-secondary">
                      We&apos;ll run a full performance report before the call
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">No Pressure, No Pitch</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Honest assessment of where you stand — whether you hire us or not
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                    <MessageSquare className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-text-primary">Actionable Takeaways</p>
                    <p className="font-mono text-sm text-text-secondary">
                      Walk away with specific recommendations you can use immediately
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 border border-border-strong px-5 py-2.5 font-mono text-sm font-medium text-text-primary transition-colors hover:bg-surface-sunken"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE.phone}
                </a>
              </div>
            </AnimateIn>

            {/* Right: Form */}
            <AnimateIn direction="right" delay={0.2}>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center border border-border-default bg-surface-card p-10 text-center">
                  <CheckCircle className="mb-4 h-12 w-12 text-accent" />
                  <h2 className="font-mono text-xl font-bold text-text-primary">
                    Request Received!
                  </h2>
                  <p className="mt-2 font-mono text-text-secondary">
                    We&apos;ll reach out within 24 hours to schedule your call.
                  </p>
                  <a
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent/80"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-border-default bg-surface-card p-7 md:p-8"
                >
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="book-name"
                          className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                        >
                          Name *
                        </label>
                        <input
                          id="book-name"
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
                          htmlFor="book-email"
                          className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                        >
                          Email *
                        </label>
                        <input
                          id="book-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClasses}
                          placeholder="you@business.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="book-phone"
                          className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                        >
                          Phone
                        </label>
                        <input
                          id="book-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={inputClasses}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="book-business"
                          className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                        >
                          Business Name
                        </label>
                        <input
                          id="book-business"
                          type="text"
                          value={business}
                          onChange={(e) => setBusiness(e.target.value)}
                          className={inputClasses}
                          placeholder="Your business"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="book-website"
                        className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                      >
                        Current Website URL
                      </label>
                      <input
                        id="book-website"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className={inputClasses}
                        placeholder="https://yourbusiness.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="book-timing"
                        className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                      >
                        Preferred Timing
                      </label>
                      <select
                        id="book-timing"
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" className="bg-surface-card">Select a timeframe</option>
                        {BOOKING_TIMING_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-surface-card">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="book-message"
                        className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                      >
                        Anything else we should know?
                      </label>
                      <textarea
                        id="book-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`${inputClasses} resize-none`}
                        placeholder="Tell us about your business, goals, or challenges..."
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
                          Book a Call
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </AnimateIn>
          </div>
        </div>
      </div>
    </div>
  );
}
