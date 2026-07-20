'use client';

import { type ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useUtmCapture } from '@/hooks/useUtmParams';
import { trackContactClicks } from '@/lib/tracking';

const ChatWidget = dynamic(() => import('@/components/ui/ChatWidget'), {
  ssr: false,
});

const CookieBanner = dynamic(() => import('@/components/ui/CookieBanner'), {
  ssr: false,
});

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
      <CookieBanner />
    </>
  );
}
