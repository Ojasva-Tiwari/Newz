import { Link, useParams } from "react-router-dom";
import { articles, trendingTopics } from "../data/mockData";
import { Category } from "../types";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleCard, HeroStory } from "../components/news/NewsCards";
import { SectionHeading, Tag } from "../components/ui/Shared";

const descriptions: Record<Category, string> = {
  World: "The forces, places, and people reshaping the world beyond the obvious headline.",
  India: "A closer read on one of the world’s most consequential transformations.",
  Technology: "The systems, tools, and ideas changing how modern life works.",
  Business: "The decisions, incentives, and structures moving the economy.",
  Science: "Evidence, discovery, and the questions that remain open.",
  Sports: "The context behind the score.",
  Entertainment: "The stories and ideas shaping shared culture.",
};

export function CategoryPage() {
  const { category = "World" } = useParams();
  const selected = category as Category;
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const categoryArticles = articles.filter((article) => article.category === selected);
  const hero = categoryArticles[0] || articles[0];

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div className="mb-10 flex flex-wrap gap-2">
        {Object.keys(descriptions).map((item) => <Link key={item} to={`/category/${item}`} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${item === selected ? "border-signal bg-signal text-white" : "border-black/10 hover:border-signal hover:text-signal dark:border-white/10"}`}>{item}</Link>)}
      </div>
      <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
        <div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-signal">Category / {selected}</div>
          <h1 className="font-serif text-6xl leading-[.9] tracking-tight sm:text-8xl">{selected}</h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-muted dark:text-slate-400">{descriptions[selected]}</p>
      </div>

      <div className="mt-12">
        <HeroStory article={hero} bookmarked={isBookmarked(hero.id)} onBookmark={() => toggleBookmark(hero.id)} />
      </div>

      <section className="mt-16">
        <SectionHeading eyebrow="Latest in this world" title="More to explore" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryArticles.slice(1).map((article) => <ArticleCard key={article.id} article={article} bookmarked={isBookmarked(article.id)} onBookmark={() => toggleBookmark(article.id)} />)}
        </div>
      </section>

      <section className="mt-16 border-t border-black/10 pt-12 dark:border-white/10">
        <SectionHeading eyebrow="Related pulse" title="Topics to follow" />
        <div className="flex flex-wrap gap-3">
          {trendingTopics.filter((topic) => topic.category === selected).map((topic) => <Link key={topic.id} to={`/intelligence/${topic.id}`}><Tag>{topic.title}</Tag></Link>)}
          {!trendingTopics.some((topic) => topic.category === selected) && <span className="text-sm text-muted">New topics are forming in this category.</span>}
        </div>
      </section>
    </main>
  );
}
