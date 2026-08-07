import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../../types/content';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

interface FAQRowProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}

const FAQRow: React.FC<FAQRowProps> = ({ item, index, isOpen, onToggle, reducedMotion }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-hive-border last:border-b-0">
      <button
        id={`faq-trigger-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        onClick={onToggle}
        className={[
          'w-full flex items-center justify-between gap-4 py-5 text-left',
          'font-heading font-semibold text-sm text-hive-black',
          'hover:text-hive-orange transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
          'rounded',
        ].join(' ')}
      >
        <span>{item.question}</span>
        <span
          className={[
            'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
            'border border-hive-border transition-all duration-200',
            isOpen
              ? 'bg-hive-yellow border-hive-yellow text-hive-black'
              : 'bg-hive-white text-hive-text-muted hover:border-hive-yellow',
          ].join(' ')}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          )}
        </span>
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        ref={contentRef}
        className={[
          'overflow-hidden',
          reducedMotion ? '' : 'transition-all duration-300 ease-out-expo',
        ].join(' ')}
        style={{
          maxHeight: isOpen ? (contentRef.current ? `${contentRef.current.scrollHeight}px` : '1000px') : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-5 pr-10">
          <p className="text-sm text-hive-text-muted leading-relaxed whitespace-pre-line">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      className={[
        'rounded-2xl border border-hive-border divide-y divide-hive-border overflow-hidden bg-hive-white px-6',
        className,
      ].join(' ')}
    >
      {items.map((item, idx) => (
        <FAQRow
          key={idx}
          item={item}
          index={idx}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
};
