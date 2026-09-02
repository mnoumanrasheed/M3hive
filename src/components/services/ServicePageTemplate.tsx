import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../layout/PageShell';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { FadeIn } from '../ui/FadeIn';
import { Button } from '../ui/Button';
import { FAQAccordion } from '../ui/FAQAccordion';
import { ServicePageData } from '../../types/content';
import { Breadcrumbs, BreadcrumbItem } from '../ui/Breadcrumbs';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { AnimatedTimeline } from '../animation/AnimatedTimeline';
import { ServiceHeroMotion } from './ServiceHeroMotion';

interface ServicePageTemplateProps {
  data: ServicePageData;
  serviceCategoryName: string;
}

const heroImageMap: Record<string, string> = {
  'Artificial Intelligence':
    '/assets/heroes/hero-artificial-intelligence.jpg',

  'Product Engineering':
    '/assets/heroes/hero-product-engineering.jpg',

  'Customer Experience':
    '/assets/heroes/hero-customer-experience.jpg',

  'Intelligent Automation':
    '/assets/heroes/hero-intelligent-automation.jpg',

  'Data & Analytics':
    '/assets/heroes/hero-data-analytics.jpg',

  'Cloud Platforms':
    '/assets/heroes/hero-cloud-platforms.jpg',

  'Edge Technologies':
    '/assets/heroes/hero-edge-technologies.jpg',
};

export const ServicePageTemplate: React.FC<
  ServicePageTemplateProps
