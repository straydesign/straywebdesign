import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';

export default function ServiceLoading() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        {/* Hero skeleton */}
        <section className="relative overflow-hidden bg-navy pt-28 pb-20">
          <GrainOverlay />
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
            <div className="skeleton h-4 w-48" />
            <div className="skeleton mt-4 h-5 w-32" />
            <div className="skeleton mt-4 h-10 w-3/4 md:h-12" />
            <div className="skeleton mt-6 h-20 max-w-2xl" />
            <div className="skeleton mt-8 h-12 w-44 rounded-lg" />
          </div>
        </section>

        {/* Stats skeleton */}
        <section className="border-b border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="skeleton h-9 w-24" />
                  <div className="skeleton h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features skeleton */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <div className="skeleton mx-auto h-8 w-48" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200/60 bg-white p-6"
                >
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton mt-3 h-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
