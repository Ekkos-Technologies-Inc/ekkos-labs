import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";

export default function AboutPage() {
  return (
    <>
      <Section>
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold text-white">About ekkOS Labs</h1>
            <p className="mb-8 text-lg font-medium text-primary">
              The research arm of EKKOS Technologies Inc.
            </p>

            {/* Mission */}
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold text-white">Mission</h2>
              <p className="mb-4 leading-relaxed text-white/80">
                ekkOS Labs is the research and innovation division of EKKOS Technologies Inc.,
                focused on advancing AI memory and cognition.
              </p>
              <p className="mb-4 leading-relaxed text-white/80">
                Our mission is to build cognitive infrastructure that enables AI systems
                to learn, remember, and improve over time—giving every AI application
                the ability to get smarter with use.
              </p>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                  The Loop
                </p>
                <p className="leading-relaxed text-white/90">
                  Without LLMs this would never have been possible — now ekkOS can give back.
                </p>
              </div>
            </div>

            {/* Relationship */}
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Research Meets Product
              </h2>
              <p className="mb-4 leading-relaxed text-white/80">
                ekkOS Labs drives the research that powers the ekkOS platform at{" "}
                <a
                  href="https://ekkos.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ekkos.dev
                </a>
                . Developers and teams use ekkOS today to give their AI applications
                persistent memory and learning capabilities.
              </p>
              <p className="leading-relaxed text-white/80">
                This separation allows us to pursue long-term research while maintaining
                a production-grade platform for current users.
              </p>
            </div>

            {/* What We Build */}
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold text-white">What We Build</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Persistent Memory
                  </h3>
                  <p className="text-white/70">
                    AI systems that remember context across sessions and never forget
                    important information.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Pattern Intelligence
                  </h3>
                  <p className="text-white/70">
                    Solutions that improve over time, automatically learning what works.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Safety & Alignment
                  </h3>
                  <p className="text-white/70">
                    Provable, auditable AI decisions that enterprises can trust.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Agent Cognition
                  </h3>
                  <p className="text-white/70">
                    Enabling the next generation of intelligent, learning AI agents.
                  </p>
                </div>
              </div>
            </div>

            {/* Principles */}
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold text-white">Principles</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Privacy First
                  </h3>
                  <p className="text-white/80">
                    Your memory is yours. We can&apos;t access it, even with admin privileges.
                    Privacy is enforced by architecture, not policy.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Safety By Design
                  </h3>
                  <p className="text-white/80">
                    Every AI decision is auditable. Pattern validation ensures reliability.
                    Safe experimentation is built into the foundation.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Scientific Rigor
                  </h3>
                  <p className="text-white/80">
                    Measurable outcomes. Clear research questions. Evidence-based decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Research Collaboration
              </h2>
              <p className="mb-6 text-white/80">
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
    </>
  );
}
