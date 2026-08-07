/**
 * HeroCarousel — Homepage only
 * Reliable autoplay via goToRef pattern + GSAP crossfade + canvas particles
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/* ─── Slides ─────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 'home', label: 'Welcome to M3 Hive',
    heading: 'Engineering Digital Experiences\nThat Move Business Forward',
    description: 'AI-powered product engineering, intelligent automation, data, cloud, and experience design—built to improve how people live, work, and engage with technology.',
    cta: 'Start a Conversation', href: '/contact',
    secondaryCta: 'Discover M3 Hive', secondaryHref: '/about',
    image: '/assets/heroes/hero-home.jpg', accent: '#FDCF09',
  },
  {
    id: 'ai', label: 'Artificial Intelligence',
    heading: 'Move from AI Ambition to\nMeasurable Business Value',
    description: 'Design, deploy, and scale AI solutions that integrate seamlessly into existing operations—delivering measurable impact across every layer of the business.',
    cta: 'Explore Artificial Intelligence', href: '/services/artificial-intelligence',
    image: '/assets/heroes/hero-artificial-intelligence.jpg', accent: '#FDCF09',
  },
  {
    id: 'pe', label: 'Product Engineering',
    heading: 'Build Digital Products That\nPerform and Scale for Tomorrow',
    description: 'From concept through to production, we architect and engineer digital products built for performance, reliability, and long-term scalability.',
    cta: 'Explore Product Engineering', href: '/services/product-engineering',
    image: '/assets/heroes/hero-product-engineering.jpg', accent: '#F69822',
  },
  {
    id: 'cx', label: 'Customer Experience',
    heading: 'Design Experiences Customers\nValue and Businesses Can Measure',
    description: 'End-to-end customer experiences combining strategy, design, and technology to drive loyalty, satisfaction, and commercial outcomes.',
    cta: 'Explore Customer Experience', href: '/services/customer-experience',
    image: '/assets/heroes/hero-customer-experience.jpg', accent: '#FDCF09',
  },
  {
    id: 'ia', label: 'Intelligent Automation',
    heading: 'Transform Operations with\nIntelligent, Connected Automation',
    description: 'Automate complex, high-volume processes by combining RPA with AI—eliminating inefficiency and scaling without adding headcount.',
    cta: 'Explore Intelligent Automation', href: '/services/intelligent-automation',
    image: '/assets/heroes/hero-intelligent-automation.jpg', accent: '#F69822',
  },
  {
    id: 'da', label: 'Data & Analytics',
    heading: 'Turn Data Complexity into\nClear, Actionable Insight',
    description: 'Unify, govern, and activate your data—building the platforms and analytics capabilities needed to make confident, evidence-based decisions.',
    cta: 'Explore Data & Analytics', href: '/services/data-and-analytics',
    image: '/assets/heroes/hero-data-analytics.jpg', accent: '#FDCF09',
  },
  {
    id: 'cp', label: 'Cloud Platforms',
    heading: 'Modernise, Migrate, and Operate\nthe Cloud with Confidence',
    description: 'Plan, execute, and manage cloud transformations across AWS, Azure, and GCP—building secure, resilient, and cost-efficient cloud estates.',
    cta: 'Explore Cloud Platforms', href: '/services/cloud-platforms',
    image: '/assets/heroes/hero-cloud-platforms.jpg', accent: '#F69822',
  },
  {
    id: 'et', label: 'Edge Technologies',
    heading: 'Create Immersive, Connected\nExperiences Beyond the Screen',
    description: 'Build extended-reality experiences, IoT ecosystems, and immersive simulations that connect physical and digital worlds to unlock new value.',
    cta: 'Explore Edge Technologies', href: '/services/edge-technologies',
    image: '/assets/heroes/hero-edge-technologies.jpg', accent: '#FDCF09',
  },
] as const;

const TOTAL = SLIDES.length;
const AUTOPLAY_MS = 5500; // refined autoplay delay

/* ─── 3D Cinematic Particle Hook ──────────────────────────────── */
function useParticles(ref: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const FOCAL_LENGTH = 300;
    const Z_MAX = 800; // depth

    const particles: {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      baseR: number; baseAlpha: number; phase: number; speed: number;
    }[] = [];

    function init() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
      particles.length = 0;
      
      const count = Math.min(Math.floor((W * H) / 8000), 180); // Increase count for dense 3D field
      for (let i = 0; i < count; i++) {
        particles.push({
          x: (Math.random() - 0.5) * W * 2, // span wider than screen
          y: (Math.random() - 0.5) * H * 2,
          z: Math.random() * Z_MAX,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.4 + 0.1), // float up slightly faster
          vz: (Math.random() - 0.5) * 0.5,
          baseR: Math.random() * 3 + 1.5, // Larger radius for more visibility
          baseAlpha: Math.random() * 0.6 + 0.4, // Higher base opacity (brighter)
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
        });
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / W - 0.5;
      targetMouseY = (e.clientY - rect.top) / H - 0.5;
    };
    window.addEventListener('pointermove', onMove);

    function tick() {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx!.clearRect(0, 0, W, H);

      // Sort by Z for proper rendering order (back to front)
      particles.sort((a, b) => b.z - a.z);

      for (const p of particles) {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.phase += p.speed;

        // Wrap Z
        if (p.z < 0) p.z += Z_MAX;
        if (p.z > Z_MAX) p.z -= Z_MAX;

        // Wrap X & Y (relative to 3D space)
        const boundX = W * 1.5;
        const boundY = H * 1.5;
        if (p.x < -boundX) p.x += boundX * 2;
        if (p.x > boundX) p.x -= boundX * 2;
        if (p.y < -boundY) { p.y += boundY * 2; p.x = (Math.random() - 0.5) * boundX * 2; }
        if (p.y > boundY) p.y -= boundY * 2;

        // 3D Projection
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z);
        const parallaxX = mouseX * p.z * 1.8; // Increased parallax for deeper 3D feel
        const parallaxY = mouseY * p.z * 1.8;
        
        const screenX = (p.x - parallaxX) * scale + W / 2;
        const screenY = (p.y - parallaxY) * scale + H / 2;
        const screenR = Math.max(0.1, p.baseR * scale);

        // Cull offscreen
        if (screenX < -50 || screenX > W + 50 || screenY < -50 || screenY > H + 50) continue;

        // Depth of Field (far particles are blurrier/darker)
        const zFactor = 1 - (p.z / Z_MAX); // 1 = close, 0 = far
        const alpha = p.baseAlpha * zFactor * (0.6 + 0.4 * Math.sin(p.phase));

        // Glow (bigger for closer particles)
        const glowRadius = screenR * 4;
        const g = ctx!.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowRadius);
        g.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`);
        g.addColorStop(0.4, `rgba(253,207,9,${alpha * 0.5})`);
        g.addColorStop(1, 'rgba(253,207,9,0)');
        
        ctx!.beginPath();
        ctx!.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(screenX, screenY, screenR, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha * 1.5})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    init();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}


/* ─── Component ──────────────────────────────────────────────── */
export const HeroCarousel: React.FC = () => {
  const [idx, setIdx] = useState(0);

  /* Stable refs */
  const idxRef    = useRef(0);
  const pausedRef = useRef(false);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);
  const progRef   = useRef<gsap.core.Tween | null>(null);

  /* DOM refs */
  const bgRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const perspRef    = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const touchRef    = useRef(false);

  useParticles(canvasRef);

  /* ── init bg opacity ───────────────────────────────────────── */
  useLayoutEffect(() => {
    bgRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.05 });
    });
  }, []);

  /* ── progress bar ──────────────────────────────────────────── */
  const startBar = () => {
    if (!barRef.current) return;
    progRef.current?.kill();
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left' });
    progRef.current = gsap.to(barRef.current, {
      scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: 'none',
    });
  };

  /* ── core transition ───────────────────────────────────────── */
  const goTo = (next: number) => {
    const from = idxRef.current;
    if (next === from) return;

    tlRef.current?.kill();

    const fromEl = bgRefs.current[from];
    const toEl   = bgRefs.current[next];

    // Update index immediately so stacked calls don't double-fire
    idxRef.current = next;

    if (!fromEl || !toEl) {
      bgRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: i === next ? 1 : 0 }));
      setIdx(next);
      return;
    }

    gsap.set(toEl, { opacity: 0, scale: 1.05, zIndex: 1 });
    gsap.set(fromEl, { zIndex: 2 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Text out - fast slide and fade (finishes around 0.37s)
    tl.to([labelRef.current, headRef.current, descRef.current, ctaRef.current],
      { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', stagger: 0.04 }, 0);

    // Swap React state right after text is fully invisible (at 0.38s)
    tl.call(() => { setIdx(next); }, [], 0.38);

    // Images - smooth premium crossfade (started slightly earlier)
    tl.to(fromEl, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 0.1);
    tl.to(toEl,   { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, 0.1);

    // Text in - snappier entrance, minimal gap after state swap (starts at 0.45s)
    const inStart = 0.45;
    tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, inStart);
    tl.fromTo(headRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, inStart + 0.08);
    tl.fromTo(descRef.current,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, inStart + 0.16);
    tl.fromTo(ctaRef.current,   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.40, ease: 'power2.out' }, inStart + 0.24);
  };

  /* ── KEY FIX: always-current goTo ref ─────────────────────── */
  const goToRef = useRef(goTo);
  goToRef.current = goTo; // updated every render → interval never stale

  /* ── autoplay (single interval, reads goToRef.current) ─────── */
  useEffect(() => {
    startBar();

    const id = setInterval(() => {
      if (pausedRef.current) return;
      const next = (idxRef.current + 1) % TOTAL;
      goToRef.current(next);
      startBar();
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(id);
      tlRef.current?.kill();
      progRef.current?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally once — goToRef.current always points to latest

  /* Manual navigation — clears then restarts interval */
  const navigate = (toIdx: number) => {
    const next = ((toIdx % TOTAL) + TOTAL) % TOTAL;
    goToRef.current(next);
    startBar();
  };

  /* ── visibility pause ──────────────────────────────────────── */
  useEffect(() => {
    const fn = () => {
      if (document.hidden) { pausedRef.current = true; progRef.current?.pause(); }
      else { pausedRef.current = false; progRef.current?.resume(); }
    };
    document.addEventListener('visibilitychange', fn);
    return () => document.removeEventListener('visibilitychange', fn);
  }, []);

  /* ── initial text animation ────────────────────────────────── */
  useLayoutEffect(() => {
    gsap.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.4 });
    gsap.fromTo(headRef.current,  { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
    gsap.fromTo(descRef.current,  { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.65, ease: 'power2.out' });
    gsap.fromTo(ctaRef.current,   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: 'power2.out' });
  }, []);

  /* ── 3D pointer tilt ───────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: PointerEvent) => {
      if (touchRef.current) return;
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      // Keep rotation small and refined for premium feel
      gsap.to(perspRef.current, {
        rotateY: nx * 3, rotateX: -ny * 2, scale: 1.02,
        duration: 0.8, ease: 'power2.out', overwrite: 'auto',
      });
    };
    const onLeave = () => {
      gsap.to(perspRef.current, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 1.2, ease: 'power3.out', overwrite: 'auto',
      });
    };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    section.addEventListener('touchstart', () => { touchRef.current = true; }, { passive: true });
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const slide = SLIDES[idx];
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      aria-label="Service highlights carousel"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(540px, 90vh, 720px)' }}
      onMouseEnter={() => { pausedRef.current = true;  progRef.current?.pause(); }}
      onMouseLeave={() => { pausedRef.current = false; progRef.current?.resume(); }}
      onFocus={() => { pausedRef.current = true;  progRef.current?.pause(); }}
      onBlur={() =>  { pausedRef.current = false; progRef.current?.resume(); }}
    >
      {/* ── Backgrounds (3-D perspective) ──────────────────────── */}
      <div
        ref={perspRef}
        className="absolute inset-0"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d', willChange: 'transform' }}
        aria-hidden="true"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={el => { bgRefs.current[i] = el; }}
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url("${s.image}")`, willChange: 'opacity, transform' }}
          />
        ))}
      </div>

      {/* ── Cinematic Overlays ──────────────────────────────────── */}
      {/* 1. Base dark left-to-right gradient for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)' }}
      />
      
      {/* 2. Top and Bottom cinematic bars/fades (Vignette) */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }} />
        
      {/* 3. Right edge cinematic shadow */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.4), transparent)' }} />

      {/* 4. Subtle ambient center glow (Color Dodge) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-30"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(253, 207, 9, 0.15) 0%, transparent 60%)'
        }}
      />

      {/* ── Canvas particles ────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5, mixBlendMode: 'screen', opacity: 1 }}
      />

      {/* ── Text block ──────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-center" style={{ zIndex: 10 }}>
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 pb-24" style={{ maxWidth: '720px' }}>

          {/* Label */}
          <div ref={labelRef} className="flex items-center gap-2.5 mb-6" style={{ opacity: 0 }}>
            <span className="h-[2px] w-8 rounded-full" style={{ background: slide.accent }} />
            <span className="text-[11px] font-heading font-bold tracking-[0.25em] uppercase"
              style={{ color: slide.accent }}>
              {slide.label}
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headRef}
            aria-live="polite"
            className="font-heading font-bold text-white leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', opacity: 0, textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
          >
            {slide.heading.split('\n').map((ln, i, arr) => (
              <React.Fragment key={i}>{ln}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-white/85 leading-relaxed mb-10"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', maxWidth: '580px', opacity: 0 }}
          >
            {slide.description}
          </p>

          {/* CTA row */}
          <div ref={ctaRef} className="flex items-center gap-6 flex-wrap" style={{ opacity: 0 }}>
            <Link
              to={slide.href}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-bold text-[15px] tracking-wide text-hive-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: slide.accent }}
            >
              {slide.cta}
              {slide.id !== 'home' && <ArrowRight className="w-4 h-4 flex-shrink-0" />}
            </Link>
            
            {/* Render secondary CTA for home slide, or simple text link for services */}
            {'secondaryCta' in slide ? (
               <Link
               to={(slide as any).secondaryHref}
               className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-heading font-bold text-[15px] tracking-wide text-white border border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm"
             >
               {(slide as any).secondaryCta}
             </Link>
            ) : (
              <Link
                to="/services"
                className="text-white/70 text-[15px] font-heading font-medium hover:text-white transition-colors duration-300 underline-offset-[6px] underline decoration-white/30 hover:decoration-white/80"
              >
                View All Services
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Controls bar ────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-0 right-0 px-6 sm:px-10 lg:px-16 xl:px-24" style={{ zIndex: 20 }}>
        <div className="flex items-center gap-5">

          {/* Counter */}
          <span className="font-heading tabular-nums text-[12px] select-none min-w-[44px]">
            <span className="text-white font-bold">{pad(idx)}</span>
            <span className="text-white/30 mx-[4px]">/</span>
            <span className="text-white/50">{pad(TOTAL - 1)}</span>
          </span>

          {/* Progress */}
          <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div
              ref={barRef}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #FDCF09, #F69822)',
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
              }}
            />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-[6px]" role="tablist" aria-label="Slides">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Slide ${i + 1}: ${s.label}`}
                onClick={() => navigate(i)}
                className="rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                style={{
                  width: i === idx ? '24px' : '6px',
                  height: '6px',
                  background: i === idx
                    ? 'linear-gradient(to right, #FDCF09, #F69822)'
                    : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            {(['prev', 'next'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => navigate(dir === 'prev' ? idx - 1 : idx + 1)}
                aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
                className="w-10 h-10 rounded-xl border flex items-center justify-center text-white transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}
              >
                {dir === 'prev' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">Use arrow buttons to navigate between slides. Autoplay pauses on hover.</p>
    </section>
  );
};
