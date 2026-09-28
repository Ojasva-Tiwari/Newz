import { ArrowUpRight, Network, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { articles, analysis, coverage, sources, timeline, trendingTopics } from "../data/mockData";
import { useBookmarks } from "../hooks/useBookmarks";
import { AIBrief } from "../components/intelligence/Intelligence";
import { ArticleCard } from "../components/news/NewsCards";
import { SectionHeading, SourceBadge, StatusPill, Momentum } from "../components/ui/Shared";

export function IntelligencePage() {
  const { topic = "night-cities" } = useParams();
  const selected = trendingTopics.find((item) => item.id === topic) || trendingTopics[0];
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const related = articles.filter((article) => article.category === selected.category).slice(0, 3);

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {trendingTopics.map((item) => <Link key={item.id} to={`/intelligence/${item.id}`} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${item.id === selected.id ? "border-signal bg-signal text-white" : "border-black/10 hover:border-signal hover:text-signal dark:border-white/10"}`}>{item.title}</Link>)}
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-signal/30 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-signal"><Sparkles size={15} /> News intelligence</div>
            <div className="mb-3 flex items-center gap-3"><StatusPill status={selected.status} /><span className="text-xs text-white/50">{selected.category}</span></div>
            <h1 className="max-w-4xl font-serif text-6xl leading-[.9] tracking-tight sm:text-8xl">{selected.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">{selected.description}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.06] p-5">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50"><Network size={15} /> Thread health</div>
            <Momentum value={selected.momentum} />
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div><div className="font-serif text-3xl">{selected.articleCount}</div><div className="text-xs text-white/50">Articles</div></div>
              <div><div className="font-serif text-3xl">{selected.sourceCount}</div><div className="text-xs text-white/50">Sources</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <AIBrief data={analysis} />
          <section className="mt-14">
            <SectionHeading eyebrow="Connected stories" title="The wider thread" />
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((article) => <ArticleCard key={article.id} article={article} bookmarked={isBookmarked(article.id)} onBookmark={() => toggleBookmark(article.id)} />)}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div>
            <SectionHeading eyebrow="Timeline" title="Story movement" />
            <div className="space-y-5">
              {timeline.map((event, index) => <div key={event.time} className="relative flex gap-4"><div className="flex flex-col items-center"><span className="mt-1 h-3 w-3 rounded-full bg-signal ring-4 ring-signal/10" />{index < timeline.length - 1 && <span className="mt-2 h-full w-px bg-black/10 dark:bg-white/10" />}</div><div className="pb-5"><div className="text-[10px] font-bold uppercase tracking-widest text-signal">{event.time}</div><h3 className="mt-1 font-serif text-xl">{event.title}</h3><p className="mt-1 text-sm leading-5 text-muted dark:text-slate-400">{event.description}</p></div></div>)}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Coverage network" title="Who is covering it" />
            <div className="space-y-3 rounded-2xl border border-black/10 p-4 dark:border-white/10">
              {coverage.map((item) => <div key={item.sourceId} className="border-b border-black/10 pb-3 last:border-0 last:pb-0 dark:border-white/10"><SourceBadge sourceId={item.sourceId} /><div className="mt-2 text-xs text-muted dark:text-slate-500">{item.perspective}</div></div>)}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
