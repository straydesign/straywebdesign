'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/constants';

let _isMobile: boolean | null = null;
function isMobile(): boolean {
  if (_isMobile === null) {
    _isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  }
  return _isMobile;
}

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
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

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
              ...(isMobile() ? {} : { filter: 'blur(8px)' }),
              y: 10,
            },
            visible: {
              opacity: 1,
              ...(isMobile() ? {} : { filter: 'blur(0px)' }),
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
