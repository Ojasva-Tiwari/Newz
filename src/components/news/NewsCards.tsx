import { ArrowUpRight, Bookmark, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Article } from "../../types";
import { BookmarkButton, MetaLine, SourceBadge, StatusPill } from "../ui/Shared";

export function ArticleCard({
  article,
  onBookmark,
  bookmarked,
  horizontal = false,
}: {
  article: Article;
  onBookmark: () => void;
  bookmarked: boolean;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <Link
        to={`/article/${article.id}`}
        className="group grid grid-cols-[120px_1fr] gap-4 border-b border-black/10 py-5 first:pt-0 last:border-0 dark:border-white/10 sm:grid-cols-[180px_1fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
          <img
            src={article.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-signal">
              {article.category}
            </span>
            {article.developing && <StatusPill status="Developing" />}
          </div>
          <h3 className="line-clamp-2 font-serif text-xl leading-tight text-ink transition group-hover:text-signal dark:text-white">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted dark:text-slate-400">
            {article.summary}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted dark:text-slate-500">
            <span>{article.publishedAt}</span>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${article.id}`}
      className="group relative block overflow-hidden rounded-3xl border border-black/10 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
    >
      <div className="relative aspect-[1.45] overflow-hidden">
        <img
          src={article.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
            {article.category}
          </span>
          {article.developing && (
            <span className="rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              Live thread
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="text-xs text-white/80">{article.publishedAt}</span>
          <BookmarkButton active={bookmarked} onClick={onBookmark} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-[25px] leading-[1.05] tracking-tight text-ink transition group-hover:text-signal dark:text-white">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted dark:text-slate-400">
          {article.summary}
        </p>
        <div className="mt-5">
          <MetaLine article={article} />
        </div>
      </div>
    </Link>
  );
}

export function CompactArticle({
  article,
  onBookmark,
  bookmarked,
}: {
  article: Article;
  onBookmark: () => void;
  bookmarked: boolean;
}) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="group flex gap-4 border-b border-black/10 py-4 first:pt-0 last:border-0 dark:border-white/10"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
        <img
          src={article.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-signal">
          {article.category}
        </div>
        <h3 className="line-clamp-2 font-serif text-lg leading-tight text-ink transition group-hover:text-signal dark:text-white">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-muted dark:text-slate-500">
          <Clock3 size={12} />
          {article.readingTime} min read
        </div>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onBookmark();
        }}
        aria-label="Save article"
        className="self-start text-muted transition hover:text-signal dark:text-slate-500"
      >
        <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
      </button>
    </Link>
  );
}

export function HeroStory({
  article,
  onBookmark,
  bookmarked,
}: {
  article: Article;
  onBookmark: () => void;
  bookmarked: boolean;
}) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="group relative block min-h-[510px] overflow-hidden rounded-[2rem] bg-midnight text-white shadow-soft"
    >
      <img
        src={article.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-ink">
            Editor's signal
          </span>
          {article.developing && <StatusPill status="Developing" />}
        </div>
        <BookmarkButton active={bookmarked} onClick={onBookmark} />
      </div>
      <div className="absolute bottom-7 left-6 right-6 max-w-3xl sm:left-9 sm:right-9">
        <div className="mb-4 flex items-center gap-3 text-xs text-white/75">
          <span>{article.category}</span>
          <span className="h-1 w-1 rounded-full bg-white/60" />
          <span>{article.publishedAt}</span>
        </div>
        <h1 className="max-w-3xl font-serif text-4xl leading-[.98] tracking-tight sm:text-6xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
          {article.summary}
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-white">
          Read the full signal <ArrowUpRight size={15} />
        </div>
      </div>
    </Link>
  );
}
