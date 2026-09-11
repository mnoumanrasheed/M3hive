import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom';

import gsap from 'gsap';

import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  MousePointerClick,
  Route,
  Sparkles,
  Users,
} from 'lucide-react';

import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { FadeIn } from '../../components/ui/FadeIn';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ServiceHero, ServiceHeroViewportContent } from '../../components/services/ServiceHeroLayout';

import {
  Breadcrumbs,
  type BreadcrumbItem,
} from '../../components/ui/Breadcrumbs';

import { customerExperienceDetails } from '../../data/services/customerExperienceDetails';

/* ============================================================
   CUSTOMER EXPERIENCE HERO VISUAL

   Shared across ALL Customer Experience detail pages.
   Content changes dynamically based on the current service.
============================================================ */

interface CustomerExperienceHeroVisualProps {
  title: string;
  slug: string;
}

const CustomerExperienceHeroVisual: React.FC<
  CustomerExperienceHeroVisualProps
> = ({
  title,
  slug,
}) => {
  const visualConfig = useMemo(() => {
    const normalizedSlug =
      slug.toLowerCase();

    if (
      normalizedSlug.includes('research') ||
      normalizedSlug.includes('insight')
    ) {
      return {
        centerLabel: 'INSIGHTS',
        topLabel: 'Research',
        rightLabel: 'Behaviour',
        bottomLabel: 'Signals',
      };
    }

    if (
      normalizedSlug.includes('design') ||
      normalizedSlug.includes('ux') ||
      normalizedSlug.includes('ui')
    ) {
      return {
        centerLabel: 'EXPERIENCE',
        topLabel: 'Design',
        rightLabel: 'Interface',
        bottomLabel: 'Journey',
      };
    }

    if (
      normalizedSlug.includes('customer') ||
      normalizedSlug.includes('journey')
    ) {
      return {
        centerLabel: 'JOURNEY',
        topLabel: 'Discover',
        rightLabel: 'Engage',
        bottomLabel: 'Retain',
      };
    }

    return {
      centerLabel: 'EXPERIENCE',
      topLabel: 'Understand',
      rightLabel: 'Engage',
      bottomLabel: 'Delight',
    };
  }, [slug]);

  return (
    <div
      className="
        relative
        mx-auto
        flex
        h-[380px]
        w-full
        max-w-[540px]
        items-center
        justify-center
        overflow-visible
      "
      aria-hidden="true"
    >
      {/* Main atmospheric glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[320px]
          w-[320px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-hive-yellow/[0.09]
          blur-[48px]
          md:blur-[95px]
        "
      />

      {/* Outer orbit */}

      <div
        className="
          cx-orbit-outer
          absolute
          h-[310px]
          w-[310px]
          rounded-full
          border
          border-hive-yellow/20
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[-5px]
            h-2.5
            w-2.5
            -translate-x-1/2
            rounded-full
            bg-hive-yellow
            shadow-[0_0_16px_rgba(253,207,9,0.8)]
          "
        />
      </div>

      {/* Middle orbit */}

      <div
        className="
          cx-orbit-middle
          absolute
          h-[250px]
          w-[250px]
          rounded-full
          border
          border-dashed
          border-hive-yellow/25
        "
      />

      {/* Inner orbit */}

      <div
        className="
          cx-orbit-inner
          absolute
          h-[190px]
          w-[190px]
          rounded-full
          border
          border-white/10
        "
      />

      {/* Horizontal connection */}

      <div
        className="
          absolute
          left-[16%]
          top-1/2
          h-px
          w-[68%]
          -translate-y-1/2
          bg-gradient-to-r
          from-transparent
          via-hive-yellow/25
          to-transparent
        "
      />

      {/* Vertical connection */}

      <div
        className="
          absolute
          left-1/2
          top-[14%]
          h-[72%]
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-transparent
          via-hive-yellow/20
          to-transparent
        "
      />

      {/* Center experience card */}

      <div
        className="
          cx-center-card
          relative
          z-20
          flex
          h-[150px]
          w-[190px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-hive-yellow/30
          bg-[#151515]/95
          px-5
          text-center
          shadow-lg
          md:shadow-[0_25px_70px_rgba(0,0,0,0.50)]
          backdrop-blur-sm
          md:backdrop-blur-xl
        "
      >
        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-hive-yellow/40
            bg-hive-yellow/10
          "
        >
          <Users className="h-6 w-6 text-hive-yellow" />
        </div>

        <span
          className="
            font-heading
            text-[10px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-hive-yellow
          "
        >
          {visualConfig.centerLabel}
        </span>

        <span
          className="
            mt-2
            max-w-[150px]
            truncate
            text-xs
            font-medium
            text-white/75
          "
        >
          {title}
        </span>
      </div>

      {/* Top-left node */}

      <div
        className="
          cx-node-a
          absolute
          left-[4%]
          top-[19%]
          z-30
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-3
          shadow-[0_12px_35px_rgba(0,0,0,0.35)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-hive-yellow/30
              bg-hive-yellow/10
            "
          >
            <MessageCircle className="h-4 w-4 text-hive-yellow" />
          </div>

          <span
            className="
              hidden
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white/70
              sm:block
            "
          >
            {visualConfig.topLabel}
          </span>
        </div>
      </div>

      {/* Right node */}

      <div
        className="
          cx-node-b
          absolute
          right-[3%]
          top-[30%]
          z-30
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-3
          shadow-[0_12px_35px_rgba(0,0,0,0.35)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-hive-yellow/30
              bg-hive-yellow/10
            "
          >
            <MousePointerClick className="h-4 w-4 text-hive-yellow" />
          </div>

          <span
            className="
              hidden
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white/70
              sm:block
            "
          >
            {visualConfig.rightLabel}
          </span>
        </div>
      </div>

      {/* Bottom-left node */}

      <div
        className="
          cx-node-c
          absolute
          bottom-[13%]
          left-[13%]
          z-30
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-3
          shadow-[0_12px_35px_rgba(0,0,0,0.35)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-hive-yellow/30
              bg-hive-yellow/10
            "
          >
            <Route className="h-4 w-4 text-hive-yellow" />
          </div>

          <span
            className="
              hidden
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white/70
              sm:block
            "
          >
            {visualConfig.bottomLabel}
          </span>
        </div>
      </div>

      {/* Bottom-right sparkle */}

      <div
        className="
          cx-node-d
          absolute
          bottom-[15%]
          right-[15%]
          z-30
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          shadow-[0_12px_35px_rgba(0,0,0,0.35)]
        "
      >
        <Sparkles className="h-5 w-5 text-hive-yellow" />
      </div>

      {/* Tiny ambient dots */}

      <span
        className="
          cx-dot-a
          absolute
          left-[27%]
          top-[12%]
          h-1.5
          w-1.5
          rounded-full
          bg-hive-yellow/70
          shadow-[0_0_10px_rgba(253,207,9,0.7)]
        "
      />

      <span
        className="
          cx-dot-b
          absolute
          bottom-[17%]
          right-[32%]
          h-1.5
          w-1.5
          rounded-full
          bg-hive-yellow/60
          shadow-[0_0_10px_rgba(253,207,9,0.6)]
        "
      />
    </div>
  );
};

/* ============================================================
   PAGE
============================================================ */

export const CustomerExperienceDetailPage: React.FC = () => {
  const { slug } = useParams<{
    slug: string;
  }>();

  const service = useMemo(
    () =>
      customerExperienceDetails.find(
        (item) => item.slug === slug,
      ),
    [slug],
  );

  const relatedServices = useMemo(
    () =>
      customerExperienceDetails.filter(
        (item) => item.slug !== slug,
      ),
    [slug],
  );

  const heroRef =
    useRef<HTMLElement | null>(null);

  const capabilitiesRef =
    useRef<HTMLDivElement | null>(null);

  const [
    activeCapability,
    setActiveCapability,
  ] = useState(0);

  /* ============================================================
     RESET CAPABILITY ON SERVICE CHANGE
  ============================================================ */

  useEffect(() => {
    setActiveCapability(0);
  }, [slug]);

  /* ============================================================
     HERO ANIMATION
  ============================================================ */

  useEffect(() => {
    if (
      !service ||
      !heroRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      tl.fromTo(
        '.hero-label',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
      )
        .fromTo(
          '.hero-title',
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.3',
        )
        .fromTo(
          '.hero-intro',
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          '-=0.5',
        )
        .fromTo(
          '.hero-cta',
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          '-=0.45',
        )
        .fromTo(
          '.hero-visual',
          {
            opacity: 0,
            scale: 0.96,
            x: 12,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.9,
          },
          '-=0.7',
        );

      /* Slow premium orbit movement */

      gsap.to(
        '.cx-orbit-outer',
        {
          rotation: 360,
          duration: 34,
          repeat: -1,
          ease: 'none',
        },
      );

      gsap.to(
        '.cx-orbit-middle',
        {
          rotation: -360,
          duration: 28,
          repeat: -1,
          ease: 'none',
        },
      );

      gsap.to(
        '.cx-orbit-inner',
        {
          rotation: 360,
          duration: 42,
          repeat: -1,
          ease: 'none',
        },
      );

      /* Floating cards */

      gsap.to(
        '.cx-node-a',
        {
          y: -8,
          x: 3,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cx-node-b',
        {
          y: 8,
          x: -3,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cx-node-c',
        {
          y: -6,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cx-node-d',
        {
          y: 6,
          rotation: 5,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      /* Center card subtle breathing */

      gsap.to(
        '.cx-center-card',
        {
          y: -4,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      /* Tiny dot movement */

      gsap.to(
        '.cx-dot-a',
        {
          opacity: 0.25,
          scale: 1.5,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cx-dot-b',
        {
          opacity: 0.3,
          scale: 1.4,
          duration: 2.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [service]);

  /* ============================================================
     CAPABILITY ANIMATION
  ============================================================ */

  useEffect(() => {
    if (
      !service ||
      !capabilitiesRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.capability-desc',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
      );
    }, capabilitiesRef);

    return () => {
      ctx.revert();
    };
  }, [
    activeCapability,
    service,
  ]);

  /* ============================================================
     INVALID SERVICE
  ============================================================ */

  if (!service) {
    return (
      <Navigate
        to="/services/customer-experience"
        replace
      />
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'Customer Experience',
      href: '/services/customer-experience',
    },
    {
      label: service.title,
    },
  ];

  return (
    <PageShell
      title={`${service.title} | M3 Hive`}
      description={service.intro}
    >
      {/* ======================================================
          HERO
      ====================================================== */}

      <ServiceHero
        ref={heroRef}
        className="
          border-b
          border-white/10
          bg-[#080808]
        "
      >
        {/* Golden atmospheric background */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_72%_42%,rgba(253,207,9,0.12),transparent_34%)]
          "
        />

        {/* Secondary glow */}

        <div
          className="
            pointer-events-none
            absolute
            right-[12%]
            top-[20%]
            h-[340px]
            w-[340px]
            rounded-full
            bg-hive-orange/[0.04]
            blur-[55px]
            md:blur-[110px]
          "
        />

        {/* Grid */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.065]
            [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)]
            [background-size:44px_44px]
          "
        />

        {/* Top fade */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-40
            bg-gradient-to-b
            from-black/30
            to-transparent
          "
        />

        <ServiceHeroViewportContent
          className="
            z-10
            pb-16
            sm:pb-20
            lg:pb-24
          "
        >
          <Container size="lg">
            <Breadcrumbs
              items={breadcrumbs}
              variant="dark"
              className="
                mb-5
                border-none
                pb-0
                sm:mb-6
              "
            />

            <div
              className="
                grid
                grid-cols-1
                items-center
                gap-12
                lg:grid-cols-2
                lg:gap-16
              "
            >
              {/* Hero content */}

              <div>
                <div
                  className="
                    hero-label
                    mb-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-hive-yellow/40
                    bg-hive-yellow/10
                    px-3
                    py-1.5
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      flex-shrink-0
                      rounded-full
                      bg-hive-yellow
                      shadow-[0_0_10px_rgba(253,207,9,0.6)]
                    "
                  />

                  <span
                    className="
                      font-heading
                      text-xs
                      font-bold
                      uppercase
                      tracking-widest
                      text-white
                    "
                  >
                    {service.eyebrow}
                  </span>
                </div>

                <h1
                  className="
                    hero-title
                    mb-6
                    max-w-3xl
                    font-heading
                    font-bold
                    text-white
                  "
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1.12' }}
                >
                  {service.title}
                </h1>

                <p
                  className="
                    hero-intro
                    mb-8
                    max-w-2xl
                    text-base
                    leading-relaxed
                    text-white/80
                    sm:text-lg
                    md:text-xl
                  "
                >
                  {service.intro}
                </p>

                <div className="hero-cta">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                  >
                    Start a Project

                    <ArrowRight
                      className="
                        ml-2
                        h-4
                        w-4
                      "
                    />
                  </Button>
                </div>
              </div>

              {/* Animated CX visual */}

              <div
                className="
                  hero-visual
                  hidden
                  lg:block
                "
              >
                <CustomerExperienceHeroVisual
                  title={service.title}
                  slug={service.slug}
                />
              </div>
            </div>
          </Container>
        </ServiceHeroViewportContent>
      </ServiceHero>

      {/* ======================================================
          OVERVIEW
      ====================================================== */}

      <section
        className="
          bg-hive-white
          py-16
          sm:py-24
        "
      >
        <Container size="md">
          <FadeIn>
            <h2
              className="
                mb-6
                font-heading
                text-2xl
                font-bold
                text-hive-black
                sm:text-3xl
              "
            >
              Overview
            </h2>

            <p
              className="
                text-lg
                leading-relaxed
                text-hive-text-muted
                sm:text-xl
              "
            >
              {service.overview}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ======================================================
          CAPABILITIES
      ====================================================== */}

      <section
        className="
          border-y
          border-hive-border
          bg-hive-warm-white
          py-16
          sm:py-24
        "
      >
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Capabilities"
              description="How we deliver value in this area."
              accentBar
            />
          </FadeIn>

          <div
            ref={capabilitiesRef}
            className="
              mt-12
              grid
              grid-cols-1
              gap-8
              lg:grid-cols-12
              lg:gap-12
            "
          >
            <div
              className="
                flex
                flex-col
                gap-2
                lg:col-span-5
              "
            >
              {service.capabilities.map(
                (
                  capability,
                  index,
                ) => {
                  const isActive =
                    activeCapability ===
                    index;

                  return (
                    <FadeIn
                      key={
                        capability.title
                      }
                      delay={index * 0.08}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCapability(
                            index,
                          )
                        }
                      className={`
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        px-6
                        py-4
                        text-left
                        font-heading
                        text-base
                        font-bold
                        transition-all
                        duration-300
                        sm:text-lg

                        ${
                          isActive
                            ? 'border-hive-yellow bg-hive-white text-hive-black shadow-hive-md'
                            : 'border-transparent bg-transparent text-hive-text-muted md:hover:border-hive-border md:hover:bg-hive-white md:hover:text-hive-black'
                        }
                      `}
                    >
                      <span>
                        {
                          capability.title
                        }
                      </span>

                      <ChevronRight
                        className={`
                          h-5
                          w-5
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? 'rotate-90 text-hive-yellow opacity-100'
                              : 'opacity-0'
                          }
                        `}
                      />
                    </button>
                  </FadeIn>
                );
                },
              )}
            </div>

            <div className="lg:col-span-7">
              <div
                className="
                  sticky
                  top-32
                  flex
                  min-h-[300px]
                  items-center
                  rounded-2xl
                  border
                  border-hive-border
                  bg-hive-white
                  p-8
                  shadow-hive-lg
                  sm:p-12
                "
              >
                <div
                  className="
                    capability-desc
                    w-full
                  "
                >
                  <h3
                    className="
                      mb-6
                      font-heading
                      text-2xl
                      font-bold
                      text-hive-black
                    "
                  >
                    {
                      service
                        .capabilities[
                        activeCapability
                      ]?.title
                    }
                  </h3>

                  <p
                    className="
                      text-lg
                      leading-relaxed
                      text-hive-text-muted
                    "
                  >
                    {
                      service
                        .capabilities[
                        activeCapability
                      ]?.description
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================
          BUSINESS VALUE
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#080808]
          py-16
          text-white
          sm:py-24
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[420px]
            w-[650px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-hive-yellow/[0.06]
            blur-[60px]
            md:blur-[120px]
          "
        />

        <Container
          size="lg"
          className="relative z-10"
        >
          <FadeIn>
            <div
              className="
                mb-14
                text-center
                sm:mb-16
              "
            >
              <span
                className="
                  mb-4
                  inline-block
                  font-heading
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  text-hive-yellow
                "
              >
                Measurable Impact
              </span>

              <h2
                className="
                  mb-5
                  font-heading
                  text-3xl
                  font-bold
                  text-white
                  sm:text-4xl
                "
              >
                Business Value
              </h2>

              <div
                className="
                  mx-auto
                  h-1
                  w-20
                  rounded-full
                  bg-gradient-to-r
                  from-hive-orange
                  to-hive-yellow
                "
              />
            </div>
          </FadeIn>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
              sm:gap-8
            "
          >
            {service.businessValue.map(
              (
                value,
                index,
              ) => (
                <FadeIn
                  key={value.title}
                  delay={
                    index * 0.1
                  }
                >
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-visible
                      rounded-2xl
                      border
                      border-white/[0.14]
                      bg-[#151515]
                      p-7
                      transition-all
                      duration-300
                      md:hover:-translate-y-1
                      md:hover:border-hive-yellow/50
                      md:hover:bg-[#191919]
                      md:hover:shadow-[0_20px_50px_rgba(0,0,0,0.40)]
                      sm:p-8
                    "
                  >
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-[2px]
                        w-0
                        bg-gradient-to-r
                        from-hive-orange
                        to-hive-yellow
                        transition-all
                        duration-500
                        md:group-hover:w-full
                      "
                    />

                    <div
                      className="
                        mb-6
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-hive-yellow/40
                        bg-hive-yellow/10
                        transition-all
                        duration-300
                        md:group-hover:border-hive-yellow/70
                        md:group-hover:bg-hive-yellow/[0.16]
                      "
                    >
                      <CheckCircle2
                        className="
                          h-6
                          w-6
                          text-hive-yellow
                        "
                      />
                    </div>

                    <h3
                      className="
                        mb-4
                        font-heading
                        text-xl
                        font-bold
                        leading-snug
                        text-white
                      "
                    >
                      {value.title}
                    </h3>

                    <p
                      className="
                        text-[15px]
                        leading-relaxed
                        text-white/75
                        sm:text-base
                      "
                    >
                      {
                        value.description
                      }
                    </p>
                  </div>
                </FadeIn>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* ======================================================
          RELATED SERVICES
      ====================================================== */}

      <section
        className="
          border-y
          border-hive-border
          bg-hive-white
          py-16
          sm:py-24
        "
      >
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Explore Other Customer Experience Services"
              centered
              accentBar
            />
          </FadeIn>

          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-6
              md:grid-cols-3
            "
          >
            {relatedServices.map(
              (
                relatedService,
                index,
              ) => (
                <FadeIn
                  key={
                    relatedService.slug
                  }
                  delay={
                    index * 0.1
                  }
                >
                  <Link
                    to={`/services/customer-experience/${relatedService.slug}`}
                    className="
                      group
                      block
                      h-full
                      rounded-2xl
                      border
                      border-hive-border
                      bg-hive-warm-white
                      p-6
                      transition-all
                      duration-300
                      md:hover:-translate-y-1
                      md:hover:border-hive-yellow/70
                      md:hover:shadow-hive-lg
                    "
                  >
                    <h3
                      className="
                        mb-3
                        font-heading
                        text-lg
                        font-bold
                        text-hive-black
                        transition-colors
                        duration-300
                        md:group-hover:text-hive-orange
                      "
                    >
                      {
                        relatedService.title
                      }
                    </h3>

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-sm
                        font-semibold
                        text-hive-text-muted
                        transition-colors
                        duration-300
                        md:group-hover:text-hive-orange
                      "
                    >
                      Learn More

                      <ChevronRight
                        className="
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </Link>
                </FadeIn>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-white/10
          bg-hive-black
          py-20
          text-center
          lg:py-24
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-hive-yellow/10
            via-transparent
            to-transparent
            opacity-50
          "
        />

        <Container
          size="md"
          className="
            relative
            z-10
          "
        >
          <FadeIn>
            <h2
              className="
                mb-6
                font-heading
                text-3xl
                font-bold
                text-white
                sm:text-4xl
              "
            >
              Ready to create better
              digital experiences?
            </h2>

            <p
              className="
                mx-auto
                mb-10
                max-w-2xl
                text-lg
                leading-relaxed
                text-white/80
              "
            >
              Talk to our team about
              your customers, product
              goals and experience
              challenges.
            </p>

            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Start a Project

              <ArrowRight
                className="
                  ml-2
                  h-4
                  w-4
                "
              />
            </Button>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};
