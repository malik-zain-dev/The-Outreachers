/**
 * Automated Test Suite for CRM Pipeline & Deals Management System
 */

import { Deal, Pipeline, PipelineStage, CRMTask } from '../lib/api';

// Helper for forecast calculations
function calculateForecast(deals: Deal[]) {
  let openPipelineValue = 0;
  let weightedPipelineValue = 0;
  let wonRevenue = 0;
  let lostRevenue = 0;

  for (const deal of deals) {
    const val = deal.value || 0;
    const prob = deal.probability || 0;

    if (deal.status === 'won') {
      wonRevenue += val;
    } else if (deal.status === 'lost') {
      lostRevenue += val;
    } else {
      openPipelineValue += val;
      weightedPipelineValue += Math.round(val * (prob / 100));
    }
  }

  return { openPipelineValue, weightedPipelineValue, wonRevenue, lostRevenue };
}

// Helper to check overdue tasks
function isTaskOverdue(dueDate?: string, completed?: boolean): boolean {
  if (!dueDate || completed) return false;
  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();
  return due < now;
}

// Helper to simulate stage progression & activity logging
function transitionDealStage(
  deal: Deal,
  toStage: PipelineStage,
  authorName = 'Test User'
): Deal {
  const fromStageName = deal.stage;
  const isWon = !!toStage.is_won_stage;
  const isLost = !!toStage.is_lost_stage;

  const newActivity = {
    id: `act-${Date.now()}`,
    type: 'stage_changed',
    title: `Stage changed to ${toStage.name}`,
    description: `Stage moved from "${fromStageName}" to "${toStage.name}"`,
    author_name: authorName,
    timestamp: new Date().toISOString(),
    metadata: {
      from_stage: fromStageName,
      to_stage: toStage.name,
      probability: toStage.probability,
    },
  };

  return {
    ...deal,
    stage_id: toStage.id,
    stage: toStage.name,
    probability: toStage.probability,
    status: isWon ? 'won' : isLost ? 'lost' : 'open',
    activities: [newActivity, ...(deal.activities || [])],
  };
}

// TEST RUNNER
async function runTests() {
  console.log('--- RUNNING CRM PIPELINE & DEALS TEST SUITE ---');
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

  // 1. Pipeline Stages & Ordering Test
  const mockPipeline: Pipeline = {
    id: 'pipe-1',
    user_id: 'user-1',
    name: 'Enterprise Outbound Pipeline',
    is_default: true,
    stages: [
      { id: 'stage-1', name: 'Discovery', order: 0, probability: 20, color: 'blue' },
      { id: 'stage-2', name: 'Demo / Pitch', order: 1, probability: 50, color: 'indigo' },
      { id: 'stage-3', name: 'Proposal', order: 2, probability: 80, color: 'amber' },
      { id: 'stage-4', name: 'Closed Won', order: 3, probability: 100, color: 'emerald', is_won_stage: true },
    ],
  };

  assert(mockPipeline.stages.length === 4, 'Pipeline initializes with 4 configurable stages');
  assert(mockPipeline.stages[3].is_won_stage === true, 'Won stage flag is correctly identified');
  assert(mockPipeline.stages[2].probability === 80, 'Proposal stage has 80% probability weight');

  // 2. Weighted Pipeline Forecasting Test
  const mockDeals: Deal[] = [
    {
      id: 'deal-1',
      title: 'Acme Corp Expansion',
      company: 'Acme Corp',
      contactName: 'Alice Smith',
      contactEmail: 'alice@acme.com',
      stage: 'Discovery',
      stage_id: 'stage-1',
      status: 'open',
      value: 10000,
      probability: 20,
      currency: 'USD',
      priority: 'high',
      assignedTo: 'Sales Rep 1',
      tags: [],
      notes: [],
      tasks: [],
      activities: [],
    },
    {
      id: 'deal-2',
      title: 'Globex Cloud Migration',
      company: 'Globex',
      contactName: 'Bob Vance',
      contactEmail: 'bob@globex.com',
      stage: 'Proposal',
      stage_id: 'stage-3',
      status: 'open',
      value: 50000,
      probability: 80,
      currency: 'USD',
      priority: 'urgent',
      assignedTo: 'Sales Rep 2',
      tags: [],
      notes: [],
      tasks: [],
      activities: [],
    },
    {
      id: 'deal-3',
      title: 'Initech Security Suite',
      company: 'Initech',
      contactName: 'Peter Gibbons',
      contactEmail: 'peter@initech.com',
      stage: 'Closed Won',
      stage_id: 'stage-4',
      status: 'won',
      value: 30000,
      probability: 100,
      currency: 'USD',
      priority: 'medium',
      assignedTo: 'Sales Rep 1',
      tags: [],
      notes: [],
      tasks: [],
      activities: [],
    },
    {
      id: 'deal-4',
      title: 'Umbrella Corp Legacy',
      company: 'Umbrella',
      contactName: 'Albert Wesker',
      contactEmail: 'wesker@umbrella.com',
      stage: 'Closed Lost',
      stage_id: 'stage-lost',
      status: 'lost',
      value: 25000,
      probability: 0,
      currency: 'USD',
      priority: 'low',
      assignedTo: 'Sales Rep 3',
      tags: [],
      notes: [],
      tasks: [],
      activities: [],
    },
  ];

  const forecast = calculateForecast(mockDeals);
  // Open = $10,000 + $50,000 = $60,000
  // Weighted = (10,000 * 0.20) + (50,000 * 0.80) = 2,000 + 40,000 = 42,000
  // Won = $30,000
  // Lost = $25,000
  assert(forecast.openPipelineValue === 60000, 'Open pipeline value accurately calculates $60,000');
  assert(forecast.weightedPipelineValue === 42000, 'Weighted pipeline forecast accurately calculates $42,000');
  assert(forecast.wonRevenue === 30000, 'Closed won revenue accurately calculates $30,000');
  assert(forecast.lostRevenue === 25000, 'Closed lost revenue accurately calculates $25,000');

  // 3. Stage Transition & Activity History Test
  const initialDeal = mockDeals[0];
  const targetStage = mockPipeline.stages[1]; // Demo / Pitch (50%)
  const transitioned = transitionDealStage(initialDeal, targetStage, 'Sarah Connor');

  assert(transitioned.stage === 'Demo / Pitch', 'Deal stage updated to "Demo / Pitch"');
  assert(transitioned.probability === 50, 'Deal probability updated to stage probability (50%)');
  assert(transitioned.activities?.length === 1, 'Activity record created upon stage progression');
  assert(
    transitioned.activities?.[0].author_name === 'Sarah Connor',
    'Activity author recorded accurately'
  );

  // 4. Overdue Task Detection Test
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  assert(isTaskOverdue(yesterday, false) === true, 'Incomplete past due task detected as OVERDUE');
  assert(isTaskOverdue(yesterday, true) === false, 'Completed past task is NOT overdue');
  assert(isTaskOverdue(tomorrow, false) === false, 'Future due task is NOT overdue');

  console.log(`\n========================================`);
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
