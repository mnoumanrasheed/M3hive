import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { FadeIn } from '../components/ui/FadeIn';
import { HeroBackground } from '../components/ui/HeroBackground';
import {
  Breadcrumbs,
  BreadcrumbItem,
} from '../components/ui/Breadcrumbs';
import { ChevronRight } from 'lucide-react';
import { ourApproachOfferings } from '../data/ourApproach';

export const OurApproachPage: React.FC = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Our Approach' },
  ];

  return (
    <PageShell
      title="Our Approach | M3 Hive"
      description="Let's accelerate to tomorrow, together. M3 Hive brings people, technology and collaboration together to help organisations explore opportunities, develop innovative solutions and move their digital journey forward."
    >
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-resources.jpg" />

        <Container size="md" className="relative z-10">
          <Breadcrumbs
            items={breadcrumbs}
            variant="dark"
            className="mb-4 pb-0 border-none"
          />

          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-hive-yellow shadow-[0_0_10px_rgba(253,207,9,0.6)]" />

              <span className="font-heading text-xs font-bold uppercase tracking-widest text-white">
                Our Approach
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white drop-shadow-md mb-3">
              Your Experience with M3 Hive
            </h1>

            <p className="text-base sm:text-lg text-white/90 drop-shadow leading-relaxed max-w-3xl">
              Let's accelerate to tomorrow, together. M3 Hive brings people,
              technology and collaboration together to help organisations
              explore opportunities, develop innovative solutions and move
              their digital journey forward.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* OFFERINGS */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ourApproachOfferings.map((offering, idx) => (
              <FadeIn
                key={offering.id}
                delay={idx * 0.1}
                className="flex"
              >
                <div className="relative flex flex-col p-6 sm:p-8 rounded-2xl bg-hive-white border border-hive-border transition-all duration-300 hover:border-hive-yellow/70 hover:shadow-hive-lg hover:-translate-y-1 h-full w-full group">
                  <Link
                    to={offering.ctaHref}
                    className="absolute inset-0 z-10"
                    aria-label={`Read more about ${offering.title}`}
                  />

                  <h3 className="text-xl font-heading font-bold text-hive-black mb-4">
                    {offering.title}
                  </h3>

                  <p className="text-sm text-hive-text-muted leading-relaxed flex-1">
                    {offering.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-hive-text-muted group-hover:text-hive-yellow transition-colors duration-300">
                    {offering.ctaLabel}

                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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