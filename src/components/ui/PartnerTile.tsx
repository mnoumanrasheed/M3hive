import React from 'react';
import { Partner } from '../../types/content';

interface PartnerTileProps {
  partner: Partner;
  variant?: 'grid' | 'full';
  className?: string;
}

const getLogoClasses = (name: string, variant: 'grid' | 'full') => {
  const n = name.toLowerCase();

  if (variant === 'full') {
    if (n.includes('workato')) {
      return 'max-h-[95px] max-w-[300px] w-auto object-contain mix-blend-multiply';
    }
    if (n.includes('celonis')) {
      return 'max-h-[95px] max-w-[300px] w-auto object-contain mix-blend-multiply';
    }
    if (n.includes('nvidia')) {
      return 'max-h-[90px] max-w-[280px] w-auto object-contain mix-blend-multiply';
    }
    if (n.includes('microsoft')) {
      return 'max-h-[88px] max-w-[280px] w-auto object-contain mix-blend-multiply';
    }

    return 'max-h-[80px] max-w-[240px] w-auto object-contain';
  }

  if (n.includes('workato')) {
    return 'max-h-[72px] max-w-[220px] w-auto object-contain mix-blend-multiply';
  }
  if (n.includes('celonis')) {
    return 'max-h-[72px] max-w-[220px] w-auto object-contain mix-blend-multiply';
  }
  if (n.includes('nvidia')) {
    return 'max-h-[68px] max-w-[210px] w-auto object-contain mix-blend-multiply';
  }
  if (n.includes('microsoft')) {
    return 'max-h-[68px] max-w-[210px] w-auto object-contain mix-blend-multiply';
  }

  return 'max-h-16 max-w-[190px] w-auto object-contain';
};

export const PartnerTile: React.FC<PartnerTileProps> = ({
  partner,
  variant = 'grid',
  className = '',
}) => {
  const { name, logo, description, ctaLabel, ctaHref } = partner;

  if (variant === 'full') {
    return (
      <article
        className={[
          'group relative flex h-full flex-col overflow-hidden',
          'rounded-2xl border border-hive-border bg-hive-white',
          'transition-all duration-300',
          'hover:-translate-y-1 hover:border-hive-yellow/60',
          'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]',
          className,
        ].join(' ')}
      >
        <div className="h-1 w-full bg-hive-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex h-full flex-col p-7 lg:p-8">
          <div className="mb-7 flex min-h-[130px] items-center justify-center rounded-xl border border-hive-border/70 bg-hive-warm-white px-6 py-5">
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                loading="lazy"
                className={`${getLogoClasses(name, 'full')} transition-transform duration-300 group-hover:scale-[1.04]`}
              />
            ) : (
              <span className="text-center font-heading text-2xl font-bold text-hive-black">
                {name}
              </span>
            )}
          </div>

          <h3 className="mb-4 font-heading text-xl font-bold text-hive-black">
            {name}
          </h3>

          {description && (
            <p className="mb-7 flex-grow text-[15px] leading-7 text-hive-text-muted">
              {description}
            </p>
          )}

          <div className="mt-auto border-t border-hive-border/70 pt-5">
            {ctaLabel && ctaHref && ctaHref !== '#' ? (
              <a
                href={ctaHref}
                className="group/link inline-flex items-center gap-2 rounded-md font-heading text-sm font-semibold text-hive-orange transition-all duration-200 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow"
              >
                <span>{ctaLabel}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            ) : ctaLabel ? (
              <span className="font-heading text-sm font-semibold text-hive-text-muted opacity-60">
                {ctaLabel}
              </span>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  return (
    <div
      className={[
        'group flex h-28 items-center justify-center rounded-xl',
        'border border-hive-border bg-hive-white px-6 py-5',
        'transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-hive-yellow/70 hover:shadow-hive-sm',
        className,
      ].join(' ')}
      title={name}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          className={`${getLogoClasses(name, 'grid')} transition-transform duration-300 group-hover:scale-105`}
        />
      ) : (
        <span className="text-center font-heading text-sm font-semibold text-hive-text-muted">
          {name}
        </span>
      )}
    </div>
  );
};