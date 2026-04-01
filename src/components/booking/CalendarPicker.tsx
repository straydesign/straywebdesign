'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOOKING_CONFIG } from '@/lib/booking';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

interface CalendarPickerProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  bookableDates: ReadonlySet<string>;
}

export default function CalendarPicker({
  selectedDate,
  onSelectDate,
  bookableDates,
}: CalendarPickerProps) {
  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  // Build calendar grid for the current view month
  const calendarDays = useMemo(() => {
    const { year, month } = viewMonth;
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{ dateStr: string; day: number; isCurrentMonth: boolean }> = [];

    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr, day: d, isCurrentMonth: false });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr, day: d, isCurrentMonth: true });
    }

    // Next month padding to fill 6 rows
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ dateStr, day: d, isCurrentMonth: false });
    }

    return days;
  }, [viewMonth]);

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Navigation bounds: don't go before current month
  const now = new Date();
  const canGoPrev =
    viewMonth.year > now.getFullYear() ||
    (viewMonth.year === now.getFullYear() && viewMonth.month > now.getMonth());

  // Don't go more than 2 months ahead
  const maxMonth = now.getMonth() + 2;
  const maxYear = now.getFullYear() + (maxMonth > 11 ? 1 : 0);
  const normalizedMaxMonth = maxMonth > 11 ? maxMonth - 12 : maxMonth;
  const canGoNext =
    viewMonth.year < maxYear ||
    (viewMonth.year === maxYear && viewMonth.month < normalizedMaxMonth);

  const goToPrevMonth = () => {
    if (!canGoPrev) return;
    setViewMonth((prev) => {
      const newMonth = prev.month === 0 ? 11 : prev.month - 1;
      const newYear = prev.month === 0 ? prev.year - 1 : prev.year;
      return { year: newYear, month: newMonth };
    });
  };

  const goToNextMonth = () => {
    if (!canGoNext) return;
    setViewMonth((prev) => {
      const newMonth = prev.month === 11 ? 0 : prev.month + 1;
      const newYear = prev.month === 11 ? prev.year + 1 : prev.year;
      return { year: newYear, month: newMonth };
    });
  };

  return (
    <div>
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          className={cn(
            'flex h-8 w-8 items-center justify-center transition-colors',
            canGoPrev
              ? 'text-text-primary hover:bg-surface-sunken'
              : 'cursor-not-allowed text-text-placeholder'
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-mono text-sm font-semibold uppercase tracking-wider text-text-primary">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className={cn(
            'flex h-8 w-8 items-center justify-center transition-colors',
            canGoNext
              ? 'text-text-primary hover:bg-surface-sunken'
              : 'cursor-not-allowed text-text-placeholder'
          )}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-1 text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-text-tertiary"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(({ dateStr, day, isCurrentMonth }) => {
          const isBookable = bookableDates.has(dateStr);
          const isSelected = dateStr === selectedDate;
          const isPast = dateStr <= today;
          const isWeekend = BOOKING_CONFIG.weekendDays.includes(
            new Date(dateStr + 'T12:00:00').getDay()
          );
          const isDisabled = !isCurrentMonth || !isBookable || isPast || isWeekend;

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => {
                if (!isDisabled) onSelectDate(dateStr);
              }}
              disabled={isDisabled}
              className={cn(
                'relative flex h-10 w-full items-center justify-center font-mono text-sm transition-all duration-150',
                !isCurrentMonth && 'text-text-placeholder/40',
                isCurrentMonth && isDisabled && 'cursor-not-allowed text-text-placeholder',
                isCurrentMonth && !isDisabled && 'cursor-pointer text-text-primary hover:bg-accent/10',
                isSelected && 'bg-accent text-white hover:bg-accent',
                dateStr === today && !isSelected && isCurrentMonth && 'ring-1 ring-inset ring-accent/30'
              )}
              aria-label={`${isBookable ? 'Available' : 'Unavailable'}: ${dateStr}`}
              aria-selected={isSelected}
            >
              {day}
              {isBookable && !isPast && isCurrentMonth && !isSelected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
        Available Mon-Fri &bull; Eastern Time
      </p>
    </div>
  );
}
