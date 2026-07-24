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
  Mail,
  MailCheck,
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
    problem: "Emails never reach the inbox",
    fix: "Built-in deliverability infrastructure and warm-up keep sender reputation high, so campaigns land where they belong.",
    icon: Mail,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    problem: "Writing every email by hand",
    fix: "AI drafts full campaigns, subject lines, and follow-ups from your product and audience data in seconds.",
    icon: Bot,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
  {
    problem: "No idea what's actually working",
    fix: "Real-time analytics on opens, clicks, replies, and inbox placement — per campaign, per list, per send.",
    icon: BarChart3,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
];

const pillarCards = [
  {
    title: "Campaigns that write themselves",
    subtitle: "AI email marketing",
    body: "Generate full email marketing campaigns, subject lines, and multi-step sequences from a short brief. Edit, approve, and schedule in the same screen.",
    icon: Sparkles,
    accent: "from-violet-500/25 to-purple-500/15",
  },
  {
    title: "Deliverability built in, not bolted on",
    subtitle: "Inbox placement",
    body: "Every plan includes automated inbox warm-up, domain health monitoring, and placement tracking — the infrastructure most email marketing tools skip.",
    icon: Flame,
    accent: "from-emerald-500/25 to-teal-500/15",
  },
  {
    title: "One inbox for every reply",
    subtitle: "Unified inbox",
    body: "Opens, clicks, and replies from every list and campaign land in a single view. Tag leads, trigger follow-ups, and never lose a conversation.",
    icon: MessageSquare,
    accent: "from-primary/25 to-blue-500/15",
  },
];

const featureGrid = [
  {
    title: "Drag-free campaign builder",
    description:
      "Build multi-step email marketing sequences with delays, conditions, and automatic pause on reply — no clunky drag-and-drop required.",
    icon: Workflow,
    gradient: "from-primary/20 to-blue-500/15",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    border: "hover:border-primary/40",
  },
  {
    title: "AI writing & personalization",
    description:
      "Generate full emails or opening lines from contact data. A/B test subject lines with automatic winner selection.",
    icon: Sparkles,
    gradient: "from-violet-500/20 to-purple-500/15",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Automated inbox warm-up",
    description:
      "Real inbox-to-inbox warm-up traffic builds sender reputation continuously, so every campaign benefits from a trusted domain.",
    icon: Flame,
    gradient: "from-emerald-500/20 to-teal-500/15",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "List hygiene & lead scoring",
    description:
      "Smart lead detection flags risky or invalid addresses before they ever enter a send, protecting your sender reputation automatically.",
    icon: Target,
    gradient: "from-teal-500/20 to-emerald-500/15",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    border: "hover:border-teal-500/40",
  },
  {
    title: "Unified reply inbox",
    description:
      "Every reply from every list and campaign lands in one place. Mark interested leads and hand off to your CRM without switching tools.",
    icon: MessageSquare,
    gradient: "from-amber-500/20 to-orange-500/15",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Real-time analytics",
    description:
      "Opens, clicks, reply rates, and inbox placement — broken down per campaign, per inbox, and per sequence step.",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-blue-500/15",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Domain health monitoring",
    description:
      "Per-domain reputation context and low-engagement warnings, so you always know exactly where each sending identity stands.",
    icon: ShieldCheck,
    gradient: "from-rose-500/20 to-pink-500/15",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Multi-inbox sending",
    description:
      "Rotate sends across multiple inboxes and domains automatically to distribute volume and protect individual sender health.",
    icon: RefreshCw,
    gradient: "from-indigo-500/20 to-violet-500/15",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Connect your inbox",
    text: "Add Gmail, Google Workspace, or any SMTP inbox. EmaReach starts warm-up automatically based on your plan.",
  },
  {
    step: "02",
    title: "Import your contact list",
    text: "Upload a CSV or sync your CRM. Smart lead detection flags risky or invalid addresses before they enter a campaign.",
  },
  {
    step: "03",
    title: "Generate your campaign with AI",
    text: "Describe your offer and audience — AI drafts subject lines, email copy, and follow-up sequences you can edit in place.",
  },
  {
    step: "04",
    title: "Send and track in real time",
    text: "Launch to your full list or a segment. Opens, clicks, and replies populate your dashboard as they happen.",
  },
  {
    step: "05",
    title: "Manage replies from one inbox",
    text: "Every response lands in a unified inbox. Tag leads, reply, and route to your CRM without leaving EmaReach.",
  },
];

