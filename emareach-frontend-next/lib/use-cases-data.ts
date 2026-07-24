export type UseCaseCategory =
  | "Sales"
  | "Founders"
  | "Marketing"
  | "Agencies"
  | "Consulting"
  | "Talent";

type UseCaseSeed = {
  role: string;
  slug: string;
  category: UseCaseCategory;
  audienceLabel: string;
  primaryGoal: string;
  biggestChallenge: string;
  valueProp: string;
  proofLine: string;
  cadencePlan: string;
  qualificationTip: string;
  ctaLabel: string;
  testimonial: { quote: string; author: string; title: string };
  stats?: Array<{ value: string; label: string }>;
  featureHighlights?: Array<{ title: string; body: string }>;
  extraPainPoints?: string[];
  extraOutcomes?: string[];
  extraWorkflowSteps?: Array<{ title: string; description: string }>;
  extraFaqs?: Array<{ question: string; answer: string }>;
  comparisonBefore?: string[];
  comparisonAfter?: string[];
};

export type UseCaseData = {
  role: string;
  slug: string;
  category: UseCaseCategory;
  audienceLabel: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  painHeading: string;
  painIntro: string;
  painPoints: string[];
  stats: Array<{ value: string; label: string }>;
  outcomesHeading: string;
  outcomes: string[];
  workflowHeading: string;
  workflowIntro: string;
  workflowSteps: Array<{ title: string; description: string }>;
  featureHighlights: Array<{ title: string; body: string }>;
  testimonial: { quote: string; author: string; title: string };
  comparisonBefore: string[];
  comparisonAfter: string[];
  proofHeading: string;
  proofBody: string;
  faq: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
};

