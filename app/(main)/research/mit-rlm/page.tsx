import { Badge } from "@/components/Badge";
import { CTAButton } from "@/components/CTAButton";
import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MIT RLM Research Alignment | ekkOS_Labs",
  description:
    "MIT CSAIL's Recursive Language Models paper independently validates the same architectural thesis that powers ekkOS: scaffolding + external memory beats brute-force context windows.",
  keywords: [
    "MIT CSAIL",
    "Recursive Language Models",
    "RLM",
    "context window",
    "AI memory",
    "scaffolding",
    "ekkOS",
    "external memory",
  ],
};

export default function MITRLMPage() {
  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-b from-black via-black to-black/95">
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant="primary">Research Alignment</Badge>
              <Badge>MIT Paper: October 2025</Badge>
              <Badge variant="secondary">ekkOS Production: September 2025</Badge>
              <Badge>MIT CSAIL</Badge>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
              MIT Proved the Thesis.<br />
              <span className="text-primary">We Built the Infrastructure.</span>
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-white/80">
              MIT CSAIL&apos;s &quot;Recursive Language Models&quot; paper demonstrates that
              treating prompts as an external environment—with scaffolding and
              selective retrieval—beats brute-force context windows and lossy
              compaction.{" "}
              <span className="text-primary font-medium">
                ekkOS is production infrastructure for that exact thesis.
              </span>
            </p>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-8">
              <p className="text-sm text-amber-200/90">
                <strong className="text-amber-400">Important:</strong> MIT did not validate ekkOS specifically.
                MIT independently demonstrated that the <em>same architectural approach</em> we
                implemented works at scale. ekkOS went into production in September 2025, before
                MIT published their findings in October—same thesis, independent discovery, different mechanisms.
              </p>
              <p className="text-xs text-amber-200/60 mt-2">
                Timeline verifiable via{" "}
                <a
                  href="https://github.com/ekkostech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  GitHub commit history
                </a>
                {" "}(closed source).
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <CTAButton
                href="https://arxiv.org/abs/2512.24601"
                variant="primary"
              >
                Read the Paper (arXiv)
              </CTAButton>
              <CTAButton href="https://ekkos.dev" variant="outline">
                Try ekkOS Platform
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* The Core Thesis */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold text-white">
              The Problem Both MIT and ekkOS Solve
            </h2>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                <div className="text-3xl mb-3">📉</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Context Rot
                </h3>
                <p className="text-sm text-white/70">
                  Long contexts degrade quality even within max window. Models lose
                  track of details buried in the middle.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                <div className="text-3xl mb-3">🗜️</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Lossy Compaction
                </h3>
                <p className="text-sm text-white/70">
                  &quot;Summarize-when-full&quot; strategies lose critical details.
                  Tasks needing dense access to earlier content fail.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Cost Explosion
                </h3>
                <p className="text-sm text-white/70">
                  KV cache misses cost 10× more than hits. Agentic AI generates
                  100× more tokens. Brute force doesn&apos;t scale.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                The Shared Solution
              </h3>
              <p className="text-lg text-white/80 mb-6">
                Both MIT RLM and ekkOS implement the same core insight:
              </p>
              <blockquote className="border-l-4 border-primary pl-6 text-xl font-medium text-white">
                &quot;Treat the prompt as an external environment. Selectively read.
                Recurse. Don&apos;t shove everything into one context window.&quot;
              </blockquote>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* MIT's Findings */}
      <Section className="bg-white/5">
        <PageContainer>
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                What MIT Proved
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                From the RLM paper (Zhang, Kraska, Khattab — MIT CSAIL, October 2025)
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Scaffolding Works at Scale
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Scaffolding around an LLM can process prompts far beyond the model&apos;s
                  context window by treating the prompt as an external environment and
                  recursively operating over snippets. Tested up to <strong className="text-primary">10M+ tokens</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Long Contexts Degrade Quality
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  &quot;Context rot&quot; is real—even within max context windows, quality degrades.
                  This motivates alternatives to &quot;just increase the window&quot; approaches
                  that current LLM providers are pursuing.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Compaction Is Lossy
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Summarize-when-full strategies break tasks requiring dense access to
                  earlier details. You can&apos;t summarize away context and expect the model
                  to perform complex reasoning over it.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Competitive Cost Efficiency
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  RLM achieves competitive or cheaper cost per query compared to
                  brute-force long-context approaches. Selective retrieval is both
                  better <em>and</em> cheaper.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://arxiv.org/abs/2512.24601"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Read the full paper: arXiv:2512.24601 →
              </a>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* How ekkOS Implements This */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                How ekkOS Implements the Same Thesis
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                MIT RLM is a REPL-style &quot;prompt as variable&quot; research approach.
                ekkOS is production persistence + retrieval infrastructure.
                Same thesis, different mechanisms.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-4 text-left font-semibold text-white">Aspect</th>
                    <th className="py-4 px-4 text-left font-semibold text-primary">MIT RLM</th>
                    <th className="py-4 px-4 text-left font-semibold text-secondary">ekkOS</th>
                  </tr>
                </thead>
                <tbody className="text-white/70 text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Timeline</td>
                    <td className="py-4 px-4">Paper published October 2025</td>
                    <td className="py-4 px-4 text-accent">Production since September 7, 2025</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Core Mechanism</td>
                    <td className="py-4 px-4">REPL environment, prompt as variable</td>
                    <td className="py-4 px-4">11-layer memory architecture, MCP tools</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Context Access</td>
                    <td className="py-4 px-4">Recursive sub-LM calls over chunks</td>
                    <td className="py-4 px-4">Selective retrieval via ekkOS_Search</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Persistence</td>
                    <td className="py-4 px-4">Within-session only</td>
                    <td className="py-4 px-4">Cross-session, cross-client, permanent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Learning</td>
                    <td className="py-4 px-4">No learning layer</td>
                    <td className="py-4 px-4 text-accent">Learns during limitless context—pattern forging, outcome tracking, collective memory</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Multi-Client</td>
                    <td className="py-4 px-4">Single model focus</td>
                    <td className="py-4 px-4">Claude, ChatGPT, Cursor, any MCP client</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 font-medium text-white">Deployment</td>
                    <td className="py-4 px-4">Research prototype</td>
                    <td className="py-4 px-4">Production infrastructure (api.ekkos.dev)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-white">Infrastructure</td>
                    <td className="py-4 px-4">Local execution</td>
                    <td className="py-4 px-4 text-accent">Fully cloud-based, zero local dependencies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* The Learning Layer - What ekkOS Adds */}
      <Section className="bg-gradient-to-b from-secondary/10 to-transparent">
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">ekkOS Exclusive</Badge>
              <h2 className="mb-4 text-3xl font-bold text-white">
                The Learning Layer MIT Doesn&apos;t Have
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                MIT RLM solves retrieval. ekkOS solves retrieval <em>and</em> learning—
                the system actively learns while processing limitless context, getting smarter with every interaction.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔨</span> Pattern Forging
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  When you fix a bug or discover a better approach, <code className="text-primary">ekkOS_Forge</code>
                  captures the solution as a reusable pattern. Next time you hit the same problem,
                  the solution is already there.
                </p>
              </div>

              <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Outcome Tracking
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Every pattern application is tracked. Did it work? The system learns which
                  patterns succeed and surfaces the best solutions first. Patterns that fail
                  get deprioritized.
                </p>
              </div>

              <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🌐</span> Collective Memory
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Opt-in pattern sharing across the ekkOS community. &quot;Always check for null
                  before accessing nested properties&quot; helps everyone—without sharing your code.
                </p>
              </div>

              <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">🧭</span> Directives
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Permanent rules that follow you everywhere. &quot;Never use var in JavaScript.&quot;
                  &quot;Always prefer composition over inheritance.&quot; Your preferences, enforced
                  across every session.
                </p>
              </div>

              <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">⏰</span> Time Machine
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Limitless context isn&apos;t just about size—it&apos;s about time. <code className="text-primary">ekkOS_Recall</code>
                  {" "}lets you travel back through past conversations: &quot;What did we discuss yesterday?&quot;
                  &quot;How did we fix that auth bug last week?&quot; Your entire development history, instantly searchable—and
                  viewable on the{" "}
                  <a href="https://platform.ekkos.dev" className="text-primary hover:underline">ekkOS Platform</a>.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-black p-8">
              <h3 className="text-lg font-semibold text-white mb-4">The Golden Loop</h3>
              <div className="font-mono text-sm space-y-2 text-white/70">
                <div><span className="text-primary">1.</span> You encounter a problem</div>
                <div><span className="text-primary">2.</span> ekkOS_Search retrieves relevant patterns</div>
                <div><span className="text-primary">3.</span> You apply a pattern (or create a new solution)</div>
                <div><span className="text-primary">4.</span> ekkOS_Track records the application</div>
                <div><span className="text-primary">5.</span> ekkOS_Outcome captures success/failure</div>
                <div><span className="text-primary">6.</span> System learns → better retrieval next time</div>
                <div className="pt-2 text-accent">→ AI that actually gets smarter with you</div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Stats Section */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                ekkOS by the Numbers
              </h2>
              <p className="text-white/70">
                Production infrastructure, not a research prototype
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl font-extrabold text-primary mb-2">48</div>
                <div className="text-sm text-white/70">MCP Tools</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl font-extrabold text-primary mb-2">11</div>
                <div className="text-sm text-white/70">Memory Layers</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl font-extrabold text-secondary mb-2">100%</div>
                <div className="text-sm text-white/70">Cloud-Based</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl font-extrabold text-primary mb-2">∞</div>
                <div className="text-sm text-white/70">Session Continuity</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl font-extrabold text-primary mb-2">0</div>
                <div className="text-sm text-white/70">Context Lost to Compaction</div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Coming Soon */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 text-center">
              <Badge variant="primary" className="mb-4">Production Phase 4</Badge>
              <h3 className="text-2xl font-bold text-white mb-3">
                ekkOS_Code
              </h3>
              <p className="text-white/70">
                All 48 MCP tools—limitless context, active learning, cloud-based memory—built natively into your IDE.
                No configuration. No MCP setup. Just works.
              </p>
              <p className="text-xs text-white/50 mt-3">
                Currently in development. Phase 4 brings native memory integration.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-t from-primary/10 to-transparent">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              The Thesis Is Proven.<br />
              <span className="text-primary">The Infrastructure Is Ready.</span>
            </h2>
            <p className="mb-8 text-lg text-white/70">
              MIT showed the approach works. ekkOS makes it usable.
              Stop fighting context windows. Start building with memory infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="https://ekkos.dev" variant="primary">
                Get Started with ekkOS
              </CTAButton>
              <CTAButton href="https://docs.ekkos.dev" variant="outline">
                Read the Docs
              </CTAButton>
              <CTAButton
                href="https://arxiv.org/abs/2512.24601"
                variant="outline"
              >
                Read MIT Paper
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Citation */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white/50 mb-3 uppercase tracking-wider">
                Paper Citation
              </h3>
              <p className="font-mono text-xs text-white/70 leading-relaxed">
                Zhang, A. L., Kraska, T., &amp; Khattab, O. (2025).
                Recursive Language Models.
                arXiv:2512.24601. MIT CSAIL.
              </p>
              <a
                href="https://arxiv.org/abs/2512.24601"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs hover:underline mt-2 inline-block"
              >
                https://arxiv.org/abs/2512.24601
              </a>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
