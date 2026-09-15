/**
 * Location-Aware Multi-Strategy Search Query Generation Engine
 * Generates high-precision Google Serper search queries anchored to structured geographic constraints.
 */

import {
  StructuredLocation,
  StructuredSearchCriteria,
  normalizeLocationString,
  MINNESOTA_CITIES,
} from './location-types';

export interface SearchStrategy {
  id: string;
  name: string;
  description: string;
  query: string;
  priority: number;
}

export interface ICPCriteria {
  mode?: 'manual' | 'guided';
  manualPrompt?: string;
  role?: string;
  roles?: string[];
  industry?: string;
  industries?: string[];
  geography?: string;
  locations?: string[];
  companySize?: string;
  targetCompany?: string;
  keywords?: string;
  excludedKeywords?: string;
}

// Target Decision Maker Roles & Normalizations
const ROLE_SYNONYMS_MAP: Record<string, string[]> = {
  'Physician / Medical Doctor (MD / DO)': ['"Physician"', '"Medical Doctor"', '"Doctor"', '"MD"', '"DO"'],
  'Medical Director / Chief Medical Officer': ['"Medical Director"', '"Chief Medical Officer"', '"CMO"'],
  'Founder / Chief Executive Officer (CEO)': ['"Founder"', '"CEO"', '"Co-Founder"', '"Chief Executive Officer"'],
  'Co-Founder / Managing Partner': ['"Co-Founder"', '"Managing Partner"', '"Partner"', '"Owner"'],
  'Chief Revenue Officer (CRO)': ['"CRO"', '"Chief Revenue Officer"', '"VP Revenue"'],
  'VP of Sales & Business Development': ['"VP of Sales"', '"Head of Sales"', '"Sales Director"', '"Business Development"'],
  'Chief Technology Officer (CTO)': ['"CTO"', '"Chief Technology Officer"', '"VP of Engineering"'],
  'Head of Growth & Outbound': ['"Head of Growth"', '"VP Growth"', '"Director of Demand Gen"'],
  'Executive Director / Practice Manager': ['"Executive Director"', '"Practice Manager"', '"Managing Director"'],
};

// Industry Keyword Normalization Map
const INDUSTRY_KEYWORDS_MAP: Record<string, string[]> = {
  'Healthcare & Medical Practices': ['"Healthcare"', '"Medical"', '"Clinic"'],
  'HealthTech & Digital Health': ['"HealthTech"', '"Digital Health"', '"Biotech"'],
  'Biomedical & Life Sciences': ['"Biomedical"', '"Life Sciences"', '"Biotech"'],
  'B2B SaaS & Cloud Software': ['"SaaS"', '"Software"', '"Cloud"'],
  'Software Development & IT Services': ['"Software"', '"IT Services"', '"Technology"'],
  'FinTech & Digital Banking': ['"FinTech"', '"Banking"', '"Financial Tech"'],
  'Cybersecurity & InfoSec': ['"Cybersecurity"', '"InfoSec"', '"Security"'],
  'Supply Chain & Logistics': ['"Supply Chain"', '"Logistics"', '"Freight"'],
  'Marketing & Growth Agencies': ['"Marketing Agency"', '"Growth Agency"', '"Digital Agency"'],
  'Education & EdTech': ['"EdTech"', '"Education"', '"E-Learning"'],
  'Manufacturing & Industrial Tech': ['"Manufacturing"', '"Industrial Tech"'],
};

