'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import LighthouseGauge from '@/components/ui/LighthouseGauge';
import CountUp from '@/components/ui/CountUp';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';

interface AuditResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
}

type AuditState = 'idle' | 'loading' | 'done' | 'error';

export default function AuditTool() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<AuditState>('idle');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');

  const runAudit = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setState('loading');
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Audit failed');
      }

      setResult(data);
      setState('done');

      // Haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 30, 50]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('error');
    }
  }, [url]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runAudit();
    }
  };

  const overallScore = result
    ? Math.round(
        (result.performance + result.accessibility + result.bestPractices + result.seo) / 4
      )
    : 0;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn className="text-center">
          <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
            Free Website Audit
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            See how your site stacks up. Enter your URL for an instant Lighthouse analysis.
          </p>
        </AnimateIn>

        {/* URL Input */}
        <AnimateIn delay={0.2} className="mt-10">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your website URL..."
                className="w-full border border-border-default py-4 pl-12 pr-4 text-base text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                disabled={state === 'loading'}
              />
            </div>
            <button
              onClick={runAudit}
              disabled={!url.trim() || state === 'loading'}
              className="flex items-center gap-2 bg-accent px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {state === 'loading' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </AnimateIn>

        {/* Loading skeleton */}
        <AnimatePresence>
          {state === 'loading' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10"
            >
              <div className="border border-border-default bg-surface-card p-8">
                <div className="flex justify-center gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="h-[90px] w-[90px] animate-pulse rounded-full bg-surface-sunken" />
                      <div className="h-3 w-12 animate-pulse bg-surface-sunken" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 animate-pulse bg-surface-sunken" style={{ width: `${80 - i * 10}%` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {state === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex items-center gap-3 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {state === 'done' && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 space-y-6"
            >
              {/* Overall score */}
              <div className="border border-border-default bg-surface-card p-8 text-center">
                <p className="text-sm font-medium text-text-secondary">Overall Score</p>
                <p className="mt-2 font-mono text-6xl font-bold text-text-primary">
                  <CountUp value={overallScore} duration={1.5} />
                  <span className="text-2xl text-text-tertiary">/100</span>
                </p>
              </div>

              {/* Category gauges */}
              <div className="border border-border-default bg-surface-card p-8">
                <div className="flex flex-wrap justify-center gap-8">
                  <LighthouseGauge score={result.performance} label="Performance" size={100} delay={0.1} />
                  <LighthouseGauge score={result.accessibility} label="Accessibility" size={100} delay={0.3} />
                  <LighthouseGauge score={result.bestPractices} label="Best Practices" size={100} delay={0.5} />
                  <LighthouseGauge score={result.seo} label="SEO" size={100} delay={0.7} />
                </div>
              </div>

              {/* Core Web Vitals */}
              <div className="border border-border-default bg-surface-card p-8">
                <h3 className="font-mono text-lg font-bold text-text-primary">Core Web Vitals</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    { label: 'First Contentful Paint', value: result.fcp },
                    { label: 'Largest Contentful Paint', value: result.lcp },
                    { label: 'Cumulative Layout Shift', value: result.cls },
                    { label: 'Total Blocking Time', value: result.tbt },
                  ].map((metric) => (
                    <div key={metric.label} className="bg-surface-sunken p-4">
                      <p className="text-xs font-medium text-text-secondary">{metric.label}</p>
                      <p className="mt-1 font-mono text-lg font-bold text-text-primary">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-base text-text-secondary">
                  {overallScore < 70
                    ? "Your site has room for improvement. Let's fix that."
                    : overallScore < 90
                      ? 'Good start, but we can push it higher.'
                      : 'Solid scores! Let us show you what else is possible.'}
                </p>
                <div className="mt-6">
                  <MagneticButton href="/book" variant="primary" size="lg">
                    Book Free Consultation
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
