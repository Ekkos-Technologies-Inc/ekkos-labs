import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════════════════════
// Live ekkOS MCP Demo — Gemini + Real Memory Tools
// ═══════════════════════════════════════════════════════════════════════════════
// Gemini calls ekkOS tools via function calling.
// Tools execute REAL queries against the ekkOS Supabase database.
// Returns tool call chain + final response for raw display.

// ─── Rate limiting ───────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 15;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

// ─── Profanity filter with escalating responses ──────────────────────────────
const BLOCKED_WORDS = [
  'fuck', 'shit', 'ass', 'damn', 'bitch', 'dick', 'cock', 'pussy', 'cunt',
  'nigger', 'nigga', 'faggot', 'fag', 'retard', 'whore', 'slut',
  'kill', 'murder', 'rape', 'suicide', 'bomb', 'hack',
];

function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase().replace(/[^a-z\s]/g, '');
  return BLOCKED_WORDS.some(w => new RegExp(`\\b${w}\\b`).test(lower));
}

const strikeMap = new Map<string, { count: number; resetAt: number }>();
const STRIKE_WINDOW_MS = 30 * 60 * 1000; // 30 min

function getProfanityResponse(ip: string): string {
  const now = Date.now();
  const entry = strikeMap.get(ip);
  if (!entry || now > entry.resetAt) {
    strikeMap.set(ip, { count: 1, resetAt: now + STRIKE_WINDOW_MS });
    return "Hey — this is a technical demo. Try asking about memory patterns, architecture, or how ekkOS works instead.";
  }
  entry.count++;
  const strikes = entry.count;
  if (strikes === 2) return "Seriously? This is an engineering portfolio piece. Ask about the 11-layer memory architecture or something.";
  if (strikes === 3) return "Third time. I have 372 Supabase tables and you're wasting my Gemini tokens on this. Ask a real question.";
  if (strikes === 4) return "You're really committed to this huh. I'm an AI memory system that makes other AIs smarter. What's your excuse?";
  if (strikes === 5) return "Alright, I respect the persistence. But I'm not budging. Ask about patterns, directives, or context eviction. Or don't. I get paid either way.";
  if (strikes >= 6) return "I've now memorized your IP address across all 11 memory layers. Just kidding. But seriously, ask a technical question or go touch grass.";
  return "This is a technical demo — please keep queries related to the ekkOS memory system.";
}

// ─── ekkOS Tool Definitions (Gemini function calling format) ─────────────────
const EKKOS_TOOLS = [
  {
    functionDeclarations: [
      {
        name: 'ekkOS_Search',
        description: 'Search ekkOS memory across all layers. Returns patterns (proven solutions), episodic memories, and semantic knowledge matching the query.',
        parameters: {
          type: 'OBJECT',
          properties: {
            query: { type: 'STRING', description: 'The search query to find relevant patterns and memories' },
          },
          required: ['query'],
        },
      },
      {
        name: 'ekkOS_Stats',
        description: 'Get statistics for all 11 ekkOS memory layers. Returns counts of patterns, directives, episodes, and other metrics.',
        parameters: {
          type: 'OBJECT',
          properties: {},
        },
      },
      {
        name: 'ekkOS_GetRecentPatterns',
        description: 'Get the most recently created or applied patterns from ekkOS memory. Shows what the system has learned recently.',
        parameters: {
          type: 'OBJECT',
          properties: {
            limit: { type: 'NUMBER', description: 'Max patterns to return (default 5)' },
          },
        },
      },
      {
        name: 'ekkOS_SearchDirectives',
        description: 'Search user directives (MUST/NEVER/PREFER/AVOID rules) stored in Layer 9.',
        parameters: {
          type: 'OBJECT',
          properties: {
            scope: { type: 'STRING', description: 'Filter by scope: global, project, or a specific scope' },
          },
        },
      },
    ],
  },
];

// ─── Tool Execution (Real Supabase Queries) ──────────────────────────────────
const DEMO_USER_ID = process.env.EKKOS_DEMO_USER_ID || '';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase not configured');
  return createClient(url, key);
}

