import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import { SERVICE_CARDS } from '@/data/services';

/* Services — squares with plain prices. The $500 build + $20/mo hosting
   package leads as the featured card; a price badge only appears where Tom
   has set one. */

export default function Services() {
  return (
    <section
      id="services"
      className="border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Services"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimateIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="text-accent/60">{'// '}</span>
            services
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            What I do, and what it costs.
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
            Plain numbers where I have them. Where the price depends on the
            site, we talk first. Every card is something I&apos;ve already done
            for the work above.
          </p>
        </AnimateIn>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {SERVICE_CARDS.map((s, i) => (
            <AnimateIn
              key={s.title}
              delay={i * 0.06}
              className={s.featured ? 'md:col-span-2' : undefined}
            >
              <div
                className={`h-full rounded-lg border p-7 md:p-8 ${
                  s.featured
                    ? 'border-accent bg-accent/5'
                    : 'border-border-default bg-surface-card'
                }`}
              >
                {(s.price || s.priceNote) && (
                  <p className="flex flex-wrap items-baseline gap-2">
                    {s.price && (
                      <span className="rounded-full bg-accent px-3 py-1 font-mono text-[13px] font-semibold text-white">
                        {s.price}
                      </span>
                    )}
                    {s.priceNote && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
                        {s.priceNote}
                      </span>
                    )}
                  </p>
                )}
                <h3
                  className={`mt-4 font-display font-semibold tracking-tight text-text-primary ${
                    s.featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                  }`}
                >
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-2xl font-body text-[15px] leading-relaxed text-text-secondary">
                  {s.description}
                </p>
                {s.cta && (
                  <Link
                    href={s.cta.href}
                    className="group mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-text-primary underline-offset-4 hover:underline"
                  >
                    {s.cta.label}
                    <span
                      aria-hidden
                      className="text-accent transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
