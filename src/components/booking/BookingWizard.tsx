'use client';

import { useState, useMemo, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CalendarPicker from './CalendarPicker';
import TimeSlotPicker from './TimeSlotPicker';
import BookingContactForm from './BookingContactForm';
import BookingConfirmation from './BookingConfirmation';
import { getBookableDates, type BookingPayload } from '@/lib/booking';
import { getUtmParams } from '@/hooks/useUtmParams';
import { usePartialCapture } from '@/hooks/usePartialCapture';
import { trackLeadConversion } from '@/lib/tracking';
import { SITE } from '@/lib/constants';

type Step = 'contact' | 'date' | 'time' | 'confirm' | 'confirmed';

const STEP_LABELS: Record<Step, string> = {
  contact: 'Your Info',
  date: 'Pick a Date',
  time: 'Pick a Time',
  confirm: 'Confirm',
  confirmed: 'Confirmed',
};

const STEP_ORDER: Step[] = ['contact', 'date', 'time', 'confirm', 'confirmed'];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export default function BookingWizard() {
  const [step, setStep] = useState<Step>('contact');
  const [direction, setDirection] = useState(1);
  const [leadSaved, setLeadSaved] = useState(false);

  // Contact state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Booking state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Bookable dates as a Set for fast lookup
  const bookableDates = useMemo(() => new Set(getBookableDates()), []);

  // Partial capture — sends data to CRM if user leaves without submitting
  const getFields = useCallback(
    () => ({ name, email, phone, company, website }),
    [name, email, phone, company, website]
  );
  const { markSubmitted, markTouched } = usePartialCapture({
    formType: 'partial_abandon',
    getFields,
  });

  const currentStepIndex = STEP_ORDER.indexOf(step);

  const goToStep = useCallback((target: Step) => {
    const targetIndex = STEP_ORDER.indexOf(target);
    const currentIndex = STEP_ORDER.indexOf(step);
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setStep(target);
  }, [step]);

  // Save lead to CRM immediately on contact form submit
  const saveLead = useCallback(async () => {
    const utms = getUtmParams();

    const crmUrl =
      process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
      'https://stray-crm.vercel.app/api/leads/inbound';

    const payload = {
      name: name || undefined,
      email: email || undefined,
      phone: phone || undefined,
      company: company || undefined,
      website: website || undefined,
      form_type: 'contact_request',
      submitted: true,
      ...utms,
    };

    // Fire and forget to CRM + web3forms backup
    await Promise.allSettled([
      fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          name,
          email,
          phone: phone || '',
          business_name: company || '',
          website: website || '',
          from_name: 'straywebdesign.co',
          subject: `New Lead: ${name}`,
        }),
      }),
    ]);

    trackLeadConversion({ form_type: 'contact_request' });
    setLeadSaved(true);
  }, [name, email, phone, company, website]);

  // Step 1: Contact form submit — save lead, then move to date selection
  const handleContactSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    // Only require email or phone — not both
    const hasEmail = email.trim().length > 0;
    const hasPhone = phone.trim().length > 0;
    if (!hasEmail && !hasPhone) {
      setSubmitError('Please provide an email address or phone number so we can reach you.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      markSubmitted();
      await saveLead();
      setDirection(1);
      setStep('date');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [saveLead, email, phone, markSubmitted]);

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setDirection(1);
    setStep('time');
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setDirection(1);
    setStep('confirm');
  }, []);

  const handleConfirmBooking = useCallback(async () => {
    setSubmitting(true);

    const utms = getUtmParams();
    const payload: BookingPayload = {
      date: selectedDate!,
      time: selectedTime!,
      name,
      email,
      phone,
      company,
      website,
      ...utms,
    };

    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Non-blocking — lead is already saved
    }

    setSubmitting(false);
    setDirection(1);
    setStep('confirmed');
  }, [selectedDate, selectedTime, name, email, phone, company, website]);

  // Skip date — go straight to confirmed (lead already saved)
  const handleSkipDate = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setDirection(1);
    setStep('confirmed');
  }, []);

  // Skip time — go to confirmed without a time
  const handleSkipTime = useCallback(async () => {
    setSelectedTime(null);

    // Update CRM with just the date preference
    if (selectedDate) {
      const utms = getUtmParams();
      const payload: BookingPayload = {
        date: selectedDate,
        name,
        email,
        phone,
        company,
        website,
        ...utms,
      };

      try {
        await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Non-blocking
      }
    }

    setDirection(1);
    setStep('confirmed');
  }, [selectedDate, name, email, phone, company, website]);

  const handleBack = useCallback(() => {
    if (step === 'date') {
      goToStep('contact');
    } else if (step === 'time') {
      goToStep('date');
    } else if (step === 'confirm') {
      goToStep('time');
    }
  }, [step, goToStep]);

  return (
    <div className="border border-border-default bg-surface-card p-6 md:p-8">
      {/* Step indicator */}
      {step !== 'confirmed' && step !== 'confirm' && (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            {step !== 'contact' && (
              <button
                type="button"
                onClick={handleBack}
                className="flex h-7 w-7 items-center justify-center text-text-tertiary transition-colors hover:text-text-primary"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Step {currentStepIndex + 1} of 3
                </span>
                <span className="font-mono text-[10px] text-text-placeholder">&bull;</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                  {STEP_LABELS[step]}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-0.5 w-full bg-border-default">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step content with animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {step === 'contact' && (
            <BookingContactForm
              name={name}
              email={email}
              phone={phone}
              company={company}
              website={website}
              onChangeName={setName}
              onChangeEmail={setEmail}
              onChangePhone={setPhone}
              onChangeCompany={setCompany}
              onChangeWebsite={setWebsite}
              onSubmit={handleContactSubmit}
              onFieldTouched={markTouched}
              submitting={submitting}
              error={submitError}
              selectedDate={null}
              selectedTime={null}
            />
          )}

          {step === 'date' && (
            <div>
              <p className="mb-2 font-mono text-sm text-text-secondary">
                Want to schedule a call? Pick a date, or skip and we&apos;ll reach out.
              </p>
              <CalendarPicker
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                bookableDates={bookableDates}
              />
              <button
                type="button"
                onClick={handleSkipDate}
                className="mt-4 w-full border border-border-default py-2.5 font-mono text-sm text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
              >
                Just send me a message first — I'd like to learn more before hopping on a call
              </button>
            </div>
          )}

          {step === 'time' && selectedDate && (
            <TimeSlotPicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={handleTimeSelect}
              onSkipTime={handleSkipTime}
            />
          )}

          {step === 'confirm' && selectedDate && selectedTime && (
            <div>
              <button
                type="button"
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 font-mono text-sm text-text-tertiary transition-colors hover:text-text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Change time
              </button>
              <div className="mb-5 border border-accent/20 bg-accent/5 px-4 py-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Your Appointment
                </p>
                <p className="mt-1 font-mono text-sm text-text-primary">
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at {selectedTime} EST
                </p>
                <p className="mt-1 font-mono text-xs text-text-tertiary">
                  30-minute discovery call
                </p>
              </div>

              <div className="space-y-2 border border-border-default bg-surface-page px-4 py-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Your Info
                </p>
                <p className="font-mono text-sm text-text-primary">{name}</p>
                <p className="font-mono text-sm text-text-secondary">{email}</p>
                {phone && <p className="font-mono text-sm text-text-secondary">{phone}</p>}
                {company && <p className="font-mono text-sm text-text-secondary">{company}</p>}
              </div>

              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin border-2 border-white/30 border-t-white" />
                    Confirming...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          )}

          {step === 'confirmed' && (
            <BookingConfirmation
              date={selectedDate}
              time={selectedTime}
              name={name}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
