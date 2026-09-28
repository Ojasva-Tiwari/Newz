import { Layers, TrendingUp } from "lucide-react";
import { LocalTrendingTopic } from "../../types";
import { Momentum } from "../ui/Shared";

export function LocalTrendingSection({
  trending,
}: {
  trending: LocalTrendingTopic[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trending.map((topic, index) => (
        <div
          key={topic.id}
          className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-3xl text-black/20 dark:text-white/20">
                0{index + 1}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-signal">
                {topic.category}
              </span>
            </div>

            <h4 className="font-serif text-xl font-bold leading-snug text-ink transition group-hover:text-signal dark:text-white">
              {topic.topic}
            </h4>

            <p className="mt-2 text-xs leading-5 text-muted dark:text-slate-400">
              {topic.shortDescription}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs dark:border-white/10">
            <span className="text-muted dark:text-slate-400">
              {topic.articleCount} articles · {topic.sourceCount} sources
            </span>
            <Momentum value={topic.momentum} />
          </div>
        </div>
      ))}
    </div>
  );
}
