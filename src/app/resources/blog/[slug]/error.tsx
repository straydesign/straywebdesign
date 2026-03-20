'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogPostError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Blog post error:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-electric">
            Something went wrong
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy md:text-4xl">
            Couldn&apos;t load this article
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            We ran into an error loading this post. Try refreshing, or head
            back to browse all resources.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-lg bg-electric px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-electric/25 transition-all hover:bg-electric/90 hover:shadow-xl hover:shadow-electric/30"
            >
              Try again
            </button>
            <a
              href="/resources"
              className="inline-flex items-center justify-center rounded-lg border-2 border-navy px-7 py-3.5 text-base font-semibold text-navy transition-all hover:bg-navy hover:text-white"
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
