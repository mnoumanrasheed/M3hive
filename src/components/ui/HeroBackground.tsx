import React from 'react';

interface HeroBackgroundProps {
  imageUrl: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageUrl }) => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-[-5%] w-[110%] h-[110%]"
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          animation: 'hero-3d-pan 25s ease-in-out infinite alternate',
          willChange: 'transform'
        }}
      />
      {/* Dark overlay to make white text readable over any image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <style>{`
        @keyframes hero-3d-pan {
          0% { transform: scale(1.02) translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: scale(1.1) translate3d(-1.5%, 1.5%, 0) rotate(0.8deg); }
          100% { transform: scale(1.15) translate3d(1%, -1%, 0) rotate(-0.5deg); }
        }
      `}</style>
    </div>
  );
};
