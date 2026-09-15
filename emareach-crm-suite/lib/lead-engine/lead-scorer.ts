/**
 * Lead Quality & Relevance Scorer Engine
 * Evaluates candidate leads against ICP target criteria to calculate confidence score (1-100%).
 */

import { LeadProspect } from '@/lib/api';
import { ICPCriteria } from './query-generator';

export function scoreLeadRelevance(lead: LeadProspect, icp: ICPCriteria): number {
  let score = 70; // Base score for real Google / LinkedIn discovered profile

  const lowerTitle = (lead.title || '').toLowerCase();
  const lowerSummary = (lead.summary || '').toLowerCase();
  const lowerCompany = (lead.company || '').toLowerCase();
  const lowerLoc = (lead.location || '').toLowerCase();

  // 1. Role match boost
  if (icp.role) {
    const cleanTargetRole = icp.role.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim();
    if (lowerTitle.includes(cleanTargetRole)) {
      score += 15;
    } else if (
      lowerTitle.includes('vp') ||
      lowerTitle.includes('director') ||
      lowerTitle.includes('head') ||
      lowerTitle.includes('founder') ||
      lowerTitle.includes('officer') ||
      lowerTitle.includes('manager')
    ) {
      score += 8;
    }
  }

  // 2. Geography match boost
  if (icp.geography) {
    const cleanGeo = icp.geography.toLowerCase().split('(')[0].trim();
    if (lowerLoc.includes(cleanGeo) || lowerSummary.includes(cleanGeo)) {
      score += 10;
    }
  }

  // 3. Target company match boost
  if (icp.targetCompany && icp.targetCompany !== 'All Target Companies in Selected Vertical') {
    const cleanComp = icp.targetCompany.toLowerCase().trim();
    if (lowerCompany.includes(cleanComp) || lowerSummary.includes(cleanComp)) {
      score += 10;
    }
  }

  // 4. Downrank if student, intern, or job seeker
  if (
    lowerTitle.includes('student') ||
    lowerTitle.includes('intern') ||
    lowerTitle.includes('seeking') ||
    lowerTitle.includes('candidate')
  ) {
    score -= 30;
  }

  return Math.max(50, Math.min(99, score));
}
