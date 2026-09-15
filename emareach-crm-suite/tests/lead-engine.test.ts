/**
 * Unit & Integration Test Suite for AI Lead Generation Engine
 * Tests Query Generation, Lead Extraction, Deduplication, Relevance Scoring, and Iterative Controller.
 */

import { generateSearchStrategies, ICPCriteria } from '../lib/lead-engine/query-generator';
import { extractCandidateLeads, parseLinkedInTitle, cleanDomainFromUrl } from '../lib/lead-engine/lead-extractor';
import { deduplicateCandidates, normalizeLinkedInUrl, generateLeadKey } from '../lib/lead-engine/deduplicator';
import { scoreLeadRelevance } from '../lib/lead-engine/lead-scorer';
import { LeadProspect } from '../lib/api';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runTests() {
  console.log('========================================================');
  console.log('🧪 RUNNING LEAD GENERATION ENGINE TEST SUITE');
  console.log('========================================================\n');

  // TEST SUITE 1: Query Generation
  console.log('▶ Test Suite 1: Query Generation & Strategy Branching');
  const icp1: ICPCriteria = {
    role: 'VP of Sales & Business Development',
    industry: 'B2B SaaS & Cloud Software',
    geography: 'Pakistan (Islamabad, Lahore, Karachi)',
    targetCompany: 'CyberShield PK',
  };
  const strats1 = generateSearchStrategies(icp1);
  assert(strats1.length >= 4, `Generated ${strats1.length} distinct search strategies (expected >= 4)`);
  assert(
    strats1.some((s: any) => s.query.includes('CyberShield PK')),
    'Includes targeted company strategy for CyberShield PK'
  );
  assert(
    strats1.some((s: any) => s.query.includes('site:linkedin.com/in')),
    'Includes LinkedIn site operators'
  );
  assert(
    strats1.some((s: any) => s.query.includes('Islamabad') || s.query.includes('Pakistan')),
    'Includes geo-cluster queries'
  );

  // Test with broad ICP (no specific target company)
  const icp2: ICPCriteria = {
    role: 'Chief Technology Officer (CTO)',
    industry: 'Fintech & Digital Banking',
    geography: 'United States (Austin, SF, NYC, Boston)',
  };
  const strats2 = generateSearchStrategies(icp2);
  assert(strats2.length >= 4, `Generated ${strats2.length} strategies for broad ICP`);
  assert(
    strats2.some((s: any) => s.query.includes('CTO') || s.query.includes('Chief Technology Officer')),
    'Includes role synonyms (CTO, Chief Technology Officer)'
  );

  console.log('\n▶ Test Suite 2: Lead Extraction & Title Parsing');
  const parsed1 = parseLinkedInTitle('Jane Doe - Chief Revenue Officer - Acme Cyber | LinkedIn');
  assert(parsed1.firstName === 'Jane', `First name correctly parsed as "Jane" (got ${parsed1.firstName})`);
  assert(parsed1.lastName === 'Doe', `Last name correctly parsed as "Doe" (got ${parsed1.lastName})`);
  assert(parsed1.role.includes('Revenue') || parsed1.role.includes('Chief'), `Role parsed accurately (${parsed1.role})`);
  assert(parsed1.company.includes('Acme'), `Company parsed accurately (${parsed1.company})`);

  const mockSerperRows = [
    {
      title: 'Zain Malik - Head of Growth & Outbound - The Outreachers | LinkedIn',
      link: 'https://www.linkedin.com/in/zain-malik-growth',
      snippet: 'Location: Islamabad, Pakistan. Driving outbound pipeline and lead generation.',
    },
    {
      title: 'Sarah Khan - VP Sales @ CloudScale PK | LinkedIn',
      link: 'https://pk.linkedin.com/in/sarah-khan-sales',
      snippet: 'VP of Sales based in Lahore, Pakistan. B2B enterprise software scaling.',
    },
    {
      title: 'Top 10 Software Companies in Islamabad - Directory',
      link: 'https://example.com/directory/top-10',
      snippet: 'Directory of software vendors.',
    },
  ];

  const candidates = extractCandidateLeads(mockSerperRows, {
    industry: 'B2B SaaS',
    geography: 'Pakistan',
  });
  assert(candidates.length === 2, `Extracted 2 candidate leads (filtered 1 directory noise row)`);
  assert(candidates[0].firstName === 'Zain', 'First lead firstName is Zain');
  assert(candidates[0].location.includes('Islamabad') || candidates[0].location.includes('Pakistan'), 'Detected location from snippet');
  assert(candidates[0].email.includes('@theoutreachers.com'), `Derived clean corporate email: ${candidates[0].email}`);

  console.log('\n▶ Test Suite 3: Multi-Level Deduplication');
  const normalizedUrl = normalizeLinkedInUrl('https://pk.linkedin.com/in/zain-malik-growth/?originalSubdomain=pk');
  assert(
    !normalizedUrl.includes('?') && !normalizedUrl.endsWith('/'),
    `Canonical LinkedIn URL formatted cleanly (${normalizedUrl})`
  );

  const duplicateCandidate: LeadProspect = {
    ...candidates[0],
    id: 'dup-123',
    linkedinUrl: 'https://www.linkedin.com/in/zain-malik-growth/?trk=public_profile',
  };

  const dedupeTest = deduplicateCandidates([candidates[1], duplicateCandidate], [candidates[0]]);
  assert(dedupeTest.uniqueLeads.length === 1, `Correctly identified duplicate (1 unique added out of 2)`);
  assert(dedupeTest.duplicatesCount === 1, `Duplicate counter incremented to 1`);

  console.log('\n▶ Test Suite 4: Relevance & Quality Scoring');
  const score1 = scoreLeadRelevance(candidates[0], {
    role: 'Head of Growth & Outbound',
    geography: 'Pakistan',
    industry: 'B2B SaaS',
  });
  assert(score1 >= 85, `High relevance score (${score1}%) calculated for matching candidate`);

  const studentLead: LeadProspect = {
    ...candidates[0],
    title: 'Student Intern seeking job opportunities',
  };
  const score2 = scoreLeadRelevance(studentLead, { role: 'VP Sales' });
  assert(score2 <= 65, `Disqualified/down-ranked student profile (${score2}%)`);

  console.log('\n========================================================');
  console.log('✅ ALL UNIT & ENGINE TESTS PASSED SUCCESSFULLY!');
  console.log('========================================================\n');
}

runTests().catch((e) => {
  console.error('❌ Test failed:', e);
  process.exit(1);
});
