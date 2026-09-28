import { useState } from "react";
import {
  AlertCircle,
  Building,
  Check,
  ChevronDown,
  Compass,
  LoaderCircle,
  MapPin,
  Navigation,
  ShieldCheck,
} from "lucide-react";
import { availableDemoCities } from "../../data/locationData";
import { LocationContext } from "../../types";

interface LocationPromptCardProps {
  onUseMyLocation: () => void;
  onSelectCity: (city: LocationContext) => void;
  loading: boolean;
  error?: string | null;
  selectedCity?: LocationContext | null;
}

export function LocationPromptCard({
  onUseMyLocation,
  onSelectCity,
  loading,
  error,
  selectedCity,
}: LocationPromptCardProps) {
  const [showCityPicker, setShowCityPicker] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-midnight sm:p-12">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-signal/10 text-signal shadow-inner">
          <Navigation size={28} className="animate-pulse-soft" />
        </div>

        <div className="mb-2 text-[11px] font-bold uppercase tracking-[.22em] text-signal">
          In Your Area
        </div>

        <h2 className="font-serif text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-5xl">
          Discover what's happening around you.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted dark:text-slate-400 sm:text-base">
          Allow location access to see relevant local news, civic alerts, transport
          updates, events and neighborhood reporting.
        </p>

        {/* Privacy reassurance */}
        <div className="mx-auto mt-4 flex items-center justify-center gap-1.5 text-xs text-muted dark:text-slate-500">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Location is only queried locally on demand. Never stored or tracked.</span>
        </div>

        {/* Error / Denial message */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-left text-xs text-rose-700 dark:border-rose-500/30 dark:text-rose-300">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <div>
              <div className="font-bold">Location access notice</div>
              <div className="mt-0.5">{error}</div>
              <div className="mt-1 text-[11px] opacity-80">
                You can choose any demo city below to explore full local reporting.
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onUseMyLocation}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-signal/20 transition hover:bg-signal/90 hover:shadow-signal/30 disabled:opacity-50"
          >
            {loading ? (
              <>
                <LoaderCircle size={15} className="animate-spin" />
                Detecting location...
              </>
            ) : (
              <>
                <Navigation size={15} />
                Use my location
              </>
            )}
          </button>

          <button
            onClick={() => onSelectCity(availableDemoCities[0])}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <MapPin size={15} className="text-signal" />
            Use demo location (Bengaluru)
          </button>

          <button
            onClick={() => setShowCityPicker(!showCityPicker)}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-transparent px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted hover:text-ink dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
          >
            <Building size={14} />
            Choose another city
            <ChevronDown size={14} className={showCityPicker ? "rotate-180" : ""} />
          </button>
        </div>

        {/* City picker dropdown */}
        {showCityPicker && (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-black/10 bg-white/90 p-3 shadow-card backdrop-blur-md dark:border-white/10 dark:bg-midnight/90">
            <div className="mb-2 text-left px-3 pt-1 text-[10px] font-bold uppercase tracking-widest text-muted dark:text-slate-400">
              Select Demo City
            </div>
            <div className="grid gap-1">
              {availableDemoCities.map((city) => {
                const isCurrent = selectedCity?.city === city.city;
                return (
                  <button
                    key={city.city}
                    onClick={() => {
                      onSelectCity(city);
                      setShowCityPicker(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs transition ${
                      isCurrent
                        ? "bg-signal text-white font-semibold"
                        : "hover:bg-black/5 dark:hover:bg-white/5 text-ink dark:text-white"
                    }`}
                  >
                    <div>
                      <div className="font-bold">{city.city}</div>
                      <div
                        className={`text-[10px] ${
                          isCurrent ? "text-white/80" : "text-muted dark:text-slate-400"
                        }`}
                      >
                        {city.area}, {city.region}
                      </div>
                    </div>
                    {isCurrent && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
