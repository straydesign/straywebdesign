import { NextResponse, type NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/chat-context';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

/* Track which conversations already had a transcript sent */
const sentTranscripts = new Map<string, { messageCount: number; lastSent: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

/* ── Lead & transcript extraction ─────────────────────────── */

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

function formatTranscript(messages: Array<{ role: string; content: string }>): string {
  return messages
    .map((m) => `${m.role === 'user' ? 'VISITOR' : 'ASSISTANT'}: ${m.content}`)
    .join('\n\n');
}

function extractContactInfo(messages: Array<{ role: string; content: string }>): { email?: string; phone?: string } {
  const allUserText = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join(' ');

  return {
    email: allUserText.match(EMAIL_RE)?.[0],
    phone: allUserText.match(PHONE_RE)?.[0],
  };
}

async function sendTranscript(
  messages: Array<{ role: string; content: string }>,
  ip: string,
  hasContactInfo: boolean,
): Promise<void> {
  const WEB3FORMS_KEY = 'c2441e47-8ca0-4f87-a2dc-928015553d51';
  const { email, phone } = extractContactInfo(messages);
  const transcript = formatTranscript(messages);
  const userMsgCount = messages.filter((m) => m.role === 'user').length;

  const subjectPrefix = hasContactInfo ? 'LEAD' : 'Chat';
  const subject = `${subjectPrefix}: ${email || phone || `Anonymous (${userMsgCount} msgs)`}`;

  const sends: Promise<unknown>[] = [
    // web3forms backup
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        from_name: 'straywebdesign.co — Chat Transcript',
        subject,
        email: email || 'chat-transcript@straywebdesign.co',
        phone: phone || '',
        source: 'Chat Widget',
        ip_address: ip,
        has_contact_info: hasContactInfo ? 'Yes' : 'No',
        visitor_messages: String(userMsgCount),
        message: `${hasContactInfo ? `CONTACT INFO DETECTED\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\n\n` : ''}--- Full Transcript (${messages.length} messages) ---\n\n${transcript}`,
      }),
    }),
    // Send transcript to Stray CRM chat logs
    fetch('https://stray-crm.vercel.app/api/chat/transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor_ip: ip,
        messages,
        has_contact_info: hasContactInfo,
        extracted_email: email || undefined,
        extracted_phone: phone || undefined,
      }),
    }),
  ];

  // Send lead to Stray CRM if contact info detected
  if (hasContactInfo) {
    sends.push(
      fetch(process.env.NEXT_PUBLIC_CRM_INBOUND_URL || 'https://stray-crm.vercel.app/api/leads/inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || undefined,
          phone: phone || undefined,
          form_type: 'chat',
          message: `Chat transcript (${userMsgCount} messages):\n${transcript.slice(0, 500)}`,
        }),
      }),
    );
  }

  try {
    await Promise.allSettled(sends);
  } catch {
    // Fire and forget
  }
}

/* ── Main handler ─────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Chat is not configured' },
      { status: 503 }
    );
  }

  const ip = request.headers.get('x-client-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body?.messages || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }

  // Sanitize messages — only allow role/content, limit history
  const sanitizedMessages = body.messages
    .slice(-20)
    .map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'assistant' as const : 'user' as const,
      content: String(msg.content).slice(0, 2000),
    }));

  // Send transcript when conversation reaches meaningful length
  // Send at 3 user messages, then again every 3 additional messages
  const userMsgCount = sanitizedMessages.filter((m: { role: string }) => m.role === 'user').length;
  const prev = sentTranscripts.get(ip);
  const prevCount = prev?.messageCount ?? 0;
  const { email, phone } = extractContactInfo(sanitizedMessages);
  const hasContactInfo = Boolean(email || phone);

  const shouldSend =
    (userMsgCount >= 3 && !prev) ||                          // First send at 3 messages
    (userMsgCount >= prevCount + 3) ||                       // Every 3 additional messages
    (hasContactInfo && (!prev || !prev.lastSent));           // Immediately on contact info

  if (shouldSend) {
    sentTranscripts.set(ip, { messageCount: userMsgCount, lastSent: Date.now() });
    sendTranscript(sanitizedMessages, ip, hasContactInfo);
  }

  // Build system prompt, optionally enriched with partial form data
  let systemPrompt = buildSystemPrompt();

  if (body.partial_form && typeof body.partial_form === 'object') {
    const pf = body.partial_form as Record<string, string>;
    const parts: string[] = [];
    if (pf.name) parts.push(`Name: ${String(pf.name).slice(0, 100)}`);
    if (pf.email) parts.push(`Email: ${String(pf.email).slice(0, 100)}`);
    if (pf.phone) parts.push(`Phone: ${String(pf.phone).slice(0, 50)}`);
    if (pf.company) parts.push(`Business: ${String(pf.company).slice(0, 100)}`);
    if (pf.website) parts.push(`Website: ${String(pf.website).slice(0, 200)}`);

    if (parts.length > 0) {
      systemPrompt += `\n\nVISITOR CONTEXT — This visitor started filling out a form but didn't submit. Here's what they entered:\n${parts.join('\n')}\n\nUse this info naturally — greet them by name if available, reference their business/website if relevant. Do NOT say "I see you didn't finish the form" or anything that feels surveillance-like. Just be helpful and personalized.`;
    }
  }

  const client = new Anthropic({ apiKey });

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: systemPrompt,
    messages: sanitizedMessages,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
          );
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
