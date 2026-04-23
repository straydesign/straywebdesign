'use client';

import { CheckCircle, ArrowLeft, Phone } from 'lucide-react';
import { formatDateDisplay } from '@/lib/booking';

interface BookingConfirmationProps {
  date: string | null;
  time: string | null;
  name: string;
}

export default function BookingConfirmation({
  date,
  time,
  name,
}: BookingConfirmationProps) {
  const firstName = name.split(' ')[0];
  const hasBooking = date && time;

  return (
    <div className="flex flex-col items-center px-2 py-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center bg-accent/10">
        <CheckCircle className="h-7 w-7 text-accent" />
      </div>

      <h2 className="font-mono text-xl font-bold text-text-primary">
        {hasBooking ? `You're booked, ${firstName}.` : `Got it, ${firstName}.`}
      </h2>

      {hasBooking ? (
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
      ) : (
        <div className="mt-5 w-full border border-border-default bg-surface-page px-5 py-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
            What&apos;s Next
          </p>
          <p className="mt-1 font-mono text-sm text-text-primary">
            We&apos;ll be in touch shortly to get the conversation started.
          </p>
        </div>
      )}

      <div className="mt-5 flex items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
          <Phone className="h-4 w-4 text-accent" />
        </div>
        <p className="font-mono text-sm text-text-secondary">
          {hasBooking
            ? "You'll receive a confirmation text shortly with call details. We'll reach out at your scheduled time."
            : "You'll hear from us shortly. We'll find a time that works for both of us."}
        </p>
      </div>

      <div className="mt-6 space-y-2 text-left w-full">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
          What happens next
        </p>
        <ul className="space-y-1.5">
          {(hasBooking
            ? [
                'Confirmation text with call details',
                "A plan for what the site should actually do",
                '30-minute discovery call at your scheduled time',
              ]
            : [
                "We'll reach out to introduce ourselves",
                "A plan for what the site should actually do",
                '30-minute discovery call when it works for you',
              ]
          ).map((item) => (
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
