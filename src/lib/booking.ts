/** Booking system utilities — shared between client and server */

export const BOOKING_CONFIG = {
  /** Timezone for all slot calculations */
  timezone: 'America/New_York',
  /** Start hour (inclusive, 24h format) */
  startHour: 9,
  /** End hour (exclusive, 24h format) — last slot starts at endHour - slotMinutes */
  endHour: 17,
  /** Slot duration in minutes */
  slotMinutes: 30,
  /**
   * How many days ahead the calendar opens, counting from tomorrow.
   *
   * Five, deliberately. Same-day means they arrive before anything has had a
   * chance to teach them what this is and open the call with "so what do you
   * do?" Far out means they forget and no-show. Brandon Willington runs the
   * same window and pairs it with a line telling people to check back
   * tomorrow, which turns the cap into scarcity that happens to be true.
   *
   * Weekends are filtered on top of this, so a window starting Thursday
   * yields three bookable days, not five. That is intended.
   */
  daysAhead: 5,
  /** Weekend day numbers (0=Sun, 6=Sat) */
  weekendDays: [0, 6] as readonly number[],
} as const;

export interface TimeSlot {
  /** ISO string of the slot start in UTC */
  iso: string;
  /** Display label like "9:00 AM" */
  label: string;
  /** Whether the slot is available */
  available: boolean;
}

export interface BookingPayload {
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  /** false when captured from an abandoned form (user didn't submit) */
  submitted?: boolean;
  form_type?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  click_id?: string;
  ad_platform?: string;
}

/**
 * Format hour/minute to display label like "9:00 AM"
 */
export function formatTimeLabel(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

/**
 * Generate all possible time slots for a given date string (YYYY-MM-DD).
 * Returns slots in EST with labels.
 */
export function generateSlotsForDate(dateStr: string): TimeSlot[] {
  const { startHour, endHour, slotMinutes } = BOOKING_CONFIG;
  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotMinutes) {
      // Skip the last slot if it would end after endHour
      if (hour === endHour - 1 && minute + slotMinutes > 60) continue;

      const label = formatTimeLabel(hour, minute);

      // Build ISO string in EST
      const iso = new Date(
        `${dateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`
      ).toISOString();

      slots.push({ iso, label, available: true });
    }
  }

  return slots;
}

/**
 * Reduce any time we might find in the CRM to a single 24-hour `HH:MM` key.
 *
 * The booking wizard sends the display label ("2:30 PM") as the time, so that
 * is what the column usually holds — but the column is a plain string and
 * anything that POSTs to /api/booking can put a 24-hour value in it instead.
 * When that happened, the slot list compared "2:30 PM" against "14:30", found
 * no match, and showed a taken slot as free. The booker only discovered it at
 * submit, when the CRM refused with a 409.
 *
 * Comparing on a canonical key rather than on the stored string means the slot
 * list is right whichever format wrote the row.
 *
 * Returns null for anything unparseable, which the caller treats as "does not
 * block a slot" — a garbage row should not silently take a slot off the board.
 */
export function toTime24(value: string): string | null {
  const trimmed = value.trim();

  const twelve = /^(\d{1,2}):(\d{2})\s*([AaPp])\.?[Mm]\.?$/.exec(trimmed);
  if (twelve) {
    const [, h, m, meridiem] = twelve;
    let hour = parseInt(h, 10);
    if (hour < 1 || hour > 12) return null;
    const isPm = meridiem.toLowerCase() === 'p';
    if (hour === 12) hour = 0;
    if (isPm) hour += 12;
    return `${hour.toString().padStart(2, '0')}:${m}`;
  }

  const twentyFour = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (twentyFour) {
    const [, h, m] = twentyFour;
    const hour = parseInt(h, 10);
    const minute = parseInt(m, 10);
    if (hour > 23 || minute > 59) return null;
    return `${hour.toString().padStart(2, '0')}:${m}`;
  }

  return null;
}

/**
 * Check if a date string (YYYY-MM-DD) is a weekday within the booking window.
 */
export function isBookableDate(dateStr: string): boolean {
  const date = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = date.getDay();
  return !BOOKING_CONFIG.weekendDays.includes(dayOfWeek);
}

/**
 * Today's date in the booking timezone, as YYYY-MM-DD.
 *
 * `new Date().toISOString()` returns the UTC day, which after 8pm Eastern is
 * already tomorrow. That was harmless while the window was a fortnight wide
 * and is not harmless at five days, where one day is 20% of availability.
 * `en-CA` is used purely because it formats as YYYY-MM-DD.
 */
export function todayInBookingTz(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING_CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** Shift a YYYY-MM-DD string by whole days. Noon UTC dodges DST edges. */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

/**
 * The inclusive bounds of the booking window: tomorrow through today + N.
 *
 * Exported so the calendar, the slots route and the booking route all read the
 * same two dates. Three separate implementations of "is this too far out" is
 * how a client-side cap ends up not matching what the server accepts.
 */
export function bookingWindow(now: Date = new Date()): { first: string; last: string } {
  const today = todayInBookingTz(now);
  return { first: addDays(today, 1), last: addDays(today, BOOKING_CONFIG.daysAhead) };
}

/**
 * Whether a date is inside the window AND a weekday.
 *
 * This is the whole rule. Anything that lets someone pick a date must call it,
 * and so must anything that accepts one.
 */
export function isWithinBookingWindow(dateStr: string, now: Date = new Date()): boolean {
  const { first, last } = bookingWindow(now);
  return dateStr >= first && dateStr <= last && isBookableDate(dateStr);
}

/**
 * Every bookable date in the current window.
 */
export function getBookableDates(now: Date = new Date()): string[] {
  const dates: string[] = [];
  const today = todayInBookingTz(now);

  for (let i = 1; i <= BOOKING_CONFIG.daysAhead; i++) {
    const dateStr = addDays(today, i);
    if (isBookableDate(dateStr)) {
      dates.push(dateStr);
    }
  }

  return dates;
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDateDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
