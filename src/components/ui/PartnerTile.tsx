import React from 'react';
import { Partner } from '../../types/content';

interface PartnerTileProps {
  partner: Partner;
  variant?: 'grid' | 'full';
  className?: string;
}

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
          'rounded-2xl p-8 bg-hive-white border border-hive-border',
          'transition-all duration-300 hover:border-hive-yellow/60 hover:shadow-hive-hover',
          className,
        ].join(' ')}
      >
        {/* Logo row */}
        <div className="h-10 mb-6 flex items-center">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-auto max-w-[140px] object-contain"
              loading="lazy"
            />
          ) : (
            <span className="font-heading font-bold text-lg text-hive-black">{name}</span>
          )}
        </div>

        {description && (
          <p className="text-sm leading-relaxed text-hive-text-muted mb-5">{description}</p>
        )}

        {ctaLabel && ctaHref && ctaHref !== '#' ? (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-hive-orange group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
          >
            <span className="group-hover:underline">{ctaLabel}</span>
          </a>
        ) : ctaLabel ? (
          <div className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-hive-orange opacity-60 cursor-not-allowed">
            <span>{ctaLabel} (Link unavailable)</span>
          </div>
        ) : null}
      </article>
    );
  }

  /* Grid tile (logo only) */
  return (
    <div
      className={[
        'flex items-center justify-center p-4 h-20 rounded-xl',
        'bg-hive-white border border-hive-border',
        'transition-all duration-200 hover:border-hive-yellow/70 hover:shadow-hive-sm grayscale hover:grayscale-0',
        className,
      ].join(' ')}
      title={name}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          className="max-h-8 max-w-[100px] w-auto object-contain"
        />
      ) : (
        <span className="text-xs font-heading font-semibold text-hive-text-muted text-center leading-tight">
          {name}
        </span>
      )}
    </div>
  );
};
