import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Gauge,
  Layers3,
  Lock,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
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
    problem: "Consumer email tools don't scale to teams",
    fix: "Multi-seat workspaces, per-inbox permissions, and shared analytics built for business use, not solo senders.",
    icon: Building2,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    problem: "No visibility across departments",
    fix: "Centralized reporting across every inbox, campaign, and team member — one dashboard for the whole business.",
    icon: BarChart3,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
  {
    problem: "Compliance and security are an afterthought",
    fix: "Role-based access, audit visibility, and domain-level controls built for businesses that answer to compliance teams.",
    icon: Lock,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
];

const pillarCards = [
  {
    title: "Built for teams, not just senders",
    subtitle: "Business-grade workspace",
    body: "Multiple team members, multiple inboxes, one workspace — with clear ownership over campaigns, contacts, and reporting.",
    icon: Users2,
    accent: "from-primary/25 to-blue-500/15",
  },
  {
    title: "Deliverability infrastructure at scale",
    subtitle: "Enterprise-grade sending",
    body: "Domain health monitoring and inbox warm-up across every sending identity in the business, so growth doesn't tank inbox placement.",
    icon: Flame,
    accent: "from-emerald-500/25 to-teal-500/15",
  },
  {
    title: "Security and access control",
    subtitle: "Compliance-ready",
    body: "Role-based permissions and per-inbox isolation keep sensitive contact data and sending identities properly scoped across your organization.",
    icon: ShieldCheck,
    accent: "from-violet-500/25 to-purple-500/15",
  },
];

