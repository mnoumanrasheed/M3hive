import React from 'react';

interface HeroBackgroundProps {
  imageUrl: string;
  priority?: boolean;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl,
  priority = true,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <img
        src={imageUrl}
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
      {/* Keep the full image clear across the hero. */}
      <div className="absolute inset-0 h-full w-full bg-transparent" />
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

