import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { FadeIn } from '../ui/FadeIn';

interface DeliveryStep {
  stepNumber: string;
  title: string;
  description: string;
}

interface AnimatedTimelineProps {
  steps: DeliveryStep[];
}

/**
 * Renders the delivery approach steps with an animated horizontal line (on desktop).
 * The line fills with yellow as the user scrolls down, and the steps highlight.
 */
export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || !lineRef.current) return;

      // The line fills as you scroll through the container
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );

      // We could also do scroll-based highlighting for the steps themselves if desired
      const stepCards = gsap.utils.toArray<HTMLElement>('.timeline-step', containerRef.current);
      stepCards.forEach((card) => {
        gsap.to(card, {
          borderColor: '#FDCF09', // hive-yellow
          boxShadow: '0 8px 24px -4px rgba(10,10,10,0.1), 0 3px 8px -3px rgba(10,10,10,0.07)',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
          },
        });
        
        // Also highlight the circle number
        const circle = card.querySelector('.timeline-circle');
        if (circle) {
          gsap.to(circle, {
            backgroundColor: '#FDCF09',
            color: '#0A0A0A',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
            },
          });
        }
      });
    },
    { scope: containerRef, dependencies: [reducedMotion, steps.length] }
  );

  return (
    <div ref={containerRef} className="mt-16 relative">
      {/* Background line (gray) */}
      <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-hive-border z-0" />
      
      {/* Animated foreground line (yellow) */}
      <div 
        ref={lineRef} 
        className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-hive-yellow z-0 origin-left scale-x-0 will-change-transform" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
        {steps.map((step, idx) => (
          <FadeIn key={idx} delay={idx * 0.15}>
            <div className="timeline-step bg-hive-white p-8 rounded-2xl border border-hive-border shadow-hive-sm h-full relative transition-colors duration-300">
              <div className="timeline-circle w-10 h-10 rounded-full bg-hive-warm-white text-hive-text-muted font-heading font-bold flex items-center justify-center absolute -top-5 left-8 border-4 border-hive-gray transition-colors duration-300">
                {step.stepNumber}
              </div>
              <h4 className="text-lg font-bold font-heading text-hive-black mt-4 mb-3">
                {step.title}
              </h4>
              <p className="text-sm text-hive-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
