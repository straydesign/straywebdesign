'use client';

import { Star } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import Carousel from '@/components/ui/Carousel';
import { TESTIMONIALS } from '@/lib/constants';

function TestimonialCard({
  name,
  role,
  quote,
  rating,
}: {
  name: string;
  role: string;
  quote: string;
  rating: number;
}) {
  return (
    <div className="w-[340px] rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm">
      <div className="mb-3 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-violet-400 text-violet-400" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-slate-600 italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-sm font-semibold text-navy">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="section-padding bg-white" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            Social Proof
          </span>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            What Our Clients{' '}
            <GradientText>Say</GradientText>
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-12">
          <Carousel
            speed={30}
            items={TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          />
        </AnimateIn>

        {/* Sites built placeholder */}
        <StaggerContainer className="mt-16 text-center" staggerDelay={0.1}>
          <StaggerItem>
            <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Built with modern technology
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-slate-300">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
