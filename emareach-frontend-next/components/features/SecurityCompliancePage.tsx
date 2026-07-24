import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Lock,
  MailCheck,
  Settings2,
  ShieldCheck,
  Users2,
  Workflow,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react";

const implementedCapabilities = [
  {
    title: "Encrypted data handling",
    description:
      "Protect campaign and account data in transit and at rest so customer information remains secure throughout your outbound workflows.",
    icon: Lock,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Access and permission controls",
    description:
      "Define role-based access to keep mailbox operations, campaign configuration, and admin actions scoped to the right users.",
    icon: Settings2,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Compliance-aware operations",
    description:
      "Support consent and unsubscribe-aware workflows that help teams run responsible outreach at scale.",
    icon: FileCheck2,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Security-first platform posture",
    description:
      "Use guardrails designed to reduce operational risk while enabling teams to move fast on outbound execution.",
    icon: ShieldCheck,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    border: "hover:border-amber-500/40",
  },
];

const keyMetrics = [
  {
    label: "Operational trust",
    value: "Security by default",
    note: "Core controls built into everyday campaign workflows.",
    icon: ShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Team readiness",
    value: "Enterprise-friendly",
    note: "Support growing team structures with controlled access.",
    icon: Users2,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Risk reduction",
    value: "Policy-aligned",
    note: "Standardized practices reduce compliance drift.",
    icon: FileCheck2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Audit visibility",
    value: "Full accountability",
    note: "Track important platform actions for governance.",
    icon: BarChart3,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Security reviews block deployment when tooling lacks clear controls.",
  "Teams share broad permissions, increasing operational and data risk.",
  "Outbound workflows scale faster than governance processes.",
  "Compliance requirements add manual checks and execution friction.",
];

const workflowSteps = [
  {
    text: "Set account and workspace-level access rules for users and teams.",
    step: "01",
  },
  {
    text: "Define secure campaign workflows with scoped operational permissions.",
    step: "02",
  },
  {
    text: "Apply compliance-aware outreach controls, including consent-safe handling.",
    step: "03",
  },
  {
    text: "Monitor high-impact actions and maintain audit-friendly process records.",
    step: "04",
  },
  {
    text: "Scale outbound execution with governance standards already enforced.",
    step: "05",
  },
];

const teamOutcomes = [
  {
    team: "Founders & Growth Leaders",
    result:
      "Move faster with confidence by establishing security and compliance fundamentals early.",
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "Sales & RevOps Teams",
    result:
      "Run high-volume outbound without creating permission or governance blind spots.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "Agencies & Enterprise Operators",
    result:
      "Meet client and stakeholder security expectations while maintaining campaign velocity.",
    icon: Globe,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "Centralized governance model",
    description:
      "Manage security practices from one platform instead of relying on fragmented process documents and manual enforcement.",
    icon: Database,
  },
  {
    title: "Role-aware team configuration",
    description:
      "Align access by function so reps, managers, and admins each get the controls they need without excessive privileges.",
    icon: Users2,
  },
  {
    title: "Built-in compliance safeguards",
    description:
      "Operational controls help teams follow outreach policies consistently as campaign volume grows.",
    icon: Workflow,
  },
  {
    title: "Scalable security foundation",
    description:
      "Security controls are designed to support both early-stage teams and larger go-to-market organizations.",
    icon: Clock3,
  },
];

export function SecurityCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Security &amp; Compliance
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Built to meet modern{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  strong security
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-blue-500/60" />
              </span>{" "}
              expectations
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Protect outbound operations with practical security controls and
              compliance-aware workflows. EmaReach helps teams scale safely
              without slowing campaign execution.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
              Try for Free
              </Link>
            </div>

            {/* social proof micro-line */}
            <p className="mt-6 text-sm text-muted-foreground">
              Trusted by 1,200+ teams across 40 countries
            </p>
          </div>

          {/* ── Metric cards ── */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric) => (
              <article
                key={metric.label}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div
                  className={`mb-3 inline-flex rounded-xl ${metric.bg} p-2.5 ${metric.color}`}
                >
                  <metric.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-1 text-base font-bold text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {metric.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPLEMENTED CAPABILITIES ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              What's included
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What we have implemented
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Essential platform capabilities already in place to support secure,
              compliant outbound for modern teams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {implementedCapabilities.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 ${item.border} hover:-translate-y-0.5 hover:shadow-lg`}
              >
                {/* subtle bg gradient on hover */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 inline-flex rounded-xl bg-primary/10 p-3 ${item.iconColor}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS + SAAS DETAILS ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Practical operations
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for practical security operations
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Security only works when it's operationally usable. This approach
              balances governance requirements with day-to-day outbound speed.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pain points */}
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10">
                  <span className="text-sm">⚠️</span>
                </span>
                <h3 className="text-xl font-semibold">Common pain points</h3>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                Problems teams face without the right security foundation.
              </p>
              <ul className="space-y-4">
                {commonProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {problem}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Platform details */}
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </span>
                <h3 className="text-xl font-semibold">Platform details</h3>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                How EmaReach solves these challenges at the platform level.
              </p>
              <div className="space-y-3">
                {platformDetails.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-border/60 bg-muted/30 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW + TEAM OUTCOMES ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple steps, serious results
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Workflow steps */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">How the flow works</h3>
              <ol className="relative space-y-0">
                {workflowSteps.map((item, i) => (
                  <li key={item.step} className="flex gap-4">
                    {/* vertical line + circle */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-primary/20">
                        {item.step}
                      </div>
                      {i < workflowSteps.length - 1 && (
                        <div className="my-1 w-px flex-1 bg-border" />
                      )}
                    </div>
                    <p className="pb-6 pt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Team outcomes */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">
                Built to work for all
              </h3>
              <div className="space-y-4">
                {teamOutcomes.map((item) => (
                  <div
                    key={item.team}
                    className="group flex gap-4 rounded-xl border border-border/60 bg-muted/30 p-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {item.team}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* trust indicators */}
              <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Compliance standards supported
                </p>
                <div className="flex flex-wrap gap-2">
                  {["GDPR", "CAN-SPAM", "CASL", "SOC 2 ready", "ISO-aligned"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {badge}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <MailCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Secure operations, better execution
            </span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Build trust while scaling{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              outbound performance
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Use security and compliance as a growth enabler, not a blocker.
            EmaReach helps teams protect data, support governance, and keep
            outbound operations reliable as they scale.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
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

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users2 className="h-4 w-4" />
            Designed for founders, SDR teams, agencies, and RevOps leaders.
          </p>
        </div>
      </section>
    </div>
  );
}