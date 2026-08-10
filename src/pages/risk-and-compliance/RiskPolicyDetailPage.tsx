import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { FadeIn } from '../../components/ui/FadeIn';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { riskPolicies } from '../../data/riskCompliancePolicies';
import { ShieldCheck, MessageSquare } from 'lucide-react';
import { HeroBackground } from '../../components/ui/HeroBackground';

export const RiskPolicyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const policy = slug ? riskPolicies[slug] : undefined;

  if (!policy) {
    return <Navigate to="/risk-and-compliance" replace />;
  }

  const breadcrumbs = [
    { label: 'Risk & Compliance', href: '/risk-and-compliance' },
    { label: policy.title, href: `/risk-and-compliance/${policy.slug}` }
  ];

  return (
    <PageShell title={`${policy.title} - Risk & Compliance`}>
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-risk-compliance.jpg" />
        <Container size="md" className="relative z-10">
          <FadeIn>
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs} className="justify-start text-white/70" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 mb-4 sm:mb-6">
              <ShieldCheck className="w-4 h-4 text-hive-yellow flex-shrink-0" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
                M3 Hive Policy
              </span>
            </div>
            <h1 className="text-display-md sm:text-display-lg font-bold font-heading text-white drop-shadow-md mb-4 sm:mb-6">
              {policy.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 drop-shadow leading-relaxed max-w-3xl">
              {policy.intro}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── POLICY CONTENT ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-hive-white">
        <Container size="md">
          <div className="space-y-16">
            {policy.sections.map((section, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="relative pl-6 sm:pl-8 border-l-4 border-hive-yellow/30 hover:border-hive-yellow transition-colors duration-300">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-hive-black mb-6 uppercase tracking-wider">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg text-hive-text-muted max-w-none">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed mb-4 whitespace-pre-line">
                        {/* Simple bold markdown replacement for "**text**" */}
                        {paragraph.split('**').map((text, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-hive-black font-semibold">{text}</strong> : text
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-20 pt-10 border-t border-hive-border flex flex-col sm:flex-row items-center justify-between gap-6">
              <Button href="/risk-and-compliance" variant="outline" size="md">
                Back to Risk & Compliance
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-hive-text-muted">
                  Have a question about our policies?
                </span>
                <Button href="/contact" variant="primary" size="md">
                  <MessageSquare className="w-4 h-4" />
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
