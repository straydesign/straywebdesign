'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Calendar, Clock, MessageSquare } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { SITE, BOOKING_TIMING_OPTIONS } from '@/lib/constants';

const inputClasses =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-electric focus:outline-none';

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
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
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
      });
      if (res.ok) {
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
    <div className="relative min-h-[100dvh] bg-navy text-white">
      <GrainOverlay />

      {/* Back link */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 md:px-8">
        <AnimateIn>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
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
              <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
                Book a Call
              </span>
              <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Let&apos;s <GradientText>Talk</GradientText>
              </h1>
              <p className="mt-4 text-lg text-slate-400">
                Tell us about your business and we&apos;ll set up a quick call to
                discuss how we can help you compete with the big guys.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                    <Calendar className="h-4 w-4 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">15-Minute Discovery Call</p>
                    <p className="text-sm text-slate-400">
                      Quick, focused conversation about your goals and current site
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                    <ArrowRight className="h-4 w-4 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Free Lighthouse Audit</p>
                    <p className="text-sm text-slate-400">
                      We&apos;ll run a full performance report before the call
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                    <Clock className="h-4 w-4 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">No Pressure, No Pitch</p>
                    <p className="text-sm text-slate-400">
                      Honest assessment of where you stand — whether you hire us or not
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                    <MessageSquare className="h-4 w-4 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Actionable Takeaways</p>
                    <p className="text-sm text-slate-400">
                      Walk away with specific recommendations you can use immediately
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-electric/90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE.phone}
                </a>
              </div>
            </AnimateIn>

            {/* Right: Form */}
            <AnimateIn direction="right" delay={0.2}>
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
                  <CheckCircle className="mb-4 h-12 w-12 text-emerald-400" />
                  <h2 className="font-display text-xl font-bold text-white">
                    Request Received!
                  </h2>
                  <p className="mt-2 text-slate-400">
                    We&apos;ll reach out within 24 hours to schedule your call.
                  </p>
                  <a
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-electric transition-colors hover:text-electric/80"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm md:p-8"
                >
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="book-name"
                          className="mb-1.5 block text-sm font-medium text-slate-300"
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
                          className="mb-1.5 block text-sm font-medium text-slate-300"
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
                          className="mb-1.5 block text-sm font-medium text-slate-300"
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
                          className="mb-1.5 block text-sm font-medium text-slate-300"
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
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        Current Website URL
                      </label>
                      <input
                        id="book-website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className={inputClasses}
                        placeholder="https://yourbusiness.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="book-timing"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        Preferred Timing
                      </label>
                      <select
                        id="book-timing"
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" className="bg-navy">Select a timeframe</option>
                        {BOOKING_TIMING_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-navy">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="book-message"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
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
                    <div role="alert" className="mt-4 flex items-center gap-2 text-sm text-red-400">
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
                          <span className="skeleton inline-block h-4 w-4 rounded-full" />
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
