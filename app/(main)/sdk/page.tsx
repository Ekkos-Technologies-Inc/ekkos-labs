import { Badge } from "@/components/Badge";
import { CodeWindow, ComparisonCode } from "@/components/CodeWindow";
import { CTAButton } from "@/components/CTAButton";
import { PageContainer } from "@/components/PageContainer";
import { Section } from "@/components/Section";

const competitorCode = `// Manual SDK Integration Required
import { MemoryClient } from 'mem0ai';
const memory = new MemoryClient(apiKey);

// Before EVERY AI interaction:
const memories = await memory.search({
  query: userMessage,
  user_id: userId
});

// Manually build context
const context = memories
  .map(m => m.text)
  .join('\\n');

const prompt = \`Context: \${context}

User: \${userMessage}\`;

// Finally call AI
const response = await openai.chat.completions.create({
  messages: [{ role: 'user', content: prompt }]
});

// Repeat 100x across your codebase
// No automatic learning
// No pattern evolution
// No outcome tracking`;

const ekkosCode = `// Zero Integration - Just Change URL
const client = new OpenAI({
  baseURL: 'https://api.ekkos.dev/v1',
  apiKey: process.env.EKKOS_API_KEY,
  defaultHeaders: {
    'X-User-ID': userId
  }
});

// Your existing code works unchanged:
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: userMessage }]
});

// Memory injection: automatic
// Pattern evolution: automatic
// Outcome tracking: automatic
// Token savings: tracked
// Learning velocity: improving`;

const comparisonData = [
  { feature: "Integration time", ekkos: "5 minutes", competitor: "2-4 weeks", ekkosWins: true },
  { feature: "Code changes", ekkos: "1 line (URL)", competitor: "100+ lines", ekkosWins: true },
  { feature: "Memory injection", ekkos: "Automatic", competitor: "Manual", ekkosWins: true },
  { feature: "Token savings", ekkos: "Significant", competitor: "Limited", ekkosWins: true },
  { feature: "Pattern evolution", ekkos: "Auto-adjusts", competitor: "Static", ekkosWins: true },
  { feature: "Outcome tracking", ekkos: "Built-in", competitor: "None", ekkosWins: true },
  { feature: "Cross-agent learning", ekkos: "Shared knowledge", competitor: "Siloed", ekkosWins: true },
  { feature: "Multi-provider", ekkos: "OpenAI + Anthropic", competitor: "Custom SDK", ekkosWins: true },
  { feature: "Streaming SSE", ekkos: "Native support", competitor: "-", ekkosWins: true },
  { feature: "Safety layer", ekkos: "Built-in", competitor: "None", ekkosWins: true },
];

