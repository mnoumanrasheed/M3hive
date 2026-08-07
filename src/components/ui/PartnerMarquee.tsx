import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Partner } from '../../types/content';

interface PartnerMarqueeProps {
  partners: Partner[];
}

export const PartnerMarquee: React.FC<PartnerMarqueeProps> = ({ partners }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    
    let ctx = gsap.context(() => {
      // To move from Left to Right, we start at -50% and animate to 0%
      const tween = gsap.fromTo(trackRef.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: partners.length * 4, // Smooth continuous scroll
          ease: 'none',
          repeat: -1,
        }
      );
      
      const container = containerRef.current!;
      container.addEventListener('mouseenter', () => tween.pause());
      container.addEventListener('mouseleave', () => tween.play());
      container.addEventListener('focusin', () => tween.pause());
      container.addEventListener('focusout', () => tween.play());
    }, containerRef);

    return () => ctx.revert();
  }, [partners.length]);

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-hidden touch-pan-x py-4"
    >
      <div 
        ref={trackRef} 
        className="flex w-max"
      >
        {/* Render two identical groups side-by-side for the seamless loop */}
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex gap-4 sm:gap-6 px-2 sm:px-3">
            {partners.map((partner) => {
              const isTargetedLogo = 
                partner.id === 'partner-workato' || 
                partner.id === 'partner-celonis' || 
                partner.id === 'partner-microsoft' ||
                partner.id === 'partner-kognitos';

              return (
                <div 
                  key={partner.id}
                  tabIndex={0}
                  className={[
                    'group flex-shrink-0 flex items-center justify-center rounded-2xl',
                    'bg-hive-white border border-hive-yellow/30 transition-all duration-300',
                    'hover:border-hive-yellow focus:outline-none focus:ring-2 focus:ring-hive-yellow hover:shadow-hive-sm',
                    'grayscale hover:grayscale-0',
                    'w-[200px] sm:w-[240px] lg:w-[280px] xl:w-[320px]', // Large card widths
                    'h-[96px] sm:h-[112px] lg:h-[128px] xl:h-[144px]',  // Large card heights
                  ].join(' ')}
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      // Target logos are allowed to touch the absolute edges and grow massively tall
                      // Normal logos have tighter constraints so the targeted ones stand out as larger
                      className={
                        isTargetedLogo 
                        ? "w-auto h-auto max-w-[100%] max-h-[95%] lg:max-h-[98%] object-contain block transition-transform duration-300 group-hover:scale-105"
                        : "w-auto h-auto max-w-[80%] max-h-[50%] lg:max-h-[55%] object-contain block transition-transform duration-300 group-hover:scale-105"
                      }
                    />
                  ) : (
                    <span className="text-sm font-heading font-semibold text-hive-text-muted text-center whitespace-nowrap px-4">
                      {partner.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
