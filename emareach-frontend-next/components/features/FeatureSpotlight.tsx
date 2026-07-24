import { Sparkles, BarChart3, Shield, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const spotlights = [
  {
    tag: "01 · AI Writing",
    icon: Sparkles,
    title: "Writes like you.\nConverts like crazy.",
    description:
      "Our AI doesn't just fill in merge fields — it understands your offer and your prospect's context. You get unique, on-brand copy for every step of the sequence, with spam-safe phrasing and natural tone.",
    bullets: [
      "Industry and role-aware personalization",
      "Multi-step sequences in one click",
      "Spam score and readability checks built in",
      "Subject line variants auto-generated",
    ],
    gradient: "from-violet-500 to-purple-600",
    accentColor: "hsl(270 76% 55%)",
    href: "/features/ai-writing-personalization",
    mockup: "ai",
  },
  {
    tag: "02 · Analytics",
    icon: BarChart3,
    title: "Data that drives\nreal decisions.",
    description:
      "Open rates are just the start. Track reply rates by step, A/B winner performance, and pipeline impact. Filter by campaign, list, or time range.",
    bullets: [
      "Reply and conversion attribution",
      "Bounce and spam folder monitoring",
      "Step-by-step sequence performance",
      "Export to CRM in one click",
    ],
    gradient: "from-orange-500 to-amber-600",
    accentColor: "hsl(38 92% 50%)",
    href: "/features/analytics-reporting",
    mockup: "analytics",
  },
  {
    tag: "03 · Security",
    icon: Shield,
    title: "Enterprise-grade\ntrust built in.",
    description:
      "Your data and your customers' data are protected with encryption at rest and in transit. One-click unsubscribe and consent handling keep you compliant.",
    bullets: [
      "Encryption in transit and at rest",
      "GDPR and CAN-SPAM compliance",
      "Role-based access and audit logs",
      "SOC2 and SSO on higher plans",
    ],
    gradient: "from-indigo-500 to-violet-700",
    accentColor: "hsl(239 84% 67%)",
    href: "/features/security-compliance",
    mockup: "security",
  },
];

function AIMockup() {
  return (
    <div className="relative w-full h-full bg-card rounded-xl border border-border overflow-hidden p-4 flex flex-col gap-3">
      {/* Top bar */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-3 h-5 flex-1 max-w-[140px] rounded bg-muted/60 text-[10px] text-muted-foreground flex items-center px-2">
          AI Campaign Studio
        </div>
      </div>

      {/* Chat bubble from user */}
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-xl rounded-br-sm bg-primary/15 border border-primary/20 px-3 py-2 text-[11px] text-foreground">
          Write a cold email for our B2B SaaS targeting VPs of Sales at mid-market companies
        </div>
      </div>

      {/* AI response */}
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <div className="flex-1 rounded-xl rounded-tl-sm border border-border bg-card/80 px-3 py-2.5 text-[11px] text-foreground space-y-1.5">
          <div className="font-semibold text-primary text-[10px] uppercase tracking-wide mb-1">
            Generating 3-step sequence...
          </div>
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Subject:</strong> Quick question about {"{"}company{"}"}&apos;s outbound motion
          </p>
          <p className="leading-relaxed text-muted-foreground line-clamp-2">
            Hi {"{"}first_name{"}"}, I noticed {"{"}company{"}"} recently expanded their sales team. Most VPs of Sales I talk to are hitting a wall with inbox placement...
          </p>
          <div className="flex items-center gap-1.5 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-muted-foreground">Spam score: Low · Readability: A+</span>
          </div>
        </div>
      </div>

      {/* Steps preview */}
      <div className="mt-1 grid grid-cols-3 gap-1.5">
        {["Day 1", "Day 3", "Day 7"].map((d, i) => (
          <div key={i} className="rounded-lg border border-border bg-muted/30 px-2 py-1.5 text-center">
            <div className="text-[10px] font-semibold text-muted-foreground">{d}</div>
            <div className="text-[10px] text-foreground mt-0.5">
              {["Initial", "Follow-up", "Breakup"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  const bars = [62, 45, 78, 55, 90, 67, 82];
  return (
    <div className="relative w-full h-full bg-card rounded-xl border border-border overflow-hidden p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-foreground">Campaign Performance</div>
          <div className="text-[10px] text-muted-foreground">Last 7 days</div>
        </div>
        <div className="flex gap-1">
          {["1W", "1M", "3M"].map((t, i) => (
            <div
              key={i}
              className={`text-[10px] px-2 py-0.5 rounded font-medium ${i === 0 ? "bg-primary text-white" : "text-muted-foreground"}`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Open rate", value: "68%", color: "text-primary" },
          { label: "Reply rate", value: "12%", color: "text-emerald-500" },
          { label: "Meetings", value: "23", color: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg border border-border bg-muted/30 px-2.5 py-2">
            <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex-1 flex items-end gap-1.5 pt-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{
                height: `${h}%`,
                background:
                  i === 4
                    ? "linear-gradient(180deg, hsl(199 89% 48%), hsl(217 91% 60%))"
                    : "hsl(var(--muted))",
                maxHeight: "60px",
                minHeight: "8px",
              }}
            />
            <div className="text-[9px] text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityMockup() {
  const checks = [
    { label: "Encryption at rest", status: "pass" },
    { label: "SPF / DKIM / DMARC", status: "pass" },
    { label: "Unsubscribe links", status: "pass" },
    { label: "GDPR consent tracking", status: "pass" },
    { label: "Audit log active", status: "pass" },
  ];
  return (
    <div className="relative w-full h-full bg-card rounded-xl border border-border overflow-hidden p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center">
          <Shield className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <div className="text-[12px] font-bold text-foreground">Security Audit</div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-green-600 font-semibold">All systems go</span>
          </div>
        </div>
        <div className="ml-auto text-2xl font-black text-green-500">100%</div>
      </div>

      {/* Checks */}
      <div className="space-y-2 flex-1">
        {checks.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-2"
          >
            <span className="text-[11px] text-foreground font-medium">{c.label}</span>
            <span className="flex items-center gap-1 text-[10px] text-green-600 font-semibold">
              <Check className="w-3 h-3" strokeWidth={2.5} />
              Pass
            </span>
          </div>
        ))}
      </div>

      {/* Badge row */}
      <div className="flex gap-2 flex-wrap">
        {["SOC2", "GDPR", "CAN-SPAM", "TLS 1.3"].map((b) => (
          <span
            key={b}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-300/40 bg-indigo-500/10 text-indigo-400"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

const mockupMap: Record<string, React.FC> = {
  ai: AIMockup,
  analytics: AnalyticsMockup,
  security: SecurityMockup,
};

export function FeatureSpotlight() {
  return (
    <section className="py-20 lg:py-28 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            Deep dives
          </span>
          <h2
            className="font-black leading-tight tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.025em" }}
          >
            Three pillars that make
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, hsl(199 89% 52%), hsl(292 84% 65%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EmaReach different.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Go deeper on the features that move the needle.
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {spotlights.map((item, i) => {
            const MockupComponent = mockupMap[item.mockup];
            return (
              <div
                key={i}
                className={`flex flex-col gap-10 lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } lg:items-center`}
              >
                {/* Text side */}
                <div className="flex-1 max-w-[520px]">
                  <span
                    className="inline-block text-xs font-black uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
                    style={{
                      color: item.accentColor,
                      borderColor: `${item.accentColor}40`,
                      background: `${item.accentColor}10`,
                    }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="font-black leading-[1.1] tracking-tight text-foreground mb-5"
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 40px)",
                      letterSpacing: "-0.025em",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-7">
                    {item.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {item.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${item.accentColor}20`,
                          }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: item.accentColor }}
                            strokeWidth={2.5}
                          />
                        </span>
                        <span className="text-foreground font-medium leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  {item.href && (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200"
                      style={{ color: item.accentColor }}
                    >
                      Explore {item.tag.split(" · ")[1]} features
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                {/* Visual side */}
                <div className="flex-1 relative">
                  {/* Glow behind mockup */}
                  <div
                    className="absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none -z-10"
                    style={{
                      background: `radial-gradient(ellipse at center, ${item.accentColor}, transparent 70%)`,
                      transform: "scale(0.9) translateY(10px)",
                    }}
                  />
                  <div
                    className="rounded-2xl border overflow-hidden"
                    style={{
                      borderColor: `${item.accentColor}30`,
                      background: "hsl(var(--background))",
                      boxShadow: `0 20px 60px -10px ${item.accentColor}25, 0 0 0 1px ${item.accentColor}15`,
                    }}
                  >
                    <div
                      className="h-1.5 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.accentColor}, transparent)`,
                      }}
                    />
                    <div className="p-5" style={{ minHeight: "260px" }}>
                      <MockupComponent />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
