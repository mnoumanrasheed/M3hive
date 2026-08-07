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
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`} aria-label="M3 Hive Homepage">
      <img
        src="/assets/brand/m3hive-logo.png"
        alt="M3 Hive Logo"
        width="200"
        height="40"
        className={imgClassName}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/favicon.png';
        }}
      />
    </Link>
  );
};
