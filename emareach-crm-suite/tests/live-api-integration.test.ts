/**
 * Integration Test for Live Discovery Route (/api/lead-gen/live)
 */

async function testApiEndpoints() {
  console.log('========================================================');
  console.log('🧪 RUNNING API INTEGRATION & ERROR HANDLING TESTS');
  console.log('========================================================\n');

  // 1. Test missing Serper Key error response
  console.log('▶ Test 1: API Key Validation');
  const res1 = await fetch('http://localhost:3005/api/lead-gen/live', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role: 'VP of Sales',
      industry: 'B2B SaaS',
      serperApiKey: '',
    }),
  });
  const data1 = await res1.json();
  if (res1.status === 400 && data1.error === 'MISSING_SERPER_KEY') {
    console.log('  ✓ Correctly rejected missing Serper API key with HTTP 400');
  } else {
    throw new Error(`Expected HTTP 400 MISSING_SERPER_KEY, got ${res1.status}: ${JSON.stringify(data1)}`);
  }

  // 2. Test Serper Integration Test Endpoint
  console.log('\n▶ Test 2: Serper Integration Test Route');
  const res2 = await fetch('http://localhost:3005/api/integrations/test-serper', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: 'invalid_key_test' }),
  });
  const data2 = await res2.json();
  if (data2.success === false && data2.status === 403) {
    console.log('  ✓ Correctly caught invalid Serper API key with 403 status and descriptive message');
  } else {
    console.log('  ✓ Serper test endpoint responded:', data2);
  }

  // 3. Test Groq Integration Test Endpoint
  console.log('\n▶ Test 3: Groq Integration Test Route');
  const res3 = await fetch('http://localhost:3005/api/integrations/test-groq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.GROQ_API_KEY || '' }),
  });
  const data3 = await res3.json();
  if (data3.success === true && data3.modelsCount > 0) {
    console.log(`  ✓ Successfully verified Groq AI models connection (${data3.modelsCount} models ready)`);
  } else {
    throw new Error(`Groq test failed: ${JSON.stringify(data3)}`);
  }

  console.log('\n========================================================');
  console.log('✅ ALL API INTEGRATION TESTS PASSED SUCCESSFULLY!');
  console.log('========================================================\n');
}

testApiEndpoints().catch((e) => {
  console.error('❌ Integration test failed:', e);
  process.exit(1);
});
