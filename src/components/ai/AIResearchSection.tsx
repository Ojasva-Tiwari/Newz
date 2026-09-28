import { ArrowUpRight, BookOpen, Calendar, Tag as TagIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AIResearch } from "../../types";

export function AIResearchSection({ research }: { research: AIResearch[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {research.map((paper) => {
        const CardWrapper = paper.articleId ? Link : "div";
        const wrapperProps = paper.articleId
          ? {
              to: `/article/${paper.articleId}`,
              className:
                "group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]",
            }
          : {
              className:
                "group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-7 transition duration-300 dark:border-white/10 dark:bg-white/[.04]",
            };

        return (
          // @ts-expect-error dynamic wrapper for Link / div
          <CardWrapper key={paper.id} {...wrapperProps}>
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-signal/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-signal">
                  {paper.researchTopic}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted dark:text-slate-400">
                  <Calendar size={13} />
                  {paper.date}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold leading-tight text-ink transition group-hover:text-signal dark:text-white">
                {paper.title}
              </h3>

              <div className="mt-2 text-xs font-semibold text-muted dark:text-slate-400">
                {paper.organization}
                {paper.researchers && (
                  <span className="font-normal text-muted dark:text-slate-400">
                    {" "}
                    · {paper.researchers}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-muted dark:text-slate-400">
                {paper.shortSummary}
              </p>
            </div>

            <div className="mt-6 border-t border-black/10 pt-4 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-black/5 bg-black/[.02] px-2 py-0.5 text-[10px] text-muted dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-signal">
                  {paper.articleId ? (
                    <span className="inline-flex items-center gap-1">
                      Read context <ArrowUpRight size={13} />
                    </span>
                  ) : (
                    <span className="text-muted dark:text-slate-500">
                      Via {paper.source}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardWrapper>
        );
      })}
    </div>
  );
}
