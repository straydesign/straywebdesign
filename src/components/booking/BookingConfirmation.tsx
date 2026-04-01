'use client';

import { CheckCircle, ArrowLeft, Phone } from 'lucide-react';
import { formatDateDisplay } from '@/lib/booking';

interface BookingConfirmationProps {
  date: string;
  time: string;
  name: string;
}

export default function BookingConfirmation({
  date,
  time,
  name,
}: BookingConfirmationProps) {
  const firstName = name.split(' ')[0];

  return (
    <div className="flex flex-col items-center px-2 py-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center bg-accent/10">
        <CheckCircle className="h-7 w-7 text-accent" />
      </div>

      <h2 className="font-mono text-xl font-bold text-text-primary">
        You&apos;re booked, {firstName}.
      </h2>

      <div className="mt-5 w-full border border-border-default bg-surface-page px-5 py-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
          Discovery Call
        </p>
        <p className="mt-1 font-mono text-base font-semibold text-text-primary">
          {formatDateDisplay(date)}
        </p>
        <p className="font-mono text-sm text-accent">
          {time} EST &bull; 30 minutes
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
          <Phone className="h-4 w-4 text-accent" />
        </div>
        <p className="font-mono text-sm text-text-secondary">
          You&apos;ll receive a confirmation text shortly with call details.
          We&apos;ll reach out at your scheduled time.
        </p>
      </div>

      <div className="mt-6 space-y-2 text-left w-full">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
          What happens next
        </p>
        <ul className="space-y-1.5">
          {[
            'Confirmation text with call details',
            'Free Lighthouse audit of your current site',
            '30-minute discovery call at your scheduled time',
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-mono text-sm text-text-secondary"
            >
              <span className="h-1 w-1 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent/80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </a>
    </div>
  );
}
