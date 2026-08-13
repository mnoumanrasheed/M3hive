
import {
  useLayoutEffect,
  useRef,
} from 'react';

import { gsap } from '../lib/gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

/* =========================================================
   PARTICLES
========================================================= */

const particles = Array.from(
  { length: 16 },
  (_, index) => ({
    left: `${7 + ((index * 31) % 86)}%`,
    top: `${12 + ((index * 47) % 72)}%`,
    size: index % 5 === 0 ? 3 : 2,
  }),
);

/* =========================================================
   HEXAGONS
========================================================= */

const hexagons = [
  {
    left: '12%',
    top: '18%',
    size: 42,
    rotate: -18,
  },
  {
    left: '78%',
    top: '16%',
    size: 54,
    rotate: 16,
  },
  {
    left: '7%',
    top: '58%',
    size: 32,
    rotate: 20,
  },
  {
    left: '87%',
    top: '60%',
    size: 36,
    rotate: -18,
  },
  {
    left: '24%',
    top: '76%',
    size: 28,
    rotate: 12,
  },
  {
    left: '70%',
    top: '75%',
    size: 30,
    rotate: -14,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export function CinematicLoader({
  onComplete,
}: CinematicLoaderProps) {
  const loaderRef =
    useRef<HTMLDivElement | null>(null);

  const percentageRef =
    useRef<HTMLSpanElement | null>(null);

  const reducedMotion =
    usePrefersReducedMotion();

  useLayoutEffect(() => {
    const loader = loaderRef.current;

    if (!loader) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    let completed = false;

    const finish = () => {
      if (completed) {
        return;
      }

      completed = true;

      document.body.style.overflow =
        previousOverflow;

      onComplete();
    };

    const ctx = gsap.context(() => {
      const select =
        gsap.utils.selector(loader);

      const logo =
        select('.cinematic-logo');

      const copy =
        select('.cinematic-copy');

      const progress =
        select('.cinematic-progress');

      const progressFill =
        select('.cinematic-progress-fill');

      const glow =
        select('.cinematic-glow');

      const particleElements =
        select('.cinematic-particle');

      const hexElements =
        select('.cinematic-hex');

      const shine =
        select('.cinematic-shine');

      const scene =
        select('.cinematic-scene');

      /* =====================================================
         INITIAL STATE

         Keep everything near its final position.
         This prevents sudden zooms / jumps.
      ===================================================== */

      gsap.set(loader, {
        autoAlpha: 1,
      });

      gsap.set(scene, {
        scale: 1,
      });

      gsap.set(glow, {
        autoAlpha: 0,
        scale: 0.97,
      });

      gsap.set(particleElements, {
        autoAlpha: 0,
        scale: 0.9,
        y: 3,
      });

      gsap.set(hexElements, {
        autoAlpha: 0,
        scale: 0.96,
        y: 3,
      });

      /*
       * No blur.
       * No rotationX.
       * No rotationY.
       *
       * These were contributing to the
       * unstable / glitchy logo appearance.
       */
      gsap.set(logo, {
        autoAlpha: 0,
        scale: 0.97,
        y: 8,
      });

      gsap.set(
        [copy, progress],
        {
          autoAlpha: 0,
          y: 5,
        },
      );

      gsap.set(progressFill, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      gsap.set(shine, {
        autoAlpha: 0,
        xPercent: -170,
      });

      if (percentageRef.current) {
        percentageRef.current.textContent =
          '0%';
      }

      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      if (reducedMotion) {
        const counter = {
          value: 0,
        };

        const tl = gsap.timeline();

        tl.to(
          logo,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          0,
        );

        tl.to(
          [copy, progress],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.2,
        );

        tl.to(
          progressFill,
          {
            scaleX: 1,
            duration: 0.65,
            ease: 'sine.inOut',
          },
          0.3,
        );

        tl.to(
          counter,
          {
            value: 100,
            duration: 0.65,
            ease: 'sine.inOut',

            onUpdate: () => {
              if (percentageRef.current) {
                percentageRef.current.textContent =
                  `${Math.round(counter.value)}%`;
              }
            },

            onComplete: () => {
              if (percentageRef.current) {
                percentageRef.current.textContent =
                  '100%';
              }
            },
          },
          0.3,
        );

        tl.to(
          loader,
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: finish,
          },
          1.15,
        );

        return;
      }

      /* =====================================================
         NORMAL PREMIUM CINEMATIC TIMELINE
      ===================================================== */

      const counter = {
        value: 0,
      };

      const timeline = gsap.timeline({
        defaults: {
          overwrite: 'auto',
        },
      });

      /* =====================================================
         0.00s
         ATMOSPHERE
      ===================================================== */

      timeline.to(
        glow,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.6,
          ease: 'sine.out',
        },
        0,
      );

      /* =====================================================
         0.15s
         PARTICLES
      ===================================================== */

      timeline.to(
        particleElements,
        {
          autoAlpha: 0.4,
          scale: 1,
          y: 0,
          duration: 1.3,
          stagger: 0.035,
          ease: 'power2.out',
        },
        0.15,
      );

      /* =====================================================
         0.35s
         HEXAGONS
      ===================================================== */

      timeline.to(
        hexElements,
        {
          autoAlpha: 0.7,
          scale: 1,
          y: 0,
          duration: 1.3,
          stagger: 0.065,
          ease: 'power2.out',
        },
        0.35,
      );

      /* =====================================================
         0.55s
         LOGO REVEAL
      ===================================================== */

      timeline.to(
        logo,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.25,
          ease: 'power3.out',
        },
        0.55,
      );

      /* =====================================================
         1.40s
         TEXT + PROGRESS APPEAR
      ===================================================== */

      timeline.to(
        [copy, progress],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
        },
        1.4,
      );

      /* =====================================================
         1.65s - 4.15s
         PROGRESS
      ===================================================== */

      timeline.to(
        progressFill,
        {
          scaleX: 1,
          duration: 2.5,
          ease: 'power2.inOut',
        },
        1.65,
      );

      timeline.to(
        counter,
        {
          value: 100,
          duration: 2.5,
          ease: 'power2.inOut',

          onUpdate: () => {
            if (percentageRef.current) {
              percentageRef.current.textContent =
                `${Math.round(counter.value)}%`;
            }
          },

          onComplete: () => {
            if (percentageRef.current) {
              percentageRef.current.textContent =
                '100%';
            }
          },
        },
        1.65,
      );

      /* =====================================================
         2.00s
         PREMIUM LIGHT SWEEP
      ===================================================== */

      timeline.to(
        shine,
        {
          autoAlpha: 0.6,
          duration: 0.25,
          ease: 'sine.out',
        },
        2,
      );

      timeline.to(
        shine,
        {
          xPercent: 180,
          duration: 1.55,
          ease: 'power2.inOut',
        },
        2.05,
      );

      timeline.to(
        shine,
        {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'sine.out',
        },
        3.4,
      );

      /* =====================================================
         VERY SUBTLE ENVIRONMENT MOVEMENT

         This is part of the SAME timeline.
         No repeat:-1.
      ===================================================== */

      timeline.to(
        particleElements,
        {
          y: -3,
          duration: 2.2,
          stagger: 0.02,
          ease: 'sine.inOut',
        },
        1.2,
      );

      timeline.to(
        hexElements,
        {
          y: -2,
          duration: 2.3,
          stagger: 0.03,
          ease: 'sine.inOut',
        },
        1.3,
      );

      /* =====================================================
         4.15s
         100% MICRO HOLD
      ===================================================== */

      timeline.to(
        scene,
        {
          scale: 1.004,
          duration: 0.35,
          ease: 'sine.inOut',
        },
        4.15,
      );

      /* =====================================================
         4.35s
         COPY DISAPPEARS FIRST
      ===================================================== */

      timeline.to(
        [copy, progress],
        {
          autoAlpha: 0,
          y: -4,
          duration: 0.35,
          ease: 'power2.in',
        },
        4.35,
      );

      /* =====================================================
         4.45s
         BACKGROUND ELEMENTS SOFTEN
      ===================================================== */

      timeline.to(
        [
          particleElements,
          hexElements,
          glow,
        ],
        {
          autoAlpha: 0,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        4.45,
      );

      /* =====================================================
         4.50s
         LOGO SOFT EXIT
      ===================================================== */

      timeline.to(
        logo,
        {
          autoAlpha: 0,
          scale: 1.012,
          y: -2,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        4.5,
      );

      /* =====================================================
         4.75s - 5.65s
         FULL OVERLAY DISSOLVE

         Website underneath is revealed smoothly.
      ===================================================== */

      timeline.to(
        loader,
        {
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power2.inOut',

          onComplete: finish,
        },
        4.75,
      );
    }, loader);

    return () => {
      ctx.revert();

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    onComplete,
    reducedMotion,
  ]);

  return (
    <div
      ref={loaderRef}
      role="status"
      aria-label="Loading M3 Hive"
      className="
        fixed
        inset-0
        z-[999999]
        h-[100dvh]
        w-screen
        overflow-hidden
        bg-[#020202]
      "
      style={{
        willChange: 'opacity',
      }}
    >
      {/* =====================================================
          MAIN GOLDEN GLOW
      ===================================================== */}

      <div
        className="
          cinematic-glow
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[420px]
          w-[620px]
          max-w-[90vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#fdcf09]/10
          blur-[50px]
          md:blur-[100px]
        "
      />

      {/* =====================================================
          SECONDARY ORANGE GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[10%]
          top-[15%]
          z-0
          h-[220px]
          w-[220px]
          rounded-full
          bg-[#f69822]/5
          blur-[45px]
          md:blur-[90px]
        "
      />

      {/* =====================================================
          PARTICLES
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
        "
      >
        {particles.map(
          (particle, index) => (
            <span
              key={index}
              className="
                cinematic-particle
                absolute
                rounded-full
                bg-[#fbe176]
                shadow-[0_0_8px_rgba(253,207,9,0.65)]
              "
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                willChange:
                  'transform, opacity',
              }}
            />
          ),
        )}
      </div>

      {/* =====================================================
          MAIN SCENE
      ===================================================== */}

      <div
        className="
          cinematic-scene
          absolute
          inset-0
          z-[2]
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            relative
            h-[25rem]
            w-[min(94vw,44rem)]
          "
        >
          {/* =================================================
              HEXAGONS
          ================================================= */}

          {hexagons.map(
            (hexagon, index) => (
              <span
                key={index}
                className="
                  cinematic-hex
                  pointer-events-none
                  absolute
                  border
                  border-[#fdcf09]/60
                  bg-[#f69822]/[0.02]
                "
                style={{
                  left: hexagon.left,
                  top: hexagon.top,
                  width: hexagon.size,
                  height: hexagon.size,

                  clipPath:
                    'polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0 50%)',

                  rotate:
                    `${hexagon.rotate}deg`,

                  willChange:
                    'transform, opacity',
                }}
              />
            ),
          )}

          {/* =================================================
              CENTER CONTENT
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-10
              w-full
              -translate-x-1/2
              -translate-y-1/2
              text-center
            "
          >
            {/* ===============================================
                LOGO
            =============================================== */}

            <div
              className="
                relative
                mx-auto
                w-fit
                max-w-full
                overflow-hidden
              "
            >
              <img
                className="
                  cinematic-logo
                  mx-auto
                  block
                  w-[240px]
                  max-w-[calc(100vw-48px)]
                  select-none
                  sm:w-[320px]
                  md:w-[400px]
                  lg:w-[500px]
                  xl:w-[540px]
                "
                style={{
                  willChange:
                    'transform, opacity',
                }}
                src="/assets/brand/m3hive-logo.png"
                alt="M3 Hive"
                draggable="false"
              />

              {/* =============================================
                  LIGHT SWEEP
              ============================================= */}

              <span
                className="
                  cinematic-shine
                  pointer-events-none
                  absolute
                  inset-y-[-25%]
                  left-0
                  z-20
                  w-[24%]
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-[#fbe176]/20
                  blur-md
                  mix-blend-screen
                "
              />
            </div>

            {/* ===============================================
                LOADING COPY
            =============================================== */}

            <p
              className="
                cinematic-copy
                mb-0
                mt-7
                font-['Space_Grotesk']
                text-[9px]
                font-medium
                uppercase
                tracking-[0.36em]
                text-[#fbe176]
                sm:text-[10px]
              "
            >
              Reprogramming the world

              <span
                ref={percentageRef}
                className="
                  cinematic-percent
                  ml-3
                  text-white/70
                "
              >
                0%
              </span>
            </p>

            {/* ===============================================
                PROGRESS BAR
            =============================================== */}

            <div
              className="
                cinematic-progress
                mx-auto
                mt-4
                h-px
                w-[min(60vw,14rem)]
                overflow-hidden
                bg-white/15
              "
            >
              <div
                className="
                  cinematic-progress-fill
                  h-full
                  w-full
                  bg-gradient-to-r
                  from-[#f69822]
                  via-[#fdcf09]
                  to-[#fbe176]
                  shadow-[0_0_8px_rgba(253,207,9,0.8)]
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CINEMATIC VIGNETTE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[30]
          shadow-[inset_0_0_150px_55px_rgba(0,0,0,0.68)]
        "
      />
    </div>
  );
}