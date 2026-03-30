'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ServiceError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Service page error:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh]">
        <section className="relative overflow-hidden bg-surface-page pt-28 pb-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Something went wrong
            </p>
            <h1 className="mt-4 font-mono text-3xl font-bold text-text-primary md:text-4xl">
              Couldn&apos;t load this service
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-text-tertiary">
              We ran into an error loading this page. Try refreshing, or head
              back to browse all services.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center bg-accent px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent/90"
              >
                Try again
              </button>
              <a
                href="/services"
                className="inline-flex items-center justify-center border-2 border-border-strong px-7 py-3.5 text-base font-semibold text-text-tertiary transition-all hover:border-white hover:text-white"
              >
                All services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
