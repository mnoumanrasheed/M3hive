import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface CinematicServiceHeroProps {
  imageUrl: string;
}

export const CinematicServiceHero: React.FC<
  CinematicServiceHeroProps
> = ({ imageUrl }) => {
  /*
   * Main hero container.
   */
  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
   * CAMERA layer:
   * Handles permanent cinematic motion:
   *
   * left -> right
   * up -> down
   * zoom in/out
   */
  const cameraRef =
    useRef<HTMLDivElement>(null);

  /*
   * IMAGE layer:
   * Handles mouse parallax separately.
   *
   * IMPORTANT:
   * We don't animate the same x/y properties
   * with two GSAP animations anymore.
   */
  const imageRef =
    useRef<HTMLDivElement>(null);

  /*
   * Main moving ambient light wrapper.
   */
  const glowMoveRef =
    useRef<HTMLDivElement>(null);

  /*
   * Glow parallax is separated from
   * continuous glow movement.
   */
  const glowParallaxRef =
    useRef<HTMLDivElement>(null);

  /*
   * Cinematic diagonal light sweep.
   */
  const sweepRef =
    useRef<HTMLDivElement>(null);

  const reducedMotion =
    usePrefersReducedMotion();

  useLayoutEffect(() => {
    const container =
      containerRef.current;

    const camera =
      cameraRef.current;

    const image =
      imageRef.current;

    const glowMove =
      glowMoveRef.current;

    const glowParallax =
      glowParallaxRef.current;

    const sweep =
      sweepRef.current;

    if (
      !container ||
      !camera ||
      !image
    ) {
      return;
    }

    /*
     * ==========================================
     * REDUCED MOTION
     * ==========================================
     */

    if (reducedMotion) {
      gsap.set(camera, {
        scale: 1.07,
        x: 0,
        y: 0,
      });

      gsap.set(image, {
        x: 0,
        y: 0,
        opacity: 1,
      });

      return;
    }

    /*
     * ==========================================
     * GSAP CONTEXT
     * ==========================================
     */

    const ctx = gsap.context(() => {
      /*
       * ========================================
       * INITIAL STATES
       * ========================================
       */

      gsap.set(camera, {
        scale: 1.06,
        x: -28,
        y: -10,
        transformOrigin: '50% 50%',
        force3D: true,
      });

      gsap.set(image, {
        x: 0,
        y: 0,
        opacity: 0.82,
        force3D: true,
      });

      /*
       * ========================================
       * 1. HERO IMAGE ENTRY
       * ========================================
       *
       * Fast cinematic reveal.
       */

      gsap.to(image, {
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
      });

      /*
       * ========================================
       * 2. CONTINUOUS CAMERA MOVEMENT
       * ========================================
       *
       * This is the main visible movement.
       *
       * Camera slowly:
       *
       * left -> right
       * top -> bottom
       * zooms slightly
       *
       * Then smoothly returns.
       * 
       * Reduced movement on mobile for performance.
       */

      // Mobile-friendly movement values
      const isMobile = window.innerWidth < 768;
      const xMovement = isMobile ? 14 : 28;
      const yMovement = isMobile ? 5 : 10;
      const scaleMax = isMobile ? 1.08 : 1.13;
      const duration = isMobile ? 10 : 8.5;

      gsap.to(camera, {
        x: xMovement,
        y: yMovement,
        scale: scaleMax,

        duration: duration,

        ease: 'sine.inOut',

        repeat: -1,
        yoyo: true,

        force3D: true,
      });

      /*
       * ========================================
       * 3. MOVING GOLDEN AMBIENT LIGHT
       * ========================================
       */

      if (glowMove) {
        gsap.set(glowMove, {
          xPercent: -50,
          yPercent: -50,

          x: -90,
          y: 40,

          opacity: 0.1,

          force3D: true,
        });

        // Reduced glow movement on mobile
        const glowXMovement = isMobile ? 60 : 110;
        const glowYMovement = isMobile ? -20 : -35;
        const glowOpacity = isMobile ? 0.12 : 0.18;
        const glowDuration = isMobile ? 9 : 7.5;

        gsap.to(glowMove, {
          x: glowXMovement,
          y: glowYMovement,

          opacity: glowOpacity,

          duration: glowDuration,

          ease: 'sine.inOut',

          repeat: -1,
          yoyo: true,

          force3D: true,
        });
      }

      /*
       * ========================================
       * 4. CINEMATIC LIGHT SWEEP
       * ========================================
       */

      if (sweep) {
        // Less frequent sweeps on mobile
        const sweepDelay = isMobile ? 8 : 4.5;
        const sweepOpacity = isMobile ? 0.1 : 0.16;
        
        const sweepTimeline =
          gsap.timeline({
            repeat: -1,
            repeatDelay: sweepDelay,
          });

        sweepTimeline
          .set(sweep, {
            xPercent: -160,
            opacity: 0,
          })

          .to(sweep, {
            xPercent: 250,

            opacity: sweepOpacity,

            duration: 3,

            ease: 'power1.inOut',
          })

          .to(
            sweep,
            {
              opacity: 0,
              duration: 0.4,
            },
            '-=0.45'
          );
      }

      /*
       * ========================================
       * 5. MOUSE PARALLAX
       * ========================================
       *
       * IMPORTANT:
       *
       * Mouse movement now affects imageRef.
       *
       * Continuous camera movement affects
       * cameraRef.
       *
       * They no longer fight each other.
       */

      const imageX =
        gsap.quickTo(image, 'x', {
          duration: 1.2,
          ease: 'power3.out',
        });

      const imageY =
        gsap.quickTo(image, 'y', {
          duration: 1.2,
          ease: 'power3.out',
        });

      let glowX:
        | ReturnType<typeof gsap.quickTo>
        | null = null;

      let glowY:
        | ReturnType<typeof gsap.quickTo>
        | null = null;

      if (glowParallax) {
        glowX =
          gsap.quickTo(
            glowParallax,
            'x',
            {
              duration: 1.4,
              ease: 'power3.out',
            }
          );

        glowY =
          gsap.quickTo(
            glowParallax,
            'y',
            {
              duration: 1.4,
              ease: 'power3.out',
            }
          );
      }

      /*
       * requestAnimationFrame prevents
       * excessive mouse calculations.
       */

      let frameId = 0;

      let latestX = 0;
      let latestY = 0;

      const updateParallax = () => {
        /*
         * Disable mouse parallax below tablet.
         */

        if (
          window.innerWidth < 768
        ) {
          frameId = 0;
          return;
        }

        /*
         * Background moves opposite cursor.
         */

        imageX(latestX * -9);
        imageY(latestY * -7);

        /*
         * Glow moves slightly more
         * to create depth.
         */

        glowX?.(latestX * 20);
        glowY?.(latestY * 16);

        frameId = 0;
      };

      const handlePointerMove = (
        event: PointerEvent
      ) => {
        if (
          window.innerWidth < 768
        ) {
          return;
        }

        /*
         * Calculate cursor based on HERO,
         * not the entire window.
         */

        const rect =
          container.getBoundingClientRect();

        const normalizedX =
          ((event.clientX -
            rect.left) /
            rect.width -
            0.5) *
          2;

        const normalizedY =
          ((event.clientY -
            rect.top) /
            rect.height -
            0.5) *
          2;

        latestX = normalizedX;
        latestY = normalizedY;

        if (!frameId) {
          frameId =
            window.requestAnimationFrame(
              updateParallax
            );
        }
      };

      /*
       * Smoothly return to center
       * when cursor leaves hero.
       */

      const handlePointerLeave = () => {
        imageX(0);
        imageY(0);

        glowX?.(0);
        glowY?.(0);
      };

      container.addEventListener(
        'pointermove',
        handlePointerMove
      );

      container.addEventListener(
        'pointerleave',
        handlePointerLeave
      );

      /*
       * GSAP context cleanup helper.
       */

      return () => {
        container.removeEventListener(
          'pointermove',
          handlePointerMove
        );

        container.removeEventListener(
          'pointerleave',
          handlePointerLeave
        );

        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    }, container);

    /*
     * ==========================================
     * COMPONENT CLEANUP
     * ==========================================
     */

    return () => {
      ctx.revert();
    };
  }, [
    imageUrl,
    reducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* ==================================================
          CAMERA WRAPPER
      ==================================================

          Oversized so movement never creates
          black / empty edges.
      */}

      <div
        ref={cameraRef}
        className="
          absolute
          -inset-[8%]

          transform-gpu

          will-change-transform
        "
      >
        {/* ================================================
            BACKGROUND IMAGE

            Separate from camera wrapper so mouse
            parallax does NOT overwrite camera animation.
        ================================================ */}

        <div
          ref={imageRef}
          className="
            absolute
            inset-0

            transform-gpu

            bg-cover
            bg-center
            bg-no-repeat

            will-change-transform
          "
          style={{
            backgroundImage:
              `url("${imageUrl}")`,
          }}
        />
      </div>

      {/* ==================================================
          MOVING GOLDEN LIGHT
      ================================================== */}

      <div
        ref={glowMoveRef}
        className="
          absolute

          left-1/2
          top-1/2

          h-[680px]
          w-[680px]

          opacity-10

          will-change-transform

          sm:h-[800px]
          sm:w-[800px]
        "
      >
        {/* ================================================
            Separate glow parallax layer
        ================================================ */}

        <div
          ref={glowParallaxRef}
          className="
            absolute
            inset-0

            rounded-full

            transform-gpu

            will-change-transform
          "
          style={{
            background:
              'radial-gradient(circle, rgba(253,207,9,0.34) 0%, rgba(255,151,35,0.20) 36%, rgba(255,151,35,0.05) 56%, transparent 72%)',

            filter:
              'blur(90px)',
          }}
        />
      </div>

      {/* ==================================================
          CINEMATIC LIGHT SWEEP
      ================================================== */}

      <div
        ref={sweepRef}
        className="
          absolute

          -left-[25%]
          -top-[20%]

          h-[140%]
          w-[18%]

          rotate-[14deg]

          opacity-0

          will-change-transform
        "
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,210,80,0.02) 20%, rgba(255,255,255,0.16) 50%, rgba(255,196,40,0.04) 80%, transparent 100%)',

          filter:
            'blur(24px)',
        }}
      />

      {/* ==================================================
          VERY SUBTLE DEPTH / VIGNETTE

          The main dark readability overlay is already
          in ServicePageTemplate, so this remains subtle.
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.18) 100%)',
        }}
      />
    </div>
  );
};