import React from 'react';
import { HeroBackground } from './HeroBackground';
import { PremiumHeroMotion } from './PremiumHeroMotion';
import { Container } from './Container';
import { FadeIn } from './FadeIn';

/* ─── Types ─────────────────────────────────────────────────────────── */

type HeroVariant = 'services' | 'about' | 'approach' | 'risk' | 'contact';

interface InnerPageHeroProps {
  /** Background image path (jpg/png — avif/webp variants auto-resolved) */
  imageUrl: string;
  /** Decorative motion variant */
  variant: HeroVariant;
  /** Small badge / label rendered above the heading */
  badge: React.ReactNode;
  /** Main h1 text or JSX */
  heading: React.ReactNode;
  /** Supporting paragraph text or JSX */
  subheading: React.ReactNode;
  /** Optional additional content rendered below the subheading */
  children?: React.ReactNode;
}

/*
  Layout math:
    Navbar pill height   = 74px  (from Header.tsx grid h-[74px])
    Navbar top gap       = 16px  (pt-3/pt-4 outer padding, safe at 16px)
    Visual breathing gap = 28px  (clear space below navbar before badge)
    ─────────────────────────────
    Safe top padding     = 118px desktop

  We use clamp() so the value never goes below 100px (tight mobile) or
  above 140px (large monitors with generous space).
*/
const HERO_SAFE_TOP = 'clamp(100px, calc(74px + 16px + 28px), 140px)';
const HERO_SAFE_BOTTOM = 'clamp(40px, 5vh, 72px)';

export const InnerPageHero: React.FC<InnerPageHeroProps> = ({
  imageUrl,
  variant,
  badge,
  heading,
  subheading,
  children,
}) => {
  return (
    <section
      /*
        Full viewport height — no subtracting the navbar because the navbar
        is fixed/floating OVER the hero (not outside it).
        We use 100svh with a 100vh fallback via @supports in globals.css.
      */
      className="
        relative
        z-0
        w-full
        max-w-none
        overflow-hidden
        border-b
        border-hive-border
        flex
        flex-col
      "
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background image (absolutely fills the section) ── */}
      <HeroBackground imageUrl={imageUrl} priority />

      {/* ── Decorative ambient motion layer ── */}
      <PremiumHeroMotion variant={variant} />

      {/*
        ── Scrollable content area ──
        flex: 1 + flex-col + items-center + justify-center keeps the
        text block vertically centered within the viewport space.
        Safe top padding prevents content from sliding under the fixed navbar.
      */}
      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          items-center
          justify-center
          w-full
        "
        style={{
          paddingTop: HERO_SAFE_TOP,
          paddingBottom: HERO_SAFE_BOTTOM,
        }}
      >
        <Container size="md" className="text-center">
          <FadeIn>
            {/* Badge slot */}
            {badge && (
              <div className="mb-4 sm:mb-6 flex justify-center">
                {badge}
              </div>
            )}

            {/* Main heading */}
            <h1
              className="
                mb-4
                sm:mb-6
                font-heading
                font-bold
                text-white
                drop-shadow-md
              "
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                lineHeight: 1.1,
              }}
            >
              {heading}
            </h1>

            {/* Supporting paragraph */}
            {subheading && (
              <p
                className="
                  mx-auto
                  max-w-3xl
                  text-base
                  sm:text-lg
                  leading-relaxed
                  text-white/90
                  drop-shadow
                "
              >
                {subheading}
              </p>
            )}

            {/* Optional extra hero elements (e.g. Scroll cue button on contact page) */}
            {children}
          </FadeIn>
        </Container>
      </div>
    </section>
  );
};
