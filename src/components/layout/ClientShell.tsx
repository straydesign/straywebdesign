'use client';

import { type ReactNode, useEffect } from 'react';
import { useUtmCapture } from '@/hooks/useUtmParams';
import { trackContactClicks } from '@/lib/tracking';

/* No cookie banner. The site sets one first-party analytics cookie and nothing
   else — no ad pixels, no session recording, no data sold. No US law requires a
   consent gate for that, and the banner we had was worse than nothing: it
   appeared 8s in, long after GA had already sent the pageview, and "Opt out"
   only cleared window.gtag, which does not stop the already-loaded library. A
   control that promises a choice it does not deliver is the actual exposure.
   The honest disclosure lives on /privacy. Removed 2026-08-10. */

/* No chat bubble either, removed 2026-09-01. The page now has one action, and
   a floating bubble is a second one competing with it — every tap that opens a
   chat instead of the survey is a lead that never reaches the CRM. The two
   places to reach Tom are in the survey band and in the footer. */

export default function ClientShell({ children }: { children: ReactNode }) {
  useUtmCapture();
  useEffect(() => trackContactClicks(), []);
  return <>{children}</>;
}
