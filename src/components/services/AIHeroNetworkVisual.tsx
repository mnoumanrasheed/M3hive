import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Code2,
  Network,
  Sparkles,
  MessageCircle,
  GitBranch,
  ShieldCheck,
} from 'lucide-react';

export interface AIHeroNetworkVisualProps {
  title: string;
  serviceId?: string;
}

interface ServiceConfig {
  Icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  labels: string[];
  accentHex: string;
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'ai-enabled-engineering': { Icon: Code2, labels: ['CODE', 'DOCS', 'QA', 'SECURITY'], accentHex: '#FDCF09' },
  'agentic-ai': { Icon: Network, labels: ['PLAN', 'REASON', 'ACT', 'ADAPT'], accentHex: '#FDCF09' },
  'generative-ai': { Icon: Sparkles, labels: ['TEXT', 'IMAGE', 'CODE', 'KNOWLEDGE'], accentHex: '#F69822' },
  'conversational-ai': { Icon: MessageCircle, labels: ['VOICE', 'CHAT', 'INTENT', 'CONTEXT'], accentHex: '#FDCF09' },
  'mlops': { Icon: GitBranch, labels: ['DEPLOY', 'MONITOR', 'TRAIN', 'VERSION'], accentHex: '#F69822' },
  'responsible-ai': { Icon: ShieldCheck, labels: ['BIAS', 'SECURITY', 'GOVERNANCE', 'EXPLAIN'], accentHex: '#FDCF09' },
};

const DEFAULT_CONFIG: ServiceConfig = {
  Icon: Sparkles,
  labels: ['DATA', 'MODEL', 'DEPLOY', 'SCALE'],
  accentHex: '#FDCF09',
};

// ─── SVG layout ─────────────────────────────────────────────────────
// viewBox "-24 0 328 222"  (wider than 0-280 to give edge breathing room)
// Network centre: CX=140, CY=108
// All nodes sit in y: 22–182 leaving bottom ~40px as a clear buffer
// ────────────────────────────────────────────────────────────────────
const CX = 140;
const CY = 108;

// dir: direction hint for label placement
//   't'=top  'r'=right  'b'=bottom  'l'=left
// lbl: index into labels[] or null
// maxDY: max vertical GSAP float to keep bottom nodes out of title zone
const NODES = [
  { id: 'n0', x: 140, y: 22, r: 6.5, op: 0.85, lbl: 0, dir: 't', maxDY: 3 },
  { id: 'n1', x: 212, y: 54, r: 5, op: 0.70, lbl: null, dir: 'r', maxDY: 4 },
  { id: 'n2', x: 230, y: 116, r: 7.5, op: 0.80, lbl: 1, dir: 'r', maxDY: 4 },
  { id: 'n3', x: 198, y: 176, r: 4.5, op: 0.55, lbl: null, dir: 'b', maxDY: 2 },
  { id: 'n4', x: 140, y: 182, r: 6, op: 0.80, lbl: 2, dir: 'b', maxDY: 2 },
  { id: 'n5', x: 82, y: 176, r: 4.5, op: 0.55, lbl: null, dir: 'b', maxDY: 2 },
  { id: 'n6', x: 50, y: 116, r: 7.5, op: 0.80, lbl: 3, dir: 'l', maxDY: 4 },
  { id: 'n7', x: 68, y: 54, r: 5, op: 0.70, lbl: null, dir: 'l', maxDY: 4 },
  { id: 'n8', x: 182, y: 80, r: 4, op: 0.50, lbl: null, dir: 'r', maxDY: 3 },
  { id: 'n9', x: 100, y: 144, r: 4, op: 0.50, lbl: null, dir: 'l', maxDY: 2 },
] as const;

const LINES = [
  { f: 'center', t: 'n0', p: 0.48 },
  { f: 'center', t: 'n2', p: 0.54 },
  { f: 'center', t: 'n4', p: 0.48 },
  { f: 'center', t: 'n6', p: 0.54 },
  { f: 'center', t: 'n8', p: 0.36 },
  { f: 'center', t: 'n9', p: 0.36 },
  { f: 'n0', t: 'n1', p: 0.20 },
  { f: 'n1', t: 'n2', p: 0.20 },
  { f: 'n2', t: 'n3', p: 0.18 },
  { f: 'n3', t: 'n4', p: 0.18 },
  { f: 'n4', t: 'n5', p: 0.20 },
  { f: 'n5', t: 'n6', p: 0.20 },
  { f: 'n6', t: 'n7', p: 0.18 },
  { f: 'n7', t: 'n0', p: 0.18 },
  { f: 'n8', t: 'n1', p: 0.14 },
  { f: 'n9', t: 'n5', p: 0.14 },
] as const;

const SIGNAL_LINE_INDICES = [0, 1, 2, 3] as const;

// Label color constants
const LABEL_COLOR_PRIMARY = '#E7C46A';  // warm gold
const LABEL_COLOR_SECONDARY = '#F69822';  // amber — used for alternate labels

