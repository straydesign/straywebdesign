import { NextResponse, type NextRequest } from 'next/server';
import {
  generateSlotsForDate,
  isBookableDate,
  toTime24,
  type TimeSlot,
} from '@/lib/booking';

/**
 * GET /api/booking/slots?date=2026-04-01
 * Returns available 30-minute slots for a given date.
 */
export async function GET(request: NextRequest) {
  const dateStr = request.nextUrl.searchParams.get('date');

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json(
      { error: 'Valid date parameter required (YYYY-MM-DD)' },
      { status: 400 }
    );
  }

  if (!isBookableDate(dateStr)) {
    return NextResponse.json(
      { error: 'Selected date is not available for booking' },
      { status: 400 }
    );
  }

  // Generate all possible slots
  const allSlots = generateSlotsForDate(dateStr);

  // Fetch existing bookings from CRM to exclude booked slots
  const bookedTimes = await fetchBookedSlots(dateStr);

  // Null means the lookup failed. Showing every slot as free in that case is
  // how this page double-booked silently for four months — say so instead.
  if (bookedTimes === null) {
    return NextResponse.json(
      { error: "Couldn't load available times. Try again in a moment." },
      { status: 503 }
    );
  }

  // Filter out past slots if the date is today
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const slots: TimeSlot[] = allSlots.map((slot) => {
    const slotTime = new Date(slot.iso);
    const isPast = dateStr === todayStr && slotTime <= now;
    const isBooked = bookedTimes.has(toTime24(slot.label) ?? slot.label);

    return {
      ...slot,
      available: !isPast && !isBooked,
    };
  });

  return NextResponse.json({ date: dateStr, slots });
}

/**
 * Fetch booked slots from the CRM for a given date.
 *
 * Returns a Set of taken time labels, or `null` if the CRM couldn't be reached.
 * The distinction matters: this function used to return an empty Set on every
 * failure, which reads as "nothing is booked". The CRM had no /api/bookings
 * route at all, so it redirected to /login, the catch fired every time, and
 * every slot showed as available from April to August.
 */
async function fetchBookedSlots(dateStr: string): Promise<Set<string> | null> {
  const crmUrl = process.env.NEXT_PUBLIC_CRM_INBOUND_URL || 'https://stray-crm.vercel.app';
  const baseUrl = crmUrl.replace('/api/leads/inbound', '');

  try {
    // Not cached. A 30s revalidate window used to sit here, which meant a slot
    // taken seconds ago still rendered as free and the booker only found out
    // when the submit came back 409. At a handful of bookings a month the cache
    // saved nothing worth that.
    const response = await fetch(`${baseUrl}/api/bookings?date=${dateStr}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data.bookings)) return null;

    // Keyed on the canonical 24-hour form, not on whatever string happens to
    // be in the column. See toTime24 in lib/booking for why.
    const bookedTimes = new Set<string>();
    for (const booking of data.bookings) {
      if (typeof booking.time !== 'string') continue;
      const key = toTime24(booking.time);
      if (key) bookedTimes.add(key);
    }

    return bookedTimes;
  } catch {
    return null;
  }
}
