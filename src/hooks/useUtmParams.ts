'use client';

import { useEffect, useRef } from 'react';

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  click_id?: string;
  ad_platform?: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'li_fat_id', 'ttclid'] as const;

const STORAGE_KEY = 'stray_utm';

function getStoredUtms(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function storeUtms(params: UtmParams) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // sessionStorage unavailable
  }
}

/** Capture UTMs from URL on first load, persist in sessionStorage */
export function useUtmCapture() {
  const captured = useRef(false);

  useEffect(() => {
    if (captured.current) return;
    captured.current = true;

    const url = new URL(window.location.href);
    const params: UtmParams = { ...getStoredUtms() };
    let hasNew = false;

    // Capture UTM params
    for (const key of UTM_KEYS) {
      const val = url.searchParams.get(key);
      if (val) {
        params[key] = val;
        hasNew = true;
      }
    }

    // Capture click IDs
    for (const key of CLICK_ID_KEYS) {
      const val = url.searchParams.get(key);
      if (val) {
        params.click_id = val;
        // Detect platform from click ID
        if (key === 'gclid' || key === 'gbraid' || key === 'wbraid') params.ad_platform = 'google';
        else if (key === 'fbclid') params.ad_platform = 'meta';
        else if (key === 'li_fat_id') params.ad_platform = 'linkedin';
        else if (key === 'ttclid') params.ad_platform = 'tiktok';
        hasNew = true;
      }
    }

    // Capture referrer (first visit only)
    if (!params.referrer && document.referrer && !document.referrer.includes('straywebdesign.co')) {
      params.referrer = document.referrer;
      hasNew = true;
    }

    // Capture landing page (first visit only)
    if (!params.landing_page) {
      params.landing_page = window.location.pathname + window.location.search;
      hasNew = true;
    }

    if (hasNew) storeUtms(params);
  }, []);
}

/** Get stored UTM params for form submissions */
export function getUtmParams(): UtmParams {
  return getStoredUtms();
}
