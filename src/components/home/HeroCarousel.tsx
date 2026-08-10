import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

/* ─── Slides ─────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 'home',
    label: 'Welcome to M3 Hive',
    heading: 'Engineering Digital Experiences\nThat Move Business Forward',
    description:
      'AI-powered product engineering, intelligent automation, data, cloud, and experience design—built to improve how people live, work, and engage with technology.',
    cta: 'Start a Conversation',
    href: '/contact',
    secondaryCta: 'Discover M3 Hive',
    secondaryHref: '/about',
    image: '/assets/heroes/hero-home.jpg',
    accent: '#FDCF09',
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    heading: 'Move from AI Ambition to\nMeasurable Business Value',
    description:
      'Design, deploy, and scale AI solutions that integrate seamlessly into existing operations—delivering measurable impact across every layer of the business.',
    cta: 'Explore Artificial Intelligence',
    href: '/services/artificial-intelligence',
    image: '/assets/heroes/hero-artificial-intelligence.jpg',
    accent: '#FDCF09',
  },
  {
    id: 'pe',
    label: 'Product Engineering',
    heading: 'Build Digital Products That\nPerform and Scale for Tomorrow',
    description:
      'From concept through to production, we architect and engineer digital products built for performance, reliability, and long-term scalability.',
    cta: 'Explore Product Engineering',
    href: '/services/product-engineering',
    image: '/assets/heroes/hero-product-engineering.jpg',
    accent: '#F69822',
  },
  {
    id: 'cx',
    label: 'Customer Experience',
    heading: 'Design Experiences Customers Value and Businesses Can Measure',
    description:
      'End-to-end customer experiences combining strategy, design, and technology to drive loyalty, satisfaction, and commercial outcomes.',
    cta: 'Explore Customer Experience',
    href: '/services/customer-experience',
    image: '/assets/heroes/hero-customer-experience.jpg',
    accent: '#FDCF09',
  },
  {
    id: 'ia',
    label: 'Intelligent Automation',
    heading: 'Transform Operations with Intelligent,\nConnected Automation',
    description:
      'Automate complex, high-volume processes by combining RPA with AI—eliminating inefficiency and scaling without adding headcount.',
    cta: 'Explore Intelligent Automation',
    href: '/services/intelligent-automation',
    image: '/assets/heroes/hero-intelligent-automation.jpg',
    accent: '#F69822',
  },
  {
    id: 'da',
    label: 'Data & Analytics',
    heading: 'Turn Data Complexity into\nClear, Actionable Insight',
    description:
      'Unify, govern, and activate your data—building the platforms and analytics capabilities needed to make confident, evidence-based decisions.',
    cta: 'Explore Data & Analytics',
    href: '/services/data-and-analytics',
    image: '/assets/heroes/hero-data-analytics.jpg',
    accent: '#FDCF09',
  },
  {
    id: 'cp',
    label: 'Cloud Platforms',
    heading: 'Modernise, Migrate, and Operate\nthe Cloud with Confidence',
    description:
      'Plan, execute, and manage cloud transformations across AWS, Azure, and GCP—building secure, resilient, and cost-efficient cloud estates.',
    cta: 'Explore Cloud Platforms',
    href: '/services/cloud-platforms',
    image: '/assets/heroes/hero-cloud-platforms.jpg',
    accent: '#F69822',
  },
  {
    id: 'et',
    label: 'Edge Technologies',
    heading: 'Create Immersive, Connected\nExperiences Beyond the Screen',
    description:
      'Build extended-reality experiences, IoT ecosystems, and immersive simulations that connect physical and digital worlds to unlock new value.',
    cta: 'Explore Edge Technologies',
    href: '/services/edge-technologies',
    image: '/assets/heroes/hero-edge-technologies.jpg',
    accent: '#FDCF09',
  },
] as const;

const TOTAL = SLIDES.length;
const AUTOPLAY_MS = 5500;

/* ─── 3D Cinematic Particle Hook ──────────────────────────────── */
function useParticles(ref: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Stable non-null aliases for nested callbacks.
    // TypeScript can otherwise lose the null narrowing inside init()/tick().
    const canvasEl: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    let raf = 0;

    let W = 0;
    let H = 0;

    let mouseX = 0;
    let mouseY = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;

    const FOCAL_LENGTH = 300;
    const Z_MAX = 800;

    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseR: number;
      baseAlpha: number;
      phase: number;
      speed: number;
    }[] = [];

    function init() {
      W = canvasEl.offsetWidth;
      H = canvasEl.offsetHeight;

      canvasEl.width = W;
      canvasEl.height = H;

      particles.length = 0;

      const count = Math.min(
        Math.floor((W * H) / 8000),
        180
      );

      for (let i = 0; i < count; i++) {
        particles.push({
          x: (Math.random() - 0.5) * W * 2,
          y: (Math.random() - 0.5) * H * 2,
          z: Math.random() * Z_MAX,

          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.4 + 0.1),
          vz: (Math.random() - 0.5) * 0.5,

          baseR: Math.random() * 3 + 1.5,
          baseAlpha: Math.random() * 0.6 + 0.4,

          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
        });
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();

      targetMouseX =
        (e.clientX - rect.left) / W - 0.5;

      targetMouseY =
        (e.clientY - rect.top) / H - 0.5;
    };

    window.addEventListener(
      'pointermove',
      onMove
    );

    function tick() {
      mouseX +=
        (targetMouseX - mouseX) * 0.05;

      mouseY +=
        (targetMouseY - mouseY) * 0.05;

      context.clearRect(0, 0, W, H);

      particles.sort(
        (a, b) => b.z - a.z
      );

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.phase += p.speed;

        if (p.z < 0) p.z += Z_MAX;
        if (p.z > Z_MAX) p.z -= Z_MAX;

        const boundX = W * 1.5;
        const boundY = H * 1.5;

        if (p.x < -boundX) {
          p.x += boundX * 2;
        }

        if (p.x > boundX) {
          p.x -= boundX * 2;
        }

        if (p.y < -boundY) {
          p.y += boundY * 2;
          p.x =
            (Math.random() - 0.5) *
            boundX *
            2;
        }

        if (p.y > boundY) {
          p.y -= boundY * 2;
        }

        const scale =
          FOCAL_LENGTH /
          (FOCAL_LENGTH + p.z);

        const parallaxX =
          mouseX * p.z * 1.8;

        const parallaxY =
          mouseY * p.z * 1.8;

        const screenX =
          (p.x - parallaxX) *
          scale +
          W / 2;

        const screenY =
          (p.y - parallaxY) *
          scale +
          H / 2;

        const screenR = Math.max(
          0.1,
          p.baseR * scale
        );

        if (
          screenX < -50 ||
          screenX > W + 50 ||
          screenY < -50 ||
          screenY > H + 50
        ) {
          continue;
        }

        const zFactor =
          1 - p.z / Z_MAX;

        const alpha =
          p.baseAlpha *
          zFactor *
          (0.6 +
            0.4 *
            Math.sin(p.phase));

        const glowRadius =
          screenR * 4;

        const g =
          context.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            glowRadius
          );

        g.addColorStop(
          0,
          `rgba(255,255,255,${alpha * 0.9
          })`
        );

        g.addColorStop(
          0.4,
          `rgba(253,207,9,${alpha * 0.5
          })`
        );

        g.addColorStop(
          1,
          'rgba(253,207,9,0)'
        );

        context.beginPath();

        context.arc(
          screenX,
          screenY,
          glowRadius,
          0,
          Math.PI * 2
        );

        context.fillStyle = g;
        context.fill();

        context.beginPath();

        context.arc(
          screenX,
          screenY,
          screenR,
          0,
          Math.PI * 2
        );

        context.fillStyle =
          `rgba(255,255,255,${alpha * 1.5
          })`;

        context.fill();
      }

      raf =
        requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(
      init
    );

    ro.observe(canvasEl);

    init();
    tick();

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        'pointermove',
        onMove
      );

      ro.disconnect();
    };
  }, [ref]);
}

