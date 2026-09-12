import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ComplianceSubpageAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very slow floating for nodes
      gsap.to('.compliance-node', {
        y: 'random(-15, 15)',
        x: 'random(-15, 15)',
        duration: 'random(9, 14)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 1.5,
          from: 'random',
        },
      });

      // Subtle breathing for lines
      gsap.to('.compliance-line', {
        opacity: 0.2,
        duration: 'random(5, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.7,
      });

      // Slow background glow breathing
      gsap.to('.compliance-glow', {
        scale: 1.05,
        opacity: 0.05,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Gentle scanning light line
      gsap.to('.compliance-scanner', {
        y: 300,
        opacity: 0.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, containerRef);

    // Subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15; // very subtle
      const y = (e.clientY / innerHeight - 0.5) * 15;
      
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
      <div className="compliance-glow absolute top-[30%] left-[55%] w-[450px] h-[450px] bg-hive-yellow/10 rounded-full blur-[120px] parallax-layer-1 opacity-5" />

      {/* SVG Network */}
      <svg className="absolute inset-0 w-full h-full parallax-layer-2" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="softGlowComp" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Minimal geometric frame */}
        <rect x="550" y="150" width="350" height="200" fill="none" stroke="#FDCF09" strokeWidth="0.5" opacity="0.05" />
        <rect x="580" y="170" width="290" height="160" fill="none" stroke="#F28C28" strokeWidth="0.5" opacity="0.03" />

        {/* Ultra thin connections */}
        <path d="M550,150 L650,250" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" className="compliance-line" />
        <path d="M650,250 L900,150" fill="none" stroke="#FDCF09" strokeWidth="0.5" opacity="0.2" className="compliance-line" />
        <path d="M650,250 L750,350" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" className="compliance-line" />
        <path d="M750,350 L900,150" fill="none" stroke="#FDCF09" strokeWidth="0.5" opacity="0.2" className="compliance-line" />

        {/* Minimal Nodes (4 points) */}
        {[
          [550, 150, '#ffffff'], 
          [650, 250, '#FDCF09'], 
          [900, 150, '#ffffff'], 
          [750, 350, '#FDCF09']
        ].map(([cx, cy, color], i) => (
          <g key={i} className="compliance-node">
            <rect x={Number(cx)-2.5} y={Number(cy)-2.5} width="5" height="5" fill={color as string} transform={`rotate(45 ${cx} ${cy})`} filter="url(#softGlowComp)" opacity="0.8" />
            <circle cx={Number(cx)} cy={Number(cy)} r="12" fill="none" stroke={color as string} strokeWidth="0.5" opacity="0.1" />
          </g>
        ))}

        {/* Minimal scanning line */}
        <line x1="500" y1="100" x2="950" y2="100" stroke="#FDCF09" strokeWidth="1" opacity="0.05" className="compliance-scanner" />
      </svg>
    </div>
  );
};
