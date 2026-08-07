import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from '../ui/TestimonialCard';
import { Testimonial } from '../../types/content';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [testimonials]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll controls (Desktop only) */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 -right-4 justify-between z-10 pointer-events-none">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Previous testimonials"
          className={[
            'w-12 h-12 rounded-full bg-hive-white border border-hive-border shadow-hive-md flex items-center justify-center transition-all pointer-events-auto',
            'hover:border-hive-yellow hover:text-hive-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
            !canScrollLeft ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Next testimonials"
          className={[
            'w-12 h-12 rounded-full bg-hive-white border border-hive-border shadow-hive-md flex items-center justify-center transition-all pointer-events-auto',
            'hover:border-hive-yellow hover:text-hive-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow',
            !canScrollRight ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 -mx-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[450px]"
          >
            <TestimonialCard testimonial={t} className="h-full" />
          </div>
        ))}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
