'use client';

import { useEffect, useRef } from 'react';

/**
 * Dense matrix rain that dissolves into floating 1px particle dust.
 * Amber variant for ekkOS Labs.
 */

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
const FONT_SIZE = 10;
const COL_WIDTH = 16;
const AMBER = { r: 240, g: 165, b: 0 };

interface Glyph {
  char: string;
  y: number;
  opacity: number;
  shatterAt: number;
  shattered: boolean;
}

interface Column {
  x: number;
  glyphs: Glyph[];
  speed: number;
  spawnTimer: number;
  spawnRate: number;
  baseOpacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  decay: number;
  age: number;
  wobbleOffset: number;
  wobbleSpeed: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let columns: Column[] = [];
    let particles: Particle[] = [];
    let animationId: number;

    const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
      initColumns();
    };

    const initColumns = () => {
      columns = [];
      particles = [];
      const numCols = Math.ceil(w / COL_WIDTH);

      for (let i = 0; i < numCols; i++) {
        if (Math.random() > 0.65) continue;

        columns.push({
          x: i * COL_WIDTH + (Math.random() - 0.5) * 4,
          glyphs: [],
          speed: Math.random() * 0.7 + 0.3,
          spawnTimer: Math.random() * 40,
          spawnRate: Math.random() * 20 + 10,
          baseOpacity: Math.random() * 0.08 + 0.04,
        });
      }
    };

    const spawnGlyph = (col: Column) => {
      const shatterAt = h * (Math.random() * 0.3 + 0.65);
      col.glyphs.push({
        char: randomChar(),
        y: -FONT_SIZE,
        opacity: col.baseOpacity,
        shatterAt,
        shattered: false,
      });
    };

    const shatterGlyph = (glyph: Glyph, x: number) => {
      const count = Math.floor(Math.random() * 6) + 5;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * FONT_SIZE,
          y: glyph.y + (Math.random() - 0.5) * FONT_SIZE * 0.6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.25,
          opacity: glyph.opacity * 3.5,
          decay: Math.random() * 0.00025 + 0.0001,
          age: 0,
          wobbleOffset: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.003 + 0.001,
        });
      }
    };

    let lastTime = 0;

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);

      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      ctx.clearRect(0, 0, w, h);

      ctx.font = `400 ${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';

      for (const col of columns) {
        col.spawnTimer -= dt * 0.06;
        if (col.spawnTimer <= 0) {
          spawnGlyph(col);
          col.spawnTimer = col.spawnRate;
        }

        for (let g = col.glyphs.length - 1; g >= 0; g--) {
          const glyph = col.glyphs[g];
          glyph.y += col.speed * dt * 0.06;

          if (!glyph.shattered && glyph.y >= glyph.shatterAt) {
            glyph.shattered = true;
            shatterGlyph(glyph, col.x);
            col.glyphs.splice(g, 1);
            continue;
          }

          if (glyph.y > h + FONT_SIZE) {
            col.glyphs.splice(g, 1);
            continue;
          }

          if (Math.random() < 0.005) {
            glyph.char = randomChar();
          }

          const fadeIn = Math.min(glyph.y / (h * 0.12), 1);
          const distToShatter = Math.abs(glyph.y - glyph.shatterAt);
          const shatterGlow = distToShatter < h * 0.08
            ? (1 - distToShatter / (h * 0.08)) * 0.1
            : 0;
          const finalOpacity = glyph.opacity * fadeIn + shatterGlow;

          ctx.fillStyle = `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${finalOpacity})`;
          ctx.fillText(glyph.char, col.x, glyph.y);
        }
      }

      for (let p = particles.length - 1; p >= 0; p--) {
        const pt = particles[p];
        pt.age += dt;

        const wobble = Math.sin(pt.age * pt.wobbleSpeed + pt.wobbleOffset) * 0.08;
        pt.x += (pt.vx + wobble) * dt * 0.04;
        pt.y += pt.vy * dt * 0.04;

        pt.vx *= 0.9995;
        pt.vy *= 0.9995;

        pt.opacity -= pt.decay * dt;

        if (pt.opacity <= 0 || pt.y > h + 20 || pt.y < -20) {
          particles.splice(p, 1);
          continue;
        }

        ctx.fillStyle = `rgba(${AMBER.r}, ${AMBER.g}, ${AMBER.b}, ${pt.opacity})`;
        ctx.fillRect(Math.round(pt.x), Math.round(pt.y), 1, 1);
      }
    };

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
