import { createClient } from "@supabase/supabase-js";

export type ScorecardSource = "live" | "demo";
export type ScorecardStatus = "pass" | "fail";

export interface ScorecardRun {
  id: string;
  provider: string;
  model: string;
  scenario: string;
  status: ScorecardStatus;
  constraintRecall: number;
  taskCompletion: number;
  toolCorrectness: number;
  latencyMs: number;
  costUsd: number;
  tokensInput: number | null;
  tokensOutput: number | null;
  runId: string | null;
  commitSha: string | null;
  metadata: Record<string, unknown>;
  benchmarkedAt: string;
}

export interface ScorecardLeaderboardEntry {
  rank: number;
  key: string;
  provider: string;
  model: string;
  runs: number;
  passRate: number;
  avgConstraintRecall: number;
  avgTaskCompletion: number;
  avgToolCorrectness: number;
  avgLatencyMs: number;
  avgCostUsd: number;
  score: number;
}

export interface ScorecardProviderSummary {
  provider: string;
  runs: number;
  passRate: number;
  avgScore: number;
  avgLatencyMs: number;
  avgCostUsd: number;
}

export interface ScorecardSnapshot {
  source: ScorecardSource;
  generatedAt: string;
  windowHours: number;
  runs: number;
  leaderboard: ScorecardLeaderboardEntry[];
  providers: ScorecardProviderSummary[];
  recentRuns: ScorecardRun[];
}

export interface ScorecardDbInsert {
  provider: string;
  model: string;
  scenario: string;
  status: ScorecardStatus;
  constraint_recall: number;
  task_completion: number;
  tool_correctness: number;
  latency_ms: number;
  cost_usd: number;
  tokens_input: number | null;
  tokens_output: number | null;
  run_id: string | null;
  commit_sha: string | null;
  metadata: Record<string, unknown>;
  benchmarked_at: string;
}

interface ScorecardDbRow extends ScorecardDbInsert {
  id: string;
}

type JsonRecord = Record<string, unknown>;

const MAX_RECENT_RUNS = 16;
const DEMO_WINDOW_HOURS = 72;

function round(value: number, precision = 2): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toStringValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function toRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function clampPercent(value: number): number {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

function sanitizeInteger(value: unknown, fallback: number | null = null): number | null {
  const parsed = toNumber(value);
  if (parsed === null) return fallback;
  if (parsed < 0) return fallback;
  return Math.round(parsed);
}

function normalizeStatus(value: unknown): ScorecardStatus | null {
  if (typeof value === "boolean") return value ? "pass" : "fail";
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === "pass" || normalized === "passed" || normalized === "success") {
    return "pass";
  }
  if (normalized === "fail" || normalized === "failed" || normalized === "error") {
    return "fail";
  }
  return null;
}

function normalizeDate(value: unknown): string {
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
  return new Date().toISOString();
}

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

export function getScorecardSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceRole) return null;

  return createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function normalizeDbRun(row: unknown): ScorecardRun | null {
  const source = row as Partial<ScorecardDbRow>;
  if (!source || typeof source !== "object") return null;

  const provider = toStringValue(source.provider)?.toLowerCase();
  const model = toStringValue(source.model);
  const scenario = toStringValue(source.scenario) ?? "general";
  const status = normalizeStatus(source.status);
  const constraintRecall = toNumber(source.constraint_recall);
  const taskCompletion = toNumber(source.task_completion);
  const toolCorrectness = toNumber(source.tool_correctness);
  const latencyMs = sanitizeInteger(source.latency_ms);
  const costUsd = toNumber(source.cost_usd);

  if (
    !source.id ||
    !provider ||
    !model ||
    !status ||
    constraintRecall === null ||
    taskCompletion === null ||
    toolCorrectness === null ||
    latencyMs === null ||
    costUsd === null
  ) {
    return null;
  }

  return {
    id: source.id,
    provider,
    model,
    scenario,
    status,
    constraintRecall: clampPercent(constraintRecall),
    taskCompletion: clampPercent(taskCompletion),
    toolCorrectness: clampPercent(toolCorrectness),
    latencyMs,
    costUsd: Math.max(0, costUsd),
    tokensInput: sanitizeInteger(source.tokens_input),
    tokensOutput: sanitizeInteger(source.tokens_output),
    runId: toStringValue(source.run_id),
    commitSha: toStringValue(source.commit_sha),
    metadata: toRecord(source.metadata),
    benchmarkedAt: normalizeDate(source.benchmarked_at),
  };
}

