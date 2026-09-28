import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  BarChart3,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";
import { AIRanking, AIRankingCategory } from "../../types";

const categories: AIRankingCategory[] = [
  "Reasoning",
  "Coding",
  "Multimodal",
  "General capability",
  "Open-source models",
  "AI tools",
];

export function AIRankingsSection({ rankings }: { rankings: AIRanking[] }) {
  const [selectedCategory, setSelectedCategory] =
    useState<AIRankingCategory>("Reasoning");

  const currentRankings = rankings.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div>
      {/* Demo Notice Banner */}
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-5 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
        <Info size={17} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div>
          <span className="font-bold uppercase tracking-wider">
            Sample Ranking / Demo Benchmark:
          </span>{" "}
          This data illustrates the benchmark evaluation architecture. In future
          phases, this view will be backed by continuous telemetry and verified
          evaluation runs via the FastAPI intelligence service.
        </div>
      </div>

      {/* Category selector */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              selectedCategory === cat
                ? "bg-signal text-white shadow-sm"
                : "border border-black/10 bg-white/70 text-muted hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/[.04] dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rankings Table / Cards */}
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-card dark:border-white/10 dark:bg-white/[.03]">
        <div className="border-b border-black/10 bg-black/[.02] px-6 py-4 dark:border-white/10 dark:bg-white/[.02]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-signal">
              <Award size={15} />
              {selectedCategory} Benchmark Leaderboard
            </div>
            <div className="text-[11px] text-muted dark:text-slate-500">
              Evaluated on standard verified test suites
            </div>
          </div>
        </div>

        <div className="divide-y divide-black/10 dark:divide-white/10">
          {currentRankings.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-black/[.015] dark:hover:bg-white/[.02] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-serif text-lg font-bold ${
                    item.rank === 1
                      ? "bg-signal text-white shadow-md shadow-signal/20"
                      : item.rank === 2
                      ? "bg-black/10 font-bold text-ink dark:bg-white/10 dark:text-white"
                      : "bg-black/5 text-muted dark:bg-white/5 dark:text-slate-400"
                  }`}
                >
                  {item.rank}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-serif text-xl font-bold text-ink dark:text-white">
                      {item.model}
                    </h4>
                    <ChangeIndicator change={item.change} />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted dark:text-slate-400">
                    <span className="font-semibold text-ink dark:text-slate-300">
                      {item.organization}
                    </span>
                    <span>·</span>
                    <span>Benchmark: {item.benchmark}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-black/5 pt-3 sm:border-0 sm:pt-0">
                <div className="text-right">
                  <div className="font-serif text-2xl font-bold text-signal">
                    {item.score}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted dark:text-slate-500">
                    Score
                  </div>
                </div>

                <div className="hidden text-right text-xs text-muted dark:text-slate-500 md:block">
                  <div>Prev: #{item.previousRank || "—"}</div>
                  <div className="text-[10px]">{item.lastUpdated}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangeIndicator({ change }: { change: number | "=" | "NEW" }) {
  if (change === "NEW") {
    return (
      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
        NEW
      </span>
    );
  }

  if (change === "=" || change === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-muted dark:text-slate-500">
        <ArrowRight size={11} /> No change
      </span>
    );
  }

  if (typeof change === "number" && change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
        <ArrowUp size={11} /> +{change}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-0.5 rounded bg-rose-500/10 px-1.5 py-0.5 text-[11px] font-bold text-rose-600 dark:text-rose-400">
      <ArrowDown size={11} /> {change}
    </span>
  );
}
