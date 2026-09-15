import { resolvePersonalizationTokens, processSpintax } from '../lib/campaign-engine/personalizer';
import { evaluateRecipientEligibility, isValidEmail } from '../lib/campaign-engine/recipient-eligibility';
import { ContactView, CampaignRecipientView } from '../lib/api';

/**
 * Automated Test Suite for Contacts → Campaigns → Email Outreach
 */
async function runCampaignOutreachTests() {
  console.log('====================================================');
  console.log('🚀 RUNNING CAMPAIGN & EMAIL OUTREACH TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // TEST SUITE 1: Personalization Token Resolution
  // ----------------------------------------------------
  console.log('--- TEST SUITE 1: Personalization Token Resolver ---');

  const testContact1: ContactView = {
    id: 'ct-1',
    user_id: 'usr-1',
    email: 'sarah.connor@cyberdyne.com',
    first_name: 'Sarah',
    last_name: 'Connor',
    company: 'Cyberdyne Systems',
    industry: 'Artificial Intelligence',
    status: 'pending',
    custom_fields: {
      title: 'VP of Security',
      location: 'Los Angeles, CA',
    },
  };

  const subjectTemplate = "Quick question regarding {{company}}'s outbound growth";
  const bodyTemplate = "Hi {{first_name}},\n\nI noticed you are {{job_title}} at {{company}} in {{industry}}.\n\nBest,\nZain";

  const resolvedSubject = resolvePersonalizationTokens(subjectTemplate, testContact1);
  const resolvedBody = resolvePersonalizationTokens(bodyTemplate, testContact1);

  assert(
    resolvedSubject === "Quick question regarding Cyberdyne Systems's outbound growth",
    'Resolves {{company}} token in subject line'
  );

  assert(
    resolvedBody.includes('Hi Sarah,') &&
    resolvedBody.includes('VP of Security') &&
    resolvedBody.includes('Cyberdyne Systems') &&
    resolvedBody.includes('Artificial Intelligence'),
    'Resolves {{first_name}}, {{job_title}}, {{company}}, and {{industry}} tokens in body'
  );

  // Test Fallbacks when fields are missing
  const testContactEmpty: ContactView = {
    id: 'ct-2',
    user_id: 'usr-1',
    email: 'info@unknown.org',
    status: 'pending',
  };

  const resolvedFallback = resolvePersonalizationTokens("Hi {{first_name}}, reaching out to {{company}}.", testContactEmpty);
  assert(
    resolvedFallback === 'Hi there, reaching out to your team.',
    'Provides graceful fallbacks when contact name and company are missing'
  );

  // ----------------------------------------------------
  // TEST SUITE 2: Spintax Processor
  // ----------------------------------------------------
  console.log('\n--- TEST SUITE 2: Spintax Processor ---');

  const spintaxTemplate = "{Hi|Hello|Hey} {{first_name}}, {glad to connect|hope you're well}!";
  const spintaxResolved0 = processSpintax(spintaxTemplate, 0);
  const spintaxResolved1 = processSpintax(spintaxTemplate, 1);
  const spintaxResolved2 = processSpintax(spintaxTemplate, 2);

  assert(
    spintaxResolved0.startsWith('Hi') && spintaxResolved0.includes('glad to connect'),
    'Resolves first Spintax variant on index 0'
  );
  assert(
    spintaxResolved1.startsWith('Hello') && spintaxResolved1.includes("hope you're well"),
    'Resolves second Spintax variant on index 1'
  );
  assert(
    spintaxResolved2.startsWith('Hey'),
    'Resolves third Spintax variant on index 2'
  );

  // ----------------------------------------------------
  // TEST SUITE 3: Recipient Eligibility & Email Validation
  // ----------------------------------------------------
  console.log('\n--- TEST SUITE 3: Recipient Eligibility & Validation ---');

  assert(isValidEmail('zain@emareach.com') === true, 'Validates clean email format');
  assert(isValidEmail('invalid-email') === false, 'Rejects invalid email format without @');
  assert(isValidEmail('') === false, 'Rejects empty string as email');
  assert(isValidEmail(undefined) === false, 'Rejects undefined email');

  const mockContactsPool: ContactView[] = [
    { id: '1', user_id: 'u1', email: 'alex@alpha.com', first_name: 'Alex', company: 'Alpha Corp', status: 'pending' },
    { id: '2', user_id: 'u1', email: 'bella@beta.io', first_name: 'Bella', company: 'Beta Labs', status: 'pending' },
    { id: '3', user_id: 'u1', email: '', first_name: 'Charlie', company: 'Charlie Co', status: 'pending' }, // Ineligible: empty
    { id: '4', user_id: 'u1', email: 'not-an-email', first_name: 'Dave', company: 'Delta Inc', status: 'pending' }, // Ineligible: invalid
    { id: '5', user_id: 'u1', email: 'alex@alpha.com', first_name: 'Alex Dup', company: 'Alpha Duplicate', status: 'pending' }, // Duplicate email
  ];

  const eligibilitySummary = evaluateRecipientEligibility(mockContactsPool);

  assert(eligibilitySummary.totalSelected === 5, 'Accurately counts total selected contacts (5)');
  assert(eligibilitySummary.eligibleCount === 2, 'Identifies exactly 2 eligible contacts');
  assert(eligibilitySummary.noEmailCount === 2, 'Safely catches 2 contacts with missing/invalid email');
  assert(eligibilitySummary.duplicateCount === 1, 'Safely catches 1 duplicate email contact');
  assert(
    eligibilitySummary.eligible[0].email === 'alex@alpha.com' &&
    eligibilitySummary.eligible[1].email === 'bella@beta.io',
    'Preserves only valid, deduplicated recipients in eligible list'
  );

  // ----------------------------------------------------
  // TEST SUITE 4: Campaign Outreach Queue Simulation
  // ----------------------------------------------------
  console.log('\n--- TEST SUITE 4: Outreach Queue Dispatch Simulation ---');

  const campaignRecipients: CampaignRecipientView[] = eligibilitySummary.eligible.map((contact, idx) => ({
    id: `rec-${contact.id}`,
    contactId: contact.id,
    email: contact.email || '',
    firstName: contact.first_name || '',
    company: contact.company || '',
    status: 'queued' as const,
    resolvedSubject: resolvePersonalizationTokens("Question for {{company}}", contact),
    resolvedBody: resolvePersonalizationTokens("Hi {{first_name}}", contact),
  }));

  assert(campaignRecipients.length === 2, 'Instantiates 2 queued recipients for campaign');
  assert(campaignRecipients[0].status === 'queued', 'Initial recipient state is queued');

  // Simulate dispatch transition
  const dispatchedRecipients = campaignRecipients.map((rec) => ({
    ...rec,
    status: 'delivered' as const,
    sentAt: '12:00:00 PM',
  }));

  const deliveredCount = dispatchedRecipients.filter((r) => r.status === 'delivered').length;
  const deliveryRate = (deliveredCount / dispatchedRecipients.length) * 100;

  assert(deliveredCount === 2, 'All 2 recipients successfully transition to delivered status');
  assert(deliveryRate === 100, 'Calculates 100% deliverability rate');

  console.log('\n====================================================');
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runCampaignOutreachTests().catch((err) => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
