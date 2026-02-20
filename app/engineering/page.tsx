'use client';

import { Badge } from '@/components/Badge';
import { CTAButton } from '@/components/CTAButton';
import { CodeWindow } from '@/components/CodeWindow';
import { PageContainer } from '@/components/PageContainer';
import { Section } from '@/components/Section';
import {
  Brain,
  Code2,
  Database,
  GitCommit,
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { LiquidGlass } from './LiquidGlass';
import { ParticleNetwork } from './ParticleNetwork';
import { PerspectiveGrid } from './PerspectiveGrid';
import { Tilt3D } from './Tilt3D';
import { LayerStack3D } from './LayerStack3D';
import { LiveDemo } from './LiveDemo';

// ─── Stat Card Component ─────────────────────────────────────────────────────
function StatCard({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  return (
    <Tilt3D intensity={10} scale={1.04} className="rounded-xl">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center h-full">
        <div className="text-4xl font-black text-primary mb-2">{value}</div>
        <div className="text-sm font-semibold text-white">{label}</div>
        {sublabel && <div className="text-xs text-white/50 mt-1">{sublabel}</div>}
      </div>
    </Tilt3D>
  );
}

// ─── Cost Bar Component ──────────────────────────────────────────────────────
function CostBar({ label, width, value, color, delay }: { label: string; width: string; value: string; color: string; delay: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-mono font-bold text-white">{value}</span>
      </div>
      <div className="h-8 rounded-lg bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-lg ${color} transition-all duration-1000 ease-out`}
          style={{ width, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

// ─── Algorithm Card Component ────────────────────────────────────────────────
function AlgorithmCard({ title, problem, solution, icon: Icon }: { title: string; problem: string; solution: string; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-primary/30 hover:bg-white/[0.07] transition-all">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-bold text-white mb-2">{title}</h4>
          <p className="text-sm text-white/50 mb-2"><span className="text-red-400 font-medium">Problem:</span> {problem}</p>
          <p className="text-sm text-white/70"><span className="text-accent font-medium">Solution:</span> {solution}</p>
        </div>
      </div>
    </div>
  );
}


export default function EngineeringPage() {
  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <Section className="bg-gradient-to-b from-black via-black to-black/95 pt-8 relative overflow-hidden">
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 pointer-events-none">
          <LiquidGlass className="opacity-60" />
        </div>

        <PageContainer>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Badge variant="primary" className="mb-4">
              Engineering Deep Dive
            </Badge>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white lg:text-6xl">
              Building the Operating System for{' '}
              <span className="text-primary">Agentic Memory</span>
            </h1>
            <p className="mb-6 text-lg md:text-xl leading-relaxed text-white/70 max-w-3xl mx-auto">
              A technical walkthrough of ekkOS — an 11-layer cognitive architecture
              that gives AI agents persistent memory, continuous learning, and
              cross-session intelligence.
            </p>

            {/* Byline */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="h-px w-8 md:w-12 bg-white/20 hidden sm:block" />
              <div className="text-xs sm:text-sm text-white/50 text-center">
                <span className="font-semibold text-white/70">Architected by Seann MacDougall</span>
                <br className="sm:hidden" />
                <span className="hidden sm:inline">{' '}<span className="text-white/30">|</span>{' '}</span>
                <span className="sm:hidden text-white/30 mx-1">—</span>
                Lead Systems Architect
                <span className="hidden sm:inline">{' '}<span className="text-white/30">|</span>{' '}</span>
                <span className="sm:hidden text-white/30 mx-1">—</span>
                February 2026
              </div>
              <div className="h-px w-8 md:w-12 bg-white/20 hidden sm:block" />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              <StatCard value="996+" label="Commits" sublabel="Solo architect" />
              <StatCard value="372" label="DB Tables" sublabel="Memory, traces, evals" />
              <StatCard value="185" label="API Functions" sublabel="TypeScript SDK" />
              <StatCard value="77%" label="Cost Reduction" sublabel="Token optimization" />
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 1. Architecture Diagram ──────────────────────────────────── */}
      <Section id="architecture" className="relative overflow-hidden">
        {/* Perspective Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <PerspectiveGrid color="99, 102, 241" speed={0.3} />
        </div>

        <PageContainer>
          <div className="relative z-10 mb-8 text-center">
            <Badge variant="primary" className="mb-4">Section 1</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              The 11-Layer Cognitive Architecture
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Most AI memory solutions are a single key-value store. ekkOS implements
              a layered architecture inspired by human cognitive science — each layer
              serves a distinct purpose in the memory lifecycle.
            </p>
          </div>

          {/* Request Flow — compact pill strip */}
          <div className="relative z-10 mx-auto max-w-4xl mb-12">
            <div className="rounded-2xl border border-primary/20 bg-black/50 backdrop-blur-sm p-5">
              <h3 className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider text-center">Request Flow</h3>
              <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 text-xs">
                {[
                  { label: 'User Input', color: 'bg-white/10 text-white' },
                  { label: 'Context Rehydration', color: 'bg-blue-500/20 text-blue-400' },
                  { label: 'Pattern Retrieval', color: 'bg-purple-500/20 text-purple-400' },
                  { label: 'Model Router', color: 'bg-primary/20 text-primary' },
                  { label: 'LLM Execution', color: 'bg-secondary/20 text-secondary' },
                  { label: 'Memory Write', color: 'bg-accent/20 text-accent' },
                  { label: 'Response', color: 'bg-white/10 text-white' },
                ].map((item, i, arr) => (
                  <span key={i} className="flex items-center gap-1.5 md:gap-2">
                    <span className={`px-2.5 py-1.5 rounded-lg font-medium ${item.color}`}>
                      {item.label}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-white/20 text-sm">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Interactive Layer Stack — the centerpiece */}
          <div className="relative z-10 mx-auto max-w-5xl">
            <LayerStack3D />
          </div>

          <div className="relative z-10 mt-10 text-center">
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              Each layer is addressable via the MCP protocol. Agents can search, write, and
              reason across all 11 layers in a single tool call. The architecture supports
              both personal (per-user) and collective (cross-user) memory scopes.
            </p>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 2. Memory & State Deep Dive ──────────────────────────────── */}
      <Section className="bg-white/[0.02]" id="memory">
        <PageContainer>
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">Section 2</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Memory & State Management
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              372 database tables handle memory, traces, embeddings, and evaluations.
              Here&apos;s how the core data model works.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Code Snippet */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Core Data Model</h3>
              <CodeWindow filename="types/memory.ts">{`// Pattern — a proven solution extracted
// from agent conversations
interface Pattern {
  id: string;
  title: string;
  problem: string;
  solution: string;
  confidence: number;    // 0.0 - 1.0
  success_rate: number;  // tracked via outcomes
  applied_count: number;
  tags: string[];
  embedding: number[];   // 1536-dim vector
  works_when: string[];
  anti_patterns: string[];
  created_at: Date;
  last_applied: Date;
}

// Active Forgetting — patterns decay
// if unused, get quarantined if failing
interface DecayConfig {
  decay_rate: number;       // 0.95 per period
  min_confidence: number;   // floor at 0.1
  quarantine_threshold: 0.3;
  promotion_threshold: 0.8;
}`}</CodeWindow>
            </div>

            {/* Right: Explanation + ERD-like visual */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">How It Connects</h3>

              {/* Simplified visual ERD */}
              <div className="rounded-xl border border-white/10 bg-black/50 p-6 space-y-4">
                {[
                  { from: 'Conversations', to: 'Episodes', relation: 'generate', color: 'border-blue-500/50' },
                  { from: 'Episodes', to: 'Patterns', relation: 'extract', color: 'border-purple-500/50' },
                  { from: 'Patterns', to: 'Outcomes', relation: 'track', color: 'border-accent/50' },
                  { from: 'Outcomes', to: 'Confidence', relation: 'adjust', color: 'border-amber-500/50' },
                  { from: 'Confidence', to: 'Retrieval', relation: 'rank', color: 'border-primary/50' },
                ].map((edge, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${edge.color} bg-white/5`}>
                    <span className="text-sm font-mono font-semibold text-white">{edge.from}</span>
                    <span className="flex-1 border-t border-dashed border-white/20 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-white/40 bg-black/80 px-2">
                        {edge.relation}
                      </span>
                    </span>
                    <span className="text-sm font-mono font-semibold text-white">{edge.to}</span>
                  </div>
                ))}
              </div>

              <CodeWindow filename="types/context.ts">{`// Semantic Rehydration — vector search
// replaces positional context lookup
interface ContextFrame {
  session_id: string;
  active_patterns: Pattern[];
  rehydrated_turns: Turn[];
  decay_rate: number;
  eviction_threshold: number;
}

// Search across evicted context using
// embedding similarity, not position
async function rehydrate(
  query: string,
  session: string
): Promise<ContextFrame> {
  const embedding = await embed(query);
  return searchEvictedContent(
    embedding, session
  );
}`}</CodeWindow>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 3. Cost & Performance Case Study ─────────────────────────── */}
      <Section id="performance">
        <PageContainer>
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">Section 3</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Cost & Performance Optimization
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              LLM API costs scale fast. ekkOS implements intelligent routing and
              cache optimization to cut token usage by 77% while maintaining quality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left: Problem / Solution */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs">!</span>
                  The Problem
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Claude Code makes 10-20+ API calls per user prompt (2-3 per tool round-trip).
                  Standard proxy pipelines inject context at varying positions, breaking
                  Anthropic&apos;s prompt cache on every call. Result: <span className="text-red-400 font-semibold">10-20x cost multiplication</span> from cache misses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-accent mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">&#10003;</span>
                  The Solution
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Designed a &quot;Cache-Preserving Passthrough&quot; algorithm that detects tool round-trips
                  and skips non-essential pipeline stages. Memory injections use Redis-cached
                  content (stable prefix = cache hit). Emergency eviction only fires at 95%
                  vs. the normal 75% threshold.
                </p>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                <p className="text-sm text-white/80">
                  <span className="text-accent font-semibold">Key insight:</span> Anthropic&apos;s prompt cache
                  gives a 90% discount on cache hits. The cache works on the exact prefix of the
                  messages array. Any content change at any position breaks the cache.
                </p>
              </div>
            </div>

            {/* Right: Cost comparison */}
            <div className="space-y-8">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6">
                  Token Usage Per Session (Relative)
                </h3>
                <div className="space-y-6">
                  <CostBar label="Standard API (no cache)" width="100%" value="$1.20 / call" color="bg-gradient-to-r from-red-500 to-red-600" delay={0} />
                  <CostBar label="ekkOS Optimized" width="23%" value="$0.28 / call" color="bg-gradient-to-r from-accent to-emerald-500" delay={300} />
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-white/50">Reduction</span>
                  <span className="text-2xl font-black text-primary">77%</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                  Eviction Cost
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">~$0.015</div>
                    <div className="text-xs text-white/50">per eviction (Gemini 2.5 Flash)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">80x ROI</div>
                    <div className="text-xs text-white/50">vs. cache miss cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 4. MCP Integration ───────────────────────────────────────── */}
      <Section className="bg-white/[0.02] relative overflow-hidden" id="mcp">
        {/* Particle Network Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <ParticleNetwork color="99, 102, 241" particleCount={35} connectionDistance={100} />
        </div>

        <PageContainer>
          <div className="relative z-10 mb-12 text-center">
            <Badge variant="secondary" className="mb-4">Section 4</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              MCP Protocol Integration
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Anthropic&apos;s Model Context Protocol (MCP) is the standard for connecting
              AI agents to external tools. ekkOS exposes all 11 memory layers as MCP tools.
            </p>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Visual */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-secondary/30 bg-black/80 backdrop-blur-sm p-6">
                <h3 className="text-sm font-semibold text-secondary mb-6 uppercase tracking-wider">
                  Agent ↔ Memory Connection
                </h3>
                <div className="space-y-3">
                  {/* IDE Layer */}
                  <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                    <div className="text-xs text-white/40 mb-2">IDE / Agent</div>
                    <div className="flex flex-wrap gap-2">
                      {['Cursor', 'Claude Code', 'VS Code', 'Windsurf'].map(ide => (
                        <span key={ide} className="px-2 py-1 rounded bg-white/10 text-xs font-medium text-white/80">{ide}</span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-gradient-to-b from-white/20 to-secondary/50" />
                  </div>

                  {/* MCP Layer */}
                  <div className="rounded-lg bg-secondary/10 p-4 border border-secondary/30">
                    <div className="text-xs text-secondary mb-2">Model Context Protocol (MCP)</div>
                    <div className="text-sm text-white/70">
                      185 RPC functions · Stdio transport · JSON-RPC 2.0
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-gradient-to-b from-secondary/50 to-primary/50" />
                  </div>

                  {/* ekkOS Layer */}
                  <div className="rounded-lg bg-primary/10 p-4 border border-primary/30">
                    <div className="text-xs text-primary mb-2">ekkOS Memory Infrastructure</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Search', 'Forge', 'Recall', 'Directives', 'Plans', 'Secrets', 'Context'].map(tool => (
                        <span key={tool} className="px-2 py-1 rounded bg-primary/10 text-primary/80 border border-primary/20">{tool}</span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-gradient-to-b from-primary/50 to-accent/50" />
                  </div>

                  {/* Storage Layer */}
                  <div className="rounded-lg bg-accent/10 p-4 border border-accent/30">
                    <div className="text-xs text-accent mb-2">Storage</div>
                    <div className="flex flex-wrap gap-2 text-xs text-white/60">
                      {['PostgreSQL', 'Redis', 'Neo4j', 'Cloudflare R2'].map(store => (
                        <span key={store} className="px-2 py-1 rounded bg-white/5">{store}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Cross-Platform Memory</h3>
              <p className="text-white/60 text-sm">
                Teach Claude something in VS Code — Cursor already knows it. All agents
                share the same memory via MCP, regardless of which IDE or tool you use.
              </p>
              <CodeWindow filename="mcp-config.json">{`{
  "mcpServers": {
    "ekkos-memory": {
      "type": "sse",
      "url": "https://mcp.ekkos.dev/sse",
      "env": {
        "EKKOS_USER_ID": "your-user-id"
      }
    }
  }
}

// One config. Every IDE connected.
// Memory persists across sessions,
// tools, and even team members.`}</CodeWindow>

              <CodeWindow filename="agent-example.ts">{`// Agent automatically searches memory
// before answering any question
const results = await ekkos.search({
  query: "supabase auth setup",
  sources: ["patterns", "episodic"]
});

// Found 3 patterns from past sessions
// Confidence: 0.94, 0.87, 0.72
// Agent applies the highest-confidence
// solution without re-deriving it.`}</CodeWindow>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 5. SDK View ──────────────────────────────────────────────── */}
      <Section id="sdk">
        <PageContainer>
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">Section 5</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Developer Experience & SDK
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              185 API functions with TypeScript types. 71 automated tests.
              Clean interfaces designed for other developers to build on.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Search & Learn in Two Calls</h3>
              <CodeWindow filename="sdk-usage.ts">{`import { EkkosClient } from '@ekkos/sdk';

const ekkos = new EkkosClient({
  transport: 'sse',
  endpoint: 'https://mcp.ekkos.dev'
});

// Search memory before answering
const context = await ekkos.search({
  query: 'deployment error on Railway',
  sources: ['patterns', 'episodic'],
  limit: 5
});

// Apply a pattern and track outcome
const app = await ekkos.track({
  pattern_id: context.patterns[0].id,
  context: { task: 'fix deployment' }
});

// Record success for reinforcement
await ekkos.outcome({
  application_id: app.id,
  success: true
});
// Pattern confidence: 0.82 → 0.86`}</CodeWindow>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Forge Solutions Automatically</h3>
              <CodeWindow filename="forge-pattern.ts">{`// When a bug is fixed, capture it
await ekkos.forge({
  title: 'Railway PM2 restart loop',
  problem:
    'PM2 workers restart endlessly ' +
    'when memory exceeds 512MB limit',
  solution:
    'Set max_memory_restart to 450MB ' +
    'with graceful shutdown handler',
  tags: ['railway', 'pm2', 'memory'],
  works_when: [
    'Node.js worker on Railway',
    'PM2 cluster mode'
  ],
  anti_patterns: [
    'Increasing memory limit only ' +
    'delays the crash'
  ]
});

// Next time any agent hits this issue,
// the solution surfaces automatically.`}</CodeWindow>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-xl font-bold text-primary">185</div>
                  <div className="text-xs text-white/50">RPC Functions</div>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-xl font-bold text-secondary">71</div>
                  <div className="text-xs text-white/50">Test Cases</div>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-xl font-bold text-accent">100%</div>
                  <div className="text-xs text-white/50">TypeScript</div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 6. Custom Algorithms ─────────────────────────────────────── */}
      <Section className="bg-white/[0.02]" id="algorithms">
        <PageContainer>
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">Section 6</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Custom Algorithms
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Four purpose-built algorithms for AI memory management. Each solves a
              specific failure mode discovered during production use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Tilt3D intensity={6} className="rounded-xl">
              <AlgorithmCard
                icon={Shield}
                title="Cache-Preserving Passthrough"
                problem="Prompt cache misses cost 10-20x on every tool round-trip due to content injection at varying positions."
                solution="Detect tool round-trips, skip non-essential pipeline stages, use Redis-cached stable prefix for cache hits."
              />
            </Tilt3D>
            <Tilt3D intensity={6} className="rounded-xl">
              <AlgorithmCard
                icon={Brain}
                title="Convergence Evaluator (Delta-Prometheus)"
                problem="No way to measure if the system was actually improving. Agents hallucinated on complex tasks with no consistency check."
                solution="Custom scoring formula that tracks pattern success rates, retrieval relevance, and error frequency over time to quantify improvement."
              />
            </Tilt3D>
            <Tilt3D intensity={6} className="rounded-xl">
              <AlgorithmCard
                icon={Sparkles}
                title="Active Forgetting Engine"
                problem="Stale patterns accumulate forever. Bad solutions never get removed. Memory becomes noisy over time."
                solution="Bio-inspired: quarantine failing patterns (<30% success), merge duplicates (>92% similarity), decay unused patterns, promote winners to collective."
              />
            </Tilt3D>
            <Tilt3D intensity={6} className="rounded-xl">
              <AlgorithmCard
                icon={Zap}
                title="Semantic Rehydration"
                problem="After context eviction, positional lookup (last 5 turns) misses relevant history that appeared earlier in conversation."
                solution="Replace positional lookup with vector similarity search across ALL evicted content. Always-on, not triggered by keywords."
              />
            </Tilt3D>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 7. Failures & Fixes (Senior Engineer Flex) ───────────────── */}
      <Section id="failures">
        <PageContainer>
          <div className="mb-12 text-center">
            <Badge className="mb-4">Section 7</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Failures & What I Learned
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Junior developers show only success. Senior engineers show how they
              handled failure. Here are three production issues and the systems
              I built to fix them.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Failure 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-red-400">1</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Agents Were Hallucinating on Complex Tasks</h3>
                  <p className="text-sm text-white/50 mt-1">Task completion: 40%</p>
                </div>
              </div>
              <div className="ml-6 md:ml-12 space-y-4">
                <p className="text-white/70">
                  Without memory, agents re-derived solutions from scratch every session.
                  They&apos;d get different (often wrong) answers each time. No feedback loop
                  meant bad patterns persisted.
                </p>
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4">
                  <p className="text-sm text-white/80">
                    <span className="text-accent font-semibold">Fix:</span> Built the Convergence Evaluator
                    to track answer consistency. Combined with pattern extraction and outcome tracking,
                    task completion rose from <span className="text-red-400">40%</span> to{' '}
                    <span className="text-accent font-bold">86.7%</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Failure 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-red-400">2</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Serverless Cold Starts Wiped In-Memory State</h3>
                  <p className="text-sm text-white/50 mt-1">Pattern tracking: broken</p>
                </div>
              </div>
              <div className="ml-6 md:ml-12 space-y-4">
                <p className="text-white/70">
                  The pattern application store used an in-memory <code className="text-primary/80 bg-primary/10 px-1 rounded">Map&lt;string, Data&gt;</code>.
                  Every Vercel cold start cleared it. Timeout-based auto-outcomes were unreliable
                  in serverless — functions terminate before timers fire.
                </p>
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4">
                  <p className="text-sm text-white/80">
                    <span className="text-accent font-semibold">Fix:</span> Migrated to a Redis-backed store with 5-minute TTL
                    and in-memory fallback. Replaced setTimeout with lazy auto-outcome processing —
                    on each new Track call, stale verified applications &gt;30s old get processed first.
                  </p>
                </div>
              </div>
            </div>

            {/* Failure 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-red-400">3</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Context Eviction Caused Amnesia</h3>
                  <p className="text-sm text-white/50 mt-1">Agents forgot mid-conversation</p>
                </div>
              </div>
              <div className="ml-6 md:ml-12 space-y-4">
                <p className="text-white/70">
                  When context windows filled up, the eviction system removed older messages.
                  But the rehydration system only looked at the last 5 turns — missing critical
                  context from earlier in the conversation. Agents would &quot;forget&quot; decisions made
                  20 minutes ago.
                </p>
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-4">
                  <p className="text-sm text-white/80">
                    <span className="text-accent font-semibold">Fix:</span> Replaced positional lookup with
                    semantic vector search across ALL evicted content. Now always-on (not keyword-triggered).
                    Used Google AI embeddings (free tier) to keep costs at zero. Evicted content is stored
                    losslessly in Cloudflare R2.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 8. Key Achievements ──────────────────────────────────────── */}
      <Section className="bg-gradient-to-b from-primary/5 via-transparent to-transparent relative overflow-hidden" id="achievements">
        {/* Perspective Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <PerspectiveGrid color="0, 217, 255" speed={0.2} />
        </div>

        <PageContainer>
          <div className="relative z-10 mb-12 text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Key Achievements
            </h2>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Tilt3D intensity={5} className="rounded-xl">
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <GitCommit className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-white">High-Volume Engineering</h3>
                </div>
                <p className="text-white/70 text-sm">
                  996+ commits as sole architect. 372 database tables covering memory,
                  traces, evaluations, and analytics. 10+ GitHub Actions CI/CD pipelines
                  for automated testing and deployment.
                </p>
              </div>
            </Tilt3D>

            <Tilt3D intensity={5} className="rounded-xl">
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <h3 className="text-lg font-bold text-white">Performance Improvement</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Increased AI task completion rates from 40% to 86.7% through automated
                  pattern extraction and outcome tracking. Continuous improvement via the
                  Golden Loop feedback mechanism.
                </p>
              </div>
            </Tilt3D>

            <Tilt3D intensity={5} className="rounded-xl">
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-secondary" />
                  <h3 className="text-lg font-bold text-white">Algorithm Design</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Developed 4 custom algorithms: Cache-Preserving Passthrough, Delta-Prometheus
                  Convergence Evaluator, Active Forgetting Engine, and Semantic Rehydration —
                  each solving a specific production failure mode.
                </p>
              </div>
            </Tilt3D>

            <Tilt3D intensity={5} className="rounded-xl">
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Data Processing</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Created a business logic extraction pipeline processing 2,500+ patterns
                  with 92.8% success rate. Automated learning pipelines analyze agent
                  conversations to construct knowledge graphs.
                </p>
              </div>
            </Tilt3D>
          </div>
        </PageContainer>
      </Section>

      {/* ─── 9. Live Demo ─────────────────────────────────────────────── */}
      <Section className="bg-white/[0.02] relative overflow-hidden" id="demo">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <ParticleNetwork color="0, 217, 255" particleCount={25} connectionDistance={100} />
        </div>

        <PageContainer>
          <div className="relative z-10 mb-8 md:mb-12 text-center">
            <Badge variant="primary" className="mb-4">Live Demo</Badge>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Talk to the Memory System
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
              This isn&apos;t a mock. Gemini 2.0 Flash with live MCP tool access to the real
              ekkOS production database. Ask it anything — watch the raw tool calls execute.
            </p>
          </div>

          <div className="relative z-10">
            <LiveDemo />
          </div>
        </PageContainer>
      </Section>

      {/* ─── 10. Tech Stack ───────────────────────────────────────────── */}
      <Section>
        <PageContainer>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
              Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { category: 'Languages', items: ['TypeScript', 'Node.js', 'Python', 'SQL'] },
              { category: 'AI / Agents', items: ['Claude', 'GPT', 'Gemini', 'MCP Protocol'] },
              { category: 'Infrastructure', items: ['Vercel', 'Railway', 'GitHub Actions', 'Cloudflare R2'] },
              { category: 'Data', items: ['PostgreSQL', 'Redis / Upstash', 'Neo4j', 'Vector Embeddings'] },
            ].map((group) => (
              <div key={group.category} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{group.category}</h4>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item} className="text-sm text-white/80">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </Section>

      {/* ─── About the Engineer ─────────────────────────────────────── */}
      <Section className="bg-gradient-to-b from-primary/5 to-transparent" id="about">
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-primary/20 bg-black/50 p-6 md:p-12">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                {/* Photo */}
                <img
                  src="/seann.png"
                  alt="Seann MacDougall"
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-primary/30"
                />

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Engineered by Seann MacDougall
                  </h2>
                  <p className="text-sm text-primary mb-4">
                    Lead Systems Architect
                  </p>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
                    Seann is a Lead AI Engineer specializing in cognitive architectures
                    and agentic memory systems. He designed and built ekkOS from the first
                    commit to the 11th layer — 996+ commits, 372 database tables, and 4
                    custom algorithms, all as a solo architect. His focus is building
                    production-grade infrastructure that makes AI agents genuinely smarter
                    over time.
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                    <a
                      href="https://github.com/seannmacdougall"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/seann-macdougall/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                    <a
                      href="mailto:seannmac@icloud.com"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <Code2 className="w-4 h-4" />
                      seannmac@icloud.com
                    </a>
                  </div>

                  {/* Contact info */}
                  <p className="text-xs text-white/30 text-center md:text-left">
                    Whitby, Ontario · 289-927-0983
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom links */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="https://ekkos.dev" variant="primary">
                Visit ekkOS Platform
              </CTAButton>
              <CTAButton href="https://docs.ekkos.dev" variant="secondary">
                Read the Docs
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
