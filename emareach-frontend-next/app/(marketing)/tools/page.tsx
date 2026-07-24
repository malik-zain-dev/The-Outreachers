import type { Metadata } from "next";
import Link from "next/link";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import {
  ArrowRight,
  TriangleAlert,
  Globe,
  Shield,
  Key,
  MailCheck,
  Ban,
  FlaskConical,
  Inbox,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Email Deliverability Tools | EmaReach",
  description:
    "Free tools to test inbox placement, check spam score, MX records, SPF, DKIM, email validity, blacklists, and subject lines. No sign-up required.",
};

const tools = [
  {
    name: "Inbox Placement Test",
    path: "/tools/inbox-placement-test",
    icon: Inbox,
    description: "Send your email to our real seed mailboxes (Gmail + Outlook) and see whether it lands in inbox, spam, or promotions. No bots — real results.",
    tags: ["Real Mailbox", "Live Test"],
    color: "blue",
    highlight: true,
  },
  {
    name: "Spam Score Checker",
    path: "/tools/spam-checker",
    icon: TriangleAlert,
    description: "Paste your email subject and body to instantly detect spam trigger words, risky patterns, and get a deliverability score.",
    tags: ["Content", "Instant"],
    color: "amber",
  },
  {
    name: "MX Record Lookup",
    path: "/tools/mx-lookup",
    icon: Globe,
    description: "Look up the Mail Exchange (MX) records for any domain to verify it can receive email and see provider priority.",
    tags: ["DNS", "Domain"],
    color: "blue",
  },
  {
    name: "SPF Record Checker",
    path: "/tools/spf-checker",
    icon: Shield,
    description: "Check whether a domain has a valid SPF record configured, verify syntax, and flag common authentication issues.",
    tags: ["DNS", "Auth"],
    color: "violet",
  },
  {
    name: "DKIM Record Checker",
    path: "/tools/dkim-checker",
    icon: Key,
    description: "Validate DKIM signing setup by querying the public key at a given selector. Ensure DKIM is active and properly configured.",
    tags: ["DNS", "Auth"],
    color: "indigo",
  },
  {
    name: "Email Address Verifier",
    path: "/tools/email-validator",
    icon: MailCheck,
    description: "Verify if an email address is correctly formatted, the domain has MX records, and whether it appears to be disposable.",
    tags: ["Email", "Validation"],
    color: "emerald",
  },
  {
    name: "Blacklist Checker",
    path: "/tools/blacklist-checker",
    icon: Ban,
    description: "Check if a domain or IP address is listed on major email blacklists including Spamhaus, Barracuda, SpamCop, and more.",
    tags: ["Reputation", "IP/Domain"],
    color: "red",
  },
  {
    name: "Subject Line Analyzer",
    path: "/tools/subject-line-analyzer",
    icon: FlaskConical,
    description: "Score your email subject line for spam triggers, length, tone, personalization, and get actionable improvement tips.",
    tags: ["Content", "Instant"],
    color: "pink",
  },
];

const colorMap: Record<string, string> = {
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
};

const iconColorMap: Record<string, string> = {
  amber: "text-amber-500",
  blue: "text-blue-500",
  violet: "text-violet-500",
  indigo: "text-indigo-500",
  emerald: "text-emerald-500",
  red: "text-red-500",
  pink: "text-pink-500",
};

const iconBgMap: Record<string, string> = {
  amber: "bg-amber-500/10",
  blue: "bg-blue-500/10",
  violet: "bg-violet-500/10",
  indigo: "bg-indigo-500/10",
  emerald: "bg-emerald-500/10",
  red: "bg-red-500/10",
  pink: "bg-pink-500/10",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Free — No sign-up required
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-5">
            Email Deliverability Toolkit
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Eight free tools to diagnose your email infrastructure, test real inbox placement, score your content, and fix deliverability before it costs you.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isHighlight = (tool as { highlight?: boolean }).highlight;
              return (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className={`group relative flex flex-col rounded-2xl border bg-background p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
                    isHighlight
                      ? "border-primary/30 ring-1 ring-primary/10 sm:col-span-2 lg:col-span-1"
                      : "border-border/80 hover:border-border"
                  }`}
                >
                  {isHighlight && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconBgMap[tool.color]}`}>
                    <Icon className={`w-5 h-5 ${iconColorMap[tool.color]}`} />
                  </div>
                  <h2 className="text-[15px] font-bold text-foreground mb-2 leading-snug">
                    {tool.name}
                  </h2>
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${colorMap[tool.color]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Fix deliverability at the source
          </h2>
          <p className="text-muted-foreground mb-8 text-base sm:text-lg">
            These tools diagnose the problem. EmaReach fixes it — with built-in warm-up, AI-powered copy, and infrastructure that keeps you in the inbox.
          </p>
            <MarketingCtaButtons
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
        </div>
      </section>
    </div>
  );
}
