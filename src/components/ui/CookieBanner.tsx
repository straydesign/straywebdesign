'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    reb2b?: unknown;
  }
}

const STORAGE_KEY = 'stray_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    // If they previously declined, disable tracking
    if (consent === 'declined') {
      disableTracking();
      return;
    }
    // If they haven't dismissed the banner yet, show it
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
    // 'accepted' or 'dismissed' — tracking stays on, banner stays hidden
  }, []);

  function disableTracking() {
    if (typeof window !== 'undefined') {
      window.gtag = undefined;
      window.fbq = undefined;
      window.reb2b = undefined;
    }
  }

  function dismiss() {
    // Dismissing = implicit consent. Tracking continues, banner goes away.
    localStorage.setItem(STORAGE_KEY, 'dismissed');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
    disableTracking();
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-lg border border-border-default bg-surface-card p-4 shadow-lg sm:left-auto sm:right-6 sm:bottom-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs leading-relaxed text-text-secondary">
          We use cookies for analytics and to personalize your experience.{' '}
          <Link href="/privacy" className="text-accent underline hover:text-accent/80">
            Privacy policy
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 p-1 text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Close cookie notice"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={dismiss}
          className="flex-1 bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90"
        >
          Got it
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-border-default px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
        >
          Opt out
        </button>
      </div>
    </div>
  );
}
