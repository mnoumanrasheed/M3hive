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

      <section className="relative z-0 overflow-hidden border-b border-hive-border pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">

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

        {/* Ambient glows */}
        <div className="approach-glow-one pointer-events-none absolute left-[43%] top-[10%] z-[3] hidden h-[380px] w-[380px] rounded-full bg-hive-yellow/20 blur-[120px] sm:block" />

        <div className="approach-glow-two pointer-events-none absolute right-[1%] top-[35%] z-[3] hidden h-[330px] w-[330px] rounded-full bg-hive-orange/15 blur-[120px] sm:block" />

        {/* Grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            hidden
            opacity-[0.06]
            sm:block
            [background-image:linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.38)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        {/* ================================================= */}
        {/* LIVE COLLABORATION NETWORK */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-0 z-[4] hidden sm:block">
          <svg
            className="h-full w-full"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="networkLine"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#FDCF09"
                  stopOpacity="0.20"
                />

                <stop
                  offset="50%"
                  stopColor="#FDCF09"
                  stopOpacity="0.90"
                />

                <stop
                  offset="100%"
                  stopColor="#F28C28"
                  stopOpacity="0.35"
                />
              </linearGradient>

              <filter
                id="yellowGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="whiteGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* CONNECTIONS */}

            <path
              id="path1"
              d="M570 115 L710 175 L840 105"
              fill="none"
              stroke="url(#networkLine)"
              strokeWidth="1.5"
              strokeDasharray="9 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-84"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            <path
              id="path2"
              d="M710 175 L800 305 L925 240"
              fill="none"
              stroke="url(#networkLine)"
              strokeWidth="1.5"
              strokeDasharray="9 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-84"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </path>

            <path
              id="path3"
              d="M570 115 L630 330 L800 305"
              fill="none"
              stroke="url(#networkLine)"
              strokeWidth="1.5"
              strokeDasharray="9 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-84"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>

            <path
              id="path4"
              d="M630 330 L735 410 L925 240"
              fill="none"
              stroke="url(#networkLine)"
              strokeWidth="1.5"
              strokeDasharray="9 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-84"
                dur="3.4s"
                repeatCount="indefinite"
              />
            </path>

            {/* MOVING SIGNAL 1 */}
            <circle
              r="5"
              fill="#FDCF09"
              filter="url(#yellowGlow)"
            >
              <animateMotion
                path="M570 115 L710 175 L840 105"
                dur="2.7s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="r"
                values="3;6;3"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* MOVING SIGNAL 2 */}
            <circle
              r="4.5"
              fill="#ffffff"
              filter="url(#whiteGlow)"
            >
              <animateMotion
                path="M710 175 L800 305 L925 240"
                dur="3.2s"
                begin="0.5s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="r"
                values="3;5.5;3"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* MOVING SIGNAL 3 */}
            <circle
              r="5"
              fill="#F28C28"
              filter="url(#yellowGlow)"
            >
              <animateMotion
                path="M570 115 L630 330 L800 305"
                dur="3.8s"
                begin="0.9s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="r"
                values="3;6;3"
                dur="1.1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* MOVING SIGNAL 4 */}
            <circle
              r="4"
              fill="#FDCF09"
              filter="url(#yellowGlow)"
            >
              <animateMotion
                path="M630 330 L735 410 L925 240"
                dur="3.1s"
                begin="1.3s"
                repeatCount="indefinite"
              />
            </circle>

            {/* STATIC / BREATHING NODES */}

            <g>
              <circle
                cx="570"
                cy="115"
                r="18"
                fill="rgba(253,207,9,0.06)"
                stroke="#FDCF09"
                strokeOpacity="0.55"
              >
                <animate
                  attributeName="r"
                  values="15;22;15"
                  dur="2.4s"
                  repeatCount="indefinite"
                />

                <animate
                  attributeName="stroke-opacity"
                  values="0.35;0.8;0.35"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="570"
                cy="115"
                r="5"
                fill="#FDCF09"
                filter="url(#yellowGlow)"
              >
                <animate
                  attributeName="r"
                  values="4;7;4"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <g>
              <circle
                cx="710"
                cy="175"
                r="19"
                fill="rgba(255,255,255,0.04)"
                stroke="white"
                strokeOpacity="0.4"
              >
                <animate
                  attributeName="r"
                  values="16;23;16"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="710"
                cy="175"
                r="5"
                fill="white"
                filter="url(#whiteGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <g>
              <circle
                cx="840"
                cy="105"
                r="17"
                fill="rgba(242,140,40,0.05)"
                stroke="#F28C28"
                strokeOpacity="0.55"
              >
                <animate
                  attributeName="r"
                  values="14;21;14"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="840"
                cy="105"
                r="5"
                fill="#F28C28"
                filter="url(#yellowGlow)"
              />
            </g>

            <g>
              <circle
                cx="630"
                cy="330"
                r="18"
                fill="rgba(255,255,255,0.04)"
                stroke="white"
                strokeOpacity="0.35"
              >
                <animate
                  attributeName="r"
                  values="15;22;15"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="630"
                cy="330"
                r="5"
                fill="white"
                filter="url(#whiteGlow)"
              />
            </g>

            <g>
              <circle
                cx="800"
                cy="305"
                r="20"
                fill="rgba(253,207,9,0.06)"
                stroke="#FDCF09"
                strokeOpacity="0.5"
              >
                <animate
                  attributeName="r"
                  values="16;24;16"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="800"
                cy="305"
                r="6"
                fill="#FDCF09"
                filter="url(#yellowGlow)"
              />
            </g>

            <g>
              <circle
                cx="925"
                cy="240"
                r="18"
                fill="rgba(242,140,40,0.05)"
                stroke="#F28C28"
                strokeOpacity="0.55"
              >
                <animate
                  attributeName="r"
                  values="14;22;14"
                  dur="2.7s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="925"
                cy="240"
                r="5"
                fill="#F28C28"
                filter="url(#yellowGlow)"
              />
            </g>

            <g>
              <circle
                cx="735"
                cy="410"
                r="16"
                fill="rgba(253,207,9,0.05)"
                stroke="#FDCF09"
                strokeOpacity="0.45"
              >
                <animate
                  attributeName="r"
                  values="13;20;13"
                  dur="3.1s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="735"
                cy="410"
                r="4.5"
                fill="#FDCF09"
                filter="url(#yellowGlow)"
              />
            </g>
          </svg>
        </div>

        {/* Moving light sweep */}
        <div
          className="
            approach-sweep
            pointer-events-none
            absolute
            -left-[25%]
            top-0
            z-[5]
            hidden
            h-full
            w-[13%]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            blur-xl
            sm:block
          "
        />

        {/* ================================================= */}
        {/* HERO CONTENT */}
        {/* ================================================= */}

        <Container size="md" className="relative z-10">

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
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

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
                <div className="group flex h-full w-full items-start gap-4 rounded-xl border border-hive-border bg-hive-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hive-yellow/60 hover:shadow-hive-lg">
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

        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hive-yellow/[0.06] blur-[120px]" />

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
                <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#151515] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-hive-yellow/50 hover:bg-[#191919] hover:shadow-[0_20px_50px_rgba(0,0,0,0.40)] sm:p-8">

                  <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-hive-orange to-hive-yellow transition-all duration-500 group-hover:w-full" />

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
                  <div className="group relative flex h-full w-full flex-col rounded-2xl border border-hive-border bg-hive-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-hive-yellow/70 hover:shadow-hive-lg sm:p-8">

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

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-hive-text-muted transition-colors duration-300 group-hover:text-hive-yellow">
                      Explore Details

                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};

export default OurApproachDetailPage;