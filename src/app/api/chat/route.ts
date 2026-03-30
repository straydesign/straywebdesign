import { NextResponse, type NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/chat-context';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

/* Track IPs that already had a lead captured to avoid duplicate submissions */
const capturedLeads = new Map<string, number>();

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

/* ── Lead extraction ──────────────────────────────────────── */

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

interface ExtractedLead {
  email?: string;
  phone?: string;
  transcript: string;
}

function extractLead(messages: Array<{ role: string; content: string }>): ExtractedLead | null {
  const userMessages = messages.filter((m) => m.role === 'user');
  const allUserText = userMessages.map((m) => m.content).join(' ');

  const email = allUserText.match(EMAIL_RE)?.[0];
  const phone = allUserText.match(PHONE_RE)?.[0];

  if (!email && !phone) return null;

  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Tom'}: ${m.content}`)
    .join('\n');

  return { email, phone, transcript };
}

async function submitLead(lead: ExtractedLead, ip: string): Promise<void> {
  const WEB3FORMS_KEY = 'c2441e47-8ca0-4f87-a2dc-928015553d51';

  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        from_name: 'straywebdesign.co — Chat Lead',
        subject: `Chat Lead: ${lead.email || lead.phone || 'Unknown'}`,
        email: lead.email || 'no-email@chat-lead.straywebdesign.co',
        phone: lead.phone || '',
        source: 'Chat Widget',
        ip_address: ip,
        message: `A visitor shared contact info during a chat conversation.\n\nEmail: ${lead.email || 'Not provided'}\nPhone: ${lead.phone || 'Not provided'}\n\n--- Conversation Transcript ---\n\n${lead.transcript}`,
      }),
    });
  } catch {
    // Fire and forget — don't block the chat response
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

  // Extract and submit lead info (fire and forget, non-blocking)
  const now = Date.now();
  const lastCapture = capturedLeads.get(ip);
  const shouldCapture = !lastCapture || now - lastCapture > 30 * 60 * 1000; // 30min cooldown

  if (shouldCapture) {
    const lead = extractLead(sanitizedMessages);
    if (lead) {
      capturedLeads.set(ip, now);
      submitLead(lead, ip);
    }
  }

  const client = new Anthropic({ apiKey });

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: buildSystemPrompt(),
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