const useCaseSeeds: UseCaseSeed[] = [
  {
    role: "SDR (Sales Development Representative)",
    slug: "sdr",
    category: "Sales",
    audienceLabel: "Outbound Sales",
    primaryGoal: "book more qualified discovery calls every week",
    biggestChallenge: "manual follow-ups and low reply rates kill pipeline consistency",
    valueProp: "AI personalization plus deliverability controls so every sequence reaches inboxes and starts real conversations",
    proofLine: "Teams using this playbook typically recover pipeline consistency in 30-45 days.",
    cadencePlan: "3-touch opener, value proof, and objection recovery sequence",
    qualificationTip: "Use reply intent labels to route hot leads to AEs within minutes",
    ctaLabel: "Start SDR pipeline playbook",
    testimonial: {
      quote:
        "“Cold calls and email finally feel like one system. I'm booking more conversations without living in spreadsheets.”",
      author: "Alex Rivera",
      title: "SDR, B2B SaaS",
    },
  },
  {
    role: "BDR (Business Development Representative)",
    slug: "bdr",
    category: "Sales",
    audienceLabel: "Outbound Sales",
    primaryGoal: "open strategic conversations in new accounts",
    biggestChallenge: "scaling account-based outreach without sounding templated",
    valueProp: "research-backed personalization and domain-safe sending that keeps enterprise targets engaged",
    proofLine: "BDR teams gain better response quality when messaging stays relevant per account.",
    cadencePlan: "account trigger email, proof-based follow-up, and executive nudge sequence",
    qualificationTip: "Map responses to account tier to prioritize strategic opportunities",
    ctaLabel: "Launch BDR outbound engine",
    testimonial: {
      quote:
        "“Enterprise outreach stopped sounding generic. Replies got specific—and handoffs to our AEs got a lot cleaner.”",
      author: "Sam Okonkwo",
      title: "BDR, Enterprise software",
    },
  },
  {
    role: "Account Executives",
    slug: "account-executives",
    category: "Sales",
    audienceLabel: "Revenue Teams",
    primaryGoal: "self-source high-intent opportunities and close faster",
    biggestChallenge: "relying only on inbound causes unpredictable quota attainment",
    valueProp: "targeted outbound workflows that warm up deals before your first call",
    proofLine: "AEs close faster when outreach starts with role-specific pain and concrete value proof.",
    cadencePlan: "problem insight email, mini case study, and calendar-close sequence",
    qualificationTip: "Use objections dashboard to tailor final-stage follow-ups",
    ctaLabel: "Build AE outbound motion",
    testimonial: {
      quote:
        "“Self-sourced deals used to die in my inbox. Follow-ups stay on rails now, and real opportunities actually reach the calendar.”",
      author: "Priya Sharma",
      title: "Account Executive",
    },
  },
  {
    role: "Sales Managers",
    slug: "sales-managers",
    category: "Sales",
    audienceLabel: "Revenue Leaders",
    primaryGoal: "improve team productivity and predictable pipe generation",
    biggestChallenge: "pipeline reviews reveal activity, not repeatable outcomes",
    valueProp: "shared playbooks, deliverability guardrails, and role-level analytics",
    proofLine: "Managers scale best when every rep runs a tested system rather than ad-hoc messaging.",
    cadencePlan: "team template governance, sequence QA, and weekly optimization loop",
    qualificationTip: "Track reply-to-meeting ratio by rep to identify coaching gaps",
    ctaLabel: "Scale manager-ready pipeline",
    testimonial: {
      quote:
        "“I see what's working rep by rep instead of guessing from activity. Coaching got easier and pipeline finally steadied.”",
      author: "Marcus Chen",
      title: "VP of Sales",
    },
  },
  {
    role: "Sales Teams",
    slug: "sales-teams",
    category: "Sales",
    audienceLabel: "Revenue Teams",
    primaryGoal: "increase meetings while protecting sender reputation",
    biggestChallenge: "multiple reps and inboxes create inconsistent quality and deliverability",
    valueProp: "centralized workflow controls with personalization at scale",
    proofLine: "Teams that unify workflows and inbox protection avoid sudden performance drops.",
    cadencePlan: "role-based sequencing with shared templates and team QA cycles",
    qualificationTip: "Set SLA routing for positive replies to prevent lead decay",
    ctaLabel: "Unify sales outreach",
    testimonial: {
      quote:
        "“We stopped tripping over domains and one-off templates. Same playbook, better replies, less firefighting.”",
      author: "Elena Vasquez",
      title: "Sales Operations Lead",
    },
  },
  {
    role: "Startup Founders",
    slug: "startup-founders",
    category: "Founders",
    audienceLabel: "Founder-led Sales",
    primaryGoal: "validate ICP quickly and close first customers",
    biggestChallenge: "founder time is limited and outreach execution becomes inconsistent",
    valueProp: "done-for-you sequencing, personalization, and warm-up that protects your main domain",
    proofLine: "Founders win early when every message is tight, personal, and sent to the right list.",
    cadencePlan: "founder POV opener, insight follow-up, and low-friction CTA sequence",
    qualificationTip: "Tag replies by market segment to refine ICP weekly",
    ctaLabel: "Run founder-led outbound",
    testimonial: {
      quote:
        "“Founder time is scarce—sequences and follow-ups run so I stay in real conversations. Pipeline feels repeatable, not lucky.”",
      author: "Jordan Ellis",
      title: "Founder & CEO",
    },
  },
  {
    role: "SaaS Founders",
    slug: "saas-founders",
    category: "Founders",
    audienceLabel: "Founder-led Sales",
    primaryGoal: "build predictable top-of-funnel for a SaaS pipeline",
    biggestChallenge: "cold outreach feels noisy when positioning is still evolving",
    valueProp: "fast experiment loops with deliverability-safe infrastructure",
    proofLine: "SaaS founders close more demos when messaging is mapped to clear use-case pain.",
    cadencePlan: "persona hypothesis email, problem validation follow-up, and product-fit CTA sequence",
    qualificationTip: "Track positive response themes to prioritize roadmap and positioning",
    ctaLabel: "Build SaaS outbound channel",
    testimonial: {
      quote:
        "“Positioning changes every week at our stage. We can test messaging without torching deliverability—and demos are up.”",
      author: "Taylor Kim",
      title: "Co-founder, B2B SaaS",
    },
  },
  {
    role: "Solopreneurs",
    slug: "solopreneurs",
    category: "Founders",
    audienceLabel: "Solo Operators",
    primaryGoal: "generate consistent qualified leads without hiring a team",
    biggestChallenge: "you must handle outreach, fulfillment, and growth alone",
    valueProp: "automation that keeps outreach running while you deliver client work",
    proofLine: "Solo operators close more consistently when follow-ups happen automatically.",
    cadencePlan: "simple value proposition sequence with automated reminder follow-ups",
    qualificationTip: "Route qualified replies into a single priority inbox",
    ctaLabel: "Automate solopreneur outreach",
    testimonial: {
      quote:
        "“I can't be full-time on outreach. Personalization and reminders run while I'm with clients, and replies land in one inbox.”",
      author: "Morgan Blake",
      title: "Independent consultant",
    },
  },
  {
    role: "Consultants",
    slug: "consultants",
    category: "Consulting",
    audienceLabel: "Service Businesses",
    primaryGoal: "start premium client conversations with decision-makers",
    biggestChallenge: "generic outreach undermines your positioning and authority",
    valueProp: "high-trust messaging frameworks personalized to industry pain points",
    proofLine: "Consultants close larger retainers when emails lead with strategic insight, not a pitch.",
    cadencePlan: "insight-led email, authority proof, and consulting-fit CTA sequence",
    qualificationTip: "Use qualification tags to separate advisory leads from low-budget requests",
    ctaLabel: "Close consulting clients faster",
    testimonial: {
      quote:
        "“My emails have to sound senior, not salesy. Openers match the account now, and decision-makers actually answer.”",
      author: "David Okoro",
      title: "Principal consultant",
    },
  },
  {
    role: "Growth Marketers",
    slug: "growth-marketers",
    category: "Marketing",
    audienceLabel: "Demand & Growth",
    primaryGoal: "add outbound as a measurable growth channel",
    biggestChallenge: "most stacks fail to connect outreach activity with pipeline outcomes",
    valueProp: "experiment-ready workflows with conversion-focused reporting",
    proofLine: "Growth teams scale faster when outbound becomes testable and repeatable.",
    cadencePlan: "persona test sequence, message variant follow-up, and conversion CTA sequence",
    qualificationTip: "Read positive reply themes as qualitative signal for campaign iteration",
    ctaLabel: "Scale outbound growth loops",
    testimonial: {
      quote:
        "“Outbound became a channel we could measure like paid. We iterate on copy with real reply signal, not gut feel.”",
      author: "Riley Patel",
      title: "Head of Growth",
    },
  },
  {
    role: "Performance Marketers",
    slug: "performance-marketers",
    category: "Marketing",
    audienceLabel: "Demand & Growth",
    primaryGoal: "improve cost-per-opportunity through outbound experiments",
    biggestChallenge: "attribution is weak when outreach and follow-ups live across tools",
    valueProp: "clear sequence analytics and channel-level optimization for outbound performance",
    proofLine: "Performance marketers improve CPL when messaging and send quality are optimized together.",
    cadencePlan: "audience cohort sequence with CTA and conversion test branches",
    qualificationTip: "Measure reply quality score alongside raw response volume",
    ctaLabel: "Optimize outbound performance",
    testimonial: {
      quote:
        "“I needed numbers, not vibes. Variant-level replies and meetings tie back to spend so we optimize what moves opportunities.”",
      author: "Casey Nguyen",
      title: "Performance marketing lead",
    },
  },
  {
    role: "Lead Generation Agencies",
    slug: "lead-generation-agencies",
    category: "Agencies",
    audienceLabel: "Agency Operations",
    primaryGoal: "deliver pipeline outcomes for multiple clients at scale",
    biggestChallenge: "running many domains and campaigns increases risk and operational overhead",
    valueProp: "multi-client workflows with inbox protection and reporting in one place",
    proofLine: "Lead gen agencies retain clients longer when reporting ties outreach to booked calls.",
    cadencePlan: "client-specific sequence strategy, lead quality control, and weekly optimization loop",
    qualificationTip: "Use campaign-level scorecards to defend ROI in renewal calls",
    ctaLabel: "Scale agency lead gen",
    testimonial: {
      quote:
        "“Client campaigns ship faster without feeling templated. One workflow, consistent deliverability across accounts.”",
      author: "Jamie Foster",
      title: "Agency partner",
    },
  },
  {
    role: "Marketing Agencies",
    slug: "marketing-agencies",
    category: "Agencies",
    audienceLabel: "Agency Operations",
    primaryGoal: "add profitable outbound services without bloating delivery cost",
    biggestChallenge: "agency teams need repeatable systems that junior operators can run confidently",
    valueProp: "structured playbooks and reusable frameworks with built-in quality controls",
    proofLine: "Agencies close upsells faster when outbound is productized and outcome-led.",
    cadencePlan: "service offer sequence, portfolio proof, and conversion call CTA sequence",
    qualificationTip: "Separate warm leads by service type before handoff",
    ctaLabel: "Productize agency outbound",
    testimonial: {
      quote:
        "“Brand voice stays intact while clients get copy that converts. Less back-and-forth in docs and random tools.”",
      author: "Avery Brooks",
      title: "Agency owner",
    },
  },
  {
    role: "Cold Email Agencies",
    slug: "cold-email-agencies",
    category: "Agencies",
    audienceLabel: "Agency Operations",
    primaryGoal: "improve deliverability and conversion for every client campaign",
    biggestChallenge: "high sending volume can quickly damage domains and results",
    valueProp: "deliverability-first infrastructure designed for agency scale",
    proofLine: "Cold email agencies win on reputation when domains are protected from day one.",
    cadencePlan: "deliverability warm-up, response quality checks, and conversion-focused optimization",
    qualificationTip: "Monitor inbox health before scaling each campaign batch",
    ctaLabel: "Protect and scale client outreach",
    testimonial: {
      quote:
        "“Volume and personalization used to fight each other. We scale sends without sounding like a blast platform.”",
      author: "Quinn Reyes",
      title: "Cold email consultant",
    },
  },
  {
    role: "Freelancers",
    slug: "freelancers",
    category: "Consulting",
    audienceLabel: "Independent Professionals",
    primaryGoal: "book higher-value clients consistently",
    biggestChallenge: "outreach takes too much time away from billable work",
    valueProp: "lean outbound workflows that maintain quality without daily manual effort",
    proofLine: "Freelancers close better projects when outreach is consistent and value-led.",
    cadencePlan: "portfolio-fit opener, quick proof follow-up, and scope call CTA sequence",
    qualificationTip: "Use qualification prompts to filter low-intent responses quickly",
    ctaLabel: "Book freelance clients",
    testimonial: {
      quote:
        "“I compete with bigger shops on speed and still sound one-to-one. It's the backbone of my retainer outreach.”",
      author: "Reese Park",
      title: "Freelance growth marketer",
    },
  },
  {
    role: "Outreach Specialists",
    slug: "outreach-specialists",
    category: "Sales",
    audienceLabel: "Outbound Operations",
    primaryGoal: "run high-volume campaigns without sacrificing personalization",
    biggestChallenge: "manual personalization and inbox management do not scale",
    valueProp: "AI-assisted personalization with operational controls for volume campaigns",
    proofLine: "Specialists produce higher meeting rates when quality control is built into workflows.",
    cadencePlan: "personalization-first sequence with volume-safe send orchestration",
    qualificationTip: "Set auto-priority rules for positive and urgent replies",
    ctaLabel: "Scale specialist outreach",
    testimonial: {
      quote:
        "“Sequences are tighter and warm-up actually runs. Clients see placement hold when we scale their lists.”",
      author: "Logan Meyer",
      title: "Outreach strategist",
    },
  },
  {
    role: "Email Marketers",
    slug: "email-marketers",
    category: "Marketing",
    audienceLabel: "Email Strategy",
    primaryGoal: "turn cold outreach into a reliable acquisition stream",
    biggestChallenge: "campaign performance drops when targeting and copy quality drift",
    valueProp: "message testing plus deliverability optimization in one workflow",
    proofLine: "Email marketers win when outbound quality is managed like a growth program.",
    cadencePlan: "targeted messaging sequence with conversion-led follow-up tests",
    qualificationTip: "Use segment-level reporting to identify top-performing offers",
    ctaLabel: "Grow with outbound email",
    testimonial: {
      quote:
        "“Cold fits our lifecycle story instead of feeling bolted on. Personalization doesn't eat the whole week.”",
      author: "Skylar Diaz",
      title: "Email marketing manager",
    },
  },
  {
    role: "Recruiters",
    slug: "recruiters",
    category: "Talent",
    audienceLabel: "Talent Acquisition",
    primaryGoal: "start more conversations with top-fit candidates",
    biggestChallenge: "candidate outreach gets ignored when messaging is generic",
    valueProp: "role-aware personalization that improves response and interview rates",
    proofLine: "Recruiters fill roles faster when outreach highlights candidate-specific opportunity fit.",
    cadencePlan: "candidate-fit opener, role value follow-up, and quick screening CTA sequence",
    qualificationTip: "Tag interest levels to speed shortlist prioritization",
    ctaLabel: "Increase candidate replies",
    testimonial: {
      quote:
        "“Candidates respond when the note references their work, not keyword soup. Hard roles finally get traction.”",
      author: "Nia Washington",
      title: "Senior recruiter",
    },
  },
  {
    role: "Talent Acquisition Managers",
    slug: "talent-acquisition-managers",
    category: "Talent",
    audienceLabel: "Talent Acquisition",
    primaryGoal: "help hiring teams fill roles faster with better candidate pipelines",
    biggestChallenge: "outreach execution is fragmented across recruiters and hiring priorities",
    valueProp: "centralized campaign workflows with clear sourcing outcomes",
    proofLine: "TA managers reduce time-to-fill when outreach operations are standardized.",
    cadencePlan: "hiring-priority sequence governance with recruiter-level execution standards",
    qualificationTip: "Track role-level response quality and bottlenecks weekly",
    ctaLabel: "Standardize talent outreach",
    testimonial: {
      quote:
        "“Recruiters run one playbook; I can see what's converting by role and hiring manager without chasing screenshots.”",
      author: "Jordan Lee",
      title: "Head of talent acquisition",
    },
  },
  {
    role: "HR Professionals",
    slug: "hr-professionals",
    category: "Talent",
    audienceLabel: "People Teams",
    primaryGoal: "support hiring goals with structured outbound candidate engagement",
    biggestChallenge: "candidate communication quality varies across hiring workflows",
    valueProp: "consistent, compliant outreach templates with better response handling",
    proofLine: "HR teams improve employer brand perception when outreach stays clear and respectful.",
    cadencePlan: "role intro sequence, culture-value follow-up, and interview CTA sequence",
    qualificationTip: "Use response categorization to keep candidate communication organized",
    ctaLabel: "Improve HR outreach flow",
    testimonial: {
      quote:
        "“Candidate comms stay consistent and respectful across the team. Fewer dropped threads, less inbox chaos.”",
      author: "Cameron Hughes",
      title: "HR business partner",
    },
  },
  {
    role: "Headhunters",
    slug: "headhunters",
    category: "Talent",
    audienceLabel: "Executive Search",
    primaryGoal: "engage hard-to-reach senior candidates",
    biggestChallenge: "high-value prospects ignore low-context outreach",
    valueProp: "research-driven messaging that positions opportunities with precision",
    proofLine: "Headhunters earn more responses when every email reads bespoke and strategic.",
    cadencePlan: "executive-fit opener, discreet opportunity follow-up, and trusted CTA sequence",
    qualificationTip: "Track private-interest signals to prioritize discreet outreach",
    ctaLabel: "Boost executive search outreach",
    testimonial: {
      quote:
        "“Executives expect discretion and relevance. I spend time on fit instead of rewriting the same careful intro.”",
      author: "Victoria Stone",
      title: "Executive search partner",
    },
  },
  {
    role: "Demand Generation Managers",
    slug: "demand-generation-managers",
    category: "Marketing",
    audienceLabel: "Demand & Growth",
    primaryGoal: "create a repeatable outbound-to-pipeline demand engine",
    biggestChallenge: "demand goals miss when outbound is disconnected from campaign strategy",
    valueProp: "full-funnel outbound playbooks aligned to pipeline targets",
    proofLine: "Demand gen teams outperform when outbound is treated as a testable demand stream.",
    cadencePlan: "intent-driven sequence design with pipeline-stage optimization",
    qualificationTip: "Use meeting-source reporting to optimize channel mix",
    ctaLabel: "Build demand with outbound",
    testimonial: {
      quote:
        "“Outbound sits inside our demand model now. Pipeline targets and sequence performance finally point the same direction.”",
      author: "Drew Campbell",
      title: "Demand generation director",
    },
  },
  {
    role: "Marketing Managers",
    slug: "marketing-managers",
    category: "Marketing",
    audienceLabel: "Marketing Leadership",
    primaryGoal: "deliver pipeline growth while keeping campaigns on-brand",
    biggestChallenge: "teams struggle to keep outreach quality high across campaigns",
    valueProp: "repeatable frameworks that combine brand-safe messaging with conversion discipline",
    proofLine: "Marketing managers gain confidence when outreach quality and performance are both visible.",
    cadencePlan: "brand-safe outbound playbook with weekly conversion optimization",
    qualificationTip: "Review copy and reply themes to sharpen positioning each sprint",
    ctaLabel: "Launch manager-ready outbound",
    testimonial: {
      quote:
        "“Launches include outbound that matches the creative story. I'm not apologizing to sales for off-brand cold email.”",
      author: "Morgan Hayes",
      title: "Marketing director",
    },
  },
];

