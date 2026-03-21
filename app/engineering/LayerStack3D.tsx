'use client';

import { useEffect, useRef, useState } from 'react';

// ─── 3D Exploded Layer Stack ─────────────────────────────────────────────────
// The 11 memory layers rendered as translucent glass cards in true 3D space.
// Rotates on mouse move, layers separate on hover, liquid glass core pulses inside.
// Fully responsive: adapts to mobile with touch support and scaled dimensions.

const LAYERS = [
  { num: 1, name: 'Working', color: '#ffffff', alpha: 0.12 },
  { num: 2, name: 'Episodic', color: '#3b82f6', alpha: 0.15 },
  { num: 3, name: 'Semantic', color: '#6366f1', alpha: 0.15 },
  { num: 4, name: 'Patterns', color: '#a855f7', alpha: 0.18 },
  { num: 5, name: 'Procedural', color: '#8b5cf6', alpha: 0.15 },
  { num: 6, name: 'Collective', color: '#d946ef', alpha: 0.15 },
  { num: 7, name: 'Meta', color: '#ec4899', alpha: 0.12 },
  { num: 8, name: 'Codebase', color: '#f43f5e', alpha: 0.12 },
  { num: 9, name: 'Directives', color: '#f97316', alpha: 0.15 },
  { num: 10, name: 'Conflict', color: '#f59e0b', alpha: 0.12 },
  { num: 11, name: 'Secrets', color: '#eab308', alpha: 0.15 },
];

const LAYER_DESCRIPTIONS = [
  'Active session state & real-time context window management.',
  'Complete conversation history with semantic search across past sessions.',
  'Vector embeddings powering similarity search and knowledge retrieval.',
  'Proven solutions with confidence scoring, success tracking, and auto-decay.',
  'Multi-step workflows, playbooks, and ordered pattern sequences.',
  'Cross-project shared intelligence — patterns promoted from individual use.',
  'Pattern effectiveness analytics, reinforcement tracking, and scoring.',
  'Project-specific file graphs, dependency analysis, and code understanding.',
  'MUST/NEVER/PREFER/AVOID behavioral rules that constrain AI responses.',
  'Automatic contradiction detection and resolution between directives.',
  'AES-256-GCM encrypted credential vault for API keys and secrets.',
];

