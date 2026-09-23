'use client';

import { useRef } from 'react';

/* SegmentedControl — two or more mutually exclusive choices, one visible at a
   time. This is the tabs pattern, so it gets the tabs contract: real buttons
   with role="tab", aria-selected on the chosen one, aria-controls pointing at
   the panel, and left/right arrows moving between them. Anything that looks
   like tabs and does not do this is a set of buttons wearing a costume. */

export type Segment = { id: string; label: string };

export default function SegmentedControl({
  segments,
  value,
  onChange,
  label,
  groupId,
  accentClass = 'bg-accent',
}: {
  segments: Segment[];
  value: string;
  onChange: (id: string) => void;
  /** Names the group for a screen reader — "Business type", not "Tabs". */
  label: string;
  /* The parent owns the id, because it also renders the panels and the two
     halves have to agree on what aria-controls points at. A useId in here
     would be invisible to them. */
  groupId: string;
  accentClass?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* Selection and focus move together. Automatic activation is the right
     choice for two panels that are both already mounted — there is nothing to
     load, so making someone press Enter after arriving is a step for its own
     sake. */
  const select = (seg: Segment | undefined) => {
    if (!seg) return;
    onChange(seg.id);
    refs.current[seg.id]?.focus();
  };

  const move = (delta: number) => {
    const i = segments.findIndex((s) => s.id === value);
    select(segments[(i + delta + segments.length) % segments.length]);
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-border-default bg-surface-sunken p-1"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          move(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          move(-1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          select(segments[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          select(segments[segments.length - 1]);
        }
      }}
    >
      {segments.map((seg) => {
        const selected = seg.id === value;
        return (
          <button
            key={seg.id}
            ref={(el) => {
              refs.current[seg.id] = el;
            }}
            type="button"
            role="tab"
            id={`${groupId}-tab-${seg.id}`}
            aria-selected={selected}
            aria-controls={`${groupId}-panel-${seg.id}`}
            /* Only the selected tab is in the tab order; the arrows reach the
               rest. That is the roving tabindex the pattern asks for. */
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(seg.id)}
            className={[
              'min-h-11 rounded-full px-6 font-display text-sm font-semibold tracking-wide transition-colors sm:text-base',
              selected
                ? `${accentClass} text-accent-ink`
                : 'text-text-secondary hover:text-text-primary',
            ].join(' ')}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}

/** Ids the panels have to use so aria-controls resolves. */
export function panelProps(groupId: string, id: string, selected: boolean) {
  return {
    role: 'tabpanel' as const,
    id: `${groupId}-panel-${id}`,
    'aria-labelledby': `${groupId}-tab-${id}`,
    'aria-hidden': !selected,
  };
}
