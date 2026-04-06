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
import { SITE } from '@/lib/constants';

type Step = 'contact' | 'date' | 'time' | 'confirmed';

const STEP_LABELS: Record<Step, string> = {
  contact: 'Your Info',
  date: 'Pick a Date',
  time: 'Pick a Time',
  confirmed: 'Confirmed',
};

const STEP_ORDER: Step[] = ['contact', 'date', 'time', 'confirmed'];

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
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      website: website || undefined,
      form_type: 'contact_request',
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

    setLeadSaved(true);
  }, [name, email, phone, company, website]);

  // Step 1: Contact form submit — save lead, then move to date selection
  const handleContactSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      await saveLead();
      setDirection(1);
      setStep('date');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [saveLead]);

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setDirection(1);
    setStep('time');
  }, []);

  const handleTimeSelect = useCallback(async (time: string) => {
    setSelectedTime(time);

    // Update CRM with the booking details
    const utms = getUtmParams();
    const payload: BookingPayload = {
      date: selectedDate!,
      time,
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

    setDirection(1);
    setStep('confirmed');
  }, [selectedDate, name, email, phone, company, website]);

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
    }
  }, [step, goToStep]);

  return (
    <div className="border border-border-default bg-surface-card p-6 md:p-8">
      {/* Step indicator */}
      {step !== 'confirmed' && (
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
