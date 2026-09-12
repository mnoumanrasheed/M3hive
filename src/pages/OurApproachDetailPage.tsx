import React, { useMemo } from 'react';
import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/ui/FadeIn';
import { SectionHeading } from '../components/ui/SectionHeading';
import { HeroBackground } from '../components/ui/HeroBackground';
import { InternalHeroContent, InternalHeroSection } from '../components/ui/InternalHeroLayout';
import {
  Breadcrumbs,
  BreadcrumbItem,
} from '../components/ui/Breadcrumbs';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { ourApproachDetails } from '../data/ourApproach';
import { ApproachSubpageAnimation } from '../components/heroAnimations/ApproachSubpageAnimation';
export const OurApproachDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const approach = useMemo(
    () => ourApproachDetails.find((item) => item.slug === slug),
    [slug]
  );

  const relatedApproaches = useMemo(
    () => ourApproachDetails.filter((item) => item.slug !== slug),
    [slug]
  );

  if (!approach) {
    return <Navigate to="/our-approach" replace />;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Our Approach',
      href: '/our-approach',
    },
    {
      label: approach.title,
    },
  ];

  return (
    <PageShell
      title={`${approach.title} | M3 Hive`}
      description={approach.intro}
    >
      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <InternalHeroSection className="border-b border-hive-border">

        <style>{`
          @keyframes approachBgDrift {
            0% {
              transform: scale(1.03) translate3d(0, 0, 0);
            }
            50% {
              transform: scale(1.075) translate3d(-12px, -5px, 0);
            }
            100% {
              transform: scale(1.045) translate3d(8px, 4px, 0);
            }
          }

          @keyframes approachGlowMove {
            0%, 100% {
              transform: translate3d(-40px, 20px, 0) scale(0.9);
              opacity: 0.10;
            }
            50% {
              transform: translate3d(70px, -30px, 0) scale(1.25);
              opacity: 0.28;
            }
          }

          @keyframes approachGlowMoveTwo {
            0%, 100% {
              transform: translate3d(40px, -20px, 0) scale(0.9);
              opacity: 0.08;
            }
            50% {
              transform: translate3d(-60px, 35px, 0) scale(1.2);
              opacity: 0.20;
            }
          }

          @keyframes approachSweep {
            0% {
              transform: translateX(-220%) skewX(-18deg);
              opacity: 0;
            }
            15% {
              opacity: 0.28;
            }
            55% {
              opacity: 0.12;
            }
            70%, 100% {
              transform: translateX(850%) skewX(-18deg);
              opacity: 0;
            }
          }

          @keyframes approachEnter {
            from {
              opacity: 0;
              transform: translate3d(0, 22px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .approach-bg {
            animation: approachBgDrift 14s ease-in-out infinite alternate;
            will-change: transform;
          }

          .approach-glow-one {
            animation: approachGlowMove 6.5s ease-in-out infinite;
            will-change: transform;
          }

          .approach-glow-two {
            animation: approachGlowMoveTwo 8s ease-in-out infinite;
            will-change: transform;
          }

          .approach-sweep {
            animation: approachSweep 6.5s ease-in-out infinite;
            will-change: transform, opacity;
          }

          .approach-enter {
            opacity: 0;
            animation: approachEnter 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
          }

          .approach-enter-1 { animation-delay: 0.05s; }
          .approach-enter-2 { animation-delay: 0.14s; }
          .approach-enter-3 { animation-delay: 0.23s; }
          .approach-enter-4 { animation-delay: 0.32s; }
          .approach-enter-5 { animation-delay: 0.41s; }
          .approach-enter-6 { animation-delay: 0.50s; }
        `}</style>

        {/* Background */}
        <div className="approach-bg absolute inset-[-3%]">
          <HeroBackground imageUrl={approach.heroImage} />
        </div>

        {/* Readability overlays */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/25" />

        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-white/[0.10] via-transparent to-transparent" />

        {/* ================================================= */}
        {/* PREMIUM HERO ANIMATION */}
        {/* ================================================= */}
        <ApproachSubpageAnimation />

        {/* ================================================= */}
        {/* HERO CONTENT */}
        {/* ================================================= */}

        <InternalHeroContent className="z-10 pb-12 sm:pb-16 lg:pb-24">
          <Container size="md">

          <div className="approach-enter approach-enter-1">
            <Breadcrumbs
              items={breadcrumbs}
              variant="dark"
              className="mb-4 border-none pb-0 sm:mb-6"
            />
          </div>

          <div className="approach-enter approach-enter-2 mb-6 inline-flex items-center gap-2 rounded-full border border-hive-yellow/45 bg-black/20 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-hive-yellow shadow-[0_0_12px_rgba(253,207,9,0.8)]" />

            <span className="font-heading text-xs font-bold uppercase tracking-widest text-white">
              {approach.eyebrow}
            </span>
          </div>

          <h1 className="approach-enter approach-enter-3 mb-5 max-w-4xl font-heading text-display-md font-bold text-white drop-shadow-md sm:text-display-lg">
            {approach.title}
          </h1>

          <div className="approach-enter approach-enter-4 mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-hive-orange to-hive-yellow" />

          <p className="approach-enter approach-enter-5 mb-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            {approach.intro}
             </p>

          <div className="approach-enter approach-enter-6">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          </Container>
        </InternalHeroContent>
      </InternalHeroSection>

      {/* ===================================================== */}
      {/* OVERVIEW */}
      {/* ===================================================== */}

      <section className="bg-hive-white py-16 sm:py-24">
        <Container size="md">
          <FadeIn>
            <h2 className="mb-6 font-heading text-2xl font-bold text-hive-black sm:text-3xl">
              Overview
            </h2>

            <p className="text-lg leading-relaxed text-hive-text-muted sm:text-xl">
              {approach.overview}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ===================================================== */}
      {/* FOCUS AREAS */}
      {/* ===================================================== */}

      <section className="border-y border-hive-border bg-hive-warm-white py-16 sm:py-24">
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Focus Areas"
              description="How we work in this area."
              accentBar
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {approach.focusAreas.map((area, idx) => (
              <FadeIn
                key={`${area}-${idx}`}
                delay={idx * 0.1}
                className="flex"
              >
                <div className="group flex h-full w-full items-start gap-4 rounded-xl border border-hive-border bg-hive-white p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:border-hive-yellow/60 md:hover:shadow-hive-lg">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-hive-yellow" />

                  <p className="text-sm leading-relaxed text-hive-text-muted">
                    {area}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================== */}
      {/* VALUE */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#080808] py-16 text-white sm:py-24">

        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hive-yellow/[0.06] blur-[60px] md:blur-[120px]" />

        <Container size="lg" className="relative z-10">
          <FadeIn>
            <div className="mb-14 text-center sm:mb-16">
              <span className="mb-4 inline-block font-heading text-xs font-bold uppercase tracking-[0.24em] text-hive-yellow">
                Value
              </span>

              <h2 className="mb-5 font-heading text-3xl font-bold text-white sm:text-4xl">
                Why This Matters
              </h2>

              <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-hive-orange to-hive-yellow" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

            {approach.value.map((item, idx) => (
              <FadeIn
                key={`${item}-${idx}`}
                delay={idx * 0.1}
                className="flex"
              >
                <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#151515] p-7 transition-all duration-300 md:hover:-translate-y-1 md:hover:border-hive-yellow/50 md:hover:bg-[#191919] md:hover:shadow-[0_20px_50px_rgba(0,0,0,0.40)] sm:p-8">

                  <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-hive-orange to-hive-yellow transition-all duration-500 md:group-hover:w-full" />

                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-hive-yellow/40 bg-hive-yellow/10">
                    <CheckCircle2 className="h-6 w-6 text-hive-yellow" />
                  </div>

                  <p className="text-[15px] leading-relaxed text-white/75 sm:text-base">
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================== */}
      {/* RELATED APPROACHES */}
      {/* ===================================================== */}

      {relatedApproaches.length > 0 && (
        <section className="border-y border-hive-border bg-hive-white py-16 sm:py-24">

          <Container size="lg">

            <FadeIn>
              <SectionHeading
                title="Explore More of Our Approach"
                centered
                accentBar
              />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">

              {relatedApproaches.map((related, idx) => (
                <FadeIn
                  key={related.slug}
                  delay={idx * 0.1}
                  className="flex"
                >
                  <div className="group relative flex h-full w-full flex-col rounded-2xl border border-hive-border bg-hive-white p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:border-hive-yellow/70 md:hover:shadow-hive-lg sm:p-8">

                    <Link
                      to={`/our-approach/${related.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${related.title}`}
                    />

                    <h3 className="mb-3 font-heading text-xl font-bold text-hive-black">
                      {related.title}
                    </h3>

                    <p className="mb-6 flex-1 text-sm leading-relaxed text-hive-text-muted">
                      {related.intro}
                    </p>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-hive-text-muted transition-colors duration-300 md:group-hover:text-hive-yellow">
                      Explore Details

                      <ChevronRight className="h-4 w-4 transition-transform duration-300 md:group-hover:translate-x-1" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden border-t border-white/10 bg-hive-black py-20 text-center lg:py-24">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-hive-yellow/10 via-transparent to-transparent opacity-50" />

        <Container size="md" className="relative z-10">
          <FadeIn>
            <h2 className="mb-6 font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to explore what we can achieve together?
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
              Talk to our team about your goals, ideas and technology opportunities.
            </p>

            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};

export default OurApproachDetailPage;
