'use client';

interface EkkosLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function EkkosLogo({ size = 32, animated = true, className = '' }: EkkosLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Angular frame */}
      <path
        d="M10 0 L70 0 L80 10 L80 70 L70 80 L10 80 L0 70 L0 10 Z"
        stroke="#f0a500"
        strokeWidth="1.5"
        fill="#0c0c11"
      />
      {/* Corner accents */}
      <line x1="2" y1="12" x2="12" y2="2" stroke="#f0a500" strokeWidth="0.5" opacity="0.25" />
      <line x1="68" y1="2" x2="78" y2="12" stroke="#f0a500" strokeWidth="0.5" opacity="0.25" />
      <line x1="2" y1="68" x2="12" y2="78" stroke="#f0a500" strokeWidth="0.5" opacity="0.25" />
      <line x1="68" y1="78" x2="78" y2="68" stroke="#f0a500" strokeWidth="0.5" opacity="0.25" />
      {/* Grid */}
      {[16, 28, 40, 52, 64].map((y) => (
        <line key={`h${y}`} x1="16" y1={y} x2="64" y2={y} stroke="#f0a500" strokeWidth="0.5" opacity="0.12" />
      ))}
      {[16, 28, 40, 52, 64].map((x) => (
        <line key={`v${x}`} x1={x} y1="16" x2={x} y2="64" stroke="#f0a500" strokeWidth="0.5" opacity="0.12" />
      ))}
      {/* Pixel "e" — amber */}
      <rect x="17" y="17" width="10" height="10" fill="#f0a500" opacity="0.85" />
      <rect x="29" y="17" width="10" height="10" fill="#f0a500" opacity="0.85" />
      <rect x="41" y="17" width="10" height="10" fill="#f0a500" opacity="0.6" />
      <rect x="17" y="29" width="10" height="10" fill="#f0a500" opacity="0.85" />
      <rect x="17" y="41" width="10" height="10" fill="#f0a500" opacity="0.75" />
      <rect x="29" y="41" width="10" height="10" fill="#f0a500" opacity="0.75" />
      <rect x="41" y="41" width="10" height="10" fill="#f0a500" opacity="0.5" />
      <rect x="17" y="53" width="10" height="10" fill="#f0a500" opacity="0.85" />
      <rect x="29" y="53" width="10" height="10" fill="#f0a500" opacity="0.85" />
      <rect x="41" y="53" width="10" height="10" fill="#f0a500" opacity="0.6" />
      {/* Cyan cursor cell */}
      <rect x="53" y="53" width="10" height="10" fill="#00f0ff" opacity="0.9">
        {animated && (
          <animate attributeName="opacity" values="0.9;0.9;0.15;0.15" dur="1.2s" repeatCount="indefinite" />
        )}
      </rect>
    </svg>
  );
}
