/**
 * Multi-Layer Strict Lead Validation Engine
 * Enforces geographic constraints, company headcount, industry domain, and normalized decision-maker job titles.
 */

import { LeadProspect } from '@/lib/api';
import {
  StructuredLocation,
  StructuredSearchCriteria,
  normalizeLocationString,
  MINNESOTA_CITIES,
  US_STATES,
} from './location-types';

export interface ValidationResult {
  passed: boolean;
  rejectionReason?: string;
  normalizedLocation?: {
    country?: string;
    state?: string;
    city?: string;
  };
  scores: {
    location: number;
    companySize: number;
    industry: number;
    jobTitle: number;
    overall: number;
  };
}

// Healthcare & Medical Keywords Dictionary
const HEALTHCARE_KEYWORDS = [
  'health',
  'healthcare',
  'medical',
  'medicine',
  'clinic',
  'clinical',
  'physician',
  'doctor',
  'hospital',
  'healthtech',
  'digital health',
  'care',
  'patient',
  'wellness',
  'dental',
  'pediatric',
  'orthopedic',
  'surgery',
  'therapeutics',
  'biotech',
  'pharma',
  'medtech',
];

// Target Decision Maker Roles & Normalizations
const DECISION_MAKER_PATTERNS: Array<{ regex: RegExp; normalized: string }> = [
  { regex: /\b(md|m\.d\.|medical doctor|physician|doctor of osteopathic|d\.o\.|do)\b/i, normalized: 'Physician / Medical Doctor' },
  { regex: /\b(medical director|chief medical officer|cmo)\b/i, normalized: 'Medical Director' },
  { regex: /\b(founder|co-founder|cofounder)\b/i, normalized: 'Founder / Co-Founder' },
  { regex: /\b(ceo|chief executive officer|president)\b/i, normalized: 'Chief Executive Officer (CEO)' },
  { regex: /\b(managing partner|partner|owner|practice owner|principal)\b/i, normalized: 'Managing Partner / Owner' },
  { regex: /\b(cro|chief revenue officer|vp of sales|head of sales|sales director|business development)\b/i, normalized: 'Chief Revenue Officer (CRO)' },
  { regex: /\b(cto|chief technology officer|vp of engineering|tech lead)\b/i, normalized: 'Chief Technology Officer (CTO)' },
  { regex: /\b(head of growth|vp growth|director of demand gen|growth lead)\b/i, normalized: 'Head of Growth & Outbound' },
  { regex: /\b(executive director|managing director|practice manager|general manager)\b/i, normalized: 'Executive Director' },
  { regex: /\b(director|vice president|vp|chief|head)\b/i, normalized: 'Executive Leadership' },
];

// Non-Decision Maker / Junk Roles to strictly reject
const DISQUALIFIED_ROLE_PATTERNS = [
  /\b(intern|student|trainee|apprentice|volunteer)\b/i,
  /\b(recruiter|talent acquisition|hr coordinator)\b/i,
  /\b(graphic designer|copywriter|content creator)\b/i,
  /\b(junior developer|associate software engineer)\b/i,
  /\b(real estate agent|realtor|broker)\b/i,
];

/**
 * Parses numeric headcount from raw company size string or snippet text
 */
export function extractHeadcountRange(sizeStr?: string, snippet?: string): { min?: number; max?: number; exact?: number } {
  const text = `${sizeStr || ''} ${snippet || ''}`.toLowerCase();

  // Pattern 1: "10-20 employees" or "10 to 20 employees"
  const rangeMatch = text.match(/(\d+)\s*(?:-|–|—|to)\s*(\d+)\s*(?:employees|people|staff|headcount)?/);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10) };
  }

  // Pattern 2: "15 employees" or "12 staff"
  const exactMatch = text.match(/(\d+)\s*(?:employees|people|staff|headcount|physicians)/);
  if (exactMatch) {
    const count = parseInt(exactMatch[1], 10);
    return { exact: count, min: count, max: count };
  }

  // Pattern 3: Standard dropdown options
  if (text.includes('1–10') || text.includes('1-10')) return { min: 1, max: 10 };
  if (text.includes('11–50') || text.includes('11-50')) return { min: 11, max: 50 };
  if (text.includes('10–20') || text.includes('10-20')) return { min: 10, max: 20 };
  if (text.includes('51–200') || text.includes('51-200')) return { min: 51, max: 200 };
  if (text.includes('201–500') || text.includes('201-500')) return { min: 201, max: 500 };
  if (text.includes('500+') || text.includes('1000+') || text.includes('10,000+')) return { min: 500, max: 50000 };

  return {};
}

