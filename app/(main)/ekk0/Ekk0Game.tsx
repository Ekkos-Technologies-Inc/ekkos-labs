"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface GameState {
  hunger: number;
  happiness: number;
  energy: number;
  memory: number;
  age: number;
  born: number;
  lastTick: number;
  alive: boolean;
  mood: string;
  totalFeeds: number;
  totalPlays: number;
  totalSleeps: number;
  totalLearns: number;
}

interface MemoryEvent {
  id: string;
  type: "capture" | "pattern" | "directive" | "decay" | "recall";
  icon: string;
  title: string;
  detail: string;
  timestamp: number;
  layer: string;
}

interface Particle {
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const PX = 8;

const PAL = [
  "",         // 0 transparent
  "#121220", // 1 outline
  "#2c2c3e", // 2 darkest
  "#4a4a62", // 3 dark
  "#6e6e8a", // 4 medium
  "#9898b4", // 5 light
  "#bbbbd2", // 6 lighter
  "#dddde8", // 7 near white
  "#f4f4ff", // 8 highlight
];

const BASE_SPRITE = [
  [0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,7,7,7,7,7,1,0,0,0,0,0],
  [0,0,0,0,1,7,7,7,7,7,7,7,1,0,0,0,0],
  [0,0,0,1,7,7,7,7,7,7,7,7,7,1,0,0,0],
  [0,0,0,1,7,1,1,1,1,1,1,1,7,1,0,0,0],
  [0,0,1,7,1,1,1,1,1,1,1,1,1,7,1,0,0],
  [0,0,1,7,1,1,8,8,1,1,1,1,1,7,1,0,0],
  [0,0,1,7,1,1,1,8,1,1,1,1,1,7,1,0,0],
  [0,0,1,7,1,1,1,1,1,1,8,1,1,7,1,0,0],
  [0,0,1,7,1,1,1,1,1,1,1,1,1,7,1,0,0],
  [0,0,0,1,7,1,1,1,1,1,1,1,7,1,0,0,0],
  [0,0,0,1,7,7,6,6,6,6,6,7,7,1,0,0,0],
  [0,0,0,0,1,7,7,7,7,7,7,7,1,0,0,0,0],
  [0,0,0,0,0,1,6,6,6,6,6,1,0,0,0,0,0],
  [0,0,0,0,1,5,6,6,6,6,6,5,1,0,0,0,0],
  [0,0,0,1,5,5,6,6,6,6,6,5,5,1,0,0,0],
  [0,0,1,3,5,5,6,6,6,6,6,5,5,3,1,0,0],
  [0,0,1,3,5,5,5,1,1,1,5,5,5,3,1,0,0],
  [0,0,1,3,5,5,1,0,0,0,1,5,5,3,1,0,0],
  [0,0,1,3,5,5,5,1,1,1,5,5,5,3,1,0,0],
  [0,0,1,3,5,5,5,5,5,5,5,5,5,3,1,0,0],
  [0,0,0,1,3,5,5,5,5,5,5,5,3,1,0,0,0],
  [0,0,0,1,3,5,5,1,1,5,5,5,3,1,0,0,0],
  [0,0,0,1,3,5,1,0,0,1,5,5,3,1,0,0,0],
  [0,0,0,1,2,3,1,0,0,1,3,3,2,1,0,0,0],
  [0,0,0,1,1,1,1,0,0,1,1,1,1,1,0,0,0],
];

function makeHappy() {
  return BASE_SPRITE.map((r, y) => {
    const row = [...r];
    if (y === 15) { row[1] = 1; row[2] = 5; row[14] = 5; row[15] = 1; }
    if (y === 14) { row[1] = 1; row[2] = 5; row[14] = 5; row[15] = 1; }
    if (y === 13) { row[2] = 1; row[3] = 5; row[13] = 5; row[14] = 1; }
    return row;
  });
}

function makeSleeping() {
  return BASE_SPRITE.map((r, y) => {
    const row = [...r];
    if (y >= 4 && y <= 10) {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 8) row[x] = 3;
      }
    }
    return row;
  });
}

function makeSad() {
  return BASE_SPRITE.map((r) => {
    const row = [...r];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === 7) row[x] = 6;
      if (row[x] === 6) row[x] = 5;
      if (row[x] === 8) row[x] = 4;
    }
    return row;
  });
}

