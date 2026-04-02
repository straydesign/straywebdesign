import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You — Stray Web Design',
  description: 'Your request has been received. We will be in touch shortly.',
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-surface-page px-5 text-text-primary">
      <div className="max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-accent" />
        <h1 className="mt-6 font-mono text-2xl font-bold md:text-3xl">
          You&apos;re all set
        </h1>
        <p className="mt-4 font-mono text-text-secondary">
          Check your phone — you&apos;ll get a text from us shortly. We&apos;re
          already pulling up your site and putting together your report.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to straywebdesign.co
          </Link>
        </div>
      </div>
    </div>
  );
}
