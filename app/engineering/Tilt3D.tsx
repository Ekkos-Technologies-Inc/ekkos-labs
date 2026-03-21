'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────
// Adds interactive perspective tilt on mouse hover. GPU-accelerated via
// CSS transforms. Configurable intensity and glare.
// Gracefully degrades on mobile — no tilt, just content.

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;  // degrees of max tilt (default 8)
  glare?: boolean;     // show glare overlay
  scale?: number;      // hover scale (default 1.02)
}

export function Tilt3D({
  children,
  className = '',
  intensity = 8,
  glare = true,
  scale = 1.02,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * intensity * 2;
    const rotateY = (x - 0.5) * intensity * 2;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`
    );
    setGlarePos({ x: x * 100, y: y * 100, opacity: 0.15 });
  };

  const handleLeave = () => {
    if (isMobile) return;
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    setGlarePos({ x: 50, y: 50, opacity: 0 });
  };

  // On mobile, render without transform overhead
  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transform,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 60%)`,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      )}
    </div>
  );
}
