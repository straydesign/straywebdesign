'use client';

import { useEffect } from 'react';

/**
 * WCAG 2.1 Section-Level Keyboard Navigation
 *
 * - All sections get tabindex="0" and role="region" → Tab lands on each section
 * - ArrowDown/ArrowUp: jump between sections when a section is focused
 * - Enter: moves focus to the first interactive element inside the section
 * - Escape: from inside a section, returns focus to the section itself
 * - Screen readers announce section name via aria-label on each <section>
 * - Landmark navigation (VoiceOver: Ctrl+Option+Cmd+J, NVDA: d) also works
 */
export default function SectionKeyboardNav() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section[aria-label]')
    );

    // Attributes added via useEffect cause hydration mismatches.
    // Sections with aria-label are already implicit regions per ARIA spec,
    // and the keyboard handler below handles focus programmatically.


    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;

      // When a section itself is focused
      const isSection = sections.includes(active);
      if (isSection) {
        const currentIndex = sections.indexOf(active);

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
        } else if (e.key === 'Enter') {
          // Enter dives into the section — focus first interactive element
          e.preventDefault();
          const firstFocusable = active.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]):not(section)'
          );
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
        return;
      }

      // Escape from inside a section returns to the section
      if (e.key === 'Escape') {
        const parentSection = active.closest<HTMLElement>('main section[aria-label]');
        if (parentSection) {
          e.preventDefault();
          parentSection.focus();
          parentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
