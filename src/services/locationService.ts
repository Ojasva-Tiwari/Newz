import {
  CityDataBundle,
  availableDemoCities,
  cityDataMap,
} from "../data/locationData";
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

const delay = <T,>(value: T, ms = 80): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export type GeolocationErrorCode =
  | "NOT_SUPPORTED"
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNKNOWN";

export interface GeolocationResult {
  latitude: number;
  longitude: number;
}

/**
 * Request user's device location through browser Geolocation API.
 * Follows the privacy rule: only called upon explicit user click.
 */
export const getCurrentLocation = (): Promise<GeolocationResult> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ code: "NOT_SUPPORTED", message: "Geolocation is not supported by your browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let code: GeolocationErrorCode = "UNKNOWN";
        if (error.code === error.PERMISSION_DENIED) code = "PERMISSION_DENIED";
        else if (error.code === error.POSITION_UNAVAILABLE) code = "POSITION_UNAVAILABLE";
        else if (error.code === error.TIMEOUT) code = "TIMEOUT";

        reject({ code, message: error.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

/**
 * Resolve coordinates or city choice to LocationContext.
 * In a future phase, this will call a reverse geocoding endpoint or FastAPI proxy.
 */
export const resolveLocation = async (
  coords?: GeolocationResult,
  cityOverride?: string
): Promise<LocationContext> => {
  if (cityOverride && cityDataMap[cityOverride]) {
    return delay({
      ...cityDataMap[cityOverride].context,
      isDemo: true,
    });
  }

  if (coords) {
    // Find closest demo city based on Euclidean distance for demo mapping
    let closest = availableDemoCities[0];
    let minDistance = Infinity;

    for (const city of availableDemoCities) {
      if (city.latitude !== undefined && city.longitude !== undefined) {
        const d = Math.hypot(city.latitude - coords.latitude, city.longitude - coords.longitude);
        if (d < minDistance) {
          minDistance = d;
          closest = city;
        }
      }
    }

    return delay({
      ...closest,
      latitude: coords.latitude,
      longitude: coords.longitude,
      isDemo: false,
    });
  }

  // Default demo fallback: Bengaluru
  return delay(availableDemoCities[0]);
};

export const getAvailableCities = (): LocationContext[] => {
  return availableDemoCities;
};

const getBundleForLocation = (location: LocationContext): CityDataBundle => {
  return cityDataMap[location.city] || cityDataMap["Bengaluru"];
};

export const getLocalNews = async (location: LocationContext): Promise<LocalNews[]> => {
  return delay(getBundleForLocation(location).news);
};

export const getLocalEvents = async (location: LocationContext): Promise<LocalEvent[]> => {
  return delay(getBundleForLocation(location).events);
};

export const getLocalAlerts = async (location: LocationContext): Promise<LocalAlert[]> => {
  return delay(getBundleForLocation(location).alerts);
};

export const getNearbyPlaces = async (location: LocationContext): Promise<NearbyPlace[]> => {
  return delay(getBundleForLocation(location).places);
};

export const getLocalTrending = async (
  location: LocationContext
): Promise<LocalTrendingTopic[]> => {
  return delay(getBundleForLocation(location).trending);
};

export const getLocalTransport = async (
  location: LocationContext
): Promise<LocalTransportUpdate[]> => {
  return delay(getBundleForLocation(location).transport);
};

export const getLocalWeather = async (location: LocationContext): Promise<LocalWeather> => {
  return delay(getBundleForLocation(location).weather);
};

export const getCityDataBundle = async (cityName: string): Promise<CityDataBundle> => {
  return delay(cityDataMap[cityName] || cityDataMap["Bengaluru"]);
};
