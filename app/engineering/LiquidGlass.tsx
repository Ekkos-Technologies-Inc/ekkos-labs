'use client';

import { useEffect, useRef } from 'react';

// ─── Metaball/Liquid Glass Animation ─────────────────────────────────────────
// Renders an animated liquid glass orb using 2D canvas with metaball physics,
// chromatic aberration, and glass-like refraction effects.

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function LiquidGlass({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Create metaballs — fewer, larger for glass orb feel
    const balls: Ball[] = [];
    const numBalls = 6;
    const cx = W / 2;
    const cy = H / 2;
    const spread = Math.min(W, H) * 0.2;

    for (let i = 0; i < numBalls; i++) {
      const angle = (i / numBalls) * Math.PI * 2;
      balls.push({
        x: cx + Math.cos(angle) * spread * 0.5,
        y: cy + Math.sin(angle) * spread * 0.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: 40 + Math.random() * 30,
      });
    }

    // Off-screen canvas for the metaball field
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d')!;

    let time = 0;

    const draw = () => {
      time += 0.005;

      // Sync off-screen size
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const dpr = canvas.width / W;
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Update ball positions — orbit + drift
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const angle = time * (0.3 + i * 0.1) + (i * Math.PI * 2) / numBalls;
        const orbitR = spread * (0.3 + 0.2 * Math.sin(time * 0.7 + i));
        b.x = cx + Math.cos(angle) * orbitR + Math.sin(time * 0.5 + i * 2) * 15;
        b.y = cy + Math.sin(angle) * orbitR + Math.cos(time * 0.4 + i * 3) * 15;
        b.r = 35 + 15 * Math.sin(time * 0.8 + i * 1.5);
      }

      // ─── Draw metaball field ───────────────────────────────────────
      offCtx.clearRect(0, 0, W, H);

      // Use radial gradients per ball for smooth field
      for (const b of balls) {
        const grad = offCtx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2.5);
        grad.addColorStop(0, 'rgba(0, 217, 255, 0.6)');    // primary cyan
        grad.addColorStop(0.3, 'rgba(99, 102, 241, 0.3)');  // secondary indigo
        grad.addColorStop(0.6, 'rgba(16, 185, 129, 0.1)');  // accent green
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(b.x, b.y, b.r * 2.5, 0, Math.PI * 2);
        offCtx.fill();
      }

      // ─── Main canvas compositing ──────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // Layer 1: Soft glow backdrop
      ctx.globalAlpha = 0.4;
      ctx.filter = 'blur(40px)';
      ctx.drawImage(offCanvas, 0, 0, W, H);
      ctx.filter = 'none';

      // Layer 2: Sharper core with glass threshold
      ctx.globalAlpha = 0.7;
      ctx.filter = 'blur(8px) contrast(1.8) brightness(1.2)';
      ctx.drawImage(offCanvas, 0, 0, W, H);
      ctx.filter = 'none';

      // Layer 3: Chromatic aberration — offset RGB channels
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.15;

      // Red shift
      ctx.filter = 'blur(4px) hue-rotate(-30deg)';
      ctx.drawImage(offCanvas, -2, -1, W, H);

      // Blue shift
      ctx.filter = 'blur(4px) hue-rotate(30deg)';
      ctx.drawImage(offCanvas, 2, 1, W, H);

      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';

      // Layer 4: Specular highlights — bright spots on glass surface
      ctx.globalAlpha = 0.25;
      for (const b of balls) {
        const highlightX = b.x - b.r * 0.3;
        const highlightY = b.y - b.r * 0.3;
        const grad = ctx.createRadialGradient(
          highlightX, highlightY, 0,
          highlightX, highlightY, b.r * 0.6
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(highlightX, highlightY, b.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer 5: Center glow pulse
      ctx.globalAlpha = 0.1 + 0.05 * Math.sin(time * 2);
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, spread * 1.5);
      centerGrad.addColorStop(0, 'rgba(0, 217, 255, 0.4)');
      centerGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.1)');
      centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