export function normalizeIngestPayload(body: unknown): ScorecardDbInsert[] {
  const sourceRuns = extractRuns(body);
  const normalizedRuns: ScorecardDbInsert[] = [];

  for (const item of sourceRuns) {
    const run = normalizeIngestRun(item);
    if (run) normalizedRuns.push(run);
  }

  return normalizedRuns;
}

function extractRuns(body: unknown): unknown[] {
  if (Array.isArray(body)) return body;
  if (!body || typeof body !== "object") return [];

  const payload = body as JsonRecord;
  if (Array.isArray(payload.runs)) return payload.runs;
  return [payload];
}

function normalizeIngestRun(input: unknown): ScorecardDbInsert | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const source = input as JsonRecord;

  const provider = (
    toStringValue(source.provider) ??
    toStringValue(source.vendor) ??
    ""
  ).toLowerCase();
  const model = toStringValue(source.model) ?? toStringValue(source.model_name);
  const scenario = toStringValue(source.scenario) ?? toStringValue(source.benchmark) ?? "general";
  const status = normalizeStatus(source.status ?? source.result ?? source.passed);

  const constraintRecall = toNumber(source.constraintRecall ?? source.constraint_recall);
  const taskCompletion = toNumber(source.taskCompletion ?? source.task_completion);
  const toolCorrectness = toNumber(source.toolCorrectness ?? source.tool_correctness);
  const latencyMs = sanitizeInteger(source.latencyMs ?? source.latency_ms);
  const costUsd = toNumber(source.costUsd ?? source.cost_usd);

  if (
    !provider ||
    !model ||
    !status ||
    constraintRecall === null ||
    taskCompletion === null ||
    toolCorrectness === null ||
    latencyMs === null ||
    costUsd === null
  ) {
    return null;
  }

  return {
    provider,
    model,
    scenario,
    status,
    constraint_recall: clampPercent(constraintRecall),
    task_completion: clampPercent(taskCompletion),
    tool_correctness: clampPercent(toolCorrectness),
    latency_ms: latencyMs,
    cost_usd: Math.max(0, costUsd),
    tokens_input: sanitizeInteger(source.tokensInput ?? source.tokens_input),
    tokens_output: sanitizeInteger(source.tokensOutput ?? source.tokens_output),
    run_id: toStringValue(source.runId ?? source.run_id),
    commit_sha: toStringValue(source.commitSha ?? source.commit_sha),
    metadata: toRecord(source.metadata),
    benchmarked_at: normalizeDate(source.benchmarkedAt ?? source.benchmarked_at),
  };
}