/**
 * Validates a single discovered lead against target criteria
 */
export function validateLeadCandidate(
  lead: Partial<LeadProspect>,
  criteria: StructuredSearchCriteria
): ValidationResult {
  const targetLoc = criteria.location;
  const leadLocStr = `${lead.location || ''} ${lead.summary || ''} ${lead.company || ''}`;
  const normalizedLeadLoc = normalizeLocationString(leadLocStr);

  let locationScore = 100;
  let companySizeScore = 100;
  let industryScore = 100;
  let jobTitleScore = 100;

  // 1. Strict Geographic Validation (CRITICAL FIX)
  const targetCountry = (targetLoc.country || 'United States').toLowerCase();
  const targetState = targetLoc.state ? targetLoc.state.toLowerCase() : undefined;
  const targetStateCode = targetLoc.stateCode ? targetLoc.stateCode.toLowerCase() : undefined;

  const detectedCountry = normalizedLeadLoc.country ? normalizedLeadLoc.country.toLowerCase() : undefined;
  const detectedState = normalizedLeadLoc.state ? normalizedLeadLoc.state.toLowerCase() : undefined;
  const detectedStateCode = normalizedLeadLoc.stateCode ? normalizedLeadLoc.stateCode.toLowerCase() : undefined;

  // Check 1A: Disqualified Foreign Country Mismatch
  if (detectedCountry && detectedCountry !== targetCountry) {
    return {
      passed: false,
      rejectionReason: `Rejected: Country mismatch (Detected: "${normalizedLeadLoc.country}" != Target: "${targetLoc.country}")`,
      normalizedLocation: normalizedLeadLoc,
      scores: { location: 0, companySize: 0, industry: 0, jobTitle: 0, overall: 0 },
    };
  }

  // Check 1B: Strict State / Region Mismatch
  if (targetState && (criteria.strictLocation !== false)) {
    // If target is Minnesota (MN), verify presence of MN/Minnesota or Minnesota cities
    const hasTargetState =
      (detectedState && detectedState === targetState) ||
      (detectedStateCode && detectedStateCode === targetStateCode) ||
      (targetState === 'minnesota' && MINNESOTA_CITIES.some((city) => leadLocStr.toLowerCase().includes(city.toLowerCase())));

    if (detectedState && detectedState !== targetState) {
      return {
        passed: false,
        rejectionReason: `Rejected: State mismatch (Detected: "${normalizedLeadLoc.state}" != Target: "${targetLoc.state}")`,
        normalizedLocation: normalizedLeadLoc,
        scores: { location: 10, companySize: 0, industry: 0, jobTitle: 0, overall: 10 },
      };
    }

    if (!hasTargetState && !leadLocStr.toLowerCase().includes(targetState) && !leadLocStr.toLowerCase().includes(` ${targetStateCode} `)) {
      locationScore = 70; // Soft caution score if state is unverified
    }
  }

  // 2. Disqualified Role Check
  const rawRole = `${lead.title || ''} ${lead.summary || ''}`.toLowerCase();
  for (const junkRegex of DISQUALIFIED_ROLE_PATTERNS) {
    if (junkRegex.test(rawRole)) {
      return {
        passed: false,
        rejectionReason: `Rejected: Non-decision maker role ("${lead.title}")`,
        normalizedLocation: normalizedLeadLoc,
        scores: { location: locationScore, companySize: 50, industry: 50, jobTitle: 0, overall: 20 },
      };
    }
  }

  // 3. Decision Maker Role Matching
  let matchedRole = false;
  for (const pattern of DECISION_MAKER_PATTERNS) {
    if (pattern.regex.test(rawRole)) {
      matchedRole = true;
      jobTitleScore = 95;
      break;
    }
  }

  // Also check if any of the target criteria.jobTitles match directly
  if (!matchedRole && criteria.jobTitles && criteria.jobTitles.length > 0) {
    for (const title of criteria.jobTitles) {
      const cleanWords = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2);
      if (cleanWords.some((w) => rawRole.includes(w))) {
        matchedRole = true;
        jobTitleScore = 90;
        break;
      }
    }
  }

  if (!matchedRole && criteria.strictJobTitle) {
    return {
      passed: false,
      rejectionReason: `Rejected: Job title "${lead.title}" does not match target decision-maker criteria`,
      normalizedLocation: normalizedLeadLoc,
      scores: { location: locationScore, companySize: 50, industry: 50, jobTitle: 20, overall: 35 },
    };
  }

  // 4. Company Size Validation
  const targetSizeMin = criteria.companySize.min;
  const targetSizeMax = criteria.companySize.max;

  if (targetSizeMin !== undefined || targetSizeMax !== undefined) {
    const detectedRange = extractHeadcountRange(lead.companySize, lead.summary);

    // Reject massive hospital conglomerates if small clinic (10-20) requested
    if (
      targetSizeMax &&
      targetSizeMax <= 50 &&
      (rawRole.includes('hospital network') || rawRole.includes('health system') || (detectedRange.min && detectedRange.min > 500))
    ) {
      return {
        passed: false,
        rejectionReason: `Rejected: Large hospital network/enterprise (Headcount exceeds target max ${targetSizeMax})`,
        normalizedLocation: normalizedLeadLoc,
        scores: { location: locationScore, companySize: 0, industry: 80, jobTitle: jobTitleScore, overall: 30 },
      };
    }

    if (detectedRange.exact !== undefined && criteria.strictCompanySize) {
      if (targetSizeMin && detectedRange.exact < targetSizeMin) {
        return {
          passed: false,
          rejectionReason: `Rejected: Company size ${detectedRange.exact} below minimum ${targetSizeMin}`,
          normalizedLocation: normalizedLeadLoc,
          scores: { location: locationScore, companySize: 20, industry: 80, jobTitle: jobTitleScore, overall: 40 },
        };
      }
      if (targetSizeMax && detectedRange.exact > targetSizeMax) {
        return {
          passed: false,
          rejectionReason: `Rejected: Company size ${detectedRange.exact} above maximum ${targetSizeMax}`,
          normalizedLocation: normalizedLeadLoc,
          scores: { location: locationScore, companySize: 20, industry: 80, jobTitle: jobTitleScore, overall: 40 },
        };
      }
    }
  }

  // 5. Industry Relevance Validation
  const fullText = `${lead.company || ''} ${lead.industry || ''} ${lead.title || ''} ${lead.summary || ''}`.toLowerCase();
  const isHealthcareTarget = criteria.industries.some((ind) =>
    ind.toLowerCase().includes('health') || ind.toLowerCase().includes('medical')
  );

  if (isHealthcareTarget) {
    const hasMedicalKeyword = HEALTHCARE_KEYWORDS.some((kw) => fullText.includes(kw));
    if (!hasMedicalKeyword && criteria.strictIndustry) {
      return {
        passed: false,
        rejectionReason: `Rejected: Industry mismatch (No healthcare/medical relevance detected in profile)`,
        normalizedLocation: normalizedLeadLoc,
        scores: { location: locationScore, companySize: companySizeScore, industry: 10, jobTitle: jobTitleScore, overall: 25 },
      };
    }
  }

  const overall = Math.round(
    locationScore * 0.35 + companySizeScore * 0.2 + industryScore * 0.25 + jobTitleScore * 0.2
  );

  return {
    passed: true,
    normalizedLocation: normalizedLeadLoc,
    scores: {
      location: locationScore,
      companySize: companySizeScore,
      industry: industryScore,
      jobTitle: jobTitleScore,
      overall,
    },
  };
}
