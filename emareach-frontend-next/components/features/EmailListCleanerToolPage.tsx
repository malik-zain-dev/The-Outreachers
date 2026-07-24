import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  Flame,
  Gauge,
  MailX,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Target,
  TrendingUp,
  Users2,
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
    problem: "Bad addresses trigger bounces and spam flags",
    fix: "Smart lead detection scans every list on import and flags risky, invalid, or role-based addresses automatically.",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    problem: "Cleaning a list is a separate tool and export/import cycle",
    fix: "List cleaning happens inline during import — no separate verification service, no CSV round-trips.",
    icon: RefreshCw,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
  {
    problem: "One bad send tanks domain reputation for good",
    fix: "Warm-up and domain health monitoring run continuously, so occasional bad contacts don't compound into a deliverability crisis.",
    icon: ShieldCheck,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
];

const pillarCards = [
  {
    title: "Clean lists on import, automatically",
    subtitle: "Smart lead detection",
    body: "Every contact list is scanned the moment it's uploaded — risky, invalid, and role-based addresses get flagged before they ever touch a send.",
    icon: Filter,
    accent: "from-teal-500/25 to-emerald-500/15",
  },
  {
    title: "No separate verification subscription",
    subtitle: "Built into the platform",
    body: "List cleaning is a native feature, not a bolt-on service you pay for and manage separately from your sending tool.",
    icon: MailX,
    accent: "from-primary/25 to-blue-500/15",
  },
  {
    title: "Ongoing hygiene, not just a one-time scrub",
    subtitle: "Continuous protection",
    body: "Engagement-based signals keep flagging low-quality contacts over time, not just at the moment of import.",
    icon: Target,
    accent: "from-violet-500/25 to-purple-500/15",
  },
];

const featureGrid = [
  {
    title: "Automatic list scanning on import",
    description:
      "Every CSV upload or CRM sync is scanned for invalid syntax, risky domains, and role-based addresses before contacts enter a campaign.",
    icon: Filter,
    gradient: "from-teal-500/20 to-emerald-500/15",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    border: "hover:border-teal-500/40",
  },
  {
    title: "Risky address flagging",
    description:
      "Catch typos, disposable domains, and known spam-trap patterns before a single send goes out.",
    icon: AlertTriangle,
    gradient: "from-amber-500/20 to-orange-500/15",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Engagement-based hygiene",
    description:
      "Low-engagement or bounced contacts get flagged over time, keeping your list clean well after the initial import.",
    icon: Target,
    gradient: "from-primary/20 to-blue-500/15",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    border: "hover:border-primary/40",
  },
  {
    title: "Domain health monitoring",
    description:
      "Track sender reputation per domain so you can see the effect list quality has on inbox placement, in one view.",
    icon: ShieldCheck,
    gradient: "from-rose-500/20 to-pink-500/15",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Built-in inbox warm-up",
    description:
      "Warm-up runs continuously so your sending reputation has a buffer even while lists are being cleaned and improved.",
    icon: Flame,
    gradient: "from-emerald-500/20 to-teal-500/15",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Bounce & complaint tracking",
    description:
      "See bounce rates and complaint signals per list and per campaign, so you catch quality issues before they escalate.",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-blue-500/15",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Unified reply inbox",
    description:
      "Once your list is clean, replies from verified contacts land in one inbox for fast follow-up.",
    icon: MessageSquare,
    gradient: "from-violet-500/20 to-purple-500/15",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Multi-inbox rotation",
    description:
      "Even with a clean list, distribute sends across multiple inboxes to keep individual domain risk low.",
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
    title: "Import your contact list",
    text: "Upload a CSV or sync your CRM. EmaReach scans every address the moment it's imported.",
  },
  {
    step: "02",
    title: "Review flagged contacts",
    text: "Risky, invalid, and role-based addresses are flagged in a review queue before they can enter a campaign.",
  },
  {
    step: "03",
    title: "Clean and confirm your list",
    text: "Remove or keep flagged contacts with full visibility into why each one was flagged.",
  },
  {
    step: "04",
    title: "Send with confidence",
    text: "Launch campaigns to a verified list, with warm-up and domain health monitoring running the whole time.",
  },
  {
    step: "05",
    title: "Keep it clean over time",
    text: "Engagement-based signals continue flagging low-quality contacts as your list grows and evolves.",
  },
];

const comparisonRows: { label: string; separate: string; emareach: string }[] = [
  { label: "List verification", separate: "Separate paid tool, manual export/import", emareach: "Built in, scans on import" },
  { label: "Ongoing hygiene", separate: "One-time scrub only", emareach: "Continuous engagement-based flagging" },
  { label: "Deliverability protection", separate: "Not connected to sending", emareach: "Tied directly to warm-up & domain health" },
  { label: "Visibility", separate: "A downloaded report", emareach: "Live flagged-contact queue in your dashboard" },
  { label: "Sending", separate: "Separate platform required", emareach: "Send directly after cleaning, same platform" },
  { label: "Cost", separate: "Per-verification pricing stacks up", emareach: "Included in your EmaReach plan" },
];

