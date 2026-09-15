/**
 * Location Intelligence & Structured Criteria Types
 */

export interface StructuredLocation {
  country: string;          // e.g. "United States"
  countryCode?: string;      // e.g. "US"
  state?: string;            // e.g. "Minnesota"
  stateCode?: string;        // e.g. "MN"
  city?: string;             // e.g. "Minneapolis"
  lat?: number;
  lng?: number;
  displayName: string;      // e.g. "Minnesota, United States"
  source: 'map' | 'manual' | 'preset';
}

export interface CompanySizeConstraint {
  min?: number;
  max?: number;
  label: string; // e.g. "10–20 Employees"
}

export interface StructuredSearchCriteria {
  mode: 'manual' | 'guided';
  location: StructuredLocation;
  industries: string[];
  companySize: CompanySizeConstraint;
  jobTitles: string[];
  targetCompany?: string;
  keywords?: string;
  excludedKeywords?: string;
  strictLocation: boolean;
  strictCompanySize: boolean;
  strictIndustry: boolean;
  strictJobTitle: boolean;
}

// US States Dictionary (Name <-> Code)
export const US_STATES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  DC: 'District of Columbia',
};

export const REVERSE_US_STATES: Record<string, string> = Object.entries(US_STATES).reduce(
  (acc, [code, name]) => {
    acc[name.toLowerCase()] = code;
    return acc;
  },
  {} as Record<string, string>
);

// Minnesota Major Cities / Hubs
export const MINNESOTA_CITIES = [
  'Minneapolis',
  'Saint Paul',
  'St. Paul',
  'Rochester',
  'Duluth',
  'Bloomington',
  'Brooklyn Park',
  'Plymouth',
  'Woodbury',
  'Maple Grove',
  'Blaine',
  'Eagan',
  'Eden Prairie',
  'Burnsville',
  'Coon Rapids',
  'Apple Valley',
  'Edina',
  'Minnetonka',
  'St. Cloud',
  'Moorhead',
  'Mankato',
];

// Country Normalization (Avoid colliding with English prepositions like 'in', 'is', 'it', 'at', 'to', 'by', 'as', 'no')
export const COUNTRY_NORMALIZATION: Record<string, { name: string; code: string }> = {
  us: { name: 'United States', code: 'US' },
  usa: { name: 'United States', code: 'US' },
  'u.s.': { name: 'United States', code: 'US' },
  'u.s.a.': { name: 'United States', code: 'US' },
  'united states': { name: 'United States', code: 'US' },
  'united states of america': { name: 'United States', code: 'US' },
  america: { name: 'United States', code: 'US' },

  pk: { name: 'Pakistan', code: 'PK' },
  pakistan: { name: 'Pakistan', code: 'PK' },

  india: { name: 'India', code: 'IN' },

  ca: { name: 'Canada', code: 'CA' },
  canada: { name: 'Canada', code: 'CA' },

  uk: { name: 'United Kingdom', code: 'GB' },
  'u.k.': { name: 'United Kingdom', code: 'GB' },
  'united kingdom': { name: 'United Kingdom', code: 'GB' },
  britain: { name: 'United Kingdom', code: 'GB' },
  england: { name: 'United Kingdom', code: 'GB' },
  scotland: { name: 'United Kingdom', code: 'GB' },
  wales: { name: 'United Kingdom', code: 'GB' },

  au: { name: 'Australia', code: 'AU' },
  australia: { name: 'Australia', code: 'AU' },

  de: { name: 'Germany', code: 'DE' },
  germany: { name: 'Germany', code: 'DE' },
  deutschland: { name: 'Germany', code: 'DE' },

  uae: { name: 'United Arab Emirates', code: 'AE' },
  'u.a.e.': { name: 'United Arab Emirates', code: 'AE' },
  'united arab emirates': { name: 'United Arab Emirates', code: 'AE' },
  dubai: { name: 'United Arab Emirates', code: 'AE' },
  'abu dhabi': { name: 'United Arab Emirates', code: 'AE' },

  singapore: { name: 'Singapore', code: 'SG' },
};

/**
 * Parses free text location into normalized structured country and state
 */
export function normalizeLocationString(text?: string): {
  country?: string;
  countryCode?: string;
  state?: string;
  stateCode?: string;
  city?: string;
  raw: string;
} {
  if (!text) return { raw: '' };
  const raw = text.trim();
  const lower = raw.toLowerCase();

  let country: string | undefined = undefined;
  let countryCode: string | undefined = undefined;
  let state: string | undefined = undefined;
  let stateCode: string | undefined = undefined;
  let city: string | undefined = undefined;

  // 1. Detect Country
  for (const [k, v] of Object.entries(COUNTRY_NORMALIZATION)) {
    const regex = new RegExp(`\\b${k}\\b`, 'i');
    if (regex.test(lower)) {
      country = v.name;
      countryCode = v.code;
      break;
    }
  }

  // 2. Detect US Full State Names First (Case-Insensitive)
  for (const [code, name] of Object.entries(US_STATES)) {
    const nameRegex = new RegExp(`\\b${name}\\b`, 'i');
    if (nameRegex.test(lower)) {
      state = name;
      stateCode = code;
      if (!country) {
        country = 'United States';
        countryCode = 'US';
      }
      break;
    }
  }

  // 3. Detect Major Cities (e.g. Minneapolis, Rochester, Saint Paul)
  for (const c of MINNESOTA_CITIES) {
    const cityRegex = new RegExp(`\\b${c}\\b`, 'i');
    if (cityRegex.test(lower)) {
      city = c;
      if (!state) {
        state = 'Minnesota';
        stateCode = 'MN';
      }
      if (!country) {
        country = 'United States';
        countryCode = 'US';
      }
      break;
    }
  }

  // 4. Detect Strict 2-Letter US State Code (Only Exact Uppercase or comma/parenthesis bound)
  if (!state) {
    const commonWordCodes = ['IN', 'OR', 'ME', 'OH', 'OK', 'LA', 'MA', 'PA', 'HI', 'ID', 'AS', 'NO', 'CO', 'MD'];
    for (const [code, name] of Object.entries(US_STATES)) {
      const isCommonWord = commonWordCodes.includes(code);
      let match = false;

      if (isCommonWord) {
        // Must appear as uppercase and preferably with delimiter e.g. ", MN" or "(MN)" or " MN "
        const strictDelimRegex = new RegExp(`(?:,\\s*|\\()${code}(?:\\)|,)?|\\b${code}\\b`);
        match = strictDelimRegex.test(raw);
      } else {
        const standardRegex = new RegExp(`\\b${code}\\b`, 'i');
        match = standardRegex.test(raw);
      }

      if (match) {
        state = name;
        stateCode = code;
        if (!country) {
          country = 'United States';
          countryCode = 'US';
        }
        break;
      }
    }
  }

  return { country, countryCode, state, stateCode, city, raw };
}