const comparisonRows: { label: string; separate: string; emareach: string }[] = [
  { label: "Campaign building", separate: "Manual drag-and-drop editors", emareach: "AI-generated in minutes" },
  { label: "Deliverability", separate: "Extra warm-up subscription", emareach: "Built in, always on" },
  { label: "List hygiene", separate: "Separate verification tool", emareach: "Automatic lead scoring" },
  { label: "Reply management", separate: "Email client or CRM", emareach: "Unified inbox included" },
  { label: "Reporting", separate: "Basic open/click stats", emareach: "Placement + engagement analytics" },
  { label: "Cost", separate: "$150–$400/mo (stacked tools)", emareach: "One plan, everything included" },
];

const teamCards = [
  {
    team: "Marketing teams sending at volume",
    result: "Run multiple campaigns across segmented lists without your sender reputation taking the hit.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    team: "Founders & small business owners",
    result: "Launch professional email marketing campaigns without hiring an email specialist or buying five tools.",
    icon: Users2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    team: "Agencies managing multiple clients",
    result: "Isolate sending identities per client, monitor domain health across accounts, and report results from one dashboard.",
    icon: Gauge,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const statCards = [
  { value: "92%", label: "Average inbox rate", sub: "across active campaigns" },
  { value: "<10min", label: "Time to first send", sub: "from signup to launch" },
  { value: "5-step", label: "Sequence automation", sub: "with AI-written follow-ups" },
  { value: "1", label: "Platform for everything", sub: "writing, sending, warm-up, replies" },
];

const faqItems = [
  {
    q: "What is EmaReach's email marketing tool?",
    a: "EmaReach is an AI-powered email marketing tool that combines campaign creation, automated sequences, inbox warm-up, list hygiene, and reply management in one platform — instead of stitching together separate apps for each job.",
  },
  {
    q: "Does EmaReach write the emails for me?",
    a: "Yes. Describe your offer, audience, and goal, and EmaReach's AI drafts full campaigns, subject lines, and follow-up sequences. You can edit every word before it sends, and use spintax or merge fields for personalization at scale.",
  },
  {
    q: "How is this different from tools like Mailchimp or Brevo?",
    a: "Most email marketing platforms assume your domain reputation is already healthy. EmaReach builds warm-up and deliverability monitoring into the same platform you use to write and send, so inbox placement stays high as your list grows.",
  },
  {
    q: "Can I clean my list before sending?",
    a: "Yes. Smart lead detection scans your contact list and flags risky, invalid, or role-based addresses before they enter a campaign, protecting your sender reputation automatically.",
  },
  {
    q: "What inboxes can I send from?",
    a: "EmaReach supports Gmail, Google Workspace, and any SMTP-compatible inbox. You can connect multiple inboxes and rotate sending to distribute volume across senders.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — see the pricing page for current free-tier limits on contacts, sends, and warm-up. Paid plans unlock higher volume, more inboxes, and advanced analytics.",
  },
  {
    q: "How do replies get managed?",
    a: "Every reply lands in EmaReach's unified inbox regardless of which list or campaign it came from. Sequences pause automatically the moment a contact responds.",
  },
  {
    q: "Does EmaReach report on inbox placement, not just opens?",
    a: "Yes. Beyond opens and clicks, EmaReach tracks inbox placement, domain health, and per-inbox warm-up progress so you can diagnose deliverability issues, not just guess at them.",
  },
];

function CampaignMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-violet-500/20 to-emerald-500/20 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">EmaReach — Email Marketing</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
            <span className="text-xs text-muted-foreground">Sending</span>
          </div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaign</p>
            </div>
            <p className="font-mono text-sm font-medium text-foreground">Spring Promo Blast</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Sent</span>
                <span className="font-semibold text-foreground">4,820</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Open rate</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">51%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Clicks</span>
                <span className="font-semibold text-foreground">612</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-teal-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">List health</p>
            </div>
            <p className="font-mono text-sm font-medium text-foreground">newsletter-q3.csv</p>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Valid</span>
                <span className="font-semibold text-foreground">5,102</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Flagged risky</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">89</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Domain health</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Good</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">AI-written</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">Warm-up running</span>
          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">List verified</span>
        </div>
      </div>
    </div>
  );
}

function MidPageCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-violet-500/8 to-emerald-500/8" />
      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-xl sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Email marketing without the tool stack
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Writing, sending, warm-up, list hygiene, and replies — one plan, one dashboard.
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

export function EmailMarketingToolPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-violet-500/7 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-emerald-500/7 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI Email Marketing Tool
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The email marketing tool that{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  writes, sends, and lands
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EmaReach is the AI email marketing tool with deliverability built in — write campaigns in minutes,
              keep your list clean, and watch every open, click, and reply in one dashboard.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              No stitching together a writer, a sender, a warm-up tool, and a list cleaner. It&apos;s all here.
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
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                View pricing
              </Link>
            </div>
          </div>

          <CampaignMock />

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
              Most email marketing tools stop at &quot;send&quot;
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              You still need a separate warm-up subscription, a list cleaner, and hours writing copy that
              may never even reach the inbox.
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
              Everything an email marketing tool needs — already included
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Writing, sending, deliverability, and replies working together — not stacked on top of each other.
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
              Every tool you need for email marketing — in one platform
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
              From contact list to inbox in five steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Set up once. Every campaign after that ships faster.
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
              <div className="flex-1 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-7 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <MailCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Campaigns backed by real deliverability</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Warm-up isn&apos;t a pre-launch checklist — it runs continuously in the background. Your domain
                  builds reputation every day, so inbox placement keeps pace as your list grows.
                </p>
                <Link
                  href="/features/deliverability-warmup"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Learn about our warm-up <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Clock className="mb-3 h-6 w-6 text-amber-500" />
                <h4 className="font-semibold">Ramp-up tiers for new sending identities</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  New inbox? Ramp-up scales your daily send cap gradually — protecting reputation while volume
                  climbs instead of jumping straight to full capacity.
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
              One platform vs. stacking email marketing tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Paying for a sender, a writer, a warm-up tool, and a list cleaner adds up fast — and creates
              gaps between them.
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
              Built for teams that live and die by their contact list
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

          <div className="mt-8 rounded-2xl border border-border/60 bg-muted/20 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore features</p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/features/deliverability-warmup", label: "Deliverability & warm-up" },
                { href: "/features/ai-writing-personalization", label: "AI writing & personalization" },
                { href: "/features/campaign-automation-sequences", label: "Campaign automation" },
                { href: "/features/unified-inbox-replies", label: "Unified inbox" },
                { href: "/features/analytics-reporting", label: "Analytics & reporting" },
                { href: "/email-list-cleaner-tool", label: "Email list cleaner" },
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
              Email marketing tool questions — answered
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know about EmaReach&apos;s email marketing platform.
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
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-emerald-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Start emailing smarter
            </span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The email marketing tool that{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              actually reaches the inbox
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            EmaReach writes, sends, warms up, and cleans your list — all from one platform. No stacking tools.
            No deliverability guesswork.
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
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              View pricing
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Writing + sending + warm-up + list hygiene — one plan.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
