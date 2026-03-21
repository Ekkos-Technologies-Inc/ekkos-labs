import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

function supabaseHeaders() {
  return {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/ekk0/state?visitor_id=xxx — Load saved state
// ═══════════════════════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return NextResponse.json({ state: null }, { status: 200 });
  }

  const visitorId = request.nextUrl.searchParams.get("visitor_id");
  if (!visitorId) {
    return NextResponse.json({ error: "visitor_id required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ekk0_pets?visitor_id=eq.${encodeURIComponent(visitorId)}&select=*&limit=1`,
      { headers: supabaseHeaders(), next: { revalidate: 0 } }
    );

    if (!res.ok) {
      console.error("[ekk0/state] Supabase GET error:", res.status);
      return NextResponse.json({ state: null }, { status: 200 });
    }

    const rows = await res.json();
    if (!rows || rows.length === 0) {
      return NextResponse.json({ state: null }, { status: 200 });
    }

    const row = rows[0];
    return NextResponse.json({
      state: row.state,
      patterns: row.patterns,
      episodes: row.episodes,
      directives: row.directives,
      evolution_stage: row.evolution_stage,
      total_actions: row.total_actions,
      streak_days: row.streak_days,
      created_at: row.created_at,
    });
  } catch (error) {
    console.error("[ekk0/state] GET error:", error);
    return NextResponse.json({ state: null }, { status: 200 });
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/ekk0/state — Save state (conflict-aware upsert)
// ═══════════════════════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return NextResponse.json({ saved: false }, { status: 200 });
  }

  try {
    const body = await request.json();
    const { visitor_id, state, memoryStats, last_sync_at } = body;

    if (!visitor_id || !state) {
      return NextResponse.json({ error: "visitor_id and state required" }, { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Fetch current cloud state for conflict detection
    const { data: existing, error: fetchError } = await supabase
      .from("ekk0_pets")
      .select("updated_at, total_actions, state")
      .eq("visitor_id", visitor_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("[ekk0/state] Fetch error:", fetchError);
      return NextResponse.json({ saved: false }, { status: 200 });
    }

    const totalActions =
      (state.totalFeeds || 0) +
      (state.totalPlays || 0) +
      (state.totalSleeps || 0) +
      (state.totalLearns || 0);

    let evolutionStage = 1;
    if (totalActions >= 100) evolutionStage = 4;
    else if (totalActions >= 50) evolutionStage = 3;
    else if (totalActions >= 20) evolutionStage = 2;

    // Conflict resolution: merge if cloud has newer data
    let finalState = state;
    if (existing && last_sync_at) {
      const cloudUpdated = new Date(existing.updated_at).getTime();
      const localLastSync = new Date(last_sync_at).getTime();

      if (cloudUpdated > localLastSync) {
        // Cloud is newer — merge stats (take max of each)
        const cloudState = existing.state as typeof state;
        finalState = {
          hunger: Math.max(state.hunger || 0, cloudState.hunger || 0),
          happiness: Math.max(state.happiness || 0, cloudState.happiness || 0),
          energy: Math.max(state.energy || 0, cloudState.energy || 0),
          memory: Math.max(state.memory || 0, cloudState.memory || 0),
          mood: state.mood,
          age: Math.max(state.age || 0, cloudState.age || 0),
          totalFeeds: Math.max(state.totalFeeds || 0, cloudState.totalFeeds || 0),
          totalPlays: Math.max(state.totalPlays || 0, cloudState.totalPlays || 0),
          totalSleeps: Math.max(state.totalSleeps || 0, cloudState.totalSleeps || 0),
          totalLearns: Math.max(state.totalLearns || 0, cloudState.totalLearns || 0),
        };
      }
    }

    const payload = {
      visitor_id,
      state: finalState,
      patterns: memoryStats?.patterns ? [{ count: memoryStats.patterns }] : [],
      episodes: memoryStats?.episodes ? [{ count: memoryStats.episodes }] : [],
      directives: memoryStats?.directives ? [{ count: memoryStats.directives }] : [],
      evolution_stage: evolutionStage,
      total_actions: totalActions,
      last_visit: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: upsertError } = await supabase
      .from("ekk0_pets")
      .upsert(payload, { onConflict: "visitor_id" });

    if (upsertError) {
      console.error("[ekk0/state] Upsert error:", upsertError);
      return NextResponse.json({ saved: false }, { status: 200 });
    }

    return NextResponse.json({
      saved: true,
      evolution_stage: payload.evolution_stage,
      updated_at: payload.updated_at,
    });
  } catch (error) {
    console.error("[ekk0/state] POST error:", error);
    return NextResponse.json({ saved: false }, { status: 200 });
  }
}
