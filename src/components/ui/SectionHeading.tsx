import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  accentBar?: boolean;
  variant?: 'light' | 'dark';
}

const titleSizeClasses = {
  sm: 'text-display-sm',
  md: 'text-display-md',
  lg: 'text-display-lg',
  xl: 'text-display-xl',
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  centered = false,
  className = '',
  titleSize = 'md',
  accentBar = false,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={['mb-10', centered ? 'text-center' : '', className].filter(Boolean).join(' ')}>
      {eyebrow && (
        <div
          className={[
            'inline-flex items-center gap-2 mb-4',
            centered ? 'mx-auto' : '',
          ].join(' ')}
        >
          {/* Hexagon dot */}
          <span
            aria-hidden="true"
            className="hive-hex-badge inline-block w-4 h-4 bg-hive-yellow flex-shrink-0"
          />
          <span className={`text-xs font-heading font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-hive-black'}`}>
            {eyebrow}
          </span>
        </div>
      )}

      {accentBar && (
        <div
          className={['w-10 h-1 bg-hive-yellow rounded-full mb-5', centered ? 'mx-auto' : ''].join(
            ' '
          )}
        />
      )}

      <h2 className={['font-heading font-bold', isDark ? 'text-white' : 'text-hive-black', titleSizeClasses[titleSize]].join(' ')}>
        {title}
      </h2>

      {description && (
        <p
          className={[
            'mt-4 text-base leading-relaxed',
            isDark ? 'text-white/70' : 'text-hive-text-muted',
            centered ? 'max-w-2xl mx-auto' : 'max-w-3xl',
          ].join(' ')}
        >
          {description}
        </p>
      )}
    </div>
  );
};
