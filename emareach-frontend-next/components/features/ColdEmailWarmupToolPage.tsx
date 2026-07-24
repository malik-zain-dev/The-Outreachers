import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Gauge,
  Inbox,
  Layers3,
  MailCheck,
  MailOpen,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
  Workflow,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesCta } from "./FeaturesCta";
import { FeaturesTestimonials } from "./FeaturesTestimonials";

const painPoints = [
  {
    problem: "Cold emails land in spam",
    fix: "Built-in warm-up builds domain trust before your first send — so emails land where they belong.",
    icon: Inbox,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    problem: "Juggling two tools",
    fix: "Warm-up and cold email campaigns live on the same platform. One login, unified data, zero sync headaches.",
    icon: Layers3,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
  {
    problem: "Outreach feels robotic",
    fix: "AI-powered personalization writes emails that sound like you — tuned to each prospect, not a template blast.",
    icon: Bot,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
];

const pillarCards = [
  {
    title: "Cold email sequences that convert",
    subtitle: "Outreach engine",
    body: "Multi-step automated sequences with AI-written follow-ups, A/B subject testing, and reply detection that pauses sequences the moment a prospect responds.",
    icon: Send,
    accent: "from-primary/25 to-blue-500/15",
  },
  {
    title: "Warm-up that runs while you send",
    subtitle: "Deliverability layer",
    body: "Real inbox-to-inbox warm-up traffic builds sender reputation continuously — not just before you start. Your domain stays healthy as campaigns scale.",
    icon: Flame,
    accent: "from-emerald-500/25 to-teal-500/15",
  },
  {
    title: "AI writing baked in, not bolted on",
    subtitle: "AI personalization",
    body: "Generate first lines, full emails, and entire sequences from prospect data. Spintax, merge fields, and tone controls ship inside the same editor you use to build campaigns.",
    icon: Sparkles,
    accent: "from-violet-500/25 to-purple-500/15",
  },
];

const featureGrid = [
  {
    title: "Campaign sequences & follow-ups",
    description:
      "Build multi-step outreach sequences with conditional logic, time-based delays, and automatic pause on reply.",
    icon: Workflow,
    gradient: "from-primary/20 to-blue-500/15",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    border: "hover:border-primary/40",
  },
  {
    title: "Built-in inbox warm-up",
    description:
      "Pool-based warm-up with real opens, replies, and threads — not bots. Paced sends, daily caps, and progress tracking built in.",
    icon: Flame,
    gradient: "from-emerald-500/20 to-teal-500/15",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "AI-powered personalization",
    description:
      "Generate full cold emails or opening lines from prospect context. A/B test subject lines with automatic winner selection.",
    icon: Sparkles,
    gradient: "from-violet-500/20 to-purple-500/15",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Unified reply inbox",
    description:
      "Every warm reply lands in one inbox. Mark as interested, create follow-up tasks, and never lose a hot lead to inbox chaos.",
    icon: MessageSquare,
    gradient: "from-amber-500/20 to-orange-500/15",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Deliverability analytics",
    description:
      "Open rates, click rates, reply rates, and spam placement data — per campaign, per inbox, per sequence step.",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-blue-500/15",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Domain health monitoring",
    description:
      "Per-domain health context, low-engagement warnings, and warm-up ramp controls so you know exactly where each domain stands.",
    icon: ShieldCheck,
    gradient: "from-rose-500/20 to-pink-500/15",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Multi-inbox rotation",
    description:
      "Send across multiple inboxes and domains automatically. Distribute volume, rotate senders, and protect individual inbox health.",
    icon: RefreshCw,
    gradient: "from-indigo-500/20 to-violet-500/15",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "Smart lead detection",
    description:
      "Auto-detect risky email addresses before they damage deliverability. Enrich and verify contacts before they enter sequences.",
    icon: Target,
    gradient: "from-teal-500/20 to-emerald-500/15",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    border: "hover:border-teal-500/40",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Connect your inboxes",
    text: "Add Gmail, Google Workspace, or SMTP inboxes. EmaReach detects your domain setup and starts warm-up automatically based on your plan limits.",
  },
  {
    step: "02",
    title: "Import and enrich contacts",
    text: "Upload your prospect list via CSV or connect your CRM. Smart lead detection flags risky emails before they ever enter a campaign.",
  },
  {
    step: "03",
    title: "Build your sequence with AI",
    text: "Use the AI campaign studio to write first-touch emails and follow-ups. Set delays, conditions, and A/B variants — all in one visual editor.",
  },
  {
    step: "04",
    title: "Launch. Warm-up keeps running.",
    text: "Campaigns go out while warm-up traffic continues in the background. Your domain reputation grows as your outreach scales.",
  },
  {
    step: "05",
    title: "Manage replies from one inbox",
    text: "All positive replies land in your unified inbox. Mark leads, book demos, and hand off to CRM — without switching between tools.",
  },
];

const comparisonRows: {
  label: string;
  separate: string;
  emareach: string;
}[] = [
  {
    label: "Warm-up + outreach",
    separate: "Two separate tools",
    emareach: "One unified platform",
  },
  {
    label: "Deliverability setup",
    separate: "Manual sync required",
    emareach: "Automatic, always-on",
  },
  {
    label: "Data visibility",
    separate: "Split across dashboards",
    emareach: "Unified analytics",
  },
  {
    label: "AI writing",
    separate: "Add-on or third tool",
    emareach: "Native, in-sequence",
  },
  {
    label: "Reply management",
    separate: "Email client or CRM",
    emareach: "Built-in unified inbox",
  },
  {
    label: "Cost",
    separate: "$150–$400/mo (stacked)",
    emareach: "One plan, all included",
  },
];

const teamCards = [
  {
    team: "Founders sending first campaigns",
    result:
      "Launch cold outreach with a warm domain from day one — no warmup tool subscription required before you can start.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    team: "SDR & RevOps teams",
    result:
      "Manage multiple inboxes, ramp-up tiers, and deliverability health from one dashboard. Less tool sprawl, more pipeline.",
    icon: Users2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    team: "Agencies & freelancers",
    result:
      "Onboard clients fast, isolate mailboxes per account, and maintain domain health across dozens of sending identities.",
    icon: Gauge,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const statCards = [
  { value: "2×", label: "Higher inbox placement", sub: "vs cold-sending without warmup" },
  { value: "50", label: "Max daily warmup emails", sub: "per inbox, paced naturally" },
  { value: "5-step", label: "Sequence automation", sub: "with AI-written follow-ups" },
  { value: "1", label: "Platform for everything", sub: "warmup, outreach, analytics" },
];

const faqItems = [
  {
    q: "What makes EmaReach different from other cold email tools?",
    a: "Most cold email platforms require a separate warmup tool — you pay for two subscriptions, manage two dashboards, and hope the data stays in sync. EmaReach builds warmup directly into the outreach platform. Your inbox reputation builds continuously as campaigns run, without any manual configuration.",
  },
  {
    q: "How does built-in warm-up work?",
    a: "EmaReach uses a pool of real inboxes to generate genuine warm-up traffic — real opens, replies, and natural threads between your inbox and the pool. Warm-up runs in the background within your daily sending limits, so your domain builds trust even while campaigns are active.",
  },
  {
    q: "Is this a cold email tool or a warmup tool?",
    a: "Both. EmaReach is a full cold email platform with warmup built in as a first-class feature — not an add-on. You get campaign sequences, AI writing, reply management, analytics, and domain warmup under one subscription.",
  },
  {
    q: "Can I use EmaReach for cold outreach if my domain is brand new?",
    a: "Yes. For new domains, we recommend enabling warmup first and letting it run for 2–4 weeks before scaling campaign volume. EmaReach's ramp-up tiers let you start campaigns early with a conservative daily cap that increases as warmup progresses.",
  },
  {
    q: "What inboxes does EmaReach support?",
    a: "EmaReach supports Gmail (personal and Google Workspace) and any SMTP-compatible inbox. You can connect multiple inboxes and rotate sending across them to distribute volume and reduce per-inbox risk.",
  },
  {
    q: "How is the AI writing personalization different from generic templates?",
    a: "EmaReach's AI writing pulls from prospect-level context — name, company, role, and any enrichment data — to generate first lines and full emails that are tailored, not templated. You can also use spintax, merge fields, and AI Write on warmup templates.",
  },
  {
    q: "Does EmaReach help with email deliverability beyond warmup?",
    a: "Yes. EmaReach includes domain health monitoring, smart lead detection (to remove risky emails before they hit your campaign), campaign-level placement tracking, and per-inbox analytics — so you can diagnose and fix deliverability issues before they compound.",
  },
  {
    q: "What happens when a prospect replies?",
    a: "Sequences pause automatically on reply. The reply appears in EmaReach's unified inbox where you can tag it, respond, and mark the lead status. No cold email should be sent to someone who has already responded.",
  },
];

function CampaignWarmupMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-emerald-500/20 to-violet-500/20 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">EmaReach — Campaign &amp; Warm-up</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {/* Campaign panel */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaign</p>
            </div>
            <p className="font-mono text-sm font-medium text-foreground">Q3 Outbound Sequence</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Step 1 sent</span>
                <span className="font-semibold text-foreground">240</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Open rate</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">47%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Replies</span>
                <span className="font-semibold text-foreground">18</span>
              </div>
            </div>
          </div>
          {/* Warmup panel */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Flame className="h-4 w-4 text-emerald-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Warm-up</p>
            </div>
            <p className="font-mono text-sm font-medium text-foreground">sales@acme.com</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Today</span>
                <span className="font-semibold text-foreground">34 / 50</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Health</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Good</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">Day 18</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">AI-written</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">Warm-up running</span>
          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">Reply detected → paused</span>
        </div>
      </div>
    </div>
  );
}

function MidPageCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-emerald-500/8 to-violet-500/8" />
      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-xl sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Cold email and warm-up — finally in one place
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Stop paying for two tools. EmaReach handles outreach, deliverability, and AI writing under one plan.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ColdEmailWarmupToolPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-500/7 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-violet-500/7 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <MailCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Cold Email Tool with Built-In Warm-Up
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Cold email software that{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  warms up while you send
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-emerald-500/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EmaReach is the cold email tool with built-in warm-up — one platform for outreach, deliverability, and
              AI-powered personalization. No second subscription. No tool-switching. Emails that land in the inbox.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Warm-up runs in the background while campaigns go out. Your domain reputation grows as your pipeline does.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
              Try for Free
              </Link>
            </div>
          </div>

          <CampaignWarmupMock />

          {/* Stats row */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((s) => (
              <article
                key={s.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md text-center"
              >
                <p className="text-3xl font-black text-primary">{s.value}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / PAIN ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              The problem
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cold email without warm-up is broken by default
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Most cold email platforms ignore deliverability. You spend hours crafting sequences that go straight to spam
              — not because of the copy, but because of the domain.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {painPoints.map((p) => (
              <article
                key={p.problem}
                className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex rounded-xl ${p.iconBg} p-3 ${p.iconColor}`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{p.problem}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.fix}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Core pillars
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a cold email tool needs — already included
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Outreach, warm-up, and AI writing working together — not stacked on top of each other.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillarCards.map((p) => (
              <article
                key={p.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40`} />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.subtitle}</p>
                  <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Feature breakdown
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Every tool you need for cold outreach — in one platform
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              No integrations required. No data silos. Everything ships together.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureGrid.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ${item.border} hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className={`mb-4 inline-flex rounded-xl ${item.iconBg} p-2.5 ${item.iconColor}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold leading-snug">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From zero to pipeline in five steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Set up once. Warm-up and campaigns run together from day one.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <ol className="space-y-0">
                {workflowSteps.map((item, i) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-primary/20">
                        {item.step}
                      </div>
                      {i < workflowSteps.length - 1 && <div className="my-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-6 pt-1">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-6">
              {/* Bento top */}
              <div className="flex-1 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-emerald-500/5 p-7 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <MailOpen className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Outreach that starts from a trusted domain</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Warm-up isn&apos;t a pre-launch checklist — it&apos;s a continuous background process. Your inbox builds
                  reputation every day, so when campaign volume increases, deliverability keeps pace.
                </p>
                <Link
                  href="/features/deliverability-warmup"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Learn about our warm-up <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {/* Bento bottom */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Clock className="mb-3 h-6 w-6 text-amber-500" />
                <h4 className="font-semibold">Campaign ramp-up tiers</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Turn on ramp-up on any inbox and your effective daily campaign cap scales up gradually — protecting reputation
                  while volume climbs instead of jumping to full cap on day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Why EmaReach
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              One platform vs. stacking cold email + warmup tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Paying for Instantly or Smartlead plus a separate warmup tool isn&apos;t just expensive — it creates
              data gaps and deliverability blind spots.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3.5 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Capability</span>
              <span className="text-center text-muted-foreground">Separate tools</span>
              <span className="text-center text-primary">EmaReach</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-0 border-b border-border px-4 py-4 text-sm last:border-0 sm:px-6"
              >
                <span className="font-medium text-foreground">{row.label}</span>
                <span className="text-center text-muted-foreground">{row.separate}</span>
                <span className="text-center font-medium text-foreground">{row.emareach}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Who it&apos;s for
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for teams that live and die by cold outreach
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {teamCards.map((item) => (
              <article
                key={item.team}
                className="flex gap-5 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.team}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.result}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Related links */}
          <div className="mt-8 rounded-2xl border border-border/60 bg-muted/20 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore features</p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/features/deliverability-warmup", label: "Deliverability & warm-up" },
                { href: "/features/ai-writing-personalization", label: "AI writing & personalization" },
                { href: "/features/campaign-automation-sequences", label: "Campaign automation" },
                { href: "/features/unified-inbox-replies", label: "Unified inbox" },
                { href: "/features/analytics-reporting", label: "Analytics & reporting" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturesTestimonials />

      <MidPageCta />

      {/* ── FAQ ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cold email tool questions — answered
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know about EmaReach&apos;s cold email platform with built-in warm-up.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-card px-4 shadow-sm sm:px-6">
            {faqItems.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border/80">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Start landing in the inbox
            </span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The cold email tool that{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              works before you send
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            EmaReach warms up your inbox, personalizes your outreach with AI, and manages replies — all from one platform.
            No stacking tools. No deliverability guesswork.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              Try for Free
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Warm-up + cold email + AI writing — one plan.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
