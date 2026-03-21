import { NextRequest, NextResponse } from "next/server";

import {
  buildDemoSnapshot,
  buildScorecardSnapshot,
  getScorecardSupabaseClient,
  normalizeDbRun,
  type ScorecardRun,
} from "@/lib/scorecard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_WINDOW_HOURS = 72;
const MAX_WINDOW_HOURS = 7 * 24;
const DEFAULT_LIMIT = 300;
const MAX_LIMIT = 800;

function parsePositiveInt(value: string | null, fallback: number, max: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  if (parsed <= 0) return fallback;
  return Math.min(Math.round(parsed), max);
}

export async function GET(request: NextRequest) {
  const windowHours = parsePositiveInt(
    request.nextUrl.searchParams.get("windowHours"),
    DEFAULT_WINDOW_HOURS,
    MAX_WINDOW_HOURS
  );
  const limit = parsePositiveInt(
    request.nextUrl.searchParams.get("limit"),
    DEFAULT_LIMIT,
    MAX_LIMIT
  );

  const scenario = request.nextUrl.searchParams.get("scenario");
  const provider = request.nextUrl.searchParams.get("provider");

  const supabase = getScorecardSupabaseClient();
  if (!supabase) {
    return NextResponse.json(buildDemoSnapshot(windowHours), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString();

  let query = supabase
    .from("model_scorecard_runs")
    .select(
      "id, provider, model, scenario, status, constraint_recall, task_completion, tool_correctness, latency_ms, cost_usd, tokens_input, tokens_output, run_id, commit_sha, metadata, benchmarked_at"
    )
    .gte("benchmarked_at", since)
    .order("benchmarked_at", { ascending: false })
    .limit(limit);

  if (scenario) query = query.eq("scenario", scenario);
  if (provider) query = query.eq("provider", provider.toLowerCase());

  const { data, error } = await query;

  if (error) {
    console.error("[scorecard/latest] Supabase query failed:", error);
    return NextResponse.json(buildDemoSnapshot(windowHours), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const runs = (data ?? [])
    .map(normalizeDbRun)
    .filter((run): run is ScorecardRun => run !== null);
  if (runs.length === 0) {
    return NextResponse.json(buildDemoSnapshot(windowHours), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(buildScorecardSnapshot(runs, windowHours, "live"), {
    headers: { "Cache-Control": "no-store" },
  });
}
