import React from 'react';

import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { OfficeCard } from '../components/ui/OfficeCard';
import { HeroBackground } from '../components/ui/HeroBackground';

import { aboutPageData } from '../data/about';
import { officeLocations } from '../data/offices';

export const AboutPage: React.FC = () => {
  return (
    <PageShell title="About M3 Hive">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section
        className="
          relative
          z-0
          overflow-hidden
          border-b
          border-hive-border
          pb-12
          pt-20
          sm:pb-16
          sm:pt-24
          lg:pb-24
          lg:pt-32
        "
      >
        <HeroBackground imageUrl="/assets/heroes/hero-about.jpg" />

        <Container
          size="md"
          className="relative z-10 text-center"
        >
          <FadeIn>
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-hive-yellow/40
                bg-hive-yellow/10
                px-3
                py-1.5
                sm:mb-6
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
                About Us
              </span>
            </div>

            <h1
              className="
                mb-4
                font-heading
                text-display-md
                font-bold
                text-white
                drop-shadow-md
                sm:mb-6
                sm:text-display-lg
              "
            >
              {aboutPageData.title}
            </h1>

            <p
              className="
                text-base
                leading-relaxed
                text-white/90
                drop-shadow
                sm:text-lg
              "
            >
              {aboutPageData.subtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================
          WHO WE ARE
      ========================================================= */}

      <section
        className="
          bg-hive-white
          py-14
          sm:py-20
          lg:py-24
        "
      >
        <Container size="md">
          <FadeIn>
            <SectionHeading
              title={aboutPageData.whoWeAreTitle}
              accentBar
            />

            <div
              className="
                prose
                prose-lg
                mt-8
                max-w-none
                text-hive-text-muted
              "
            >
              {aboutPageData.whoWeAreDescription.map(
                (para, index) => (
                  <p
                    key={index}
                    className="
                      mb-4
                      text-base
                      leading-relaxed
                      last:mb-0
                    "
                  >
                    {para}
                  </p>
                ),
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================
          CLIENTS & PARTNERS
      ========================================================= */}

      <section
        className="
          bg-hive-white
          py-14
          sm:py-20
          lg:py-24
        "
      >
        <Container size="md">
          <FadeIn>
            <div
              className="
                mx-auto
                max-w-3xl
                space-y-6
                text-center
              "
            >
              <h2
                className="
                  font-heading
                  text-3xl
                  font-bold
                  text-hive-black
                "
              >
                {aboutPageData.clientsPartnersTitle}
              </h2>

              <p
                className="
                  text-lg
                  leading-relaxed
                  text-hive-text-muted
                "
              >
                {aboutPageData.clientsPartnersDescription}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================
          OUR VALUES
      ========================================================= */}

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
              title={aboutPageData.valuesTitle}
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
              sm:mt-16
              sm:grid-cols-2
              sm:gap-6
              lg:grid-cols-3
            "
          >
            {aboutPageData.values.map(
              (value, index) => (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                >
                  <div
                    className="
                      h-full
                      rounded-2xl
                      border
                      border-hive-border
                      bg-hive-white
                      p-6
                      sm:p-8
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-hive-yellow/20
                        bg-hive-yellow/10
                      "
                    >
                      <span
                        className="
                          font-heading
                          text-sm
                          font-bold
                          text-hive-yellow
                        "
                      >
                        {index + 1}
                      </span>
                    </div>

                    <h4
                      className="
                        mb-3
                        font-heading
                        text-lg
                        font-bold
                        text-hive-black
                      "
                    >
                      {value.title}
                    </h4>

                    <p
                      className="
                        text-sm
                        leading-relaxed
                        text-hive-text-muted
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

      {/* =========================================================
          WE ARE M3 HIVE PILLARS
      ========================================================= */}

      <section
        className="
          bg-hive-white
          py-14
          sm:py-20
          lg:py-24
        "
      >
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title={aboutPageData.pillarsTitle}
              centered
              accentBar
            />
          </FadeIn>

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-5
              sm:mt-16
              sm:grid-cols-2
              sm:gap-8
              md:grid-cols-3
            "
          >
            {aboutPageData.pillars.map(
              (pillar, index) => (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  className="flex"
                >
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      flex-col
                      rounded-2xl
                      border
                      border-hive-border
                      bg-hive-warm-white
                      p-6
                      transition-all
                      duration-300
                      hover:border-hive-yellow/50
                      hover:shadow-hive-hover
                      sm:p-8
                    "
                  >
                    <h3
                      className="
                        mb-4
                        font-heading
                        text-xl
                        font-bold
                        text-hive-black
                      "
                    >
                      {pillar.title}
                    </h3>

                    <p
                      className="
                        flex-1
                        text-sm
                        leading-relaxed
                        text-hive-text-muted
                      "
                    >
                      {pillar.description}
                    </p>
                  </div>
                </FadeIn>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================
          GLOBAL OFFICES
      ========================================================= */}

      <section
        className="
          border-t
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
              title="Our Global Offices"
              description={`M3 Hive operates ${officeLocations.length} offices and development centres across the world, enabling us to deliver round-the-clock support and regional expertise.`}
              accentBar
            />
          </FadeIn>

          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {officeLocations.map(
              (office, index) => (
                <FadeIn
                  key={office.id}
                  delay={(index % 3) * 0.1}
                >
                  <OfficeCard office={office} />
                </FadeIn>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================
          ESG COMMITMENT
          CONTRAST FIXED
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-white/10
          bg-[#080808]
          py-14
          text-white
          sm:py-20
          lg:py-24
        "
      >
        {/* Subtle glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[360px]
            w-[620px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-hive-yellow/[0.05]
            blur-[120px]
          "
        />

        <Container
          size="md"
          className="relative z-10"
        >
          <FadeIn>
            <div
              className="
                mx-auto
                max-w-4xl
                space-y-6
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  mb-8
                  h-1
                  w-16
                  rounded-full
                  bg-hive-yellow
                "
              />

              <h2
                className="
                  font-heading
                  text-3xl
                  font-bold
                  leading-tight
                  text-white
                  sm:text-4xl
                  lg:text-4xl
                "
              >
                Environmental, Social and Governance Commitment
              </h2>

              <p
                className="
                  mx-auto
                  max-w-4xl
                  text-lg
                  leading-relaxed
                  text-white/80
                "
              >
                {aboutPageData.esgCommitment}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};