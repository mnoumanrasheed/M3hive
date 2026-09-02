import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Navigate,
  useParams,
} from 'react-router-dom';

import gsap from 'gsap';

import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { HeroBackground } from '../../components/ui/HeroBackground';
import { FadeIn } from '../../components/ui/FadeIn';
import { SectionHeading } from '../../components/ui/SectionHeading';
import {
  Breadcrumbs,
  BreadcrumbItem,
} from '../../components/ui/Breadcrumbs';

import { AIHeroNetworkVisual } from '../../components/services/AIHeroNetworkVisual';

import { aiServiceDetails } from '../../data/services/aiServiceDetails';

export const AIServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{
    slug: string;
  }>();

  const service =
    aiServiceDetails.find(
      (item) => item.slug === slug,
    );

  const heroRef =
    useRef<HTMLElement>(null);

  const capabilitiesRef =
    useRef<HTMLDivElement>(null);

  const [
    activeCapability,
    setActiveCapability,
  ] = useState(0);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'Artificial Intelligence',
      href: '/services/artificial-intelligence',
    },
    {
      label:
        service?.title ||
        'Service',
    },
  ];

  /* ============================================================
     HERO ANIMATION
  ============================================================ */

  useEffect(() => {
    if (!service) {
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
          duration: 0.6,
        },
      )
        .fromTo(
          '.hero-title',
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.4',
        )
        .fromTo(
          '.hero-desc',
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .fromTo(
          '.hero-cta',
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .fromTo(
          '.hero-visual',
          {
            opacity: 0,
            scale: 0.97,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          '-=0.8',
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [service]);

  /* ============================================================
     CAPABILITY PANEL ANIMATION
  ============================================================ */

  useEffect(() => {
    if (!service) {
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
        to="/services/artificial-intelligence"
        replace
      />
    );
  }

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
          border-hive-border
          bg-hive-black
        "
        style={{
          minHeight:
            'clamp(600px, calc(100svh - 80px), 720px)',
        }}
      >
        <HeroBackground
          imageUrl={
            service.heroImage
          }
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
            py-24
            sm:py-32
          "
        >
          <Container size="lg">
            <Breadcrumbs
              items={breadcrumbs}
              variant="dark"
              className="
                mb-4
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
              "
            >
              <div className="space-y-6 text-left">
                <div
                  className="
                    hero-label
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
                      drop-shadow
                    "
                  >
                    {
                      service.eyebrow
                    }
                  </span>
                </div>

                <h1
                  className="
                    hero-title
                    mb-4
                    font-heading
                    text-display-md
                    font-bold
                    leading-[1.15]
                    text-white
                    drop-shadow-md
                    sm:text-display-lg
                  "
                >
                  {service.title}
                </h1>

                <p
                  className="
                    hero-desc
                    mb-6
                    max-w-xl
                    text-base
                    leading-relaxed
                    text-white/90
                    drop-shadow
                    sm:mb-8
                    sm:text-lg
                    md:text-xl
                  "
                >
                  {service.intro}
                </p>

                <div className="hero-cta pt-4">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                  >
                    Start a Conversation

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

              <div
                className="
                  hero-visual
                  hidden
                  items-center
                  justify-center
                  lg:flex
                "
              >
                <AIHeroNetworkVisual
                  title={
                    service.title
                  }
                  serviceId={
                    service.slug
                  }
                />
              </div>
            </div>
          </Container>
        </div>
      </section>

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
              description="How we solve complex business challenges with AI."
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
            {/* Capability buttons */}

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
                      key={index}
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
                            ? `
                              border-hive-yellow
                              bg-hive-white
                              text-hive-black
                              shadow-hive-md
                            `
                            : `
                              border-transparent
                              bg-transparent
                              text-hive-text-muted
                              md:hover:border-hive-border
                              md:hover:bg-hive-white
                              md:hover:text-hive-black
                            `
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
                              ? `
                                rotate-90
                                text-hive-yellow
                                opacity-100
                              `
                              : `
                                opacity-0
                              `
                          }
                        `}
                      />
                    </button>
                  </FadeIn>
                );
                },
              )}
            </div>

            {/* Description card */}

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
                    {service
                      .capabilities[
                      activeCapability
                    ]?.description ||
                      'We empower organizations to unlock the full potential of this capability through robust integrations, proven methodologies, and domain expertise.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================
          BUSINESS VALUE
          
          FIXED FOR ALL AI SUB-SERVICE PAGES
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
        {/* Background glow */}

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
                  key={index}
                  delay={
                    index * 0.1
                  }
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
                    {/* Yellow top accent */}

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

                    {/* Icon */}

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
                        bg-hive-yellow/[0.10]
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

                    {/* IMPORTANT:
                        explicit white title
                    */}

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

                    {/* Light readable description */}

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
          WHY M3 HIVE
      ====================================================== */}

      {service.whyM3Hive &&
      service.whyM3Hive.length >
        0 ? (
        <section
          className="
            bg-hive-white
            py-16
            sm:py-24
          "
        >
          <Container size="lg">
            <FadeIn>
              <SectionHeading
                title="Why M3 Hive"
                centered
                accentBar
              />
            </FadeIn>

            <div
              className="
                mt-16
                grid
                grid-cols-1
                gap-8
                md:grid-cols-2
              "
            >
              {service.whyM3Hive.map(
                (
                  item,
                  index,
                ) => (
                  <FadeIn
                    key={index}
                    delay={
                      index *
                      0.1
                    }
                  >
                    <div
                      className="
                        group
                        h-full
                        rounded-2xl
                        border
                        border-hive-border
                        bg-hive-white
                        p-6
                        transition-all
                        duration-300
                        md:hover:-translate-y-1
                        md:hover:border-hive-yellow
                        md:hover:shadow-lg
                        sm:p-8
                      "
                    >
                      <div
                        className="
                          mb-5
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-hive-yellow
                            shadow-[0_0_10px_rgba(253,207,9,0.45)]
                          "
                        />

                        <div
                          className="
                            h-px
                            w-10
                            bg-hive-yellow/50
                          "
                        />
                      </div>

                      <h4
                        className="
                          mb-3
                          font-heading
                          text-xl
                          font-bold
                          text-hive-black
                        "
                      >
                        {item.title}
                      </h4>

                      <p
                        className="
                          leading-relaxed
                          text-hive-text-muted
                        "
                      >
                        {
                          item.description
                        }
                      </p>
                    </div>
                  </FadeIn>
                ),
              )}
            </div>
          </Container>
        </section>
      ) : (
        <section
          className="
            bg-hive-white
            py-16
            sm:py-24
          "
        >
          <Container
            size="md"
            className="text-center"
          >
            <FadeIn>
              <h2
                className="
                  mb-6
                  font-heading
                  text-3xl
                  font-bold
                  text-hive-black
                "
              >
                Expertise You Can
                Trust
              </h2>

              <p
                className="
                  mx-auto
                  max-w-2xl
                  text-lg
                  leading-relaxed
                  text-hive-text-muted
                "
              >
                Our multidisciplinary
                teams combine deep
                technical knowledge
                with practical
                business understanding
                to ensure your AI
                initiatives deliver
                measurable success.
              </p>
            </FadeIn>
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
              Ready to explore
              what&apos;s possible
              with AI?
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
              Let&apos;s discuss how{' '}
              {service.title} can
              transform your
              operations and create
              new competitive
              advantages.
            </p>

            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Start a Conversation

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