import React from 'react';
import { ArrowUpRight, BookOpen, FileText, Briefcase, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResourceItem } from '../../types/content';

interface ResourceCardProps {
  resource: ResourceItem;
  className?: string;
}

const typeConfig = {
  article: {
    icon: BookOpen,
    label: 'Article',
    color: 'text-hive-black bg-hive-yellow/20',
  },
  'case-study': {
    icon: Briefcase,
    label: 'Case Study',
    color: 'text-hive-orange bg-hive-orange/10',
  },
  resource: {
    icon: FileText,
    label: 'Resource',
    color: 'text-neutral-600 bg-hive-gray',
  },
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, className = '' }) => {
  const {
    title,
    displayTitle,
    type,
    publishDate,
    officialDate,
    category,
    sourceName,
    internalPath,
  } = resource;

  const config = typeConfig[type] ?? typeConfig['resource'];
  const Icon = config.icon;

  // Heading – official displayTitle takes precedence
  const visibleTitle = displayTitle ?? title;

  // Date logic:
  //   officialDate defined  → use it (null = hide, string = show)
  //   officialDate undefined → link not matched, fall back to publishDate
  const visibleDate = officialDate !== undefined ? officialDate : publishDate;

  const internalTo = internalPath || '#';

  const sharedClasses = [
    'group flex flex-col rounded-2xl p-5 bg-hive-white border border-hive-border',
    'transition-all duration-300',
    'hover:border-hive-yellow/50 hover:shadow-hive-hover',
    className,
  ].join(' ');

  const cardBody = (
    <>
      {/* Type badge + category */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={[
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider',
            config.color,
          ].join(' ')}
        >
          <Icon className="w-3 h-3" aria-hidden="true" />
          {config.label}
        </span>
        {category && (
          <span className="text-[10px] font-medium text-hive-text-muted">{category}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="flex-1 font-heading font-semibold text-sm text-hive-black leading-snug mb-3 transition-colors duration-150 group-hover:text-hive-orange">
        {visibleTitle}
      </h3>

      {/* Source attribution */}
      {sourceName && (
        <div className="flex items-center gap-1 mb-3">
          <ExternalLink className="w-3 h-3 text-hive-text-muted flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-medium text-hive-text-muted">{sourceName}</span>
        </div>
      )}

      {/* Footer: date + "Read more" */}
      <div className="flex items-center justify-between pt-3 border-t border-hive-border mt-auto">
        {visibleDate ? (
          <time className="text-[11px] text-hive-text-muted">{visibleDate}</time>
        ) : (
          // null = hide date; transparent spacer keeps "Read more" right-aligned
          <span className="text-[11px] text-transparent select-none" aria-hidden="true">—</span>
        )}

        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-hive-text-muted group-hover:text-hive-orange transition-colors duration-150"
          aria-hidden="true"
        >
          Read more
          <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </>
  );

  return (
    <Link to={internalTo} className={sharedClasses}>
      {cardBody}
    </Link>
  );
};
