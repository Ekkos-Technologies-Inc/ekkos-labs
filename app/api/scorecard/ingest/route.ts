import { NextRequest, NextResponse } from "next/server";

import { getScorecardSupabaseClient, normalizeIngestPayload } from "@/lib/scorecard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isAuthorized(request: NextRequest): boolean {
  const expectedToken = process.env.SCORECARD_INGEST_TOKEN;
  if (!expectedToken) return false;

  const provided =
    request.headers.get("x-scorecard-token") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    request.nextUrl.searchParams.get("token");

  return Boolean(provided && provided === expectedToken);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getScorecardSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Scorecard storage is not configured" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rows = normalizeIngestPayload(body);
  if (rows.length === 0) {
    return NextResponse.json(
      {
        error:
          "No valid runs found. Required fields: provider, model, status, constraintRecall, taskCompletion, toolCorrectness, latencyMs, costUsd.",
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("model_scorecard_runs")
    .insert(rows)
    .select("id");

  if (error) {
    console.error("[scorecard/ingest] Supabase insert failed:", error);
    return NextResponse.json({ error: "Failed to insert runs" }, { status: 500 });
  }

  return NextResponse.json({
    inserted: data?.length ?? rows.length,
    ids: (data ?? []).map((row: { id: string }) => row.id),
  });
}
