import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";

export default function RoadmapPage() {
  return (
    <Section>
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-white">
            Research Vision
          </h1>
          <p className="mb-8 text-xl text-white/70">
            ekkOS Labs is advancing the future of AI memory and cognition.
          </p>

          <div className="mb-12 rounded-xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Our Focus
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-white/80">
              We're building cognitive infrastructure that enables AI systems to
              learn, remember, and improve over time. Our research powers the
              ekkOS platform and shapes the future of intelligent agents.
            </p>

            <div className="grid gap-6 text-left md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 font-semibold text-white">Memory Systems</h3>
                <p className="text-sm text-white/70">
                  Persistent, secure memory that grows smarter with every interaction.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 font-semibold text-white">Learning & Adaptation</h3>
                <p className="text-sm text-white/70">
                  Systems that learn from experience and improve autonomously.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 font-semibold text-white">Safety & Alignment</h3>
                <p className="text-sm text-white/70">
                  Provable, auditable AI that enterprises can trust.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="mb-2 font-semibold text-white">Agent Intelligence</h3>
                <p className="text-sm text-white/70">
                  Enabling the next generation of intelligent AI agents.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white">
              Research Collaboration
            </h3>
            <p className="mb-4 text-white/80">
              Interested in our research? We selectively partner with academic
              institutions and industry leaders advancing AI memory and cognition.
            </p>
            <CTAButton href="mailto:research@ekkos.dev" variant="primary">
              Contact Research Team
            </CTAButton>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}






























































