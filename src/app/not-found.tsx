import Link from 'next/link';
import StrayLogo from '@/components/ui/StrayLogo';
import GrainOverlay from '@/components/ui/GrainOverlay';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-surface-page px-5">
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
        <Link href="/" aria-label="Go to homepage">
          <StrayLogo color="#2563EB" width={64} height={32} />
        </Link>

        <p className="mt-8 font-mono text-8xl font-bold text-accent/20 md:text-9xl">
          404
        </p>

        <h1 className="mt-2 font-mono text-3xl font-bold text-text-primary md:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-text-tertiary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-accent px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-accent/90"
          >
            Go home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center border-2 border-border-strong px-7 py-3.5 text-base font-semibold text-text-tertiary transition-all hover:border-white hover:text-white"
          >
            View services
          </Link>
        </div>
      </div>
    </div>
  );
}
