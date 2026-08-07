import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Lightweight route-level entrance transition.
 * - Fades and slides the page content in on mount
 * - Uses opacity + translateY only (GPU composited)
 * - Skips entirely for reduced-motion users
 * - Content is always visible (initial opacity set in CSS, GSAP overrides)
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};
