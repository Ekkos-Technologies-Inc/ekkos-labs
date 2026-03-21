import { Badge } from "@/components/Badge";
import { CTAButton } from "@/components/CTAButton";
import { PageContainer } from "@/components/PageContainer";
import { QuoteBlock } from "@/components/QuoteBlock";
import { Section } from "@/components/Section";

const researchThemes = [
  {
    title: "Persistent Memory",
    description:
      "AI systems that remember context across sessions and learn from every interaction.",
  },
  {
    title: "Pattern Intelligence",
    description:
      "Solutions that improve over time, automatically learning what works.",
  },
  {
    title: "Safety & Alignment",
    description:
      "Provable, auditable AI decisions that enterprises can trust.",
  },
  {
    title: "Agent Cognition",
    description:
      "Enabling the next generation of intelligent, learning AI agents.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-label mb-6">Research Division</div>
            <p className="mb-4 font-mono text-sm text-[var(--text-dim)]">
              The research arm of EKKOS Technologies Inc.
            </p>
            <h1 className="mb-6 font-display text-5xl leading-tight text-[var(--text-primary)] lg:text-6xl">
              Advancing AI Memory
              <br />
              <span className="text-primary">&amp; Cognition</span>
            </h1>
            <p className="mb-6 font-body text-xl leading-relaxed text-[var(--text-secondary)]">
              ekkOS Labs drives the cognitive research that powers the ekkOS
              platform&mdash;enabling AI systems to learn, remember, and improve
              over time.
            </p>
            <p className="mb-8 font-mono text-sm text-primary">
              Born from LLMs. Built for the future of intelligence.
            </p>

            <QuoteBlock>
              We&apos;re building the cognitive infrastructure that makes AI
              actually learn&mdash;not just respond.
            </QuoteBlock>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="https://ekkos.dev" variant="primary">
                Visit ekkOS Platform
              </CTAButton>
              <CTAButton href="mailto:research@ekkos.dev" variant="outline">
                Research Collaboration
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Research Focus Grid */}
      <Section>
        <PageContainer>
          <div className="mb-12 text-center">
            <div className="section-label mb-4">Focus Areas</div>
            <h2 className="mb-4 font-display text-3xl text-[var(--text-primary)]">
              What We&apos;re Building
            </h2>
            <p className="font-body text-[var(--text-secondary)]">
              Cognitive infrastructure for intelligent AI systems
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-2 md:grid-cols-2">
            {researchThemes.map((theme, index) => (
              <div
                key={index}
                className="card-glow clip-md border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all hover:border-primary/40 hover:bg-[var(--bg-elevated)]"
              >
                <h3 className="mb-3 font-display text-lg text-[var(--text-primary)]">
                  {theme.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </Section>

      {/* MIT Research Highlight */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <div className="clip-lg border border-primary/30 bg-[var(--bg-panel)] p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="primary">New Research</Badge>
                    <Badge>MIT CSAIL</Badge>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-[var(--text-primary)] mb-4">
                    MIT Validated the Thesis
                  </h2>
                  <p className="font-body text-[var(--text-secondary)] leading-relaxed mb-6">
                    MIT&apos;s &quot;Recursive Language Models&quot; paper independently proves that
                    scaffolding + external memory beats brute-force context windows and lossy
                    compaction. <span className="text-primary">ekkOS is production infrastructure
                    for that exact approach.</span>
                  </p>
                  <CTAButton href="/research/mit-rlm" variant="primary">
                    Read the Analysis
                  </CTAButton>
                </div>
                <div className="hidden md:block w-px h-32 bg-[var(--border)]" />
                <div className="text-center md:text-left">
                  <div className="font-display text-5xl text-primary mb-2">10M+</div>
                  <div className="font-mono text-xs text-[var(--text-dim)]">tokens processed</div>
                  <div className="font-display text-5xl text-secondary mt-4 mb-2">0</div>
                  <div className="font-mono text-xs text-[var(--text-dim)]">context lost</div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* NVIDIA Partnership */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <a
              href="/nvidia"
              className="flex flex-col items-center gap-4 p-6 transition-opacity hover:opacity-80"
            >
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-dim)]">
                Accelerated by
              </p>
              <img
                src="/nvidia-inception-badge.svg"
                alt="NVIDIA Inception Program"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </PageContainer>
      </Section>

      {/* Vision */}
      <Section className="bg-[var(--bg-card)]/50">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-label mb-4">Vision</div>
            <h2 className="mb-6 font-display text-3xl text-[var(--text-primary)]">
              Why This Matters
            </h2>
            <p className="mb-6 font-body text-lg leading-relaxed text-[var(--text-secondary)]">
              Every AI system today forgets. Every session starts from zero.
              Every correction is lost. We&apos;re changing that.
            </p>
            <p className="mb-8 font-body text-lg leading-relaxed text-[var(--text-secondary)]">
              ekkOS Labs is building cognitive infrastructure that gives AI
              systems persistent memory&mdash;so they learn from experience, remember
              what worked, and get smarter over time.
            </p>
            <div className="clip-md border border-primary/30 bg-primary/5 p-6">
              <p className="font-display text-lg text-[var(--text-primary)]">
                The result: AI that actually learns.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Research Meets Product */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-2xl text-center">
            <div className="section-label mb-4">Platform</div>
            <h2 className="mb-4 font-display text-2xl text-[var(--text-primary)]">
              Research Meets Product
            </h2>
            <p className="mb-6 font-body leading-relaxed text-[var(--text-secondary)]">
              Our research powers the ekkOS platform at{" "}
              <a
                href="https://ekkos.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                ekkos.dev
              </a>
              . Developers and teams use ekkOS today to give their AI
              applications persistent memory and pattern intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="https://ekkos.dev" variant="secondary">
                Try ekkOS Platform
              </CTAButton>
              <CTAButton href="mailto:research@ekkos.dev" variant="outline">
                Partner With Us
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
