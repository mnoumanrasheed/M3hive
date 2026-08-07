import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface MagneticHoverProps {
  children: React.ReactElement;
  disabled?: boolean;
}

/**
 * A wrapper component that adds a subtle magnetic hover effect to its child.
 * Desktop only (requires fine pointer). Disabled if reduced motion is preferred.
 */
export const MagneticHover: React.FC<MagneticHoverProps> = ({ children, disabled = false }) => {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (disabled || reducedMotion || !container.current) return;
      
      // Only apply on devices with hover capability
      if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
      }

      const element = container.current.firstElementChild as HTMLElement;
      if (!element) return;

      const xTo = gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        // Calculate distance from center of element
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        
        // Move element slightly towards the mouse (strength: 0.2)
        xTo(relX * 0.2);
        yTo(relY * 0.2);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: container, dependencies: [disabled, reducedMotion] }
  );

  // We wrap children in a span that handles the refs, 
  // but for magnetic effect to work best, we attach listeners to the actual child DOM node inside the effect.
  return <span ref={container} className="inline-block">{children}</span>;
};
