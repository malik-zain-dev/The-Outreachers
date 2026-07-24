import { Lock, ShieldCheck, MailMinus, FileCheck, Eye, Server, Check } from "lucide-react";

const items = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "AES-256 encryption at rest, TLS 1.3 in transit. We never store plaintext credentials or email content.",
    stat: "256-bit",
    statLabel: "key length",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Granular permissions per team member. Audit logs track every action so you always know who did what.",
    stat: "100%",
    statLabel: "audit coverage",
  },
  {
    icon: MailMinus,
    title: "Unsubscribe Built In",
    description:
      "One-click opt-out and automatic list suppression across all campaigns. CAN-SPAM compliant by default.",
    stat: "Auto",
    statLabel: "suppression",
  },
  {
    icon: FileCheck,
    title: "Consent & GDPR",
    description:
      "Consent tracking, DPA available on request, and data deletion APIs. Stay on the right side of every regulation.",
    stat: "GDPR",
    statLabel: "compliant",
  },
  {
    icon: Eye,
    title: "Deliverability Monitoring",
    description:
      "Real-time spam trap and blocklist monitoring. Get alerted before reputation issues hit your campaigns.",
    stat: "24/7",
    statLabel: "monitoring",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description:
      "Hosted on SOC2-certified infrastructure. Daily backups with point-in-time recovery and 99.9% SLA.",
    stat: "99.9%",
    statLabel: "uptime SLA",
  },
];

const TRUST_BADGES = [
  { label: "SOC2 Type II", color: "text-indigo-400 border-indigo-400/30 bg-indigo-500/10" },
  { label: "GDPR", color: "text-blue-400 border-blue-400/30 bg-blue-500/10" },
  { label: "CAN-SPAM", color: "text-sky-400 border-sky-400/30 bg-sky-500/10" },
  { label: "TLS 1.3", color: "text-violet-400 border-violet-400/30 bg-violet-500/10" },
  { label: "AES-256", color: "text-purple-400 border-purple-400/30 bg-purple-500/10" },
];

export function SecurityComplianceSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-500/20">
            Security & compliance
          </span>
          <h2
            className="font-black leading-tight tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.025em" }}
          >
            Enterprise-grade trust.
            <br />
            <span className="text-muted-foreground font-medium">Zero compromises.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your data, your recipients, and your reputation are protected from day one.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge.label}
              className={`flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-1.5 rounded-full border ${badge.color}`}
            >
              <Check className="w-3 h-3" strokeWidth={2.5} />
              {badge.label}
            </span>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient accent at top */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(90deg, hsl(239 84% 67%), hsl(270 76% 55%))",
                }}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-indigo-400">{item.stat}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{item.statLabel}</div>
                </div>
              </div>

              <h3 className="font-bold text-foreground text-[16px] mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
