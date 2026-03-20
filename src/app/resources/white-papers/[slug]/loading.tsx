import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function WhitePaperLoading() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          {/* Breadcrumb skeleton */}
          <div className="skeleton h-4 w-64" />

          {/* Tag + title */}
          <div className="skeleton mt-6 h-5 w-24 rounded-full" />
          <div className="skeleton mt-4 h-10 w-full md:h-12" />
          <div className="skeleton mt-2 h-10 w-2/3 md:h-12" />

          {/* Meta row */}
          <div className="mt-6 flex gap-4">
            <div className="skeleton h-4 w-28" />
            <div className="skeleton h-4 w-20" />
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-slate-200" />

          {/* Body skeleton */}
          <div className="space-y-4">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
            <div className="skeleton mt-6 h-6 w-48" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton mt-6 h-6 w-56" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-2/3" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
