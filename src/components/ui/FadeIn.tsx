import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  stagger?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 32,
  className = '',
  stagger = 0,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const element = container.current;

      if (!element) return;

      const childrenElements = element.children;

      if (!childrenElements.length) return;

      const mm = gsap.matchMedia();

      /*
       * MOBILE
       *
       * Smaller movement + faster duration
       * keeps scrolling responsive.
       */
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          childrenElements,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,

            duration: 0.5,
            delay: Math.min(delay, 0.15),
            stagger: Math.min(stagger, 0.08),

            ease: 'power2.out',

            scrollTrigger: {
              trigger: element,

              /*
               * Trigger slightly earlier
               * on small screens.
               */
              start: 'top 92%',

              /*
               * Animate only once.
               * Helps reduce ScrollTrigger work
               * on long mobile pages.
               */
              once: true,

              invalidateOnRefresh: true,
            },
          }
        );
      });

      /*
       * TABLET / DESKTOP
       */
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          childrenElements,
          {
            opacity: 0,
            y,
          },
          {
            opacity: 1,
            y: 0,

            duration,
            delay,
            stagger,

            ease: 'power3.out',

            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: container,
      dependencies: [
        reducedMotion,
        delay,
        duration,
        y,
        stagger,
      ],
    }
  );

  /*
   * Accessibility:
   * if Reduce Motion is enabled,
   * show content normally.
   */
  if (reducedMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={container}
      className={className}
    >
      {children}
    </div>
  );
};