const featureGrid = [
  {
    title: "Multi-seat team workspace",
    description:
      "Add team members with scoped access to specific inboxes, campaigns, and contact lists — built for business structure, not solo use.",
    icon: Users2,
    gradient: "from-primary/20 to-blue-500/15",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    border: "hover:border-primary/40",
  },
  {
    title: "Centralized campaign automation",
    description:
      "Build and manage multi-step sequences across every department's sending identity from a single control plane.",
    icon: Workflow,
    gradient: "from-violet-500/20 to-purple-500/15",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Domain-wide warm-up & health monitoring",
    description:
      "Track sender reputation across every domain and inbox the business uses, with automated warm-up keeping each one healthy.",
    icon: Flame,
    gradient: "from-emerald-500/20 to-teal-500/15",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Enterprise-grade list hygiene",
    description:
      "Smart lead detection flags risky contacts across every imported list before they touch a business sending identity.",
    icon: Target,
    gradient: "from-teal-500/20 to-emerald-500/15",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    border: "hover:border-teal-500/40",
  },
  {
    title: "Unified inbox across the org",
    description:
      "Replies from every team member's campaigns land in a shared, filterable inbox — nothing gets lost between departments.",
    icon: MessageSquare,
    gradient: "from-amber-500/20 to-orange-500/15",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Business-wide analytics & reporting",
    description:
      "Roll up opens, clicks, replies, and inbox placement across the whole business, or drill into a single team or campaign.",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-blue-500/15",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Access control & permissions",
    description:
      "Role-based permissions scope who can view contacts, edit campaigns, or access specific sending inboxes.",
    icon: Lock,
    gradient: "from-rose-500/20 to-pink-500/15",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
  {
    title: "Multi-inbox, multi-domain rotation",
    description:
      "Rotate sends across every connected inbox and domain automatically to distribute volume and protect the business's overall reputation.",
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
    title: "Set up your business workspace",
    text: "Create a shared workspace and invite team members with scoped permissions for their inboxes and campaigns.",
  },
  {
    step: "02",
    title: "Connect every sending domain",
    text: "Add Gmail, Google Workspace, and SMTP inboxes across departments. Warm-up starts automatically for each one.",
  },
  {
    step: "03",
    title: "Import and clean contact lists",
    text: "Upload lists per team or sync your CRM. Smart lead detection flags risky addresses before they enter any campaign.",
  },
  {
    step: "04",
    title: "Launch campaigns across teams",
    text: "Each team builds and runs its own AI-assisted campaigns while admins retain full visibility across the business.",
  },
  {
    step: "05",
    title: "Report at the business level",
    text: "Roll up performance across every team, domain, and campaign — or drill into any single one for detail.",
  },
];

const comparisonRows: { label: string; separate: string; emareach: string }[] = [
  { label: "Team access", separate: "Single-user login shared across staff", emareach: "Role-based multi-seat workspace" },
  { label: "Domain oversight", separate: "Per-tool, siloed views", emareach: "Business-wide domain health dashboard" },
  { label: "Deliverability", separate: "Managed manually per team", emareach: "Automated warm-up across all domains" },
  { label: "Reporting", separate: "Exported spreadsheets, manually combined", emareach: "Unified cross-team analytics" },
  { label: "List hygiene", separate: "Inconsistent across departments", emareach: "Centralized smart lead detection" },
  { label: "Cost structure", separate: "Per-tool licenses stacking up", emareach: "One plan scoped to business needs" },
];

const teamCards = [
  {
    team: "Marketing departments",
    result: "Coordinate campaigns across multiple senders while keeping brand reputation and domain health under one view.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    team: "Sales & RevOps organizations",
    result: "Give every rep their own sending identity while admins track pipeline-relevant metrics business-wide.",
    icon: Users2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    team: "Agencies managing client accounts",
    result: "Isolate each client's sending identities and contacts under one business account, with reporting split by client.",
    icon: Gauge,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const statCards = [
  { value: "92%", label: "Average inbox rate", sub: "across every connected domain" },
  { value: "Multi-seat", label: "Team workspaces", sub: "with scoped permissions" },
  { value: "1", label: "Dashboard", sub: "for every team, inbox, and campaign" },
  { value: "24/7", label: "Automated warm-up", sub: "running across the business" },
];

const faqItems = [
  {
    q: "What makes EmaReach a business email marketing software, not just a personal tool?",
    a: "EmaReach includes multi-seat workspaces, role-based permissions, business-wide domain health monitoring, and consolidated reporting — the infrastructure businesses need that solo email tools don't offer.",
  },
  {
    q: "Can multiple team members send from EmaReach at once?",
    a: "Yes. Each team member can connect their own inbox and run campaigns with scoped access, while admins retain full visibility and control across the entire business account.",
  },
  {
    q: "How does EmaReach handle deliverability across many domains?",
    a: "Every connected inbox and domain gets automated warm-up and health monitoring, so the business's overall sender reputation stays healthy as more teams send from more identities.",
  },
  {
    q: "Does EmaReach support role-based permissions?",
    a: "Yes. Admins can scope which team members can view contacts, edit campaigns, or access specific sending inboxes, keeping sensitive data and sending identities properly isolated.",
  },
  {
    q: "Can I get business-wide reporting, not just per-campaign stats?",
    a: "Yes. EmaReach rolls up opens, clicks, replies, and inbox placement across every team and domain, with the ability to drill into any single campaign or inbox.",
  },
  {
    q: "Is EmaReach suitable for agencies managing multiple client accounts?",
    a: "Yes. Agencies can isolate each client's sending identities and contact lists under one business account, with reporting segmented by client.",
  },
  {
    q: "What list hygiene features does the business plan include?",
    a: "Smart lead detection flags risky or invalid contacts across every imported list, centrally, before they touch any business sending identity.",
  },
];

function BusinessWorkspaceMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-violet-500/20 to-emerald-500/20 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">EmaReach — Business Workspace</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              4 teams active
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-2.5">
            {[
              { team: "Marketing", inboxes: "6 inboxes", health: "Healthy", tone: "text-emerald-600 dark:text-emerald-400" },
              { team: "Sales", inboxes: "12 inboxes", health: "Healthy", tone: "text-emerald-600 dark:text-emerald-400" },
              { team: "Partnerships", inboxes: "3 inboxes", health: "Warming", tone: "text-amber-600 dark:text-amber-400" },
              { team: "Support", inboxes: "2 inboxes", health: "Healthy", tone: "text-emerald-600 dark:text-emerald-400" },
            ].map((row) => (
              <div
                key={row.team}
                className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/20 px-3 py-2 text-xs"
              >
                <span className="font-medium text-foreground">{row.team}</span>
                <span className="text-muted-foreground">{row.inboxes}</span>
                <span className={`font-semibold ${row.tone}`}>{row.health}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">Role-based access</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">Business-wide reporting</span>
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
              Email marketing infrastructure your whole business can run on
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Multi-seat workspaces, business-wide deliverability, and one dashboard for every team.
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

export function BusinessEmailMarketingSoftwarePage() {
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
              <Building2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Business Email Marketing Software
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Email marketing software built for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  entire businesses, not solo senders
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-violet-500/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EmaReach gives your business a multi-seat workspace, business-wide deliverability infrastructure, and
              role-based access — so every team can send, without losing visibility or control.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Marketing, sales, and support teams all send from one platform, with one report at the top.
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

          <BusinessWorkspaceMock />

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
              Consumer-grade tools break down at business scale
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Shared logins, no access control, and fragmented reporting across departments make it impossible
              to run email marketing like a real business function.
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
              Everything a business needs from its email marketing software
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Team structure, deliverability, and security working together — not stitched from separate tools.
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
              Business-grade email marketing, end to end
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
              From workspace setup to business-wide reporting
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Set up once at the business level. Every team plugs in from there.
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
                  <Layers3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">One workspace, every department</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Marketing, sales, and support all send from the same platform, with permissions that keep each
                  team&apos;s contacts and campaigns properly scoped.
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
                <h4 className="font-semibold">Ramp-up tiers for new domains</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  As new teams or domains come online, ramp-up tiers scale their daily send cap gradually to protect
                  the business&apos;s overall sender reputation.
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
              Consumer email tools vs. business email marketing software
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Shared logins and fragmented reporting don&apos;t scale past a handful of senders.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3.5 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Capability</span>
              <span className="text-center text-muted-foreground">Consumer tools</span>
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
              Built for organizations, not just individual senders
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
                { href: "/features/security-compliance", label: "Security & compliance" },
                { href: "/features/deliverability-warmup", label: "Deliverability & warm-up" },
                { href: "/features/analytics-reporting", label: "Analytics & reporting" },
                { href: "/features/campaign-automation-sequences", label: "Campaign automation" },
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
              Business email marketing software questions — answered
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know about running EmaReach across your organization.
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
              Scale email marketing across your business
            </span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Business email marketing software that{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              scales with your teams
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Multi-seat workspaces, business-wide deliverability, and role-based access — all in one platform for
            your whole organization.
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
            Multi-seat teams + business-wide deliverability — one plan.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
