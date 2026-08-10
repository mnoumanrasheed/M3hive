import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

import { homepageTestimonialsData } from "../data/testimonials";

const AUTOPLAY_DELAY = 4500;

export default function TestimonialsCarousel() {
  const testimonials = homepageTestimonialsData;

  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const pausedRef = useRef(false);

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      const normalizedIndex =
        ((index % total) + total) % total;

      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);
    },
    [total]
  );

  const goNext = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);

  const goPrevious = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  /*
   * AUTOPLAY
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (pausedRef.current) return;

      goTo(activeIndexRef.current + 1);
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [goTo]);

  /*
   * Pause when browser tab is hidden.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      pausedRef.current = document.hidden;
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /*
   * Determine where each card sits relative
   * to active card.
   */
  const getPosition = (index: number) => {
    let difference = index - activeIndex;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  };

  return (
    <section
      className="relative w-full overflow-hidden py-10"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={() => {
        pausedRef.current = false;
      }}
    >
      {/* ===================================
          CAROUSEL
      =================================== */}

      <div className="relative mx-auto h-[455px] max-w-[1250px] overflow-hidden px-4 sm:h-[470px]">
        {testimonials.map((testimonial, index) => {
          const position = getPosition(index);

          const isActive = position === 0;
          const isLeft = position === -1;
          const isRight = position === 1;

          const isVisible =
            isActive || isLeft || isRight;

          let transform =
            "translateX(0%) scale(0.82)";

          if (isLeft) {
            transform =
              "translateX(-108%) scale(0.91)";
          }

          if (isRight) {
            transform =
              "translateX(108%) scale(0.91)";
          }

          if (isActive) {
            transform =
              "translateX(0%) scale(1)";
          }

          return (
            <article
              key={testimonial.id}
              aria-hidden={!isVisible}
              className={`
                absolute
                left-1/2
                top-1/2
                flex
                h-[405px]
                w-[calc(100%-32px)]
                max-w-[405px]
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                rounded-[18px]
                border
                bg-[#fffdf7]
                p-6
                sm:h-[420px]
                sm:p-7
                lg:max-w-[405px]
                
                transition-[transform,opacity,filter,box-shadow,border-color]
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                
                ${
                  isActive
                    ? `
                      z-30
                      border-[#F5C400]
                      opacity-100
                      shadow-[0_20px_55px_rgba(0,0,0,0.10)]
                    `
                    : `
                      z-10
                      border-[#eee9dc]
                      opacity-45
                      shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                    `
                }

                ${
                  isVisible
                    ? "visible"
                    : "pointer-events-none invisible opacity-0"
                }
              `}
              style={{
                transform: `
                  translate(-50%, -50%)
                  ${transform}
                `,
              }}
            >
              {/* Top accent */}
              <div
                className={`
                  absolute
                  left-5
                  right-5
                  top-0
                  h-[3px]
                  rounded-full
                  bg-gradient-to-r
                  from-[#FF9D22]
                  via-[#FFD000]
                  to-[#FFE889]

                  transition-opacity
                  duration-700

                  ${
                    isActive
                      ? "opacity-100"
                      : "opacity-55"
                  }
                `}
              />

              {/* Logo / fallback icon */}
              <div className="mb-7 mt-1 flex h-14 items-center">
                {testimonial.logo ? (
                  <img
                    src={testimonial.logo}
                    alt={`${testimonial.clientName} logo`}
                    loading="lazy"
                    className="
                      max-h-14
                      max-w-[100px]
                      object-contain
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      bg-[#FFD000]
                      text-sm
                      font-bold
                      text-black
                    "
                    style={{
                      clipPath:
                        "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
                    }}
                  >
                    {testimonial.clientName
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {/* Category */}
              <p
                className="
                  mb-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#F59E3D]
                "
              >
                Client Project
              </p>

              {/* Client */}
              <h3
                className="
                  text-[24px]
                  font-semibold
                  leading-tight
                  tracking-[-0.02em]
                  text-[#171717]
                "
              >
                {testimonial.clientName}
              </h3>

              <div className="my-5 h-px bg-[#ebe7dc]" />

              {/* Quote */}
              <Quote
                size={25}
                strokeWidth={1.8}
                className="mb-3 text-[#F4C500]"
              />

              <p
                className="
                  line-clamp-5
                  text-[15px]
                  leading-[1.6]
                  text-[#77736b]
                "
              >
                “{testimonial.text}”
              </p>

              <div className="mt-auto border-t border-[#ebe7dc] pt-5">
                {testimonial.authorName ? (
                  <>
                    <p className="text-sm font-semibold text-[#353535]">
                      {testimonial.authorName}
                    </p>

                    {testimonial.authorRole && (
                      <p className="mt-1 text-xs text-[#8b877f]">
                        {testimonial.authorRole}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-[#8b877f]">
                    M3 Hive client project
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* ===================================
          CONTROLS
      =================================== */}

      <div className="mt-3 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous testimonial"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#e7e3d8]
            bg-white
            text-black
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#F5C400]
            hover:bg-[#fffaf0]
            hover:shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-[#F5C400]/40
          "
        >
          <ChevronLeft size={19} />
        </button>

        {/* Dots */}
        <div
          className="
            flex
            max-w-[260px]
            items-center
            justify-center
            gap-[5px]
            overflow-hidden
          "
        >
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={testimonial.id}
              onClick={() => goTo(index)}
              aria-label={`View ${testimonial.clientName}`}
              className={`
                h-[6px]
                rounded-full
                transition-all
                duration-500

                ${
                  activeIndex === index
                    ? "w-6 bg-[#F5C400]"
                    : "w-[6px] bg-[#deddd7] hover:bg-[#bbb8ae]"
                }
              `}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next testimonial"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#e7e3d8]
            bg-white
            text-black
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#F5C400]
            hover:bg-[#fffaf0]
            hover:shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-[#F5C400]/40
          "
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </section>
  );
}