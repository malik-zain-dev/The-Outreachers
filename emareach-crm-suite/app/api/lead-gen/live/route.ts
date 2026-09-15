import { NextRequest, NextResponse } from 'next/server';
import {
  generateLocationAwareStrategies,
  generateManualSearchStrategies,
  parseNaturalLanguageCriteria,
  SearchStrategy,
} from '@/lib/lead-engine/query-generator';
import {
  StructuredLocation,
  StructuredSearchCriteria,
} from '@/lib/lead-engine/location-types';
import { extractCandidateLeads, RawSerperResult } from '@/lib/lead-engine/lead-extractor';
import { deduplicateCandidates } from '@/lib/lead-engine/deduplicator';
import { validateLeadCandidate } from '@/lib/lead-engine/lead-validator';
import { LeadProspect } from '@/lib/api';

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

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const {
      mode = 'guided',
      manualPrompt,
      structuredCriteria,
      location,
      role,
      roles,
      industry,
      industries,
      geography,
      locations,
      companySize,
      targetCompany,
      keywords,
      excludedKeywords,
      targetCount = 20,
      searchBudget = 5,
      serperApiKey,
      groqApiKey,
    } = body;

    const activeSerperKey =
      serperApiKey ||
      process.env.SERPER_API_KEY ||
      '';

    const activeGroqKey =
      groqApiKey ||
      process.env.GROQ_API_KEY ||
      '';

    if (!activeSerperKey) {
      return NextResponse.json(
        {
          error: 'MISSING_SERPER_KEY',
          message: 'Serper API Key is required. Please add your Serper API key in Settings or the workspace header.',
        },
        { status: 400 }
      );
    }

    // 1. Build Normalized StructuredSearchCriteria
    let criteria: StructuredSearchCriteria;

    if (mode === 'manual' && manualPrompt && manualPrompt.trim()) {
      criteria = await parseNaturalLanguageCriteria(manualPrompt.trim(), activeGroqKey);
    } else if (structuredCriteria) {
      criteria = structuredCriteria;
    } else {
      const selectedLoc: StructuredLocation = location || {
        country: 'United States',
        countryCode: 'US',
        state: 'Minnesota',
        stateCode: 'MN',
        city: 'Minneapolis',
        displayName: 'Minnesota (MN), United States',
        source: 'preset',
      };

      const selectedInds = industries && industries.length > 0 ? industries : [industry || 'Healthcare'];
      const selectedRoles = roles && roles.length > 0 ? roles : [role || 'Physician / Medical Doctor'];

      criteria = {
        mode: 'guided',
        location: selectedLoc,
        industries: selectedInds,
        companySize: {
          min: 10,
          max: 20,
          label: companySize || '10–20 Employees',
        },
        jobTitles: selectedRoles,
        targetCompany: targetCompany && targetCompany !== 'All Target Companies in Selected Vertical' ? targetCompany : undefined,
        keywords: keywords || undefined,
        excludedKeywords: excludedKeywords || 'jobs, recruiting, intern, careers',
        strictLocation: true,
        strictCompanySize: true,
        strictIndustry: true,
        strictJobTitle: true,
      };
    }

    // 2. Generate Location-Anchored Strategies
    const strategies: SearchStrategy[] = generateLocationAwareStrategies(criteria);

    const executionLogs: StrategyExecutionLog[] = [];
    const rejectedCandidates: RejectedCandidateLog[] = [];
    let accumulatedLeads: LeadProspect[] = [];
    let totalDuplicatesEncountered = 0;
    let totalRawFetched = 0;
    let totalCandidatesExtracted = 0;
    let passedLocationCount = 0;
    let passedSizeCount = 0;
    let decisionMakersCount = 0;

    const maxBudget = Math.min(Math.max(1, Number(searchBudget) || 5), 8);
    const desiredTarget = Math.min(Math.max(5, Number(targetCount) || 20), 100);

    console.log(`[LEAD_ENGINE] Starting Location-Aware Discovery (Target: ${criteria.location.displayName}): target=${desiredTarget}`);

    // 3. Iterative Multi-Strategy Search Loop
    for (let sIdx = 0; sIdx < strategies.length; sIdx++) {
      if (accumulatedLeads.length >= desiredTarget) break;
      if (executionLogs.length >= maxBudget) break;

      const strat = strategies[sIdx];
      const maxPages = 2;

      for (let page = 1; page <= maxPages; page++) {
        if (accumulatedLeads.length >= desiredTarget) break;
        if (executionLogs.length >= maxBudget) break;

        const stratStart = Date.now();
        let rawOrganic: RawSerperResult[] = [];
        let errorMsg: string | undefined = undefined;

        try {
          console.log(`[LEAD_ENGINE] Executing [${strat.name}] Page ${page}: "${strat.query}"`);
          const serperRes = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
              'X-API-KEY': activeSerperKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: strat.query,
              page,
              num: 10,
            }),
          });

          if (!serperRes.ok) {
            const errBody = await serperRes.text();
            errorMsg = `Serper error (${serperRes.status}): ${errBody.slice(0, 150)}`;
          } else {
            const serperData = await serperRes.json();
            rawOrganic = serperData.organic || [];
          }
        } catch (fetchErr: any) {
          errorMsg = `Network error: ${fetchErr.message}`;
        }

        totalRawFetched += rawOrganic.length;

        // Extract Candidate Leads
        const extracted = extractCandidateLeads(rawOrganic, {
          industry: criteria.industries[0] || 'Healthcare',
          geography: criteria.location.displayName,
          companySize: criteria.companySize.label,
        });

        totalCandidatesExtracted += extracted.length;

        // 4. Strict Multi-Layer Validation
        const validatedLeads: LeadProspect[] = [];
        let strategyRejectedCount = 0;

        for (const candidate of extracted) {
          const valRes = validateLeadCandidate(candidate, criteria);

          if (valRes.passed) {
            passedLocationCount++;
            passedSizeCount++;
            decisionMakersCount++;

            validatedLeads.push({
              ...candidate,
              sourceUrl: candidate.sourceUrl || 'https://google.com',
              confidenceScore: valRes.scores.overall,
              summary: `${candidate.summary} [Location Verified: ${criteria.location.displayName}]`,
            });
          } else {
            strategyRejectedCount++;
            if (rejectedCandidates.length < 50) {
              rejectedCandidates.push({
                id: candidate.id,
                name: `${candidate.firstName} ${candidate.lastName}`,
                title: candidate.title,
                company: candidate.company,
                detectedLocation: candidate.location || 'Unknown',
                rejectionReason: valRes.rejectionReason || 'Failed validation',
                query: strat.query,
              });
            }
          }
        }

        // Deduplicate validated leads against accumulated leads
        const { uniqueLeads, duplicatesCount } = deduplicateCandidates(
          validatedLeads,
          accumulatedLeads
        );

        totalDuplicatesEncountered += duplicatesCount;
        accumulatedLeads = [...accumulatedLeads, ...uniqueLeads];

        executionLogs.push({
          strategyId: strat.id,
          strategyName: strat.name,
          query: strat.query,
          page,
          rawResultsCount: rawOrganic.length,
          candidatesCount: extracted.length,
          validAddedCount: uniqueLeads.length,
          rejectedCount: strategyRejectedCount,
          duplicatesCount,
          durationMs: Date.now() - stratStart,
          error: errorMsg,
        });

        if (rawOrganic.length < 3) break;
      }
    }

    const totalDurationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      criteria,
      totalDiscovered: accumulatedLeads.length,
      targetRequested: desiredTarget,
      prospects: accumulatedLeads,
      rejectedCandidates,
      strategiesExecuted: executionLogs,
      diagnostics: {
        totalQueriesRun: executionLogs.length,
        totalRawFetched,
        totalCandidatesExtracted,
        passedLocationCount,
        passedSizeCount,
        decisionMakersCount,
        totalRejected: rejectedCandidates.length,
        totalDuplicatesFiltered: totalDuplicatesEncountered,
        totalDurationMs,
      },
    });
  } catch (err: any) {
    console.error('[LEAD_ENGINE] Fatal pipeline error:', err);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: err.message || 'Internal lead discovery pipeline error',
      },
      { status: 500 }
    );
  }
}
