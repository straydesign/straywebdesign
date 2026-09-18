/* Case studies, shared with straydesign.co.
 *
 * Ported 2026-09-17 rather than rewritten, on Tom's instruction — "I want the
 * sites on there as case studies... just use the code and then make the
 * changes from there." Same types, same shot manifests, same captures.
 *
 * Four, not five: Middleman is a product prototype and belongs on the
 * portfolio, not on a page selling websites to local businesses.
 */
import { CLIENT_CASE_STUDIES } from './clients';
import { type CaseStudy } from './types';

export * from './types';
export * from './shots';
export { CLIENT_CASE_STUDIES } from './clients';

export const CASE_STUDIES: readonly CaseStudy[] = CLIENT_CASE_STUDIES;

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug);
