import { ArrowUpRight, MapPin, Radio } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { articles, sources } from "../data/mockData";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleCard } from "../components/news/NewsCards";
import { EmptyState, SectionHeading } from "../components/ui/Shared";

export function SourcePage() {
  const { id } = useParams();
  const source = sources.find((item) => item.id === id);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!source) return <EmptyState title="Source not found" description="This source is not part of the current fictional network." />;

  const sourceArticles = articles.filter((article) => article.sourceId === source.id);

  return (
    <main>
      <section className="border-b border-black/10 bg-white/50 dark:border-white/10 dark:bg-white/[.03]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] text-2xl font-black text-white shadow-soft" style={{ backgroundColor: source.accent }}>{source.shortName}</div>
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-signal"><Radio size={14} /> Source profile</div>
              <h1 className="font-serif text-6xl tracking-tight sm:text-8xl">{source.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted dark:text-slate-400">{source.description}</p>
              <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted dark:text-slate-500">
                <span className="inline-flex items-center gap-2"><MapPin size={14} /> {source.location}</span>
                <span>Founded {source.founded}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="Latest coverage" title={`Stories from ${source.shortName}`} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sourceArticles.map((article) => <ArticleCard key={article.id} article={article} bookmarked={isBookmarked(article.id)} onBookmark={() => toggleBookmark(article.id)} />)}
        </div>
      </section>
    </main>
  );
}
