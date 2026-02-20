'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Live ekkOS MCP Demo ─────────────────────────────────────────────────────
// A 3D glass chatbox that calls Gemini + real ekkOS memory tools.
// Shows raw MCP tool calls in a terminal panel as they happen.

interface ToolCall {
  name: string;
  args: Record<string, unknown>;
  result: unknown;
  duration_ms: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  toolCalls?: ToolCall[];
}

// Suggested prompts
const SUGGESTIONS = [
  'What patterns has ekkOS learned?',
  'Show me the memory stats',
  'Search for cache optimization',
  'What directives are active?',
];

const STORAGE_KEY = 'ekkos-demo-chat';

export function LiveDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeToolCalls, setActiveToolCalls] = useState<ToolCall[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20))); } catch {}
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeToolCalls]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setActiveToolCalls([]);
    setShowTerminal(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/engineering/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await res.json();

      if (data.toolCalls?.length) {
        // Animate tool calls appearing one by one
        for (let i = 0; i < data.toolCalls.length; i++) {
          await new Promise(r => setTimeout(r, 300));
          setActiveToolCalls(prev => [...prev, data.toolCalls[i]]);
        }
        await new Promise(r => setTimeout(r, 200));
      }

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        text: data.text || data.error || 'No response received.',
        toolCalls: data.toolCalls,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Connection error. The demo API may be warming up.',
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 lg:gap-6 max-w-6xl mx-auto">
      {/* ─── Chat Panel (3D Glass) ──────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          border: '1px solid rgba(0, 217, 255, 0.15)',
          boxShadow: '0 0 60px rgba(0, 217, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-white/10 bg-white/[0.03]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-white/40 flex-1">ekkOS Live Demo — Gemini 2.0 Flash + MCP Tools</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400/70 font-mono">LIVE</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[360px] md:h-[420px] overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div>
                <div className="text-lg font-semibold text-white/80 mb-2">Ask the Memory System</div>
                <p className="text-xs text-white/40 max-w-xs">
                  This chatbox runs Gemini with live access to ekkOS MCP tools.
                  Every tool call queries the real production database.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary/80 bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary/15 border border-primary/25 text-white'
                    : 'bg-white/5 border border-white/10 text-white/80'
                }`}
              >
                {msg.role === 'assistant' && msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2 text-[10px] text-primary/60 font-mono">
                    <div className="w-1 h-1 rounded-full bg-primary/50" />
                    {msg.toolCalls.length} tool{msg.toolCalls.length > 1 ? 's' : ''} called
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-white/40 font-mono">
                    {activeToolCalls.length > 0
                      ? `executing ${activeToolCalls[activeToolCalls.length - 1].name}...`
                      : 'thinking...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 md:p-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about patterns, stats, or architecture..."
              disabled={isLoading}
              maxLength={500}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-lg bg-primary/20 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
            >
              Send
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[10px] text-white/20">Powered by Gemini 2.0 Flash + ekkOS MCP</span>
            <div className="flex items-center gap-3">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => { setMessages([]); setActiveToolCalls([]); localStorage.removeItem(STORAGE_KEY); }}
                  className="text-[10px] text-white/30 hover:text-red-400/60 transition-colors"
                >
                  Clear chat
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowTerminal(t => !t)}
                className="text-[10px] text-white/30 hover:text-white/50 transition-colors lg:hidden"
              >
                {showTerminal ? 'Hide' : 'Show'} raw output
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ─── Terminal Panel (Raw MCP Output) ────────────────────────── */}
      <div
        className={`rounded-2xl overflow-hidden ${showTerminal ? 'block' : 'hidden lg:block'}`}
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-green-400/60 uppercase tracking-wider">Raw MCP Output</span>
          <div className="flex-1" />
          {activeToolCalls.length > 0 && (
            <span className="text-[10px] font-mono text-white/30">
              {activeToolCalls.length} call{activeToolCalls.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Terminal Body */}
        <div className="h-[300px] md:h-[440px] overflow-y-auto p-3 md:p-4 font-mono text-[11px] leading-relaxed scrollbar-thin">
          {activeToolCalls.length === 0 && !isLoading ? (
            <div className="text-white/20 italic">
              {messages.length === 0
                ? '// Waiting for query...\n// Tool calls will appear here in real-time\n// as Gemini invokes ekkOS MCP tools.'
                : '// Send a new message to see tool calls.'}
            </div>
          ) : (
            <div className="space-y-4">
              {activeToolCalls.map((tc, i) => (
                <div key={i} className="space-y-1">
                  {/* Tool call header */}
                  <div className="text-green-400/80">
                    <span className="text-green-400/40">{'>'}</span> <span className="text-yellow-400/80">{tc.name}</span>
                    <span className="text-white/20 ml-2">({tc.duration_ms}ms)</span>
                  </div>

                  {/* Args */}
                  {Object.keys(tc.args).length > 0 && (
                    <div className="ml-2 text-white/30">
                      <span className="text-white/15">args:</span>{' '}
                      <span className="text-blue-300/60">{JSON.stringify(tc.args, null, 0)}</span>
                    </div>
                  )}

                  {/* Result preview */}
                  <div className="ml-2 rounded bg-white/[0.03] p-2 border border-white/5 max-h-[180px] overflow-y-auto">
                    <pre className="text-white/40 whitespace-pre-wrap break-all text-[10px]">
                      {JSON.stringify(tc.result, null, 2)?.slice(0, 1200)}
                      {JSON.stringify(tc.result, null, 2)?.length > 1200 ? '\n...' : ''}
                    </pre>
                  </div>
                </div>
              ))}

              {isLoading && activeToolCalls.length > 0 && (
                <div className="text-primary/40 animate-pulse">
                  {'>'} awaiting gemini synthesis...
                </div>
              )}
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