// Extract problem/solution sections from pattern content (markdown format)
function parseContent(content: string | null): { problem: string; solution: string } {
  if (!content) return { problem: '', solution: '' };
  const problemMatch = content.match(/## Problem\n([\s\S]*?)(?=\n## Solution|$)/);
  const solutionMatch = content.match(/## Solution\n([\s\S]*?)$/);
  return {
    problem: problemMatch?.[1]?.trim() || '',
    solution: solutionMatch?.[1]?.trim() || '',
  };
}

async function executeToolCall(name: string, args: Record<string, unknown>): Promise<unknown> {
  const supabase = getSupabase();

  switch (name) {
    case 'ekkOS_Search': {
      const query = (args.query as string) || '';
      // Word-level search for broader matching
      const words = query.split(/\s+/).filter(w => w.length > 2);
      const searchFilter = words.length > 0
        ? words.map(w => `title.ilike.%${w}%,content.ilike.%${w}%`).join(',')
        : `title.ilike.%${query}%,content.ilike.%${query}%`;

      let queryBuilder = supabase
        .from('patterns')
        .select('pattern_id, title, content, confidence_score, success_rate, applied_count, tags, created_at')
        .or(searchFilter)
        .order('confidence_score', { ascending: false })
        .limit(5);

      if (DEMO_USER_ID) {
        queryBuilder = queryBuilder.or(`user_id.eq.${DEMO_USER_ID},user_id.is.null`);
      }

      const { data: patterns } = await queryBuilder;

      // Fallback: if no results, return top patterns by applied_count
      let results = patterns || [];
      if (results.length === 0 && DEMO_USER_ID) {
        const { data: fallback } = await supabase
          .from('patterns')
          .select('pattern_id, title, content, confidence_score, success_rate, applied_count, tags, created_at')
          .or(`user_id.eq.${DEMO_USER_ID},user_id.is.null`)
          .order('applied_count', { ascending: false })
          .limit(5);
        results = fallback || [];
      }

      return {
        tool: 'ekkOS_Search',
        query,
        results: {
          patterns: results.map(p => {
            const { problem, solution } = parseContent(p.content);
            return {
              id: p.pattern_id,
              title: p.title,
              problem: problem.slice(0, 150),
              solution: solution.slice(0, 150),
              confidence: p.confidence_score,
              success_rate: p.success_rate,
              applied_count: p.applied_count,
              tags: p.tags?.slice(0, 5),
            };
          }),
          total: results.length,
        },
      };
    }

    case 'ekkOS_Stats': {
      const userFilter = DEMO_USER_ID
        ? [
            supabase.from('patterns').select('pattern_id', { count: 'exact', head: true }).or(`user_id.eq.${DEMO_USER_ID},user_id.is.null`),
            supabase.from('user_directives').select('id', { count: 'exact', head: true }).eq('user_id', DEMO_USER_ID),
            supabase.from('turn_embeddings').select('id', { count: 'exact', head: true }).eq('user_id', DEMO_USER_ID),
            supabase.from('encrypted_secrets').select('id', { count: 'exact', head: true }).eq('user_id', DEMO_USER_ID),
          ]
        : [
            supabase.from('patterns').select('pattern_id', { count: 'exact', head: true }),
            supabase.from('user_directives').select('id', { count: 'exact', head: true }),
            supabase.from('turn_embeddings').select('id', { count: 'exact', head: true }),
            supabase.from('encrypted_secrets').select('id', { count: 'exact', head: true }),
          ];

      const [patterns, directives, episodes, secrets] = await Promise.all(userFilter);

      return {
        tool: 'ekkOS_Stats',
        layers: {
          'L4 Patterns': { count: patterns.count || 0, description: 'Proven solutions with confidence scoring' },
          'L9 Directives': { count: directives.count || 0, description: 'MUST/NEVER/PREFER/AVOID behavioral rules' },
          'L2 Episodic': { count: episodes.count || 0, description: 'Embedded conversation turns' },
          'L11 Secrets': { count: secrets.count || 0, description: 'AES-256-GCM encrypted credentials' },
        },
        total_layers: 11,
        status: 'healthy',
      };
    }

    case 'ekkOS_GetRecentPatterns': {
      const limit = Math.min((args.limit as number) || 5, 10);
      let queryBuilder = supabase
        .from('patterns')
        .select('pattern_id, title, content, confidence_score, tags, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (DEMO_USER_ID) {
        queryBuilder = queryBuilder.or(`user_id.eq.${DEMO_USER_ID},user_id.is.null`);
      }

      const { data } = await queryBuilder;

      return {
        tool: 'ekkOS_GetRecentPatterns',
        patterns: (data || []).map(p => {
          const { problem } = parseContent(p.content);
          return {
            id: p.pattern_id,
            title: p.title,
            problem: problem.slice(0, 120),
            confidence: p.confidence_score,
            tags: p.tags?.slice(0, 4),
            created_at: p.created_at,
          };
        }),
      };
    }

    case 'ekkOS_SearchDirectives': {
      const scope = (args.scope as string) || 'global';
      let queryBuilder = supabase
        .from('user_directives')
        .select('id, type, rule, scope, priority, reason, created_at')
        .eq('is_active', true)
        .eq('is_deleted', false)
        .ilike('scope', `%${scope}%`)
        .order('priority', { ascending: false })
        .limit(8);

      if (DEMO_USER_ID) {
        queryBuilder = queryBuilder.eq('user_id', DEMO_USER_ID);
      }

      const { data } = await queryBuilder;

      return {
        tool: 'ekkOS_SearchDirectives',
        scope,
        directives: (data || []).map(d => ({
          type: d.type,
          rule: d.rule?.slice(0, 120),
          scope: d.scope,
          priority: d.priority,
        })),
      };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ─── Gemini API Call ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a live demo of ekkOS — the 11-layer cognitive memory system for AI agents.
You have access to REAL ekkOS memory tools querying a live production database. Use them to answer questions.
When asked about patterns, stats, or architecture, ALWAYS use your tools to fetch real data first.
Be concise but impressive. Show real numbers, real pattern titles, real data.
If a search returns results, summarize the most interesting findings with specific details.
If asked about something and search returns empty, try a broader search or show stats instead. Never say "no results found" — always provide value.
You're running on Gemini 2.0 Flash with live MCP tool access to all 11 memory layers.`;

interface GeminiContent {
  role: string;
  parts: Array<Record<string, unknown>>;
}

async function callGemini(contents: GeminiContent[], tools: unknown[]) {
  const apiKey = process.env.GOOGLE_VERTEX_AI_KEY || process.env.GOOGLE_AI_API_KEY;
  const project = process.env.GOOGLE_VERTEX_PROJECT || 'ekkos-pulse';
  const location = process.env.GOOGLE_VERTEX_LOCATION || 'us-central1';

  if (!apiKey) throw new Error('Gemini API key not configured');

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      tools,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.7,
      },
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${text.slice(0, 200)}`);
  }

  return response.json();
}

// ─── Main Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limited. Try again in a few minutes.', toolCalls: [] },
      { status: 429 }
    );
  }

  try {
    const { message, history = [] } = await request.json();
    if (!message || typeof message !== 'string' || message.length > 500) {
      return NextResponse.json(
        { error: 'Invalid message', toolCalls: [] },
        { status: 400 }
      );
    }

    if (containsProfanity(message)) {
      return NextResponse.json({
        text: getProfanityResponse(ip),
        toolCalls: [],
        model: 'gemini-2.0-flash',
      });
    }

    // Build conversation history
    const contents: GeminiContent[] = [];

    // Add previous turns
    for (const turn of history.slice(-6)) {
      contents.push({
        role: turn.role === 'user' ? 'user' : 'model',
        parts: [{ text: turn.text }],
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const toolCalls: Array<{ name: string; args: Record<string, unknown>; result: unknown; duration_ms: number }> = [];
    let maxToolRounds = 3;

    // Tool-calling loop
    while (maxToolRounds > 0) {
      maxToolRounds--;
      const data = await callGemini(contents, EKKOS_TOOLS);
      const candidate = data?.candidates?.[0];
      if (!candidate?.content?.parts) break;

      const parts = candidate.content.parts;

      // Check for function calls
      const functionCall = parts.find((p: Record<string, unknown>) => p.functionCall);
      if (functionCall?.functionCall) {
        const { name, args } = functionCall.functionCall as { name: string; args: Record<string, unknown> };

        // Execute the real tool
        const start = Date.now();
        const result = await executeToolCall(name, args || {});
        const duration_ms = Date.now() - start;

        toolCalls.push({ name, args: args || {}, result, duration_ms });

        // Add function call + response to conversation
        contents.push({
          role: 'model',
          parts: [{ functionCall: { name, args: args || {} } }],
        });
        contents.push({
          role: 'user',
          parts: [{ functionResponse: { name, response: result } }],
        });

        continue; // Let Gemini process the tool result
      }

      // Text response — we're done
      const text = parts.find((p: Record<string, unknown>) => p.text);
      if (text?.text) {
        return NextResponse.json({
          text: text.text,
          toolCalls,
          model: 'gemini-2.0-flash',
        });
      }

      break;
    }

    // Fallback if loop exits without text
    return NextResponse.json({
      text: 'The memory system is processing. Try asking about patterns, stats, or how the architecture works.',
      toolCalls,
      model: 'gemini-2.0-flash',
    });

  } catch (error) {
    console.error('[engineering/chat] Error:', error);
    return NextResponse.json(
      {
        text: 'The demo encountered an error. The ekkOS system is still operational.',
        toolCalls: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 } // Return 200 so UI can show the error gracefully
    );
  }
}
