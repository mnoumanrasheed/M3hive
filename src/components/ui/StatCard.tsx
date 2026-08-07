import React from 'react';
import { CompanyStat } from '../../types/content';

interface StatCardProps {
  stat: CompanyStat;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, className = '' }) => {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl p-6 bg-hive-white border border-hive-border',
        'transition-all duration-300 hover:border-hive-yellow/60 hover:shadow-hive-hover group',
        className,
      ].join(' ')}
    >
      {/* Hex accent top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 w-16 h-16 hive-hex-badge bg-hive-yellow/10 group-hover:bg-hive-yellow/20 transition-colors duration-300"
      />

      <div className="relative">
        <div className="font-heading font-bold text-hive-black leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
          {stat.value}
        </div>
        <div className="text-sm font-semibold text-hive-text-muted tracking-wide">
          {stat.label}
        </div>
        {stat.description && (
          <p className="mt-2 text-xs text-hive-text-muted leading-relaxed">{stat.description}</p>
        )}
      </div>

      {/* Bottom yellow accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-hive-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out-expo" />
    </div>
  );
};
