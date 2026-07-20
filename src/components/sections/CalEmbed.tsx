'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';

// Env var: NEXT_PUBLIC_CAL_LINK, e.g. "tom-stray/audit-call"
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

function CalInlineIframe({ calLink }: { calLink: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-[640px] overflow-hidden border border-border-default bg-surface-card"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 font-body text-sm text-text-tertiary">
            <Calendar className="h-6 w-6 animate-pulse text-accent" />
            Loading calendar…
          </div>
        </div>
      )}
      {visible && (
        <iframe
          src={`https://cal.com/${calLink}?embed=true&theme=auto&hideEventTypeDetails=false`}
          title="Book a call — Stray Web Design"
          width="100%"
          height="640"
          frameBorder="0"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="h-[640px] w-full"
        />
      )}
    </div>
  );
}

function CalFallback() {
  return (
    <div className="border border-dashed border-border-strong bg-surface-card p-8 text-center">
      <Calendar className="mx-auto h-8 w-8 text-accent" />
      <p className="mt-4 font-body text-sm text-text-secondary">
        Live calendar coming soon.
      </p>
      <a
        href="#contact"
        className="mt-4 inline-flex items-center justify-center font-display font-semibold transition-colors bg-accent text-white hover:bg-accent/90 px-5 py-3 text-sm"
      >
        Request a time
      </a>
    </div>
  );
}

export default function CalEmbed() {
  return (
    <section
      id="book-a-call"
      className="border-t border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Book a call"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn className="text-center">
          <span className="eyebrow mb-4">Skip the back-and-forth</span>
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Walk away with a concrete next step.{' '}
            <GradientText>15 minutes, no pitch.</GradientText>
          </h2>
          <p className="mt-4 font-body text-base text-text-secondary">
            Pick a slot. We&apos;ll dig into what a custom-built site could
            earn you. You leave with a plan whether you hire me or not.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-10">
          {CAL_LINK ? <CalInlineIframe calLink={CAL_LINK} /> : <CalFallback />}
        </AnimateIn>
      </div>
    </section>
  );
}
