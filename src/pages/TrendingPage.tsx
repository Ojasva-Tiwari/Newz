import { ArrowUpRight, Flame, Radar } from "lucide-react";
import { Link } from "react-router-dom";
import { trendingTopics } from "../data/mockData";
import { Momentum, SectionHeading, StatusPill } from "../components/ui/Shared";

export function TrendingPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-signal"><Flame size={15} /> Live pulse</div>
          <h1 className="font-serif text-6xl leading-[.9] tracking-tight sm:text-8xl">What the<br /><em className="text-signal">world is following.</em></h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-muted dark:text-slate-400">Trending is not just volume. It is movement: the stories gaining sources, perspectives, and consequence.</p>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trendingTopics.map((topic, index) => (
          <Link key={topic.id} to={`/intelligence/${topic.id}`} className="group relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-signal/10 blur-2xl transition group-hover:bg-signal/20" />
            <div className="relative">
              <div className="mb-9 flex items-start justify-between">
                <span className="font-serif text-5xl text-black/10 dark:text-white/10">0{index + 1}</span>
                <StatusPill status={topic.status} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-signal">{topic.category}</div>
              <h2 className="mt-2 font-serif text-3xl leading-tight">{topic.title}</h2>
              <p className="mt-3 min-h-12 text-sm leading-5 text-muted dark:text-slate-400">{topic.description}</p>
              <div className="mt-7 space-y-3 border-t border-black/10 pt-4 dark:border-white/10">
                <div className="flex justify-between text-xs text-muted dark:text-slate-500"><span>{topic.articleCount} related articles</span><span>{topic.sourceCount} sources</span></div>
                <Momentum value={topic.momentum} />
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-signal">Explore thread <ArrowUpRight size={14} /></div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-ink p-7 text-white dark:bg-white/[.06] sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-signal"><Radar size={15} /> Signal methodology</div>
            <h2 className="font-serif text-3xl">Momentum is a map, not a verdict.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Our fictional trend layer combines article volume, source diversity, recency, and editorial attention to show where a story is moving.</p>
          </div>
          <Link to="/intelligence/night-cities" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink">See an intelligence page <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </main>
  );
}
