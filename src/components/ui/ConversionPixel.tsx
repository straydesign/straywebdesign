'use client';

import { useEffect, useRef } from 'react';
import { trackLeadConversion } from '@/lib/tracking';

/**
 * Fires a conversion event on mount. Place on thank-you/confirmation pages
 * as backup conversion tracking for redirect-based flows.
 */
export default function ConversionPixel({ formType }: { formType?: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackLeadConversion({ form_type: formType });
  }, [formType]);

  return null;
}