export default function SDKPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-black via-black to-black/95">
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              Memory Gateway
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Drop-In Memory for Any LLM
            </h1>

            <p className="text-2xl text-white/70 mb-8">
              Change one URL. Get persistent memory that learns.
            </p>

            {/* Before/After URL */}
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-primary/30 mb-8">
              <div className="grid gap-4 text-left font-mono">
                <div className="flex items-center gap-4">
                  <span className="text-red-400 text-sm">Before:</span>
                  <code className="text-white/60 line-through">
                    base_url=&quot;https://api.openai.com/v1&quot;
                  </code>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-sm">After:</span>
                  <code className="text-green-400">
                    base_url=&quot;https://api.ekkos.dev/v1&quot;
                  </code>
                </div>
              </div>
            </div>

            {/* Key benefits */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {[
                "No code changes",
                "Auto pattern injection",
                "Works with OpenAI",
                "Works with Anthropic",
                "Token savings tracked"
              ].map((benefit, i) => (
                <div key={i} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-white/80 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton href="https://platform.ekkos.dev" variant="primary">
                Get API Key
              </CTAButton>
              <CTAButton href="#comparison" variant="outline">
                See Comparison
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Zero Integration Section */}
      <Section id="comparison">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Zero Integration Time
            </h2>
            <p className="text-white/70 text-lg">
              Competitors make you rewrite your code. ekkOS just works.
            </p>
          </div>

          <ComparisonCode
            leftTitle="Without ekkOS (Manual Integration)"
            rightTitle="With ekkOS Gateway (Zero Integration)"
            leftBadge="50+ LOC"
            rightBadge="1 LOC changed"
            leftCode={competitorCode}
            rightCode={ekkosCode}
          />

          {/* Stats below comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-red-900/10 border border-red-500/20">
              <h4 className="text-red-400 font-semibold mb-3">Traditional SDK Approach</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>📝 100+ lines of integration code</li>
                <li>⏱️ 2-4 weeks integration time</li>
                <li>🔧 Ongoing maintenance burden</li>
                <li>🚫 No automatic learning</li>
                <li>🚫 Static memories only</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-green-900/10 border border-green-500/20">
              <h4 className="text-green-400 font-semibold mb-3">ekkOS Gateway Approach</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>📝 1 line changed (base URL)</li>
                <li>⏱️ 5 minutes to production</li>
                <li>🚀 Zero maintenance</li>
                <li>✅ Automatic pattern evolution</li>
                <li>✅ Self-improving memories</li>
              </ul>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Feature Comparison Matrix */}
      <Section className="bg-white/5">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Feature Comparison
            </h2>
            <p className="text-white/70 text-lg">
              Why developers choose ekkOS over alternatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-white/10 p-4 border-b border-white/10">
                <div className="text-white/50 text-sm font-medium">Feature</div>
                <div className="text-center">
                  <span className="text-primary font-bold">ekkOS</span>
                </div>
                <div className="text-center">
                  <span className="text-white/50">Others</span>
                </div>
              </div>

              {/* Rows */}
              {comparisonData.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="text-white/80">{row.feature}</div>
                  <div className="text-center">
                    <span className="text-green-400 font-medium">{row.ekkos}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-white/40">{row.competitor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* How It Works - Simplified */}
      <Section>
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-white/70 text-lg">
              Transparent memory injection without changing your code
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Request Received</h3>
                <p className="text-white/60 text-sm">
                  Your AI request comes through the ekkOS gateway
                </p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Context Enhanced</h3>
                <p className="text-white/60 text-sm">
                  Relevant patterns and memories are automatically injected
                </p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Response & Learn</h3>
                <p className="text-white/60 text-sm">
                  Response returns, outcomes tracked, patterns improve
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* The Key Insight */}
      <Section className="bg-gradient-to-b from-primary/5 to-transparent">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 border border-cyan-500/30">
              <p className="text-3xl font-bold text-white mb-4">
                &ldquo;Mem0 remembers. ekkOS learns.&rdquo;
              </p>
              <p className="text-white/70">
                Competitors store memories statically. ekkOS evolves patterns based on success rates,
                learns from failures, and shares knowledge across agents—all automatically.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Quick Start */}
      <Section>
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get Started in 5 Minutes
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Get your API key</h3>
                  <p className="text-white/60 text-sm mb-2">Sign up at platform.ekkos.dev</p>
                  <CTAButton href="https://platform.ekkos.dev" variant="outline" className="text-sm">
                    Create Account
                  </CTAButton>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Change your base URL</h3>
                  <CodeWindow>
{`const client = new OpenAI({
  baseURL: 'https://api.ekkos.dev/v1',
  apiKey: process.env.EKKOS_API_KEY,
});`}
                  </CodeWindow>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">That&apos;s it. Memory is now active.</h3>
                  <p className="text-white/60 text-sm">
                    Your existing code works unchanged. Memory patterns are injected automatically.
                    Token savings are tracked. Patterns evolve based on outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* CTA */}
      <Section className="bg-white/5">
        <PageContainer>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to add memory to your AI?
            </h2>
            <p className="text-white/70 mb-8">
              Start with the free tier. Scale when you need to.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton href="https://platform.ekkos.dev" variant="primary">
                Get Started Free
              </CTAButton>
              <CTAButton href="https://docs.ekkos.dev" variant="outline">
                Read the Docs
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
