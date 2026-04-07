import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';

const CLIENTS = [
  {
    name: "Andy's Ale House & Grill",
    logo: '/images/clients/andys-logo.png',
    url: 'https://andys-mu.vercel.app',
    width: 160,
    height: 80,
  },
  {
    name: 'Bullfrog Bar',
    logo: '/images/clients/bullfrog-logo.png',
    url: 'https://bullfrog-gilt.vercel.app',
    width: 200,
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
                  className="h-16 w-auto object-contain opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-20"
                />
              </a>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
