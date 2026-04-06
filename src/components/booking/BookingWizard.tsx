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

type Step = 'date' | 'time' | 'contact' | 'confirmed';

const STEP_LABELS: Record<Step, string> = {
  date: 'Select Date',
  time: 'Select Time',
  contact: 'Your Info',
  confirmed: 'Confirmed',
};

const STEP_ORDER: Step[] = ['date', 'time', 'contact', 'confirmed'];

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
  const [step, setStep] = useState<Step>('date');
  const [direction, setDirection] = useState(1);

  // Booking state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Bookable dates as a Set for fast lookup
  const bookableDates = useMemo(() => new Set(getBookableDates()), []);

  const currentStepIndex = STEP_ORDER.indexOf(step);

  const goToStep = useCallback((target: Step) => {
    const targetIndex = STEP_ORDER.indexOf(target);
    const currentIndex = STEP_ORDER.indexOf(step);
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setStep(target);
  }, [step]);

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    setDirection(1);
    setStep('time');
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setDirection(1);
    setStep('contact');
  }, []);

  const handleSkipTime = useCallback(() => {
    setSelectedTime(null);
    setDirection(1);
    setStep('contact');
  }, []);

  const handleBack = useCallback(() => {
    if (step === 'time') {
      goToStep('date');
    } else if (step === 'contact') {
      goToStep('time');
    }
  }, [step, goToStep]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedDate) return;

    setSubmitting(true);
    setSubmitError(null);

    const utms = getUtmParams();

    const payload: BookingPayload = {
      date: selectedDate,
      time: selectedTime || undefined,
      name,
      email,
      phone,
      company,
      website,
      ...utms,
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Failed to book. Please try again.');
      }

      setDirection(1);
      setStep('confirmed');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }, [selectedDate, selectedTime, name, email, phone, company, website]);

  return (
    <div className="border border-border-default bg-surface-card p-6 md:p-8">
      {/* Step indicator */}
      {step !== 'confirmed' && (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            {step !== 'date' && (
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
          {step === 'date' && (
            <CalendarPicker
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              bookableDates={bookableDates}
            />
          )}

          {step === 'time' && selectedDate && (
            <TimeSlotPicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={handleTimeSelect}
              onSkipTime={handleSkipTime}
            />
          )}

          {step === 'contact' && selectedDate && (
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
              onSubmit={handleSubmit}
              submitting={submitting}
              error={submitError}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}

          {step === 'confirmed' && selectedDate && (
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
