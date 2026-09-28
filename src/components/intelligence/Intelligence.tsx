import { useState } from "react";
import { ChevronDown, Eye, Lightbulb, Network, Sparkles } from "lucide-react";
import { AIAnalysis } from "../../types";
import { Tag } from "../ui/Shared";

export function AIBrief({ data }: { data: AIAnalysis }) {
  const [open, setOpen] = useState<string | null>("tldr");

  const sections = [
    ["tldr", "TL;DR", data.tldr],
    ["why", "Why it matters", data.whyItMatters],
  ];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-signal/20 bg-gradient-to-br from-[#fff8f3] to-[#f1e9df] dark:from-[#2c211d] dark:to-[#1d1918]">
      <div className="flex items-center justify-between border-b border-signal/10 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-signal text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="font-serif text-2xl text-ink dark:text-white">AI Brief</div>
            <div className="text-xs text-muted dark:text-slate-400">
              A structured read of the story
            </div>
          </div>
        </div>
        <span className="hidden rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-signal dark:bg-white/10 sm:block">
          Intelligence layer
        </span>
      </div>

      <div className="divide-y divide-signal/10 px-6 sm:px-8">
        {sections.map(([key, title, content]) => (
          <div key={key} className="py-5">
            <button
              className="flex w-full items-center justify-between text-left"
              onClick={() => setOpen(open === key ? null : key)}
              aria-expanded={open === key}
            >
              <span className="text-sm font-bold text-ink dark:text-white">{title}</span>
              <ChevronDown
                size={18}
                className={`text-signal transition ${open === key ? "rotate-180" : ""}`}
              />
            </button>
            {open === key && (
              <p className="mt-3 max-w-3xl animate-fade-in text-sm leading-7 text-muted dark:text-slate-300">
                {content}
              </p>
            )}
          </div>
        ))}

        <div className="grid gap-7 py-6 md:grid-cols-2">
          <IntelligenceList
            icon={<Lightbulb size={17} />}
            title="Key developments"
            items={data.developments}
          />
          <IntelligenceList
            icon={<Eye size={17} />}
            title="What to watch"
            items={data.watch}
          />
        </div>

        <div className="grid gap-6 py-6 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
              <Network size={17} className="text-signal" />
              Key entities
            </div>
            <div className="flex flex-wrap gap-2">
              {data.entities.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm font-bold text-ink dark:text-white">Topics</div>
            <div className="flex flex-wrap gap-2">
              {data.topics.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntelligenceList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
        <span className="text-signal">{icon}</span>
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted dark:text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
