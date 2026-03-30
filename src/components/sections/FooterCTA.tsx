'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import { SITE } from '@/lib/constants';

const inputClasses =
  'w-full border border-border-strong bg-surface-sunken px-4 py-3 font-mono text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none';

export default function FooterCTA() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
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
          website,
          message,
          from_name: 'straywebdesign.co',
          subject: `New Audit Request from ${name}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setWebsite('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-border-default bg-surface-page py-16 md:py-24"
      aria-label="Contact"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: CTA */}
          <AnimateIn>
            <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              Get Started
            </span>
            <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
              See How You Stack Up Against{' '}
              <GradientText>The Competition</GradientText>
            </h2>
            <p className="mt-4 font-mono text-lg text-text-secondary">
              Send us your URL and a competitor&apos;s. We&apos;ll show you exactly
              where you stand — and deliver a roadmap to close the gap. Free,
              no obligation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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
                {SITE.phone} <span className="text-xs text-text-tertiary">(text / voicemail)</span>
              </a>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <ArrowRight className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">Full Lighthouse Report</p>
                  <p className="font-mono text-sm text-text-secondary">
                    Performance, Accessibility, SEO, and Best Practices scores
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <ArrowRight className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">AI Readiness Check</p>
                  <p className="font-mono text-sm text-text-secondary">
                    Can AI assistants find and recommend your business?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
                  <ArrowRight className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-text-primary">Actionable Recommendations</p>
                  <p className="font-mono text-sm text-text-secondary">
                    Specific steps to improve — whether you hire us or not
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Contact Form */}
          <AnimateIn direction="right" delay={0.2}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center border border-border-default bg-surface-card p-10 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-accent" />
                <h3 className="font-mono text-xl font-bold text-text-primary">
                  Audit Request Received!
                </h3>
                <p className="mt-2 font-mono text-text-secondary">
                  We&apos;ll analyze your site and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-border-default bg-surface-card p-7 md:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Name
                    </label>
                    <input
                      id="name"
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
                      htmlFor="email"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Email
                    </label>
                    <input
                      id="email"
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
                      htmlFor="website"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Current Website URL
                    </label>
                    <input
                      id="website"
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className={inputClasses}
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell us about your business..."
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
                        Request Free Audit
                      </>
                    )}
                  </MagneticButton>
                </div>
              </form>
            )}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
