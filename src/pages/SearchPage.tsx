import {
  BookOpen,
  Boxes,
  Calendar,
  Compass,
  Cpu,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { sources } from "../data/mockData";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleCard } from "../components/news/NewsCards";
import { EmptyState, SectionHeading, SourceBadge } from "../components/ui/Shared";
import { searchEverything, UnifiedSearchResults } from "../services/searchService";

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState("All");
  const [source, setSource] = useState("All");
  const [sort, setSort] = useState("Recent");
  const [entityFilter, setEntityFilter] = useState<
    "All" | "Stories" | "AI Intelligence" | "Local Coverage"
  >("All");

  const [searchResults, setSearchResults] = useState<UnifiedSearchResults>({
    articles: [],
    aiLaunches: [],
    aiResearch: [],
    aiProjects: [],
    localNews: [],
    localEvents: [],
    sources: [],
    totalCount: 0,
  });

  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    async function runSearch() {
      const res = await searchEverything(query, category, source);
      setSearchResults(res);
    }
    runSearch();
  }, [query, category, source]);

  const sortedArticles = useMemo(() => {
    if (sort === "Reading time") {
      return [...searchResults.articles].sort(
        (a, b) => a.readingTime - b.readingTime
      );
    }
    return searchResults.articles;
  }, [searchResults.articles, sort]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setParams(query ? { q: query } : {});
  };

  const showStories =
    entityFilter === "All" || entityFilter === "Stories";
  const showAI =
    entityFilter === "All" || entityFilter === "AI Intelligence";
  const showLocal =
    entityFilter === "All" || entityFilter === "Local Coverage";

  const hasAnyResults =
    (showStories && sortedArticles.length > 0) ||
    (showAI &&
      (searchResults.aiLaunches.length > 0 ||
        searchResults.aiResearch.length > 0 ||
        searchResults.aiProjects.length > 0)) ||
    (showLocal &&
      (searchResults.localNews.length > 0 ||
        searchResults.localEvents.length > 0));

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[.22em] text-signal">
          Search the network
        </div>
        <h1 className="font-serif text-5xl tracking-tight sm:text-7xl">
          Find the thread.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted dark:text-slate-400">
          Search across stories, AI launches, research papers, local reporting, and
          the ideas connecting them.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-2xl items-center rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-card focus-within:border-signal dark:border-white/10 dark:bg-white/[.05]"
        >
          <Search className="shrink-0 text-signal" size={21} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “climate”, “Bengaluru”, “reasoning”, or “chips”"
            className="w-full bg-transparent px-4 text-base outline-none placeholder:text-muted"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted hover:text-signal"
            >
              <X size={18} />
            </button>
          )}
        </form>
      </div>

      {/* Filter Bar */}
      <div className="mt-14 flex flex-col gap-4 border-y border-black/10 py-4 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(["All", "Stories", "AI Intelligence", "Local Coverage"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setEntityFilter(tab)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  entityFilter === tab
                    ? "bg-signal text-white"
                    : "border border-black/10 bg-transparent text-muted hover:border-signal hover:text-signal dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-black/10 bg-transparent px-3 py-2 text-xs outline-none dark:border-white/10"
          >
            <option>All</option>
            {[
              "World",
              "India",
              "Technology",
              "Business",
              "Science",
              "Sports",
              "Entertainment",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="rounded-full border border-black/10 bg-transparent px-3 py-2 text-xs outline-none dark:border-white/10"
          >
            <option value="All">All sources</option>
            {sources.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-black/10 bg-transparent px-3 py-2 text-xs outline-none dark:border-white/10"
          >
            <option>Recent</option>
            <option>Reading time</option>
          </select>

          <div className="ml-2 text-xs text-muted dark:text-slate-500">
            {searchResults.totalCount} results
          </div>
        </div>
      </div>

      {/* Results Rendering */}
      <div className="mt-10 space-y-14">
        {!hasAnyResults ? (
          <EmptyState
            title="No matching records found"
            description="Try a broader search term or switch your filter selection."
            icon={<SlidersHorizontal />}
          />
        ) : (
          <>
            {/* Stories Section */}
            {showStories && sortedArticles.length > 0 && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">
                    Stories ({sortedArticles.length})
                  </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {sortedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      bookmarked={isBookmarked(article.id)}
                      onBookmark={() => toggleBookmark(article.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* AI Intelligence Matches */}
            {showAI &&
              (searchResults.aiLaunches.length > 0 ||
                searchResults.aiResearch.length > 0 ||
                searchResults.aiProjects.length > 0) && (
                <section>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-signal" />
                      <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">
                        AI Intelligence Matches
                      </h2>
                    </div>
                    <Link
                      to="/ai-insights"
                      className="text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                    >
                      Explore AI Insights →
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.aiLaunches.map((launch) => (
                      <div
                        key={launch.id}
                        className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"
                      >
                        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-signal">
                          <span>{launch.type} Launch</span>
                          <span className="text-muted dark:text-slate-400">
                            {launch.launchDate}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-ink dark:text-white">
                          {launch.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted dark:text-slate-400">
                          {launch.shortDescription}
                        </p>
                      </div>
                    ))}

                    {searchResults.aiResearch.map((paper) => (
                      <div
                        key={paper.id}
                        className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"
                      >
                        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-signal">
                          <span>Research · {paper.researchTopic}</span>
                          <span className="text-muted dark:text-slate-400">
                            {paper.date}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-ink dark:text-white">
                          {paper.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted dark:text-slate-400">
                          {paper.shortSummary}
                        </p>
                      </div>
                    ))}

                    {searchResults.aiProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"
                      >
                        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">
                          <span>Open Source ({proj.license})</span>
                          <span className="text-muted dark:text-slate-400">
                            {proj.popularityMetric}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-ink dark:text-white">
                          {proj.project}
                        </h3>
                        <p className="mt-1 text-xs text-muted dark:text-slate-400">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Local Coverage Matches */}
            {showLocal &&
              (searchResults.localNews.length > 0 ||
                searchResults.localEvents.length > 0) && (
                <section>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Compass size={18} className="text-signal" />
                      <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">
                        Local Coverage Matches
                      </h2>
                    </div>
                    <Link
                      to="/nearby"
                      className="text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                    >
                      Open In Your Area →
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.localNews.map((ln) => (
                      <div
                        key={ln.id}
                        className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"
                      >
                        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-signal">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {ln.locationRelevance}
                          </span>
                          <span className="text-muted dark:text-slate-400">
                            {ln.timestamp}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-ink dark:text-white">
                          {ln.headline}
                        </h3>
                        <p className="mt-1 text-xs text-muted dark:text-slate-400">
                          {ln.summary}
                        </p>
                      </div>
                    ))}

                    {searchResults.localEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"
                      >
                        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-signal">
                          <span>Event · {ev.category}</span>
                          <span className="text-muted dark:text-slate-400">
                            {ev.date}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-ink dark:text-white">
                          {ev.name}
                        </h3>
                        <div className="mt-1 text-xs text-muted dark:text-slate-400">
                          {ev.venue || ev.approximateArea}
                        </div>
                        <p className="mt-2 text-xs text-muted dark:text-slate-400">
                          {ev.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </>
        )}
      </div>
    </main>
  );
}
