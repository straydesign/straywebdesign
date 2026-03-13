'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let raf: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, [role="button"], input, textarea, select, label');
      setHovering(!!isInteractive);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      cursor.style.left = `${currentX - 20}px`;
      cursor.style.top = `${currentY - 20}px`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