function normalizeRoleToQueryTokens(roles: string[]): string {
  const tokens: string[] = [];
  for (const role of roles) {
    if (ROLE_SYNONYMS_MAP[role]) {
      tokens.push(...ROLE_SYNONYMS_MAP[role]);
    } else {
      // Clean freeform text e.g. "Founder / Co-Founder" -> '"Founder"', '"Co-Founder"'
      const subParts = role
        .replace(/[()]/g, '')
        .split(/[/,&|]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      for (const part of subParts) {
        tokens.push(part.includes('"') ? part : `"${part}"`);
      }
    }
  }
  const uniqueTokens = Array.from(new Set(tokens));
  return uniqueTokens.length > 0
    ? uniqueTokens.slice(0, 5).join(' OR ')
    : '"Founder" OR "CEO" OR "Executive"';
}

function normalizeIndustryToQueryTokens(industries: string[]): string {
  const tokens: string[] = [];
  for (const ind of industries) {
    if (INDUSTRY_KEYWORDS_MAP[ind]) {
      tokens.push(...INDUSTRY_KEYWORDS_MAP[ind]);
    } else {
      const subParts = ind
        .replace(/[()]/g, '')
        .split(/[/,&|]+/)
        .map((s) => s.trim())
        .filter(Boolean);
      for (const part of subParts) {
        tokens.push(part.includes('"') ? part : `"${part}"`);
      }
    }
  }
  const uniqueTokens = Array.from(new Set(tokens));
  return uniqueTokens.length > 0
    ? uniqueTokens.slice(0, 4).join(' OR ')
    : '"Software" OR "Healthcare" OR "Business"';
}

function normalizeExclusions(excludedText?: string): string {
  if (!excludedText) return '-intitle:jobs -intitle:careers -intitle:recruiting';
  // Avoid excluding harmful broad words like "network", "large", "hospital"
  const unsafeWords = new Set(['network', 'large', 'hospital', 'linkedin', 'com', 'in', 'and', 'or', 'the']);
  const words = excludedText
    .split(/[,;\s]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 1 && !unsafeWords.has(w));

  if (words.length === 0) return '-intitle:jobs -intitle:careers -intitle:recruiting';
  return words.map((w) => `-${w}`).join(' ');
}

/**
 * Parses freeform natural-language prompt into StructuredSearchCriteria
 */
export async function parseNaturalLanguageCriteria(
  promptText: string,
  groqApiKey?: string
): Promise<StructuredSearchCriteria> {
  const cleanPrompt = promptText.trim();

  // Try Groq LLM parsing first if API key is present
  if (groqApiKey) {
    try {
      const aiPrompt = `You are an expert sales intelligence system architect.
Parse this natural-language lead generation requirement into structured JSON:
"${cleanPrompt}"

Required Schema:
{
  "location": {
    "country": "string (e.g. United States)",
    "countryCode": "string (e.g. US)",
    "state": "string (e.g. Minnesota)",
    "stateCode": "string (e.g. MN)",
    "city": "string or null",
    "displayName": "string (e.g. Minnesota (MN), United States)"
  },
  "industries": ["string"],
  "companySize": {
    "min": number or null,
    "max": number or null,
    "label": "string (e.g. 10–20 Employees)"
  },
  "jobTitles": ["string"],
  "targetCompany": "string or null",
  "keywords": "string or null",
  "excludedKeywords": "string or null",
  "strictLocation": true,
  "strictCompanySize": true,
  "strictIndustry": true,
  "strictJobTitle": true
}

Return ONLY valid JSON without markdown fences.`;

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: aiPrompt }],
          temperature: 0.1,
          response_format: { type: 'json_object' },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
        if (parsed.location && parsed.industries) {
          return {
            mode: 'manual',
            location: {
              ...parsed.location,
              source: 'manual',
              displayName: parsed.location.displayName || `${parsed.location.state || ''} ${parsed.location.country}`,
            },
            industries: Array.isArray(parsed.industries) ? parsed.industries : [parsed.industries],
            companySize: parsed.companySize || { min: 10, max: 20, label: '10–20 Employees' },
            jobTitles: Array.isArray(parsed.jobTitles) ? parsed.jobTitles : ['Founder', 'CEO'],
            targetCompany: parsed.targetCompany || undefined,
            keywords: parsed.keywords || undefined,
            excludedKeywords: parsed.excludedKeywords || 'jobs, recruiting, intern',
            strictLocation: true,
            strictCompanySize: true,
            strictIndustry: true,
            strictJobTitle: true,
          };
        }
      }
    } catch (e) {
      console.warn('[QUERY_GEN] Groq prompt parser fallback to deterministic regex:', e);
    }
  }

  // Fallback Deterministic Rule-Based Parser
  const normLoc = normalizeLocationString(cleanPrompt);
  const location: StructuredLocation = {
    country: normLoc.country || 'United States',
    countryCode: normLoc.countryCode || 'US',
    state: normLoc.state || 'Minnesota',
    stateCode: normLoc.stateCode || 'MN',
    city: normLoc.city,
    displayName: `${normLoc.state || 'Minnesota'} (${normLoc.stateCode || 'MN'}), ${normLoc.country || 'United States'}`,
    source: 'manual',
  };

  const industries: string[] = [];
  if (/health|medical|clinic|doctor|physician/i.test(cleanPrompt)) {
    industries.push('Healthcare & Medical Practices');
  } else if (/saas|software|tech|developer|it/i.test(cleanPrompt)) {
    industries.push('B2B SaaS & Cloud Software');
  } else if (/fintech|bank|finance/i.test(cleanPrompt)) {
    industries.push('FinTech & Digital Banking');
  } else {
    industries.push('B2B SaaS & Cloud Software');
  }

  // Headcount range extraction
  let minSize: number | undefined = undefined;
  let maxSize: number | undefined = undefined;
  const sizeMatch = cleanPrompt.match(/(\d+)\s*(?:to|-|–|—)\s*(\d+)\s*(?:employees|people|staff)?/i);
  if (sizeMatch) {
    minSize = parseInt(sizeMatch[1], 10);
    maxSize = parseInt(sizeMatch[2], 10);
  }

  const jobTitles: string[] = [];
  if (/physician|md|do|doctor/i.test(cleanPrompt)) jobTitles.push('Physician / Medical Doctor (MD / DO)');
  if (/founder|co-founder/i.test(cleanPrompt)) jobTitles.push('Founder / Chief Executive Officer (CEO)');
  if (/ceo|chief executive/i.test(cleanPrompt)) jobTitles.push('Founder / Chief Executive Officer (CEO)');
  if (/medical director/i.test(cleanPrompt)) jobTitles.push('Medical Director / Chief Medical Officer');
  if (/cto|technology officer/i.test(cleanPrompt)) jobTitles.push('Chief Technology Officer (CTO)');
  if (/sales|cro|revenue/i.test(cleanPrompt)) jobTitles.push('VP of Sales & Business Development');

  return {
    mode: 'manual',
    location,
    industries,
    companySize: {
      min: minSize || 10,
      max: maxSize || 20,
      label: minSize && maxSize ? `${minSize}–${maxSize} Employees` : '10–20 Employees',
    },
    jobTitles: jobTitles.length > 0 ? jobTitles : ['Founder / Chief Executive Officer (CEO)'],
    excludedKeywords: 'jobs, recruiting, intern, careers',
    strictLocation: true,
    strictCompanySize: true,
    strictIndustry: true,
    strictJobTitle: true,
  };
}

