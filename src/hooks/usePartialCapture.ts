'use client';

import { useEffect, useRef, useCallback } from 'react';
import { getUtmParams } from './useUtmParams';

interface PartialCaptureFields {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
}

interface UsePartialCaptureOptions {
  formType: string;
  getFields: () => PartialCaptureFields;
}

/**
 * Captures partial form data when a user leaves the page without submitting.
 * Fires navigator.sendBeacon to CRM with `submitted: false`.
 *
 * Call `markSubmitted()` in your form's onSubmit to suppress the abandon capture.
 */
export function usePartialCapture({ formType, getFields }: UsePartialCaptureOptions) {
  const submittedRef = useRef(false);
  const hasTouchedRef = useRef(false);

  const markSubmitted = useCallback(() => {
    submittedRef.current = true;
  }, []);

  const markTouched = useCallback(() => {
    hasTouchedRef.current = true;
    // Persist current field values to sessionStorage so the chat widget can see them
    try {
      const fields = getFields();
      const hasData = Object.values(fields).some((v) => v && v.trim().length > 0);
      if (hasData) {
        sessionStorage.setItem(
          'stray_partial_form',
          JSON.stringify({ ...fields, form_type: formType, timestamp: Date.now() })
        );
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [getFields, formType]);

  useEffect(() => {
    const sendPartial = () => {
      if (submittedRef.current || !hasTouchedRef.current) return;

      const fields = getFields();
      // Only send if there's at least one field with data
      const hasData = Object.values(fields).some((v) => v && v.trim().length > 0);
      if (!hasData) return;

      const utms = getUtmParams();
      const crmUrl =
        process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
        'https://stray-crm.vercel.app/api/leads/inbound';

      const payload = {
        ...fields,
        form_type: formType,
        submitted: false,
        ...utms,
      };

      // sendBeacon is reliable on page unload — fetch is not
      navigator.sendBeacon(
        crmUrl,
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendPartial();
      }
    };

    // visibilitychange fires reliably on tab close, navigation, and mobile backgrounding
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [formType, getFields]);

  return { markSubmitted, markTouched };
}
