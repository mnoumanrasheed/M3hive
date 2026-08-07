import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface AnimatedHoneycombProps {
  className?: string;
}

/**
 * Enhanced CSSHoneycombMesh with subtle GSAP-driven parallax depth.
 * - Slight vertical parallax offset on scroll (translateY shift)
 * - Subtle scale pulse on the inner hex layer
 * - All animations disabled for reduced-motion users
 * - No canvas, no Three.js — pure CSS + GSAP transforms
 */
export const AnimatedHoneycomb: React.FC<AnimatedHoneycombProps> = ({ className = '' }) => {
  const container = useRef<HTMLDivElement>(null);
  const hexLayer = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !hexLayer.current || !container.current) return;

      // Subtle parallax: hex layer moves slightly slower than scroll
      gsap.to(hexLayer.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Very subtle scale breathing — keeps the hex grid feeling alive
      gsap.fromTo(
        hexLayer.current,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );
    },
    { scope: container, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={container}
      className={['absolute inset-0 z-0 overflow-hidden', className].join(' ')}
      aria-hidden="true"
    >
      <div
        ref={hexLayer}
        className="absolute inset-0 hive-hex-bg bg-repeat opacity-30 will-change-transform"
        style={{ top: '-10%', bottom: '-10%' }}
      />
      {/* Edge fade gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-hive-white via-transparent to-hive-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-hive-white via-transparent to-hive-white" />
    </div>
  );
};
