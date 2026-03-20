'use client';

import { type ReactNode } from 'react';
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

export function ClientExtras() {
  return (
    <>
      <CustomCursor />
      <ChatWidget />
    </>
  );
}
