import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { LocalEvent, LocalEventCategory } from "../../types";

const eventCategoryColors: Record<LocalEventCategory, string> = {
  Technology: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Sports: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Cultural: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Public: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Community: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
};

export function LocalEventsSection({ events }: { events: LocalEvent[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
        >
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  eventCategoryColors[event.category] || "bg-black/5 text-muted"
                }`}
              >
                {event.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-signal">
                <Calendar size={13} />
                {event.date}
              </span>
            </div>

            <h4 className="font-serif text-xl font-bold leading-tight text-ink transition group-hover:text-signal dark:text-white">
              {event.name}
            </h4>

            <div className="mt-2 space-y-1 text-xs text-muted dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-signal" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-signal" />
                <span>
                  {event.venue ? `${event.venue} (${event.approximateArea})` : event.approximateArea}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted dark:text-slate-400">
              {event.shortDescription}
            </p>
          </div>

          <div className="mt-5 border-t border-black/10 pt-3 text-[11px] text-muted dark:border-white/10 dark:text-slate-500">
            Source: {event.source}
          </div>
        </div>
      ))}
    </div>
  );
}
