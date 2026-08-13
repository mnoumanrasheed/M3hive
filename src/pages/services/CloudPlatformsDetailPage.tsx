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
  CheckCircle2,
  ChevronRight,
  Cloud,
  Database,
  Network,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { FadeIn } from '../../components/ui/FadeIn';
import { SectionHeading } from '../../components/ui/SectionHeading';

import {
  Breadcrumbs,
  type BreadcrumbItem,
} from '../../components/ui/Breadcrumbs';

import { cloudPlatformsDetails } from '../../data/services/cloudPlatformsDetails';

/* ============================================================
   CLOUD PLATFORMS HERO VISUAL

   Shared across ALL Cloud Platform detail pages.
============================================================ */

interface CloudHeroVisualProps {
  title: string;
  slug: string;
}

const CloudHeroVisual: React.FC<CloudHeroVisualProps> = ({
  title,
  slug,
}) => {
  const config = useMemo(() => {
    const value = slug.toLowerCase();

    if (
      value.includes('migration') ||
      value.includes('modern')
    ) {
      return {
        center: 'MODERNISE',
        nodeA: 'Assess',
        nodeB: 'Migrate',
        nodeC: 'Optimise',
      };
    }

    if (
      value.includes('devops') ||
      value.includes('platform-engineering')
    ) {
      return {
        center: 'PLATFORM',
        nodeA: 'Build',
        nodeB: 'Deploy',
        nodeC: 'Operate',
      };
    }

    if (
      value.includes('security') ||
      value.includes('secure')
    ) {
      return {
        center: 'SECURE CLOUD',
        nodeA: 'Protect',
        nodeB: 'Monitor',
        nodeC: 'Govern',
      };
    }

    if (
      value.includes('data')
    ) {
      return {
        center: 'CLOUD DATA',
        nodeA: 'Store',
        nodeB: 'Process',
        nodeC: 'Scale',
      };
    }

    return {
      center: 'CLOUD',
      nodeA: 'Connect',
      nodeB: 'Scale',
      nodeC: 'Operate',
    };
  }, [slug]);

  return (
    <div
      className="
        relative
        mx-auto
        flex
        h-[390px]
        w-full
        max-w-[560px]
        items-center
        justify-center
        overflow-visible
      "
      aria-hidden="true"
    >
      {/* Glow */}

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
          blur-[50px]
          md:blur-[100px]
        "
      />

      {/* Cloud system rings */}

      <div
        className="
          cloud-ring-a
          absolute
          h-[320px]
          w-[320px]
          rounded-full
          border
          border-hive-yellow/20
        "
      >
        <span
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

      <div
        className="
          cloud-ring-b
          absolute
          h-[255px]
          w-[255px]
          rounded-full
          border
          border-dashed
          border-hive-yellow/25
        "
      />

      <div
        className="
          cloud-ring-c
          absolute
          h-[195px]
          w-[195px]
          rounded-full
          border
          border-white/10
        "
      />

      {/* Connection lines */}

      <div
        className="
          absolute
          left-[12%]
          top-1/2
          h-px
          w-[76%]
          -translate-y-1/2
          bg-gradient-to-r
          from-transparent
          via-hive-yellow/30
          to-transparent
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-[12%]
          h-[76%]
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-transparent
          via-hive-yellow/20
          to-transparent
        "
      />

      {/* Center cloud card */}

      <div
        className="
          cloud-center
          relative
          z-20
          flex
          h-[155px]
          w-[200px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-hive-yellow/30
          bg-[#151515]/95
          px-5
          text-center
          shadow-[0_28px_75px_rgba(0,0,0,0.50)]
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
          <Cloud className="h-6 w-6 text-hive-yellow" />
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
          {config.center}
        </span>

        <span
          className="
            mt-2
            max-w-[155px]
            truncate
            text-xs
            text-white/70
          "
        >
          {title}
        </span>
      </div>

      {/* Left node */}

      <div
        className="
          cloud-node-a
          absolute
          left-[2%]
          top-[20%]
          z-30
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-3
          shadow-xl
        "
      >
        <div className="flex items-center gap-2">
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
            <Server className="h-4 w-4 text-hive-yellow" />
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
            {config.nodeA}
          </span>
        </div>
      </div>

      {/* Right node */}

      <div
        className="
          cloud-node-b
          absolute
          right-[2%]
          top-[28%]
          z-30
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-3
          shadow-xl
        "
      >
        <div className="flex items-center gap-2">
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
            <Network className="h-4 w-4 text-hive-yellow" />
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
            {config.nodeB}
          </span>
        </div>
      </div>

      {/* Bottom-left node */}

      <div
        className="
          cloud-node-c
          absolute
          bottom-[13%]
          left-[13%]
          z-30
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-3
          shadow-xl
        "
      >
        <div className="flex items-center gap-2">
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
            <Database className="h-4 w-4 text-hive-yellow" />
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
            {config.nodeC}
          </span>
        </div>
      </div>

      {/* Security node */}

      <div
        className="
          cloud-node-d
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
          border-hive-yellow/30
          bg-[#151515]
          shadow-xl
        "
      >
        <ShieldCheck className="h-5 w-5 text-hive-yellow" />
      </div>

      {/* Energy signal */}

      <div
        className="
          cloud-signal
          absolute
          right-[22%]
          top-[14%]
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-hive-yellow/20
          bg-hive-yellow/[0.06]
        "
      >
        <Zap className="h-4 w-4 text-hive-yellow" />
      </div>
    </div>
  );
};

/* ============================================================
   PAGE
============================================================ */

export const CloudPlatformsDetailPage: React.FC = () => {
  const { slug } = useParams<{
    slug: string;
  }>();

  const service = useMemo(
    () =>
      cloudPlatformsDetails.find(
        (item) => item.slug === slug,
      ),
    [slug],
  );

  const relatedServices = useMemo(
    () =>
      cloudPlatformsDetails.filter(
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

      gsap.to(
        '.cloud-ring-a',
        {
          rotation: 360,
          duration: 36,
          repeat: -1,
          ease: 'none',
        },
      );

      gsap.to(
        '.cloud-ring-b',
        {
          rotation: -360,
          duration: 29,
          repeat: -1,
          ease: 'none',
        },
      );

      gsap.to(
        '.cloud-ring-c',
        {
          rotation: 360,
          duration: 45,
          repeat: -1,
          ease: 'none',
        },
      );

      gsap.to(
        '.cloud-node-a',
        {
          y: -8,
          x: 3,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cloud-node-b',
        {
          y: 8,
          x: -3,
          duration: 3.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cloud-node-c',
        {
          y: -6,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cloud-node-d',
        {
          y: 6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cloud-center',
        {
          y: -4,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );

      gsap.to(
        '.cloud-signal',
        {
          scale: 1.12,
          opacity: 0.55,
          duration: 1.8,
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

  if (!service) {
    return (
      <Navigate
        to="/services/cloud-platforms"
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
      label: 'Cloud Platforms',
      href: '/services/cloud-platforms',
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

      <section
        ref={heroRef}
        className="
          relative
          z-0
          flex
          flex-col
          overflow-hidden
          border-b
          border-white/10
          bg-[#080808]
        "
        style={{ minHeight: 'max(620px, calc(100svh - 80px))' }}
      >
        {/* Cloud glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_72%_42%,rgba(253,207,9,0.12),transparent_34%)]
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

        <div
          className="
            relative
            z-10
            flex
            w-full
            flex-1
            flex-col
            justify-center
            py-16
            sm:py-20
            lg:py-24
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
                    Start a Conversation

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div
                className="
                  hero-visual
                  hidden
                  lg:block
                "
              >
                <CloudHeroVisual
                  title={service.title}
                  slug={service.slug}
                />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ======================================================
          OVERVIEW
      ====================================================== */}

      <section className="bg-hive-white py-16 sm:py-24">
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
                      key={capability.title}
                      delay={index * 0.08}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCapability(index)
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
                        {capability.title}
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
                <div className="capability-desc w-full">
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
                      service.capabilities[
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
                      service.capabilities[
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
          CONTRAST FIXED FOR ALL CARDS
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
            blur-[120px]
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
                  delay={index * 0.1}
                >
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
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
                        group-md:hover:bg-hive-yellow/[0.16]
                      "
                    >
                      <CheckCircle2 className="h-6 w-6 text-hive-yellow" />
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
                      {value.description}
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

      {relatedServices.length > 0 && (
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
                title="Explore Other Cloud Platform Services"
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
                md:grid-cols-2
              "
            >
              {relatedServices.map(
                (
                  relatedService,
                  index,
                ) => (
                  <FadeIn
                    key={relatedService.slug}
                    delay={index * 0.1}
                  >
                    <Link
                      to={`/services/cloud-platforms/${relatedService.slug}`}
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
                        {relatedService.title}
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
                            md:group-hover:translate-x-1
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
      )}

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
          className="relative z-10"
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
              {service.slug === 'salesforce' 
                ? 'Ready to get more value from Salesforce?' 
                : 'Ready to modernise your cloud platform?'}
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
              {service.slug === 'salesforce'
                ? 'Talk to our team about your Salesforce platform, customer processes and integration requirements.'
                : 'Talk to our team about your cloud strategy, infrastructure and engineering challenges.'}
            </p>

            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Start a Conversation

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};