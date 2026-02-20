'use client';

import { useEffect, useRef } from 'react';

// ─── Particle Network ────────────────────────────────────────────────────────
// Floating nodes with connecting lines. Creates a neural-network / constellation
// aesthetic. Responds to section visibility.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function ParticleNetwork({
  className = '',
  color = '0, 217, 255',
  particleCount = 40,
  connectionDistance = 120,
}: {
  className?: string;
  color?: string;
  particleCount?: number;
  connectionDistance?: number;
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

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (W || 800),
        y: Math.random() * (H || 600),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 1.5 + Math.random() * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `rgba(${color}, 0.15)`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color, particleCount, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
