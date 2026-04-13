import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';

const CLIENTS = [
  {
    name: "Andy's Pub",
    logo: '/images/clients/andys-logo.svg',
    url: 'https://andyspub.com',
    width: 220,
    height: 130,
  },
  {
    name: 'Bullfrog Bar',
    logo: '/images/clients/bullfrog-logo.svg',
    url: 'https://bullfrogbarerie.com',
    width: 792,
    height: 612,
  },
  {
    name: 'TechxRev',
    logo: '/images/clients/techxrev-logo.svg',
    url: 'https://techxrev.com',
    width: 360,
    height: 80,
  },
] as const;

export default function ClientLogos() {
  return (
    <section className="border-y border-border-default bg-surface-page py-12 md:py-16" aria-label="Our clients">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <AnimateIn className="text-center">
          <p className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            Trusted By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {CLIENTS.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300"
                aria-label={`Visit ${client.name}`}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className={`h-16 w-auto object-contain transition-all duration-300 md:h-20 ${
                    client.name === "Andy's Pub"
                      ? 'opacity-60 brightness-0 transition-all duration-300 group-hover:brightness-100 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(213,0,22,0.4)]'
                      : 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                  }`}
                />
              </a>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
