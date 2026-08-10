import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Testimonial } from '../../types/content';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

interface ClientShowcaseCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

function ClientShowcaseCard({ testimonial, isActive }: ClientShowcaseCardProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const initials = testimonial.clientName
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className={[
        'relative flex min-h-[19.5rem] h-full flex-col overflow-hidden rounded-2xl border bg-hive-warm-white p-5 sm:p-6',
        'transition-[border-color,box-shadow] duration-500',
        isActive
          ? 'border-hive-yellow shadow-hive-lg'
          : 'border-hive-border shadow-hive-sm',
      ].join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hive-orange via-hive-yellow to-hive-light-honey" aria-hidden="true" />

      <div className="flex h-16 items-center">
        {testimonial.logo && !logoFailed ? (
          <img
            src={testimonial.logo}
            alt={`${testimonial.clientName} logo`}
            className="max-h-16 max-w-[13rem] object-contain object-left"
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center hive-hex-badge bg-hive-yellow text-sm font-heading font-bold text-hive-black" aria-label={`${testimonial.clientName} initials`}>
            {initials}
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-hive-orange">Client project</p>
        <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-hive-black sm:text-2xl">{testimonial.clientName}</h3>
      </div>

      <div className="my-4 h-px w-full bg-hive-border" />

      <div className="flex flex-1 flex-col">
        <Quote className="mb-3 h-5 w-5 text-hive-yellow" strokeWidth={2.5} aria-hidden="true" />
        <p className="text-[13px] leading-6 text-hive-text-muted sm:text-sm sm:leading-6">“{testimonial.text}”</p>
      </div>

      <div className="mt-4 border-t border-hive-border pt-3">
        {testimonial.authorName ? (
          <>
            <p className="font-heading text-sm font-semibold text-hive-black">{testimonial.authorName}</p>
            {testimonial.authorRole && <p className="mt-0.5 text-xs text-hive-text-muted">{testimonial.authorRole}</p>}
          </>
        ) : (
          <p className="text-xs font-medium text-hive-text-muted">M3 Hive client project</p>
        )}
      </div>
    </article>
  );
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(1);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const autoplayRef = useRef<number | null>(null);
  const moveRef = useRef<(direction: 1 | -1) => void>(() => undefined);
  const pointerStartRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const count = testimonials.length;

  // Two items on either end give the desktop centre card a seamless circular neighbour.
  const slides = useMemo(() => {
    if (count < 2) return testimonials;
    return [...testimonials.slice(-2), ...testimonials, ...testimonials.slice(0, 2)];
  }, [testimonials, count]);

  const getOffset = useCallback((targetPosition: number) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const child = track?.children.item(targetPosition) as HTMLElement | null;
    if (!track || !viewport || !child) return 0;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    // Desktop aligns the preceding card at the edge; mobile aligns the active card with a deliberate next-card peek.
    const target = isDesktop ? child : (track.children.item(targetPosition + 1) as HTMLElement | null);
    return -(target?.offsetLeft ?? 0) + (isDesktop ? 0 : viewport.clientWidth * 0.07);
  }, []);

  const placeTrack = useCallback((targetPosition: number) => {
    gsap.set(trackRef.current, { x: getOffset(targetPosition) });
  }, [getOffset]);

  useLayoutEffect(() => {
    placeTrack(positionRef.current);
    const observer = new ResizeObserver(() => placeTrack(positionRef.current));
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [placeTrack]);

  const finishWrap = useCallback((targetPosition: number, targetActive: number) => {
    let settledPosition = targetPosition;
    if (count > 1 && targetPosition === 0) settledPosition = count;
    if (count > 1 && targetPosition === count + 1) settledPosition = 1;

    positionRef.current = settledPosition;
    activeIndexRef.current = targetActive;
    setActiveIndex(targetActive);
    placeTrack(settledPosition);
    isAnimatingRef.current = false;
  }, [count, placeTrack]);

  const move = useCallback((direction: 1 | -1) => {
    if (count < 2 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const targetPosition = positionRef.current + direction;
    const targetActive = (activeIndexRef.current + direction + count) % count;

    gsap.to(trackRef.current, {
      x: getOffset(targetPosition),
      duration: reducedMotion ? 0.01 : 0.8,
      ease: reducedMotion ? 'none' : 'power3.inOut',
      overwrite: true,
      onComplete: () => finishWrap(targetPosition, targetActive),
    });
  }, [count, finishWrap, getOffset, reducedMotion]);

  const goTo = useCallback((targetActive: number) => {
    if (targetActive === activeIndexRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const targetPosition = targetActive + 1;
    gsap.to(trackRef.current, {
      x: getOffset(targetPosition),
      duration: reducedMotion ? 0.01 : 0.8,
      ease: reducedMotion ? 'none' : 'power3.inOut',
      overwrite: true,
      onComplete: () => finishWrap(targetPosition, targetActive),
    });
  }, [finishWrap, getOffset, reducedMotion]);

  useEffect(() => {
    moveRef.current = move;
  }, [move]);

  useEffect(() => {
    const onVisibilityChange = () => setIsPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused || count < 2) return;
    autoplayRef.current = window.setInterval(() => moveRef.current(1), 5000);
    return () => {
      if (autoplayRef.current !== null) window.clearInterval(autoplayRef.current);
    };
  }, [count, isPaused, reducedMotion]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = event.clientX;
    setIsPaused(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    setIsPaused(false);
    if (start === null) return;
    const distance = event.clientX - start;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
  };

  if (count === 0) return null;

  return (
    <section
      className="group/carousel relative"
      aria-roledescription="carousel"
      aria-label="Client projects and testimonials"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          move(1);
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div
        ref={viewportRef}
        className="overflow-hidden py-5"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStartRef.current = null; setIsPaused(false); }}
      >
        <div ref={trackRef} className="flex touch-pan-y gap-4 will-change-transform lg:gap-6">
          {slides.map((testimonial, slideIndex) => {
            const logicalIndex = (slideIndex - 2 + count) % count;
            return (
              <div
                key={`${testimonial.id}-${slideIndex}`}
                className="w-[86vw] shrink-0 transition-[opacity,transform] duration-700 ease-out sm:w-[72vw] lg:w-[calc((100%-3rem)/3)]"
                style={{
                  opacity: logicalIndex === activeIndex ? 1 : 0.74,
                  transform: `scale(${logicalIndex === activeIndex ? 1.04 : 0.96})`,
                }}
              >
                <ClientShowcaseCard testimonial={testimonial} isActive={logicalIndex === activeIndex} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6">
        <button
          type="button"
          onClick={() => move(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hive-border bg-hive-white text-hive-black shadow-hive-sm transition hover:border-hive-yellow hover:text-hive-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2"
          aria-label="Show previous client project"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1.5" aria-label={`Client project ${activeIndex + 1} of ${count}`}>
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => goTo(index)}
              className={[
                'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2',
                index === activeIndex ? 'w-6 bg-hive-yellow' : 'w-1.5 bg-hive-border hover:bg-hive-light-honey',
              ].join(' ')}
              aria-label={`Show ${testimonial.clientName}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => move(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hive-border bg-hive-white text-hive-black shadow-hive-sm transition hover:border-hive-yellow hover:text-hive-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-yellow focus-visible:ring-offset-2"
          aria-label="Show next client project"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
