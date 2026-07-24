import type { Metadata } from "next";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Megaphone,
  Rocket,
  Shield,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useCaseCategories, useCasesData } from "@/lib/use-cases-data";

export const metadata: Metadata = {
  title: "Use Cases | EmaReach",
  description:
    "Explore role-based EmaReach use cases for SDRs, founders, marketers, agencies, recruiters, and more. Long-form, conversion-focused outbound playbooks.",
  keywords:
    "cold email use cases, outbound sales use cases, outreach playbooks, SDR outbound, agency cold email",
};

function getCategoryIcon(category: string, size = "w-5 h-5") {
  switch (category) {
    case "Sales":
      return <TrendingUp className={size} />;
    case "Founders":
      return <Rocket className={size} />;
    case "Marketing":
      return <Megaphone className={size} />;
    case "Agencies":
      return <Building2 className={size} />;
    case "Consulting":
      return <Briefcase className={size} />;
    case "Talent":
      return <Users className={size} />;
    default:
      return <Zap className={size} />;
  }
}

const categoryAccent: Record<string, string> = {
  Sales: "text-blue-600 dark:text-blue-400",
  Founders: "text-violet-600 dark:text-violet-400",
  Marketing: "text-orange-600 dark:text-orange-400",
  Agencies: "text-emerald-600 dark:text-emerald-400",
  Consulting: "text-indigo-600 dark:text-indigo-400",
  Talent: "text-rose-600 dark:text-rose-400",
};

const categoryBg: Record<string, string> = {
  Sales: "bg-blue-500/10",
  Founders: "bg-violet-500/10",
  Marketing: "bg-orange-500/10",
  Agencies: "bg-emerald-500/10",
  Consulting: "bg-indigo-500/10",
  Talent: "bg-rose-500/10",
};

const categoryBorder: Record<string, string> = {
  Sales: "border-blue-500/25",
  Founders: "border-violet-500/25",
  Marketing: "border-orange-500/25",
  Agencies: "border-emerald-500/25",
  Consulting: "border-indigo-500/25",
  Talent: "border-rose-500/25",
};

const categoryTagline: Record<string, string> = {
  Sales: "Turn cold outreach into a predictable pipeline machine",
  Founders: "Go from zero to first revenue with proven outbound systems",
  Marketing: "Drive qualified demand at scale with intent-based outreach",
  Agencies: "Deliver consistent, measurable results for every client campaign",
  Consulting: "Fill your calendar with high-value client opportunities",
  Talent: "Source and engage top candidates before competitors do",
};

const heroStats = [
  { value: "1,000+", label: "Teams powered", icon: <Users className="w-4 h-4" /> },
  { value: "3×", label: "Avg reply rate increase", icon: <TrendingUp className="w-4 h-4" /> },
  { value: "45%", label: "Time saved on outreach", icon: <Clock className="w-4 h-4" /> },
  { value: "22+", label: "Role-specific playbooks", icon: <BarChart3 className="w-4 h-4" /> },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-primary/6 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                <Zap className="w-3 h-3" />
                22+ proven playbooks
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground/70">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                Trusted by 1,000+ teams
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Find your role.{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Launch your pipeline.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Every role has a different outbound challenge. EmaReach gives you a proven playbook
              built specifically for how you sell — so you stop guessing and start booking meetings.
            </p>

            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "See it in action" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
          </div>

          {/* Key stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 pt-10 border-t border-border">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use-case grid by category ─────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-16">
          {useCaseCategories.map((category, catIndex) => {
            const items = useCasesData.filter((entry) => entry.category === category);
            const accent = categoryAccent[category] ?? "text-primary";
            const bg = categoryBg[category] ?? "bg-primary/10";
            const border = categoryBorder[category] ?? "border-primary/25";
            const tagline = categoryTagline[category] ?? "Proven outbound playbooks for your team";

            return (
              <div key={category}>
                {/* Category header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bg} ${accent} text-xs font-bold uppercase tracking-wider mb-3 border ${border}`}
                    >
                      {getCategoryIcon(category, "w-3.5 h-3.5")}
                      {category}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{category} Use Cases</h2>
                    <p className="text-muted-foreground mt-1 text-sm">{tagline}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-sm font-semibold ${accent} shrink-0`}>
                    {items.length} playbooks available
                  </span>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {items.map((entry) => (
                    <article
                      key={entry.slug}
                      className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {/* Top accent bar */}
                      <div className="h-1 gradient-primary" />

                      <div className="p-6">
                        {/* Audience + stat row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-bold uppercase tracking-wider ${accent}`}>
                            {entry.audienceLabel}
                          </span>
                          {entry.stats[0] && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-700 dark:text-green-400">
                              <TrendingUp className="w-3 h-3" />
                              {entry.stats[0].value}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                          {entry.role}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                          {entry.metaDescription}
                        </p>

                        {/* Outcome previews */}
                        <ul className="space-y-2 mb-6">
                          {entry.outcomes.slice(0, 2).map((point) => (
                            <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/use-cases/${entry.slug}`}
                          className={`inline-flex items-center gap-1.5 text-sm font-bold ${accent} hover:underline`}
                        >
                          View {entry.role} playbook
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Mid-listing interrupt CTA after the 3rd category */}
                {catIndex === 2 && (
                  <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Quick win</p>
                      <h3 className="text-xl font-bold mb-1">Don&apos;t see your exact role?</h3>
                      <p className="text-muted-foreground text-sm">
                        EmaReach adapts to any outbound workflow. Book a call and we&apos;ll build your custom playbook live.
                      </p>
                    </div>
                    <Link
                      href="/book-demo"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/20 hover:brightness-110 transition-all duration-200 whitespace-nowrap shrink-0"
                    >
                      Get custom playbook
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="rounded-3xl gradient-primary p-8 lg:p-14 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
                  Your competitors are already booking meetings with EmaReach.
                </h2>
                <p className="text-primary-foreground/80 text-lg">
                  Start with your role-specific playbook today. Most teams see results in their first week.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-background text-foreground hover:bg-background/90 shadow-lg transition-all duration-200"
                >
                  Book a live demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-200"
                >
                  Try for Free
                </Link>
                <p className="text-center text-xs text-primary-foreground/50">No credit card. No commitment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