function getPos(id: string): { x: number; y: number } {
  if (id === 'center') return { x: CX, y: CY };
  const n = NODES.find((nd) => nd.id === id);
  return n ? { x: n.x, y: n.y } : { x: CX, y: CY };
}

// Compute direction-aware label anchor position
// Returns { lx, ly, anchor } — anchor is SVG textAnchor
function labelPos(
  nodeX: number, nodeY: number, nodeR: number,
  dir: 't' | 'r' | 'b' | 'l',
): { lx: number; ly: number; anchor: "start" | "middle" | "end" | "inherit"; baseline: "auto" | "hanging" | "middle" } {
  const GAP = nodeR + 18; // more breathing room between node and label
  switch (dir) {
    case 't': return { lx: nodeX, ly: nodeY - GAP, anchor: 'middle', baseline: 'auto' };
    case 'b': return { lx: nodeX, ly: nodeY + GAP, anchor: 'middle', baseline: 'hanging' };
    case 'r': return { lx: nodeX + GAP, ly: nodeY, anchor: 'start', baseline: 'middle' };
    case 'l': return { lx: nodeX - GAP, ly: nodeY, anchor: 'end', baseline: 'middle' };
    default: return { lx: nodeX, ly: nodeY - GAP, anchor: 'middle', baseline: 'auto' };
  }
}

