import { Clock, History } from "lucide-react";
import { AITimelineItem } from "../../types";

export function AITimelineSection({ timeline }: { timeline: AITimelineItem[] }) {
  // Group by relative period if desired or show sequentially with clear period chips
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/[.03] sm:p-8">
      <div className="space-y-6">
        {timeline.map((event, index) => (
          <div key={event.id} className="relative flex gap-4 sm:gap-6">
            {/* Timeline bullet line */}
            <div className="flex flex-col items-center">
              <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-signal ring-4 ring-signal/10" />
              {index < timeline.length - 1 && (
                <span className="mt-2 h-full w-px bg-black/10 dark:bg-white/10" />
              )}
            </div>

            <div className="min-w-0 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-signal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal">
                  {event.relativePeriod}
                </span>
                <span className="text-xs font-semibold text-muted dark:text-slate-400">
                  {event.time}
                </span>
                <span className="text-xs text-muted dark:text-slate-500">·</span>
                <span className="text-xs font-medium text-muted dark:text-slate-400">
                  {event.category}
                </span>
              </div>

              <h4 className="mt-1.5 font-serif text-xl font-bold text-ink dark:text-white">
                {event.title}
              </h4>

              <p className="mt-1.5 text-xs leading-5 text-muted dark:text-slate-400">
                {event.description}
              </p>

              <div className="mt-2.5 text-[11px] text-muted dark:text-slate-500">
                Source: {event.source}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
