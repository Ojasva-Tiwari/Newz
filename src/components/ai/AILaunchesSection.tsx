import { useState } from "react";
import { Box, Calendar, Cpu, Layers, Sparkles } from "lucide-react";
import { AILaunch, AILaunchType } from "../../types";

const typeBadges: Record<AILaunchType, string> = {
  Model: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Product: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Developer Tool": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  API: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hardware: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  "Open Source": "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
};

export function AILaunchesSection({ launches }: { launches: AILaunch[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const types: ("All" | AILaunchType)[] = [
    "All",
    "Model",
    "Product",
    "Developer Tool",
    "API",
    "Hardware",
    "Open Source",
  ];

  const filtered =
    activeFilter === "All"
      ? launches
      : launches.filter((item) => item.type === activeFilter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeFilter === type
                ? "bg-signal text-white shadow-sm"
                : "border border-black/10 bg-white/70 text-muted hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/[.04] dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    typeBadges[item.type] || "bg-black/5 text-muted"
                  }`}
                >
                  {item.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-muted dark:text-slate-400">
                  <Calendar size={12} />
                  {item.launchDate}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold leading-tight text-ink transition group-hover:text-signal dark:text-white">
                {item.name}
              </h3>
              <div className="mt-1 text-xs font-medium text-muted dark:text-slate-400">
                by <span className="font-semibold text-ink dark:text-slate-200">{item.organization}</span>
              </div>

              <p className="mt-3 text-xs leading-5 text-muted dark:text-slate-400">
                {item.shortDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs dark:border-white/10">
              <span className="text-muted dark:text-slate-500">Source: {item.source}</span>
              <span className="rounded-full bg-signal/10 px-2.5 py-1 text-[10px] font-bold text-signal">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
