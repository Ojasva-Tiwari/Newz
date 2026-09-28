import { ArrowUpRight, Clock3, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AIInsight } from "../../types";
import { SourceBadge } from "../ui/Shared";

export function FeaturedAISection({ insight }: { insight: AIInsight }) {
  const targetLink = insight.articleId
    ? `/article/${insight.articleId}`
    : "#latest-ai-news";

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-ink text-white shadow-soft dark:border dark:border-white/10 dark:bg-midnight">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full bg-signal/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[90px]" />

      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-white">
              <Sparkles size={12} />
              Featured Intelligence
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
              {insight.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Clock3 size={13} />
              {insight.publishedAt}
            </span>
          </div>

          <h2 className="font-serif text-3xl leading-[1.04] tracking-tight sm:text-5xl">
            {insight.headline}
          </h2>

          <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg">
            {insight.summary}
          </p>

          {insight.keyTakeaways && (
            <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/[.04] p-4 sm:p-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-signal">
                Strategic Takeaways
              </div>
              <ul className="space-y-1.5 text-xs leading-5 text-white/80 sm:text-sm">
                {insight.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              <SourceBadge sourceId={insight.sourceId} />
              <span className="text-xs text-white/50">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-white/70">
                <Layers size={13} className="text-signal" />
                {insight.sourceCount} verified sources
              </span>
            </div>

            <Link
              to={targetLink}
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-signal/90"
            >
              View coverage <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-card">
          <img
            src={insight.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
