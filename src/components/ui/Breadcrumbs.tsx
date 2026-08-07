import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={['py-4 border-b border-hive-border', className].join(' ')}>
      <ol className="flex items-center flex-wrap gap-y-1">
        <li className="flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-hive-text-muted hover:text-hive-orange transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
            aria-label="Homepage"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>

        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight
              className="w-3.5 h-3.5 text-hive-border mx-1.5 flex-shrink-0"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                to={item.href}
                className="text-xs text-hive-text-muted hover:text-hive-orange transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-xs font-semibold text-hive-black"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
