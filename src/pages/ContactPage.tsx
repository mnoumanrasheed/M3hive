import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { OfficeCard } from '../components/ui/OfficeCard';
import { officeLocations } from '../data/offices';
import { HeroBackground } from '../components/ui/HeroBackground';
import { PremiumHeroMotion } from '../components/ui/PremiumHeroMotion';
import { StartProjectWorkflow } from '../components/contact/StartProjectWorkflow';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || undefined;

  const scrollToCTA = () => {
    const el = document.getElementById('start-project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageShell
      title="Start a Project | M3 Hive"
      description="Connect with M3 Hive leadership and technology architects to explore digital product engineering, AI solutions, automation, and enterprise scaling."
    >
      {/* ============================================================
          HERO BANNER — M3 HIVE HERO WITH SEAMLESS GRADIENT BLEND
      ============================================================ */}
      <section
        className="relative z-0 flex flex-col justify-center overflow-hidden border-b border-hive-border px-0 pt-20"
        style={{ minHeight: '92svh' }}
      >
        <HeroBackground imageUrl="/assets/heroes/hero-contact.jpg" priority />
        <PremiumHeroMotion variant="contact" />

        <Container size="md" className="relative z-10 text-center">
          <FadeIn>
            {/* Eyebrow */}
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-hive-yellow/40 bg-hive-black/50 px-4 py-1.5 backdrop-blur-md"
              style={{ animationDelay: '0ms' }}
            >
              <span className="h-2 w-2 rounded-full bg-hive-yellow shadow-sm shadow-hive-yellow/50" />
              <span className="font-heading text-xs font-semibold tracking-wider text-hive-yellow uppercase">
                LET'S BUILD WHAT'S NEXT
              </span>
            </div>

            {/* Attention-grabbing line */}
            <p
              className="mx-auto mb-4 max-w-xl font-heading font-medium leading-snug text-white/85 drop-shadow"
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                animationDelay: '80ms',
              }}
            >
              Turn ambitious ideas into scalable digital products.
            </p>

            {/* Main Heading */}
            <h1
              className="mb-5 font-heading font-bold text-white drop-shadow-md sm:mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                lineHeight: '1.1',
                animationDelay: '160ms',
              }}
            >
              Start Your Project Journey
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 drop-shadow sm:text-lg"
              style={{ animationDelay: '240ms' }}
            >
              Tell us what you are trying to build, improve or scale. Our specialists will help identify the right technology approach.
            </p>

            {/* Scroll cue button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={scrollToCTA}
                className="group flex flex-col items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
                aria-label="Scroll to project brief"
              >
                <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-white/70 group-hover:text-hive-yellow">
                  Scroll to begin
                </span>
                <svg
                  width="16"
                  height="24"
                  viewBox="0 0 16 24"
                  fill="none"
                  className="animate-bounce text-hive-yellow"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="23"
                    rx="7.5"
                    stroke="currentColor"
                    strokeOpacity="0.6"
                  />
                  <rect
                    x="6.5"
                    y="4"
                    width="3"
                    height="6"
                    rx="1.5"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </FadeIn>
        </Container>

      </section>

      {/* ============================================================
          WHITE BRIDGE SECTION — ATTENTION GRABBING LINE
      ============================================================ */}
      <section className="border-b border-hive-border bg-hive-white py-10 sm:py-14 lg:py-16">
        <Container size="lg" className="text-center">
          <FadeIn>
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-hive-orange/20 bg-hive-orange/10 px-4 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-hive-orange animate-pulse" />
              <span className="font-heading text-[11px] font-bold tracking-widest text-hive-orange uppercase">
                ENGINEERING THE FUTURE
              </span>
            </div>

            <h2 className="mx-auto max-w-3xl font-heading text-2xl font-bold tracking-tight text-hive-black sm:text-3xl lg:text-4xl">
              Have a challenge worth solving?{' '}
              <span className="text-hive-orange">Let's build what's next.</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-hive-text-muted sm:text-base">
              From enterprise AI architectures to resilient digital platforms — share your requirements below for an upfront, senior technical evaluation.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================================
          MAIN CONVERSION SECTION (Sleek 2-Column Technyder-Style CTA)
      ============================================================ */}
      <section
        id="start-project"
        className="relative overflow-hidden bg-[#070707] py-14 sm:py-20 lg:py-24"
      >
        {/* Subtle Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-hive-yellow/10 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-hive-orange/10 blur-[100px]"
        />

        {/* Dot pattern background overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <Container size="lg" className="relative z-10">
          <FadeIn>
            <StartProjectWorkflow initialService={serviceParam} />
          </FadeIn>
        </Container>
      </section>

      {/* ============================================================
          GLOBAL OFFICES SECTION
      ============================================================ */}
      <section className="border-t border-hive-border bg-hive-gray py-14 sm:py-20 lg:py-24">
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="Our Global Offices"
              description="M3 Hive operates through offices and development centres across global markets."
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officeLocations.map((office, idx) => (
              <FadeIn key={office.id} delay={(idx % 3) * 0.1}>
                <OfficeCard office={office} className="h-full bg-hive-white" />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
