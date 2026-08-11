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
  Code2,
  Layers3,
  MonitorCog,
  Rocket,
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

import { productEngineeringData } from '../../data/services/productEngineering';

/* ============================================================
   TYPES
============================================================ */

interface Capability {
  title: string;
  description: string;
}

interface ApproachStep {
  stepNumber: string;
  title: string;
  description: string;
}

interface BusinessValue {
  title: string;
  description: string;
}

interface ProductEngineeringDetail {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  overview: string;
  capabilities: Capability[];
  approach: ApproachStep[];
  businessValue: BusinessValue[];
}

/* ============================================================
   BUILD DETAIL DATA FROM EXISTING PRODUCT ENGINEERING DATA

   IMPORTANT:
   We use the existing productEngineering.ts file.
   No missing productEngineeringDetails.ts dependency.
============================================================ */

const productEngineeringDetails: ProductEngineeringDetail[] =
  productEngineeringData.offerings.map((offering) => {
    const commonCapabilities: Capability[] = [
      {
        title: 'Discovery & Planning',
        description:
          `We assess requirements, business objectives, technical constraints and delivery priorities to establish a clear roadmap for ${offering.title.toLowerCase()}.`,
      },
      {
        title: 'Architecture & Engineering',
        description:
          'Our engineering teams apply secure, scalable and maintainable architecture patterns supported by modern development practices.',
      },
      {
        title: 'Quality & Automation',
        description:
          'Automated testing, continuous integration and quality engineering help improve reliability while reducing delivery risk.',
      },
      {
        title: 'Continuous Improvement',
        description:
          'Performance data, user feedback and operational insight are used to continuously improve the product after release.',
      },
    ];

    const commonBusinessValue: BusinessValue[] = [
      {
        title: 'Faster Delivery',
        description:
          'Structured engineering practices and automation help shorten delivery cycles without compromising quality.',
      },
      {
        title: 'Improved Quality',
        description:
          'Continuous testing and engineering standards reduce defects, technical debt and operational risk.',
      },
      {
        title: 'Greater Scalability',
        description:
          'Modern architecture provides a stronger foundation for future growth, integration and changing business requirements.',
      },
      {
        title: 'Lower Delivery Risk',
        description:
          'Clear governance, technical visibility and predictable delivery practices improve decision-making throughout the lifecycle.',
      },
    ];

    return {
      slug: offering.id,
      title: offering.title,
      eyebrow: 'Product Engineering',
      intro: offering.description,
      overview: offering.description,
      capabilities: commonCapabilities,
      approach: productEngineeringData.deliveryApproach ?? [],
      businessValue: commonBusinessValue,
    };
  });

/* ============================================================
   PREMIUM HERO VISUAL

   No external/local image dependency.
   Therefore no broken hero images.
============================================================ */

