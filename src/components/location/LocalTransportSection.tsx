import { Car, Clock, Navigation } from "lucide-react";
import { LocalTransportUpdate } from "../../types";

const statusStyles = {
  "Normal flow": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Moderate congestion": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "Heavy traffic": "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  "Maintenance work": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Transit advisory": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

export function LocalTransportSection({
  updates,
}: {
  updates: LocalTransportUpdate[];
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs text-muted dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Car size={14} className="text-signal" />
          Transit & Arterial Corridors
        </span>
        <span className="rounded bg-black/5 px-2 py-0.5 text-[10px] font-bold uppercase dark:bg-white/10">
          Demo Transit Feed
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {updates.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[.04]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-ink dark:text-white">
                {item.roadOrArea}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                  statusStyles[item.status] || "bg-black/5 text-muted"
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-muted dark:text-slate-400">
              {item.description}
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted dark:text-slate-500">
              <Clock size={11} />
              <span>Reported {item.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
