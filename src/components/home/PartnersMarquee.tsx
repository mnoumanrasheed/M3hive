import React from 'react';
import { partnersData } from '../../data/partners';
import { PartnerMarquee } from '../ui/PartnerMarquee';

export const PartnersMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-hive-warm-white py-10 border-y border-hive-border">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h3 className="text-sm font-heading font-bold uppercase tracking-widest text-hive-text-muted">
          Our Technology Partners
        </h3>
      </div>
      
      <div className="mt-8 overflow-hidden w-full max-w-full">
        <PartnerMarquee partners={partnersData} />
      </div>
    </div>
  );
};