// ─── Component ───────────────────────────────────────────────────────
export const AIHeroNetworkVisual: React.FC<AIHeroNetworkVisualProps> = ({
  title,
  serviceId = '',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const coreGrp = useRef<SVGGElement>(null);
  const nodeEls = useRef<(SVGCircleElement | null)[]>([]);
  const lineEls = useRef<(SVGLineElement | null)[]>([]);

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const cfg = SERVICE_CONFIGS[serviceId] ?? DEFAULT_CONFIG;
  const { Icon, labels, accentHex } = cfg;

  // ── GSAP animations ─────────────────────────────────────────────
  useLayoutEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Counter-rotating rings
      gsap.to('#ai-ring-inner', {
        rotation: 360, duration: 18, ease: 'none', repeat: -1,
        transformOrigin: `${CX}px ${CY}px`,
      });
      gsap.to('#ai-ring-outer', {
        rotation: -360, duration: 26, ease: 'none', repeat: -1,
        transformOrigin: `${CX}px ${CY}px`,
      });

      // Central core breathe
      gsap.to('#ai-core-group', {
        scale: 1.04, duration: 3.2, ease: 'sine.inOut',
        repeat: -1, yoyo: true,
        transformOrigin: `${CX}px ${CY}px`,
      });

      // Per-node float — clamped DY for bottom nodes
      NODES.forEach((node, i) => {
        const el = nodeEls.current[i];
        if (!el) return;
        gsap.to(el, {
          attr: {
            cx: node.x + gsap.utils.random(-4, 4),
            cy: node.y + gsap.utils.random(-node.maxDY, node.maxDY),
          },
          duration: gsap.utils.random(3.5, 6.5),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.38,
        });
      });

      // Line opacity pulse
      lineEls.current.forEach((el, i) => {
        if (!el) return;
        const base = LINES[i]?.p ?? 0.2;
        gsap.to(el, {
          strokeOpacity: Math.min(base + 0.26, 0.70),
          duration: gsap.utils.random(2.5, 4.8),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.33,
        });
      });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, prefersReduced]);

  // ── Mouse parallax (desktop only) ───────────────────────────────
  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window) return;

    const svg = svgRef.current;
    if (!svg) return;

    let raf = 0;
    let tx = 0, ty = 0, lcx = 0, lcy = 0;

    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 7;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 7;
    };

    const tick = () => {
      lcx += (tx - lcx) * 0.06;
      lcy += (ty - lcy) * 0.06;
      if (coreGrp.current) {
        gsap.set(coreGrp.current, { x: lcx * 0.4, y: lcy * 0.4 });
      }
      raf = requestAnimationFrame(tick);
    };

    const panel = rootRef.current;
    panel?.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      panel?.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, prefersReduced]);

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative w-full max-w-[420px] mx-auto select-none flex flex-col lg:-top-8"
      style={{ aspectRatio: '1 / 1' }}
    >
      {/* Glass background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'rgba(10,10,15,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 12px 48px 0 rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.07)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      {/* Radial accent glow — very subtle */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 38%, ${accentHex}12 0%, transparent 62%)`,
        }}
      />

      {/* ── NETWORK ZONE (flex-1 → ~78% height) ───────────────── */}
      <div className="relative flex-1 min-h-0 w-full px-2 pt-3">
        <svg
          ref={svgRef}
          viewBox="-34 0 348 222"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="ai-core-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ai-node-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ai-signal-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Label text shadow filter */}
            <filter id="ai-label-shadow" x="-20%" y="-40%" width="140%" height="180%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* ── Rotating rings ───────────────────────────────── */}
          <circle id="ai-ring-outer" cx={CX} cy={CY} r={48}
            fill="none" stroke="white" strokeWidth="0.65"
            strokeOpacity="0.08" strokeDasharray="4 9"
          />
          <circle id="ai-ring-inner" cx={CX} cy={CY} r={34}
            fill="none" stroke={accentHex} strokeWidth="0.55"
            strokeOpacity="0.16" strokeDasharray="2 10"
          />

          {/* ── Connecting lines ─────────────────────────────── */}
          {LINES.map((line, i) => {
            const from = getPos(line.f as string);
            const to = getPos(line.t as string);
            return (
              <line
                key={`l${i}`}
                ref={(el) => { lineEls.current[i] = el; }}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={line.p > 0.4 ? accentHex : 'rgba(255,255,255,0.6)'}
                strokeWidth={line.p > 0.4 ? 0.85 : 0.55}
                strokeOpacity={line.p}
              />
            );
          })}

          {/* ── Signal dots ──────────────────────────────────── */}
          {SIGNAL_LINE_INDICES.map((li, i) => {
            const line = LINES[li];
            const from = getPos(line.f as string);
            const to = getPos(line.t as string);
            const rev = i % 2 === 1;
            const ax = rev ? to.x : from.x;
            const ay = rev ? to.y : from.y;
            const bx = rev ? from.x : to.x;
            const by = rev ? from.y : to.y;
            const dur = (2.8 + i * 0.9).toFixed(1);
            return (
              <circle key={`sig${i}`} r={2.0} fill={accentHex} filter="url(#ai-signal-glow)">
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${(i * 0.7).toFixed(2)}s`}
                  path={`M${ax},${ay} L${bx},${by}`}
                />
              </circle>
            );
          })}

          {/* ── Nodes ────────────────────────────────────────── */}
          {NODES.map((node, i) => {
            const lbl = node.lbl !== null ? (labels[node.lbl as number] ?? null) : null;
            const { lx, ly, anchor, baseline } = labelPos(node.x, node.y, node.r, node.dir);

            // Alternate between primary and secondary gold for visual rhythm
            const lblColor = (node.lbl !== null && (node.lbl as number) % 2 === 0)
              ? LABEL_COLOR_PRIMARY
              : LABEL_COLOR_SECONDARY;

            return (
              <g key={node.id}>
                {/* Halo glow */}
                <circle cx={node.x} cy={node.y} r={node.r + 4}
                  fill={accentHex} fillOpacity="0.04"
                />
                {/* Node dot */}
                <circle
                  ref={(el) => { nodeEls.current[i] = el; }}
                  cx={node.x} cy={node.y} r={node.r}
                  fill="white" fillOpacity={node.op * 0.22}
                  stroke={accentHex} strokeWidth="0.7"
                  strokeOpacity={node.op * 0.50}
                  filter="url(#ai-node-glow)"
                />
                {/* Direction-aware label with gold color + shadow */}
                {lbl && (
                  <text
                    x={lx} y={ly}
                    textAnchor={anchor}
                    dominantBaseline={baseline}
                    fontSize="7.4"
                    fontFamily="monospace"
                    fontWeight="700"
                    fill={lblColor}
                    fillOpacity="0.96"
                    letterSpacing="0.08em"
                    filter="url(#ai-label-shadow)"
                  >
                    {lbl}
                  </text>
                )}
              </g>
            );
          })}

          {/* ── Central AI core ──────────────────────────────── */}
          <g id="ai-core-group" ref={coreGrp}>
            {/* Outer glow ring */}
            <circle cx={CX} cy={CY} r={29}
              fill="none" stroke={accentHex} strokeWidth="0.75"
              strokeOpacity="0.20" filter="url(#ai-core-glow)"
            />
            {/* Background disc */}
            <circle cx={CX} cy={CY} r={23}
              fill={accentHex} fillOpacity="0.09"
              stroke={accentHex} strokeWidth="1.1"
              strokeOpacity="0.42" filter="url(#ai-core-glow)"
            />
            {/* Lucide icon */}
            <foreignObject x={CX - 12} y={CY - 12} width={24} height={24}>
              <div
                style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Icon style={{ width: '100%', height: '100%', color: accentHex, opacity: 0.90 }} />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>

      {/* ── TITLE ZONE (~22% height) — always below SVG ─────────── */}
      <div
        className="relative w-full flex flex-col items-center justify-center pb-5 pt-2 px-5 shrink-0"
        style={{ height: '22%' }}
      >
        {/* Separator line */}
        <div
          className="absolute top-0 left-10 right-10 h-px opacity-30"
          style={{ background: `linear-gradient(to right, transparent, ${accentHex}, transparent)` }}
        />
        {/* Eyebrow */}
        <p
          className="font-heading font-bold tracking-[0.22em] uppercase mb-1"
          style={{ fontSize: '9px', color: '#E7C46A', opacity: 0.75 }}
        >
          M3 HIVE AI
        </p>
        {/* Service title */}
        <p
          className="font-heading font-semibold leading-snug text-center"
          style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)' }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};