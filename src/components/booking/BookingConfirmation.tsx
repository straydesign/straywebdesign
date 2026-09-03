'use client';

import Link from 'next/link';
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
  /* Name is optional on step one, so this is empty for most people and the
     heading rendered as "Got it, ." — drop the comma-name rather than
     substitute a stand-in, because "Got it, there." is worse than no name. */
  const firstName = name.trim().split(/\s+/)[0] || null;
  const hasBooking = date && time;

  return (
    <div className="flex flex-col items-center px-2 py-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center bg-accent/10">
        <CheckCircle className="h-7 w-7 text-accent" />
      </div>

      <h2 className="font-display text-xl font-bold text-text-primary">
        {hasBooking
          ? firstName
            ? `You're booked, ${firstName}.`
            : "You're booked."
          : firstName
            ? `Got it, ${firstName}.`
            : 'Got it.'}
      </h2>

      {hasBooking ? (
        <div className="mt-5 w-full border border-border-default bg-surface-page px-5 py-4">
          <p className="font-mono text-[10px] font-semibold text-text-tertiary">
            Discovery Call
          </p>
          <p className="mt-1 font-body text-base font-semibold text-text-primary">
            {formatDateDisplay(date)}
          </p>
          <p className="font-body text-sm text-accent">
            {time} EST &bull; 30 minutes
          </p>
        </div>
      ) : (
        /* Mirrors the booked card above: label, then the one fact in the same
           weight the date gets. This used to read "We'll be in touch shortly
           to get the conversation started", which said nothing the two blocks
           under it didn't already say, and said it vaguer. */
        <div className="mt-5 w-full border border-border-default bg-surface-page px-5 py-4">
          <p className="font-mono text-[10px] font-semibold text-text-tertiary">
            Your Plan
          </p>
          <p className="mt-1 font-body text-base font-semibold text-text-primary">
            Within 24 hours
          </p>
          <p className="font-body text-sm text-accent">
            Written &bull; straight to your inbox
          </p>
        </div>
      )}

      <div className="mt-5 flex items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10">
          <Phone className="h-4 w-4 text-accent" />
        </div>
        {/* Promises the email, because the email is what actually goes. This
            said "a confirmation text shortly" for months while the number's
            A2P registration was rejected and the carrier dropped every
            message — the first thing someone was told after booking was a
            thing that would never happen. */}
        <p className="font-body text-sm text-text-secondary">
          {hasBooking
            ? "A confirmation is on its way to your inbox, with a calendar invite attached. We'll call you at your scheduled time."
            : "Read it, then tell us if a call would help. We'll find a time that works for both of us."}
        </p>
      </div>

      <div className="mt-6 space-y-2 text-left w-full">
        <p className="font-mono text-[10px] font-semibold text-text-tertiary">
          What happens next
        </p>
        <ul className="space-y-1.5">
          {(hasBooking
            ? [
                'Confirmation email with a calendar invite',
                "A plan for what the site should actually do",
                '30-minute discovery call at your scheduled time',
              ]
            : [
                'Confirmation email, right about now',
                "A plan for what the site should actually do",
                '30-minute discovery call when it works for you',
              ]
          ).map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-body text-sm text-text-secondary"
            >
              <span className="h-1 w-1 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 font-body text-sm text-accent transition-colors hover:text-accent/80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
