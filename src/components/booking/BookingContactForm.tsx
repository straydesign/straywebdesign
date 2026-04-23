'use client';

import { useState, type FormEvent } from 'react';

const inputClasses =
  'w-full border border-border-strong bg-surface-sunken px-4 py-3 font-mono text-text-primary placeholder-text-placeholder transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none';

interface BookingContactFormProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangePhone: (v: string) => void;
  onChangeCompany: (v: string) => void;
  onChangeWebsite: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  onFieldTouched: () => void;
  submitting: boolean;
  error: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
}

export default function BookingContactForm({
  name,
  email,
  phone,
  company,
  website,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangeCompany,
  onChangeWebsite,
  onSubmit,
  onFieldTouched,
  submitting,
  error,
  selectedDate,
  selectedTime,
}: BookingContactFormProps) {
  const isInitialStep = !selectedDate && !selectedTime;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <form onSubmit={onSubmit} noValidate>
      {!isInitialStep && (
        <div className="mb-5 border border-accent/20 bg-accent/5 px-4 py-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
            {selectedTime ? 'Your Appointment' : 'Contact Request'}
          </p>
          <p className="mt-1 font-mono text-sm text-text-primary">
            {selectedTime && selectedDate ? (
              <>
                {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {selectedTime} EST
              </>
            ) : (
              "We'll reach out to find a time that works"
            )}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="booking-email"
            className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
          >
            Email
          </label>
          <input
            id="booking-email"
            type="email"
            value={email}
            onChange={(e) => { onChangeEmail(e.target.value); onFieldTouched(); }}
            className={inputClasses}
            placeholder="you@business.com"
            autoComplete="email"
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="booking-name"
            className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
          >
            Name <span className="font-normal text-text-tertiary">(optional)</span>
          </label>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => { onChangeName(e.target.value); onFieldTouched(); }}
            className={inputClasses}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        {!showDetails && (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="font-mono text-xs text-text-tertiary underline-offset-2 transition-colors hover:text-accent hover:underline"
          >
            + Add phone, business, or website (optional)
          </button>
        )}

        {showDetails && (
          <div className="space-y-4 border-l-2 border-border-default pl-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                >
                  Phone
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => { onChangePhone(e.target.value); onFieldTouched(); }}
                  className={inputClasses}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label
                  htmlFor="booking-company"
                  className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
                >
                  Business Name
                </label>
                <input
                  id="booking-company"
                  type="text"
                  value={company}
                  onChange={(e) => { onChangeCompany(e.target.value); onFieldTouched(); }}
                  className={inputClasses}
                  placeholder="Your business"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-website"
                className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary"
              >
                Current Website
              </label>
              <input
                id="booking-website"
                type="text"
                value={website}
                onChange={(e) => { onChangeWebsite(e.target.value); onFieldTouched(); }}
                className={inputClasses}
                placeholder="https://yourbusiness.com"
                autoComplete="url"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="mt-4 font-mono text-sm text-red-500">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin border-2 border-white/30 border-t-white" />
            Sending...
          </>
        ) : (
          isInitialStep ? 'Send me the plan →' : 'Confirm Booking'
        )}
      </button>

      {isInitialStep && (
        <p className="mt-3 text-center font-mono text-[11px] text-text-tertiary">
          No call required. We&apos;ll come back with a plan for your site within 24 hours.
        </p>
      )}
    </form>
  );
}
