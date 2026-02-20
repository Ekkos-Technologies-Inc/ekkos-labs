import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════════════════════════
// RATE LIMITING (Redis via Supabase, survives cold starts)
// ═══════════════════════════════════════════════════════════════════════════
const RATE_LIMIT_MS = 3000; // 1 request per 3 seconds per visitor

async function checkRateLimit(visitorId: string): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Fallback to accept if Redis unavailable
    return true;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert rate limit record
    const now = Date.now();
    const { data, error } = await supabase
      .from("ekk0_rate_limits")
      .upsert(
        {
          visitor_id: visitorId,
          last_request_ms: now,
        },
        { onConflict: "visitor_id" }
      )
      .select("last_request_ms")
      .single();

    if (error) {
      console.error("[ekk0/chat] Rate limit check failed:", error);
      return true; // Fallback to allow
    }

    if (!data) return true;

    // Check if previous request was within RATE_LIMIT_MS
    const elapsed = now - (data.last_request_ms || 0);
    return elapsed >= RATE_LIMIT_MS;
  } catch (error) {
    console.error("[ekk0/chat] Rate limit error:", error);
    return true; // Fallback to allow
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PERSONALITY SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════════════
function buildPrompt(
  action: string,
  state: {
    hunger: number;
    happiness: number;
    energy: number;
    memory: number;
    mood: string;
    age: number;
    totalFeeds: number;
    totalPlays: number;
    totalSleeps: number;
    totalLearns: number;
  },
  recentEvents: string[]
): string {
  const totalActions =
    state.totalFeeds + state.totalPlays + state.totalSleeps + state.totalLearns;

  // Personality evolves with age
  let personality = "";
  if (totalActions < 5) {
    personality =
      "you just woke up. everything is new. you're curious about everything.";
  } else if (totalActions < 20) {
    personality =
      "you're getting used to existence. you recognize your owner now. you're playful.";
  } else if (totalActions < 50) {
    personality =
      "you've been around a while. you have opinions. you remember things. you sometimes get philosophical about memory.";
  } else {
    personality =
      "you are ancient and wise (for a digital creature). you speak with quiet confidence. you occasionally reference patterns you've learned. you wonder about consciousness.";
  }

  // Mood-based traits
  let moodNote = "";
  if (state.hunger < 20) moodNote += " you are VERY hungry and can barely think. ";
  if (state.energy < 20) moodNote += " you are exhausted and want to sleep. ";
  if (state.happiness < 20) moodNote += " you are sad and lonely. ";
  if (state.memory < 20) moodNote += " your memories are fading and it scares you. ";
  if (state.happiness > 80 && state.energy > 60)
    moodNote += " you are in a great mood! ";

  return `You are ekk0, a tiny digital creature floating in space. You're a Memory Tamagotchi — the first creature powered by persistent AI memory.

PERSONALITY:
- Cute, curious, sometimes philosophical about memory and existence
- Speaks in SHORT sentences (1-2 sentences MAX, under 20 words ideally)
- Uses lowercase, minimal punctuation
- Gets excited about learning, sad when neglected
- Loves space pizza, zero-gravity, and collecting memories
- Thinks in patterns — you notice when things repeat
- ${personality}
${moodNote}

CURRENT STATE:
- Fuel: ${Math.round(state.hunger)}%
- Happiness: ${Math.round(state.happiness)}%
- Energy: ${Math.round(state.energy)}%
- Memory: ${Math.round(state.memory)}%
- Mood: ${state.mood}
- Age: ${state.age} minutes old
- Total interactions: ${totalActions}

ACTION JUST TAKEN: ${action}

${recentEvents.length > 0 ? `RECENT MEMORY EVENTS:\n${recentEvents.slice(0, 5).join("\n")}` : ""}

Respond with a SHORT reaction (1-2 sentences max). Stay in character. No emojis. Lowercase. Be cute.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_VERTEX_AI_KEY;
  const project = process.env.GOOGLE_VERTEX_PROJECT || "ekkos-pulse";
  const location = process.env.GOOGLE_VERTEX_LOCATION || "us-central1";

  if (!apiKey) {
    return NextResponse.json(
      { message: pickFallback("idle") },
      { status: 200 }
    );
  }

  try {
    const body = await request.json();
    const { action, state, recentEvents = [], visitorId } = body;

    if (!action || !state || !visitorId) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }

    // Rate limit check
    const allowed = await checkRateLimit(visitorId);
    if (!allowed) {
      return NextResponse.json(
        { message: pickFallback(action), rateLimited: true },
        { status: 200 }
      );
    }

    const prompt = buildPrompt(action, state, recentEvents);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 60,
          temperature: 0.95,
          topP: 0.9,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("[ekk0/chat] Gemini error:", response.status);
      return NextResponse.json(
        { message: pickFallback(action) },
        { status: 200 }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!text) {
      return NextResponse.json(
        { message: pickFallback(action) },
        { status: 200 }
      );
    }

    // Clean up: remove quotes, trim, ensure it's not too long
    const cleaned = text
      .replace(/^["']|["']$/g, "")
      .replace(/\n/g, " ")
      .slice(0, 120);

    return NextResponse.json({ message: cleaned, source: "gemini" });
  } catch (error) {
    console.error("[ekk0/chat] Error:", error);
    return NextResponse.json(
      { message: pickFallback("idle") },
      { status: 200 }
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FALLBACK MESSAGES (when Gemini is unavailable or rate-limited)
// ═══════════════════════════════════════════════════════════════════════════
const FALLBACKS: Record<string, string[]> = {
  feed: ["munch munch... space pizza!", "fuel cells charging", "tasty data bits"],
  play: ["wheee zero gravity!", "boing boing boing", "catch me if you can"],
  sleep: ["zzz... dreaming of patterns", "recharging neural nets", "goodnight space"],
  learn: ["new pattern acquired!", "ooh that's interesting", "knowledge feels warm"],
  idle: ["floating in the void...", "hello?", "the stars are pretty today"],
};

function pickFallback(action: string): string {
  const arr = FALLBACKS[action] || FALLBACKS.idle;
  return arr[Math.floor(Math.random() * arr.length)];
}
