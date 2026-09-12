import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ApproachSubpageAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very slow floating for nodes
      gsap.to('.approach-node', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        duration: 'random(8, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 1,
          from: 'random',
        },
      });

      // Subtle breathing for lines
      gsap.to('.approach-line', {
        opacity: 0.15,
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });

      // Slow background glow breathing
      gsap.to('.approach-glow', {
        scale: 1.1,
        opacity: 0.08,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Floating particles
      gsap.to('.approach-particle', {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        opacity: 'random(0.1, 0.4)',
        duration: 'random(6, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    // Subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // very subtle
      const y = (e.clientY / innerHeight - 0.5) * 20;
      
      gsap.to('.parallax-layer-1', { x: x * 0.5, y: y * 0.5, duration: 1.5, ease: 'power2.out' });
      gsap.to('.parallax-layer-2', { x: x * 1, y: y * 1, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
      {/* Background soft glow */}
      <div className="approach-glow absolute top-[25%] left-[60%] w-[400px] h-[400px] bg-hive-yellow/10 rounded-full blur-[100px] parallax-layer-1 opacity-5" />
      <div className="approach-glow absolute top-[45%] left-[35%] w-[350px] h-[350px] bg-white/10 rounded-full blur-[90px] parallax-layer-1 opacity-5" />

      {/* SVG Network */}
      <svg className="absolute inset-0 w-full h-full parallax-layer-2" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ultra thin connections */}
        <path d="M600,200 L800,250" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" className="approach-line" />
        <path d="M800,250 L750,400" fill="none" stroke="#FDCF09" strokeWidth="0.5" opacity="0.2" className="approach-line" />
        <path d="M600,200 L750,400" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" className="approach-line" />
        <path d="M750,400 L950,300" fill="none" stroke="#FDCF09" strokeWidth="0.5" opacity="0.2" className="approach-line" />
        <path d="M800,250 L950,300" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" className="approach-line" />

        {/* Minimal Nodes (4 points) */}
        {[
          [600, 200, '#ffffff'], 
          [800, 250, '#FDCF09'], 
          [750, 400, '#ffffff'], 
          [950, 300, '#FDCF09']
        ].map(([cx, cy, color], i) => (
          <g key={i} className="approach-node">
            <circle cx={cx} cy={cy} r="3" fill={color as string} filter="url(#softGlow)" opacity="0.8" />
            <circle cx={cx} cy={cy} r="12" fill="none" stroke={color as string} strokeWidth="0.5" opacity="0.15" />
          </g>
        ))}
      </svg>

      {/* Few subtle particles */}
      <div className="absolute inset-0 parallax-layer-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="approach-particle absolute rounded-full bg-white blur-[1px]"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};
