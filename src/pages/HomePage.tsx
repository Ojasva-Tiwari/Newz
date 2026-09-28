import { ArrowUpRight, ChevronRight, Radar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { articles, trendingTopics } from "../data/mockData";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleCard, CompactArticle, HeroStory } from "../components/news/NewsCards";
import { SectionHeading, StatusPill, Momentum, Tag } from "../components/ui/Shared";

export function HomePage() {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const hero = articles.find((article) => article.featured)!;
  const latest = articles.filter((article) => !article.featured).slice(0, 6);

  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-5 pb-14 pt-8 sm:px-8 lg:px-10 lg:pt-12">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-signal">
              <Radar size={15} /> Monday · September 28, 2026
            </div>
            <h1 className="max-w-2xl font-serif text-5xl leading-[.92] tracking-tight sm:text-7xl">
              The world,<br /><em className="text-signal">made legible.</em>
            </h1>
          </div>
          <Link to="/intelligence/night-cities" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-signal sm:flex">
            Explore intelligence <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
          <HeroStory article={hero} bookmarked={isBookmarked(hero.id)} onBookmark={() => toggleBookmark(hero.id)} />
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[.04] sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-signal">
                <span className="h-2 w-2 animate-pulse rounded-full bg-signal" /> Developing
              </div>
              <span className="text-xs text-muted dark:text-slate-500">Updated 12 min ago</span>
            </div>
            <h2 className="font-serif text-3xl leading-tight text-ink dark:text-white">What is moving now</h2>
            <p className="mt-3 text-sm leading-6 text-muted dark:text-slate-400">
              A live editorial thread connecting the stories gaining momentum across the network.
            </p>
            <div className="mt-7 divide-y divide-black/10 dark:divide-white/10">
              {articles.filter((item) => item.developing || item.id !== hero.id).slice(0, 4).map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="group block py-4 first:pt-0">
                  <div className="mb-1 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-signal">
                    <span>{article.category}</span>
                    <span className="text-muted dark:text-slate-500">{article.publishedAt}</span>
                  </div>
                  <h3 className="font-serif text-xl leading-tight text-ink transition group-hover:text-signal dark:text-white">{article.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#eeece6] dark:border-white/10 dark:bg-white/[.025]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="The pulse"
            title="Trending now"
            description="The topics gathering attention, context, and competing interpretations."
            action={<Link to="/trending" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-signal sm:flex">View all <ChevronRight size={15} /></Link>}
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {trendingTopics.slice(0, 4).map((topic, index) => (
              <Link key={topic.id} to={`/intelligence/${topic.id}`} className="group rounded-2xl border border-black/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-4xl font-serif text-black/15 dark:text-white/15">0{index + 1}</span>
                  <StatusPill status={topic.status} />
                </div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-signal">{topic.category}</div>
                <h3 className="font-serif text-2xl leading-tight text-ink transition group-hover:text-signal dark:text-white">{topic.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-5 text-muted dark:text-slate-400">{topic.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
                  <span className="text-xs text-muted dark:text-slate-500">{topic.articleCount} articles</span>
                  <Momentum value={topic.momentum} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="Recommended for you" title="Follow the signal" description="A considered mix of stories worth your attention today." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} bookmarked={isBookmarked(article.id)} onBookmark={() => toggleBookmark(article.id)} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
        <div>
          <SectionHeading eyebrow="Latest" title="What just landed" />
          <div className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[.04] sm:p-7">
            {latest.slice(3, 8).map((article) => (
              <CompactArticle key={article.id} article={article} bookmarked={isBookmarked(article.id)} onBookmark={() => toggleBookmark(article.id)} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Intelligence preview" title="Go beyond the headline" />
          <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white dark:bg-[#25211f] sm:p-9">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-signal/30 blur-3xl" />
            <div className="relative">
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-signal"><Sparkles size={20} /></div>
              <h3 className="max-w-sm font-serif text-4xl leading-tight">Understand the story behind the story.</h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/65">Signal Intelligence organizes developments, entities, perspectives, and what to watch next.</p>
              <Link to="/intelligence/night-cities" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-signal hover:text-white">Explore a story <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white/50 dark:border-white/10 dark:bg-white/[.02]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Explore by world" title="Find your next thread" />
          <div className="flex flex-wrap gap-3">
            {["World", "India", "Technology", "Business", "Science", "Sports", "Entertainment"].map((category) => (
              <Link key={category} to={`/category/${category}`} className="group flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 transition hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/[.04]">
                <span className="h-2 w-2 rounded-full bg-signal transition group-hover:scale-150" />
                <span className="text-sm font-medium">{category}</span>
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
