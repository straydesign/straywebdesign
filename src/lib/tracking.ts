/**
 * Ad platform conversion tracking utilities.
 * Fires events to Google Ads (gtag) and Meta Pixel (fbq) when configured.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

interface ConversionData {
  /** Value of the conversion in USD */
  value?: number;
  /** Currency code */
  currency?: string;
  /** Form type identifier */
  form_type?: string;
}

/**
 * Fire a lead conversion event to all configured ad platforms.
 * Call this on successful form submission.
 */
export function trackLeadConversion(data: ConversionData = {}) {
  const { value = 0, currency = 'USD', form_type } = data;

  // Google Ads conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
      value,
      currency,
      ...(form_type && { event_label: form_type }),
    });

    // Also fire as GA4 generate_lead event for analytics
    window.gtag('event', 'generate_lead', {
      value,
      currency,
      ...(form_type && { event_label: form_type }),
    });
  }

  // Meta Pixel Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      value,
      currency,
      ...(form_type && { content_name: form_type }),
    });
  }
}

/**
 * Fire a `page_engaged` GA4 event after the user has dwelled on the page for
 * `thresholdMs` and is still active (tab visible). This gives us a positive
 * engagement signal that filters out bot crawls and instant bounces on pages
 * (like /book) where page_view alone leaves session metrics at 0s / 0 engaged.
 *
 * Returns a cleanup function to call on unmount.
 */
export function trackPageEngaged(page: string, thresholdMs = 15000): () => void {
  if (typeof window === 'undefined') return () => {};

  let elapsed = 0;
  let lastTick = Date.now();
  let fired = false;

  const tick = () => {
    if (document.visibilityState !== 'visible' || fired) {
      lastTick = Date.now();
      return;
    }
    const now = Date.now();
    elapsed += now - lastTick;
    lastTick = now;
    if (elapsed >= thresholdMs && window.gtag) {
      window.gtag('event', 'page_engaged', { page, dwell_ms: elapsed });
      fired = true;
      clearInterval(interval);
    }
  };

  const interval = window.setInterval(tick, 2000);
  const onVisibility = () => {
    lastTick = Date.now();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    clearInterval(interval);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
