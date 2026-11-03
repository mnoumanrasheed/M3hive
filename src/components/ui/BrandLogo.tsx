import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = 'h-10 w-auto',
}) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink-0 ${className}`}
      aria-label="M3 Hive Homepage"
    >
      <img
        src="/assets/brand/m3hive-logo-navbar-transparent.png"
        alt="M3 Hive Logo"
        width={1881}
        height={836}
        className={`block object-contain ${imgClassName}`}
        draggable={false}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{
          imageRendering: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </Link>
  );
};
