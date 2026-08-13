import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";

import { homepageTestimonialsData } from "../data/testimonials";

export default function TestimonialsCarousel() {
  const testimonials = homepageTestimonialsData;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track || testimonials.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * Same smooth continuous technique
       * used by the Partners marquee.
       *
       * Two identical groups are rendered.
       * Moving exactly 50% creates a seamless loop.
       */
      const tween = gsap.fromTo(
        track,
        {
          xPercent: -50,
        },
        {
          xPercent: 0,

          /*
           * Bigger number = slower movement.
           *
           * 5.5 gives a smooth premium speed
           * for testimonial cards.
           */
          duration: Math.max(
            testimonials.length * 5.5,
            35
          ),

          ease: "none",
          repeat: -1,
        }
      );

      /*
       * Slow down nicely when hovered instead
       * of abruptly stopping.
       */
      const slowDown = () => {
        gsap.to(tween, {
          timeScale: 0.25,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      const resume = () => {
        gsap.to(tween, {
          timeScale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      container.addEventListener(
        "mouseenter",
        slowDown
      );

      container.addEventListener(
        "mouseleave",
        resume
      );

      container.addEventListener(
        "focusin",
        slowDown
      );

      container.addEventListener(
        "focusout",
        resume
      );

      return () => {
        container.removeEventListener(
          "mouseenter",
          slowDown
        );

        container.removeEventListener(
          "mouseleave",
          resume
        );

        container.removeEventListener(
          "focusin",
          slowDown
        );

        container.removeEventListener(
          "focusout",
          resume
        );
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [testimonials.length]);

  if (!testimonials.length) {
    return null;
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        py-10
      "
    >
      {/* ==================================================
          FADE EDGES
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          top-0
          z-20
          hidden
          w-[10%]
          bg-gradient-to-r
          from-white
          via-white/80
          to-transparent
          md:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          top-0
          z-20
          hidden
          w-[10%]
          bg-gradient-to-l
          from-white
          via-white/80
          to-transparent
          md:block
        "
      />

      {/* ==================================================
          MARQUEE VIEWPORT
      ================================================== */}

      <div
        ref={containerRef}
        className="
          relative
          w-full
          overflow-hidden
          py-6
        "
      >
        {/* ==================================================
            MOVING TRACK
        ================================================== */}

        <div
          ref={trackRef}
          className="
            flex
            w-max
            transform-gpu
            will-change-transform
          "
        >
          {/*
           * Two identical groups create
           * the seamless infinite loop.
           */}
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="
                flex
                items-stretch
                gap-5
                px-2.5

                sm:gap-6
                sm:px-3

                lg:gap-7
                lg:px-3.5
              "
            >
              {testimonials.map(
                (testimonial) => (
                  <article
                    key={`${groupIndex}-${testimonial.id}`}
                    tabIndex={0}
                    className="
                      group

                      relative
                      flex
                      min-h-[470px]
                      w-[310px]
                      flex-shrink-0
                      flex-col

                      overflow-hidden
                      rounded-[18px]

                      border
                      border-[#eee9dc]

                      bg-[#fffdf7]

                      p-6

                      shadow-[0_12px_35px_rgba(0,0,0,0.06)]

                      transition-[transform,box-shadow,border-color]
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      hover:-translate-y-[6px]
                      hover:border-[#F5C400]
                      hover:shadow-[0_22px_55px_rgba(0,0,0,0.12)]

                      focus:outline-none
                      focus:border-[#F5C400]

                      sm:min-h-[490px]
                      sm:w-[350px]
                      sm:p-7

                      lg:w-[390px]
                    "
                  >
                    {/* ======================================
                        TOP ACCENT
                    ====================================== */}

                    <div
                      className="
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

                        opacity-70

                        transition-opacity
                        duration-500

                        group-hover:opacity-100
                      "
                    />

                    {/* ======================================
                        LOGO
                    ====================================== */}

                    <div
                      className="
                        mb-6
                        mt-1

                        flex
                        h-14
                        shrink-0
                        items-center
                      "
                    >
                      {testimonial.logo ? (
                        <img
                          src={testimonial.logo}
                          alt={`${testimonial.clientName} logo`}
                          loading="lazy"
                          className="
                            max-h-14
                            max-w-[110px]
                            object-contain

                            transition-transform
                            duration-500

                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0

                            items-center
                            justify-center

                            bg-[#FFD000]

                            text-sm
                            font-bold
                            text-black

                            transition-transform
                            duration-500

                            group-hover:scale-105
                          "
                          style={{
                            clipPath:
                              "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
                          }}
                        >
                          {testimonial.clientName
                            .split(" ")
                            .map(
                              (word) =>
                                word[0]
                            )
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* ======================================
                        CATEGORY
                    ====================================== */}

                    <p
                      className="
                        mb-3
                        shrink-0

                        text-[10px]
                        font-semibold
                        uppercase

                        tracking-[0.22em]

                        text-[#F59E3D]

                        sm:text-[11px]
                      "
                    >
                      Client Project
                    </p>

                    {/* ======================================
                        CLIENT NAME
                    ====================================== */}

                    <h3
                      className="
                        shrink-0

                        text-[21px]
                        font-semibold
                        leading-tight

                        tracking-[-0.02em]

                        text-[#171717]

                        sm:text-[23px]
                      "
                    >
                      {testimonial.clientName}
                    </h3>

                    {/* Divider */}

                    <div
                      className="
                        my-5
                        h-px
                        shrink-0
                        bg-[#ebe7dc]
                      "
                    />

                    {/* ======================================
                        QUOTE
                    ====================================== */}

                    <Quote
                      size={25}
                      strokeWidth={1.8}
                      className="
                        mb-3
                        shrink-0
                        text-[#F4C500]
                      "
                    />

                    {/* ======================================
                        FULL TESTIMONIAL TEXT
                    ======================================

                        IMPORTANT:
                        No line-clamp.
                        No text clipping.
                    */}

                    <p
                      className="
                        mb-5

                        text-[14px]
                        leading-[1.65]

                        text-[#77736b]

                        sm:text-[15px]
                      "
                    >
                      “{testimonial.text}”
                    </p>

                    {/* ======================================
                        AUTHOR
                    ====================================== */}

                    <div
                      className="
                        mt-auto
                        shrink-0

                        border-t
                        border-[#ebe7dc]

                        pt-5
                      "
                    >
                      {testimonial.authorName ? (
                        <>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-[#353535]
                            "
                          >
                            {
                              testimonial.authorName
                            }
                          </p>

                          {testimonial.authorRole && (
                            <p
                              className="
                                mt-1
                                text-xs
                                text-[#8b877f]
                              "
                            >
                              {
                                testimonial.authorRole
                              }
                            </p>
                          )}
                        </>
                      ) : (
                        <p
                          className="
                            text-xs
                            text-[#8b877f]
                          "
                        >
                          M3 Hive client project
                        </p>
                      )}
                    </div>
                  </article>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}