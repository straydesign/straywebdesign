'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDateDisplay, type TimeSlot } from '@/lib/booking';

interface TimeSlotPickerProps {
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onSkipTime: () => void;
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelectTime,
  onSkipTime,
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSlots() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/booking/slots?date=${selectedDate}`);
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || 'Failed to load available times');
        }

        const data = await response.json();
        if (!cancelled) {
          setSlots(data.slots);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load times');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchSlots();

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  const availableSlots = slots.filter((s) => s.available);
  const morningSlots = availableSlots.filter((s) => {
    const hour = parseInt(s.label.split(':')[0]);
    const isPM = s.label.includes('PM');
    return !isPM || hour === 12;
  });
  const afternoonSlots = availableSlots.filter((s) => {
    const hour = parseInt(s.label.split(':')[0]);
    const isPM = s.label.includes('PM');
    return isPM && hour !== 12;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
        <p className="mt-3 font-mono text-sm text-text-tertiary">Loading available times...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="font-mono text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="font-mono text-sm text-text-secondary">
          No available times for this date.
        </p>
        <p className="mt-1 font-mono text-xs text-text-tertiary">
          Try selecting a different day.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 font-mono text-sm text-text-secondary">
        {formatDateDisplay(selectedDate)}
      </p>

      {morningSlots.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
            Morning
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {morningSlots.map((slot) => (
              <SlotButton
                key={slot.label}
                slot={slot}
                isSelected={slot.label === selectedTime}
                onSelect={onSelectTime}
              />
            ))}
          </div>
        </div>
      )}

      {afternoonSlots.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
            Afternoon
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {afternoonSlots.map((slot) => (
              <SlotButton
                key={slot.label}
                slot={slot}
                isSelected={slot.label === selectedTime}
                onSelect={onSelectTime}
              />
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
        30-minute discovery call &bull; Eastern Time
      </p>

      <button
        type="button"
        onClick={onSkipTime}
        className="mt-4 w-full border border-border-default py-2.5 font-mono text-sm text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
      >
        None of these work — just contact me
      </button>
    </div>
  );
}

function SlotButton({
  slot,
  isSelected,
  onSelect,
}: {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (time: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(slot.label)}
      className={cn(
        'border px-3 py-2.5 font-mono text-sm transition-all duration-150',
        isSelected
          ? 'border-accent bg-accent text-white'
          : 'border-border-strong bg-surface-page text-text-primary hover:border-accent hover:bg-accent/5'
      )}
    >
      {slot.label}
    </button>
  );
}
