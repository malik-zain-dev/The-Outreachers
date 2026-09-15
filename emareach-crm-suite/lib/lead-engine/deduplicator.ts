/**
 * Multi-Level Lead Deduplication Engine
 * Deduplicates candidate leads across multiple query strategies and against existing database records.
 */

import { LeadProspect } from '@/lib/api';

export function normalizeLinkedInUrl(url?: string): string {
  if (!url) return '';
  try {
    let clean = url.trim().toLowerCase();
    clean = clean.split('?')[0]; // Remove query params
    clean = clean.replace(/\/+$/, ''); // Remove trailing slashes
    return clean;
  } catch {
    return (url || '').trim().toLowerCase();
  }
}

export function generateLeadKey(lead: LeadProspect): {
  linkedinKey: string;
  emailKey: string;
  nameCompanyKey: string;
} {
  const linkedinKey = normalizeLinkedInUrl(lead.linkedinUrl);
  const emailKey = (lead.email || '').trim().toLowerCase();
  const nameCompanyKey = `${(lead.firstName || '').trim().toLowerCase()}_${(lead.lastName || '').trim().toLowerCase()}@${(lead.company || '').trim().toLowerCase()}`;

  return { linkedinKey, emailKey, nameCompanyKey };
}

export interface DeduplicationResult {
  uniqueLeads: LeadProspect[];
  duplicatesCount: number;
  duplicateKeys: string[];
}

/**
 * Deduplicates a batch of candidates against an existing pool of leads
 */
export function deduplicateCandidates(
  newCandidates: LeadProspect[],
  existingPool: LeadProspect[] = []
): DeduplicationResult {
  const seenLinkedIn = new Set<string>();
  const seenEmails = new Set<string>();
  const seenNameCompany = new Set<string>();

  // Populate seen sets with existing pool
  for (const item of existingPool) {
    const { linkedinKey, emailKey, nameCompanyKey } = generateLeadKey(item);
    if (linkedinKey && !linkedinKey.includes('undefined')) seenLinkedIn.add(linkedinKey);
    if (emailKey) seenEmails.add(emailKey);
    if (nameCompanyKey && !nameCompanyKey.startsWith('executive_')) seenNameCompany.add(nameCompanyKey);
  }

  const uniqueLeads: LeadProspect[] = [];
  const duplicateKeys: string[] = [];
  let duplicatesCount = 0;

  for (const cand of newCandidates) {
    const { linkedinKey, emailKey, nameCompanyKey } = generateLeadKey(cand);

    const isDupLinkedIn = linkedinKey && !linkedinKey.includes('undefined') && seenLinkedIn.has(linkedinKey);
    const isDupEmail = emailKey && seenEmails.has(emailKey);
    const isDupNameComp = nameCompanyKey && !nameCompanyKey.startsWith('executive_') && seenNameCompany.has(nameCompanyKey);

    if (isDupLinkedIn || isDupEmail || isDupNameComp) {
      duplicatesCount++;
      duplicateKeys.push(linkedinKey || emailKey || nameCompanyKey);
      continue;
    }

    if (linkedinKey && !linkedinKey.includes('undefined')) seenLinkedIn.add(linkedinKey);
    if (emailKey) seenEmails.add(emailKey);
    if (nameCompanyKey && !nameCompanyKey.startsWith('executive_')) seenNameCompany.add(nameCompanyKey);

    uniqueLeads.push(cand);
  }

  return {
    uniqueLeads,
    duplicatesCount,
    duplicateKeys,
  };
}