const SPRITES: Record<string, number[][]> = {
  idle: BASE_SPRITE,
  happy: makeHappy(),
  sleeping: makeSleeping(),
  eating: BASE_SPRITE.map((r) => [...r]),
  learning: BASE_SPRITE.map((r) => [...r]),
  sad: makeSad(),
};

const MEMORY_PATTERNS: Record<string, { title: string; detail: string }[]> = {
  feed: [
    { title: "Nutrition cycle recognised", detail: "Feeding restores 25 fuel + 5 energy" },
    { title: "Caloric preference logged", detail: "Space pizza is the preferred fuel source" },
    { title: "Metabolic pattern", detail: "Fuel depletes at 1.2x base rate" },
  ],
  play: [
    { title: "Joy response calibrated", detail: "Play increases happiness by 20 points" },
    { title: "Energy trade-off learned", detail: "Play costs 10 energy but boosts mood significantly" },
    { title: "Social bonding pattern", detail: "Interaction frequency correlates with happiness baseline" },
  ],
  sleep: [
    { title: "Recharge cycle optimised", detail: "Sleep restores 35 energy + 5 happiness" },
    { title: "Rest requirement pattern", detail: "Energy below 15% triggers fatigue state" },
    { title: "Circadian rhythm detected", detail: "Sleep efficiency improves with consistent timing" },
  ],
  learn: [
    { title: "Knowledge acquisition", detail: "Learning adds 15 to memory capacity" },
    { title: "Cognitive cost measured", detail: "Learning costs 8 energy and 3 fuel" },
    { title: "Memory reinforcement", detail: "Repeated learning prevents memory decay" },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function Ekk0Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(loadState());
  const particlesRef = useRef<Particle[]>([]);
  const tRef = useRef(0);
  const actionRef = useRef<string | null>(null);
  const actionTimerRef = useRef(0);
  const rafRef = useRef<number>(0);
  const visitorIdRef = useRef<string>(getVisitorId());
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [stats, setStats] = useState({
    hunger: stateRef.current.hunger,
    happiness: stateRef.current.happiness,
    energy: stateRef.current.energy,
    memory: stateRef.current.memory,
  });
  const [mood, setMood] = useState(stateRef.current.mood);
  const [speechBubble, setSpeechBubble] = useState("");
  const [speechSource, setSpeechSource] = useState<"gemini" | "local">("local");
  const [speechVisible, setSpeechVisible] = useState(false);
  const [age, setAge] = useState(stateRef.current.age);
  const [alive, setAlive] = useState(stateRef.current.alive);
  const [events, setEvents] = useState<MemoryEvent[]>([]);
  const [memoryStats, setMemoryStats] = useState({
    patterns: 0,
    episodes: 0,
    directives: 0,
    decayed: 0,
  });
  const [cloudStatus, setCloudStatus] = useState<"loading" | "synced" | "offline">("loading");

  // Stars (stable across renders)
  const starsRef = useRef(
    Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      ts: Math.random() * 0.025 + 0.005,
      to: Math.random() * Math.PI * 2,
    }))
  );

  // ─── CLOUD PERSISTENCE ────────────────────────────────────────────────────

  const loadFromCloud = useCallback(async () => {
    try {
      const res = await fetch(`/api/ekk0/state?visitor_id=${visitorIdRef.current}`);
      const data = await res.json();
      if (data.state && data.state.born) {
        // Cloud state exists — restore it
        Object.assign(stateRef.current, data.state);
        stateRef.current.lastTick = Date.now();
        setStats({
          hunger: stateRef.current.hunger,
          happiness: stateRef.current.happiness,
          energy: stateRef.current.energy,
          memory: stateRef.current.memory,
        });
        setMood(stateRef.current.mood);
        setAge(stateRef.current.age);
        setAlive(stateRef.current.alive);
        if (data.total_actions) {
          setMemoryStats((prev) => ({ ...prev, patterns: Math.floor(data.total_actions / 3) }));
        }
        saveStateLocal(stateRef.current);
        setCloudStatus("synced");
        return;
      }
      setCloudStatus("synced");
    } catch {
      setCloudStatus("offline");
    }
  }, []);

  const saveToCloud = useCallback(async () => {
    try {
      await fetch("/api/ekk0/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_id: visitorIdRef.current,
          state: stateRef.current,
          memoryStats,
        }),
      });
      setCloudStatus("synced");
    } catch {
      setCloudStatus("offline");
    }
  }, [memoryStats]);

  const debouncedSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveToCloud();
    }, 2000);
  }, [saveToCloud]);

  // Load from cloud on mount
  useEffect(() => {
    loadFromCloud();
  }, [loadFromCloud]);

  // ─── CHAT WITH GEMINI ─────────────────────────────────────────────────────

  const fetchChat = useCallback(
    async (action: string) => {
      try {
        const recentEvents = events.slice(0, 5).map(
          (e) => `${e.title}: ${e.detail}`
        );

        const res = await fetch("/api/ekk0/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            state: stateRef.current,
            recentEvents,
            visitorId: visitorIdRef.current,
          }),
        });

        const data = await res.json();
        if (data.message) {
          setSpeechBubble(data.message);
          setSpeechSource(data.source === "gemini" ? "gemini" : "local");
          setSpeechVisible(true);
          setTimeout(() => setSpeechVisible(false), 5000);
        }
      } catch {
        // Silent — fallback messages already shown via local state
      }
    },
    [events]
  );

  // ─── MEMORY EVENTS ────────────────────────────────────────────────────────

  const addMemoryEvent = useCallback(
    (
      type: MemoryEvent["type"],
      icon: string,
      title: string,
      detail: string,
      layer: string
    ) => {
      const ev: MemoryEvent = {
        id: crypto.randomUUID(),
        type,
        icon,
        title,
        detail,
        timestamp: Date.now(),
        layer,
      };
      setEvents((prev) => [ev, ...prev].slice(0, 50));

      setMemoryStats((prev) => {
        const next = { ...prev };
        if (type === "pattern") next.patterns++;
        if (type === "capture") next.episodes++;
        if (type === "directive") next.directives++;
        if (type === "decay") next.decayed++;
        return next;
      });
    },
    []
  );

  const spawnParticles = useCallback(
    (type: string, count: number, canvas: HTMLCanvasElement) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 - 20;
      const newP: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newP.push({
          type,
          x: cx + (Math.random() - 0.5) * 60,
          y: cy + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 0.5,
          life: 60 + Math.random() * 40,
          maxLife: 100,
          size: Math.random() * 3 + 2,
        });
      }
      particlesRef.current.push(...newP);
    },
    []
  );

  const doAction = useCallback(
    (action: string) => {
      const s = stateRef.current;
      const canvas = canvasRef.current;
      if (!s.alive || actionRef.current || !canvas) return;

      actionRef.current = action;
      actionTimerRef.current = 120;

      switch (action) {
        case "feed":
          s.hunger = Math.min(100, s.hunger + 25);
          s.energy = Math.min(100, s.energy + 5);
          s.totalFeeds++;
          s.mood = "eating";
          spawnParticles("food", 5, canvas);
          break;
        case "play":
          s.happiness = Math.min(100, s.happiness + 20);
          s.hunger = Math.max(0, s.hunger - 5);
          s.energy = Math.max(0, s.energy - 10);
          s.totalPlays++;
          s.mood = "happy";
          spawnParticles("star", 8, canvas);
          break;
        case "sleep":
          s.energy = Math.min(100, s.energy + 35);
          s.happiness = Math.min(100, s.happiness + 5);
          s.totalSleeps++;
          s.mood = "sleeping";
          spawnParticles("zzz", 3, canvas);
          break;
        case "learn":
          s.memory = Math.min(100, s.memory + 15);
          s.energy = Math.max(0, s.energy - 8);
          s.hunger = Math.max(0, s.hunger - 3);
          s.totalLearns++;
          s.mood = "learning";
          spawnParticles("brain", 6, canvas);
          break;
      }

      // Fetch LLM response (non-blocking)
      fetchChat(action);

      // ekkOS_Capture — episodic memory
      addMemoryEvent(
        "capture",
        action === "feed" ? "🍕" : action === "play" ? "🎮" : action === "sleep" ? "💤" : "🧠",
        `ekkOS_Capture: ${action}`,
        `Action logged. Fuel:${Math.round(s.hunger)}% Happy:${Math.round(s.happiness)}% Energy:${Math.round(s.energy)}%`,
        "L2 Episodic"
      );

      // ekkOS_Forge — pattern learning (every 3rd action)
      const totalActions = s.totalFeeds + s.totalPlays + s.totalSleeps + s.totalLearns;
      if (totalActions > 0 && totalActions % 3 === 0) {
        const patterns = MEMORY_PATTERNS[action];
        if (patterns) {
          const p = patterns[Math.floor(Math.random() * patterns.length)];
          setTimeout(() => {
            addMemoryEvent("pattern", "⚡", `ekkOS_Forge: ${p.title}`, p.detail, "L4 Patterns");
          }, 800);
        }
      }

      // ekkOS_Directive — learned preferences (every 10th action)
      if (totalActions > 0 && totalActions % 10 === 0) {
        const directives = [
          { title: "[PREFER] Owner tends to feed before play", detail: "Behavioural sequence detected across 10+ interactions" },
          { title: "[MUST] Maintain energy above 15%", detail: "Critical threshold — below this, cognitive function degrades" },
          { title: "[AVOID] Learning on empty fuel", detail: "Knowledge retention drops 40% when fuel < 20%" },
        ];
        const d = directives[Math.floor(Math.random() * directives.length)];
        setTimeout(() => {
          addMemoryEvent("directive", "📜", `ekkOS_Directive: ${d.title}`, d.detail, "L9 Directives");
        }, 1500);
      }

      saveStateLocal(s);
      debouncedSave();
    },
    [addMemoryEvent, spawnParticles, fetchChat, debouncedSave]
  );

  const handleReset = useCallback(() => {
    const s = stateRef.current;
    Object.assign(s, {
      hunger: 80, happiness: 70, energy: 90, memory: 50,
      age: 0, born: Date.now(), lastTick: Date.now(),
      alive: true, mood: "idle",
      totalFeeds: 0, totalPlays: 0, totalSleeps: 0, totalLearns: 0,
    });
    setAlive(true);
    setSpeechBubble("systems online... hello again");
    setSpeechSource("local");
    setSpeechVisible(true);
    setTimeout(() => setSpeechVisible(false), 4000);
    setEvents([]);
    setMemoryStats({ patterns: 0, episodes: 0, directives: 0, decayed: 0 });
    saveStateLocal(s);
    debouncedSave();
  }, [debouncedSave]);

  // ─── GAME LOOP ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastSave = 0;
    let decayTimer = 0;

    function tick() {
      const s = stateRef.current;
      if (!s.alive) return;

      const now = Date.now();
      const elapsed = (now - s.lastTick) / 1000;
      s.lastTick = now;
      s.age = Math.floor((now - s.born) / 60000);

      const decayAmount = elapsed / 10;
      s.hunger = Math.max(0, s.hunger - decayAmount * 1.2);
      s.happiness = Math.max(0, s.happiness - decayAmount * 0.8);
      s.energy = Math.max(0, s.energy - decayAmount * 0.6);
      s.memory = Math.max(0, s.memory - decayAmount * 0.4);

      if (!actionRef.current) {
        if (s.hunger < 20 || s.happiness < 20 || s.energy < 15) {
          s.mood = "sad";
        } else {
          s.mood = "idle";
        }
      }

      if (s.hunger <= 0 && s.energy <= 0) {
        s.alive = false;
        s.mood = "sad";
        setAlive(false);
        setSpeechBubble("memory fading... systems failing...");
        setSpeechSource("local");
        setSpeechVisible(true);
      }

      if (actionTimerRef.current > 0) {
        actionTimerRef.current--;
        if (actionTimerRef.current === 0) {
          actionRef.current = null;
          s.mood = "idle";
        }
      }

      setStats({
        hunger: s.hunger,
        happiness: s.happiness,
        energy: s.energy,
        memory: s.memory,
      });
      setMood(s.mood);
      setAge(s.age);
    }

    function render() {
      if (!ctx || !canvas) return;
      tRef.current++;
      const t = tRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const s = stateRef.current;

      ctx.fillStyle = "#0c0c18";
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const star of starsRef.current) {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * star.ts + star.to));
        ctx.fillStyle = `rgba(180, 190, 240, ${tw})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const sprite = SPRITES[s.mood] || BASE_SPRITE;
      const SW = sprite[0].length;
      const SH = sprite.length;

      let bobY = Math.sin(t * 0.025) * 6;
      let bobX = Math.sin(t * 0.015) * 2;
      if (s.mood === "sleeping") { bobY = Math.sin(t * 0.01) * 2; bobX = 0; }
      if (s.mood === "happy") { bobY = Math.sin(t * 0.06) * 10; }
      if (!s.alive) { bobY = t * 0.3; bobX = 0; }

      const ox = Math.floor(w / 2 - (SW * PX) / 2 + bobX);
      const oy = Math.floor(h / 2 - (SH * PX) / 2 + bobY - 15);

      // Glow
      let glowColor = "rgba(100, 140, 255, 0.05)";
      if (s.mood === "happy") glowColor = "rgba(255, 220, 100, 0.08)";
      if (s.mood === "learning") glowColor = "rgba(180, 100, 255, 0.08)";
      if (s.mood === "sad") glowColor = "rgba(100, 100, 140, 0.03)";

      const grd = ctx.createRadialGradient(
        ox + (SW * PX) / 2, oy + (SH * PX) / 2, 10,
        ox + (SW * PX) / 2, oy + (SH * PX) / 2, SW * PX
      );
      grd.addColorStop(0, glowColor);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Draw sprite
      for (let y = 0; y < SH; y++) {
        for (let x = 0; x < SW; x++) {
          const val = sprite[y][x];
          if (val === 0) continue;
          if (val === 8) {
            const shimmer = 0.4 + 0.6 * Math.sin(t * 0.04 + x * 0.5 + y * 0.3);
            ctx.fillStyle = `rgba(244, 244, 255, ${shimmer})`;
          } else {
            ctx.fillStyle = PAL[val];
          }
          ctx.fillRect(ox + x * PX, oy + y * PX, PX, PX);
        }
      }

      // Particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.life--;
        const alpha = p.life / p.maxLife;
        if (p.type === "star") {
          ctx.fillStyle = `rgba(255, 230, 100, ${alpha})`;
          ctx.fillRect(p.x - 1, p.y - 1, p.size, p.size);
        } else if (p.type === "food") {
          ctx.fillStyle = `rgba(255, 140, 80, ${alpha})`;
          ctx.fillRect(p.x, p.y, p.size + 1, p.size + 1);
        } else if (p.type === "zzz") {
          ctx.fillStyle = `rgba(120, 160, 255, ${alpha})`;
          ctx.font = `${10 + (1 - alpha) * 8}px monospace`;
          ctx.fillText("Z", p.x, p.y);
        } else if (p.type === "brain") {
          ctx.fillStyle = `rgba(200, 120, 255, ${alpha})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      if (s.mood === "sleeping" && Math.random() < 0.02) {
        spawnParticles("zzz", 1, canvas);
      }
    }

    function loop() {
      tick();
      render();

      // Memory decay events (every ~30s)
      decayTimer++;
      if (decayTimer > 1800) {
        decayTimer = 0;
        const s = stateRef.current;
        if (s.memory < 30 && s.alive) {
          addMemoryEvent(
            "decay",
            "📉",
            "ekkOS_Decay: Pattern confidence fading",
            `Memory at ${Math.round(s.memory)}%. Unused patterns losing strength.`,
            "L7 Meta"
          );
        }
      }

      // Auto-save locally
      if (++lastSave > 600) {
        saveStateLocal(stateRef.current);
        lastSave = 0;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [addMemoryEvent, spawnParticles]);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  const h = Math.floor(age / 60);
  const m = age % 60;

  const totalActions =
    stateRef.current.totalFeeds +
    stateRef.current.totalPlays +
    stateRef.current.totalSleeps +
    stateRef.current.totalLearns;

  // Evolution stage label
  let evolutionLabel = "Spark";
  if (totalActions >= 100) evolutionLabel = "Oracle";
  else if (totalActions >= 50) evolutionLabel = "Thinker";
  else if (totalActions >= 20) evolutionLabel = "Learner";

  const statBars: { id: string; label: string; value: number; gradient: string }[] = [
    { id: "hunger", label: "FUEL", value: stats.hunger, gradient: "from-orange-500 to-orange-400" },
    { id: "happiness", label: "HAPPY", value: stats.happiness, gradient: "from-yellow-500 to-yellow-400" },
    { id: "energy", label: "ENERGY", value: stats.energy, gradient: "from-blue-500 to-blue-400" },
    { id: "memory", label: "MEMORY", value: stats.memory, gradient: "from-purple-500 to-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      {/* Hero */}
      <div className="mx-auto max-w-5xl px-6 pt-12 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
          ekkOS Labs Tech Demo
        </p>
        <h1 className="mb-3 text-4xl font-bold text-white lg:text-5xl">
          meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">ekk0</span>
        </h1>
        <p className="mb-10 text-lg text-white/60">
          The first creature powered by persistent AI memory. Every action is captured,
          patterns are learned, and memories decay — just like in the real ekkOS system.
        </p>
      </div>

      {/* Game + Memory Feed */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          {/* LEFT: Device */}
          <div>
            <div className="relative rounded-[32px] bg-gradient-to-b from-[#2a2a40] to-[#1a1a2e] p-6 shadow-2xl ring-1 ring-white/5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold tracking-[4px] text-white/20">
                  ekk0
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] text-white/30">{evolutionLabel}</span>
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      cloudStatus === "synced"
                        ? "bg-green-500"
                        : cloudStatus === "loading"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                    }`}
                    title={cloudStatus === "synced" ? "Cloud synced" : cloudStatus === "loading" ? "Loading..." : "Offline"}
                  />
                </div>
              </div>

              {/* Screen + Speech Bubble */}
              <div className="relative rounded-xl bg-[#0a0a12] p-2 shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={280}
                  className="block w-full rounded-lg"
                  style={{ imageRendering: "pixelated" }}
                />

                {/* Speech Bubble Overlay */}
                {speechVisible && speechBubble && (
                  <div
                    className={`absolute left-1/2 top-3 -translate-x-1/2 max-w-[280px] rounded-xl px-4 py-2.5 text-center text-xs leading-relaxed shadow-lg transition-all duration-300 ${
                      speechSource === "gemini"
                        ? "border border-purple-500/30 bg-[#1a1030]/95 text-purple-200"
                        : "border border-white/10 bg-[#1a1a2e]/95 text-white/70"
                    }`}
                  >
                    <p>{speechBubble}</p>
                    {speechSource === "gemini" && (
                      <p className="mt-1 text-[8px] text-purple-400/50">powered by gemini</p>
                    )}
                    {/* Speech bubble tail */}
                    <div
                      className={`absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 ${
                        speechSource === "gemini"
                          ? "border-b border-r border-purple-500/30 bg-[#1a1030]/95"
                          : "border-b border-r border-white/10 bg-[#1a1a2e]/95"
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {statBars.map((s) => (
                  <div key={s.id}>
                    <div className="mb-1 flex justify-between text-[9px] font-bold text-white/40">
                      <span>{s.label}</span>
                      <span>{Math.round(s.value)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-black/50">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${s.gradient} transition-all duration-500 ${s.value < 25 ? "animate-pulse" : ""}`}
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  { action: "feed", icon: "🍕", label: "FEED" },
                  { action: "play", icon: "🎮", label: "PLAY" },
                  { action: "sleep", icon: "💤", label: "SLEEP" },
                  { action: "learn", icon: "🧠", label: "LEARN" },
                ].map((btn) => (
                  <button
                    key={btn.action}
                    onClick={() => doAction(btn.action)}
                    disabled={!alive}
                    className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center transition-all hover:border-white/20 hover:bg-white/10 active:scale-95 disabled:opacity-30"
                  >
                    <span className="block text-lg">{btn.icon}</span>
                    <span className="block text-[8px] font-bold text-white/50">{btn.label}</span>
                  </button>
                ))}
              </div>

              {/* Age + stats */}
              <p className="mt-3 text-center text-[8px] text-white/25">
                AGE: {h}h {m}m · ACTIONS: {totalActions} · FED:{stateRef.current.totalFeeds} PLAY:{stateRef.current.totalPlays} SLEEP:{stateRef.current.totalSleeps} LEARN:{stateRef.current.totalLearns}
              </p>

              {!alive && (
                <button
                  onClick={handleReset}
                  className="mt-3 w-full rounded-lg bg-purple-600 py-2 text-xs font-bold text-white transition-colors hover:bg-purple-500"
                >
                  REBOOT ekk0
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Memory Feed */}
          <div className="flex flex-col gap-4">
            {/* Memory Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Patterns", value: memoryStats.patterns, icon: "⚡", color: "text-yellow-400" },
                { label: "Episodes", value: memoryStats.episodes, icon: "💭", color: "text-blue-400" },
                { label: "Directives", value: memoryStats.directives, icon: "📜", color: "text-green-400" },
                { label: "Decayed", value: memoryStats.decayed, icon: "📉", color: "text-red-400" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="block text-lg">{s.icon}</span>
                  <span className={`block text-xl font-bold ${s.color}`}>{s.value}</span>
                  <span className="block text-[10px] text-white/40">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Live Feed */}
            <div className="flex-1 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="border-b border-white/5 px-4 py-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                  Memory Feed <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                </h3>
              </div>
              <div className="h-[420px] overflow-y-auto p-3">
                {events.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-xs text-white/20">
                      Interact with ekk0 to see<br />ekkOS memory in action
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className={`rounded-lg border p-3 transition-all ${
                          ev.type === "pattern"
                            ? "border-yellow-500/20 bg-yellow-500/5"
                            : ev.type === "directive"
                            ? "border-green-500/20 bg-green-500/5"
                            : ev.type === "decay"
                            ? "border-red-500/20 bg-red-500/5"
                            : "border-white/5 bg-white/[0.02]"
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm">{ev.icon}</span>
                          <span className="flex-1 text-[11px] font-semibold text-white/80">{ev.title}</span>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] font-mono text-white/30">
                            {ev.layer}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/40">{ev.detail}</p>
                        <p className="mt-1 text-[8px] text-white/20">
                          {formatTime(ev.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mx-auto mt-16 max-w-5xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          How ekkOS Memory Works
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              layer: "L2",
              name: "Episodic",
              desc: "Every action ekk0 takes is captured as an episode — a timestamped record of what happened and what changed.",
              color: "border-blue-500/30 bg-blue-500/5",
              icon: "💭",
            },
            {
              layer: "L4",
              name: "Patterns",
              desc: "Repeated behaviours become patterns. ekk0 learns that feeding restores fuel, play costs energy, and sleep recharges.",
              color: "border-yellow-500/30 bg-yellow-500/5",
              icon: "⚡",
            },
            {
              layer: "L9",
              name: "Directives",
              desc: "Preferences crystallise into rules: MUST maintain energy, PREFER learning when full, AVOID exertion when hungry.",
              color: "border-green-500/30 bg-green-500/5",
              icon: "📜",
            },
            {
              layer: "L7",
              name: "Meta / Decay",
              desc: "Unused patterns lose confidence over time — the forgetting curve. Only reinforced memories persist.",
              color: "border-red-500/30 bg-red-500/5",
              icon: "📉",
            },
          ].map((item) => (
            <div key={item.layer} className={`rounded-xl border p-5 ${item.color}`}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <span className="block text-[10px] font-mono text-white/30">{item.layer}</span>
                  <span className="block text-sm font-bold text-white/80">{item.name}</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-white/60">
            This is the same 11-layer memory architecture that powers{" "}
            <span className="font-semibold text-white/80">Claude Code</span>,{" "}
            <span className="font-semibold text-white/80">Cursor</span>, and{" "}
            <span className="font-semibold text-white/80">Windsurf</span>{" "}
            through ekkOS.
          </p>
          <a
            href="https://ekkos.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Try ekkOS Free
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const existing = localStorage.getItem("ekk0_visitor_id");
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem("ekk0_visitor_id", id);
    return id;
  } catch {
    return "anonymous-" + Math.random().toString(36).slice(2, 10);
  }
}

function loadState(): GameState {
  if (typeof window === "undefined") {
    return defaultState();
  }
  try {
    const s = localStorage.getItem("ekk0_state");
    return s ? JSON.parse(s) : defaultState();
  } catch {
    return defaultState();
  }
}

function saveStateLocal(state: GameState) {
  try {
    localStorage.setItem("ekk0_state", JSON.stringify(state));
  } catch {
    // silent
  }
}

function defaultState(): GameState {
  return {
    hunger: 80,
    happiness: 70,
    energy: 90,
    memory: 50,
    age: 0,
    born: Date.now(),
    lastTick: Date.now(),
    alive: true,
    mood: "idle",
    totalFeeds: 0,
    totalPlays: 0,
    totalSleeps: 0,
    totalLearns: 0,
  };
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
