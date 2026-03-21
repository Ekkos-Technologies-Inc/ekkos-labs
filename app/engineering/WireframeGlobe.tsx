'use client';

import { useEffect, useRef } from 'react';

// ─── Wireframe Globe ─────────────────────────────────────────────────────────
// A rotating 3D wireframe sphere rendered in 2D canvas. Represents the
// architecture layers / global memory network. Pure math, no Three.js.

export function WireframeGlobe({
  className = '',
  color = '0, 217, 255',
  size = 300,
  rings = 12,
  meridians = 16,
}: {
  className?: string;
  color?: string;
  size?: number;
  rings?: number;
  meridians?: number;
}) {
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
    const radius = size * 0.38;
    let rotY = 0;
    let rotX = 0.3;

    // Project 3D point to 2D
    const project = (x: number, y: number, z: number): [number, number, number] => {
      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective
      const scale = 300 / (300 + z2);
      return [cx + x1 * scale, cy + y1 * scale, z2];
    };

    const draw = () => {
      rotY += 0.003;
      ctx.clearRect(0, 0, size, size);

      // Draw latitude rings
      for (let i = 0; i <= rings; i++) {
        const phi = (i / rings) * Math.PI;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 64; j++) {
          const theta = (j / 64) * Math.PI * 2;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          const [px, py, pz] = project(x, y, z);
          const alpha = 0.1 + 0.2 * ((pz + radius) / (radius * 2));
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        }
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw meridian lines
      for (let i = 0; i < meridians; i++) {
        const theta = (i / meridians) * Math.PI * 2;
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 64; j++) {
          const phi = (j / 64) * Math.PI;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          const [px, py, pz] = project(x, y, z);
          const alpha = 0.1 + 0.2 * ((pz + radius) / (radius * 2));
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        }
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Bright dots at intersections (front-facing only)
      for (let i = 0; i <= rings; i++) {
        const phi = (i / rings) * Math.PI;
        for (let j = 0; j < meridians; j++) {
          const theta = (j / meridians) * Math.PI * 2;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          const [px, py, pz] = project(x, y, z);
          if (pz > 0) {
            const alpha = 0.3 + 0.5 * (pz / radius);
            ctx.fillStyle = `rgba(${color}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Center glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.8);
      grad.addColorStop(0, `rgba(${color}, 0.05)`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [color, size, rings, meridians]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
