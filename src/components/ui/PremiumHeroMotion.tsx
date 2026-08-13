import React, {
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';

type HeroMotionVariant =
  | 'services'
  | 'about'
  | 'partners'
  | 'approach'
  | 'risk'
  | 'contact';

interface PremiumHeroMotionProps {
  variant?: HeroMotionVariant;
}

const labels: Record<
  HeroMotionVariant,
  [string, string, string, string]
> = {
  services: [
    'Strategy',
    'Engineering',
    'Experience',
    'Scale',
  ],

  about: [
    'People',
    'Culture',
    'Ideas',
    'Impact',
  ],

  partners: [
    'Connect',
    'Collaborate',
    'Innovate',
    'Grow',
  ],

  approach: [
    'Discover',
    'Design',
    'Build',
    'Evolve',
  ],

  risk: [
    'Protect',
    'Monitor',
    'Govern',
    'Respond',
  ],

  contact: [
    'Connect',
    'Discuss',
    'Create',
    'Deliver',
  ],
};

export const PremiumHeroMotion: React.FC<
  PremiumHeroMotionProps
> = ({
  variant = 'services',
}) => {
  const rootRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      /* =====================================================
         INTRO
      ===================================================== */

      gsap.fromTo(
        q('.premium-orbit-system'),
        {
          opacity: 0,
          scale: 0.88,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        q('.premium-chip'),
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.35,
          ease: 'power3.out',
        },
      );

      /* =====================================================
         ORBIT ROTATION
      ===================================================== */

      gsap.to(
        q('.premium-orbit-left'),
        {
          rotation: 360,
          duration: 18,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
      );

      gsap.to(
        q('.premium-orbit-left-inner'),
        {
          rotation: -360,
          duration: 13,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
      );

      gsap.to(
        q('.premium-orbit-right'),
        {
          rotation: -360,
          duration: 20,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
      );

      gsap.to(
        q('.premium-orbit-right-inner'),
        {
          rotation: 360,
          duration: 15,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        },
      );

      /* =====================================================
         FLOATING CHIPS
      ===================================================== */

      gsap.to(
        q('.premium-chip-a'),
        {
          y: -12,
          x: 5,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        q('.premium-chip-b'),
        {
          y: 10,
          x: -5,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        q('.premium-chip-c'),
        {
          y: -10,
          x: -4,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        q('.premium-chip-d'),
        {
          y: 11,
          x: 4,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      /* =====================================================
         PULSING DOTS
      ===================================================== */

      gsap.to(
        q('.premium-dot'),
        {
          scale: 1.7,
          opacity: 0.35,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.25,
          ease: 'sine.inOut',
        },
      );

      /* =====================================================
         ENERGY FLOW
      ===================================================== */

      gsap.to(
        q('.premium-energy'),
        {
          backgroundPosition: '220% 50%',
          duration: 2.8,
          repeat: -1,
          ease: 'none',
        },
      );

      /* =====================================================
         CINEMATIC SWEEP
      ===================================================== */

      gsap.fromTo(
        q('.premium-sweep'),
        {
          xPercent: -180,
          opacity: 0,
        },
        {
          xPercent: 220,
          opacity: 0.28,
          duration: 4.5,
          repeat: -1,
          repeatDelay: 2,
          ease: 'power1.inOut',
        },
      );

      /* =====================================================
         GLOW BREATHING
      ===================================================== */

      gsap.to(
        q('.premium-glow-left'),
        {
          scale: 1.15,
          opacity: 0.11,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        q('.premium-glow-right'),
        {
          scale: 1.18,
          opacity: 0.1,
          duration: 4.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );
    }, root);

    /* =======================================================
       MOUSE PARALLAX

       IMPORTANT:
       Listen on WINDOW because root uses pointer-events-none.
    ======================================================= */

    const handleMouseMove = (
      event: MouseEvent,
    ) => {
      const x =
        event.clientX /
          window.innerWidth -
        0.5;

      const y =
        event.clientY /
          window.innerHeight -
        0.5;

      gsap.to(
        q('.premium-front'),
        {
          x: x * 18,
          y: y * 12,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        },
      );

      gsap.to(
        q('.premium-back'),
        {
          x: x * -10,
          y: y * -7,
          duration: 1.6,
          ease: 'power2.out',
          overwrite: 'auto',
        },
      );
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove,
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      );

      ctx.revert();
    };
  }, []);

  const currentLabels =
    labels[variant];

  return (
    <div
      ref={rootRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-[2]
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* =====================================================
          CENTER SAFE ZONE
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-10
          h-[58%]
          w-[58%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-black/[0.04]
        "
      />

      {/* =====================================================
          LEFT GLOW
      ===================================================== */}

      <div
        className="
          premium-back
          premium-glow-left
          absolute
          -left-[150px]
          top-1/2
          h-[390px]
          w-[390px]
          -translate-y-1/2
          rounded-full
          bg-hive-yellow/10
          opacity-[0.07]
          blur-[100px]
        "
      />

      {/* =====================================================
          RIGHT GLOW
      ===================================================== */}

      <div
        className="
          premium-back
          premium-glow-right
          absolute
          -right-[150px]
          top-1/2
          h-[400px]
          w-[400px]
          -translate-y-1/2
          rounded-full
          bg-hive-orange/10
          opacity-[0.07]
          blur-[110px]
        "
      />

      {/* =====================================================
          LEFT ORBIT SYSTEM
      ===================================================== */}

      <div
        className="
          premium-orbit-system
          premium-front
          absolute
          -left-[145px]
          top-1/2
          h-[310px]
          w-[310px]
          -translate-y-1/2
        "
      >
        <div
          className="
            premium-orbit-left
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
              shadow-[0_0_22px_rgba(253,207,9,1)]
            "
          />
        </div>

        <div
          className="
            premium-orbit-left-inner
            absolute
            inset-[38px]
            rounded-full
            border
            border-dashed
            border-white/15
          "
        >
          <span
            className="
              absolute
              bottom-[-4px]
              left-1/2
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-white/70
            "
          />
        </div>

        <div
          className="
            absolute
            inset-[88px]
            rounded-full
            border
            border-hive-yellow/15
          "
        />
      </div>

      {/* =====================================================
          RIGHT ORBIT SYSTEM
      ===================================================== */}

      <div
        className="
          premium-orbit-system
          premium-front
          absolute
          -right-[145px]
          top-1/2
          h-[310px]
          w-[310px]
          -translate-y-1/2
        "
      >
        <div
          className="
            premium-orbit-right
            absolute
            inset-0
            rounded-full
            border
            border-hive-orange/30
          "
        >
          <span
            className="
              absolute
              bottom-[-6px]
              left-1/2
              h-3
              w-3
              -translate-x-1/2
              rounded-full
              bg-hive-orange
              shadow-[0_0_22px_rgba(255,151,35,1)]
            "
          />
        </div>

        <div
          className="
            premium-orbit-right-inner
            absolute
            inset-[38px]
            rounded-full
            border
            border-dashed
            border-white/15
          "
        >
          <span
            className="
              absolute
              left-1/2
              top-[-4px]
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-white/70
            "
          />
        </div>

        <div
          className="
            absolute
            inset-[88px]
            rounded-full
            border
            border-hive-yellow/15
          "
        />
      </div>

      {/* =====================================================
          LEFT ENERGY FLOW
      ===================================================== */}

      <div
        className="
          premium-energy
          absolute
          left-0
          top-[31%]
          h-px
          w-[25%]
          bg-[linear-gradient(90deg,transparent,rgba(253,207,9,.9),transparent)]
          bg-[length:220%_100%]
          opacity-40
        "
      />

      {/* =====================================================
          RIGHT ENERGY FLOW
      ===================================================== */}

      <div
        className="
          premium-energy
          absolute
          bottom-[29%]
          right-0
          h-px
          w-[26%]
          bg-[linear-gradient(90deg,transparent,rgba(255,151,35,.85),transparent)]
          bg-[length:220%_100%]
          opacity-40
        "
      />

      {/* =====================================================
          LEFT TOP CHIP
      ===================================================== */}

      <div
        className="
          premium-chip
          premium-chip-a
          premium-front
          absolute
          left-[7%]
          top-[15%]
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-black/35
          px-4
          py-2.5
          backdrop-blur-md
        "
      >
        <span
          className="
            premium-dot
            h-2
            w-2
            rounded-full
            bg-hive-yellow
            shadow-[0_0_10px_rgba(253,207,9,.95)]
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/70
          "
        >
          {currentLabels[0]}
        </span>
      </div>

      {/* =====================================================
          LEFT BOTTOM CHIP
      ===================================================== */}

      <div
        className="
          premium-chip
          premium-chip-b
          premium-front
          absolute
          bottom-[13%]
          left-[11%]
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-black/35
          px-4
          py-2.5
          backdrop-blur-md
        "
      >
        <span
          className="
            premium-dot
            h-2
            w-2
            rounded-full
            bg-hive-yellow
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/70
          "
        >
          {currentLabels[1]}
        </span>
      </div>

      {/* =====================================================
          RIGHT TOP CHIP
      ===================================================== */}

      <div
        className="
          premium-chip
          premium-chip-c
          premium-front
          absolute
          right-[7%]
          top-[15%]
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-black/35
          px-4
          py-2.5
          backdrop-blur-md
        "
      >
        <span
          className="
            premium-dot
            h-2
            w-2
            rounded-full
            bg-hive-orange
            shadow-[0_0_10px_rgba(255,151,35,.95)]
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/70
          "
        >
          {currentLabels[2]}
        </span>
      </div>

      {/* =====================================================
          RIGHT BOTTOM CHIP
      ===================================================== */}

      <div
        className="
          premium-chip
          premium-chip-d
          premium-front
          absolute
          bottom-[14%]
          right-[10%]
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-black/35
          px-4
          py-2.5
          backdrop-blur-md
        "
      >
        <span
          className="
            premium-dot
            h-2
            w-2
            rounded-full
            bg-hive-yellow
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-white/70
          "
        >
          {currentLabels[3]}
        </span>
      </div>

      {/* =====================================================
          SMALL AMBIENT SIGNALS
      ===================================================== */}

      <span
        className="
          premium-dot
          absolute
          left-[27%]
          top-[17%]
          h-1.5
          w-1.5
          rounded-full
          bg-hive-yellow
        "
      />

      <span
        className="
          premium-dot
          absolute
          bottom-[14%]
          left-[31%]
          h-1
          w-1
          rounded-full
          bg-white
        "
      />

      <span
        className="
          premium-dot
          absolute
          right-[28%]
          top-[16%]
          h-1
          w-1
          rounded-full
          bg-white
        "
      />

      <span
        className="
          premium-dot
          absolute
          bottom-[14%]
          right-[30%]
          h-1.5
          w-1.5
          rounded-full
          bg-hive-orange
        "
      />

      {/* =====================================================
          CINEMATIC SWEEP
      ===================================================== */}

      <div
        className="
          premium-sweep
          absolute
          -left-[20%]
          top-[-20%]
          h-[140%]
          w-[14%]
          rotate-[12deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
          blur-xl
        "
      />

      {/* =====================================================
          VIGNETTES
      ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-20
          bg-gradient-to-b
          from-black/20
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-24
          bg-gradient-to-t
          from-black/20
          to-transparent
        "
      />
    </div>
  );
};