/**
 * Generate Location-Anchored Multi-Strategy Queries from Structured Criteria
 */
export function generateLocationAwareStrategies(criteria: StructuredSearchCriteria): SearchStrategy[] {
  const strategies: SearchStrategy[] = [];
  const loc = criteria.location;

  const stateName = loc.state;
  const stateCode = loc.stateCode || stateName;
  const countryName = loc.country || 'United States';

  // Geographic anchor query tokens
  const geoAnchor = stateName
    ? `("${stateName}" OR "${stateCode}")`
    : `"${countryName}"`;

  const rolesOr = normalizeRoleToQueryTokens(criteria.jobTitles || []);
  const industryOr = normalizeIndustryToQueryTokens(criteria.industries || []);
  const excluded = normalizeExclusions(criteria.excludedKeywords);

  let stratIdx = 1;

  // 0. Target Company Specific Strategy (if target company is set)
  if (criteria.targetCompany && criteria.targetCompany !== 'All Target Companies in Selected Vertical') {
    strategies.push({
      id: `loc-strat-${stratIdx++}`,
      name: 'Target Company Executive Search',
      description: `Discovers specific leadership at ${criteria.targetCompany}`,
      query: `site:linkedin.com/in "${criteria.targetCompany}" ${geoAnchor} ${excluded}`.trim(),
      priority: 1,
    });
  }

  // 1. Direct Leadership Strategy
  strategies.push({
    id: `loc-strat-${stratIdx++}`,
    name: 'Regional Executive Leadership',
    description: `Discovers licensed professionals and leaders in ${stateName || countryName}`,
    query: `site:linkedin.com/in (${rolesOr}) ${geoAnchor} (${industryOr}) ${excluded}`.trim(),
    priority: criteria.targetCompany ? 2 : 1,
  });

  // 2. Founders & C-Levels Strategy
  strategies.push({
    id: `loc-strat-${stratIdx++}`,
    name: 'Executive Founders & Officers',
    description: `Targets Founders, CEOs, and Managing Partners in ${stateName || countryName}`,
    query: `site:linkedin.com/in ("Founder" OR "CEO" OR "Co-Founder" OR "Managing Partner" OR "Owner") ${geoAnchor} (${industryOr}) ${excluded}`.trim(),
    priority: 2,
  });

  // 3. City-Cluster Leadership Strategy
  const rawDisplayName = loc.displayName || '';
  const matchCities = rawDisplayName.match(/\(([^)]+)\)/);
  const detectedCities = matchCities
    ? matchCities[1].split(',').map((c) => c.trim())
    : loc.city
    ? [loc.city]
    : loc.state === 'Minnesota'
    ? MINNESOTA_CITIES.slice(0, 4)
    : [];

  if (detectedCities.length > 0) {
    const cityOr = detectedCities.slice(0, 4).map((c) => (c.includes('"') ? c : `"${c}"`)).join(' OR ');
    strategies.push({
      id: `loc-strat-${stratIdx++}`,
      name: 'Metro Hub Leadership',
      description: `Targets decision-makers located in ${detectedCities.slice(0, 3).join(', ')}`,
      query: `site:linkedin.com/in (${rolesOr}) (${cityOr}) (${industryOr}) ${excluded}`.trim(),
      priority: 3,
    });
  }

  // 4. Industry Organization & Leadership Search
  strategies.push({
    id: `loc-strat-${stratIdx++}`,
    name: 'Corporate & Regional Directory Search',
    description: `Discovers verified companies and leadership groups in ${stateName || countryName}`,
    query: `(${industryOr}) ${geoAnchor} (${rolesOr}) ${excluded}`.trim(),
    priority: 4,
  });

  // 5. High-Growth C-Level Search
  strategies.push({
    id: `loc-strat-${stratIdx++}`,
    name: 'High-Growth Ventures & Leadership',
    description: `Finds growth-stage founders and executives in ${stateName || countryName}`,
    query: `site:linkedin.com/in ("CEO" OR "Founder" OR "President") ${geoAnchor} (${industryOr}) ${excluded}`.trim(),
    priority: 5,
  });

  return strategies;
}

