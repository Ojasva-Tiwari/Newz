import { Briefcase, Building2, Calendar, TrendingUp } from "lucide-react";
import { AICompanyDevelopment, AICompanyDevType } from "../../types";

const typeStyles: Record<AICompanyDevType, string> = {
  "product launch": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  partnership: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  funding: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  research: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  acquisition: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  infrastructure: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  "hiring/expansion": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
};

export function AICompaniesSection({
  developments,
}: {
  developments: AICompanyDevelopment[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {developments.map((dev) => (
        <div
          key={dev.id}
          className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
        >
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="font-serif text-lg font-bold text-ink dark:text-white">
                {dev.company}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  typeStyles[dev.type] || "bg-black/5 text-muted"
                }`}
              >
                {dev.type}
              </span>
            </div>

            <h4 className="font-serif text-xl font-bold leading-snug text-ink transition group-hover:text-signal dark:text-white">
              {dev.title}
            </h4>

            <p className="mt-3 text-xs leading-5 text-muted dark:text-slate-400">
              {dev.description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-[11px] text-muted dark:border-white/10 dark:text-slate-500">
            <span>{dev.date}</span>
            <span>Source: {dev.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
