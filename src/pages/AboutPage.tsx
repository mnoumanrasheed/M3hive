import React, {
  useRef,
  useState,
} from 'react';

import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { OfficeCard } from '../components/ui/OfficeCard';
import { HeroBackground } from '../components/ui/HeroBackground';
import { PremiumHeroMotion } from '../components/ui/PremiumHeroMotion';

import { aboutPageData } from '../data/about';
import { officeLocations } from '../data/offices';

export const AboutPage: React.FC = () => {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const [isMuted, setIsMuted] =
    useState(true);

  const toggleVideoSound = () => {
    const video = videoRef.current;

    if (!video) return;

    const nextMuted = !video.muted;

    video.muted = nextMuted;

    setIsMuted(nextMuted);

    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <PageShell title="About M3 Hive">
      {/* =========================================================
          HERO
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
        <PremiumHeroMotion variant="about" />

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
                (
                  paragraph,
                  index,
                ) => (
                  <p
                    key={index}
                    className="
                      mb-4
                      text-base
                      leading-relaxed
                      last:mb-0
                    "
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================
          M3 HIVE VIDEO STORY
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#090909]
          py-16
          sm:py-20
          lg:py-24
        "
      >
        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-1/2
            h-96
            w-96
            -translate-y-1/2
            rounded-full
            bg-hive-yellow/5
            blur-3xl
          "
        />

        {/* Secondary background glow */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-160px]
            left-[-100px]
            h-80
            w-80
            rounded-full
            bg-hive-orange/5
            blur-3xl
          "
        />

        <Container
          size="lg"
          className="relative z-10"
        >
          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-12
              lg:grid-cols-12
              lg:gap-16
            "
          >
            {/* LEFT CONTENT */}

            <div className="lg:col-span-4">
              <FadeIn>
                <div
                  className="
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-hive-yellow/30
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
                      shadow-[0_0_10px_rgba(253,207,9,0.8)]
                    "
                  />

                  <span
                    className="
                      font-heading
                      text-xs
                      font-bold
                      uppercase
                      tracking-widest
                      text-hive-yellow
                    "
                  >
                    Inside M3 Hive
                  </span>
                </div>

                <h2
                  className="
                    mb-6
                    font-heading
                    text-3xl
                    font-bold
                    leading-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  Technology with purpose.
                  <br />
                  People with impact.
                </h2>

                <p
                  className="
                    text-base
                    leading-relaxed
                    text-white/75
                    sm:text-lg
                  "
                >
                  Discover how our people,
                  technology and global
                  capabilities come together
                  to create meaningful digital
                  experiences and lasting
                  business value.
                </p>

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-white/60
                  "
                >
                  <span
                    className="
                      h-px
                      w-10
                      bg-hive-yellow
                    "
                  />

                  Our story in motion
                </div>
              </FadeIn>
            </div>

            {/* RIGHT VIDEO */}

            <div className="lg:col-span-8">
              <FadeIn delay={0.15}>
                <div
                  onClick={toggleVideoSound}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      event.preventDefault();
                      toggleVideoSound();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isMuted
                      ? 'Turn video sound on'
                      : 'Turn video sound off'
                  }
                  className="
                    group
                    relative
                    cursor-pointer
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-black
                    shadow-[0_30px_90px_rgba(0,0,0,0.50)]
                    outline-none
                    transition-all
                    duration-300
                    hover:border-hive-yellow/30
                    focus-visible:ring-2
                    focus-visible:ring-hive-yellow
                  "
                >
                  {/* Yellow top accent */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-0
                      top-0
                      z-30
                      h-0.5
                      w-full
                      bg-gradient-to-r
                      from-transparent
                      via-hive-yellow
                      to-transparent
                    "
                  />

                  {/* Sound indicator */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-4
                      z-40
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/20
                      bg-black/55
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-white
                      shadow-lg
                      backdrop-blur-md
                      transition-all
                      duration-300
                      sm:right-5
                      sm:top-5
                    "
                  >
                    <span
                      className={`
                        h-2
                        w-2
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          isMuted
                            ? 'bg-white/50'
                            : 'bg-hive-yellow shadow-[0_0_10px_rgba(253,207,9,0.95)]'
                        }
                      `}
                    />

                    {isMuted
                      ? 'Click for Sound'
                      : 'Sound On'}
                  </div>

                  {/* Video ratio */}

                  <div
                    className="
                      relative
                      aspect-video
                      w-full
                      overflow-hidden
                      bg-black
                    "
                  >
                    <video
                      ref={videoRef}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.01]
                      "
                      src="/videos/who-we-are.mp4"
                      poster="/assets/heroes/hero-about.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* Cinematic video overlay */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-black/10
                      "
                    />

                    {/* Subtle yellow highlight */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_72%_25%,rgba(253,207,9,0.08),transparent_40%)]
                      "
                    />

                    {/* Bottom caption */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-0
                        right-0
                        z-20
                        flex
                        items-end
                        justify-between
                        p-5
                        sm:p-7
                      "
                    >
                      <div>
                        <p
                          className="
                            font-heading
                            text-base
                            font-bold
                            text-white
                            sm:text-lg
                          "
                        >
                          M3 Hive
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-white/70
                            sm:text-sm
                          "
                        >
                          Building what comes next
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/20
                          bg-black/40
                          backdrop-blur-md
                        "
                      >
                        <span
                          className={`
                            h-2.5
                            w-2.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              isMuted
                                ? 'bg-white/50'
                                : 'bg-hive-yellow shadow-[0_0_12px_rgba(253,207,9,0.9)]'
                            }
                          `}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
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
              (
                value,
                index,
              ) => (
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
              (
                pillar,
                index,
              ) => (
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
              (
                office,
                index,
              ) => (
                <FadeIn
                  key={office.id}
                  delay={
                    (index % 3) *
                    0.1
                  }
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
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-80
            w-96
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-hive-yellow/5
            blur-3xl
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