const teamCards = [
  {
    team: "Growth & marketing teams",
    result: "Keep large contact databases clean automatically instead of running quarterly manual scrubs.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    team: "Sales teams importing new lists",
    result: "Catch bad data the moment a new list is uploaded, before it ever touches an outbound campaign.",
    icon: Users2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    team: "Agencies managing client contact data",
    result: "Apply the same list hygiene standard across every client account without extra tools or manual review.",
    icon: Gauge,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const statCards = [
  { value: "Instant", label: "List scanning", sub: "on every CSV import or sync" },
  { value: "92%", label: "Average inbox rate", sub: "with clean lists + warm-up" },
  { value: "0", label: "Extra tools needed", sub: "cleaning built into the platform" },
  { value: "Ongoing", label: "Engagement hygiene", sub: "not just a one-time scrub" },
];

const faqItems = [
  {
    q: "What does EmaReach's email list cleaner actually check for?",
    a: "Smart lead detection flags invalid syntax, disposable and risky domains, role-based addresses, and known spam-trap patterns — scanning every list the moment it's imported.",
  },
  {
    q: "Do I need a separate list verification tool?",
    a: "No. List cleaning is built directly into EmaReach, so you don't need to export contacts to a third-party verifier and re-import them before sending.",
  },
  {
    q: "Does list cleaning happen once or continuously?",
    a: "Both. Lists are scanned on import, and engagement-based signals continue flagging low-quality or unresponsive contacts over time as your list evolves.",
  },
  {
    q: "How does list hygiene connect to deliverability?",
    a: "A clean list reduces bounces and spam complaints, which protects the sender reputation that warm-up and domain health monitoring are already working to build.",
  },
  {
    q: "Can I review flagged contacts before removing them?",
    a: "Yes. Flagged contacts appear in a review queue with the reason they were flagged, so you decide whether to remove or keep each one.",
  },
  {
    q: "Does cleaning my list slow down sending?",
    a: "No. Scanning happens automatically during import and runs in the background — it doesn't add manual steps to your campaign launch process.",
  },
  {
    q: "Is list cleaning included in the free plan?",
    a: "Smart lead detection is available across EmaReach plans. See the pricing page for current limits by tier.",
  },
];

function ListCleanerMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500/30 via-primary/20 to-emerald-500/20 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">EmaReach — List Cleaner</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
            <span className="text-xs text-muted-foreground">Scan complete</span>
          </div>
        </div>
        <div className="p-5">
          <p className="mb-3 font-mono text-sm font-medium text-foreground">contacts-import-2024.csv</p>
          <div className="space-y-2.5">
            {[
              { label: "Valid & verified", value: "8,214", tone: "text-emerald-600 dark:text-emerald-400" },
              { label: "Risky domain flagged", value: "142", tone: "text-amber-600 dark:text-amber-400" },
              { label: "Invalid syntax", value: "37", tone: "text-destructive" },
              { label: "Role-based (info@, etc.)", value: "68", tone: "text-amber-600 dark:text-amber-400" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/20 px-3 py-2 text-xs"
              >
                <span className="text-foreground">{row.label}</span>
                <span className={`font-semibold ${row.tone}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-teal-500/10 px-2 py-0.5 font-medium text-teal-700 dark:text-teal-300">Auto-scanned on import</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">Domain health: Good</span>
        </div>
      </div>
    </div>
  );
}

function MidPageCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/12 via-primary/8 to-emerald-500/8" />
      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-xl sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Clean your list without leaving your sending tool
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              List cleaning, warm-up, and campaign sending — all in one platform, one plan.
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

export function EmailListCleanerToolPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-teal-500/6 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/7 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-emerald-500/7 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Filter className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Email List Cleaner Tool
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              A list cleaner that&apos;s{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-teal-500 to-primary bg-clip-text text-transparent">
                  built into your sending tool
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-teal-500/60 to-primary/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EmaReach scans every contact list on import — flagging risky, invalid, and role-based addresses
              automatically, so you send to a clean list without a separate verification tool.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Hygiene doesn&apos;t stop at import. Engagement-based signals keep your list clean as it grows.
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

          <ListCleanerMock />

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
              Dirty lists quietly wreck deliverability
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A handful of bad addresses can trigger bounces and spam complaints that follow your domain
              long after the send is over.
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
              List hygiene that runs itself
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Cleaning, protection, and ongoing monitoring — working together, not as a separate chore.
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
              Everything a list cleaner should do — and what happens after
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
              From messy list to clean send in five steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Cleaning happens where you already import and send — no extra tool.
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
              <div className="flex-1 rounded-3xl border border-border bg-gradient-to-br from-teal-500/10 via-card to-primary/5 p-7 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Clean lists back up healthy domains</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  List hygiene and warm-up work together — fewer bounces and complaints mean warm-up progress
                  isn&apos;t constantly undone by bad sends.
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
                <h4 className="font-semibold">No wait time for verification</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lists are scanned during import — no waiting on a separate verification job to finish before
                  you can launch a campaign.
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
              Standalone list verifiers vs. built-in list cleaning
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Paying for a separate verification tool means exporting, verifying, and re-importing — every time.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3.5 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Capability</span>
              <span className="text-center text-muted-foreground">Standalone verifiers</span>
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
              Built for anyone importing contact lists regularly
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
                { href: "/features/remove-risky-emails-contact-blocking", label: "Risky email removal" },
                { href: "/features/deliverability-warmup", label: "Deliverability & warm-up" },
                { href: "/features/analytics-reporting", label: "Analytics & reporting" },
                { href: "/email-blast-software", label: "Email blast software" },
                { href: "/email-marketing-tool", label: "Email marketing tool" },
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
              Email list cleaner questions — answered
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know about keeping your contact list clean with EmaReach.
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
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-teal-500/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-emerald-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Send to a cleaner list today
            </span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The list cleaner that&apos;s{" "}
            <span className="bg-gradient-to-r from-teal-500 to-primary bg-clip-text text-transparent">
              already in your sending tool
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Import, scan, clean, and send — all in one platform. No separate verification service, no
            export/import cycle.
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
            List cleaning + warm-up + sending — one plan.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
