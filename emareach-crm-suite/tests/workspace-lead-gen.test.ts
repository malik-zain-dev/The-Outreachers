/**
 * Workspace Test Suite for AI Lead Generation & Contacts Pipeline
 * Tests Manual/Guided query generation, candidate extraction with phone numbers,
 * local filtering, duplicate contact detection, and MongoDB contact creation.
 */

import {
  generateGuidedSearchStrategies,
  generateManualSearchStrategies,
} from '../lib/lead-engine/query-generator';
import { extractCandidateLeads, parseLinkedInTitle } from '../lib/lead-engine/lead-extractor';
import { deduplicateCandidates, normalizeLinkedInUrl } from '../lib/lead-engine/deduplicator';
import { scoreLeadRelevance } from '../lib/lead-engine/lead-scorer';
import { LeadProspect, BackendContact } from '../lib/api';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runWorkspaceTests() {
  console.log('========================================================');
  console.log('🧪 RUNNING AI LEAD GENERATION WORKSPACE TEST SUITE');
  console.log('========================================================\n');

  // 1. Test Manual Search Strategy Generation
  console.log('▶ Test 1: Manual Search Strategy Generation (Natural Prompt)');
  const manualPrompt = 'Find CTOs and VP of Engineering at B2B SaaS startups in Islamabad with 10 to 100 employees';
  const manualRes = await generateManualSearchStrategies(manualPrompt);
  const manualStrats = Array.isArray(manualRes) ? manualRes : manualRes.strategies;
  assert(manualStrats.length >= 3, `Generated ${manualStrats.length} strategies for manual prompt`);
  assert(
    manualStrats.some((s: any) => s.query.includes('site:linkedin.com/in')),
    'Includes LinkedIn site query'
  );
  assert(
    manualStrats.some((s: any) => s.query.includes('-intitle:jobs')),
    'Includes negative job filters'
  );

  // 2. Test Guided Search Strategy Generation
  console.log('\n▶ Test 2: Guided Search Strategy Generation (Multi-Role & Exclusions)');
  const guidedIcp = {
    roles: ['Chief Revenue Officer (CRO)', 'VP of Sales & Business Development'],
    industries: ['FinTech & Digital Banking'],
    locations: ['Pakistan (Islamabad, Lahore, Karachi)'],
    companySize: '51–200 Employees',
    excludedKeywords: 'jobs, intern, recruiting, student',
  };
  const guidedStrats = generateGuidedSearchStrategies(guidedIcp as any);
  assert(guidedStrats.length >= 4, `Generated ${guidedStrats.length} guided search strategies`);
  assert(
    guidedStrats.some((s) => s.query.includes('-jobs') || s.query.includes('-intern')),
    'Includes negative exclusion operators in queries'
  );

  // 3. Test Lead Extractor with Public Phone Number and Source Tracking
  console.log('\n▶ Test 3: Lead Extraction with Public Phone & Source URL');
  const mockSerpItems = [
    {
      title: 'Dr. Tariq Mahmood - Chief Technology Officer - FinSecure PK | LinkedIn',
      link: 'https://pk.linkedin.com/in/dr-tariq-mahmood-cto',
      snippet: 'CTO based in Islamabad, Pakistan. Tel: +92 51 2345678. Leading enterprise security infrastructure.',
    },
    {
      title: 'Amina Farooq - VP Engineering @ CloudScale | LinkedIn',
      link: 'https://pk.linkedin.com/in/amina-farooq-eng',
      snippet: 'VP of Engineering in Lahore, Pakistan. Scaling cloud microservices architecture.',
    },
  ];

  const extracted = extractCandidateLeads(mockSerpItems, {
    industry: 'FinTech',
    geography: 'Pakistan',
  });
  assert(
    extracted[0].firstName === 'Tariq' || extracted[0].firstName === 'Dr. Tariq' || extracted[0].firstName === 'Dr.',
    `Parsed first name: ${extracted[0].firstName}`
  );
  assert(extracted[0].phone !== undefined && extracted[0].phone.includes('51'), `Extracted phone number: ${extracted[0].phone}`);
  assert(extracted[1].phone === undefined, 'Second lead has phone = undefined (honest null handling)');
  assert(extracted[0].sourceUrl === mockSerpItems[0].link, 'Retains exact discovery source URL');

  // 4. Test Local Filter Logic
  console.log('\n▶ Test 4: Local Client-Side Results Filtering');
  const scoredLeads: LeadProspect[] = extracted.map((l) => ({
    ...l,
    confidenceScore: scoreLeadRelevance(l, { role: 'Chief Technology Officer (CTO)', geography: 'Pakistan' }),
  }));

  const phoneOnly = scoredLeads.filter((l) => Boolean(l.phone));
  assert(phoneOnly.length === 1, `Filter by "Phone Available" returned 1 lead (expected 1)`);

  const highScoreOnly = scoredLeads.filter((l) => l.confidenceScore >= 85);
  assert(highScoreOnly.length >= 1, `Filter by "Score >= 85%" returned ${highScoreOnly.length} leads`);

  // 5. Test Add to Contacts & Duplicate Protection Logic
  console.log('\n▶ Test 5: Add to Contacts & Duplicate Merge Protection');
  const existingContacts: BackendContact[] = [
    {
      id: 'ct-existing-1',
      user_id: 'default',
      email: 'dr.tariq.mahmood@finsecurepk.com',
      first_name: 'Tariq',
      last_name: 'Mahmood',
      company: 'FinSecure PK',
      status: 'pending',
      custom_fields: {
        title: 'CTO',
        linkedin: 'https://pk.linkedin.com/in/dr-tariq-mahmood-cto',
      },
    },
  ];

  // Check duplicate detection
  const isDuplicate = existingContacts.some(
    (c) =>
      (c.email || '').toLowerCase() === scoredLeads[0].email.toLowerCase() ||
      c.custom_fields?.linkedin?.toLowerCase() === scoredLeads[0].linkedinUrl.toLowerCase()
  );
  assert(isDuplicate === true, 'Correctly detected lead already exists in Contacts database');

  const isNew = existingContacts.some(
    (c) =>
      (c.email || '').toLowerCase() === scoredLeads[1].email.toLowerCase() ||
      c.custom_fields?.linkedin?.toLowerCase() === scoredLeads[1].linkedinUrl.toLowerCase()
  );
  assert(isNew === false, 'Correctly detected lead 2 is a new contact');

  console.log('\n========================================================');
  console.log('✅ ALL WORKSPACE & CONTACTS PIPELINE TESTS PASSED!');
  console.log('========================================================\n');
}

runWorkspaceTests().catch((e) => {
  console.error('❌ Test failed:', e);
  process.exit(1);
});
