import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../types/content';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className = '' }) => {
  const { clientName, text, authorName, authorRole, logo } = testimonial;

  return (
    <article
      className={[
        'relative flex flex-col rounded-2xl p-6 bg-hive-white border border-hive-border',
        'transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover',
        className,
      ].join(' ')}
    >
      {/* Quote icon */}
      <div className="mb-4 flex-shrink-0">
        <Quote
          className="w-6 h-6 text-hive-yellow"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </div>

      {/* Quote text */}
      <p className="flex-1 text-sm leading-relaxed text-hive-black font-medium mb-5">
        "{text}"
      </p>

      {/* Footer: logo + attribution */}
      <div className="flex items-center gap-3 pt-4 border-t border-hive-border">
        {logo ? (
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-hive-border flex-shrink-0 bg-hive-gray">
            <img
              src={logo}
              alt={`${clientName} logo`}
              className="w-full h-full object-contain p-0.5"
              loading="lazy"
            />
          </div>
        ) : (
          /* Fallback: initial badge */
          <div
            className="w-9 h-9 rounded-lg flex-shrink-0 hive-hex-badge bg-hive-yellow flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-xs font-heading font-bold text-hive-black leading-none">
              {clientName.charAt(0)}
            </span>
          </div>
        )}

        <div className="min-w-0">
          <div className="text-sm font-heading font-semibold text-hive-black truncate">
            {authorName ?? clientName}
          </div>
          {authorRole && (
            <div className="text-xs text-hive-text-muted truncate">{authorRole}</div>
          )}
          {!authorName && (
            <div className="text-xs text-hive-text-muted">{clientName}</div>
          )}
        </div>
      </div>
    </article>
  );
};
