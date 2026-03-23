'use client';

const ITEMS = [
  'Sub-1s Load Times',
  'Lighthouse 100s',
  'AI-Ready Architecture',
  'WCAG AA Accessible',
  'Zero WordPress',
  'Custom Built',
  'Erie PA',
  'Core Web Vitals',
];

interface MarqueeProps {
  className?: string;
}

export default function Marquee({ className = '' }: MarqueeProps) {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className={`relative overflow-hidden border-y border-white/10 bg-navy py-4 ${className}`}
      aria-hidden="true"
    >
      <div className="flex animate-[marquee-scroll_30s_linear_infinite] whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-6 flex shrink-0 items-center gap-6">
            <span className="font-display text-sm font-semibold tracking-widest text-white/60 uppercase">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
          </span>
        ))}
      </div>
    </div>
  );
}
