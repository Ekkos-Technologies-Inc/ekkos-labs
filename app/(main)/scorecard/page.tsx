import type { Metadata } from "next";

import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";
import { ScorecardDashboard } from "@/components/scorecard/ScorecardDashboard";

export const metadata: Metadata = {
  title: "Live Model Scorecard | ekkOS Labs",
  description:
    "Public benchmark scorecard comparing Gemini and Claude on long-horizon recall, tool correctness, latency, and cost.",
};

export default function ScorecardPage() {
  return (
    <Section>
      <PageContainer>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary/80">
              Public Benchmark Feed
            </p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Gemini vs Claude
              <span className="block text-primary">Live Scorecard</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              Real benchmark runs from the ekkOS proxy stack. We track long-horizon
              constraint recall, task completion, tool correctness, latency, and cost
              on the same workload suite.
            </p>
          </div>

          <ScorecardDashboard />
        </div>
      </PageContainer>
    </Section>
  );
}
