import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  Link as LinkIcon,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Article, CoverageItem, TimelineEvent } from "../../types";
import { findSource } from "../../services/mockService";
import {
  BookmarkButton,
  MetaLine,
  ProgressBar,
  SectionHeading,
  SourceBadge,
  Tag,
} from "../ui/Shared";
import { AIBrief } from "../intelligence/Intelligence";
import { analysis } from "../../data/mockData";

export function ArticleView({
  article,
  bookmarked,
  onBookmark,
}: {
  article: Article;
  bookmarked: boolean;
  onBookmark: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const source = findSource(article.sourceId);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <ProgressBar progress={progress} />
      <main className="animate-fade-in">
        <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted transition hover:text-signal dark:text-slate-400"
          >
            <ArrowLeft size={15} /> Back to signal
          </Link>
        </div>

        <article className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.17em] text-signal">
              <span>{article.category}</span>
              <span className="h-1 w-1 rounded-full bg-signal" />
              <span>Field report</span>
            </div>
            <h1 className="max-w-5xl font-serif text-5xl leading-[.96] tracking-tight text-ink dark:text-white sm:text-7xl">
              {article.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted dark:text-slate-300 sm:text-xl">
              {article.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-black/10 py-5 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-signal text-sm font-bold text-white">
                  {article.author.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink dark:text-white">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-muted dark:text-slate-500">
                    {article.author.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <MetaLine article={article} />
                <BookmarkButton active={bookmarked} onClick={onBookmark} />
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem]">
            <img
              src={article.image}
              alt=""
              className="max-h-[680px] w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,700px)_260px]">
            <div>
              <div className="prose-signal">
                {article.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                {article.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>

              <div className="mt-12">
                <AIBrief data={analysis} />
              </div>

              <div className="mt-16">
                <Timeline />
              </div>

              <div className="mt-16">
                <Coverage />
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
                  <div className="mb-4 text-xs font-bold uppercase tracking-widest text-muted dark:text-slate-500">
                    On this page
                  </div>
                  <nav className="space-y-3 text-sm">
                    {["The story", "AI Brief", "Timeline", "Coverage"].map((item) => (
                      <a
                        href={`#${item.toLowerCase().replace(" ", "-")}`}
                        key={item}
                        className="block text-muted transition hover:text-signal dark:text-slate-400"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="rounded-2xl bg-ink p-5 text-white dark:bg-white dark:text-ink">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-signal">
                    <MessageCircle size={14} /> Join the read
                  </div>
                  <p className="font-serif text-xl leading-tight">
                    Follow the signal, not just the headline.
                  </p>
                  <button className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white dark:text-ink/60 dark:hover:text-ink">
                    Explore intelligence <LinkIcon size={14} />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  const events: TimelineEvent[] = [
    { time: "08:30", title: "Initial report", description: "A city planning coalition publishes a comparative study of nighttime mobility.", type: "report" },
    { time: "10:15", title: "Additional source reports", description: "Transit agencies in three cities confirm new overnight pilot programs.", type: "update" },
    { time: "12:40", title: "Official statement", description: "A metropolitan planning office announces a public consultation.", type: "official" },
    { time: "15:20", title: "New development", description: "Neighborhood groups call for the pilot to include libraries and local clinics.", type: "analysis" },
  ];

  return (
    <section id="timeline">
      <SectionHeading eyebrow="Story timeline" title="How the story unfolded" />
      <div className="relative grid gap-3 sm:grid-cols-4">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-black/10 sm:block dark:bg-white/10" />
        {events.map((event, index) => (
          <button
            key={event.time}
            onClick={() => setActive(index)}
            className={`relative text-left transition ${
              active === index ? "text-ink dark:text-white" : "text-muted dark:text-slate-500"
            }`}
          >
            <div className={`mb-4 h-3 w-3 rounded-full border-4 border-paper dark:border-midnight ${
              active === index ? "bg-signal ring-4 ring-signal/15" : "bg-slate-300 dark:bg-slate-600"
            }`} />
            <div className="text-xs font-bold">{event.time}</div>
            <div className="mt-2 font-serif text-lg leading-tight">{event.title}</div>
            {active === index && (
              <p className="mt-2 animate-fade-in text-xs leading-5 text-muted dark:text-slate-400">
                {event.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

function Coverage() {
  const coverage: CoverageItem[] = [
    { sourceId: "northstar", headline: "The cities learning to live after midnight", timestamp: "42 min ago", summary: "A people-first look at how the night is becoming a new civic frontier.", perspective: "Human impact" },
    { sourceId: "public-square", headline: "Who owns the hours after dark?", timestamp: "1 hr ago", summary: "The policy choices behind late-night transit, safety, and access.", perspective: "Policy lens" },
    { sourceId: "the-ledger", headline: "The economics of keeping a city awake", timestamp: "2 hrs ago", summary: "Why businesses and workers are becoming central to the new night economy.", perspective: "Market lens" },
    { sourceId: "morning-brief", headline: "A practical guide to the 24-hour city", timestamp: "3 hrs ago", summary: "The services, habits, and infrastructure changing after-hours life.", perspective: "Neutral" },
  ];

  return (
    <section id="coverage">
      <SectionHeading
        eyebrow="Coverage"
        title="One story, several lenses"
        description="Fictional coverage from the Signal source network."
      />
      <div className="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10">
        <div className="hidden grid-cols-[180px_1fr_120px] gap-5 border-b border-black/10 bg-black/[.025] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-muted dark:border-white/10 dark:bg-white/[.03] dark:text-slate-500 sm:grid">
          <span>Source</span><span>Coverage</span><span>Perspective</span>
        </div>
        {coverage.map((item) => (
          <div key={item.sourceId} className="grid gap-3 border-b border-black/10 px-5 py-5 last:border-0 dark:border-white/10 sm:grid-cols-[180px_1fr_120px] sm:items-center sm:gap-5">
            <SourceBadge sourceId={item.sourceId} />
            <div>
              <div className="font-serif text-lg text-ink dark:text-white">{item.headline}</div>
              <p className="mt-1 text-sm leading-5 text-muted dark:text-slate-400">{item.summary}</p>
              <div className="mt-2 text-[11px] text-muted dark:text-slate-500">{item.timestamp}</div>
            </div>
            <span className="w-fit rounded-full bg-signal/10 px-2.5 py-1 text-[10px] font-bold text-signal">{item.perspective}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