export async function generateManualSearchStrategies(
  promptText: string,
  groqApiKey?: string
): Promise<{ criteria: StructuredSearchCriteria; strategies: SearchStrategy[] }> {
  const criteria = await parseNaturalLanguageCriteria(promptText, groqApiKey);
  const strategies = generateLocationAwareStrategies(criteria);
  return { criteria, strategies };
}

export function generateGuidedSearchStrategies(criteria: StructuredSearchCriteria | ICPCriteria | any): SearchStrategy[] {
  if (criteria.location) {
    return generateLocationAwareStrategies(criteria as StructuredSearchCriteria);
  }
  const normLoc = normalizeLocationString(criteria.geography || (criteria.locations && criteria.locations[0]) || 'Minnesota');
  const structured: StructuredSearchCriteria = {
    mode: 'guided',
    location: {
      country: normLoc.country || 'United States',
      countryCode: normLoc.countryCode || 'US',
      state: normLoc.state || 'Minnesota',
      stateCode: normLoc.stateCode || 'MN',
      city: normLoc.city,
      displayName: criteria.geography || 'Minnesota, United States',
      source: 'preset',
    },
    industries: criteria.industries || [criteria.industry || 'Healthcare & Medical Practices'],
    companySize: { label: criteria.companySize || '10–20 Employees', min: 10, max: 20 },
    jobTitles: criteria.roles || [criteria.role || 'Founder / Chief Executive Officer (CEO)'],
    targetCompany: criteria.targetCompany,
    keywords: criteria.keywords,
    excludedKeywords: criteria.excludedKeywords || 'jobs, recruiting, intern, careers',
    strictLocation: true,
    strictCompanySize: true,
    strictIndustry: true,
    strictJobTitle: true,
  };
  return generateLocationAwareStrategies(structured);
}

export function generateSearchStrategies(criteria: any): SearchStrategy[] {
  return generateGuidedSearchStrategies(criteria);
}
