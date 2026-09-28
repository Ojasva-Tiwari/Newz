import { useState } from "react";
import {
  BookOpen,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPin,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { NearbyPlace, NearbyPlaceCategory } from "../../types";

const categoryIcons: Record<NearbyPlaceCategory, typeof Landmark> = {
  Hospitals: HeartPulse,
  Universities: GraduationCap,
  Libraries: BookOpen,
  Restaurants: UtensilsCrossed,
  "Public services": Landmark,
  "Sports facilities": Trophy,
};

export function NearbyPlacesSection({ places }: { places: NearbyPlace[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories: ("All" | NearbyPlaceCategory)[] = [
    "All",
    "Hospitals",
    "Universities",
    "Libraries",
    "Restaurants",
    "Public services",
    "Sports facilities",
  ];

  const filtered =
    activeCategory === "All"
      ? places
      : places.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory === cat
                ? "bg-signal text-white shadow-sm"
                : "border border-black/10 bg-white/70 text-muted hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/[.04] dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((place) => {
          const IconComponent = categoryIcons[place.category] || Landmark;

          return (
            <div
              key={place.id}
              className="flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-card dark:border-white/10 dark:bg-white/[.04]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal">
                    <IconComponent size={12} />
                    {place.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted dark:text-slate-400">
                    <MapPin size={12} className="text-signal" />
                    {place.distance}
                  </span>
                </div>

                <h4 className="font-serif text-xl font-bold text-ink dark:text-white">
                  {place.name}
                </h4>

                <div className="mt-1 text-xs text-muted dark:text-slate-400">
                  {place.address}
                </div>

                <p className="mt-3 text-xs leading-5 text-muted dark:text-slate-300">
                  {place.highlight}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
