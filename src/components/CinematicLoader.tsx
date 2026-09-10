
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
         INITIAL STATE — everything hidden / slightly offset
      ===================================================== */

      gsap.set(loader, { autoAlpha: 1 });
      gsap.set(scene, { scale: 1 });

      gsap.set(glow, {
        autoAlpha: 0,
        scale: 0.85,
      });

      gsap.set(particleElements, {
        autoAlpha: 0,
        scale: 0.6,
        y: 12,
      });

      gsap.set(hexElements, {
        autoAlpha: 0,
        scale: 0.7,
        y: 10,
        rotate: '+=15',
      });

      gsap.set(logo, {
        autoAlpha: 0,
        scale: 0.88,
        y: 22,
      });

      gsap.set([copy, progress], {
        autoAlpha: 0,
        y: 12,
      });

      gsap.set(progressFill, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      gsap.set(shine, {
        autoAlpha: 0,
        xPercent: -170,
      });

      if (percentageRef.current) {
        percentageRef.current.textContent = '0%';
      }

      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      if (reducedMotion) {
        const counter = { value: 0 };
        const tl = gsap.timeline();

        tl.to(logo, { autoAlpha: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0);
        tl.to([copy, progress], { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.15);
        tl.to(progressFill, { scaleX: 1, duration: 0.3, ease: 'sine.inOut' }, 0.25);
        tl.to(counter, {
          value: 100,
          duration: 0.3,
          ease: 'sine.inOut',
          onUpdate: () => {
            if (percentageRef.current) {
              percentageRef.current.textContent = `${Math.round(counter.value)}%`;
            }
          },
          onComplete: () => {
            if (percentageRef.current) percentageRef.current.textContent = '100%';
          },
        }, 0.25);
        tl.to(loader, { autoAlpha: 0, duration: 0.25, ease: 'power2.inOut', onComplete: finish }, 0.65);
        return;
      }

      /* =====================================================
         NORMAL PREMIUM CINEMATIC TIMELINE
         Total runtime: ~3.8 seconds
      ===================================================== */

      const counter = { value: 0 };

      const timeline = gsap.timeline({
        defaults: { overwrite: 'auto' },
      });

      // ── 0.00s  ATMOSPHERE BLOOMS ───────────────────────
      timeline.to(glow, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.1,
        ease: 'power2.out',
      }, 0);

      // ── 0.20s  PARTICLES DRIFT IN (staggered) ─────────
      timeline.to(particleElements, {
        autoAlpha: 0.5,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.045,
        ease: 'power3.out',
      }, 0.2);

      // ── 0.45s  HEXAGONS ROTATE INTO PLACE ─────────────
      timeline.to(hexElements, {
        autoAlpha: 0.75,
        scale: 1,
        y: 0,
        rotate: '-=15',
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      }, 0.45);

      // ── 0.40s  LOGO RISES UP WITH BREATHING SCALE ─────
      timeline.to(logo, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
      }, 0.4);

      // ── 1.05s  COPY + PROGRESS BAR FADE IN ────────────
      timeline.to([copy, progress], {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
      }, 1.05);

      // ── 1.20s  PROGRESS BAR FILLS (slow, satisfying) ──
      timeline.to(progressFill, {
        scaleX: 1,
        duration: 1.1,
        ease: 'power1.inOut',
      }, 1.2);

      timeline.to(counter, {
        value: 100,
        duration: 1.1,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (percentageRef.current) {
            percentageRef.current.textContent = `${Math.round(counter.value)}%`;
          }
        },
        onComplete: () => {
          if (percentageRef.current) percentageRef.current.textContent = '100%';
        },
      }, 1.2);

      // ── 1.50s  SHIMMER LIGHT SWEEP ACROSS LOGO ────────
      timeline.to(shine, { autoAlpha: 0.7, duration: 0.2, ease: 'sine.out' }, 1.5);
      timeline.to(shine, { xPercent: 180, duration: 0.55, ease: 'power2.inOut' }, 1.55);
      timeline.to(shine, { autoAlpha: 0, duration: 0.2, ease: 'sine.in' }, 2.0);

      // ── 2.10s  SUBTLE FLOAT — particles/hex drift ─────
      timeline.to(particleElements, {
        y: '-=6',
        duration: 0.7,
        stagger: 0.03,
        ease: 'sine.inOut',
      }, 2.1);

      timeline.to(hexElements, {
        y: '-=4',
        duration: 0.7,
        stagger: 0.04,
        ease: 'sine.inOut',
      }, 2.1);

      // ── 2.40s  MICRO BREATHE — scene pulses once ──────
      timeline.to(scene, {
        scale: 1.007,
        duration: 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1,
      }, 2.4);

      // ── 2.80s  EXIT: COPY + PROGRESS LIFT & FADE ──────
      timeline.to([copy, progress], {
        autoAlpha: 0,
        y: -10,
        duration: 0.35,
        stagger: 0.07,
        ease: 'power2.in',
      }, 2.8);

      // ── 2.95s  EXIT: BG ELEMENTS DISSOLVE ─────────────
      timeline.to([particleElements, hexElements, glow], {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      }, 2.95);

      // ── 3.05s  EXIT: LOGO LIFTS & FADES ───────────────
      timeline.to(logo, {
        autoAlpha: 0,
        scale: 1.04,
        y: -14,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 3.05);

      // ── 3.30s  EXIT: FULL OVERLAY DISSOLVES ───────────
      timeline.to(loader, {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: finish,
      }, 3.3);

    }, loader);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
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