import React from 'react';
import { PageShell } from '../layout/PageShell';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { FadeIn } from '../ui/FadeIn';
import { Button } from '../ui/Button';
import { FAQAccordion } from '../ui/FAQAccordion';
import { ServicePageData } from '../../types/content';
import { Breadcrumbs, BreadcrumbItem } from '../ui/Breadcrumbs';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { AnimatedTimeline } from '../animation/AnimatedTimeline';

interface ServicePageTemplateProps {
  data: ServicePageData;
  serviceCategoryName: string;
}

const heroImageMap: Record<string, string> = {
  'Artificial Intelligence': '/assets/heroes/hero-artificial-intelligence.jpg',
  'Product Engineering': '/assets/heroes/hero-product-engineering.jpg',
  'Customer Experience': '/assets/heroes/hero-customer-experience.jpg',
  'Intelligent Automation': '/assets/heroes/hero-intelligent-automation.jpg',
  'Data & Analytics': '/assets/heroes/hero-data-analytics.jpg',
  'Cloud Platforms': '/assets/heroes/hero-cloud-platforms.jpg',
  'Edge Technologies': '/assets/heroes/hero-edge-technologies.jpg',
};

import { HeroBackground } from '../ui/HeroBackground';

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ data, serviceCategoryName }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Services', href: '/services' },
    { label: serviceCategoryName },
  ];

  const heroImageUrl = heroImageMap[serviceCategoryName];

  return (
    <PageShell title={data.title} description={data.subtitle}>
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        {heroImageUrl && <HeroBackground imageUrl={heroImageUrl} />}
        <Container size="md" className="relative z-10">
          <Breadcrumbs items={breadcrumbs} className="mb-10 pb-0 border-none" />
          
          <FadeIn>
            <h1 className="text-display-lg font-bold font-heading text-white drop-shadow-md mb-6">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow leading-relaxed mb-10 max-w-3xl">
              {data.subtitle}
            </p>
            
            {data.heroCta && (
              <Button href={data.heroCta.href} variant="primary" size="lg">
                {data.heroCta.label}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </FadeIn>
        </Container>
      </section>

      {/* ─── OFFERINGS ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-white">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="Solving Business Challenges" 
              description="Our capabilities and focus areas within this domain."
              accentBar
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.offerings.map((offering, idx) => (
              <FadeIn key={offering.id} delay={idx * 0.1} className="flex">
                <div className="flex flex-col p-8 rounded-2xl bg-hive-white border border-hive-border transition-all duration-300 hover:border-hive-yellow/50 hover:shadow-hive-hover h-full w-full">
                  <h3 className="text-xl font-heading font-bold text-hive-black mb-4">
                    {offering.title}
                  </h3>
                  <p className="text-sm text-hive-text-muted leading-relaxed flex-1">
                    {offering.description}
                  </p>
                  
                  {offering.ctaLabel && (
                    <div className="mt-6">
                      <Button href={offering.ctaHref || '#'} variant="ghost" size="sm" className="-ml-2 opacity-70 pointer-events-none">
                        {offering.ctaLabel}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── DELIVERY APPROACH ────────────────────────────────────── */}
      {data.deliveryApproach && data.deliveryApproach.length > 0 && (
        <section className="py-20 lg:py-24 bg-hive-gray border-y border-hive-border overflow-hidden">
          <Container size="lg">
            <FadeIn>
              <SectionHeading 
                title="Our Delivery Approach" 
                centered 
                accentBar 
              />
            </FadeIn>

            <AnimatedTimeline steps={data.deliveryApproach} />
          </Container>
        </section>
      )}

      {/* ─── INDUSTRIES ───────────────────────────────────────────── */}
      {data.industries && data.industries.length > 0 && (
        <section className="py-20 lg:py-24 bg-hive-white">
          <Container size="lg">
            <FadeIn>
              <SectionHeading title="Industries We Serve" accentBar />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.industries.map((industry, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="flex">
                  <div className="p-6 rounded-2xl bg-hive-warm-white border border-hive-border h-full w-full">
                    <h4 className="font-heading font-bold text-hive-black mb-2 text-base">
                      {industry.title}
                    </h4>
                    <p className="text-sm text-hive-text-muted leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── DIFFERENTIATORS ──────────────────────────────────────── */}
      {data.differentiators && data.differentiators.length > 0 && (
        <section className="py-20 lg:py-24 bg-hive-black text-hive-white border-y border-hive-border">
          <Container size="lg">
            <FadeIn>
              <SectionHeading 
                title={`Why Choose M3 Hive for ${serviceCategoryName}`}
                description="We bring specialized capability and practical experience to every engagement."
              />
            </FadeIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {data.differentiators.map((diff, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-hive-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-bold font-heading mb-2 text-white">
                        {diff.title}
                      </h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className="py-20 lg:py-24 bg-hive-gray border-y border-hive-border">
          <Container size="lg">
            <FadeIn>
              <SectionHeading title="Client Impact" centered accentBar />
            </FadeIn>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.testimonials.map((testimonial, idx) => (
                <FadeIn key={testimonial.id} delay={idx * 0.1} className="h-full">
                  <div className="h-full p-8 rounded-2xl bg-hive-white border border-hive-border shadow-hive-sm flex flex-col">
                    <p className="text-sm text-hive-black leading-relaxed italic flex-1 mb-6">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4 border-t border-hive-border pt-4">
                      {testimonial.logo && (
                        <img 
                          src={testimonial.logo} 
                          alt={`${testimonial.clientName || 'Client'} logo`} 
                          loading="lazy"
                          className="h-8 max-w-[80px] object-contain"
                        />
                      )}
                      <div>
                        {testimonial.authorName && (
                          <div className="font-bold text-sm font-heading">{testimonial.authorName}</div>
                        )}
                        {testimonial.authorRole && (
                          <div className="text-xs text-hive-text-muted">{testimonial.authorRole}</div>
                        )}
                        {!testimonial.authorName && (
                          <div className="font-bold text-sm font-heading">{testimonial.clientName}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── SUCCESS STORIES ──────────────────────────────────────── */}
      {data.successStories && data.successStories.length > 0 && (
        <section className="py-20 lg:py-24 bg-hive-white border-b border-hive-border">
          <Container size="md">
            <FadeIn>
              <SectionHeading title="Success Stories" centered accentBar />
            </FadeIn>
            <div className="mt-12 space-y-6">
              {data.successStories.map((story, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="p-6 rounded-2xl bg-hive-warm-white border border-hive-border">
                    <p className="text-sm text-hive-text-muted leading-relaxed">
                      {story}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── FAQS ─────────────────────────────────────────────────── */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-20 lg:py-24 bg-hive-white">
          <Container size="md">
            <FadeIn>
              <SectionHeading title="Frequently Asked Questions" centered accentBar />
            </FadeIn>

            <FadeIn delay={0.2} className="mt-12">
              <FAQAccordion items={data.faqs} />
            </FadeIn>
          </Container>
        </section>
      )}
    </PageShell>
  );
};
