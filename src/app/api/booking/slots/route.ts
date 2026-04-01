import { NextResponse, type NextRequest } from 'next/server';
import { generateSlotsForDate, isBookableDate, type TimeSlot } from '@/lib/booking';

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

  // Filter out past slots if the date is today
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const slots: TimeSlot[] = allSlots.map((slot) => {
    const slotTime = new Date(slot.iso);
    const isPast = dateStr === todayStr && slotTime <= now;
    const isBooked = bookedTimes.has(slot.label);

    return {
      ...slot,
      available: !isPast && !isBooked,
    };
  });

  return NextResponse.json({ date: dateStr, slots });
}

/**
 * Fetch booked slots from the CRM for a given date.
 * Returns a Set of time labels that are already booked.
 */
async function fetchBookedSlots(dateStr: string): Promise<Set<string>> {
  const crmUrl = process.env.NEXT_PUBLIC_CRM_INBOUND_URL || 'https://stray-crm.vercel.app';
  const baseUrl = crmUrl.replace('/api/leads/inbound', '');

  try {
    const response = await fetch(
      `${baseUrl}/api/bookings?date=${dateStr}`,
      {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      // If CRM doesn't have a bookings endpoint yet, return empty set
      return new Set<string>();
    }

    const data = await response.json();
    const bookedTimes = new Set<string>();

    if (Array.isArray(data.bookings)) {
      for (const booking of data.bookings) {
        if (typeof booking.time === 'string') {
          bookedTimes.add(booking.time);
        }
      }
    }

    return bookedTimes;
  } catch {
    // CRM unavailable — treat all slots as available
    return new Set<string>();
  }
}
