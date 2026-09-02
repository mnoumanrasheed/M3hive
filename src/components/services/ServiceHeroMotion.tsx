import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

interface ServiceHeroMotionProps {
  imageUrl: string;
}

const PARTICLES = [
  { left: '58%', top: '18%', size: 6, tone: 'yellow' },
  { left: '66%', top: '28%', size: 4, tone: 'white' },
  { left: '75%', top: '16%', size: 5, tone: 'orange' },
  { left: '83%', top: '34%', size: 4, tone: 'yellow' },
  { left: '61%', top: '55%', size: 4, tone: 'white' },
  { left: '72%', top: '68%', size: 6, tone: 'orange' },
  { left: '87%', top: '61%', size: 4, tone: 'yellow' },
  { left: '92%', top: '22%', size: 4, tone: 'white' },
  { left: '79%', top: '78%', size: 5, tone: 'orange' },
  { left: '55%', top: '75%', size: 4, tone: 'yellow' },
  { left: '69%', top: '43%', size: 4, tone: 'white' },
  { left: '90%', top: '48%', size: 5, tone: 'orange' },
] as const;

export const ServiceHeroMotion: React.FC<ServiceHeroMotionProps> = ({
  imageUrl,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const orbitOuterRef = useRef<HTMLDivElement | null>(null);
  const orbitInnerRef = useRef<HTMLDivElement | null>(null);
  const orbitMidRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  const energyTopRef = useRef<HTMLDivElement | null>(null);
  const energyBottomRef = useRef<HTMLDivElement | null>(null);
  const sweepRef = useRef<HTMLDivElement | null>(null);

  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Track if device supports hover (disable parallax on touch devices)
  const supportsHover = useRef(true);

  useLayoutEffect(() => {
    // Detect touch devices to disable parallax
    supportsHover.current = window.matchMedia('(hover: hover)').matches;
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      /* =============================================
         BACKGROUND CINEMATIC PAN / ZOOM
      ============================================= */

      if (imageRef.current) {
        gsap.set(imageRef.current, {
          scale: 1.06,
          xPercent: supportsHover.current ? -1 : 0,
          yPercent: supportsHover.current ? -0.4 : 0,
          transformOrigin: '50% 50%',
          force3D: true,
        });

        gsap.to(imageRef.current, {
          scale: 1.12,
          xPercent: supportsHover.current ? 1.1 : 0,
          yPercent: supportsHover.current ? 0.7 : 0,
          duration: 16,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          force3D: true,
        });
      }

      /* =============================================
         GOLDEN AMBIENT GLOW
      ============================================= */

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          x: -25,
          y: 20,
          scale: 0.94,
          opacity: 0.1,
        });

        gsap.to(glowRef.current, {
          x: 35,
          y: -25,
          scale: 1.08,
          opacity: 0.2,
          duration: 7,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      /* =============================================
         ORBIT SYSTEM
      ============================================= */

      if (orbitOuterRef.current) {
        gsap.to(orbitOuterRef.current, {
          rotation: 360,
          duration: 18,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }

      if (orbitInnerRef.current) {
        gsap.to(orbitInnerRef.current, {
          rotation: -360,
          duration: 12,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }

      if (orbitMidRef.current) {
        gsap.fromTo(
          orbitMidRef.current,
          {
            scale: 0.96,
            opacity: 0.25,
          },
          {
            scale: 1.06,
            opacity: 0.55,
            duration: 3.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        );
      }

      /* =============================================
         CORE PULSE
      ============================================= */

      if (coreRef.current) {
        gsap.set(coreRef.current, {
          xPercent: -50,
          yPercent: -50,
        });

        gsap.fromTo(
          coreRef.current,
          {
            scale: 0.9,
            opacity: 0.7,
          },
          {
            scale: 1.1,
            opacity: 1,
            duration: 2.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        );
      }

      /* =============================================
         FLOATING PARTICLES
      ============================================= */

      particleRefs.current.forEach((particle, index) => {
        if (!particle) return;

        const direction = index % 2 === 0 ? 1 : -1;

        const moveX =
          direction * (24 + (index % 4) * 8);

        const moveY =
          -direction * (20 + (index % 5) * 7);

        gsap.set(particle, {
          opacity: 0.3 + (index % 3) * 0.1,
          scale: 0.75,
          force3D: true,
        });

        gsap.to(particle, {
          x: moveX,
          y: moveY,

          scale:
            1.1 + (index % 3) * 0.08,

          opacity: 0.9,

          duration:
            3.5 + (index % 4) * 0.8,

          delay:
            -(index * 0.35),

          ease: 'sine.inOut',

          repeat: -1,
          yoyo: true,

          force3D: true,
        });
      });

      /* =============================================
         ENERGY LINES
      ============================================= */

      [
        energyTopRef.current,
        energyBottomRef.current,
      ].forEach((line, index) => {
        if (!line) return;

        gsap.fromTo(
          line,
          {
            backgroundPosition: '220% 50%',
          },
          {
            backgroundPosition: '-120% 50%',
            duration: 2.8 + index * 0.5,
            ease: 'none',
            repeat: -1,
          }
        );
      });

      /* =============================================
         CINEMATIC LIGHT SWEEP
      ============================================= */

      if (sweepRef.current) {
        gsap.set(sweepRef.current, {
          xPercent: -200,
          opacity: 0,
        });

        const sweepTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 4,
        });

        sweepTimeline

          .to(sweepRef.current, {
            opacity: 0.16,
            duration: 0.5,
          })

          .to(
            sweepRef.current,
            {
              xPercent: 950,
              duration: 3,
              ease: 'power1.inOut',
            },
            '<'
          )

          .to(
            sweepRef.current,
            {
              opacity: 0,
              duration: 0.8,
            },
            '-=0.8'
          )

          .set(sweepRef.current, {
            xPercent: -200,
          });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [imageUrl]);

  return (
    <div
      ref={rootRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* =============================================
          BACKGROUND IMAGE
      ============================================= */}

      <div
        ref={imageRef}
        className="
          absolute
          -inset-[6%]

          transform-gpu

          bg-cover
          bg-center
          bg-no-repeat

          will-change-transform
        "
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      />

      {/* =============================================
          BASE DARK OVERLAY

          Gives every service image consistent contrast.
      ============================================= */}

      <div
        className="
          absolute
          inset-0
          z-[1]

          bg-black/30
        "
      />

      {/* =============================================
          STRONG LEFT READABILITY

          This is the important layer for title/subtitle.
      ============================================= */}

      <div
        className="
          absolute
          inset-0
          z-[1]

          bg-gradient-to-r

          from-black/95
          via-black/75
          to-black/10
        "
      />

      {/* =============================================
          SECOND TEXT-SIDE SHADE
      ============================================= */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          z-[1]

          w-[70%]

          bg-gradient-to-r

          from-black/50
          via-black/20
          to-transparent
        "
      />

      {/* =============================================
          TOP/BOTTOM CINEMATIC SHADE
      ============================================= */}

      <div
        className="
          absolute
          inset-0
          z-[1]

          bg-gradient-to-b

          from-black/15
          via-transparent
          to-black/65
        "
      />

      {/* =============================================
          GOLDEN MOVING GLOW
      ============================================= */}

      <div
        ref={glowRef}
        className="
          absolute

          right-[-10%]
          top-[5%]

          z-[2]

          h-[520px]
          w-[520px]

          rounded-full

          blur-[110px]

          sm:h-[650px]
          sm:w-[650px]
        "
        style={{
          background:
            'radial-gradient(circle, rgba(253,207,9,.45) 0%, rgba(255,151,35,.18) 35%, rgba(255,151,35,.04) 58%, transparent 72%)',
        }}
      />

      {/* =============================================
          PREMIUM ORBIT SYSTEM - RESPONSIVE SCALING
      ============================================= */}

      <div
        className="
          absolute

          right-[-120px]
          top-1/2

          z-[3]

          hidden

          h-[220px]
          w-[220px]

          -translate-y-1/2

          opacity-70

          sm:h-[260px]
          sm:w-[260px]
          sm:right-[-80px]
          
          md:h-[300px]
          md:w-[300px]
          md:right-[-60px]
          md:block

          lg:h-[340px]
          lg:w-[340px]
          lg:right-[-40px]

          xl:right-[3%]
          xl:h-[430px]
          xl:w-[430px]
        "
      >
        {/* OUTER */}

        <div
          ref={orbitOuterRef}
          className="
            absolute
            inset-0

            rounded-full

            border
            border-hive-yellow/30
          "
        >
          <span
            className="
              absolute

              left-1/2
              top-[-6px]

              h-3
              w-3

              -translate-x-1/2

              rounded-full

              bg-hive-yellow

              shadow-[0_0_26px_rgba(253,207,9,.95)]
            "
          />
        </div>

        {/* INNER */}

        <div
          ref={orbitInnerRef}
          className="
            absolute
            inset-[55px]

            rounded-full

            border
            border-dashed
            border-white/18
          "
        >
          <span
            className="
              absolute

              bottom-[-5px]
              left-1/2

              h-2.5
              w-2.5

              -translate-x-1/2

              rounded-full

              bg-hive-orange

              shadow-[0_0_20px_rgba(255,151,35,.9)]
            "
          />
        </div>

        {/* MID */}

        <div
          ref={orbitMidRef}
          className="
            absolute
            inset-[112px]

            rounded-full

            border
            border-hive-yellow/15
          "
        />

        {/* CORE */}

        <div
          ref={coreRef}
          className="
            absolute

            left-1/2
            top-1/2

            h-28
            w-28

            rounded-full

            border
            border-white/10

            bg-black/20

            backdrop-blur-[3px]
          "
        >
          <div
            className="
              absolute

              left-1/2
              top-1/2

              h-3
              w-3

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-hive-yellow

              shadow-[0_0_32px_rgba(253,207,9,1)]
            "
          />
        </div>
      </div>

      {/* =============================================
          MOVING PARTICLES
      ============================================= */}

      <div
        className="
          absolute
          inset-0
          z-[3]
        "
      >
        {PARTICLES.map(
          (particle, index) => {
            const toneClass =
              particle.tone === 'yellow'
                ? `
                  bg-hive-yellow
                  shadow-[0_0_16px_rgba(253,207,9,.9)]
                `
                : particle.tone ===
                    'orange'
                  ? `
                    bg-hive-orange
                    shadow-[0_0_14px_rgba(255,151,35,.85)]
                  `
                  : `
                    bg-white/80
                    shadow-[0_0_10px_rgba(255,255,255,.55)]
                  `;

            return (
              <span
                key={index}
                ref={(element) => {
                  particleRefs.current[
                    index
                  ] = element;
                }}
                className={`
                  absolute
                  rounded-full
                  ${toneClass}
                `}
                style={{
                  left: particle.left,
                  top: particle.top,

                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
              />
            );
          }
        )}
      </div>

      {/* =============================================
          ENERGY LINE 1
      ============================================= */}

      <div
        ref={energyTopRef}
        className="
          absolute

          right-0
          top-[31%]

          z-[3]

          hidden

          h-px
          w-[35%]

          opacity-45

          md:block
        "
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(253,207,9,.8), rgba(255,255,255,.55), transparent)',

          backgroundSize: '220% 100%',
        }}
      />

      {/* =============================================
          ENERGY LINE 2
      ============================================= */}

      <div
        ref={energyBottomRef}
        className="
          absolute

          bottom-[28%]
          right-0

          z-[3]

          hidden

          h-px
          w-[28%]

          opacity-35

          md:block
        "
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,151,35,.75), rgba(255,255,255,.5), transparent)',

          backgroundSize: '220% 100%',
        }}
      />

      {/* =============================================
          LIGHT SWEEP
      ============================================= */}

      <div
        ref={sweepRef}
        className="
          absolute

          -left-[25%]
          -top-[20%]

          z-[4]

          h-[140%]
          w-[14%]

          rotate-[12deg]

          opacity-0

          blur-2xl
        "
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.02) 20%, rgba(253,207,9,.14) 50%, rgba(255,151,35,.04) 80%, transparent 100%)',
        }}
      />

      {/* =============================================
          FINAL PREMIUM VIGNETTE
      ============================================= */}

      <div
        className="
          absolute
          inset-0
          z-[5]
        "
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,.28) 100%)',
        }}
      />
    </div>
  );
};