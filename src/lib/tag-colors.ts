/**
 * One map for blog tag chips — the four real content categories.
 * Cool families only (§5: no warm tints as surface color).
 */
export const TAG_COLORS: Record<string, string> = {
  'Before You Buy': 'bg-blue-50 text-blue-700',
  'Running Your Site': 'bg-teal-50 text-teal-700',
  Productizing: 'bg-indigo-50 text-indigo-700',
  'How Customers Decide': 'bg-sky-50 text-sky-700',
};

export const TAG_FALLBACK = 'bg-surface-sunken text-text-secondary';
