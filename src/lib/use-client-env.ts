'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

/**
 * SSR-safe mobile detection. Returns false during SSR and first render
 * to avoid hydration mismatches, then updates to the real value after mount.
 */

let clientMobile: boolean | null = null;
let clientReducedMotion: boolean | null = null;

function getSnapshot(): { mobile: boolean; reducedMotion: boolean } {
  if (clientMobile === null) {
    clientMobile = window.innerWidth < 768;
    clientReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return { mobile: clientMobile, reducedMotion: clientReducedMotion! };
}

const SERVER_SNAPSHOT = { mobile: false, reducedMotion: false };

function getServerSnapshot(): { mobile: boolean; reducedMotion: boolean } {
  return SERVER_SNAPSHOT;
}

// No subscriptions needed — these don't change during a session
function subscribe(_callback: () => void): () => void {
  return () => {};
}

/**
 * Hook that returns { mobile, reducedMotion } safely for SSR.
 * Returns false for both during server render and first client render,
 * preventing hydration mismatches.
 */
export function useClientEnv(): { mobile: boolean; reducedMotion: boolean } {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return SERVER_SNAPSHOT;
  }

  return getSnapshot();
}
