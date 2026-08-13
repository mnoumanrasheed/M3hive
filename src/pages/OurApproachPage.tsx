import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { FadeIn } from '../components/ui/FadeIn';
import { HeroBackground } from '../components/ui/HeroBackground';
import { ChevronRight } from 'lucide-react';
import { ourApproachOfferings } from '../data/ourApproach';
import { PremiumHeroMotion } from '../components/ui/PremiumHeroMotion';

export const OurApproachPage: React.FC = () => {
  return (
    <PageShell
      title="Approach | M3 Hive"
      description="Let's accelerate to tomorrow, together. M3 Hive brings people, technology and collaboration together to help organisations explore opportunities, develop innovative solutions and move their digital journey forward."
    >
      {/* HERO */}
      <section 
        className="relative overflow-hidden border-b border-hive-border z-0 flex flex-col justify-center"
        style={{ minHeight: 'max(560px, calc(100svh - 80px))' }}
      >
        <HeroBackground imageUrl="/assets/heroes/hero-resources.jpg" />
        <PremiumHeroMotion variant="approach" />

        <Container
          size="md"
          className="relative z-10 text-center"
        >
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-hive-yellow shadow-[0_0_10px_rgba(253,207,9,0.6)]" />

              <span className="font-heading text-xs font-bold uppercase tracking-widest text-white">
                Approach
              </span>
            </div>

            <h1 
              className="mx-auto mb-3 max-w-4xl font-heading font-bold text-white drop-shadow-md"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1' }}
            >
              Your Experience with M3 Hive
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 drop-shadow sm:text-lg">
              Let's accelerate to tomorrow, together. M3 Hive brings people,
              technology and collaboration together to help organisations
              explore opportunities, develop innovative solutions and move
              their digital journey forward.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* OFFERINGS */}
      <section className="bg-hive-white py-14 sm:py-20 lg:py-24">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {ourApproachOfferings.map((offering, idx) => (
              <FadeIn
                key={offering.id}
                delay={idx * 0.1}
                className="flex"
              >
                <div className="group relative flex h-full w-full flex-col rounded-2xl border border-hive-border bg-hive-white p-6 transition-all duration-300 md:hover:-translate-y-1 md:hover:border-hive-yellow/70 md:hover:shadow-hive-lg sm:p-8">
                  <Link
                    to={offering.ctaHref}
                    className="absolute inset-0 z-10"
                    aria-label={`Read more about ${offering.title}`}
                  />

                  <h3 className="mb-4 font-heading text-xl font-bold text-hive-black">
                    {offering.title}
                  </h3>

                  <p className="flex-1 text-sm leading-relaxed text-hive-text-muted">
                    {offering.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-hive-text-muted transition-colors duration-300 group-md:hover:text-hive-yellow">
                    {offering.ctaLabel}

                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-md:hover:translate-x-1" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};