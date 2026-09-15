/**
 * OpenStreetMap Nominatim Geocoding Service
 * Free, open-source geocoding with caching and structured mapping.
 */

import { StructuredLocation, normalizeLocationString, US_STATES } from './location-types';

const cache = new Map<string, StructuredLocation[]>();

export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
  };
}

export async function searchGeographicLocations(query: string): Promise<StructuredLocation[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  if (cache.has(cleanQuery.toLowerCase())) {
    return cache.get(cleanQuery.toLowerCase()) || [];
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      cleanQuery
    )}&format=json&addressdetails=1&limit=6`;

    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'EmaReach-CRM-LeadGen/2.0 (contact@emareach.ai)',
      },
    });

    if (!res.ok) {
      return getStaticLocationPresets(cleanQuery);
    }

    const data: NominatimResult[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return getStaticLocationPresets(cleanQuery);
    }

    const structuredList: StructuredLocation[] = data.map((item) => {
      const addr = item.address || {};
      const country = addr.country || 'United States';
      const countryCode = (addr.country_code || 'US').toUpperCase();
      const state = addr.state;
      const city = addr.city || addr.town || addr.village;

      let stateCode: string | undefined = undefined;
      if (countryCode === 'US' && state) {
        for (const [code, name] of Object.entries(US_STATES)) {
          if (name.toLowerCase() === state.toLowerCase()) {
            stateCode = code;
            break;
          }
        }
      }

      return {
        country,
        countryCode,
        state,
        stateCode,
        city,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        displayName: item.display_name,
        source: 'map',
      };
    });

    cache.set(cleanQuery.toLowerCase(), structuredList);
    return structuredList;
  } catch (e) {
    console.warn('[GEOCODING] Nominatim request fallback to presets:', e);
    return getStaticLocationPresets(cleanQuery);
  }
}

/**
 * Fallback static regional presets for fast zero-latency selection
 */
export function getStaticLocationPresets(query?: string): StructuredLocation[] {
  const PRESETS: StructuredLocation[] = [
    {
      country: 'United States',
      countryCode: 'US',
      state: 'Minnesota',
      stateCode: 'MN',
      city: 'Minneapolis',
      lat: 44.9778,
      lng: -93.265,
      displayName: 'Minnesota (MN), United States',
      source: 'preset',
    },
    {
      country: 'United States',
      countryCode: 'US',
      state: 'Texas',
      stateCode: 'TX',
      city: 'Austin',
      lat: 30.2672,
      lng: -97.7431,
      displayName: 'Texas (Austin, Dallas, Houston), United States',
      source: 'preset',
    },
    {
      country: 'United States',
      countryCode: 'US',
      state: 'California',
      stateCode: 'CA',
      city: 'San Francisco',
      lat: 37.7749,
      lng: -122.4194,
      displayName: 'California (SF, Silicon Valley, LA), United States',
      source: 'preset',
    },
    {
      country: 'United States',
      countryCode: 'US',
      state: 'New York',
      stateCode: 'NY',
      city: 'New York City',
      lat: 40.7128,
      lng: -74.006,
      displayName: 'New York (NYC Metro), United States',
      source: 'preset',
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'Greater London',
      city: 'London',
      lat: 51.5074,
      lng: -0.1278,
      displayName: 'London, United Kingdom',
      source: 'preset',
    },
    {
      country: 'Pakistan',
      countryCode: 'PK',
      state: 'Punjab',
      city: 'Lahore',
      lat: 31.5204,
      lng: 74.3587,
      displayName: 'Pakistan (Islamabad, Lahore, Karachi)',
      source: 'preset',
    },
    {
      country: 'United Arab Emirates',
      countryCode: 'AE',
      state: 'Dubai',
      city: 'Dubai',
      lat: 25.2048,
      lng: 55.2708,
      displayName: 'Dubai, United Arab Emirates',
      source: 'preset',
    },
    {
      country: 'Singapore',
      countryCode: 'SG',
      city: 'Singapore',
      lat: 1.3521,
      lng: 103.8198,
      displayName: 'Singapore Tech Hub',
      source: 'preset',
    },
  ];

  if (!query) return PRESETS;
  const q = query.toLowerCase();
  const filtered = PRESETS.filter(
    (p) =>
      p.displayName.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      (p.state && p.state.toLowerCase().includes(q)) ||
      (p.city && p.city.toLowerCase().includes(q))
  );

  return filtered.length > 0
    ? filtered
    : [
        {
          ...normalizeLocationString(query),
          displayName: query,
          country: normalizeLocationString(query).country || 'United States',
          countryCode: normalizeLocationString(query).countryCode || 'US',
          source: 'manual',
          lat: 44.9778,
          lng: -93.265,
        },
      ];
}

export type LocationTarget = StructuredLocation;
export const geocodingService = {
  searchLocations: searchGeographicLocations,
  getPresets: getStaticLocationPresets,
};
