import StrayLogo from '@/components/ui/StrayLogo';
import GrainOverlay from '@/components/ui/GrainOverlay';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-5">
      <GrainOverlay />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
        <a href="/" aria-label="Go to homepage">
          <StrayLogo color="#3B82F6" width={64} height={32} />
        </a>

        <p className="mt-8 font-display text-8xl font-bold text-electric/20 md:text-9xl">
          404
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-electric px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-electric/25 transition-all hover:bg-electric/90 hover:shadow-xl hover:shadow-electric/30"
          >
            Go home
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-600 px-7 py-3.5 text-base font-semibold text-slate-300 transition-all hover:border-white hover:text-white"
          >
            View services
          </a>
        </div>
      </div>
    </div>
  );
}
