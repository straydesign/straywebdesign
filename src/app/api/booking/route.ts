import { NextResponse, type NextRequest } from 'next/server';
import { isBookableDate, type BookingPayload } from '@/lib/booking';
import { SITE } from '@/lib/constants';

/**
 * POST /api/booking
 * Creates a booking: sends to CRM + web3forms backup.
 */
export async function POST(request: NextRequest) {
  const body: BookingPayload | null = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Validate required fields
  const { date, time, name, email } = body;

  if (!date || !name || !email) {
    return NextResponse.json(
      { error: 'Missing required fields: date, name, email' },
      { status: 400 }
    );
  }

  // If no time selected, phone is required so we can text them
  if (!time && !body.phone) {
    return NextResponse.json(
      { error: 'Phone number is required when no time is selected' },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
  }

  // Only validate bookable date if a time was selected (specific booking)
  if (time && !isBookableDate(date)) {
    return NextResponse.json({ error: 'Selected date is not available' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
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

  // Build web3forms payload
  const web3Payload = {
    access_key: SITE.web3formsKey,
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    business_name: body.company || '',
    website: body.website || '',
    booking_date: date,
    booking_time: time || 'Not selected — needs follow-up',
    from_name: 'straywebdesign.co',
    subject: time
      ? `New Booking: ${body.name} — ${time} on ${date}`
      : `Contact Request: ${body.name} — needs scheduling`,
  };

  const crmUrl =
    process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
    'https://stray-crm.vercel.app/api/leads/inbound';

  // Send to both CRM and web3forms in parallel
  const [crmRes, web3Res] = await Promise.allSettled([
    fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crmPayload),
    }),
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(web3Payload),
    }),
  ]);

  const crmOk = crmRes.status === 'fulfilled' && crmRes.value.ok;
  const web3Ok = web3Res.status === 'fulfilled' && web3Res.value.ok;

  if (!crmOk && !web3Ok) {
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again.' },
      { status: 500 }
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
