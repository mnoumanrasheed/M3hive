import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ServiceHeroContentProps {
  children: React.ReactNode;
}

export const ServiceHeroContent: React.FC<ServiceHeroContentProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      // Animate heading
      const heading = container.querySelector('.hero-heading');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 20, x: -5 },
          { 
            opacity: 1, 
            y: 0, 
            x: 0, 
            duration: 0.7, 
            delay: 0.2, 
            ease: 'power3.out',
            onComplete: () => {
              // Add subtle continuous floating after entry
              gsap.to(heading, {
                y: -3,
                duration: 3,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
              });
            }
          }
        );
      }

      // Animate subtitle
      const subtitle = container.querySelector('.hero-subtitle');
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
        );
      }

      // Animate CTA
      const cta = container.querySelector('.hero-cta');
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: 'power3.out' }
        );
      }

      // Add subtle parallax to hero text on mouse move (Desktop only)
      let containerQuickX: gsap.QuickToFunc | null = null;
      let containerQuickY: gsap.QuickToFunc | null = null;

      if (window.innerWidth >= 768) {
        containerQuickX = gsap.quickTo(container, 'x', { duration: 1, ease: 'power2.out' });
        containerQuickY = gsap.quickTo(container, 'y', { duration: 1, ease: 'power2.out' });
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 768 || !containerQuickX || !containerQuickY) return;

        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        // Hero text moves very subtly (2-3px for depth)
        containerQuickX(mouseX * 2.5);
        containerQuickY(mouseY * 2);
      };

      let rafId: number;
      const throttledMouseMove = (e: MouseEvent) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          handleMouseMove(e);
          rafId = 0;
        });
      };

      window.addEventListener('mousemove', throttledMouseMove);

      return () => {
        window.removeEventListener('mousemove', throttledMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
};
