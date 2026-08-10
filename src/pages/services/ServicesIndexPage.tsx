import React from 'react';
import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/ui/Button';
import { allServicesData } from '../../data/services/servicesIndex';
import { ArrowRight, Settings2 } from 'lucide-react';
import { HeroBackground } from '../../components/ui/HeroBackground';

export const ServicesIndexPage: React.FC = () => {
  return (
    <PageShell title="Services Overview" description="Comprehensive capabilities to transform operations">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-services.jpg" />
        <Container size="md" className="relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 mb-4 sm:mb-6">
              <Settings2 className="w-4 h-4 text-hive-yellow flex-shrink-0" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
                Capabilities
              </span>
            </div>
            <h1 className="text-display-md sm:text-display-lg font-bold font-heading text-white drop-shadow-md mb-4 sm:mb-6">
              Our Services Overview
            </h1>
            <p className="text-base sm:text-lg text-white/90 drop-shadow leading-relaxed">
              Comprehensive capabilities to transform operations, improve experiences, and build competitive advantage.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── SERVICES GRID ────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title="End-to-End Digital Transformation"
              description="We combine technical excellence with practical business understanding to deliver measurable results."
              accentBar
            />
          </FadeIn>

          <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allServicesData.map((service, idx) => (
              <FadeIn
                key={service.id}
                delay={idx * 0.1}
                className="flex"
              >
                <div className="flex flex-col p-6 sm:p-8 rounded-2xl bg-hive-gray border border-hive-border transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover h-full w-full">

                  <h3 className="text-xl font-heading font-bold text-hive-black mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm font-semibold text-hive-orange mb-4">
                    {service.subtitle}
                  </p>

                  <div className="flex-1">
                    <ul className="space-y-2 mb-6">
                      {service.offerings.slice(0, 3).map((offering, i) => (
                        <li
                          key={i}
                          className="text-sm text-hive-text-muted flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-hive-yellow mt-1.5 flex-shrink-0" />
                          <span className="leading-snug">
                            {offering.title}
                          </span>
                        </li>
                      ))}

                      {service.offerings.length > 3 && (
                        <li className="text-sm text-hive-text-muted italic pt-1">
                          + {service.offerings.length - 3} more capabilities
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button
                    href={service.slug}
                    variant="outline"
                    size="sm"
                    className="w-full bg-hive-white"
                  >
                    Explore Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
};