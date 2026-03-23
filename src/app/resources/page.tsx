import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import ResourcesList from '@/components/resources/ResourcesList';
import { RESOURCES, getResourcePath } from '@/lib/content';

export default function ResourcesPage() {
  const resources = RESOURCES.map((r) => ({
    ...r,
    path: getResourcePath(r),
  }));

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh] pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
              Resources
            </span>
            <h1 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
              Insights for{' '}
              <GradientText>Erie Businesses</GradientText>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Blogs, white papers, and case studies on web performance,
              AI readiness, and competing with enterprise brands.
            </p>
          </AnimateIn>

          <ResourcesList resources={resources} />
        </div>
      </main>
      <Footer />
    </>
  );
}
