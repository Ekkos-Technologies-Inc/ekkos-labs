import { Badge } from "@/components/Badge";
import { CTAButton } from "@/components/CTAButton";
import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NVIDIA Inception Program | ekkOS Labs",
  description:
    "ekkOS Technologies is a member of the NVIDIA Inception program, accelerating AI memory infrastructure development.",
};

const benefits = [
  {
    title: "GPU-Accelerated Research",
    description:
      "NVIDIA's ecosystem for advancing AI memory embedding, vector search, and real-time pattern matching at scale.",
  },
  {
    title: "Go-to-Market Support",
    description:
      "Expanded reach through NVIDIA's partner ecosystem and market development programs for enterprise AI infrastructure.",
  },
  {
    title: "Technical Expertise",
    description:
      "Deep technical resources for optimizing persistent memory infrastructure on NVIDIA platforms and accelerated compute.",
  },
];

export default function NvidiaPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-label mb-6">Partnership</div>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="primary">Active</Badge>
              <Badge>Since 2025</Badge>
            </div>
            <h1 className="mb-6 font-display text-4xl leading-tight text-[var(--text-primary)] lg:text-5xl">
              NVIDIA Inception
              <br />
              <span style={{ color: "#76b900" }}>Program Member</span>
            </h1>
            <p className="font-body text-lg leading-relaxed text-[var(--text-secondary)]">
              ekkOS Technologies is a proud member of the NVIDIA Inception
              program, accelerating our development of persistent memory
              infrastructure for AI coding agents.
            </p>
          </div>
        </PageContainer>
      </Section>

      {/* Logo Lockup */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <div
              className="clip-lg border bg-[var(--bg-panel)] p-8 md:p-12"
              style={{ borderColor: "rgba(118, 185, 0, 0.3)" }}
            >
              <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
                {/* ekkOS mark */}
                <div className="clip-md border border-primary/30 bg-[var(--bg-card)] px-8 py-5">
                  <span className="font-mono text-3xl font-bold tracking-tight text-primary">
                    ekkOS<span className="text-primary/60">_</span>Labs
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden h-16 w-px bg-[var(--border)] sm:block" />
                <div className="h-px w-16 bg-[var(--border)] sm:hidden" />

                {/* NVIDIA badge */}
                <img
                  src="/nvidia-inception-badge.svg"
                  alt="NVIDIA Inception Program"
                  className="h-16 w-auto sm:h-20"
                />
              </div>

              <div className="mt-8 border-t border-[var(--border)] pt-8">
                <p className="font-body leading-relaxed text-[var(--text-secondary)]">
                  Through the NVIDIA Inception program, ekkOS accelerates the
                  development of cognitive infrastructure for AI systems &mdash;
                  leveraging NVIDIA&apos;s ecosystem of tools, expertise, and
                  go-to-market support to advance persistent memory and pattern
                  intelligence.
                </p>
              </div>

              <div className="mt-6">
                <span
                  className="clip-sm inline-flex items-center gap-2 border px-3 py-1 font-mono text-[10px] uppercase tracking-[1px]"
                  style={{
                    borderColor: "rgba(118, 185, 0, 0.3)",
                    backgroundColor: "rgba(118, 185, 0, 0.05)",
                    color: "#76b900",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#76b900]" />
                  Member since 2025
                </span>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Benefits */}
      <Section>
        <PageContainer>
          <div className="mb-12 text-center">
            <div className="section-label mb-4">Benefits</div>
            <h2 className="mb-4 font-display text-3xl text-[var(--text-primary)]">
              What This Means
            </h2>
            <p className="font-body text-[var(--text-secondary)]">
              How NVIDIA Inception accelerates ekkOS development
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-2 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="card-glow clip-md border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all hover:border-[#76b900]/30 hover:bg-[var(--bg-elevated)]"
              >
                <h3 className="mb-3 font-display text-lg text-[var(--text-primary)]">
                  {b.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </Section>

      {/* CTA */}
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex flex-wrap justify-center gap-4">
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

      {/* Legal */}
      <div className="pb-12 text-center">
        <p className="mx-auto max-w-lg px-6 font-mono text-[10px] leading-relaxed text-[var(--text-dim)]">
          NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or
          registered trademarks of NVIDIA Corporation in the U.S. and other
          countries.
        </p>
      </div>
    </>
  );
}
