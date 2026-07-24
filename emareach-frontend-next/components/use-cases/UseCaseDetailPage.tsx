import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  MessageSquareQuote,
  Plus,
  Shield,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { UseCaseData } from "@/lib/use-cases-data";

type UseCaseDetailPageProps = {
  useCase: UseCaseData;
};

export function UseCaseDetailPage({ useCase }: UseCaseDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="lg:grid lg:grid-cols-5 lg:gap-14 lg:items-center">
            {/* Left: copy */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                  <Target className="w-3.5 h-3.5" />
                  {useCase.audienceLabel}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-foreground/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  Trusted by 1,000+ teams
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                {useCase.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {useCase.heroSubtitle}
              </p>

              <MarketingCtaButtons
                primary={{ href: "/book-demo", label: "See a live demo" }}
                trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
                className="mb-8"
              />

              {/* Inline social proof */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <span className="text-border hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span>Set up in minutes</span>
                </div>
                <span className="text-border hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right: results preview card (desktop only) */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="rounded-2xl border border-primary/20 bg-card shadow-2xl shadow-primary/8 p-6 relative">
                <div className="absolute -top-px left-6 right-6 h-1 gradient-primary rounded-full" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">
                  Average results after 30 days
                </p>
                <div className="space-y-3">
                  {useCase.stats.slice(0, 3).map((stat) => (
                    <div
                      key={`${stat.value}-${stat.label}`}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/40"
                    >
                      <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold tracking-tight leading-none mb-0.5">{stat.value}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-xs text-muted-foreground">Based on data from 1,000+ active teams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 border-t border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCase.stats.map((stat) => (
              <article
                key={`${stat.value}-${stat.label}`}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="h-1 w-16 rounded-full gradient-primary mb-4" />
                <p className="text-3xl lg:text-4xl font-bold tracking-tight mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN + OUTCOMES ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Pain */}
            <div className="rounded-2xl border border-red-200/60 bg-red-50/30 dark:bg-red-500/5 dark:border-red-500/15 p-7 lg:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                <X className="w-3 h-3" />
                The problem
              </div>
              <h2 className="text-2xl font-bold mb-3">{useCase.painHeading}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{useCase.painIntro}</p>
              <ul className="space-y-3.5">
                {useCase.painPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <MessageSquareQuote className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div className="rounded-2xl border border-green-200/60 bg-green-50/30 dark:bg-green-500/5 dark:border-green-500/15 p-7 lg:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Check className="w-3 h-3" />
                The solution
              </div>
              <h2 className="text-2xl font-bold mb-3">{useCase.outcomesHeading}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                EmaReach gives you the infrastructure, workflows, and AI to hit the numbers that matter.
              </p>
              <ul className="space-y-3.5">
                {useCase.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">The transformation</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Before vs after EmaReach</h2>
            <p className="text-muted-foreground text-lg">
              See how teams go from manual chaos to predictable revenue in weeks, not months.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <article className="rounded-2xl border-2 border-red-200/70 bg-red-50/40 dark:bg-red-500/5 dark:border-red-500/20 p-7 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Before EmaReach</h3>
              </div>
              <ul className="space-y-4">
                {useCase.comparisonBefore.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border-2 border-green-200/70 bg-green-50/40 dark:bg-green-500/5 dark:border-green-500/20 p-7 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">After EmaReach</h3>
              </div>
              <ul className="space-y-4">
                {useCase.comparisonAfter.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{useCase.workflowHeading}</h2>
            <p className="text-muted-foreground text-lg">{useCase.workflowIntro}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {useCase.workflowSteps.map((step, index) => (
              <article
                key={step.title}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Built for results</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Feature highlights</h2>
            <p className="text-muted-foreground text-lg">
              Purpose-built capabilities for high-quality, conversion-first outbound execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {useCase.featureHighlights.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-5">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="rounded-3xl border border-border bg-card p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Large open-quote */}
            <p className="text-6xl font-black text-primary/15 leading-none mb-2 select-none">&ldquo;</p>

            <blockquote className="text-xl sm:text-2xl leading-relaxed font-medium mb-8 text-foreground">
              {useCase.testimonial.quote}
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                {useCase.testimonial.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">{useCase.testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{useCase.testimonial.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA INTERRUPT ────────────────────────────────────── */}
      <section className="py-10 border-y border-border bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-lg mb-1">Ready to see results like these?</p>
              <p className="text-muted-foreground text-sm">
                Join 1,000+ teams already running EmaReach playbooks. First results in 7 days or less.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <MarketingCtaButtons
                size="sm"
                trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 gradient-primary rounded-l-3xl" />
            <div className="pl-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conversion proof
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{useCase.proofHeading}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{useCase.proofBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-border bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Got questions?</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {useCase.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-200 overflow-hidden"
              >
                <summary className="cursor-pointer font-semibold text-foreground list-none flex items-start justify-between gap-4 p-6">
                  <span>{item.question}</span>
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5 group-open:bg-primary/10 group-open:text-primary transition-colors duration-200">
                    <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                <div className="px-6 pb-6 border-t border-border/50 pt-4">
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          {/* Stacked avatars social proof */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full gradient-primary border-2 border-background -ml-2 first:ml-0 flex items-center justify-center"
                >
                  <Users className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">1,000+ teams</span> already running this playbook
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">{useCase.ctaTitle}</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">{useCase.ctaBody}</p>

          <MarketingCtaButtons
            size="lg"
            primary={{ href: "/book-demo", label: "Book a demo" }}
            trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            className="mb-7"
          />

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Launch in under 10 minutes
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
