'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Analytics that honours the browser's privacy signal.
 *
 * This replaces the cookie banner. A banner asks permission after the
 * measurement has already happened, adds friction for every visitor, and — the
 * part that actually matters legally — makes a promise the site then has to
 * keep. Reading Global Privacy Control and Do Not Track keeps the promise
 * without asking anyone anything: if a visitor's browser has already said "do
 * not track me", the analytics script never loads, so there is no cookie and no
 * pageview. Everyone else sees no interruption at all.
 *
 * GPC is sent by Brave, DuckDuckGo, Firefox with "tell websites not to sell my
 * data" on, and the Privacy Badger / DuckDuckGo extensions. DNT is the older
 * signal; Safari and Chrome dropped it, but Firefox still sends it.
 *
 * Rendering happens on the client only — the check needs `navigator`, and a
 * server-rendered script tag would have already fetched gtag.js by the time we
 * could look.
 */

type Navigators = Navigator & {
  globalPrivacyControl?: boolean;
  doNotTrack?: string | null;
  msDoNotTrack?: string | null;
};

export function hasOptedOut(): boolean {
  if (typeof navigator === 'undefined') return true;
  const n = navigator as Navigators;
  const w = window as Window & { doNotTrack?: string | null };
  return (
    n.globalPrivacyControl === true ||
    n.doNotTrack === '1' ||
    n.doNotTrack === 'yes' ||
    n.msDoNotTrack === '1' ||
    w.doNotTrack === '1'
  );
}

export default function Analytics({
  gaId,
  adsId,
  metaPixelId,
}: {
  gaId?: string;
  adsId?: string;
  metaPixelId?: string;
}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (hasOptedOut()) return;
    // The deferral is done here rather than with strategy="lazyOnload".
    // lazyOnload waits for the window load event, and this component only
    // renders after hydration — on a light page hydration finishes AFTER load,
    // the event never comes back around, and analytics silently never loads.
    // (Caught on Sea Cave 2026-08-10: /contact had the tag id in its payload
    // and still made zero requests.) An idle callback fires either way.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setAllowed(true), { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setAllowed(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!allowed || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');${
          adsId ? `gtag('config','${adsId}');` : ''
        }`}
      </Script>
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