> = ({
  data,
  serviceCategoryName,
}) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: serviceCategoryName,
    },
  ];

  const heroImageUrl =
    heroImageMap[serviceCategoryName];

  return (
    <PageShell
      title={data.title}
      description={data.subtitle}
    >
      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative
          isolate
          flex
          min-h-[600px]
          w-full
          flex-col
          overflow-hidden
          border-b
          border-hive-border
          bg-black
        "
        style={{
          minHeight: 'max(600px, calc(100svh - 80px))',
        }}
      >
        {/* ===============================================
            PREMIUM MOVING SERVICE HERO

            Background image pans/zooms continuously.
            Decorative motion stays behind the copy.
            Text itself remains stable.
        =============================================== */}

        {heroImageUrl && (
          <ServiceHeroMotion
            key={`service-motion-${serviceCategoryName}-${heroImageUrl}`}
            imageUrl={heroImageUrl}
          />
        )}

        {/* ===============================================
            HERO CONTENT
        =============================================== */}

        <div
          className="
            relative
            z-20

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
          <Container size="md">
            {/* Breadcrumb */}

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

            {/* Stable hero content.
                Only a short entrance reveal is used here.
                Continuous movement stays in the background only. */}

            <div className="max-w-5xl">
              {/* =========================================
                  HEADING
              ========================================= */}

              <FadeIn>
                <h1
                  className="
                    mb-4
                    max-w-full
                    font-heading
                    font-bold
                    tracking-[-0.02em]
                    text-white
                    drop-shadow-md
                  "
                  style={{
                    fontSize:
                      'clamp(1.65rem, 4.4vw, 4.5rem)',
                    lineHeight: '1.08',
                  }}
                >
                  {data.title}
                </h1>
              </FadeIn>

              {/* =========================================
                  SUBTITLE
              ========================================= */}

              <FadeIn delay={0.12}>
                <p
                  className="
                    mb-6
                    max-w-3xl
                    text-base
                    leading-relaxed
                    text-white/90
                    drop-shadow
                    sm:mb-8
                    sm:text-lg
                    md:text-xl
                  "
                >
                  {data.subtitle}
                </p>
              </FadeIn>

              {/* =========================================
                  CTA
              ========================================= */}

              {data.heroCta && (
                <FadeIn delay={0.22}>
                  <div>
                    <Button
                      href={data.heroCta.href}
                      variant="primary"
                      size="lg"
                    >
                      {data.heroCta.label}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </FadeIn>
              )}
            </div>
          </Container>
        </div>
      </section>

      {/* ==================================================
          OFFERINGS
      ================================================== */}

      <section className="bg-hive-white py-14 sm:py-20 lg:py-24">
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Solving Business Challenges"
              description="Our capabilities and focus areas within this domain."
              accentBar
            />
          </FadeIn>

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-4

              sm:mt-16
              sm:gap-6

              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {data.offerings.map(
              (offering, idx) => (
                <FadeIn
                  key={offering.id}
                  delay={idx * 0.1}
                  className="flex"
                >
                  <div
                    className="
                      group
                      relative

                      flex
                      h-full
                      w-full
                      flex-col

                      rounded-2xl

                      border
                      border-hive-border

                      bg-hive-white

                      p-6

                      transition-all
                      duration-300

                      md:hover:-translate-y-1
                      md:hover:border-hive-yellow/70
                      md:hover:shadow-hive-lg

                      sm:p-8
                    "
                  >
                    {offering.ctaHref && (
                      <Link
                        to={offering.ctaHref}
                        className="
                          absolute
                          inset-0
                          z-10
                        "
                        aria-label={`Read more about ${offering.title}`}
                      />
                    )}

                    <h3
                      className="
                        mb-4

                        font-heading
                        text-xl
                        font-bold

                        text-hive-black
                      "
                    >
                      {offering.title}
                    </h3>

                    <p
                      className="
                        flex-1

                        text-sm
                        leading-relaxed

                        text-hive-text-muted
                      "
                    >
                      {offering.description}
                    </p>

                    {offering.ctaLabel && (
                      <div
                        className="
                          mt-6

                          flex
                          items-center
                          gap-1.5

                          text-sm
                          font-semibold

                          text-hive-text-muted

                          transition-colors
                          duration-300

                          md:group-hover:text-hive-yellow
                        "
                      >
                        {offering.ctaLabel}

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
                    )}
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </Container>
      </section>

      {/* ==================================================
          DELIVERY APPROACH
      ================================================== */}

      {data.deliveryApproach &&
        data.deliveryApproach.length > 0 && (
          <section
            className="
              overflow-hidden

              border-y
              border-hive-border

              bg-hive-gray

              py-14
              sm:py-20
              lg:py-24
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

              <AnimatedTimeline
                steps={data.deliveryApproach}
              />
            </Container>
          </section>
        )}

      {/* ==================================================
          INDUSTRIES
      ================================================== */}

      {data.industries &&
        data.industries.length > 0 && (
          <section className="bg-hive-white py-14 sm:py-20 lg:py-24">
            <Container size="lg">
              <FadeIn>
                <SectionHeading
                  title="Industries We Serve"
                  accentBar
                />
              </FadeIn>

              <div
                className="
                  mt-10

                  grid
                  grid-cols-1
                  gap-4

                  sm:mt-12
                  sm:gap-6

                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {data.industries.map(
                  (industry, idx) => (
                    <FadeIn
                      key={idx}
                      delay={idx * 0.1}
                      className="flex"
                    >
                      <div
                        className="
                          h-full
                          w-full

                          rounded-2xl

                          border
                          border-hive-border

                          bg-hive-warm-white

                          p-6
                        "
                      >
                        <h4
                          className="
                            mb-2

                            font-heading
                            text-base
                            font-bold

                            text-hive-black
                          "
                        >
                          {industry.title}
                        </h4>

                        <p
                          className="
                            text-sm
                            leading-relaxed

                            text-hive-text-muted
                          "
                        >
                          {
                            industry.description
                          }
                        </p>
                      </div>
                    </FadeIn>
                  )
                )}
              </div>
            </Container>
          </section>
        )}

      {/* ==================================================
          DIFFERENTIATORS
      ================================================== */}

      {data.differentiators &&
        data.differentiators.length > 0 && (
          <section
            className="
              border-y
              border-hive-border

              bg-hive-black

              py-14
              sm:py-20
              lg:py-24
            "
          >
            <Container size="lg">
              <FadeIn>
                <SectionHeading
                  title={`Why Choose M3 Hive for ${serviceCategoryName}`}
                  description="We bring specialized capability and practical experience to every engagement."
                  variant="dark"
                />
              </FadeIn>

              <div
                className="
                  mt-10

                  grid
                  grid-cols-1

                  gap-x-8
                  gap-y-8

                  sm:mt-16
                  sm:gap-x-12
                  sm:gap-y-10

                  md:grid-cols-2
                "
              >
                {data.differentiators.map(
                  (diff, idx) => (
                    <FadeIn
                      key={idx}
                      delay={idx * 0.1}
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-4
                        "
                      >
                        <CheckCircle2
                          className="
                            mt-0.5
                            h-6
                            w-6

                            flex-shrink-0

                            text-hive-yellow
                          "
                        />

                        <div>
                          <h4
                            className="
                              mb-2

                              font-heading
                              text-lg
                              font-bold

                              text-white
                            "
                          >
                            {diff.title}
                          </h4>

                          <p
                            className="
                              text-sm
                              leading-relaxed

                              text-white/70
                            "
                          >
                            {
                              diff.description
                            }
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  )
                )}
              </div>
            </Container>
          </section>
        )}

      {/* ==================================================
          TESTIMONIALS
      ================================================== */}

      {data.testimonials &&
        data.testimonials.length > 0 && (
          <section
            className="
              border-y
              border-hive-border

              bg-hive-gray

              py-14
              sm:py-20
              lg:py-24
            "
          >
            <Container size="lg">
              <FadeIn>
                <SectionHeading
                  title="Client Impact"
                  centered
                  accentBar
                />
              </FadeIn>

              <div
                className="
                  mt-10

                  grid
                  grid-cols-1
                  gap-4

                  sm:mt-12
                  sm:gap-6

                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {data.testimonials.map(
                  (testimonial, idx) => (
                    <FadeIn
                      key={testimonial.id}
                      delay={idx * 0.1}
                      className="h-full"
                    >
                      <div
                        className="
                          flex
                          h-full
                          flex-col

                          rounded-2xl

                          border
                          border-hive-border

                          bg-hive-white

                          p-6

                          shadow-hive-sm

                          sm:p-8
                        "
                      >
                        <p
                          className="
                            mb-6
                            flex-1

                            text-sm
                            italic
                            leading-relaxed

                            text-hive-black
                          "
                        >
                          "{testimonial.text}"
                        </p>

                        <div
                          className="
                            flex
                            items-center
                            gap-4

                            border-t
                            border-hive-border

                            pt-4
                          "
                        >
                          {testimonial.logo && (
                            <img
                              src={
                                testimonial.logo
                              }
                              alt={`${
                                testimonial.clientName ||
                                'Client'
                              } logo`}
                              loading="lazy"
                              className="
                                h-8
                                max-w-[80px]
                                object-contain
                              "
                            />
                          )}

                          <div>
                            {testimonial.authorName && (
                              <div
                                className="
                                  font-heading
                                  text-sm
                                  font-bold
                                "
                              >
                                {
                                  testimonial.authorName
                                }
                              </div>
                            )}

                            {testimonial.authorRole && (
                              <div
                                className="
                                  text-xs
                                  text-hive-text-muted
                                "
                              >
                                {
                                  testimonial.authorRole
                                }
                              </div>
                            )}

                            {!testimonial.authorName && (
                              <div
                                className="
                                  font-heading
                                  text-sm
                                  font-bold
                                "
                              >
                                {
                                  testimonial.clientName
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )
                )}
              </div>
            </Container>
          </section>
        )}

      {/* ==================================================
          SUCCESS STORIES
      ================================================== */}

      {data.successStories &&
        data.successStories.length > 0 && (
          <section
            className="
              border-b
              border-hive-border

              bg-hive-white

              py-20
              lg:py-24
            "
          >
            <Container size="md">
              <FadeIn>
                <SectionHeading
                  title="Success Stories"
                  centered
                  accentBar
                />
              </FadeIn>

              <div className="mt-12 space-y-6">
                {data.successStories.map(
                  (story, idx) => (
                    <FadeIn
                      key={idx}
                      delay={idx * 0.1}
                    >
                      <div
                        className="
                          rounded-2xl

                          border
                          border-hive-border

                          bg-hive-warm-white

                          p-6
                        "
                      >
                        <p
                          className="
                            text-sm
                            leading-relaxed

                            text-hive-text-muted
                          "
                        >
                          {story}
                        </p>
                      </div>
                    </FadeIn>
                  )
                )}
              </div>
            </Container>
          </section>
        )}

      {/* ==================================================
          FAQ
      ================================================== */}

      {data.faqs &&
        data.faqs.length > 0 && (
          <section className="bg-hive-white py-20 lg:py-24">
            <Container size="md">
              <FadeIn>
                <SectionHeading
                  title="Frequently Asked Questions"
                  centered
                  accentBar
                />
              </FadeIn>

              <FadeIn
                delay={0.2}
                className="mt-12"
              >
                <FAQAccordion
                  items={data.faqs}
                />
              </FadeIn>
            </Container>
          </section>
        )}
    </PageShell>
  );
};