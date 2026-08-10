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
  variant?: 'light' | 'dark';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '', variant = 'light' }) => {
  const isDark = variant === 'dark';
  
  const textMutedClass = isDark ? 'text-white/70 hover:text-white' : 'text-hive-text-muted hover:text-hive-orange';
  const textActiveClass = isDark ? 'text-white' : 'text-hive-black';
  const borderClass = isDark ? 'border-white/20' : 'border-hive-border';
  const chevronClass = isDark ? 'text-white/40' : 'text-hive-border';

  return (
    <nav aria-label="Breadcrumb" className={[`py-4 border-b ${borderClass}`, className].join(' ')}>
      <ol className="flex items-center flex-wrap gap-y-1">
        <li className="flex items-center">
          <Link
            to="/"
            className={`inline-flex items-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded ${textMutedClass}`}
            aria-label="Homepage"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>

        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight
              className={`w-3.5 h-3.5 mx-1.5 flex-shrink-0 ${chevronClass}`}
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                to={item.href}
                className={`text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow rounded ${textMutedClass}`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`text-xs font-semibold ${textActiveClass}`}
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
