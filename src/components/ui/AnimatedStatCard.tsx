import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { CompanyStat } from '../../types/content';

interface AnimatedStatCardProps {
  stat: CompanyStat;
  className?: string;
}

/**
 * Parses a stat value string like "15+", "4,000+", "20+" or "2002–2025"
 * and returns numeric target + prefix/suffix for counter animation.
 */
function parseStatValue(value: string) {
  // Handle year ranges like "2002–2025"
  if (/\d{4}[–-]\d{4}/.test(value)) {
    return null; // Don't animate year ranges
  }

  const match = value.match(/^([^\d]*)(\d[\d,]*)([^\d]*)$/);
  if (!match) return null;

  const prefix = match[1];
  const numericStr = match[2].replace(/,/g, '');
  const suffix = match[3];
  const target = parseInt(numericStr, 10);

  if (isNaN(target)) return null;

  const hasCommas = match[2].includes(',');

  return { prefix, target, suffix, hasCommas };
}

function formatNumber(n: number, useCommas: boolean): string {
  if (!useCommas) return Math.round(n).toString();
  return Math.round(n).toLocaleString('en-US');
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ stat, className = '' }) => {
  const container = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  const parsed = parseStatValue(stat.value);

  useGSAP(
    () => {
      if (reducedMotion || !parsed || !valueRef.current || hasAnimated) return;

      const counter = { val: 0 };

      gsap.fromTo(
        counter,
        { val: 0 },
        {
          val: parsed.target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (valueRef.current) {
              valueRef.current.textContent =
                parsed.prefix + formatNumber(counter.val, parsed.hasCommas) + parsed.suffix;
            }
          },
          onComplete: () => {
            // Ensure final value is exact
            if (valueRef.current) {
              valueRef.current.textContent = stat.value;
            }
            setHasAnimated(true);
          },
        }
      );
    },
    { scope: container, dependencies: [reducedMotion, hasAnimated] }
  );

  return (
    <div
      ref={container}
      className={[
        'relative overflow-hidden rounded-2xl p-6 bg-hive-white border border-hive-border',
        'transition-all duration-300 hover:border-hive-yellow/60 hover:shadow-hive-hover group',
        className,
      ].join(' ')}
    >
      {/* Hex accent top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 w-16 h-16 hive-hex-badge bg-hive-yellow/10 group-hover:bg-hive-yellow/20 transition-colors duration-300"
      />

      <div className="relative">
        <div
          ref={valueRef}
          className="font-heading font-bold text-hive-black leading-none mb-2"
          style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
        >
          {stat.value}
        </div>
        <div className="text-sm font-semibold text-hive-text-muted tracking-wide">
          {stat.label}
        </div>
        {stat.description && (
          <p className="mt-2 text-xs text-hive-text-muted leading-relaxed">{stat.description}</p>
        )}
      </div>

      {/* Bottom yellow accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-hive-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out-expo" />
    </div>
  );
};
