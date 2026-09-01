'use client';

import { useCallback, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import { PHONE_SMS, PHONE_TEL, SITE } from '@/lib/constants';
import { getUtmParams } from '@/hooks/useUtmParams';

/**
 * Survey — five questions, contact details on the last one.
 *
 * The ordering is the whole mechanic. Contact fields at the front ask a
 * stranger to commit before they have decided anything; at the back they are
 * the last small step of something already started. One of Brandon
 * Willington's members quadrupled his conversion rate by moving them, and that
 * was the only variable he changed.
 *
 * Two other things are doing real work in here and are easy to break:
 *
 *  - The first answer contains one disqualifier. Picking it routes straight to
 *    /not-a-fit BEFORE any contact details are asked for, so a bad fit costs
 *    nobody a lead record and — the part that matters — never fires the
 *    conversion pixel. An ad account that learns a bad lead was a win goes and
 *    finds more of them.
 *  - Question four is a red-flag test wearing a logistics question's clothes.
 *    It is recorded and never blocks anyone. It exists so the answer is on the
 *    record before the call, not so it can turn people away.
 *
 * Nothing in the copy closes the loop. No "congratulations", no "well done",
 * no "thank you" — anything that reads as completion is a place to stop.
 */

const DISQUALIFIED = 'not-a-business';

type Choice = { value: string; label: string; disqualifies?: boolean };

type Step = {
  id: 'sell' | 'size' | 'current' | 'gather' | 'contact';
  question: string;
  help?: string;
  choices?: Choice[];
};

const STEPS: Step[] = [
  {
    id: 'sell',
    question: 'What do you sell?',
    choices: [
      { value: 'food', label: 'Food and drink' },
      { value: 'products', label: 'Products people come in and buy' },
      { value: 'services', label: 'Services, booked or quoted' },
      {
        value: DISQUALIFIED,
        label: "It's not a business — personal or a hobby",
        disqualifies: true,
      },
    ],
  },
  {
    id: 'size',
    question: 'Roughly how many different things are on the list?',
    help: 'A guess is fine. Menu items, products, services, shows — whatever the list is made of.',
    choices: [
      { value: 'under-25', label: 'Under 25' },
      { value: '25-150', label: '25 to 150' },
      { value: '150-600', label: '150 to 600' },
      { value: 'over-600', label: 'More than 600' },
    ],
  },
  {
    id: 'current',
    question: "What's online right now?",
    choices: [
      { value: 'nothing', label: 'Nothing' },
      { value: 'social-only', label: 'A Facebook or Instagram page, and that’s it' },
      { value: 'old-site', label: 'A site somebody built years ago' },
      { value: 'paid-site', label: 'A site I pay for now' },
    ],
  },
  {
    id: 'gather',
    question:
      'A build needs a few things from you — photos, your list, a couple of answers. How does that usually go?',
    choices: [
      { value: 'ready-fast', label: "I'd have that together in a day or two" },
      { value: 'ready-week', label: "I'd need a week or so to pull it together" },
      { value: 'come-get-it', label: "I'd rather you came and got it yourself" },
      { value: 'stalls', label: "Honestly, that's the part that usually stalls things" },
    ],
  },
  {
    id: 'contact',
    question: 'Where do I send it?',
    help: 'A real reply from me, usually the same day. No list, no autoresponder.',
  },
];

const CRM_URL =
  process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
  'https://stray-crm.vercel.app/api/leads/inbound';

function labelFor(stepId: Step['id'], value: string) {
  const step = STEPS.find((s) => s.id === stepId);
  return step?.choices?.find((c) => c.value === value)?.label ?? value;
}

export default function Survey() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState('');
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = STEPS[index];
  const isLast = index === STEPS.length - 1;
  const progress = useMemo(
    () => Math.round(((index + 1) / STEPS.length) * 100),
    [index]
  );

  const choose = useCallback(
    (choice: Choice) => {
      /* The disqualifier lands here, before a single contact field has been
         asked for. Nothing is sent and nothing is tracked. */
      if (choice.disqualifies) {
        router.push('/not-a-fit');
        return;
      }
      setAnswers((prev) => ({ ...prev, [step.id]: choice.value }));
      setError(null);
      setIndex((i) => Math.min(i + 1, STEPS.length - 1));
    },
    [router, step.id]
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!name.trim()) {
        setError('A first name is enough.');
        return;
      }
      if (!email.trim()) {
        setError('I need an email to send it to.');
        return;
      }
      setSubmitting(true);
      setError(null);

      const transcript = STEPS.filter((s) => s.choices)
        .map((s) => `${s.question}\n  ${labelFor(s.id, answers[s.id] ?? '—')}`)
        .join('\n\n');

      const payload = {
        name,
        email,
        phone: phone || undefined,
        company: business || undefined,
        website: website || undefined,
        message: `${transcript}\n\nCurrent site: ${website || 'none given'}`,
        form_type: 'catalog_survey',
        submitted: true,
        ...answers,
        ...getUtmParams(),
      };

      /* Both destinations are best-effort. A dead web3forms key must not cost
         Tom the lead, and a dead CRM must not cost him the email. */
      await Promise.allSettled([
        fetch(CRM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: SITE.web3formsKey,
            name,
            email,
            phone: phone || '',
            message: `${business ? `${business}\n` : ''}${payload.message}`,
            subject: `Catalog survey: ${business || name}`,
            from_name: 'straywebdesign.co — catalog survey',
          }),
        }),
      ]);

      /* The pixel fires on /thank-you, not here. One place, one event. */
      router.push('/thank-you');
    },
    [answers, business, email, name, phone, router, website]
  );

  return (
    <section
      id="start"
      className="scroll-mt-16 bg-surface-dark py-20 md:py-28"
      aria-label="Start"
    >
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <AnimateIn>
          {/* Phrased as beginning something. "Get in touch" is the version of
              this line that does not work. */}
          <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-ink-dark-primary">
            Answer five questions and I&apos;ll come back with what your
            catalog would look like.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-dark-secondary">
            Takes about a minute. The last one asks where to send it.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] p-6 md:mt-12 md:p-8">
            <div className="flex items-center justify-between font-mono text-[11px] text-ink-dark-tertiary">
              <span>
                {isLast ? 'Last step' : `Question ${index + 1} of ${STEPS.length}`}
              </span>
              <span>{progress}%</span>
            </div>
            <div
              className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="How far through"
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h3 className="mt-7 font-display text-lg font-semibold leading-snug tracking-tight text-ink-dark-primary md:text-xl">
              {step.question}
            </h3>
            {step.help && (
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-dark-secondary">
                {step.help}
              </p>
            )}

            {step.choices ? (
              <ul className="mt-6 flex flex-col gap-2.5">
                {step.choices.map((choice) => (
                  <li key={choice.value}>
                    <button
                      type="button"
                      onClick={() => choose(choice)}
                      className="flex w-full items-center justify-between gap-4 rounded-lg border border-white/12 bg-white/[0.03] px-5 py-4 text-left font-body text-[15px] text-ink-dark-primary transition-colors hover:border-accent hover:bg-white/[0.07]"
                    >
                      {choice.label}
                      <span aria-hidden className="text-ink-dark-tertiary">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  autoComplete="given-name"
                  aria-label="Your name"
                  className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 font-body text-[15px] text-ink-dark-primary placeholder-ink-dark-tertiary transition-colors focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Business name"
                  autoComplete="organization"
                  aria-label="Business name"
                  className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 font-body text-[15px] text-ink-dark-primary placeholder-ink-dark-tertiary transition-colors focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@business.com"
                  autoComplete="email"
                  aria-label="Email"
                  className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 font-body text-[15px] text-ink-dark-primary placeholder-ink-dark-tertiary transition-colors focus:border-accent focus:outline-none"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone, if you'd rather I called"
                  autoComplete="tel"
                  aria-label="Phone number, optional"
                  className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 font-body text-[15px] text-ink-dark-primary placeholder-ink-dark-tertiary transition-colors focus:border-accent focus:outline-none"
                />
                {/* Brandon's note: a typing field after a run of multiple choice
                    always costs you some people. It stays because the address
                    tells me what they do before the call. */}
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Your website or Facebook page, if you have one"
                  aria-label="Your website, optional"
                  className="w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3.5 font-body text-[15px] text-ink-dark-primary placeholder-ink-dark-tertiary transition-colors focus:border-accent focus:outline-none"
                />

                {error && (
                  <p role="alert" className="font-body text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 font-display text-base font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Send it over
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </button>

                <p className="font-body text-xs leading-relaxed text-ink-dark-tertiary">
                  Your details stay with me. What happens to them is written out
                  in the{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-ink-dark-secondary"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                className="mt-5 font-body text-sm text-ink-dark-tertiary underline underline-offset-4 transition-colors hover:text-ink-dark-secondary"
              >
                Back
              </button>
            )}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.14}>
          <p className="mt-6 text-center font-body text-sm text-ink-dark-secondary">
            Would rather just talk?{' '}
            <a
              href={PHONE_TEL}
              className="font-semibold text-ink-dark-primary underline underline-offset-4 hover:text-accent"
            >
              {SITE.phone}
            </a>
            {' · '}
            <a
              href={PHONE_SMS}
              className="underline underline-offset-4 hover:text-ink-dark-primary"
            >
              text it
            </a>
            {' · '}
            <Link
              href="/book"
              className="underline underline-offset-4 hover:text-ink-dark-primary"
            >
              pick a time
            </Link>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
