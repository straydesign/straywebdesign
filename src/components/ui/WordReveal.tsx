'use client';

import { motion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/constants';
import { isMobile, prefersReducedMotion } from '@/lib/mobile';
import { useAnimateInView } from '@/lib/use-animate-in-view';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
}: WordRevealProps) {
  const words = text.split(' ');
  const mobile = isMobile();
  const [mobileRef, inView] = useAnimateInView({ once: true, margin: '-50px' });

  if (prefersReducedMotion()) {
    return <span className={className}>{text}</span>;
  }

  // Mobile: CSS word-by-word reveal
  if (mobile) {
    return (
      <span
        ref={mobileRef}
        className={`${className} ${inView ? 'css-word-reveal-visible' : ''}`}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="css-word-reveal-word"
            style={
              inView
                ? { animationDelay: `${delay + i * stagger}s` }
                : undefined
            }
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    );
  }

  // Desktop: framer-motion with blur
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: {
              opacity: 0,
              filter: 'blur(8px)',
              y: 10,
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.4, ease: EASE_SMOOTH },
            },
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}
