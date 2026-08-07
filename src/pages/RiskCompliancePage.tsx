import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { Button } from '../components/ui/Button';
import { compliancePageData, compliancePillars } from '../data/compliance';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const RiskCompliancePage: React.FC = () => {
  return (
    <PageShell title={compliancePageData.title}>
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-hive-warm-white border-b border-hive-border">
        <Container size="md" className="text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 mb-6">
              <ShieldCheck className="w-4 h-4 text-hive-yellow" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-hive-black">
                Governance
              </span>
            </div>
            <h1 className="text-display-lg font-bold font-heading text-hive-black mb-6">
              {compliancePageData.title}
            </h1>
            <p className="text-lg text-hive-text-muted leading-relaxed">
              {compliancePageData.subtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── INTRO ────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <div className="prose prose-lg text-hive-text-muted max-w-none text-center">
              <p className="leading-relaxed text-lg">
                {compliancePageData.intro}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── COMPLIANCE PILLARS ───────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-gray border-y border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="Risk & Compliance Pillars"
              centered
              accentBar
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compliancePillars.map((pillar, idx) => (
              <FadeIn key={pillar.id} delay={idx * 0.1} className="flex">
                <div className="flex flex-col p-8 rounded-2xl bg-hive-white border border-hive-border transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover h-full w-full">
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
                    <Button 
                      href={pillar.ctaHref || undefined} 
                      variant="ghost" 
                      className="self-start -ml-4"
                      isExternal={!!pillar.ctaHref}
                    >
                      {pillar.ctaLabel}
                      {pillar.ctaHref && <ArrowRight className="w-4 h-4 ml-1" />}
                    </Button>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CONTACT & WHISTLEBLOWER ──────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <div className="rounded-[2rem] p-10 lg:p-12 bg-hive-black text-hive-white border border-hive-border shadow-hive-lg text-center">
              <h2 className="text-2xl font-bold font-heading mb-4 text-hive-yellow">
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
                  className="text-white border-neutral-700 hover:bg-neutral-900"
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
