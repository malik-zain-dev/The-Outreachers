import {
  Sparkles,
  Send,
  TrendingUp,
  BarChart3,
  Target,
  Shield,
  TestTube,
  UserRound,
  Inbox,
  GitBranch,
  LayoutTemplate,
  Mail,
  Bell,
  Megaphone,
  MessageSquareText,
  RotateCw,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  badge?: string;
  featured?: boolean;
  href?: string;
};

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Email Generation",
    description:
      "Create personalized, high-converting emails in seconds. Our AI understands your prospect's context, writes on-brand copy per step, and checks spam scores — all before you hit send.",
    color: "from-violet-500 to-purple-600",
    badge: "Most popular",
    featured: true,
    href: "/features/ai-writing-personalization",
  },
  {
    icon: TrendingUp,
    title: "Inbox Warm-Up",
    description:
      "Automatically warm domains with realistic patterns. Build sender reputation. Land in the inbox.",
    color: "from-emerald-500 to-teal-600",
    href: "/features/deliverability-warmup",
  },
  {
    icon: Send,
    title: "Campaign Sequences",
    description:
      "Multi-step follow-ups with smart delays, conditional triggers, and A/B testing built in.",
    color: "from-sky-500 to-blue-600",
    href: "/features/campaign-automation-sequences",
  },
  {
    icon: Megaphone,
    title: "AI Campaign Studio",
    description:
      "Chat to build full campaigns: templates, delays, sequences, and launch — zero manual setup.",
    color: "from-pink-500 to-rose-600",
    badge: "New",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Opens, clicks, replies, conversions. Filter by campaign, step, or time. Export to your CRM.",
    color: "from-orange-500 to-amber-600",
    href: "/features/analytics-reporting",
    featured: true,
  },
  {
    icon: RotateCw,
    title: "Auto Inbox Rotation",
    description:
      "Distribute sends across accounts with round-robin or random rotation. Never over-burn a single sender.",
    color: "from-cyan-500 to-sky-600",
  },
  {
    icon: Mail,
    title: "Unified Inbox",
    description:
      "All replies in one view. Tag, archive, and reply without losing context on a single lead.",
    color: "from-blue-500 to-indigo-600",
    href: "/features/unified-inbox-replies",
  },
  {
    icon: GitBranch,
    title: "Visual Workflows",
    description:
      "Trigger on events, send, wait, branch on reply status, and connect via webhooks — all in a drag-and-drop canvas.",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: TestTube,
    title: "A/B Testing",
    description:
      "Test variants per sequence step. Auto-select winners based on reply rate.",
    color: "from-fuchsia-500 to-violet-600",
  },
  {
    icon: UserRound,
    title: "Human-Like Sending",
    description:
      "Configurable daily limits, sending windows, timezone-aware scheduling. Looks human. Not bot.",
    color: "from-lime-500 to-green-600",
  },
  {
    icon: Target,
    title: "Smart Contact Management",
    description:
      "Tags, custom fields, smart segments. Laser-focused targeting for every campaign.",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: Bell,
    title: "Deliverability Alerts",
    description:
      "Get notified about domain, inbox, and campaign issues before they hurt your sending.",
    color: "from-yellow-500 to-amber-600",
  },
  {
    icon: LayoutTemplate,
    title: "Template Builder",
    description:
      "Drag-and-drop editor. Variables, images, and desktop/mobile preview. Ship in minutes.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: MessageSquareText,
    title: "AI Reply Drafting",
    description:
      "Auto-generate reply drafts for inbound messages. Review, refine, and send — in your brand voice.",
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    icon: Inbox,
    title: "SDR Mailbox",
    description:
      "A dedicated inbox for reps to receive and reply — without full dashboard access.",
    color: "from-indigo-500 to-blue-700",
  },
  {
    icon: Clock,
    title: "Adaptive Pacing",
    description:
      "Per-inbox daily limits with safe rhythms. Consistent outbound traffic without deliverability risk.",
    color: "from-slate-500 to-gray-600",
  },
  {
    icon: Bell,
    title: "Inbox Reputation Check",
    description:
      "Instant Safe vs. Risky status. Know if your inbox is blocked before you waste sends.",
    color: "from-green-500 to-emerald-700",
    href: "/features/remove-risky-emails-contact-blocking",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, role-based access, audit logs, GDPR & CAN-SPAM compliance.",
    color: "from-violet-600 to-indigo-700",
    href: "/features/security-compliance",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            18 features
          </span>
          <h2
            className="font-black leading-tight tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.025em" }}
          >
            Everything you need.
            <br />
            <span className="text-muted-foreground font-medium">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From AI copy to real-time analytics — every tool that moves the needle is already inside.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const isFeatured = feature.featured;
            const cardClass = `group relative rounded-2xl border border-border bg-card p-6 lg:p-7 flex flex-col transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/5 ${
              isFeatured ? "lg:col-span-1 ring-1 ring-primary/15" : ""
            } ${feature.href ? "cursor-pointer" : ""}`;

            const CardInner = (
              <>
                {/* Featured glow */}
                {isFeatured && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(199 89% 48% / 0.06) 0%, transparent 70%)",
                    }}
                  />
                )}

                {/* Badge */}
                {feature.badge && (
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background:
                        feature.badge === "New"
                          ? "linear-gradient(135deg, hsl(292 84% 61%), hsl(270 76% 55%))"
                          : "linear-gradient(135deg, hsl(199 89% 48%), hsl(217 91% 60%))",
                      color: "white",
                    }}
                  >
                    {feature.badge}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 flex-shrink-0 shadow-lg`}
                >
                  <feature.icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-[17px] font-bold text-foreground mb-2.5 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Learn more */}
                {feature.href && (
                  <div className="mt-5 flex items-center gap-1.5 text-primary text-xs font-semibold group/link">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </div>
                )}
              </>
            );

            return feature.href ? (
              <Link key={index} href={feature.href} className={cardClass}>
                {CardInner}
              </Link>
            ) : (
              <div key={index} className={cardClass}>
                {CardInner}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            All features available on every paid plan. No hidden add-ons.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
          >
            Compare plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
