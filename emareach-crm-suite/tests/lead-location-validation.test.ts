/**
 * Automated Test Suite for Lead Generation Location Intelligence & Strict Multi-Layer Validation
 */

import {
  StructuredLocation,
  StructuredSearchCriteria,
  normalizeLocationString,
} from '../lib/lead-engine/location-types';
import {
  validateLeadCandidate,
  extractHeadcountRange,
} from '../lib/lead-engine/lead-validator';
import {
  parseNaturalLanguageCriteria,
  generateLocationAwareStrategies,
} from '../lib/lead-engine/query-generator';
import { deduplicateCandidates } from '../lib/lead-engine/deduplicator';
import { LeadProspect } from '../lib/api';

async function runTests() {
  console.log('--- RUNNING LOCATION INTELLIGENCE & LEAD VALIDATION TEST SUITE ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // Target Criteria: Minnesota (MN), US + Healthcare + 10-20 Employees + MD / Founders
  const targetCriteria: StructuredSearchCriteria = {
    mode: 'guided',
    location: {
      country: 'United States',
      countryCode: 'US',
      state: 'Minnesota',
      stateCode: 'MN',
      city: 'Minneapolis',
      displayName: 'Minnesota (MN), United States',
      source: 'map',
    },
    industries: ['Healthcare', 'Medical Practices', 'HealthTech'],
    companySize: {
      min: 10,
      max: 20,
      label: '10–20 Employees',
    },
    jobTitles: ['Physician / MD / DO', 'Medical Director', 'Founder', 'CEO'],
    strictLocation: true,
    strictCompanySize: true,
    strictIndustry: true,
    strictJobTitle: true,
  };

  // 1. LOCATION VALIDATION TESTS
  console.log('\n[1. Location Validation]');

  // Case A: Valid Minnesota Lead (Minneapolis)
  const minnesotaLead: Partial<LeadProspect> = {
    firstName: 'Sarah',
    lastName: 'Nelson',
    title: 'Medical Director & Physician, MD',
    company: 'Twin Cities Medical Practice',
    location: 'Minneapolis, Minnesota, United States',
    summary: 'Clinical director and practicing physician at Twin Cities Medical Clinic (15 employees) in Minneapolis, MN.',
    companySize: '15 employees',
  };
  const resMN = validateLeadCandidate(minnesotaLead, targetCriteria);
  assert(resMN.passed === true, 'Minnesota lead (Minneapolis, MN) is ACCEPTED');

  // Case B: Valid Rochester MN Lead
  const rochesterLead: Partial<LeadProspect> = {
    firstName: 'David',
    lastName: 'Miller',
    title: 'Founder & CEO',
    company: 'North Star HealthTech',
    location: 'Rochester, MN',
    summary: 'Founder of digital health startup in Rochester, Minnesota with 12 staff.',
    companySize: '12 employees',
  };
  const resRochester = validateLeadCandidate(rochesterLead, targetCriteria);
  assert(resRochester.passed === true, 'Rochester MN lead is ACCEPTED');

  // Case C: Invalid Foreign Lead (Pakistan) — CRITICAL BUG REPRO
  const pakistanLead: Partial<LeadProspect> = {
    firstName: 'Ali',
    lastName: 'Khan',
    title: 'Chief Executive Officer',
    company: 'Lahore HealthTech Labs',
    location: 'Lahore, Pakistan',
    summary: 'CEO at Lahore digital clinic practice in Pakistan with 15 employees.',
    companySize: '15 employees',
  };
  const resPK = validateLeadCandidate(pakistanLead, targetCriteria);
  assert(resPK.passed === false, 'Pakistan lead is strictly REJECTED when targeting Minnesota, US');
  assert(resPK.rejectionReason?.includes('Country mismatch') === true, 'Rejection reason identifies Country mismatch');

  // Case D: Invalid Foreign Lead (Canada / UK / India)
  const canadaLead: Partial<LeadProspect> = {
    firstName: 'Jean',
    lastName: 'Dupont',
    title: 'Physician, MD',
    company: 'Toronto Care Clinic',
    location: 'Toronto, Ontario, Canada',
    summary: 'Practicing physician in Toronto, Canada.',
    companySize: '12 employees',
  };
  const resCA = validateLeadCandidate(canadaLead, targetCriteria);
  assert(resCA.passed === false, 'Canada lead is strictly REJECTED');

  // Case E: Invalid US State (Texas Lead when Minnesota is targeted)
  const texasLead: Partial<LeadProspect> = {
    firstName: 'Brad',
    lastName: 'Cooper',
    title: 'Practice Owner & MD',
    company: 'Austin Health Clinic',
    location: 'Austin, Texas, United States',
    summary: 'Clinic director in Austin, TX with 14 staff.',
    companySize: '14 employees',
  };
  const resTX = validateLeadCandidate(texasLead, targetCriteria);
  assert(resTX.passed === false, 'Texas lead is strictly REJECTED when strict state targeting is active');
  assert(resTX.rejectionReason?.includes('State mismatch') === true, 'Rejection reason identifies State mismatch');

  // 2. COMPANY SIZE VALIDATION TESTS
  console.log('\n[2. Headcount / Company Size Validation]');

  assert(extractHeadcountRange('10-20 employees').min === 10, 'Extracts min 10 headcount');
  assert(extractHeadcountRange('10-20 employees').max === 20, 'Extracts max 20 headcount');
  assert(extractHeadcountRange('15 employees').exact === 15, 'Extracts exact 15 headcount');

  // Case A: 10 Employees -> Accept
  const size10Lead: Partial<LeadProspect> = {
    ...minnesotaLead,
    companySize: '10 employees',
    summary: 'Independent private practice with 10 employees in Minnesota.',
  };
  assert(validateLeadCandidate(size10Lead, targetCriteria).passed === true, '10 employees lead is ACCEPTED');

  // Case B: 15 Employees -> Accept
  const size15Lead: Partial<LeadProspect> = {
    ...minnesotaLead,
    companySize: '15 employees',
    summary: 'Medical clinic with 15 staff in St. Paul, MN.',
  };
  assert(validateLeadCandidate(size15Lead, targetCriteria).passed === true, '15 employees lead is ACCEPTED');

  // Case C: 20 Employees -> Accept
  const size20Lead: Partial<LeadProspect> = {
    ...minnesotaLead,
    companySize: '20 employees',
    summary: 'Healthcare practice with 20 employees in Minnesota.',
  };
  assert(validateLeadCandidate(size20Lead, targetCriteria).passed === true, '20 employees lead is ACCEPTED');

  // Case D: 9 Employees -> Reject
  const size9Lead: Partial<LeadProspect> = {
    ...minnesotaLead,
    companySize: '9 employees',
    summary: 'Boutique office with 9 employees in Minnesota.',
  };
  assert(validateLeadCandidate(size9Lead, targetCriteria).passed === false, '9 employees lead is REJECTED (below min 10)');

  // Case E: 21 Employees -> Reject
  const size21Lead: Partial<LeadProspect> = {
    ...minnesotaLead,
    companySize: '21 employees',
    summary: 'Growing team with 21 employees in Minnesota.',
  };
  assert(validateLeadCandidate(size21Lead, targetCriteria).passed === false, '21 employees lead is REJECTED (above max 20)');

  // Case F: Huge Hospital Network (50,000+ employees) -> Disqualify
  const hospitalNetworkLead: Partial<LeadProspect> = {
    ...minnesotaLead,
    title: 'Department Head',
    company: 'Mayo Clinic Hospital Network',
    summary: 'Major regional health system hospital network with 70,000 employees.',
    companySize: '70,000 employees',
  };
  const resHospital = validateLeadCandidate(hospitalNetworkLead, targetCriteria);
  assert(resHospital.passed === false, 'Large hospital network / enterprise is REJECTED');

  // 3. INDUSTRY & JOB TITLE NORMALIZATION TESTS
  console.log('\n[3. Industry & Job Title Normalization]');

  // Non-decision maker role (Intern / Student)
  const internLead: Partial<LeadProspect> = {
    ...minnesotaLead,
    title: 'Clinical Research Intern',
    summary: 'Student intern at Minnesota health clinic.',
  };
  assert(validateLeadCandidate(internLead, targetCriteria).passed === false, 'Intern / Student role is strictly REJECTED');

  // Unrelated Industry (Real Estate Broker in Minnesota)
  const realEstateLead: Partial<LeadProspect> = {
    firstName: 'Tom',
    lastName: 'Hanks',
    title: 'Founder & CEO',
    company: 'Twin Cities Commercial Real Estate Group',
    location: 'Minneapolis, Minnesota',
    summary: 'Commercial real estate brokerage firm with 15 agents.',
    companySize: '15 employees',
  };
  assert(validateLeadCandidate(realEstateLead, targetCriteria).passed === false, 'Unrelated industry (Real Estate) is REJECTED');

  // 4. NATURAL LANGUAGE MANUAL PROMPT PARSING TEST
  console.log('\n[4. Natural Language Manual Prompt Parsing]');
  const userPrompt = `Find and generate a verified list of leads based on the following specific criteria:
Location: Minnesota (MN), United States
Industry: Healthcare, Medical Practices, Digital Health, or HealthTech
Company Size: 10 to 20 employees
Target Job Titles: Physicians / MD / DO, Founders, Co-Founders, CEOs, Managing Partners, Medical Directors
Constraints: Only independent clinics, small medical groups, private practices. Exclude large hospital networks.`;

  const parsed = await parseNaturalLanguageCriteria(userPrompt);
  assert(parsed.location.state === 'Minnesota', 'Prompt parser correctly extracts State: Minnesota');
  assert(parsed.location.country === 'United States', 'Prompt parser correctly extracts Country: United States');
  assert(parsed.companySize.min === 10, 'Prompt parser correctly extracts Min Size: 10');
  assert(parsed.companySize.max === 20, 'Prompt parser correctly extracts Max Size: 20');
  assert(parsed.industries.some((i) => i.includes('Healthcare')), 'Prompt parser extracts Healthcare industry');
  assert(parsed.jobTitles.some((t) => t.includes('Physician') || t.includes('MD')), 'Prompt parser extracts Physician/MD target role');

  // 5. LOCATION-AWARE QUERY STRATEGY GENERATION TEST
  console.log('\n[5. Strategy Query Generation]');
  const strategies = generateLocationAwareStrategies(parsed);
  assert(strategies.length >= 4, 'Generates at least 4 diversified location-anchored search strategies');
  assert(
    strategies.some((s) => s.query.includes('Minnesota') || s.query.includes('MN')),
    'Search queries are explicitly anchored to Minnesota / MN'
  );
  assert(
    strategies.some((s) => s.query.includes('-intitle:jobs')),
    'Search queries inject negative filters to exclude job postings'
  );

  // 6. DEDUPLICATION TEST
  console.log('\n[6. Candidate Deduplication]');
  const dup1: LeadProspect = {
    id: 'lead-1',
    firstName: 'Sarah',
    lastName: 'Nelson',
    title: 'MD',
    company: 'Twin Cities Medical',
    location: 'Minneapolis, MN',
    email: 'sarah.nelson@twincitiesmed.com',
    industry: 'Healthcare',
    companySize: '15 employees',
    confidenceScore: 95,
    emailVerification: 'valid',
    linkedinUrl: 'https://linkedin.com/in/sarah-nelson-md',
    websiteUrl: 'https://twincitiesmed.com',
    summary: 'Clinical director in Minneapolis',
    technologies: [],
  };
  const dup2: LeadProspect = {
    id: 'lead-2',
    firstName: 'Sarah',
    lastName: 'Nelson',
    title: 'Medical Director',
    company: 'Twin Cities Medical',
    location: 'Minneapolis, Minnesota',
    email: 'sarah.nelson@twincitiesmed.com',
    industry: 'Healthcare',
    companySize: '15 employees',
    confidenceScore: 90,
    emailVerification: 'valid',
    linkedinUrl: 'https://linkedin.com/in/sarah-nelson-md',
    websiteUrl: 'https://twincitiesmed.com',
    summary: 'Clinical director in Minneapolis',
    technologies: [],
  };
  const dedupResult = deduplicateCandidates([dup1, dup2], []);
  assert(dedupResult.uniqueLeads.length === 1, 'Duplicate candidate with same email/company is deduplicated to 1 lead');
  assert(dedupResult.duplicatesCount === 1, 'Duplicates counter is incremented');

  console.log(`\n======================================================`);
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
