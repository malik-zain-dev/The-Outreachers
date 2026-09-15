/**
 * Live Delete Persistence & URL Fetch Reliability Test Suite
 */

import { backendApi } from '../lib/api';

async function runTests() {
  console.log('--- RUNNING LIVE DELETE PERSISTENCE & URL FETCH TEST SUITE ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
      failed++;
    }
  }

  // TEST 1: URL String construction without throwing Invalid URL
  try {
    const origFetch = global.fetch;
    let fetchedInboxUrl = '';
    let fetchedReceivedUrl = '';

    global.fetch = (async (url: any) => {
      const urlStr = String(url);
      if (urlStr.includes('/inbox/emails')) {
        fetchedInboxUrl = urlStr;
        return { ok: true, json: async () => [] };
      }
      if (urlStr.includes('/inbox/received')) {
        fetchedReceivedUrl = urlStr;
        return { ok: true, json: async () => ({ threads: [], has_more: false }) };
      }
      return { ok: true, json: async () => [] };
    }) as any;

    const emails = await backendApi.fetchInboxEmails('interested');
    const received = await backendApi.fetchReceivedEmails('test-inbox-id');

    assert(Array.isArray(emails), 'fetchInboxEmails returns clean array on relative API paths');
    assert(fetchedInboxUrl.includes('/inbox/emails?user_id='), 'fetchInboxEmails formats relative query string correctly');
    assert(fetchedInboxUrl.includes('filter=interested'), 'fetchInboxEmails encodes filter param');
    assert(fetchedReceivedUrl.includes('/inbox/received?user_id='), 'fetchReceivedEmails formats relative query string correctly');
    assert(fetchedReceivedUrl.includes('inbox_id=test-inbox-id'), 'fetchReceivedEmails encodes inbox_id param');

    global.fetch = origFetch;
  } catch (err: any) {
    assert(false, `URL construction threw error: ${err.message}`);
  }

  // TEST 2: Delete Deal API Endpoint
  try {
    const origFetch = global.fetch;
    let deletedDealUrl = '';
    let deleteDealMethod = '';

    global.fetch = (async (url: any, opts: any) => {
      deletedDealUrl = String(url);
      deleteDealMethod = opts?.method || 'GET';
      return { ok: true, json: async () => ({ message: 'Deal deleted' }) };
    }) as any;

    const success = await backendApi.deleteDeal('deal-test-123');
    assert(success === true, 'deleteDeal returns true on 200 OK');
    assert(deletedDealUrl.includes('/deals/deal-test-123'), 'deleteDeal hits /deals/:id endpoint');
    assert(deleteDealMethod === 'DELETE', 'deleteDeal uses HTTP DELETE method');

    global.fetch = origFetch;
  } catch (err: any) {
    assert(false, `deleteDeal threw error: ${err.message}`);
  }

  // TEST 3: Delete Campaign API Endpoint
  try {
    const origFetch = global.fetch;
    let deletedCampUrl = '';
    let deleteCampMethod = '';

    global.fetch = (async (url: any, opts: any) => {
      deletedCampUrl = String(url);
      deleteCampMethod = opts?.method || 'GET';
      return { ok: true, json: async () => ({ message: 'Campaign deleted' }) };
    }) as any;

    const success = await backendApi.deleteCampaign('camp-test-456');
    assert(success === true, 'deleteCampaign returns true on 200 OK');
    assert(deletedCampUrl.includes('/campaigns/camp-test-456'), 'deleteCampaign hits /campaigns/:id endpoint');
    assert(deleteCampMethod === 'DELETE', 'deleteCampaign uses HTTP DELETE method');

    global.fetch = origFetch;
  } catch (err: any) {
    assert(false, `deleteCampaign threw error: ${err.message}`);
  }

  console.log('\n========================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Test execution failed:', e);
  process.exit(1);
});
