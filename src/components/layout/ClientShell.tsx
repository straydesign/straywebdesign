'use client';

import { type ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useUtmCapture } from '@/hooks/useUtmParams';
import { trackContactClicks } from '@/lib/tracking';

const ChatWidget = dynamic(() => import('@/components/ui/ChatWidget'), {
  ssr: false,
});

/* No cookie banner. The site sets one first-party analytics cookie and nothing
   else — no ad pixels, no session recording, no data sold. No US law requires a
   consent gate for that, and the banner we had was worse than nothing: it
   appeared 8s in, long after GA had already sent the pageview, and "Opt out"
   only cleared window.gtag, which does not stop the already-loaded library. A
   control that promises a choice it does not deliver is the actual exposure.
   The honest disclosure lives on /privacy. Removed 2026-08-10. */

export default function ClientShell({ children }: { children: ReactNode }) {
  useUtmCapture();
  useEffect(() => trackContactClicks(), []);
  return <>{children}</>;
}

/**
 * Deferred extras — ChatWidget loads after 4s idle to avoid TBT impact.
 */
export function ClientExtras() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Defer chat widget — it's not critical for initial experience
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    if (hasIdleCallback) {
      const id = window.requestIdleCallback(() => setShowChat(true), { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(() => setShowChat(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showChat && <ChatWidget />}
    </>
  );
}