function getRoleEnhancements(seed: UseCaseSeed) {
  const cleanRole = seed.role.replace(/\s*\(.+\)\s*/g, "").trim();
  const roleShort = cleanRole.split(" ")[0];

  return {
    stats: [
      { value: "3x", label: `More qualified replies for ${roleShort} teams` },
      { value: "45%", label: "Lower manual follow-up workload" },
      { value: "2.4x", label: "Higher meeting-to-opportunity conversion" },
      { value: "99.2%", label: "Avg inbox placement with warm-up enabled" },
    ],
    featureHighlights: [
      {
        title: "AI Role-Aware Personalization",
        body: `Generate context-rich first lines tailored to ${cleanRole.toLowerCase()} outreach goals while keeping tone consistent with your brand.`,
      },
      {
        title: "Deliverability Guardrails",
        body: "Automatically manage warm-up, sending cadence, and reputation controls so scaling never sacrifices inbox placement.",
      },
      {
        title: "Reply Intent Intelligence",
        body: "Classify and route positive, neutral, and objection replies so your team follows up faster on high-intent conversations.",
      },
    ],
    extraPainPoints: [
      "Rep-to-rep execution quality varies, creating uneven pipeline outcomes.",
      "Follow-up delays cause high-intent prospects to cool off before booking.",
    ],
    extraOutcomes: [
      "Scale campaigns with clear guardrails that protect sender reputation.",
      "Give leaders transparent visibility into sequence quality and pipeline impact.",
    ],
    extraWorkflowSteps: [
      {
        title: "Step 4: Run weekly optimization loops",
        description:
          "Review response quality, objections, and booked-meeting trends weekly to improve copy and segmentation with real performance signal.",
      },
      {
        title: "Step 5: Scale proven plays across segments",
        description:
          "Roll out top-performing messaging patterns by audience tier, then expand carefully while preserving quality and deliverability.",
      },
    ],
    extraFaqs: [
      {
        question: `How quickly can ${cleanRole.toLowerCase()} see measurable impact?`,
        answer:
          "Most teams notice stronger reply quality within the first two weeks, then meaningful meeting lift as optimized sequences compound.",
      },
      {
        question: "Can this support both outbound volume and personalization quality?",
        answer:
          "Yes. EmaReach combines AI-assisted relevance with strict sending controls, so you can scale without sounding generic.",
      },
      {
        question: "Does this fit existing CRM and sales workflows?",
        answer:
          "It does. Teams can sync lead states, route replies, and maintain handoff workflows without replacing their core sales stack.",
      },
    ],
    comparisonBefore: [
      "Generic messaging with weak audience-fit and lower reply quality.",
      "Manual follow-up and list operations consume high-value selling time.",
      "Limited visibility into what actually drives meetings and opportunities.",
    ],
    comparisonAfter: [
      `Role-specific campaigns aligned to how ${cleanRole.toLowerCase()} actually close deals.`,
      "Automated, quality-controlled follow-ups that keep momentum high.",
      "Clear performance visibility from first touch to booked conversation.",
    ],
  };
}

