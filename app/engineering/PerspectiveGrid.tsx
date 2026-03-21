'use client';

import { useEffect, useRef } from 'react';

// ─── Perspective Grid ────────────────────────────────────────────────────────
// An animated vanishing-point grid that scrolls forward, creating a Tron-like
// depth effect. Used as section backgrounds.

export function PerspectiveGrid({
  className = '',
  color = '0, 217, 255',
  speed = 0.5,
  gridSize = 40,
}: {
  className?: string;
  color?: string;
  speed?: number;
  gridSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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

    let offset = 0;

    const draw = () => {
      offset = (offset + speed) % gridSize;
      ctx.clearRect(0, 0, W, H);

      const vanishX = W / 2;
      const vanishY = H * 0.3;
      const groundY = H;

      // Horizontal lines (perspective depth)
      const numHLines = 20;
      for (let i = 0; i < numHLines; i++) {
        const t = (i + offset / gridSize) / numHLines;
        const y = vanishY + (groundY - vanishY) * Math.pow(t, 1.5);
        const alpha = Math.pow(t, 2) * 0.25;

        // Calculate line width based on perspective
        const spread = (y - vanishY) / (groundY - vanishY);
        const x1 = vanishX - W * 0.8 * spread;
        const x2 = vanishX + W * 0.8 * spread;

        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }

      // Vertical lines (converging to vanish point)
      const numVLines = 16;
      for (let i = -numVLines / 2; i <= numVLines / 2; i++) {
        const xBottom = vanishX + i * gridSize * 2;
        const alpha = 0.15 * (1 - Math.abs(i) / (numVLines / 2));

        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(xBottom, groundY);
        ctx.stroke();
      }

      // Glow at vanish point
      const grad = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, 80);
      grad.addColorStop(0, `rgba(${color}, 0.1)`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(vanishX - 80, vanishY - 80, 160, 160);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color, speed, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
