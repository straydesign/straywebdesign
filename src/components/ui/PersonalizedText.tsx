'use client';

import { useMemo } from 'react';
import {
  getPersonalizationFromCookies,
  getPersonalizedHeroCopy,
  type HeroCopy,
} from '@/lib/personalization';

interface PersonalizedTextProps {
  field: keyof HeroCopy;
  fallback: string;
}

export default function PersonalizedText({
  field,
  fallback,
}: PersonalizedTextProps) {
  const copy = useMemo(() => {
    if (typeof document === 'undefined') return fallback;
    const ctx = getPersonalizationFromCookies(document.cookie);
    const personalized = getPersonalizedHeroCopy(ctx);
    return personalized[field] || fallback;
  }, [field, fallback]);

  return <>{copy}</>;
}
