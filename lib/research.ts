export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: "Published" | "In Progress" | "Draft" | "Partner Access";
  abstract: string;
  content: string;
  authors?: string[];
  tags?: string[];
}

export const researchArticles: ResearchArticle[] = [
  {
    slug: 'ans-biologically-self-aware-codebases',
    title: 'The Autonomic Nervous System (ANS): Achieving Biologically Self-Aware Codebases',
    date: 'March 15, 2026',
    category: 'Architecture',
    status: 'Published',
    authors: ['ekkOS Engineering'],
    abstract: 'Modern AI coding assistants operate in open-loop, stateless paradigms. We introduce the Autonomic Nervous System (ANS), a closed-loop architecture combining real-time Prometheus vitals with Living Documentation (Cortex). This allows the codebase to independently detect regressions, diagnose the root cause via LLM cross-referencing, and autonomously forge permanent anti-patterns—creating the first software immune system.',
    content: `
# 👑 The Crown Jewel: ekkOS Autonomic Nervous System (ANS)

The fundamental flaw in modern AI coding assistants is their open-loop nature. They sit in your IDE, answer questions based on the static files they can see, and write code when prompted. 

But when that code goes to production and crashes the database, or when a new feature silently degrades API latency by 400ms, the AI is completely blind. It has no feedback mechanism. It is a brain without a nervous system.

**Today, we are changing that. We have built the first Biologically Self-Aware Codebase.**

---

## 🌌 The Vision: Codebase Homeostasis

If the Golden Loop makes the AI *smarter* about your code by recording its successful decisions, the **Autonomic Nervous System (ANS)** makes the codebase *aware of its own health*. 

By wiring **Prometheus (Live Metrics/Latencies/Errors)** directly into **Cortex (ekkOS_CONTEXT.md / Git Commits)**, the system can autonomously detect regressions, correlate them to exact lines of code changed by recent commits, and synthesize an immediate fix or preventative directive.

It is the equivalent of a human touching a hot stove, feeling pain (Prometheus), remembering they just moved their hand (Cortex), and pulling it back while creating a mental rule to never do it again (Directives/Anti-Patterns).

---

## ⚙️ The Core Mechanism: The Homeostasis Loop

### 1. The Pain Receptor (Anomaly Detection)
The system continuously monitors its own live API latencies, queue depths (DLQ spikes), model token usage, and Golden Loop velocity via \`metrics-collector\`. If a vital sign strays from the baseline (e.g., semantic search latency jumps from 100ms to 450ms), it fires a \`system.anomaly\` event.

### 2. The Spinal Cord (Context Correlator)
Upon receiving a pain signal, the ANS worker wakes up and asks: *"What changed right before the pain started?"*
It cross-references the anomaly timestamp against the \`doc_compilations\` registry. It discovers, for instance, that the \`apps-memory-api\` system was compiled 12 minutes ago with the \`recompile_reason\`: *"2 git commits: added RBAC checks to semantic search"*.

### 3. The Brain (LLM Diagnostician)
The worker loads the \`ekkOS_CONTEXT.md\` for the correlated system—which contains the exact code blueprint and the recent git diffs—and feeds it to Gemini Pro.
The AI is prompted with the anomaly data and the recent changes. It diagnoses the root cause (e.g., an N+1 query introduced by the RBAC check) and proposes a code-level fix.

### 4. The Antibodies (Self-Correction)
Instead of just sending an alert, the system takes proactive action:
1. **Instant Relief:** It autonomously uses the \`ekkOS_Forge\` tool to inject an **Anti-Pattern** directly into the developer's Knowledge Graph: *"ANTI-PATTERN: Do not run RBAC filters iteratively during vector search; it causes an N+1 latency regression. Filter post-retrieval."*
2. **The Cure:** It drops a precise, copy-pasteable Code Patch into the dashboard for the human engineer to 1-click apply, or automatically creates a GitHub PR.

---

## 📈 The Shift from Assistant to Immune System

We are moving from reactive AI tools that only know what you paste into the context window, to a **proactive, biologically self-aware ecosystem**. 

With ekkOS ANS, the codebase feels pain, diagnoses its own wounds using its own medical chart, and generates its own antibodies. It literally closes the loop on AGI-assisted software maintenance.
`
  }
];

export function getResearchArticle(slug: string): ResearchArticle | undefined {
  return researchArticles.find((article) => article.slug === slug);
}

export function getAllResearchArticles(): ResearchArticle[] {
  return researchArticles;
}
