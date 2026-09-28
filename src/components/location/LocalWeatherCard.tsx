import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import { LocalWeather } from "../../types";

export function LocalWeatherCard({ weather }: { weather: LocalWeather }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white to-sky-50/50 p-6 shadow-card dark:border-white/10 dark:from-white/[.04] dark:to-sky-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Cloud size={20} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-400">
              Local Conditions
            </div>
            <div className="text-xs font-semibold text-ink dark:text-white">
              {weather.location}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted dark:bg-white/10 dark:text-slate-400">
          Demo data · {weather.updatedTime}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="font-serif text-5xl font-bold tracking-tight text-ink dark:text-white">
            {weather.temperature}
          </div>
          <div className="mt-1 text-sm font-semibold text-muted dark:text-slate-400">
            {weather.condition} · {weather.highLow}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Droplets size={14} className="text-sky-500" />
            <span>Humidity: {weather.humidity}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind size={14} className="text-teal-500" />
            <span>Wind: {weather.wind}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
