import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { OfficeCard } from '../components/ui/OfficeCard';
import { aboutPageData } from '../data/about';
import { officeLocations } from '../data/offices';

import { HeroBackground } from '../components/ui/HeroBackground';

export const AboutPage: React.FC = () => {
  return (
    <PageShell title="About M3 Hive">
      {/* ─── HERO SECTION ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-about.jpg" />
        <Container size="md" className="relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-hive-yellow flex-shrink-0" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
                About Us
              </span>
            </div>
            <h1 className="text-display-md sm:text-display-lg font-bold font-heading text-white drop-shadow-md mb-4 sm:mb-6">
              {aboutPageData.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 drop-shadow leading-relaxed">
              {aboutPageData.subtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── WHO WE ARE ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <SectionHeading title={aboutPageData.whoWeAreTitle} accentBar />
            <div className="prose prose-lg text-hive-text-muted max-w-none mt-8">
              {aboutPageData.whoWeAreDescription.map((para, i) => (
                <p key={i} className="mb-4 last:mb-0 leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── CLIENTS & PARTNERS ───────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-hive-black">
                {aboutPageData.clientsPartnersTitle}
              </h2>
              <p className="text-lg text-hive-text-muted leading-relaxed">
                {aboutPageData.clientsPartnersDescription}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── OUR VALUES ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-gray border-y border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading title={aboutPageData.valuesTitle} centered accentBar />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16">
            {aboutPageData.values.map((val, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-hive-white border border-hive-border h-full">
                  <div className="w-10 h-10 mb-5 rounded-lg flex items-center justify-center bg-hive-yellow/10 border border-hive-yellow/20">
                    <span className="font-heading font-bold text-hive-yellow text-sm">{idx + 1}</span>
                  </div>
                  <h4 className="text-lg font-heading font-bold text-hive-black mb-3">
                    {val.title}
                  </h4>
                  <p className="text-sm text-hive-text-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── WE ARE M3 HIVE PILLARS ─────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="lg">
          <FadeIn>
            <SectionHeading title={aboutPageData.pillarsTitle} centered accentBar />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-16">
            {aboutPageData.pillars.map((pillar, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="flex">
                <div className="flex flex-col p-6 sm:p-8 rounded-2xl bg-hive-warm-white border border-hive-border transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover h-full w-full">
                  <h3 className="text-xl font-heading font-bold text-hive-black mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-hive-text-muted leading-relaxed flex-1">
                    {pillar.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── GLOBAL OFFICES ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-gray border-t border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="Our Global Offices" 
              description={`M3 Hive operates ${officeLocations.length} offices and development centres across the world, enabling us to deliver round-the-clock support and regional expertise.`}
              accentBar
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {officeLocations.map((office, idx) => (
              <FadeIn key={office.id} delay={(idx % 3) * 0.1}>
                <OfficeCard office={office} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── ESG COMMITMENT ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-black text-hive-white border-t border-hive-border">
        <Container size="md">
          <FadeIn>
            <div className="text-center space-y-6">
              <div className="w-16 h-1 bg-hive-yellow mx-auto mb-8 rounded-full" />
              <h2 className="text-3xl lg:text-4xl font-heading font-bold">
                Environmental, Social and Governance Commitment
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mx-auto">
                {aboutPageData.esgCommitment}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};
