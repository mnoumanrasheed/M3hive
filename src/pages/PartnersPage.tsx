import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { PartnerTile } from '../components/ui/PartnerTile';
import { PartnerMarquee } from '../components/ui/PartnerMarquee';
import { partnersData } from '../data/partners';

import { HeroBackground } from '../components/ui/HeroBackground';

export const PartnersPage: React.FC = () => {
  const detailedPartners = partnersData.filter((p) => p.description !== null);
  const allPartners = partnersData;

  return (
    <PageShell title="Our Partners">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-partners.jpg" />
        <Container size="md" className="relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-hive-yellow" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
                Ecosystem
              </span>
            </div>
            <h1 className="text-display-lg font-bold font-heading text-white drop-shadow-md mb-6">
              Our Partners
            </h1>
            <p className="text-lg text-white/90 drop-shadow leading-relaxed">
              A Technology Ecosystem Built for Greater Impact
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── DETAILED SPOTLIGHTS ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-white">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title={`Partner Ecosystem Spotlights`}
              description="Working closely with industry leaders to deliver advanced capability and reliable performance."
              centered
              accentBar
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailedPartners.map((partner, idx) => (
              <FadeIn key={partner.id} delay={idx * 0.1}>
                <PartnerTile partner={partner} variant="full" className="h-full" />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── ALL PARTNERS GRID ────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-gray border-t border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="All Partner Organizations" 
              centered
              accentBar
            />
          </FadeIn>
          
          <div className="mt-12 overflow-hidden w-full max-w-full">
            <PartnerMarquee partners={allPartners} />
          </div>
        </Container>
      </section>
    </PageShell>
  );
};
