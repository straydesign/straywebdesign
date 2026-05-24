'use client';

const ITEMS = [
  'Loads before they bounce',
  'First on Google',
  'Cited by ChatGPT',
  'Works on every thumb',
  'No WordPress baggage',
  'Hand-coded, not templated',
  'Pays for itself',
];

interface MarqueeProps {
  className?: string;
}

export default function Marquee({ className = '' }: MarqueeProps) {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className={`relative overflow-hidden border-y border-border-default bg-surface-card py-4 ${className}`}
      aria-hidden="true"
    >
      <div className="flex animate-[marquee-scroll_30s_linear_infinite] whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-6 flex shrink-0 items-center gap-6">
            <span className="font-mono text-[11px] font-semibold tracking-widest text-text-secondary uppercase">
              {item}
            </span>
            <span className="h-1.5 w-1.5 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
