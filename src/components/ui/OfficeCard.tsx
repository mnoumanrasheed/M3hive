import React from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';
import { OfficeLocation } from '../../types/content';

interface OfficeCardProps {
  office: OfficeLocation;
  className?: string;
}

export const OfficeCard: React.FC<OfficeCardProps> = ({ office, className = '' }) => {
  const { title, address, phone, email, contactPerson, isDevCenter } = office;

  return (
    <article
      className={[
        'rounded-2xl p-5 bg-hive-white border border-hive-border',
        'transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover',
        className,
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-heading font-semibold text-sm text-hive-black leading-snug">{title}</h3>
        {isDevCenter && (
          <span className="flex-shrink-0 text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-hive-yellow text-hive-black">
            Dev Centre
          </span>
        )}
      </div>

      <div className="space-y-2">
        {/* Address */}
        <div className="flex gap-2">
          <MapPin className="w-3.5 h-3.5 text-hive-text-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-xs text-hive-text-muted leading-relaxed">{address}</p>
        </div>

        {/* Contact person */}
        {contactPerson && (
          <div className="flex gap-2">
            <User className="w-3.5 h-3.5 text-hive-text-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-xs text-hive-text-muted">{contactPerson}</p>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <div className="flex gap-2">
            <Phone className="w-3.5 h-3.5 text-hive-text-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-xs text-hive-text-muted hover:text-hive-orange transition-colors"
            >
              {phone}
            </a>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="flex gap-2">
            <Mail className="w-3.5 h-3.5 text-hive-text-muted mt-0.5 flex-shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${email}`}
              className="text-xs text-hive-orange hover:underline transition-colors"
            >
              {email}
            </a>
          </div>
        )}
      </div>

      {/* Yellow bottom border */}
      <div className="mt-4 h-px bg-gradient-to-r from-hive-yellow/40 to-transparent" />
    </article>
  );
};
