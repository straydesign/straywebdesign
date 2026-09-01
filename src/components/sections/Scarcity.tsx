import { SCARCITY } from '@/lib/constants';

/**
 * Scarcity — a real constraint on how many builds are open, with the date it
 * was last checked.
 *
 * Renders NOTHING until SCARCITY.spots is a number Tom has actually set. A
 * made-up "only 2 spots left" is the single fastest way to make everything
 * else on the page read as marketing, and it is the kind of claim a customer
 * can catch you on. Same rule as the video: absent beats invented.
 */
export default function Scarcity() {
  if (SCARCITY.spots === null) return null;

  return (
    <aside
      className="border-b border-border-default bg-surface-sunken py-5"
      aria-label="Availability"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-1 px-5 md:flex-row md:items-baseline md:justify-between md:px-8">
        <p className="font-body text-[15px] text-text-primary">
          <span className="font-semibold">
            {SCARCITY.spots} {SCARCITY.spots === 1 ? 'build' : 'builds'} open
          </span>{' '}
          for {SCARCITY.period}. I run one at a time so nobody waits behind
          somebody else.
        </p>
        <p className="font-mono text-[11px] text-text-tertiary">
          <span aria-hidden className="text-accent/60">{'// '}</span>
          checked {SCARCITY.checked}
        </p>
      </div>
    </aside>
  );
}
