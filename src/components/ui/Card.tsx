import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'highlight';
  hoverEffect?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const variantClasses = {
  default:   'bg-hive-white border border-hive-border',
  bordered:  'bg-hive-white border-2 border-hive-yellow',
  elevated:  'bg-hive-white border border-hive-border shadow-hive-card',
  highlight: 'bg-hive-warm-white border border-hive-light-honey',
};

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false,
  padding = 'md',
}) => {
  return (
    <div
      className={[
        'rounded-2xl overflow-hidden transition-all duration-300 ease-out-expo',
        variantClasses[variant],
        paddingClasses[padding],
        hoverEffect
          ? 'hover:-translate-y-1 hover:shadow-hive-hover hover:border-hive-yellow/40 cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};
