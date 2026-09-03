import { NextResponse, type NextRequest } from 'next/server';
import { isWithinBookingWindow, type BookingPayload } from '@/lib/booking';

/**
 * POST /api/booking
 *
 * Hands the booking to the CRM, which stores the slot and sends both the
 * confirmation and Tom's copy.
 *
 * There used to be a parallel web3forms call here as an email backup. It never
 * worked: web3forms rejects server-side requests on the free plan with a 403,
 * and because this handler only failed when *both* arms failed, the CRM arm
 * masked it. No booking email reached Tom between April and August. Don't add
 * it back — if it's ever wanted again it has to be called from the browser.
 */
export async function POST(request: NextRequest) {
  const body: BookingPayload | null = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Validate: need at least email or phone to reach them
  const { date, time, name, email } = body;

  const hasEmail = email && email.trim().length > 0;
  const hasPhone = body.phone && body.phone.trim().length > 0;

  if (!hasEmail && !hasPhone) {
    return NextResponse.json(
      { error: 'Please provide an email address or phone number' },
      { status: 400 }
    );
  }

  // Validate email format only if one was provided
  if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
  }

  /* Only gate an actual slot booking. A contact request carries a date with no
     time and is just "roughly when suits" — it must not be range-checked, or
     someone asking about next month gets rejected for asking. */
  if (time && date && !isWithinBookingWindow(date)) {
    return NextResponse.json(
      { error: 'That date is outside the booking window. Pick a time in the next few days.' },
      { status: 400 }
    );
  }

  // Build CRM payload
  const crmPayload = {
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    company: body.company || '',
    website: body.website || '',
    form_type: time ? 'booking' : 'contact_request',
    booking_date: date,
    booking_time: time || null,
    message: time
      ? `Booked a call for ${time} on ${date}`
      : 'Requested contact — no time selected. Text them to schedule.',
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
    utm_content: body.utm_content,
    utm_term: body.utm_term,
    referrer: body.referrer,
    landing_page: body.landing_page,
    click_id: body.click_id,
    ad_platform: body.ad_platform,
  };

  const crmUrl =
    process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
    'https://stray-crm.vercel.app/api/leads/inbound';

  let crmRes: Response;

  try {
    crmRes = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crmPayload),
    });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the booking system. Try again, or call 814-964-0081." },
      { status: 502 }
    );
  }

  // Someone took the slot between this page loading and this request landing.
  if (crmRes.status === 409) {
    return NextResponse.json(
      {
        error: 'That time was just booked by someone else. Pick another one.',
        code: 'slot_taken',
      },
      { status: 409 }
    );
  }

  if (!crmRes.ok) {
    return NextResponse.json(
      { error: "Couldn't save the booking. Try again, or call 814-964-0081." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    booking: {
      date,
      time,
      name: body.name,
      email: body.email,
    },
  });
}
