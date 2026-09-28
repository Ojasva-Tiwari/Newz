import { useEffect, useState } from "react";
import {
  Building2,
  Calendar,
  ChevronDown,
  Compass,
  MapPin,
  Navigation,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  LocalAlert,
  LocalEvent,
  LocalNews,
  LocalTransportUpdate,
  LocalTrendingTopic,
  LocalWeather,
  LocationContext,
  NearbyPlace,
} from "../types";
import {
  availableDemoCities,
  cityDataMap,
} from "../data/locationData";
import {
  getCurrentLocation,
  getLocalAlerts,
  getLocalEvents,
  getLocalNews,
  getLocalTransport,
  getLocalTrending,
  getLocalWeather,
  getNearbyPlaces,
  resolveLocation,
} from "../services/locationService";
import { SectionHeading } from "../components/ui/Shared";
import { LocationPromptCard } from "../components/location/LocationPromptCard";
import { LocalWeatherCard } from "../components/location/LocalWeatherCard";
import { LocalAlertsSection } from "../components/location/LocalAlertsSection";
import { LocalNewsGrid } from "../components/location/LocalNewsGrid";
import { LocalEventsSection } from "../components/location/LocalEventsSection";
import { LocalTransportSection } from "../components/location/LocalTransportSection";
import { NearbyPlacesSection } from "../components/location/NearbyPlacesSection";
import { LocalTrendingSection } from "../components/location/LocalTrendingSection";

