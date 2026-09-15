/**
 * Automated Live API Test Suite for Contacts Search & Filtering
 * Tests all 9 validation scenarios from requirements against the live backend API.
 * Run with: npx tsx tests/contacts-search-filter.test.ts
 */

import assert from 'assert';
import { backendApi, BackendContact, ContactList } from '../lib/api';

async function runTests() {
  console.log('=================================================================');
  console.log('🧪 RUNNING CONTACTS SEARCH & FILTER LIVE API TEST SUITE');
  console.log('=================================================================\n');

  // Seed sample real contacts for testing search and multi-criteria filters
  console.log('--- Setup: Seeding test contacts and lists ---');
  
  // 1. Create a test list
  const testList = await backendApi.createContactList({
    name: 'Minnesota Healthcare Leads',
    description: 'Test list for validation',
  });
  assert.ok(testList && testList.id, 'Failed to create test contact list');
  console.log(`Created test list: ${testList.name} (${testList.id})`);

  // 2. Create distinct test contacts
  const contact1 = await backendApi.createContact({
    first_name: 'John',
    last_name: 'Smith',
    email: 'john@abcmedical.com',
    phone: '+1 (612) 555-0101',
    company: 'ABC Medical',
    title: 'Chief Physician',
    location: 'Minneapolis, Minnesota, USA',
    linkedin_url: 'https://linkedin.com/in/johnsmith-abc',
    website_url: 'https://abcmedical.com',
    source: 'manual',
    status: 'active',
    list_ids: [testList.id],
  });
  assert.ok(contact1 && contact1.id, 'Failed to create Contact 1');

  const contact2 = await backendApi.createContact({
    first_name: 'Sarah',
    last_name: 'Jones',
    email: 'sarah@xyzhealth.com',
    phone: '+1 (651) 555-0202',
    company: 'XYZ Health',
    title: 'Hospital Administrator',
    location: 'Rochester, Minnesota, USA',
    linkedin_url: 'https://linkedin.com/in/sarahjones-xyz',
    source: 'csv_import',
    status: 'active',
    list_ids: [testList.id],
  });
  assert.ok(contact2 && contact2.id, 'Failed to create Contact 2');

  const contact3 = await backendApi.createContact({
    first_name: 'Robert',
    last_name: 'Noemail',
    email: '', // No email
    phone: '+1 (612) 555-0303',
    company: 'Twin Cities Clinic',
    title: 'Staff Physician',
    location: 'Saint Paul, Minnesota, USA',
    source: 'ai_lead_gen',
    status: 'pending',
    list_ids: [testList.id],
  });
  assert.ok(contact3 && contact3.id, 'Failed to create Contact 3');

  const contact4 = await backendApi.createContact({
    first_name: 'David',
    last_name: 'California',
    email: 'david@calhealth.org',
    company: 'CalHealth Systems',
    title: 'Director',
    location: 'San Francisco, California, USA',
    source: 'manual',
    status: 'active',
    list_ids: [],
  });
  assert.ok(contact4 && contact4.id, 'Failed to create Contact 4');

  console.log('✅ Seeded 4 test contacts with varying fields.\n');

  try {
    // ----------------------------------------------------
    // TEST 1: Search by Person's Name
    // ----------------------------------------------------
    console.log('--- TEST 1: Search by Name ("John") ---');
    const res1 = await backendApi.fetchContacts({ search: 'John' });
    assert.ok(res1.contacts.length >= 1, 'Should find at least 1 contact');
    const johnFound = res1.contacts.find((c) => c.id === contact1.id);
    assert.ok(johnFound, 'John Smith must be in search results');
    const davidFoundInJohn = res1.contacts.find((c) => c.id === contact4.id);
    assert.strictEqual(davidFoundInJohn, undefined, 'David California must NOT be in John search');
    console.log(`✅ TEST 1 PASSED: Searching "John" returned John Smith (${res1.total} total matching)`);

    // ----------------------------------------------------
    // TEST 2: Search by Company ("ABC Medical")
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Search by Company ("ABC Medical") ---');
    const res2 = await backendApi.fetchContacts({ search: 'ABC Medical' });
    const abcFound = res2.contacts.find((c) => c.id === contact1.id);
    assert.ok(abcFound, 'ABC Medical contact returned');
    assert.ok(!res2.contacts.find((c) => c.id === contact2.id), 'Sarah (XYZ Health) not returned');
    console.log(`✅ TEST 2 PASSED: Searching "ABC Medical" returned ABC Medical contacts.`);

    // ----------------------------------------------------
    // TEST 3: Search by Email ("sarah@xyzhealth.com")
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Search by Email ("sarah@xyzhealth.com") ---');
    const res3 = await backendApi.fetchContacts({ search: 'sarah@xyzhealth.com' });
    assert.strictEqual(res3.contacts.length, 1, 'Exactly one contact matches email');
    assert.strictEqual(res3.contacts[0].id, contact2.id, 'Correct contact returned by email');
    console.log(`✅ TEST 3 PASSED: Searching by exact email found Sarah Jones.`);

    // ----------------------------------------------------
    // TEST 4: Filter Has Email = No (has_email=false)
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Filter Has Email = No ---');
    const res4 = await backendApi.fetchContacts({ has_email: false });
    const noEmailFound = res4.contacts.find((c) => c.id === contact3.id);
    assert.ok(noEmailFound, 'Contact without email returned in has_email=false');
    const hasEmailFound = res4.contacts.find((c) => c.id === contact1.id);
    assert.strictEqual(hasEmailFound, undefined, 'Contact with email must NOT appear in has_email=false');
    console.log(`✅ TEST 4 PASSED: Filter has_email=false returned only contacts without email.`);

    // ----------------------------------------------------
    // TEST 5: Filter by List (Minnesota Healthcare Leads)
    // ----------------------------------------------------
    console.log('\n--- TEST 5: Filter by List ---');
    const res5 = await backendApi.fetchContacts({ list_id: testList.id });
    assert.ok(res5.contacts.some((c) => c.id === contact1.id), 'Contact 1 in list');
    assert.ok(res5.contacts.some((c) => c.id === contact2.id), 'Contact 2 in list');
    assert.ok(res5.contacts.some((c) => c.id === contact3.id), 'Contact 3 in list');
    assert.ok(!res5.contacts.some((c) => c.id === contact4.id), 'Contact 4 NOT in list');
    console.log(`✅ TEST 5 PASSED: List filter correctly isolated contacts in "${testList.name}".`);

    // ----------------------------------------------------
    // TEST 6: Combined Filters (Location = Minnesota AND Has Email = No)
    // ----------------------------------------------------
    console.log('\n--- TEST 6: Combined Filters (Search=Minnesota AND has_email=false) ---');
    const res6 = await backendApi.fetchContacts({ search: 'Minnesota', has_email: false });
    const combinedMatch = res6.contacts.find((c) => c.id === contact3.id);
    assert.ok(combinedMatch, 'Robert Noemail matched both Minnesota and no email');
    assert.ok(!res6.contacts.some((c) => c.id === contact1.id), 'John Smith (has email) excluded');
    assert.ok(!res6.contacts.some((c) => c.id === contact4.id), 'David (California) excluded');
    console.log(`✅ TEST 6 PASSED: Multiple composable filters work concurrently.`);

    // ----------------------------------------------------
    // TEST 7: Search + Filter (Search = "physician" AND list_id = testList.id)
    // ----------------------------------------------------
    console.log('\n--- TEST 7: Search + Filter (Search="physician" AND list_id) ---');
    const res7 = await backendApi.fetchContacts({ search: 'physician', list_id: testList.id });
    assert.ok(res7.contacts.some((c) => c.id === contact1.id), 'John Smith (Chief Physician) returned');
    assert.ok(res7.contacts.some((c) => c.id === contact3.id), 'Robert (Staff Physician) returned');
    assert.ok(!res7.contacts.some((c) => c.id === contact2.id), 'Sarah (Administrator) excluded');
    assert.ok(!res7.contacts.some((c) => c.id === contact4.id), 'David (California) excluded');
    console.log(`✅ TEST 7 PASSED: Search + filter composability verified.`);

    // ----------------------------------------------------
    // TEST 8: Clear Filters (Returns complete dataset)
    // ----------------------------------------------------
    console.log('\n--- TEST 8: Clear Filters (Full Dataset) ---');
    const res8 = await backendApi.fetchContacts();
    assert.ok(res8.contacts.some((c) => c.id === contact1.id), 'Contact 1 in full dataset');
    assert.ok(res8.contacts.some((c) => c.id === contact2.id), 'Contact 2 in full dataset');
    assert.ok(res8.contacts.some((c) => c.id === contact3.id), 'Contact 3 in full dataset');
    assert.ok(res8.contacts.some((c) => c.id === contact4.id), 'Contact 4 in full dataset');
    console.log(`✅ TEST 8 PASSED: Empty filter query returns complete dataset (total: ${res8.total}).`);

    // ----------------------------------------------------
    // TEST 9: Pagination with Filters
    // ----------------------------------------------------
    console.log('\n--- TEST 9: Pagination with Filters ---');
    const res9Page1 = await backendApi.fetchContacts({ list_id: testList.id, skip: 0, limit: 2 });
    const res9Page2 = await backendApi.fetchContacts({ list_id: testList.id, skip: 2, limit: 2 });
    assert.strictEqual(res9Page1.contacts.length, 2, 'Page 1 has 2 items');
    assert.strictEqual(res9Page2.contacts.length, 1, 'Page 2 has 1 item');
    assert.strictEqual(res9Page1.total, 3, 'Total reflects filtered count of 3');
    assert.strictEqual(res9Page2.total, 3, 'Total on page 2 reflects filtered count of 3');
    const page1Ids = res9Page1.contacts.map((c) => c.id);
    const page2Ids = res9Page2.contacts.map((c) => c.id);
    const overlap = page1Ids.filter((id) => page2Ids.includes(id));
    assert.strictEqual(overlap.length, 0, 'No overlap between page 1 and page 2');
    console.log('✅ TEST 9 PASSED: Server pagination respects filtered count and offsets.');

    console.log('\n=================================================================');
    console.log('🎉 ALL 9 CONTACTS SEARCH & FILTER API TESTS PASSED SUCCESSFULLY');
    console.log('=================================================================');
  } finally {
    // Cleanup seeded contacts and list
    await backendApi.deleteContact(contact1.id).catch(() => {});
    await backendApi.deleteContact(contact2.id).catch(() => {});
    await backendApi.deleteContact(contact3.id).catch(() => {});
    await backendApi.deleteContact(contact4.id).catch(() => {});
    await backendApi.deleteContactList(testList.id).catch(() => {});
    console.log('🧹 Cleaned up temporary test contacts and list.');
  }
}

runTests().catch((err) => {
  console.error('❌ Test suite failed:', err);
  process.exit(1);
});
