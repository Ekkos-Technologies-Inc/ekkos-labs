"use client";

interface EkkosHeaderProps {
  totalActions: number;
}

export default function EkkosHeader({ totalActions }: EkkosHeaderProps) {
  // Evolution stage label
  let evolutionLabel = "Spark";
  if (totalActions >= 100) evolutionLabel = "Oracle";
  else if (totalActions >= 50) evolutionLabel = "Thinker";
  else if (totalActions >= 20) evolutionLabel = "Learner";

  return (
    <>
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
    </>
  );
}
