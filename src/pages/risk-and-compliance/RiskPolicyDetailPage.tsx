import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { HeroBackground } from '../../components/ui/HeroBackground';
import { riskPolicies } from '../../data/riskCompliancePolicies';
import {
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

export const RiskPolicyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const policy = slug ? riskPolicies[slug] : undefined;

  if (!policy) {
    return <Navigate to="/risk-and-compliance" replace />;
  }

  const breadcrumbs = [
    {
      label: 'Risk & Compliance',
      href: '/risk-and-compliance',
    },
    {
      label: policy.title,
    },
  ];

  return (
    <PageShell title={`${policy.title} - Risk & Compliance`}>
      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative z-0 overflow-hidden border-b border-hive-border pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">

        <style>{`
          @keyframes riskHeroDrift {
            0% {
              transform: scale(1.03) translate3d(0, 0, 0);
            }

            50% {
              transform: scale(1.065) translate3d(-10px, -4px, 0);
            }

            100% {
              transform: scale(1.04) translate3d(7px, 3px, 0);
            }
          }

          @keyframes riskGlowMove {
            0%, 100% {
              transform: translate3d(-25px, 15px, 0) scale(0.9);
              opacity: 0.08;
            }

            50% {
              transform: translate3d(55px, -25px, 0) scale(1.2);
              opacity: 0.22;
            }
          }

          @keyframes riskGlowMoveTwo {
            0%, 100% {
              transform: translate3d(25px, -10px, 0) scale(0.9);
              opacity: 0.06;
            }

            50% {
              transform: translate3d(-45px, 25px, 0) scale(1.15);
              opacity: 0.16;
            }
          }

          @keyframes riskSweep {
            0% {
              transform: translateX(-220%) skewX(-18deg);
              opacity: 0;
            }

            18% {
              opacity: 0.22;
            }

            45% {
              opacity: 0.10;
            }

            65%,
            100% {
              transform: translateX(850%) skewX(-18deg);
              opacity: 0;
            }
          }

          @keyframes riskEnter {
            from {
              opacity: 0;
              transform: translate3d(0, 20px, 0);
            }

            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .risk-hero-bg {
            animation: riskHeroDrift 15s ease-in-out infinite alternate;
            will-change: transform;
          }

          .risk-glow-one {
            animation: riskGlowMove 7s ease-in-out infinite;
          }

          .risk-glow-two {
            animation: riskGlowMoveTwo 9s ease-in-out infinite;
          }

          .risk-light-sweep {
            animation: riskSweep 7s ease-in-out infinite;
            will-change: transform, opacity;
          }

          .risk-enter {
            opacity: 0;
            animation: riskEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .risk-enter-1 {
            animation-delay: 0.05s;
          }

          .risk-enter-2 {
            animation-delay: 0.14s;
          }

          .risk-enter-3 {
            animation-delay: 0.23s;
          }

          .risk-enter-4 {
            animation-delay: 0.32s;
          }
        `}</style>

        {/* Background image */}
        <div className="risk-hero-bg absolute inset-[-3%]">
          <HeroBackground imageUrl="/assets/heroes/hero-risk-compliance.jpg" />
        </div>

        {/* Dark readability layer */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

        {/* Soft white wash */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-white/[0.12] via-white/[0.03] to-transparent" />

        {/* Grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            hidden
            opacity-[0.045]
            lg:block
            [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)]
            [background-size:68px_68px]
          "
        />

        {/* Glows - right side only */}
        <div className="risk-glow-one pointer-events-none absolute right-[24%] top-[10%] z-[3] hidden h-[330px] w-[330px] rounded-full bg-hive-yellow/20 blur-[120px] lg:block" />

        <div className="risk-glow-two pointer-events-none absolute right-[2%] bottom-[-20%] z-[3] hidden h-[300px] w-[300px] rounded-full bg-hive-orange/15 blur-[120px] lg:block" />

        {/* ================================================= */}
        {/* ANIMATION — RIGHT SIDE ONLY */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-y-0 right-0 left-[58%] z-[4] hidden overflow-hidden lg:block">

          <svg
            className="h-full w-full"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="riskLineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#FDCF09"
                  stopOpacity="0.18"
                />

                <stop
                  offset="50%"
                  stopColor="#FDCF09"
                  stopOpacity="0.85"
                />

                <stop
                  offset="100%"
                  stopColor="#F28C28"
                  stopOpacity="0.28"
                />
              </linearGradient>

              <filter
                id="riskGlow"
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
            </defs>

            {/* Path 1 */}
            <path
              d="M120 110 L390 175 L690 105"
              fill="none"
              stroke="url(#riskLineGradient)"
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

            {/* Path 2 */}
            <path
              d="M390 175 L570 310 L880 245"
              fill="none"
              stroke="url(#riskLineGradient)"
              strokeWidth="1.5"
              strokeDasharray="9 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-84"
                dur="3.7s"
                repeatCount="indefinite"
              />
            </path>

            {/* Path 3 */}
            <path
              d="M120 110 L245 350 L570 310"
              fill="none"
              stroke="url(#riskLineGradient)"
              strokeWidth="1.5"
              strokeDasharray="9 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-84"
                dur="4.2s"
                repeatCount="indefinite"
              />
            </path>

            {/* Moving pulse 1 */}
            <circle
              r="5"
              fill="#FDCF09"
              filter="url(#riskGlow)"
            >
              <animateMotion
                path="M120 110 L390 175 L690 105"
                dur="2.8s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="r"
                values="3;6;3"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Moving pulse 2 */}
            <circle
              r="4"
              fill="#ffffff"
              filter="url(#riskGlow)"
            >
              <animateMotion
                path="M390 175 L570 310 L880 245"
                dur="3.4s"
                begin="0.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Moving pulse 3 */}
            <circle
              r="5"
              fill="#F28C28"
              filter="url(#riskGlow)"
            >
              <animateMotion
                path="M120 110 L245 350 L570 310"
                dur="3.9s"
                begin="1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Node 1 */}
            <g>
              <circle
                cx="120"
                cy="110"
                r="18"
                fill="rgba(253,207,9,0.05)"
                stroke="#FDCF09"
                strokeOpacity="0.55"
              >
                <animate
                  attributeName="r"
                  values="15;22;15"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="120"
                cy="110"
                r="5"
                fill="#FDCF09"
                filter="url(#riskGlow)"
              />
            </g>

            {/* Node 2 */}
            <g>
              <circle
                cx="390"
                cy="175"
                r="18"
                fill="rgba(255,255,255,0.04)"
                stroke="#ffffff"
                strokeOpacity="0.38"
              >
                <animate
                  attributeName="r"
                  values="15;22;15"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="390"
                cy="175"
                r="5"
                fill="#ffffff"
                filter="url(#riskGlow)"
              />
            </g>

            {/* Node 3 */}
            <g>
              <circle
                cx="690"
                cy="105"
                r="18"
                fill="rgba(242,140,40,0.05)"
                stroke="#F28C28"
                strokeOpacity="0.5"
              >
                <animate
                  attributeName="r"
                  values="14;21;14"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="690"
                cy="105"
                r="5"
                fill="#F28C28"
                filter="url(#riskGlow)"
              />
            </g>

            {/* Node 4 */}
            <g>
              <circle
                cx="245"
                cy="350"
                r="18"
                fill="rgba(255,255,255,0.04)"
                stroke="#ffffff"
                strokeOpacity="0.35"
              >
                <animate
                  attributeName="r"
                  values="15;22;15"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="245"
                cy="350"
                r="5"
                fill="#ffffff"
                filter="url(#riskGlow)"
              />
            </g>

            {/* Node 5 */}
            <g>
              <circle
                cx="570"
                cy="310"
                r="20"
                fill="rgba(253,207,9,0.05)"
                stroke="#FDCF09"
                strokeOpacity="0.55"
              >
                <animate
                  attributeName="r"
                  values="16;24;16"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="570"
                cy="310"
                r="6"
                fill="#FDCF09"
                filter="url(#riskGlow)"
              />
            </g>

            {/* Node 6 */}
            <g>
              <circle
                cx="880"
                cy="245"
                r="18"
                fill="rgba(242,140,40,0.05)"
                stroke="#F28C28"
                strokeOpacity="0.5"
              >
                <animate
                  attributeName="r"
                  values="14;22;14"
                  dur="2.9s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="880"
                cy="245"
                r="5"
                fill="#F28C28"
                filter="url(#riskGlow)"
              />
            </g>
          </svg>
        </div>

        {/* Light sweep - also right side */}
        <div
          className="
            risk-light-sweep
            pointer-events-none
            absolute
            right-0
            top-0
            z-[5]
            hidden
            h-full
            w-[8%]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            blur-xl
            lg:block
          "
        />

        {/* ================================================= */}
        {/* HERO CONTENT */}
        {/* ================================================= */}

        <Container size="md" className="relative z-10">

          {/* Breadcrumbs */}
          <div className="risk-enter risk-enter-1 mb-6 max-w-[720px]">
            <Breadcrumbs
              items={breadcrumbs}
              variant="dark"
              className="
                justify-start
                border-none
                pb-0
                !text-white/80
                [&_a]:!text-white/80
                [&_a:hover]:!text-white
                [&_span]:!text-white
                [&_svg]:!text-white/50
              "
            />
          </div>

          {/* Policy Badge */}
          <div className="risk-enter risk-enter-2 mb-4 inline-flex items-center gap-2 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 px-3 py-1.5 sm:mb-6">

            <ShieldCheck className="h-4 w-4 flex-shrink-0 text-hive-yellow" />

            <span className="font-heading text-xs font-bold uppercase tracking-widest text-white drop-shadow">
              M3 Hive Policy
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              risk-enter
              risk-enter-3
              mb-4
              max-w-[720px]
              break-words
              font-heading
              text-4xl
              font-bold
              leading-[1.08]
              tracking-[-0.02em]
              text-white
              drop-shadow-md
              sm:mb-6
              sm:text-5xl
              lg:text-[3.25rem]
            "
          >
            {policy.title}
          </h1>

          {/* Intro */}
          <p className="risk-enter risk-enter-4 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow sm:text-lg">
            {policy.intro}
          </p>
        </Container>
      </section>

      {/* ===================================================== */}
      {/* POLICY CONTENT */}
      {/* ===================================================== */}

      <section className="bg-hive-white py-14 sm:py-20 lg:py-24">

        <Container size="md">

          <div className="space-y-16">

            {policy.sections.map((section, idx) => (
              <FadeIn
                key={`${section.title}-${idx}`}
                delay={idx * 0.1}
              >
                <div className="relative border-l-4 border-hive-yellow/30 pl-6 transition-colors duration-300 hover:border-hive-yellow sm:pl-8">

                  <h2 className="mb-6 font-heading text-xl font-bold uppercase tracking-wider text-hive-black sm:text-2xl">
                    {section.title}
                  </h2>

                  <div className="prose prose-lg max-w-none text-hive-text-muted">

                    {section.content.map((paragraph, pIdx) => (
                      <p
                        key={`${section.title}-${pIdx}`}
                        className="mb-4 whitespace-pre-line leading-relaxed"
                      >
                        {paragraph
                          .split('**')
                          .map((text, i) =>
                            i % 2 === 1 ? (
                              <strong
                                key={i}
                                className="font-semibold text-hive-black"
                              >
                                {text}
                              </strong>
                            ) : (
                              text
                            )
                          )}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom actions */}
          <FadeIn delay={0.4}>
            <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-hive-border pt-10 sm:flex-row">

              <Button
                href="/risk-and-compliance"
                variant="outline"
                size="md"
              >
                Back to Risk & Compliance
              </Button>

              <div className="flex flex-col items-center gap-4 sm:flex-row">

                <span className="text-sm font-semibold text-hive-text-muted">
                  Have a question about our policies?
                </span>

                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                >
                  <MessageSquare className="h-4 w-4" />

                  Contact M3 Hive
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};

export default RiskPolicyDetailPage;