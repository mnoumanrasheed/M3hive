
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
  { length: 18 },
  (_, index) => ({
    left: `${7 + ((index * 31) % 86)}%`,
    top: `${12 + ((index * 47) % 72)}%`,
    size: index % 5 === 0 ? 3 : 2,
  })
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

  /*
   * Direct reference to percentage.
   * More reliable than querying it through
   * gsap.utils.selector().
   */
  const percentageRef =
    useRef<HTMLSpanElement | null>(null);

  const reducedMotion =
    usePrefersReducedMotion();

  useLayoutEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    let completed = false;

    const finish = () => {
      if (completed) return;

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

      const scene =
        select('.cinematic-scene');

      const glow =
        select('.cinematic-glow');

      const particleElements =
        select('.cinematic-particle');

      const hexElements =
        select('.cinematic-hex');

      const shine =
        select('.cinematic-shine');

      /* =====================================================
         INITIAL STATES

         IMPORTANT:
         Everything starts very close to its final position.

         This prevents the animation from feeling like a
         sudden zoom or jump.
      ===================================================== */

      gsap.set(glow, {
        autoAlpha: 0,
        scale: 0.94,
      });

      gsap.set(particleElements, {
        autoAlpha: 0,
        scale: 0.92,
      });

      gsap.set(hexElements, {
        autoAlpha: 0,
        scale: 0.88,
      });

      gsap.set(logo, {
        autoAlpha: 0,

        /*
         * Very subtle scale difference.
         *
         * Old:
         * 0.78 / 0.90
         *
         * New:
         * 0.94
         */
        scale: 0.94,

        y: 5,

        rotationX: 1.5,
        rotationY: -2,

        filter: 'blur(2px)',
      });

      gsap.set(
        [copy, progress],
        {
          autoAlpha: 0,
          y: 4,
        }
      );

      gsap.set(
        progressFill,
        {
          scaleX: 0,
          transformOrigin:
            'left center',
        }
      );

      gsap.set(
        shine,
        {
          autoAlpha: 0,
          xPercent: -160,
        }
      );

      gsap.set(
        scene,
        {
          scale: 1,
        }
      );

      /*
       * Always reset percentage.
       */
      if (percentageRef.current) {
        percentageRef.current.textContent =
          '0%';
      }

      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      if (reducedMotion) {
        const reducedCounter = {
          value: 0,
        };

        const reducedTimeline =
          gsap.timeline();

        reducedTimeline
          .to(
            logo,
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,

              rotationX: 0,
              rotationY: 0,

              filter: 'blur(0px)',

              duration: 0.45,

              ease: 'power1.out',
            },
            0
          )

          .to(
            [copy, progress],
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.3,

              ease: 'power1.out',
            },
            0.3
          )

          .to(
            progressFill,
            {
              scaleX: 1,

              duration: 0.7,

              ease: 'sine.inOut',
            },
            0.4
          )

          .to(
            reducedCounter,
            {
              value: 100,

              duration: 0.7,

              ease: 'sine.inOut',

              onUpdate: () => {
                if (
                  percentageRef.current
                ) {
                  percentageRef.current.textContent =
                    `${Math.round(
                      reducedCounter.value
                    )}%`;
                }
              },

              onComplete: () => {
                if (
                  percentageRef.current
                ) {
                  percentageRef.current.textContent =
                    '100%';
                }
              },
            },
            0.4
          )

          .to(
            loader,
            {
              autoAlpha: 0,

              duration: 0.4,

              ease: 'sine.inOut',

              onComplete: finish,
            },
            1.25
          );

        return;
      }

      /* =====================================================
         PERCENTAGE COUNTER
      ===================================================== */

      const counter = {
        value: 0,
      };

      /* =====================================================
         MAIN PREMIUM CINEMATIC TIMELINE

         Total:
         approximately 9 seconds
      ===================================================== */

      const timeline =
        gsap.timeline();

      /* =====================================================
         0.0s
         BACKGROUND ATMOSPHERE
      ===================================================== */

      timeline.to(
        glow,
        {
          autoAlpha: 1,

          scale: 1,

          duration: 2.4,

          ease: 'sine.out',
        },
        0
      );

      /* =====================================================
         0.35s
         PARTICLES SLOWLY APPEAR
      ===================================================== */

      timeline.to(
        particleElements,
        {
          autoAlpha: 0.48,

          scale: 1,

          duration: 2.1,

          stagger: 0.055,

          ease: 'sine.out',
        },
        0.35
      );

      /* =====================================================
         0.75s
         HEXAGONS SLOWLY ASSEMBLE
      ===================================================== */

      timeline.to(
        hexElements,
        {
          autoAlpha: 0.88,

          scale: 1,

          rotation: 0,

          duration: 2.25,

          stagger: 0.12,

          ease: 'power1.out',
        },
        0.75
      );

      /* =====================================================
         1.15s
         LOGO PREMIUM REVEAL
      ===================================================== */

      timeline.to(
        logo,
        {
          autoAlpha: 1,

          scale: 1,

          y: 0,

          rotationX: 0,
          rotationY: 0,

          filter: 'blur(0px)',

          /*
           * Slow enough to feel cinematic,
           * but because starting scale is 0.94
           * it does not look like a big zoom.
           */
          duration: 2.7,

          ease: 'sine.out',
        },
        1.15
      );

      /* =====================================================
         2.65s
         INITIALIZING EXPERIENCE APPEARS
      ===================================================== */

      timeline.to(
        [copy, progress],
        {
          autoAlpha: 1,

          y: 0,

          duration: 1,

          stagger: 0.12,

          ease: 'sine.out',
        },
        2.65
      );

      /* =====================================================
         2.90s → 7.10s
         PROGRESS BAR

         SAME timing as percentage.
      ===================================================== */

      timeline.to(
        progressFill,
        {
          scaleX: 1,

          duration: 4.2,

          ease: 'sine.inOut',
        },
        2.9
      );

      /* =====================================================
         2.90s → 7.10s
         0% → 100%
      ===================================================== */

      timeline.to(
        counter,
        {
          value: 100,

          duration: 4.2,

          ease: 'sine.inOut',

          onUpdate: () => {
            if (
              percentageRef.current
            ) {
              percentageRef.current.textContent =
                `${Math.round(
                  counter.value
                )}%`;
            }
          },

          onComplete: () => {
            /*
             * Guarantee exact 100%.
             */
            if (
              percentageRef.current
            ) {
              percentageRef.current.textContent =
                '100%';
            }
          },
        },
        2.9
      );

      /* =====================================================
         3.60s
         METALLIC SHINE APPEARS
      ===================================================== */

      timeline.to(
        shine,
        {
          autoAlpha: 0.68,

          duration: 0.4,

          ease: 'sine.out',
        },
        3.6
      );

      /* =====================================================
         3.75s → 6.15s
         SLOW METALLIC SWEEP
      ===================================================== */

      timeline.to(
        shine,
        {
          xPercent: 170,

          duration: 2.4,

          ease: 'sine.inOut',
        },
        3.75
      );

      /* =====================================================
         6.15s
         SHINE DISAPPEARS
      ===================================================== */

      timeline.to(
        shine,
        {
          autoAlpha: 0,

          duration: 0.55,

          ease: 'sine.out',
        },
        6.15
      );

      /* =====================================================
         7.10s
         100% COMPLETE

         Short cinematic hold.
      ===================================================== */

      timeline.to(
        scene,
        {
          scale: 1.008,

          duration: 1.05,

          ease: 'sine.inOut',
        },
        7.15
      );

      /* =====================================================
         8.00s
         SLOW CINEMATIC EXIT

         Very important:
         long fade prevents abrupt transition.
      ===================================================== */

      timeline.to(
        loader,
        {
          autoAlpha: 0,

          duration: 1.2,

          ease: 'sine.inOut',

          onComplete: finish,
        },
        8
      );

      /* =====================================================
         AMBIENT PARTICLE MOVEMENT

         Much slower than previous versions.
      ===================================================== */

      gsap.to(
        particleElements,
        {
          x: '+=4',
          y: '-=5',

          duration: 7,

          stagger: 0.08,

          ease: 'sine.inOut',

          yoyo: true,

          repeat: -1,
        }
      );

      /* =====================================================
         AMBIENT HEXAGON MOVEMENT

         Very subtle.
      ===================================================== */

      gsap.to(
        hexElements,
        {
          y: '+=2',

          duration: 6,

          stagger: 0.14,

          ease: 'sine.inOut',

          yoyo: true,

          repeat: -1,

          delay: 3.5,
        }
      );

      /*
       * IMPORTANT:
       *
       * There is intentionally NO separate
       * logo breathing tween here.
       *
       * Previous logo breathing animation
       * was changing scale while the main
       * timeline was also changing scale.
       *
       * That can make the logo feel jerky
       * or sudden.
       */
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

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[999999]
        h-[100dvh]
        w-screen
        overflow-hidden
        bg-[#020202]
      "
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
          blur-[110px]
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
          blur-[100px]
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
                shadow-[0_0_8px_rgba(253,207,9,0.7)]
              "
              style={{
                left:
                  particle.left,

                top:
                  particle.top,

                width:
                  particle.size,

                height:
                  particle.size,
              }}
            />
          )
        )}
      </div>

      {/* =====================================================
          MAIN CINEMATIC SCENE
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
        style={{
          perspective: '1000px',

          transformStyle:
            'preserve-3d',
        }}
      >
        <div
          className="
            relative
            h-[25rem]
            w-[min(94vw,44rem)]
          "
          style={{
            transformStyle:
              'preserve-3d',
          }}
        >
          {/* =================================================
              HEXAGONS
          ================================================= */}

          {hexagons.map(
            (
              hexagon,
              index
            ) => (
              <span
                key={index}
                className="
                  cinematic-hex
                  pointer-events-none
                  absolute
                  border
                  border-[#fdcf09]/75
                  bg-[#f69822]/[0.025]
                "
                style={{
                  left:
                    hexagon.left,

                  top:
                    hexagon.top,

                  width:
                    hexagon.size,

                  height:
                    hexagon.size,

                  clipPath:
                    'polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0 50%)',

                  transform:
                    `rotate(${hexagon.rotate}deg)`,
                }}
              />
            )
          )}

          {/* =================================================
              CENTER
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
                src="/assets/brand/m3hive-logo.png"
                alt="M3 Hive"
                draggable="false"
              />

              {/* Metallic sweep */}

              <span
                className="
                  cinematic-shine
                  pointer-events-none
                  absolute
                  inset-y-[-25%]
                  left-0
                  z-20
                  w-[28%]
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/75
                  to-[#fbe176]/20
                  blur-md
                  mix-blend-screen
                "
              />
            </div>

            {/* ===============================================
                INITIALIZING
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
              Initializing Experience

              <span
                ref={
                  percentageRef
                }
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
          shadow-[inset_0_0_160px_65px_rgba(0,0,0,0.70)]
        "
      />
    </div>
  );
}