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
