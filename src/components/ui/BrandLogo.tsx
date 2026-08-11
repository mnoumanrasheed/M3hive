import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = 'h-10 w-auto object-contain',
}) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink-0 ${className}`}
      aria-label="M3 Hive Homepage"
    >
      <img
        src="/assets/brand/m3hive-logo.png"
        alt="M3 Hive Logo"
        className={`block max-w-full h-auto object-contain ${imgClassName}`}
        draggable={false}
        loading="eager"
        decoding="async"
        style={{
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />
    </Link>
  );
};