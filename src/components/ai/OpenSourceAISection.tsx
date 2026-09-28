import { Code, ExternalLink, GitBranch, Shield, Sparkles, Star } from "lucide-react";
import { AIProject } from "../../types";

export function OpenSourceAISection({ projects }: { projects: AIProject[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
        >
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-[10px] font-bold text-teal-600 dark:text-teal-400">
                <Shield size={11} />
                {proj.license}
              </span>
              <span className="text-xs text-muted dark:text-slate-400">
                Released {proj.releaseDate}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-ink transition group-hover:text-signal dark:text-white">
              {proj.project}
            </h3>

            <div className="mt-1 text-xs font-semibold text-muted dark:text-slate-400">
              by <span className="text-ink dark:text-slate-200">{proj.organization}</span>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted dark:text-slate-400">
              {proj.description}
            </p>
          </div>

          <div className="mt-6 border-t border-black/10 pt-4 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink dark:text-slate-200">
                <Star size={13} className="text-amber-500" />
                {proj.popularityMetric}
              </span>

              <span className="text-muted dark:text-slate-500">
                Source: {proj.source}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
