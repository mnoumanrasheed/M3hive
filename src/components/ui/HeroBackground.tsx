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
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      <picture>
        <source srcSet={sources.avif} type="image/avif" />
        <source srcSet={sources.webp} type="image/webp" />
        <img
          src={sources.fallback}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="hero-background-image absolute inset-[-5%] h-[110%] w-[110%] object-cover"
          style={{
            animation: 'hero-3d-pan 25s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        />
      </picture>
      {/* Dark overlay to make white text readable over any image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <style>{`
        @keyframes hero-3d-pan {
          0% { transform: scale(1.02) translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: scale(1.1) translate3d(-1.5%, 1.5%, 0) rotate(0.8deg); }
          100% { transform: scale(1.15) translate3d(1%, -1%, 0) rotate(-0.5deg); }
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
