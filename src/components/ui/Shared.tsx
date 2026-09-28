import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  LoaderCircle,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Article, Source } from "../../types";
import { findSource } from "../../services/mockService";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-serif text-3xl tracking-tight text-ink dark:text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function BookmarkButton({
  active,
  onClick,
  label = "Save article",
}: {
  active: boolean;
  onClick: (event: React.MouseEvent) => void;
  label?: string;
}) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(event);
      }}
      aria-label={label}
      className={`group inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
        active
          ? "border-signal bg-signal text-white"
          : "border-black/10 bg-white/75 text-ink hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/10 dark:text-white"
      }`}
    >
      <Bookmark size={17} fill={active ? "currentColor" : "none"} className="transition-transform group-hover:scale-110" />
    </button>
  );
}

export function SourceBadge({ sourceId }: { sourceId: string }) {
  const source = findSource(sourceId);
  if (!source) return null;

  return (
    <Link
      to={`/source/${source.id}`}
      onClick={(event) => event.stopPropagation()}
      className="inline-flex items-center gap-2 text-xs font-semibold text-ink transition hover:text-signal dark:text-slate-200"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-black text-white"
        style={{ backgroundColor: source.accent }}
      >
        {source.shortName}
      </span>
      {source.name}
    </Link>
  );
}

export function MetaLine({
  article,
  light = false,
}: {
  article: Article;
  light?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-xs ${light ? "text-white/70" : "text-muted dark:text-slate-400"}`}>
      <SourceBadge sourceId={article.sourceId} />
      <span className="h-1 w-1 rounded-full bg-current opacity-40" />
      <span>{article.publishedAt}</span>
      <span className="h-1 w-1 rounded-full bg-current opacity-40" />
      <span className="inline-flex items-center gap-1">
        <Clock3 size={13} />
        {article.readingTime} min read
      </span>
    </div>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-signal transition-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-muted dark:border-white/10 dark:text-slate-300">
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-signal">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
      {status}
    </span>
  );
}

export function Momentum({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
      <TrendingUp size={14} />
      <span>{value}% momentum</span>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon = <Bookmark size={25} />,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-black/10 bg-white/60 px-6 py-20 text-center dark:border-white/10 dark:bg-white/[.03]">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-signal/10 text-signal">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-ink dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <LoaderCircle className="animate-spin text-signal" />
    </div>
  );
}

export function SmallStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-signal">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-ink dark:text-white">{value}</div>
        <div className="text-[11px] text-muted dark:text-slate-500">{label}</div>
      </div>
    </div>
  );
}

export { ArrowUpRight, Check, ChevronDown, Flame, Share2, Sparkles };