const ProductEngineeringHeroVisual: React.FC = () => {
  return (
    <div
      className="
        relative
        mx-auto
        flex
        h-[360px]
        w-full
        max-w-[520px]
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Large background glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-hive-yellow/10
          blur-[90px]
        "
      />

      {/* Outer ring */}

      <div
        className="
          hero-ring
          absolute
          h-[300px]
          w-[300px]
          rounded-full
          border
          border-hive-yellow/20
        "
      />

      {/* Middle ring */}

      <div
        className="
          hero-ring-reverse
          absolute
          h-[230px]
          w-[230px]
          rounded-full
          border
          border-dashed
          border-hive-yellow/30
        "
      />

      {/* Center card */}

      <div
        className="
          relative
          z-10
          flex
          h-[150px]
          w-[190px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-white/10
          bg-white/[0.06]
          shadow-[0_25px_70px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
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
          <Code2 className="h-6 w-6 text-hive-yellow" />
        </div>

        <span
          className="
            font-heading
            text-sm
            font-bold
            uppercase
            tracking-[0.18em]
            text-white
          "
        >
          Engineering
        </span>
      </div>

      {/* Floating card 1 */}

      <div
        className="
          hero-float-a
          absolute
          left-[3%]
          top-[18%]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          shadow-xl
        "
      >
        <Layers3 className="h-5 w-5 text-hive-yellow" />
      </div>

      {/* Floating card 2 */}

      <div
        className="
          hero-float-b
          absolute
          right-[5%]
          top-[23%]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          shadow-xl
        "
      >
        <MonitorCog className="h-5 w-5 text-hive-yellow" />
      </div>

      {/* Floating card 3 */}

      <div
        className="
          hero-float-c
          absolute
          bottom-[14%]
          left-[17%]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          shadow-xl
        "
      >
        <Rocket className="h-5 w-5 text-hive-yellow" />
      </div>

      {/* Connection lines */}

      <div
        className="
          absolute
          left-[20%]
          top-1/2
          h-px
          w-[22%]
          bg-gradient-to-r
          from-transparent
          to-hive-yellow/40
        "
      />

      <div
        className="
          absolute
          right-[20%]
          top-1/2
          h-px
          w-[22%]
          bg-gradient-to-l
          from-transparent
          to-hive-yellow/40
        "
      />
    </div>
  );
};

/* ============================================================
   PAGE
============================================================ */

export const ProductEngineeringDetailPage: React.FC = () => {
  const { slug } = useParams<{
    slug: string;
  }>();

  const service = useMemo(
    () =>
      productEngineeringDetails.find(
        (item) => item.slug === slug,
      ),
    [slug],
  );

  const relatedServices = useMemo(
    () =>
      productEngineeringDetails.filter(
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
     RESET ACTIVE CAPABILITY WHEN PAGE CHANGES
  ============================================================ */

  useEffect(() => {
    setActiveCapability(0);
  }, [slug]);

  /* ============================================================
     HERO GSAP
  ============================================================ */

  useEffect(() => {
    if (!service || !heroRef.current) {
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
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
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
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
          },
          '-=0.75',
        );

      gsap.to('.hero-ring', {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.hero-ring-reverse', {
        rotate: -360,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.hero-float-a', {
        y: -8,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-float-b', {
        y: 8,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-float-c', {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
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
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
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
     INVALID SLUG
  ============================================================ */

  if (!service) {
    return (
      <Navigate
        to="/services/product-engineering"
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
      label: 'Product Engineering',
      href: '/services/product-engineering',
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
          min-h-[620px]
          flex-col
          overflow-hidden
          border-b
          border-white/10
          bg-[#080808]
        "
      >
        {/* Premium background */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_70%_40%,rgba(253,207,9,0.12),transparent_34%)]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.07]
            [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
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
            py-24
            sm:py-28
            lg:py-32
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
                    text-display-md
                    font-bold
                    leading-[1.12]
                    text-white
                    sm:text-display-lg
                  "
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
                  lg:block
                "
              >
                <ProductEngineeringHeroVisual />
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
          CORE CAPABILITIES
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
              title="Core Capabilities"
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
                    <button
                      key={
                        capability.title
                      }
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
                            : 'border-transparent bg-transparent text-hive-text-muted hover:border-hive-border hover:bg-hive-white hover:text-hive-black'
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
          APPROACH
      ====================================================== */}

      <section
        className="
          border-b
          border-hive-border
          bg-hive-white
          py-16
          sm:py-24
        "
      >
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Our Delivery Approach"
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
              lg:grid-cols-3
            "
          >
            {service.approach.map(
              (step, index) => (
                <FadeIn
                  key={
                    step.stepNumber
                  }
                  delay={
                    index * 0.08
                  }
                >
                  <div
                    className="
                      group
                      h-full
                      rounded-2xl
                      border
                      border-hive-border
                      bg-hive-warm-white
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-hive-yellow
                      hover:shadow-lg
                    "
                  >
                    <div
                      className="
                        mb-5
                        inline-flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-hive-yellow/30
                        bg-hive-yellow/15
                      "
                    >
                      <span
                        className="
                          font-heading
                          text-base
                          font-bold
                          text-hive-black
                        "
                      >
                        {
                          step.stepNumber
                        }
                      </span>
                    </div>

                    <h3
                      className="
                        mb-3
                        font-heading
                        text-lg
                        font-bold
                        text-hive-black
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        text-sm
                        leading-relaxed
                        text-hive-text-muted
                      "
                    >
                      {
                        step.description
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
          BUSINESS VALUE
          CONTRAST FIXED
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
            h-[400px]
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
              lg:grid-cols-4
            "
          >
            {service.businessValue.map(
              (
                value,
                index,
              ) => (
                <FadeIn
                  key={
                    value.title
                  }
                  delay={
                    index * 0.08
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
                      hover:-translate-y-1
                      hover:border-hive-yellow/50
                      hover:bg-[#191919]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.40)]
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
                        group-hover:w-full
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
              title="Explore Other Product Engineering Services"
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
              lg:grid-cols-4
            "
          >
            {relatedServices
              .slice(0, 4)
              .map(
                (
                  relatedService,
                  index,
                ) => (
                  <FadeIn
                    key={
                      relatedService.slug
                    }
                    delay={
                      index * 0.08
                    }
                  >
                    <Link
                      to={`/services/product-engineering/${relatedService.slug}`}
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
                        hover:-translate-y-1
                        hover:border-hive-yellow
                        hover:shadow-hive-lg
                      "
                    >
                      <h3
                        className="
                          mb-4
                          font-heading
                          text-lg
                          font-bold
                          text-hive-black
                          transition-colors
                          duration-300
                          group-hover:text-hive-orange
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
                          group-hover:text-hive-orange
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
              Ready to build your
              next digital product?
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
              your product goals,
              technical challenges and
              delivery requirements.
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