function buildUseCase(seed: UseCaseSeed): UseCaseData {
  const cleanRole = seed.role.replace(/\s*\(.+\)\s*/g, "").trim();
  const enhancements = getRoleEnhancements(seed);

  return {
    role: seed.role,
    slug: seed.slug,
    category: seed.category,
    audienceLabel: seed.audienceLabel,
    metaTitle: `${cleanRole} Use Case | EmaReach`,
    metaDescription: `See how ${cleanRole.toLowerCase()} use EmaReach to ${seed.primaryGoal}. Modern, deliverability-first outreach workflows designed to convert more replies into revenue.`,
    keywords: `${cleanRole.toLowerCase()} cold email, ${cleanRole.toLowerCase()} outbound, ${seed.category.toLowerCase()} outreach automation, cold email platform`,
    heroTitle: `EmaReach for ${cleanRole}`,
    heroSubtitle: `A modern outbound system built for teams who need to ${seed.primaryGoal}.`,
    painHeading: `Why ${cleanRole} struggle to close more deals`,
    painIntro: `If you are trying to ${seed.primaryGoal}, you have probably seen this pattern: ${seed.biggestChallenge}.`,
    stats: seed.stats ?? enhancements.stats,
    painPoints: [
      "Campaigns look active, but positive replies remain inconsistent.",
      "Manual follow-up work steals time from high-impact conversations.",
      "Deliverability drops right when you try to scale send volume.",
      "Message quality drifts across prospects, industries, and segments.",
      ...(seed.extraPainPoints ?? enhancements.extraPainPoints),
    ],
    outcomesHeading: `What changes with EmaReach`,
    outcomes: [
      `Execute ${seed.cadencePlan} without rebuilding sequences every week.`,
      `Use ${seed.valueProp} so outreach is both scalable and credible.`,
      `Track reply quality and pipeline impact from one clear view.`,
      seed.proofLine,
      ...(seed.extraOutcomes ?? enhancements.extraOutcomes),
    ],
    workflowHeading: `A deal-closing workflow for ${cleanRole}`,
    workflowIntro: `Run this practical system to ${seed.primaryGoal} while keeping execution fast and consistent.`,
    workflowSteps: [
      {
        title: "Step 1: Build focused audience segments",
        description:
          "Define your highest-probability segments by role, context, and pain trigger. Keep each segment narrow so your first message feels specific and relevant.",
      },
      {
        title: "Step 2: Launch personalized sequences safely",
        description:
          "Use AI-assisted personalization and warm-up controls to send high-quality outreach without hurting domain reputation as volume grows.",
      },
      {
        title: "Step 3: Prioritize and close from reply signals",
        description: seed.qualificationTip,
      },
      ...(seed.extraWorkflowSteps ?? enhancements.extraWorkflowSteps),
    ],
    featureHighlights: seed.featureHighlights ?? enhancements.featureHighlights,
    testimonial: seed.testimonial,
    comparisonBefore: seed.comparisonBefore ?? enhancements.comparisonBefore,
    comparisonAfter: seed.comparisonAfter ?? enhancements.comparisonAfter,
    proofHeading: `Built to convert, not just send`,
    proofBody: `${seed.proofLine} With EmaReach, ${cleanRole.toLowerCase()} get structure, visibility, and confidence to turn outbound effort into closed-won conversations.`,
    faq: [
      {
        question: `Can ${cleanRole.toLowerCase()} use this without a large team?`,
        answer:
          "Yes. The workflows are designed to run lean. You can start solo, then scale to a team model without changing your core process.",
      },
      {
        question: "How does this help with inbox placement and deliverability?",
        answer:
          "EmaReach combines warm-up automation, sending limits, and quality controls so you can increase activity without sudden spam-folder drops.",
      },
      {
        question: "Will this still feel personalized at scale?",
        answer:
          "Yes. Personalization blocks and role-aware copy patterns help you keep relevance high across larger send volumes.",
      },
      ...(seed.extraFaqs ?? enhancements.extraFaqs),
    ],
    ctaTitle: `Ready to ${seed.primaryGoal}?`,
    ctaBody: `Use the same conversion-focused outbound framework top teams use to move from activity to outcomes.`,
    ctaPrimaryLabel: seed.ctaLabel,
  };
}

export const useCasesData: UseCaseData[] = useCaseSeeds.map(buildUseCase);

export const useCaseSlugs = useCasesData.map((item) => item.slug);

export const useCasesBySlug = new Map(useCasesData.map((item) => [item.slug, item]));

export function getUseCaseBySlug(slug: string) {
  return useCasesBySlug.get(slug);
}

export const useCaseCategories: UseCaseCategory[] = [
  "Sales",
  "Founders",
  "Marketing",
  "Agencies",
  "Consulting",
  "Talent",
];
