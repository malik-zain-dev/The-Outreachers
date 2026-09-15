/**
 * End-to-End Simulation Test of the Complete Lead Generation Pipeline
 */

import { generateSearchStrategies } from '../lib/lead-engine/query-generator';
import { extractCandidateLeads } from '../lib/lead-engine/lead-extractor';
import { deduplicateCandidates } from '../lib/lead-engine/deduplicator';
import { scoreLeadRelevance } from '../lib/lead-engine/lead-scorer';
import { LeadProspect } from '../lib/api';

async function testEndToEndPipeline() {
  console.log('========================================================');
  console.log('🚀 RUNNING END-TO-END LEAD DISCOVERY PIPELINE TEST');
  console.log('========================================================\n');

  const icp = {
    role: 'VP of Sales & Business Development',
    industry: 'B2B SaaS & Cloud Software',
    geography: 'Pakistan (Islamabad, Lahore, Karachi)',
    companySize: '50-200 Employees',
    keywords: 'Scale Outbound Meetings & Pipeline',
  };

  console.log('1. Generating Search Strategies for ICP...');
  const strategies = generateSearchStrategies(icp);
  console.log(`   ✓ Generated ${strategies.length} search strategies:`);
  strategies.forEach((s: any, idx: number) => console.log(`     [Strategy ${idx + 1}] (${s.name}): ${s.query}`));

  // Simulate Multi-Query Search execution
  console.log('\n2. Simulating Multi-Query Iterative Execution & Serper Ingestion...');
  let candidatePool: LeadProspect[] = [];
  let totalDuplicates = 0;

  // Mock results for Query 1
  const mockOrganicBatch1 = [
    {
      title: 'Hamza Tariq - VP of Sales - FinFlow PK | LinkedIn',
      link: 'https://pk.linkedin.com/in/hamza-tariq-sales',
      snippet: 'VP of Sales at FinFlow PK in Islamabad. Leading outbound pipeline teams.',
    },
    {
      title: 'Ayesha Siddiqui - Head of Business Development - TechMatrix | LinkedIn',
      link: 'https://pk.linkedin.com/in/ayesha-siddiqui-bd',
      snippet: 'Business Development leader in Lahore, Pakistan.',
    },
  ];

  // Mock results for Query 2 (includes 1 cross-query duplicate and 2 new leads)
  const mockOrganicBatch2 = [
    {
      title: 'Hamza Tariq - VP of Sales @ FinFlow PK | LinkedIn',
      link: 'https://www.linkedin.com/in/hamza-tariq-sales/?trk=public_profile', // duplicate with diff url params
      snippet: 'VP of Sales at FinFlow PK in Islamabad.',
    },
    {
      title: 'Bilal Khan - Director of Sales - CloudScale | LinkedIn',
      link: 'https://pk.linkedin.com/in/bilal-khan-cloudscale',
      snippet: 'Director of Enterprise Sales in Karachi, Pakistan.',
    },
    {
      title: 'Usman Ali - VP Sales & Partnerships - SaaSify | LinkedIn',
      link: 'https://pk.linkedin.com/in/usman-ali-saas',
      snippet: 'VP Sales based in Islamabad.',
    },
  ];

  // Process Batch 1
  const batch1Parsed = extractCandidateLeads(mockOrganicBatch1, icp).map((l) => ({
    ...l,
    confidenceScore: scoreLeadRelevance(l, icp),
  }));
  const dedup1 = deduplicateCandidates(batch1Parsed, candidatePool);
  candidatePool = [...candidatePool, ...dedup1.uniqueLeads];
  totalDuplicates += dedup1.duplicatesCount;

  // Process Batch 2
  const batch2Parsed = extractCandidateLeads(mockOrganicBatch2, icp).map((l) => ({
    ...l,
    confidenceScore: scoreLeadRelevance(l, icp),
  }));
  const dedup2 = deduplicateCandidates(batch2Parsed, candidatePool);
  candidatePool = [...candidatePool, ...dedup2.uniqueLeads];
  totalDuplicates += dedup2.duplicatesCount;

  console.log(`\n3. Results Verification:`);
  console.log(`   ✓ Total Unique Leads Discovered: ${candidatePool.length} (Expected: 4 unique leads)`);
  console.log(`   ✓ Cross-Query Duplicates Filtered: ${totalDuplicates} (Expected: 1 duplicate caught)`);

  if (candidatePool.length !== 4) {
    throw new Error(`Expected 4 unique leads, got ${candidatePool.length}`);
  }
  if (totalDuplicates !== 1) {
    throw new Error(`Expected 1 duplicate filtered, got ${totalDuplicates}`);
  }

  console.log('\n4. Discovered Profiles:');
  candidatePool.forEach((lead, i) => {
    console.log(`   [Lead ${i + 1}] ${lead.firstName} ${lead.lastName} | ${lead.title} @ ${lead.company} (${lead.location}) - Score: ${lead.confidenceScore}% - Email: ${lead.email}`);
  });

  console.log('\n========================================================');
  console.log('✅ END-TO-END PIPELINE SIMULATION COMPLETED SUCCESSFULLY!');
  console.log('========================================================\n');
}

testEndToEndPipeline().catch((e) => {
  console.error('❌ E2E Pipeline failed:', e);
  process.exit(1);
});
