'use client';

import { clsx } from 'clsx';

interface CodeWindowProps {
  children: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeWindow({
  children,
  language = 'typescript',
  filename,
  className
}: CodeWindowProps) {
  return (
    <div className={clsx(
      "rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden",
      className
    )}>
      {/* Window header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {filename && (
          <span className="ml-2 text-xs text-white/50 font-mono">{filename}</span>
        )}
        {language && !filename && (
          <span className="ml-2 text-xs text-white/50 font-mono">{language}</span>
        )}
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-white/90">
        <code>{children}</code>
      </pre>
    </div>
  );
}

interface ComparisonCodeProps {
  leftCode: string;
  rightCode: string;
  leftTitle: string;
  rightTitle: string;
  leftBadge?: string;
  rightBadge?: string;
  leftVariant?: 'negative' | 'neutral';
  rightVariant?: 'positive' | 'neutral';
}

export function ComparisonCode({
  leftCode,
  rightCode,
  leftTitle,
  rightTitle,
  leftBadge,
  rightBadge,
  leftVariant = 'negative',
  rightVariant = 'positive',
}: ComparisonCodeProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left (negative/old) */}
      <div className={clsx(
        "rounded-2xl p-6 border",
        leftVariant === 'negative'
          ? "bg-red-900/20 border-red-500/30"
          : "bg-white/5 border-white/10"
      )}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={clsx(
            "text-xl font-bold",
            leftVariant === 'negative' ? "text-red-400" : "text-white"
          )}>
            {leftVariant === 'negative' ? '❌ ' : ''}{leftTitle}
          </h3>
          {leftBadge && (
            <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
              {leftBadge}
            </span>
          )}
        </div>
        <CodeWindow>{leftCode}</CodeWindow>
      </div>

      {/* Right (positive/new) */}
      <div className={clsx(
        "rounded-2xl p-6 border",
        rightVariant === 'positive'
          ? "bg-green-900/20 border-green-500/30"
          : "bg-white/5 border-white/10"
      )}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={clsx(
            "text-xl font-bold",
            rightVariant === 'positive' ? "text-green-400" : "text-white"
          )}>
            {rightVariant === 'positive' ? '✅ ' : ''}{rightTitle}
          </h3>
          {rightBadge && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
              {rightBadge}
            </span>
          )}
        </div>
        <CodeWindow>{rightCode}</CodeWindow>
      </div>
    </div>
  );
}
