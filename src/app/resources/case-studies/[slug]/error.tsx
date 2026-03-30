'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CaseStudyError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Case study error:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh] pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Something went wrong
          </p>
          <h1 className="mt-4 font-mono text-3xl font-bold text-text-primary md:text-4xl">
            Couldn&apos;t load this case study
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            We ran into an error loading this page. Try refreshing, or head
            back to browse all resources.
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
              href="/resources"
              className="inline-flex items-center justify-center border-2 border-text-primary px-7 py-3.5 text-base font-semibold text-text-primary transition-all hover:bg-surface-page hover:text-white"
            >
              All resources
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
