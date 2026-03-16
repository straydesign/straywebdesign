'use client';

import { useEffect } from 'react';

/**
 * Adds section-level keyboard navigation.
 * - ArrowDown / ArrowUp: jump between sections when a section is focused
 * - Sections are marked with tabindex="0" and role="region" (via <section> + aria-label)
 * - Screen readers can use landmark navigation (d/Shift+d in VoiceOver, r/Shift+r in NVDA)
 */
export default function SectionKeyboardNav() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section[aria-label]')
    );

    // Make all sections focusable
    for (const section of sections) {
      section.setAttribute('tabindex', '0');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;

      // Only handle arrows when a section itself is focused
      const currentSection = active.closest('main section[aria-label]');
      if (currentSection !== active) return;

      const currentIndex = sections.indexOf(active);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const next = sections[currentIndex + 1];
        if (next) {
          next.focus();
          next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const prev = sections[currentIndex - 1];
        if (prev) {
          prev.focus();
          prev.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
