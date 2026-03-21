"use client";

import { useEffect, useMemo, useState } from "react";

import type { ScorecardSnapshot } from "@/lib/scorecard";

const WINDOW_HOURS = 72;
const REFRESH_MS = 15_000;

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatLatency(value: number): string {
  return `${Math.round(value).toLocaleString()} ms`;
}

function formatCost(value: number): string {
  if (value < 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(3)}`;
}

function providerLabel(provider: string): string {
  if (provider === "anthropic") return "Claude";
  if (provider === "google") return "Gemini";
  if (provider === "openai") return "OpenAI";
  return provider;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString();
}

export function ScorecardDashboard() {
  const [data, setData] = useState<ScorecardSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(`/api/scorecard/latest?windowHours=${WINDOW_HOURS}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`Unable to fetch scorecard (${response.status})`);
        }

        const payload = (await response.json()) as ScorecardSnapshot;
        if (!active) return;

        setData(payload);
        setError(null);
        setLastUpdated(new Date().toISOString());
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Unknown error");
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();
    const interval = setInterval(() => {
      void load();
    }, REFRESH_MS);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const topModel = data?.leaderboard[0];

  const globalPassRate = useMemo(() => {
    if (!data || data.providers.length === 0) return 0;

    const weighted = data.providers.reduce((sum, provider) => {
      return sum + provider.passRate * provider.runs;
    }, 0);

    return weighted / data.runs;
  }, [data]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Top Model</p>
          <p className="mt-3 text-lg font-semibold text-white">
            {topModel ? topModel.model : "Waiting for data"}
          </p>
          <p className="mt-2 text-sm text-white/60">
            {topModel ? providerLabel(topModel.provider) : "No benchmark rows yet"}
          </p>
          <p className="mt-3 text-2xl font-bold text-primary">
            {topModel ? topModel.score.toFixed(1) : "--"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Runs (72h)</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {data ? data.runs.toLocaleString() : "--"}
          </p>
          <p className="mt-2 text-sm text-white/60">
            {data ? `${data.providers.length} providers` : "Calculating..."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Global Pass Rate</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {data ? formatPercent(globalPassRate) : "--"}
          </p>
          <p className="mt-2 text-sm text-white/60">Weighted by run volume</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Feed Status</p>
          <p className="mt-3 text-lg font-semibold text-white">
            {loading ? "Refreshing..." : "Live"}
          </p>
          <p className="mt-2 text-sm text-white/60">
            {lastUpdated ? `Updated ${formatDate(lastUpdated)}` : "Waiting for first sync"}
          </p>
          <p className="mt-3 text-xs uppercase tracking-wider text-primary/70">
            source: {data?.source ?? "unknown"}
          </p>
          <p className="mt-2 text-[11px] text-white/45">
            Live proxy rows use derived quality metrics unless benchmark overrides are provided.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Provider Standings</h2>
          <p className="text-xs uppercase tracking-wider text-white/50">window: {WINDOW_HOURS}h</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {(data?.providers ?? []).map((provider) => (
            <div
              key={provider.provider}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  {providerLabel(provider.provider)}
                </p>
                <p className="text-xs uppercase tracking-wider text-white/50">
                  {provider.runs.toLocaleString()} runs
                </p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-white/50">Pass</p>
                  <p className="text-white">{formatPercent(provider.passRate)}</p>
                </div>
                <div>
                  <p className="text-white/50">Avg Score</p>
                  <p className="text-white">{provider.avgScore.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-white/50">Avg Cost</p>
                  <p className="text-white">{formatCost(provider.avgCostUsd)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Model Leaderboard</h2>
          <p className="text-xs uppercase tracking-wider text-white/50">auto-refresh 15s</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
                <th className="px-3 py-3">Rank</th>
                <th className="px-3 py-3">Model</th>
                <th className="px-3 py-3">Score</th>
                <th className="px-3 py-3">Pass</th>
                <th className="px-3 py-3">Recall</th>
                <th className="px-3 py-3">Tool</th>
                <th className="px-3 py-3">Latency</th>
                <th className="px-3 py-3">Cost</th>
                <th className="px-3 py-3">Runs</th>
              </tr>
            </thead>
            <tbody>
              {(data?.leaderboard ?? []).map((entry) => (
                <tr key={entry.key} className="border-b border-white/5 text-white/85">
                  <td className="px-3 py-3">{entry.rank}</td>
                  <td className="px-3 py-3">
                    <p className="font-medium text-white">{entry.model}</p>
                    <p className="text-xs text-white/50">{providerLabel(entry.provider)}</p>
                  </td>
                  <td className="px-3 py-3">{entry.score.toFixed(1)}</td>
                  <td className="px-3 py-3">{formatPercent(entry.passRate)}</td>
                  <td className="px-3 py-3">{formatPercent(entry.avgConstraintRecall)}</td>
                  <td className="px-3 py-3">{formatPercent(entry.avgToolCorrectness)}</td>
                  <td className="px-3 py-3">{formatLatency(entry.avgLatencyMs)}</td>
                  <td className="px-3 py-3">{formatCost(entry.avgCostUsd)}</td>
                  <td className="px-3 py-3">{entry.runs.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Recent Runs</h2>
          <p className="text-xs uppercase tracking-wider text-white/50">most recent first</p>
        </div>

        <div className="space-y-2">
          {(data?.recentRuns ?? []).map((run) => (
            <div
              key={run.id}
              className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {run.model} <span className="text-white/50">({providerLabel(run.provider)})</span>
                </p>
                <p className="text-xs text-white/50">
                  {run.scenario} • {formatDate(run.benchmarkedAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span
                  className={
                    run.status === "pass" ? "text-emerald-300" : "text-rose-300"
                  }
                >
                  {run.status.toUpperCase()}
                </span>
                <span>Recall {formatPercent(run.constraintRecall)}</span>
                <span>Task {formatPercent(run.taskCompletion)}</span>
                <span>Tool {formatPercent(run.toolCorrectness)}</span>
                <span>{formatLatency(run.latencyMs)}</span>
                <span>{formatCost(run.costUsd)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
          Scorecard sync issue: {error}
        </div>
      ) : null}
    </div>
  );
}
