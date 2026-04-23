'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="fixed bottom-4 left-4 z-[9999] max-w-xs border border-border-default bg-surface-card p-3 shadow-lg sm:bottom-6 sm:left-6">
      <div className="flex items-start gap-2">
        <p className="font-mono text-[11px] leading-relaxed text-text-secondary">
          We use cookies for analytics.{' '}
          <Link href="/privacy" className="text-accent underline hover:text-accent/80">
            Privacy
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 p-0.5 text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Close cookie notice"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>
      <div className="mt-2 flex gap-1.5">
        <button
          onClick={dismiss}
          className="flex-1 bg-accent px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90"
        >
          OK
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-border-default px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
        >
          Opt out
        </button>
      </div>
    </div>
  );
}
