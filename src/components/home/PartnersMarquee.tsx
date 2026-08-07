import React from 'react';
import { partnersData } from '../../data/partners';
import { PartnerTile } from '../ui/PartnerTile';

export const PartnersMarquee: React.FC = () => {
  // Use all partners for the marquee, duplicate for infinite scroll effect
  const marqueeItems = [...partnersData, ...partnersData];

  return (
    <div className="w-full overflow-hidden bg-hive-warm-white py-10 border-y border-hive-border">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h3 className="text-sm font-heading font-bold uppercase tracking-widest text-hive-text-muted">
          Our Technology Partners
        </h3>
      </div>
      
      {/* Marquee track */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-[marquee_40s_linear_infinite] flex space-x-6 min-w-max px-3 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((partner, idx) => (
            <div key={`${partner.id}-${idx}`} className="w-[180px]">
              <PartnerTile partner={partner} variant="grid" />
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-[marquee2_40s_linear_infinite] flex space-x-6 min-w-max px-3 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((partner, idx) => (
            <div key={`dup-${partner.id}-${idx}`} className="w-[180px]">
              <PartnerTile partner={partner} variant="grid" />
            </div>
          ))}
        </div>

        {/* Gradient fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-hive-warm-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-hive-warm-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
