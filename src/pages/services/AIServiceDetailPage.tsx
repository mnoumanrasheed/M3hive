import React, { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { HeroBackground } from '../../components/ui/HeroBackground';
import { FadeIn } from '../../components/ui/FadeIn';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Breadcrumbs, BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import { AIHeroNetworkVisual } from '../../components/services/AIHeroNetworkVisual';
import { aiServiceDetails } from '../../data/services/aiServiceDetails';

export const AIServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = aiServiceDetails.find((s) => s.slug === slug);

  const heroRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Services', href: '/services' },
    { label: 'Artificial Intelligence', href: '/services/artificial-intelligence' },
    { label: service?.title || 'Service' },
  ];
  
  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo('.hero-intro', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-visual', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, '-=0.8');

    }, heroRef);

    return () => ctx.revert();
  }, [service]);

  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.capability-desc', 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, capabilitiesRef);

    return () => ctx.revert();
  }, [activeCapability, service]);

  if (!service) {
    return <Navigate to="/services/artificial-intelligence" replace />;
  }

  return (
    <PageShell title={`${service.title} | M3 Hive`} description={service.intro}>
      {/* ─── HERO SECTION ───────────────────────────────────────────────────── */}
      <section 
        ref={heroRef} 
        className="relative overflow-hidden flex flex-col border-b border-hive-border z-0 bg-hive-black"
        style={{ minHeight: 'clamp(600px, calc(100svh - 80px), 720px)' }}
      >
        <HeroBackground imageUrl={service.heroImage} />
        
        <div className="relative z-10 flex-1 w-full flex flex-col justify-center py-24 sm:py-32">
          <Container size="lg">
            <Breadcrumbs items={breadcrumbs} variant="dark" className="mb-4 sm:mb-6 pb-0 border-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <div className="hero-label inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10">
                <span className="w-2 h-2 rounded-full bg-hive-yellow flex-shrink-0" />
                <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
                  {service.eyebrow}
                </span>
              </div>
              <h1 className="hero-title text-display-md sm:text-display-lg font-bold font-heading text-white drop-shadow-md mb-4 leading-[1.15]">
                {service.title}
              </h1>
              <p className="hero-desc text-base sm:text-lg md:text-xl text-white/90 drop-shadow leading-relaxed mb-6 sm:mb-8 max-w-xl">
                {service.intro}
              </p>
              <div className="hero-cta pt-4">
                <Button href="/contact" variant="primary" size="lg">
                  Start a Conversation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="hero-visual hidden lg:flex items-center justify-center">
              <AIHeroNetworkVisual
                title={service.title}
                serviceId={service.slug}
              />
            </div>
          </div>
        </Container>
        </div>
      </section>

      {/* ─── INTRO / OVERVIEW SECTION ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-hive-white">
        <Container size="md">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-hive-black mb-6">Overview</h2>
            <p className="text-lg sm:text-xl text-hive-text-muted leading-relaxed">
              {service.overview}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── BUSINESS CHALLENGES / CAPABILITIES ─────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-hive-warm-white border-y border-hive-border">
        <Container size="lg">
          <FadeIn>
            <SectionHeading title="Capabilities" description="How we solve complex business challenges with AI." accentBar />
          </FadeIn>
          
          <div ref={capabilitiesRef} className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Interactive List */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {service.capabilities.map((cap, idx) => {
                const isActive = activeCapability === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCapability(idx)}
                    className={`text-left px-6 py-4 rounded-xl font-heading font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-between border ${
                      isActive 
                        ? 'bg-hive-white border-hive-yellow text-hive-black shadow-hive-md' 
                        : 'bg-transparent border-transparent text-hive-text-muted hover:bg-hive-white hover:text-hive-black'
                    }`}
                  >
                    <span>{cap.title}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-hive-yellow rotate-90' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>
            
            {/* Description Panel */}
            <div className="lg:col-span-7">
              <div className="sticky top-32 bg-hive-white rounded-2xl border border-hive-border p-8 sm:p-12 shadow-hive-lg min-h-[300px] flex items-center">
                <div className="capability-desc w-full">
                  <h3 className="text-2xl font-heading font-bold text-hive-black mb-6">
                    {service.capabilities[activeCapability]?.title}
                  </h3>
                  <p className="text-lg text-hive-text-muted leading-relaxed">
                    {service.capabilities[activeCapability]?.description || 
                     'We empower organizations to unlock the full potential of this capability through robust integrations, proven methodologies, and domain expertise.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── BUSINESS VALUE SECTION ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-hive-black text-white">
        <Container size="lg">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Business Value</h2>
              <div className="h-1 w-20 bg-hive-yellow mx-auto rounded-full"></div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {service.businessValue.map((val, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-hive-yellow/20 flex items-center justify-center mb-6 border border-hive-yellow/30">
                     <CheckCircle2 className="w-6 h-6 text-hive-yellow" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4">{val.title}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── WHY M3 HIVE ────────────────────────────────────────────────────── */}
      {service.whyM3Hive && service.whyM3Hive.length > 0 ? (
        <section className="py-16 sm:py-24 bg-hive-white">
          <Container size="lg">
            <FadeIn>
               <SectionHeading title="Why M3 Hive" centered accentBar />
            </FadeIn>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
               {service.whyM3Hive.map((item, idx) => (
                 <FadeIn key={idx} delay={idx * 0.1}>
                   <div className="flex gap-4">
                      <div className="w-2 h-full py-2 flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-hive-yellow"></div>
                        <div className="w-px h-full bg-hive-border mt-2"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-heading font-bold text-hive-black mb-2">{item.title}</h4>
                        <p className="text-hive-text-muted leading-relaxed">{item.description}</p>
                      </div>
                   </div>
                 </FadeIn>
               ))}
            </div>
          </Container>
        </section>
      ) : (
        <section className="py-16 sm:py-24 bg-hive-white">
          <Container size="md" className="text-center">
            <FadeIn>
              <h2 className="text-3xl font-heading font-bold text-hive-black mb-6">Expertise You Can Trust</h2>
              <p className="text-lg text-hive-text-muted leading-relaxed max-w-2xl mx-auto">
                Our multidisciplinary teams combine deep technical knowledge with practical business understanding to ensure your AI initiatives deliver measurable success.
              </p>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* ─── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-black text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-hive-yellow/10 via-transparent to-transparent opacity-50" />
        <Container size="md" className="relative z-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to explore what's possible with AI?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how {service.title} can transform your operations and create new competitive advantages.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </FadeIn>
        </Container>
      </section>

    </PageShell>
  );
};
