/**
 * Multi-Strategy Search Orchestrator
 * Executes Serper API searches across strategic query branches, extracts structured leads,
 * filters against strict location & headcount rules, scores relevance, and deduplicates in real-time.
 */

import { LeadProspect, BackendContact } from '@/lib/api';
import { StructuredSearchCriteria } from './location-types';
import { generateLocationAwareStrategies } from './query-generator';
import { extractCandidateLeads, RawSerperResult } from './lead-extractor';
import { validateLeadCandidate, ValidationResult } from './lead-validator';
import { deduplicateCandidates } from './deduplicator';
import { scoreLeadRelevance } from './lead-scorer';

export interface StrategyExecutionLog {
  strategyId: string;
  strategyName: string;
  query: string;
  page: number;
  rawResultsCount: number;
  candidatesCount: number;
  validAddedCount: number;
  rejectedCount: number;
  duplicatesCount: number;
  durationMs: number;
  error?: string;
}

export interface RejectedCandidateLog {
  id: string;
  name: string;
  title: string;
  company: string;
  detectedLocation: string;
  rejectionReason: string;
  query: string;
}

export interface SearchDiagnostics {
  totalQueriesRun: number;
  rawCandidatesFound: number;
  passedValidationCount: number;
  rejectedCount: number;
  duplicatesRemoved: number;
  averageRelevanceScore: number;
}

export interface SearchExecutionParams {
  criteria: StructuredSearchCriteria;
  serperApiKey: string;
  targetLeadCount?: number;
  searchBudget?: number;
  contacts?: BackendContact[];
}

export interface SearchExecutionResult {
  leads: LeadProspect[];
  executionLogs: StrategyExecutionLog[];
  rejectedCandidates: RejectedCandidateLog[];
  diagnostics: SearchDiagnostics;
}

export async function executeMultiStrategySearch(
  params: SearchExecutionParams
): Promise<SearchExecutionResult> {
  const { criteria, serperApiKey, targetLeadCount = 20, searchBudget = 5, contacts = [] } = params;

  const logs: StrategyExecutionLog[] = [];
  const rejected: RejectedCandidateLog[] = [];
  let collectedLeads: LeadProspect[] = [];
  let totalRawCount = 0;
  let totalDuplicates = 0;

  if (!serperApiKey) {
    throw new Error('Serper API Key is required to execute live search discovery.');
  }

  // Generate strategic query branches
  const strategies = generateLocationAwareStrategies(criteria);
  const maxRuns = Math.min(strategies.length, searchBudget);

  for (let i = 0; i < maxRuns; i++) {
    if (collectedLeads.length >= targetLeadCount) {
      break;
    }

    const strat = strategies[i];
    const startTime = Date.now();
    let rawCount = 0;
    let candidatesCount = 0;
    let validAdded = 0;
    let rejectedCount = 0;
    let duplicatesInStrat = 0;
    let stratError: string | undefined;

    try {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': serperApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: strat.query,
          num: 20,
          gl: (criteria.location.countryCode || 'us').toLowerCase(),
          hl: 'en',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        stratError = `HTTP ${response.status}: ${errorText.slice(0, 100)}`;
      } else {
        const serperData = await response.json();
        const organic: RawSerperResult[] = serperData.organic || [];
        rawCount = organic.length;
        totalRawCount += rawCount;

        // Extract candidate lead objects
        const candidates = extractCandidateLeads(organic, {
          industry: criteria.industries?.[0] || 'Healthcare',
          geography: criteria.location.displayName,
        });
        candidatesCount = candidates.length;

        // Filter and validate candidates
        const passedCandidates: LeadProspect[] = [];

        for (const cand of candidates) {
          const validation: ValidationResult = validateLeadCandidate(cand, criteria);

          if (validation.passed) {
            const score = scoreLeadRelevance(cand, {
              role: criteria.jobTitles?.[0],
              geography: criteria.location.displayName,
              industry: criteria.industries?.[0],
            });
            cand.confidenceScore = score;
            passedCandidates.push(cand);
          } else {
            rejectedCount++;
            rejected.push({
              id: `rej-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              name: `${cand.firstName} ${cand.lastName}`.trim() || 'Candidate',
              title: cand.title,
              company: cand.company,
              detectedLocation: cand.location || 'Unknown location',
              rejectionReason: validation.rejectionReason || 'Failed strict location/title criteria',
              query: strat.query,
            });
          }
        }

        // Deduplicate
        const existingPool = [...contacts.map((c) => ({
          id: c.id,
          firstName: c.first_name || '',
          lastName: c.last_name || '',
          title: c.title || '',
          company: c.company || '',
          industry: c.industry || '',
          companySize: '',
          location: c.location || '',
          email: c.email || '',
          emailVerification: 'valid' as const,
          confidenceScore: 90,
          linkedinUrl: c.linkedin_url || '',
          websiteUrl: c.website_url || '',
          summary: '',
          technologies: [],
        })), ...collectedLeads];

        const dedupeResult = deduplicateCandidates(passedCandidates, existingPool);
        duplicatesInStrat = dedupeResult.duplicatesCount;
        totalDuplicates += duplicatesInStrat;
        validAdded = dedupeResult.uniqueLeads.length;

        collectedLeads = [...collectedLeads, ...dedupeResult.uniqueLeads];
      }
    } catch (err: any) {
      stratError = err.message;
    }

    logs.push({
      strategyId: strat.id,
      strategyName: strat.name,
      query: strat.query,
      page: 1,
      rawResultsCount: rawCount,
      candidatesCount,
      validAddedCount: validAdded,
      rejectedCount,
      duplicatesCount: duplicatesInStrat,
      durationMs: Date.now() - startTime,
      error: stratError,
    });
  }

  const avgScore = collectedLeads.length > 0
    ? Math.round(collectedLeads.reduce((sum, l) => sum + (l.confidenceScore || 85), 0) / collectedLeads.length)
    : 0;

  const diagnostics: SearchDiagnostics = {
    totalQueriesRun: maxRuns,
    rawCandidatesFound: totalRawCount,
    passedValidationCount: collectedLeads.length,
    rejectedCount: rejected.length,
    duplicatesRemoved: totalDuplicates,
    averageRelevanceScore: avgScore,
  };

  return {
    leads: collectedLeads,
    executionLogs: logs,
    rejectedCandidates: rejected,
    diagnostics,
  };
}