export function buildScorecardSnapshot(
  runs: ScorecardRun[],
  windowHours = DEMO_WINDOW_HOURS,
  source: ScorecardSource = "live"
): ScorecardSnapshot {
  const sortedRuns = [...runs].sort((a, b) => {
    return new Date(b.benchmarkedAt).getTime() - new Date(a.benchmarkedAt).getTime();
  });

  const groupedByModel = new Map<string, ScorecardRun[]>();
  for (const run of sortedRuns) {
    const key = `${run.provider}:${run.model}`;
    const bucket = groupedByModel.get(key) ?? [];
    bucket.push(run);
    groupedByModel.set(key, bucket);
  }

  const candidateEntries: Array<Omit<ScorecardLeaderboardEntry, "score" | "rank">> = [];
  for (const [key, groupedRuns] of groupedByModel.entries()) {
    const first = groupedRuns[0];
    const passRate = avg(groupedRuns.map((run) => (run.status === "pass" ? 100 : 0)));
    candidateEntries.push({
      key,
      provider: first.provider,
      model: first.model,
      runs: groupedRuns.length,
      passRate: round(passRate),
      avgConstraintRecall: round(avg(groupedRuns.map((run) => run.constraintRecall))),
      avgTaskCompletion: round(avg(groupedRuns.map((run) => run.taskCompletion))),
      avgToolCorrectness: round(avg(groupedRuns.map((run) => run.toolCorrectness))),
      avgLatencyMs: round(avg(groupedRuns.map((run) => run.latencyMs))),
      avgCostUsd: round(avg(groupedRuns.map((run) => run.costUsd)), 4),
    });
  }

  const minLatency = Math.min(...candidateEntries.map((entry) => entry.avgLatencyMs), Infinity);
  const minCost = Math.min(...candidateEntries.map((entry) => entry.avgCostUsd), Infinity);

  const leaderboard = candidateEntries
    .map((entry) => {
      const quality = avg([
        entry.avgConstraintRecall,
        entry.avgTaskCompletion,
        entry.avgToolCorrectness,
      ]);

      const latencyEfficiency =
        Number.isFinite(minLatency) && entry.avgLatencyMs > 0
          ? Math.min(100, (minLatency / entry.avgLatencyMs) * 100)
          : 100;

      const costEfficiency =
        Number.isFinite(minCost) && entry.avgCostUsd > 0
          ? Math.min(100, (minCost / entry.avgCostUsd) * 100)
          : 100;

      const efficiency = avg([latencyEfficiency, costEfficiency]);
      const score = round(quality * 0.8 + efficiency * 0.2);

      return {
        ...entry,
        score,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.passRate !== a.passRate) return b.passRate - a.passRate;
      if (b.runs !== a.runs) return b.runs - a.runs;
      return a.avgCostUsd - b.avgCostUsd;
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const groupedByProvider = new Map<string, ScorecardLeaderboardEntry[]>();
  for (const entry of leaderboard) {
    const bucket = groupedByProvider.get(entry.provider) ?? [];
    bucket.push(entry);
    groupedByProvider.set(entry.provider, bucket);
  }

  const providers = [...groupedByProvider.entries()]
    .map(([provider, entries]) => {
      return {
        provider,
        runs: entries.reduce((sum, entry) => sum + entry.runs, 0),
        passRate: round(avg(entries.map((entry) => entry.passRate))),
        avgScore: round(avg(entries.map((entry) => entry.score))),
        avgLatencyMs: round(avg(entries.map((entry) => entry.avgLatencyMs))),
        avgCostUsd: round(avg(entries.map((entry) => entry.avgCostUsd)), 4),
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  return {
    source,
    generatedAt: new Date().toISOString(),
    windowHours,
    runs: sortedRuns.length,
    leaderboard,
    providers,
    recentRuns: sortedRuns.slice(0, MAX_RECENT_RUNS),
  };
}

function demoRun(
  run: Omit<
    ScorecardRun,
    "id" | "tokensInput" | "tokensOutput" | "runId" | "commitSha" | "metadata"
  >,
  index: number
): ScorecardRun {
  return {
    id: `demo-${index}`,
    tokensInput: null,
    tokensOutput: null,
    runId: null,
    commitSha: null,
    metadata: {},
    ...run,
  };
}

function buildDemoRuns(): ScorecardRun[] {
  const now = Date.now();
  const at = (hoursAgo: number) => new Date(now - hoursAgo * 60 * 60 * 1000).toISOString();

  return [
    demoRun(
      {
        provider: "anthropic",
        model: "claude-sonnet-4.5",
        scenario: "long-horizon-debug",
        status: "pass",
        constraintRecall: 96,
        taskCompletion: 94,
        toolCorrectness: 95,
        latencyMs: 1790,
        costUsd: 0.0775,
        benchmarkedAt: at(1.2),
      },
      1
    ),
    demoRun(
      {
        provider: "google",
        model: "gemini-2.5-pro",
        scenario: "long-horizon-debug",
        status: "pass",
        constraintRecall: 94,
        taskCompletion: 91,
        toolCorrectness: 92,
        latencyMs: 1480,
        costUsd: 0.0532,
        benchmarkedAt: at(1.5),
      },
      2
    ),
    demoRun(
      {
        provider: "anthropic",
        model: "claude-sonnet-4.5",
        scenario: "tool-chain-stress",
        status: "pass",
        constraintRecall: 95,
        taskCompletion: 93,
        toolCorrectness: 96,
        latencyMs: 1910,
        costUsd: 0.0811,
        benchmarkedAt: at(3.1),
      },
      3
    ),
    demoRun(
      {
        provider: "google",
        model: "gemini-2.5-pro",
        scenario: "tool-chain-stress",
        status: "pass",
        constraintRecall: 90,
        taskCompletion: 88,
        toolCorrectness: 91,
        latencyMs: 1390,
        costUsd: 0.0499,
        benchmarkedAt: at(3.8),
      },
      4
    ),
    demoRun(
      {
        provider: "anthropic",
        model: "claude-sonnet-4.5",
        scenario: "instruction-fidelity",
        status: "pass",
        constraintRecall: 97,
        taskCompletion: 95,
        toolCorrectness: 94,
        latencyMs: 1760,
        costUsd: 0.0742,
        benchmarkedAt: at(8.4),
      },
      5
    ),
    demoRun(
      {
        provider: "google",
        model: "gemini-2.5-pro",
        scenario: "instruction-fidelity",
        status: "fail",
        constraintRecall: 86,
        taskCompletion: 81,
        toolCorrectness: 84,
        latencyMs: 1280,
        costUsd: 0.0437,
        benchmarkedAt: at(9.2),
      },
      6
    ),
    demoRun(
      {
        provider: "anthropic",
        model: "claude-opus-4.1",
        scenario: "long-horizon-debug",
        status: "pass",
        constraintRecall: 98,
        taskCompletion: 96,
        toolCorrectness: 97,
        latencyMs: 2410,
        costUsd: 0.1142,
        benchmarkedAt: at(16.6),
      },
      7
    ),
    demoRun(
      {
        provider: "google",
        model: "gemini-2.5-flash",
        scenario: "fast-regression",
        status: "pass",
        constraintRecall: 82,
        taskCompletion: 79,
        toolCorrectness: 81,
        latencyMs: 690,
        costUsd: 0.0126,
        benchmarkedAt: at(18.4),
      },
      8
    ),
    demoRun(
      {
        provider: "anthropic",
        model: "claude-sonnet-4.5",
        scenario: "policy-edge-case",
        status: "fail",
        constraintRecall: 88,
        taskCompletion: 83,
        toolCorrectness: 85,
        latencyMs: 1690,
        costUsd: 0.0705,
        benchmarkedAt: at(31.2),
      },
      9
    ),
    demoRun(
      {
        provider: "google",
        model: "gemini-2.5-pro",
        scenario: "policy-edge-case",
        status: "pass",
        constraintRecall: 89,
        taskCompletion: 87,
        toolCorrectness: 88,
        latencyMs: 1330,
        costUsd: 0.0511,
        benchmarkedAt: at(32.1),
      },
      10
    ),
    demoRun(
      {
        provider: "anthropic",
        model: "claude-opus-4.1",
        scenario: "tool-chain-stress",
        status: "pass",
        constraintRecall: 99,
        taskCompletion: 97,
        toolCorrectness: 98,
        latencyMs: 2530,
        costUsd: 0.1193,
        benchmarkedAt: at(47.8),
      },
      11
    ),
    demoRun(
      {
        provider: "google",
        model: "gemini-2.5-flash",
        scenario: "fast-regression",
        status: "pass",
        constraintRecall: 84,
        taskCompletion: 80,
        toolCorrectness: 82,
        latencyMs: 710,
        costUsd: 0.0139,
        benchmarkedAt: at(51.3),
      },
      12
    ),
  ];
}

export function buildDemoSnapshot(windowHours = DEMO_WINDOW_HOURS): ScorecardSnapshot {
  return buildScorecardSnapshot(buildDemoRuns(), windowHours, "demo");
}