export function NearbyPage() {
  const [location, setLocation] = useState<LocationContext | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showCityMenu, setShowCityMenu] = useState<boolean>(false);

  // Data states
  const [weather, setWeather] = useState<LocalWeather | null>(null);
  const [alerts, setAlerts] = useState<LocalAlert[]>([]);
  const [news, setNews] = useState<LocalNews[]>([]);
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [transport, setTransport] = useState<LocalTransportUpdate[]>([]);
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [trending, setTrending] = useState<LocalTrendingTopic[]>([]);

  // Load data for active location
  const loadLocationData = async (loc: LocationContext) => {
    try {
      setLoading(true);
      const [
        weatherData,
        alertsData,
        newsData,
        eventsData,
        transportData,
        placesData,
        trendingData,
      ] = await Promise.all([
        getLocalWeather(loc),
        getLocalAlerts(loc),
        getLocalNews(loc),
        getLocalEvents(loc),
        getLocalTransport(loc),
        getNearbyPlaces(loc),
        getLocalTrending(loc),
      ]);

      setWeather(weatherData);
      setAlerts(alertsData);
      setNews(newsData);
      setEvents(eventsData);
      setTransport(transportData);
      setPlaces(placesData);
      setTrending(trendingData);
      setLocation(loc);
      setLocationError(null);
    } catch (err) {
      console.error("Failed to load local data", err);
    } finally {
      setLoading(false);
    }
  };

  // Explicit user action: "Use my location"
  const handleUseMyLocation = async () => {
    try {
      setLoading(true);
      setLocationError(null);
      const coords = await getCurrentLocation();
      const resolved = await resolveLocation(coords);
      await loadLocationData(resolved);
    } catch (err: any) {
      setLoading(false);
      if (err?.code === "PERMISSION_DENIED") {
        setLocationError(
          "Location permission was denied by your browser settings. You can explore using one of the demo cities below."
        );
      } else if (err?.code === "POSITION_UNAVAILABLE") {
        setLocationError(
          "Position could not be determined at this moment. You can select a demo city below."
        );
      } else if (err?.code === "TIMEOUT") {
        setLocationError(
          "Location request timed out. Please try again or select a demo city."
        );
      } else {
        setLocationError(
          "Could not access device location. Please choose a demo city."
        );
      }
    }
  };

  // Explicit user action: Choose a demo city
  const handleSelectCity = (city: LocationContext) => {
    loadLocationData(city);
  };

  return (
    <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 sm:px-8 lg:px-10 lg:pt-12">
      {/* If location has not been selected yet, show privacy-first prompt */}
      {!location ? (
        <LocationPromptCard
          onUseMyLocation={handleUseMyLocation}
          onSelectCity={handleSelectCity}
          loading={loading}
          error={locationError}
          selectedCity={location}
        />
      ) : (
        <div>
          {/* Active Location Header */}
          <header className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6 dark:border-white/10">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-signal">
                  <Compass size={15} />
                  In Your Area
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-4xl font-bold tracking-tight text-ink dark:text-white sm:text-6xl">
                    What's happening around you
                  </h1>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 font-semibold text-ink dark:text-white">
                    <MapPin size={15} className="text-signal" />
                    {location.city}, {location.region}
                  </span>
                  <span>·</span>
                  <span>{location.area}</span>
                  {location.isDemo && (
                    <span className="rounded bg-signal/10 px-2 py-0.5 text-[10px] font-bold uppercase text-signal">
                      Demo location
                    </span>
                  )}
                </div>
              </div>

              {/* Location Switcher Controls */}
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowCityMenu(!showCityMenu)}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm transition hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/[.04] dark:text-white"
                  >
                    <Building2 size={14} className="text-signal" />
                    <span>Change city ({location.city})</span>
                    <ChevronDown size={14} className={showCityMenu ? "rotate-180" : ""} />
                  </button>

                  <button
                    onClick={handleUseMyLocation}
                    disabled={loading}
                    title="Detect actual device location"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-muted hover:text-signal dark:border-white/10 dark:bg-white/[.04] dark:text-slate-300"
                  >
                    <Navigation size={13} />
                    <span className="hidden sm:inline">Use GPS</span>
                  </button>
                </div>

                {/* City dropdown */}
                {showCityMenu && (
                  <div className="absolute right-0 z-20 mt-2 w-56 rounded-2xl border border-black/10 bg-white p-2 shadow-card dark:border-white/10 dark:bg-midnight">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-400">
                      Switch Coverage City
                    </div>
                    {availableDemoCities.map((c) => (
                      <button
                        key={c.city}
                        onClick={() => {
                          handleSelectCity(c);
                          setShowCityMenu(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                          location.city === c.city
                            ? "bg-signal text-white font-semibold"
                            : "hover:bg-black/5 dark:hover:bg-white/5 text-ink dark:text-white"
                        }`}
                      >
                        <span>{c.city}</span>
                        <span className="text-[10px] opacity-70">{c.region}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Weather & Alerts Grid */}
          <section className="mb-14 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
            {weather && <LocalWeatherCard weather={weather} />}
            <div>
              <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-signal">
                Important Local Alerts
              </div>
              <LocalAlertsSection alerts={alerts} />
            </div>
          </section>

          {/* Local News */}
          <section className="mb-16 sm:mb-20">
            <SectionHeading
              eyebrow="Local Coverage"
              title={`News in ${location.city}`}
              description="Neighborhood journalism, infrastructure reporting, and civic stories relevant to this area."
            />
            <LocalNewsGrid news={news} />
          </section>

          {/* Local Events & Traffic */}
          <div className="mb-16 grid gap-12 lg:grid-cols-[1.1fr_.9fr] sm:mb-20">
            <section>
              <SectionHeading
                eyebrow="Community Calendar"
                title="Upcoming local events"
                description="Technology conferences, civic walks, cultural performances, and sporting events."
              />
              <LocalEventsSection events={events} />
            </section>

            <section>
              <SectionHeading
                eyebrow="Mobility"
                title="Traffic & transport"
                description="Key arterial roads, transit corridors, and scheduled maintenance updates."
              />
              <LocalTransportSection updates={transport} />
            </section>
          </div>

          {/* Nearby Places */}
          <section className="mb-16 sm:mb-20">
            <SectionHeading
              eyebrow="Civic Directory"
              title="Nearby places & services"
              description="Essential public facilities, research universities, healthcare centers, and cultural hubs."
            />
            <NearbyPlacesSection places={places} />
          </section>

          {/* Local Trending */}
          <section>
            <SectionHeading
              eyebrow="Local Pulse"
              title={`Trending near ${location.city}`}
              description="Topics, proposals, and debates gathering attention across local sources."
            />
            <LocalTrendingSection trending={trending} />
          </section>
        </div>
      )}
    </main>
  );
}
