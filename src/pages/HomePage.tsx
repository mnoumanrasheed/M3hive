import React from 'react';

import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/ui/FadeIn';

import { PartnersMarquee } from '../components/home/PartnersMarquee';
import { DiscoveryForm } from '../components/home/DiscoveryForm';
import { HeroCarousel } from '../components/home/HeroCarousel';

/*
 * IMPORTANT:
 * This is the NEW auto-rotating testimonial carousel.
 */
import TestimonialsCarousel from '../components/TestimonialsCarousel';

import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { homepageData } from '../data/homepage';

/* ============================================================
   SERVICE CARD
============================================================ */

const ServiceSummaryCard: React.FC<{
  service: any;
  index: number;
}> = ({ service, index }) => {
  return (
    <div
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-hive-border
        bg-hive-white
        p-6
        sm:p-8
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-hive-yellow
        hover:shadow-xl
      "
    >
      {/* Number */}
      <div
        className="
          mb-8
          text-sm
          font-semibold
          text-hive-orange
        "
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3
        className="
          mb-4
          font-heading
          text-xl
          font-bold
          text-hive-black
          sm:text-2xl
        "
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="
          mb-8
          flex-grow
          text-sm
          leading-relaxed
          text-hive-text-muted
          sm:text-base
        "
      >
        {service.description}
      </p>

      {/* CTA */}
      <a
        href={service.ctaHref || service.href || '#'}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-hive-black
          transition-colors
          duration-300
          group-hover:text-hive-orange
        "
      >
        {service.ctaLabel}

        <ArrowUpRight
          className="
            h-4
            w-4
            transition-transform
            duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />
      </a>

      {/* Bottom hover accent */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-gradient-to-r
          from-hive-orange
          to-hive-yellow
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </div>
  );
};

/* ============================================================
   HOME PAGE
============================================================ */

export const HomePage: React.FC = () => {
  return (
    <PageShell title="M3 Hive - Engineering Digital Experiences">
      {/* ======================================================
          HERO CAROUSEL
      ====================================================== */}

      <HeroCarousel />

      {/* ======================================================
          INTRO SECTION
      ====================================================== */}

      <section className="bg-hive-white py-16 sm:py-24 lg:py-32">
        <Container size="lg">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionHeading
                  title={homepageData.intro.title}
                  eyebrow="Who We Are"
                  accentBar
                />
              </FadeIn>
            </div>

            <div className="space-y-8 lg:col-span-7">
              <FadeIn delay={0.2}>
                <div className="prose prose-lg max-w-none text-hive-text-muted">
                  {homepageData.intro.description
                    .split('\n\n')
                    .map((para, i) => (
                      <p
                        key={i}
                        className="
                          mb-4
                          text-base
                          leading-relaxed
                          last:mb-0
                        "
                      >
                        {para}
                      </p>
                    ))}
                </div>

                <div className="mt-8">
                  <Button
                    href={homepageData.intro.ctaHref}
                    variant="ghost"
                  >
                    {homepageData.intro.ctaLabel}

                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================
          SERVICES
      ====================================================== */}

      <section
        className="
          border-y
          border-hive-border
          bg-hive-gray
          py-16
          sm:py-24
          lg:py-32
        "
      >
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title={homepageData.servicesSummary.title}
              description="Comprehensive capabilities to transform operations, improve experiences, and build competitive advantage."
              centered
              eyebrow="Our Expertise"
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
            {homepageData.servicesSummary.services.map(
              (service, idx) => (
                <FadeIn
                  key={service.title || idx}
                  delay={idx * 0.1}
                >
                  <ServiceSummaryCard
                    service={service}
                    index={idx}
                  />
                </FadeIn>
              )
            )}
          </div>
        </Container>
      </section>

      {/* ======================================================
          CLIENTS / TESTIMONIALS
      ====================================================== */}

      <section
        className="
          overflow-hidden
          bg-hive-white
          py-16
          sm:py-24
          lg:py-32
        "
      >
        <Container size="lg">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <FadeIn>
              <SectionHeading
                title={homepageData.clientsOverview.title}
                description={
                  homepageData.clientsOverview.description
                }
                centered
                eyebrow="Proven Impact"
                accentBar
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            {/* NEW PREMIUM AUTO-ROTATING CAROUSEL */}
            <TestimonialsCarousel />
          </FadeIn>
        </Container>
      </section>

      {/* ======================================================
          PARTNERS
      ====================================================== */}

      <PartnersMarquee />

      {/* ======================================================
          CONTACT CTA
      ====================================================== */}

      <section className="bg-hive-white py-16 sm:py-24 lg:py-32">
        <Container size="lg">
          <FadeIn>
            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-hive-border
                bg-hive-black
                p-6
                text-hive-white
                sm:rounded-[2rem]
                sm:p-8
                md:p-12
                lg:p-16
              "
            >
              {/* Decorative glow */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-64
                  w-64
                  -translate-y-1/2
                  translate-x-1/3
                  rounded-full
                  bg-hive-yellow/10
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-64
                  w-64
                  -translate-x-1/3
                  translate-y-1/2
                  rounded-full
                  bg-hive-orange/10
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  z-10
                  grid
                  grid-cols-1
                  items-center
                  gap-8
                  lg:grid-cols-12
                  lg:gap-16
                "
              >
                <div className="text-center lg:col-span-5 lg:text-left">
                  <h2
                    className="
                      mb-4
                      font-heading
                      text-display-sm
                      font-bold
                      text-hive-yellow
                      sm:mb-6
                      sm:text-display-md
                    "
                  >
                    {homepageData.contactCTA.title}
                  </h2>

                  <p className="text-base text-neutral-400 sm:text-lg">
                    {homepageData.contactCTA.description}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <DiscoveryForm />
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};