/* ─── Component ──────────────────────────────────────────────── */
export const HeroCarousel: React.FC = () => {
  const [idx, setIdx] = useState(0);

  /* Stable refs */
  const idxRef = useRef(0);

  const pausedRef =
    useRef(false);

  const tlRef =
    useRef<gsap.core.Timeline | null>(
      null
    );

  const progRef =
    useRef<gsap.core.Tween | null>(
      null
    );

  /* DOM refs */
  const bgRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);

  const labelRef =
    useRef<HTMLDivElement>(null);

  const headRef =
    useRef<HTMLHeadingElement>(null);

  const descRef =
    useRef<HTMLParagraphElement>(null);

  const ctaRef =
    useRef<HTMLDivElement>(null);

  const barRef =
    useRef<HTMLDivElement>(null);

  const sectionRef =
    useRef<HTMLElement>(null);

  const perspRef =
    useRef<HTMLDivElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const touchRef =
    useRef(false);

  useParticles(canvasRef);

  /* ── Preload hero images to prevent first-time slide flashes ───── */
  useEffect(() => {
    const preloadedImages = SLIDES.map((slideItem) => {
      const img = new Image();
      img.src = slideItem.image;
      return img;
    });

    return () => {
      preloadedImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  /* ── init bg opacity ───────────────────────────────────────── */
  useLayoutEffect(() => {
    bgRefs.current.forEach(
      (el, i) => {
        if (el) {
          gsap.set(el, {
            opacity:
              i === 0 ? 1 : 0,

            scale:
              i === 0 ? 1 : 1.05,
          });
        }
      }
    );
  }, []);

  /* ── progress bar ──────────────────────────────────────────── */
  const startBar = () => {
    if (!barRef.current) return;

    progRef.current?.kill();

    gsap.set(
      barRef.current,
      {
        scaleX: 0,
        transformOrigin: 'left',
      }
    );

    progRef.current =
      gsap.to(
        barRef.current,
        {
          scaleX: 1,
          duration:
            AUTOPLAY_MS / 1000,
          ease: 'none',
        }
      );
  };

  /* ── core transition ───────────────────────────────────────── */
  const goTo = (
    next: number
  ) => {
    const from =
      idxRef.current;

    if (next === from) return;

    tlRef.current?.kill();

    const fromEl =
      bgRefs.current[from];

    const toEl =
      bgRefs.current[next];

    // Intelligent Automation has a slightly different heading geometry.
    // Give transitions into/out of this slide a few extra milliseconds so
    // React can swap the text while it is fully invisible, avoiding a snap.
    const involvesIntelligentAutomation =
      SLIDES[from].id === 'ia' || SLIDES[next].id === 'ia';

    const stateSwapTime = involvesIntelligentAutomation ? 0.43 : 0.38;
    const textInStart = involvesIntelligentAutomation ? 0.50 : 0.45;

    idxRef.current = next;

    if (!fromEl || !toEl) {
      bgRefs.current.forEach(
        (el, i) =>
          el &&
          gsap.set(el, {
            opacity:
              i === next ? 1 : 0,
          })
      );

      setIdx(next);

      return;
    }

    gsap.set(toEl, {
      opacity: 0,
      scale: 1.05,
      zIndex: 1,
    });

    gsap.set(fromEl, {
      zIndex: 2,
    });

    const tl =
      gsap.timeline();

    tlRef.current = tl;

    tl.to(
      [
        labelRef.current,
        headRef.current,
        descRef.current,
        ctaRef.current,
      ],
      {
        opacity: 0,
        y: involvesIntelligentAutomation ? -6 : -10,
        duration: involvesIntelligentAutomation ? 0.30 : 0.25,
        ease: involvesIntelligentAutomation ? 'power2.inOut' : 'power2.in',
        stagger: 0.04,
      },
      0
    );

    tl.call(
      () => {
        setIdx(next);
      },
      [],
      stateSwapTime
    );

    tl.to(
      fromEl,
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      0.1
    );

    tl.to(
      toEl,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      0.1
    );

    const inStart =
      textInStart;

    tl.fromTo(
      labelRef.current,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      },
      inStart
    );

    tl.fromTo(
      headRef.current,
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      },
      inStart + 0.08
    );

    tl.fromTo(
      descRef.current,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      },
      inStart + 0.16
    );

    tl.fromTo(
      ctaRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      inStart + 0.24
    );
  };

  /* ── always-current goTo ref ──────────────────────────────── */
  const goToRef =
    useRef(goTo);

  goToRef.current = goTo;

  /* ── autoplay ─────────────────────────────────────────────── */
  useEffect(() => {
    startBar();

    const id =
      setInterval(() => {
        if (
          pausedRef.current
        ) {
          return;
        }

        const next =
          (idxRef.current +
            1) %
          TOTAL;

        goToRef.current(
          next
        );

        startBar();
      }, AUTOPLAY_MS);

    return () => {
      clearInterval(id);

      tlRef.current?.kill();

      progRef.current?.kill();
    };
  }, []);

  /* ── Manual navigation ────────────────────────────────────── */
  const navigate = (
    toIdx: number
  ) => {
    const next =
      ((toIdx % TOTAL) +
        TOTAL) %
      TOTAL;

    goToRef.current(
      next
    );

    startBar();
  };

  /* ── visibility pause ─────────────────────────────────────── */
  useEffect(() => {
    const fn = () => {
      if (document.hidden) {
        pausedRef.current =
          true;

        progRef.current?.pause();
      } else {
        pausedRef.current =
          false;

        progRef.current?.resume();
      }
    };

    document.addEventListener(
      'visibilitychange',
      fn
    );

    return () =>
      document.removeEventListener(
        'visibilitychange',
        fn
      );
  }, []);

  /* ── initial text animation ────────────────────────────────── */
  useLayoutEffect(() => {
    gsap.fromTo(
      labelRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
      }
    );

    gsap.fromTo(
      headRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(
      descRef.current,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.65,
        ease: 'power2.out',
      }
    );

    gsap.fromTo(
      ctaRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'power2.out',
      }
    );
  }, []);

  /* ── 3D pointer tilt ───────────────────────────────────────── */
  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const onMove = (
      e: PointerEvent
    ) => {
      if (
        touchRef.current
      ) {
        return;
      }

      const r =
        section.getBoundingClientRect();

      const nx =
        (e.clientX -
          r.left) /
        r.width -
        0.5;

      const ny =
        (e.clientY -
          r.top) /
        r.height -
        0.5;

      gsap.to(
        perspRef.current,
        {
          rotateY: nx * 3,
          rotateX: -ny * 2,
          scale: 1.02,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    };

    const onLeave = () => {
      gsap.to(
        perspRef.current,
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );
    };

    const onTouchStart = () => {
      touchRef.current =
        true;
    };

    section.addEventListener(
      'pointermove',
      onMove
    );

    section.addEventListener(
      'pointerleave',
      onLeave
    );

    section.addEventListener(
      'touchstart',
      onTouchStart,
      {
        passive: true,
      }
    );

    return () => {
      section.removeEventListener(
        'pointermove',
        onMove
      );

      section.removeEventListener(
        'pointerleave',
        onLeave
      );

      section.removeEventListener(
        'touchstart',
        onTouchStart
      );
    };
  }, []);

  const slide =
    SLIDES[idx];

  const pad = (
    n: number
  ) =>
    String(n + 1).padStart(
      2,
      '0'
    );

  return (
    <section
      ref={sectionRef}
      aria-label="Service highlights carousel"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        minHeight:
          'clamp(600px, calc(100svh - 80px), 720px)',
      }}
      onMouseEnter={() => {
        pausedRef.current =
          true;

        progRef.current?.pause();
      }}
      onMouseLeave={() => {
        pausedRef.current =
          false;

        progRef.current?.resume();
      }}
      onFocus={() => {
        pausedRef.current =
          true;

        progRef.current?.pause();
      }}
      onBlur={() => {
        pausedRef.current =
          false;

        progRef.current?.resume();
      }}
    >
      {/* ── Backgrounds ─────────────────────────────────────── */}
      <div
        ref={perspRef}
        className="absolute inset-0"
        style={{
          perspective:
            '1200px',

          transformStyle:
            'preserve-3d',

          willChange:
            'transform',
        }}
        aria-hidden="true"
      >
        {SLIDES.map(
          (s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                bgRefs.current[i] =
                  el;
              }}
              className="absolute inset-0 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage:
                  `url("${s.image}")`,

                willChange:
                  'opacity, transform',
              }}
            />
          )
        )}
      </div>

      {/* ── Dark readability gradient ───────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* ── Bottom vignette ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        }}
      />

      {/* ── Top vignette ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
        }}
      />

      {/* ── Right shadow ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, rgba(0,0,0,0.4), transparent)',
        }}
      />

      {/* ── Ambient glow ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-30"
        style={{
          background:
            'radial-gradient(circle at 60% 50%, rgba(253, 207, 9, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* ── Canvas particles ───────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 5,
          mixBlendMode:
            'screen',
          opacity: 1,
        }}
      />

      {/* ── TEXT BLOCK — FIXED POSITIONING ────────────────── */}
      <div
        className="
          relative
          z-10
          flex-1
          w-full
          flex
          flex-col
          justify-start
          pt-10
          sm:pt-12
          lg:pt-10
          pb-28
          sm:pb-32
        "
      >
        <div
          className="px-5 sm:px-10 lg:px-16 xl:px-24"
          style={{
            maxWidth:
              '720px',
          }}
        >
          {/* Label */}
          <div
            ref={labelRef}
            className="flex items-center gap-2.5 mb-3 sm:mb-5"
            style={{
              opacity: 0,
            }}
          >
            <span
              className="h-[2px] w-8 rounded-full flex-shrink-0"
              style={{
                background:
                  slide.accent,
              }}
            />

            <span
              className="text-[10px] sm:text-[11px] font-heading font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase"
              style={{
                color:
                  slide.accent,
              }}
            >
              {slide.label}
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headRef}
            aria-live="polite"
            className="font-heading font-bold text-white leading-[1.12] mb-3 sm:mb-5"
            style={{
              fontSize:
                slide.id === 'ia'
                  ? 'clamp(1.5rem, 3.8vw, 3.15rem)'
                  : 'clamp(1.5rem, 4.5vw, 3.5rem)',

              maxWidth:
                slide.id === 'ia'
                  ? '650px'
                  : undefined,

              opacity: 0,

              textShadow:
                '0 4px 24px rgba(0,0,0,0.4)',
            }}
          >
            {slide.heading
              .split('\n')
              .map(
                (
                  ln,
                  i,
                  arr
                ) => (
                  <React.Fragment
                    key={i}
                  >
                    {ln}

                    {i <
                      arr.length -
                      1 && (
                        <br />
                      )}
                  </React.Fragment>
                )
              )}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-white/85 leading-relaxed mb-5 sm:mb-8"
            style={{
              fontSize:
                'clamp(0.85rem, 1.8vw, 1.1rem)',

              maxWidth:
                '560px',

              opacity: 0,
            }}
          >
            {slide.description}
          </p>

          {/* CTA row */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 sm:gap-5"
            style={{
              opacity: 0,
            }}
          >
            <Link
              to={slide.href}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-5 py-2.5 sm:px-7 sm:py-4 rounded-xl font-heading font-bold text-sm sm:text-[15px] tracking-wide text-hive-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                background:
                  slide.accent,
              }}
            >
              {slide.cta}

              {slide.id !==
                'home' && (
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                )}
            </Link>

            {'secondaryCta' in
              slide ? (
              <Link
                to={
                  slide.secondaryHref
                }
                className="inline-flex items-center gap-2 sm:gap-2.5 px-5 py-2.5 sm:px-7 sm:py-4 rounded-xl font-heading font-bold text-sm sm:text-[15px] tracking-wide text-white border border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm"
              >
                {
                  slide.secondaryCta
                }
              </Link>
            ) : (
              <Link
                to="/services"
                className="text-white/70 text-sm sm:text-[15px] font-heading font-medium hover:text-white transition-colors duration-300 underline-offset-[6px] underline decoration-white/30 hover:decoration-white/80"
              >
                View All Services
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Controls bar ───────────────────────────────────── */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-0 right-0 px-5 sm:px-10 lg:px-16 xl:px-24"
        style={{
          zIndex: 20,
        }}
      >
        <div className="flex items-center gap-5">
          {/* Counter */}
          <span className="hidden sm:inline font-heading tabular-nums text-[12px] select-none min-w-[44px]">
            <span className="text-white font-bold">
              {pad(idx)}
            </span>

            <span className="text-white/30 mx-[4px]">
              /
            </span>

            <span className="text-white/50">
              {pad(
                TOTAL - 1
              )}
            </span>
          </span>

          {/* Progress */}
          <div
            className="flex-1 h-[2px] rounded-full overflow-hidden"
            style={{
              background:
                'rgba(255,255,255,0.15)',
            }}
          >
            <div
              ref={barRef}
              className="h-full rounded-full"
              style={{
                background:
                  'linear-gradient(to right, #FDCF09, #F69822)',

                transformOrigin:
                  'left center',

                transform:
                  'scaleX(0)',
              }}
            />
          </div>

          {/* Dots */}
          <div
            className="flex items-center gap-[6px]"
            role="tablist"
            aria-label="Slides"
          >
            {SLIDES.map(
              (s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={
                    i === idx
                  }
                  aria-label={`Slide ${i + 1
                    }: ${s.label}`}
                  onClick={() =>
                    navigate(i)
                  }
                  className="rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  style={{
                    width:
                      i === idx
                        ? '24px'
                        : '6px',

                    height:
                      '6px',

                    background:
                      i === idx
                        ? 'linear-gradient(to right, #FDCF09, #F69822)'
                        : 'rgba(255,255,255,0.25)',
                  }}
                />
              )
            )}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {(
              [
                'prev',
                'next',
              ] as const
            ).map(
              (dir) => (
                <button
                  key={dir}
                  onClick={() =>
                    navigate(
                      dir ===
                        'prev'
                        ? idx - 1
                        : idx + 1
                    )
                  }
                  aria-label={
                    dir ===
                      'prev'
                      ? 'Previous slide'
                      : 'Next slide'
                  }
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center text-white transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  style={{
                    borderColor:
                      'rgba(255,255,255,0.2)',

                    background:
                      'rgba(0,0,0,0.4)',

                    backdropFilter:
                      'blur(10px)',
                  }}
                >
                  {dir ===
                    'prev' ? (
                    <ChevronLeft className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Use arrow buttons to navigate between slides. Autoplay pauses on hover.
      </p>
    </section>
  );
};