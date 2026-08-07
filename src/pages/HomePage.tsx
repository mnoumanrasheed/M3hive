import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/ui/FadeIn';
import { PartnersMarquee } from '../components/home/PartnersMarquee';
import { TestimonialCarousel } from '../components/home/TestimonialCarousel';
import { DiscoveryForm } from '../components/home/DiscoveryForm';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { homepageData } from '../data/homepage';
import { testimonialsData } from '../data/testimonials';
import { HeroCarousel } from '../components/home/HeroCarousel';

// A small component for the services grid on homepage
const ServiceSummaryCard: React.FC<{ service: any; index: number }> = ({ service, index }) => {
  return (
    <div
      className="group relative flex flex-col p-8 rounded-2xl bg-hive-white border border-hive-border transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover h-full"
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-5 h-5 text-hive-yellow" />
      </div>
      <div className="w-12 h-12 mb-6 rounded-xl flex items-center justify-center bg-hive-warm-white border border-hive-border group-hover:border-hive-yellow/30 transition-colors">
        <span className="font-heading font-bold text-hive-black text-lg">{index + 1}</span>
      </div>
      <h3 className="font-heading font-bold text-lg mb-3 text-hive-black group-hover:text-hive-orange transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-hive-text-muted leading-relaxed mb-6 flex-1">
        {service.description}
      </p>
      <Button href={service.ctaHref} variant="ghost" size="sm" className="self-start -ml-2">
        {service.ctaLabel}
      </Button>
    </div>
  );
};

export const HomePage: React.FC = () => {
  return (
    <PageShell title={homepageData.hero.title}>
      {/* ─── HERO CAROUSEL ─────────────────────────────────────── */}
      <HeroCarousel />

      {/* ─── INTRO SECTION ────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-hive-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionHeading
                  title={homepageData.intro.title}
                  eyebrow="Who We Are"
                  accentBar
                />
              </FadeIn>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <FadeIn delay={0.2}>
                <div className="prose prose-lg text-hive-text-muted max-w-none">
                  {homepageData.intro.description.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-4 last:mb-0 leading-relaxed text-base">{para}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href={homepageData.intro.ctaHref} variant="ghost">
                    {homepageData.intro.ctaLabel}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── SERVICES GRID ────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-hive-gray border-y border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading
              title={homepageData.servicesSummary.title}
              description="Comprehensive capabilities to transform operations, improve experiences, and build competitive advantage."
              centered
              eyebrow="Our Expertise"
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageData.servicesSummary.services.map((service, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <ServiceSummaryCard service={service} index={idx} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CLIENTS OVERVIEW & TESTIMONIALS ──────────────────────── */}
      <section className="py-24 lg:py-32 bg-hive-white overflow-hidden">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn>
              <SectionHeading
                title={homepageData.clientsOverview.title}
                description={homepageData.clientsOverview.description}
                centered
                eyebrow="Proven Impact"
                accentBar
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            {/* The carousel includes all 15 homepage testimonials natively */}
            <TestimonialCarousel testimonials={testimonialsData} />
          </FadeIn>
        </Container>
      </section>

      {/* ─── PARTNERS MARQUEE ─────────────────────────────────────── */}
      <PartnersMarquee />

      {/* ─── BOTTOM CTA (CONTACT SECTION) ─────────────────────────── */}
      <section className="py-24 lg:py-32 bg-hive-white">
        <Container size="lg">
          <FadeIn>
            <div className="relative rounded-[2rem] overflow-hidden bg-hive-black text-hive-white p-8 md:p-12 lg:p-16 border border-hive-border">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-hive-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-hive-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 text-center lg:text-left">
                  <h2 className="text-display-md font-bold font-heading mb-6 text-hive-yellow">
                    {homepageData.contactCTA.title}
                  </h2>
                  <p className="text-lg text-neutral-400">
                    {homepageData.contactCTA.description}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <DiscoveryForm />
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
};
