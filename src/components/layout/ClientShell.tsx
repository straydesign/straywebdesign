'use client';

import { type ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(
  () => import('@/components/layout/SmoothScroll').then((mod) => ({ default: mod.SmoothScroll })),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((mod) => ({ default: mod.CustomCursor })),
  { ssr: false }
);

const ChatWidget = dynamic(() => import('@/components/ui/ChatWidget'), {
  ssr: false,
});

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}

/**
 * Deferred extras — ChatWidget loads after 4s idle to avoid TBT impact.
 * CustomCursor is lightweight and loads immediately (desktop only via its own check).
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
      <CustomCursor />
      {showChat && <ChatWidget />}
    </>
  );
}