// Liquid glass core animation
function GlassCore({ size }: { size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, size, size);

      // Morphing blobs
      for (let i = 0; i < 5; i++) {
        const angle = t * (0.4 + i * 0.15) + (i * Math.PI * 2) / 5;
        const r = size * 0.15 + size * 0.08 * Math.sin(t * 0.6 + i);
        const bx = cx + Math.cos(angle) * size * 0.12;
        const by = cy + Math.sin(angle) * size * 0.12;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r * 2);
        const hue = 190 + i * 30;
        grad.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.5)`);
        grad.addColorStop(0.4, `hsla(${hue + 20}, 70%, 50%, 0.2)`);
        grad.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, r * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Contrast + blur composite for glass threshold
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.3;
      ctx.filter = 'blur(6px) contrast(1.5)';
      ctx.drawImage(canvas, 0, 0, size, size);
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      // Specular highlight
      const hGrad = ctx.createRadialGradient(
        cx - size * 0.1, cy - size * 0.15, 0,
        cx - size * 0.1, cy - size * 0.15, size * 0.2
      );
      hGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
      hGrad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
      hGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, 0, size, size);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: size, height: size }}
    />
  );
}

export function LayerStack3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mouse tracking for rotation (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation({ x: y * -20, y: x * 20 });
    };

    const handleLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [isMobile]);

  // Auto-rotate when not hovered
  useEffect(() => {
    if (isHovered) return;
    let t = 0;
    const speed = isMobile ? 0.015 : 0.02;
    const xAmplitude = isMobile ? 5 : 8;
    const yAmplitude = isMobile ? 8 : 12;
    const interval = setInterval(() => {
      t += speed;
      setRotation({
        x: Math.sin(t * 0.5) * xAmplitude,
        y: Math.cos(t * 0.3) * yAmplitude,
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  // Touch support: tap to toggle layer
  const handleTap = (i: number) => {
    if (!isMobile) return;
    setActiveLayer(prev => prev === i ? null : i);
  };

  const spreadFactor = isHovered ? 1.8 : 1;

  // Responsive dimensions
  const containerW = isMobile ? 280 : 360;
  const containerH = isMobile ? 420 : 480;
  const cardW = isMobile ? 240 : 280;
  const cardSpacing = isMobile ? (isHovered ? 32 : 30) : (isHovered ? 38 : 34);
  const glassSize = isMobile ? 140 : 200;
  const zSpacing = isMobile ? 12 : 18;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
      {/* 3D Stack */}
      <div
        ref={containerRef}
        className="relative flex-shrink-0 mx-auto lg:mx-0"
        style={{
          width: containerW,
          height: containerH,
          perspective: isMobile ? '900px' : '1200px',
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Liquid glass core */}
        <GlassCore size={glassSize} />

        {/* Layer cards in 3D space */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.8s ease-out',
          }}
        >
          {LAYERS.map((layer, i) => {
            const totalLayers = LAYERS.length;
            const zOffset = (i - totalLayers / 2) * zSpacing * spreadFactor;
            const isActive = activeLayer === i;
            const yPos = i * cardSpacing;

            return (
              <div
                key={layer.num}
                className="absolute left-1/2 cursor-pointer"
                style={{
                  width: cardW,
                  marginLeft: -cardW / 2,
                  top: yPos,
                  transform: `translateZ(${zOffset}px) ${isActive ? 'scale(1.08) translateZ(30px)' : ''}`,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 20 : 10 - Math.abs(i - 5),
                }}
                onMouseEnter={() => !isMobile && setActiveLayer(i)}
                onMouseLeave={() => !isMobile && setActiveLayer(null)}
                onClick={() => handleTap(i)}
              >
                {/* Glass card */}
                <div
                  className="rounded-lg px-3 py-2 md:px-4 md:py-2.5 backdrop-blur-md border"
                  style={{
                    background: `linear-gradient(135deg, ${layer.color}${Math.round(layer.alpha * 255).toString(16).padStart(2, '0')}, rgba(255,255,255,0.03))`,
                    borderColor: isActive
                      ? `${layer.color}88`
                      : `${layer.color}33`,
                    boxShadow: isActive
                      ? `0 0 30px ${layer.color}30, inset 0 1px 0 rgba(255,255,255,0.15)`
                      : `inset 0 1px 0 rgba(255,255,255,0.08)`,
                  }}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    {/* Layer number badge */}
                    <div
                      className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center text-[10px] md:text-xs font-bold"
                      style={{
                        background: `${layer.color}25`,
                        color: layer.color,
                        textShadow: isActive ? `0 0 8px ${layer.color}` : 'none',
                      }}
                    >
                      {layer.num}
                    </div>
                    <span
                      className="font-semibold text-xs md:text-sm"
                      style={{
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                      }}
                    >
                      {layer.name}
                    </span>

                    {/* Glass shine line */}
                    <div className="flex-1" />
                    <div
                      className="w-6 md:w-8 h-px rounded-full"
                      style={{
                        background: `linear-gradient(to right, transparent, ${layer.color}40, transparent)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,217,255,0.06) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Legend / Description */}
      <div className="flex-1 max-w-lg space-y-4 px-4 lg:px-0">
        <p className="text-white/60 text-sm leading-relaxed text-center lg:text-left">
          Each layer is an independent, addressable memory system.
          Agents search, write, and reason across all 11 layers via a single MCP tool call.
        </p>

        {/* Active layer detail */}
        <div
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 min-h-[100px] md:min-h-[120px] transition-all duration-300"
          style={{
            borderColor: activeLayer !== null ? `${LAYERS[activeLayer].color}40` : undefined,
          }}
        >
          {activeLayer !== null ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: LAYERS[activeLayer].color }}
                />
                <span className="text-sm font-semibold text-white">
                  L{LAYERS[activeLayer].num}: {LAYERS[activeLayer].name}
                </span>
              </div>
              <p className="text-xs text-white/50">
                {LAYER_DESCRIPTIONS[activeLayer]}
              </p>
            </>
          ) : (
            <p className="text-xs text-white/30 italic">
              {isMobile ? 'Tap a layer to explore its purpose' : 'Hover over a layer to explore its purpose'}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-white/30">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>{isMobile ? 'Interactive — tap layers to explore' : 'Interactive — move your mouse over the stack'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
