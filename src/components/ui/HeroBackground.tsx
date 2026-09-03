import React from 'react';

interface HeroBackgroundProps {
  imageUrl: string;
  priority?: boolean;
}

const toModernSources = (imageUrl: string) => {
  const withoutExt = imageUrl.replace(/\.(jpe?g|png)$/i, '');

  return {
    avif: `${withoutExt}.avif`,
    webp: `${withoutExt}.webp`,
    fallback: imageUrl,
  };
};

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl,
  priority = true,
}) => {
  const sources = toModernSources(imageUrl);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <picture className="w-full h-full block">
        <source srcSet={sources.avif} type="image/avif" />
        <source srcSet={sources.webp} type="image/webp" />
        <img
          src={sources.fallback}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="hero-background-image absolute inset-0 h-full w-full object-cover object-center block"
          style={{
            transformOrigin: 'center center',
            animation: 'hero-subtle-zoom 20s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        />
      </picture>
      {/* Dark overlay to make white text readable over any image */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
      <style>{`
        @keyframes hero-subtle-zoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.06); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-background-image {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

