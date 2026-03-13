'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import GrainOverlay from '@/components/ui/GrainOverlay';
import { SITE } from '@/lib/constants';

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
      className="section-padding relative bg-navy text-white"
      aria-label="Contact"
    >
      <GrainOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: CTA */}
          <AnimateIn>
            <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
              Get Started
            </span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              See How You Stack Up Against{' '}
              <GradientText>The Competition</GradientText>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Send us your URL and a competitor&apos;s. We&apos;ll show you exactly
              where you stand — and deliver a roadmap to close the gap. Free,
              no obligation.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                  <ArrowRight className="h-4 w-4 text-electric" />
                </div>
                <div>
                  <p className="font-semibold text-white">Full Lighthouse Report</p>
                  <p className="text-sm text-slate-400">
                    Performance, Accessibility, SEO, and Best Practices scores
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                  <ArrowRight className="h-4 w-4 text-electric" />
                </div>
                <div>
                  <p className="font-semibold text-white">AI Readiness Check</p>
                  <p className="text-sm text-slate-400">
                    Can AI assistants find and recommend your business?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric/20">
                  <ArrowRight className="h-4 w-4 text-electric" />
                </div>
                <div>
                  <p className="font-semibold text-white">Actionable Recommendations</p>
                  <p className="text-sm text-slate-400">
                    Specific steps to improve — whether you hire us or not
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Contact Form */}
          <AnimateIn direction="right" delay={0.2}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
                <CheckCircle className="mb-4 h-12 w-12 text-emerald-400" />
                <h3 className="font-display text-xl font-bold text-white">
                  Audit Request Received!
                </h3>
                <p className="mt-2 text-slate-400">
                  We&apos;ll analyze your site and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm md:p-8"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-electric focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-electric focus:outline-none"
                      placeholder="you@business.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Current Website URL
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-electric focus:outline-none"
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-electric focus:outline-none"
                      placeholder="Tell us about your business..."
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
                    <AlertTriangle className="h-4 w-4" />
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
