import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { Button } from '../components/ui/Button';
import { compliancePageData, compliancePillars } from '../data/compliance';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { InnerPageHero } from '../components/ui/InnerPageHero';

export const RiskCompliancePage: React.FC = () => {
  return (
    <PageShell title={compliancePageData.title}>
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <InnerPageHero
        imageUrl="/assets/heroes/hero-risk-compliance.jpg"
        variant="risk"
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10">
            <ShieldCheck className="w-4 h-4 text-hive-yellow flex-shrink-0" />
            <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
              Governance
            </span>
          </div>
        }
        heading={compliancePageData.title}
        subheading={compliancePageData.subtitle}
      />

      {/* ─── INTRO ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <div className="prose prose-lg text-hive-text-muted max-w-none text-center">
              <p className="leading-relaxed text-base sm:text-lg">
                {compliancePageData.intro}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── COMPLIANCE PILLARS ───────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-gray border-y border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="Risk & Compliance Pillars"
              centered
              accentBar
            />
          </FadeIn>

          <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {compliancePillars.map((pillar, idx) => (
              <FadeIn key={pillar.id} delay={idx * 0.1} className="flex">
                <Link 
                  to={pillar.ctaHref || '#'}
                  className="group flex flex-col p-6 sm:p-8 rounded-2xl bg-hive-white border border-hive-border transition-all duration-300 md:hover:border-hive-yellow/50 md:hover:shadow-hive-hover h-full w-full cursor-pointer relative -top-0 md:hover:-top-1"
                >
                  <div className="w-12 h-12 mb-6 rounded-xl flex items-center justify-center bg-hive-warm-white border border-hive-border">
                    <span className="font-heading font-bold text-hive-black text-lg">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-hive-black mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-hive-text-muted leading-relaxed mb-6 flex-1 whitespace-pre-line">
                    {pillar.description}
                  </p>
                  
                  {pillar.ctaLabel && (
                    <div className="flex items-center text-sm font-heading font-semibold text-hive-black transition-colors duration-300 group-md:hover:text-hive-orange mt-auto">
                      {pillar.ctaLabel}
                      {pillar.ctaHref && <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-md:hover:translate-x-1" />}
                    </div>
                  )}
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CONTACT & WHISTLEBLOWER ──────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <div className="rounded-[2rem] p-6 sm:p-10 lg:p-12 bg-hive-black text-hive-white border border-hive-border shadow-hive-lg text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4 text-hive-yellow">
                Need Further Information?
              </h2>
              <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                For detailed compliance documents or to report a concern, please get in touch with our team.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href={`mailto:${compliancePageData.contactEmail}`} variant="primary">
                  <Mail className="w-4 h-4 mr-2" />
                  {compliancePageData.contactEmail}
                </Button>
                
                <Button 
                  href={compliancePageData.whistleblowerCta.href || undefined}
                  variant="outline" 
                  className="text-white border-neutral-700 md:hover:bg-neutral-900"
                  isExternal={!!compliancePageData.whistleblowerCta.href}
                >
                  {compliancePageData.whistleblowerCta.label}
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};
