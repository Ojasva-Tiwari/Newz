import { ArrowUpRight, Clock3, Layers, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { LocalNews } from "../../types";
import { SourceBadge } from "../ui/Shared";

export function LocalNewsGrid({ news }: { news: LocalNews[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {news.map((item) => {
        const linkTo = item.articleId ? `/article/${item.articleId}` : "#";

        return (
          <Link
            key={item.id}
            to={linkTo}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-black/5 dark:bg-white/5">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <MapPin size={12} className="text-signal" />
                    {item.locationRelevance}
                  </span>
                  <span>{item.timestamp}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold leading-snug text-ink transition group-hover:text-signal dark:text-white">
                  {item.headline}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted dark:text-slate-400">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/10 px-6 py-4 text-xs dark:border-white/10">
              <SourceBadge sourceId={item.sourceId} />
              <div className="flex items-center gap-3 text-muted dark:text-slate-500">
                {item.sourceCount && (
                  <span className="inline-flex items-center gap-1">
                    <Layers size={12} />
                    {item.sourceCount} sources
                  </span>
                )}
                <span className="inline-flex items-center gap-1 font-semibold text-signal">
                  Read <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
