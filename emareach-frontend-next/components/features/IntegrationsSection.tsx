import { ArrowRight } from "lucide-react";
import Link from "next/link";

const integrations = [
  {
    name: "Gmail",
    desc: "Connect via OAuth. No app passwords or IMAP setup needed.",
    color: "from-red-400 to-orange-500",
    letter: "G",
    badge: "Most used",
  },
  {
    name: "Google Workspace",
    desc: "Full org sync. Multiple accounts. Domain-level warm-up.",
    color: "from-blue-400 to-indigo-500",
    letter: "GW",
  },
  {
    name: "CSV Import",
    desc: "Drag-and-drop. Auto-map columns. Deduplication on upload.",
    color: "from-emerald-400 to-teal-600",
    letter: "CSV",
  },
  {
    name: "HubSpot",
    desc: "Bi-directional CRM sync. Push replies and status updates back.",
    color: "from-orange-400 to-amber-600",
    letter: "H",
  },
  {
    name: "Salesforce",
    desc: "Sync contacts and log activity. Deal stages auto-updated.",
    color: "from-sky-400 to-blue-600",
    letter: "SF",
  },
  {
    name: "Webhooks",
    desc: "Custom triggers on every event. Connect any tool in minutes.",
    color: "from-violet-400 to-purple-600",
    letter: "WH",
  },
  {
    name: "REST API",
    desc: "Full API access. Build any integration. Detailed docs included.",
    color: "from-slate-400 to-gray-600",
    letter: "API",
  },
  {
    name: "Zapier",
    desc: "1,000+ app connections without writing a single line of code.",
    color: "from-orange-500 to-red-600",
    letter: "Z",
    badge: "Coming soon",
  },
];

export function IntegrationsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            Integrations
          </span>
          <h2
            className="font-black leading-tight tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.025em" }}
          >
            Works with your stack.
            <br />
            <span className="text-muted-foreground font-medium">Zero friction setup.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Connect your inbox, import leads, sync your CRM — no code required for any of it.
          </p>
        </div>

        {/* Center hub visualization */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection lines background (decorative) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <div
              className="w-[300px] h-[300px] rounded-full border border-dashed border-primary/40"
              style={{ position: "absolute" }}
            />
            <div
              className="w-[180px] h-[180px] rounded-full border border-primary/30"
              style={{ position: "absolute" }}
            />
          </div>

          {/* Grid of integrations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {integrations.map((intg, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border bg-card p-5 flex flex-col items-start gap-3 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {intg.badge && (
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        intg.badge === "Most used"
                          ? "linear-gradient(135deg, hsl(199 89% 48%), hsl(217 91% 60%))"
                          : "hsl(var(--muted))",
                      color: intg.badge === "Most used" ? "white" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {intg.badge}
                  </span>
                )}

                {/* Logo area */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${intg.color} flex items-center justify-center shadow-md`}
                >
                  <span className="text-white font-black text-xs">{intg.letter}</span>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-[15px] mb-1">{intg.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{intg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            Need a custom integration?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
          >
            Talk to our team
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
