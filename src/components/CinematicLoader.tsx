import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${7 + ((index * 31) % 86)}%`,
  top: `${12 + ((index * 47) % 72)}%`,
  size: index % 5 === 0 ? 3 : 2,
}));

const hexagons = [
  { left: '12%', top: '18%', size: 42, rotate: -18 },
  { left: '78%', top: '16%', size: 54, rotate: 16 },
  { left: '7%', top: '58%', size: 32, rotate: 20 },
  { left: '87%', top: '60%', size: 36, rotate: -18 },
  { left: '24%', top: '76%', size: 28, rotate: 12 },
  { left: '70%', top: '75%', size: 30, rotate: -14 },
];

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let completed = false;
    let visibilityFallback: number | undefined;
    const finish = () => {
      if (completed) return;
      completed = true;
      onComplete();
    };

    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(loader);
      const logo = select('.cinematic-logo');
      const copy = select('.cinematic-copy');
      const progress = select('.cinematic-progress');

      // The JSX has fully visible fallbacks. These states are applied only after the DOM is mounted.
      gsap.set(select('.cinematic-glow'), { autoAlpha: 0, scale: 0.82 });
      gsap.set(select('.cinematic-particle'), { autoAlpha: 0, scale: 0.6 });
      gsap.set(select('.cinematic-hex'), { autoAlpha: 0, scale: 0.5 });
      gsap.set(logo, { autoAlpha: 0, scale: 0.78, y: 15, rotationX: 6, rotationY: -8, filter: 'blur(6px)' });
      gsap.set([copy, progress], { autoAlpha: 0, y: 7 });
      gsap.set(select('.cinematic-progress-fill'), { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(select('.cinematic-shine'), { autoAlpha: 0, xPercent: -140 });

      // A browser-timer safety net keeps the intro legible if an animation frame is delayed.
      visibilityFallback = window.setTimeout(() => {
        if (completed) return;
        gsap.set([logo, copy, progress, select('.cinematic-glow'), select('.cinematic-particle'), select('.cinematic-hex')], { autoAlpha: 1 });
        gsap.set(logo, { scale: 1, y: 0, rotationX: 0, rotationY: 0, filter: 'blur(0px)' });
        gsap.set(select('.cinematic-hex'), { scale: 1, rotation: 0 });
      }, reducedMotion ? 250 : 1250);

      const timeline = gsap.timeline();
      if (reducedMotion) {
        timeline
          .to(logo, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, 0)
          .to([copy, progress], { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.03 }, 0.18)
          .to(select('.cinematic-progress-fill'), { scaleX: 1, duration: 0.22, ease: 'power1.out' }, 0.22)
          .to(loader, { autoAlpha: 0, duration: 0.24, ease: 'power2.inOut', onComplete: finish }, 0.58);
        return;
      }

      timeline
        .to(select('.cinematic-glow'), { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, 0.1)
        .to(select('.cinematic-particle'), { autoAlpha: 0.62, scale: 1, duration: 0.5, stagger: 0.035, ease: 'power2.out' }, 0.15)
        .to(select('.cinematic-hex'), { autoAlpha: 0.92, scale: 1, rotation: 0, duration: 0.62, stagger: 0.075, ease: 'power3.out' }, 0.25)
        .to(logo, { autoAlpha: 1, scale: 1, y: 0, rotationX: 0, rotationY: 0, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out' }, 0.4)
        .to([copy, progress], { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.05, ease: 'power2.out' }, 1.02)
        .to(select('.cinematic-shine'), { autoAlpha: 0.9, duration: 0.08 }, 1.15)
        .to(select('.cinematic-shine'), { xPercent: 150, duration: 0.8, ease: 'power2.inOut' }, 1.17)
        .to(select('.cinematic-shine'), { autoAlpha: 0, duration: 0.08 }, 1.97)
        .to(select('.cinematic-progress-fill'), { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 1.2)
        .to(select('.cinematic-scene'), { scale: 1.03, duration: 0.22, ease: 'power2.inOut' }, 2.65)
        .to(loader, { autoAlpha: 0, duration: 0.35, ease: 'power2.inOut', onComplete: finish }, 2.75);

      gsap.to(select('.cinematic-particle'), { x: '+=7', y: '-=10', duration: 2.8, stagger: 0.06, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(select('.cinematic-hex'), { y: '+=3', duration: 2.3, stagger: 0.08, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.9 });
    }, loader);

    return () => {
      if (visibilityFallback !== undefined) window.clearTimeout(visibilityFallback);
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, reducedMotion]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[999999] h-[100dvh] w-screen overflow-hidden bg-[#020202]" aria-busy="true" aria-label="Loading M3 Hive">
      <div className="cinematic-glow pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,152,34,0.18)_0%,rgba(253,207,9,0.06)_36%,transparent_70%)] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        {particles.map((particle, index) => <span key={index} className="cinematic-particle absolute rounded-full bg-[#fbe176] shadow-[0_0_8px_rgba(253,207,9,0.7)]" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }} />)}
      </div>

      <div className="cinematic-scene absolute inset-0 z-[2] flex items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        <div className="relative h-[25rem] w-[min(94vw,44rem)]" style={{ transformStyle: 'preserve-3d' }}>
          {hexagons.map((hexagon, index) => <span key={index} className="cinematic-hex absolute border border-[#fdcf09]/75 bg-[#f69822]/[0.025]" style={{ left: hexagon.left, top: hexagon.top, width: hexagon.size, height: hexagon.size, clipPath: 'polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0 50%)', transform: `rotate(${hexagon.rotate}deg)` }} />)}

          <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="relative mx-auto w-fit max-w-full overflow-hidden">
              <img className="cinematic-logo mx-auto block w-[240px] max-w-[calc(100vw-48px)] select-none sm:w-[320px] md:w-[400px] lg:w-[500px] xl:w-[540px]" src="/assets/brand/m3hive-logo.png" alt="M3 Hive" draggable="false" />
              <span className="cinematic-shine pointer-events-none absolute inset-y-[-25%] left-0 z-20 w-[28%] -skew-x-12 bg-gradient-to-r from-transparent via-white/75 to-[#fbe176]/20 blur-md mix-blend-screen" />
            </div>
            <p className="cinematic-copy mt-7 mb-0 font-['Space_Grotesk'] text-[9px] font-medium uppercase tracking-[0.36em] text-[#fbe176] sm:text-[10px]">Initializing experience</p>
            <div className="cinematic-progress mx-auto mt-4 h-px w-[min(60vw,14rem)] overflow-hidden bg-white/15">
              <div className="cinematic-progress-fill h-full bg-gradient-to-r from-[#f69822] via-[#fdcf09] to-[#fbe176] shadow-[0_0_8px_rgba(253,207,9,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
