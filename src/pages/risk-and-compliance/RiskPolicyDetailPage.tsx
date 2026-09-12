import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { HeroBackground } from '../../components/ui/HeroBackground';
import { InternalHeroContent, InternalHeroSection } from '../../components/ui/InternalHeroLayout';
import { riskPolicies } from '../../data/riskCompliancePolicies';
import {
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { ComplianceSubpageAnimation } from '../../components/heroAnimations/ComplianceSubpageAnimation';

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

      <InternalHeroSection className="border-b border-hive-border">

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

        {/* ================================================= */}
        {/* PREMIUM HERO ANIMATION */}
        {/* ================================================= */}
        <ComplianceSubpageAnimation />

        {/* ================================================= */}
        {/* HERO CONTENT */}
        {/* ================================================= */}

        <InternalHeroContent className="z-10 pb-12 sm:pb-16 lg:pb-24">
          <Container size="md">

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
        </InternalHeroContent>
      </InternalHeroSection>

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
