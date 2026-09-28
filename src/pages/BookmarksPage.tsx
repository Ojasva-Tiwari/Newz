import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "../data/mockData";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleCard } from "../components/news/NewsCards";
import { EmptyState, SectionHeading } from "../components/ui/Shared";

export function BookmarksPage() {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const saved = articles.filter((article) => bookmarks.includes(article.id));

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-signal"><Bookmark size={15} /> Your reading room</div>
        <h1 className="font-serif text-6xl tracking-tight sm:text-8xl">Saved for later.</h1>
        <p className="mt-5 text-lg leading-8 text-muted dark:text-slate-400">Keep the stories that deserve more time close at hand.</p>
      </div>
      {saved.length ? (
        <>
          <SectionHeading title={`${saved.length} saved ${saved.length === 1 ? "story" : "stories"}`} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {saved.map((article) => <ArticleCard key={article.id} article={article} bookmarked={isBookmarked(article.id)} onBookmark={() => toggleBookmark(article.id)} />)}
          </div>
        </>
      ) : (
        <EmptyState title="Your reading room is empty" description="When a story catches your attention, use the bookmark button to save it here." icon={<Bookmark size={25} />} />
      )}
    </main>
  );
}
