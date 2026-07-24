"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { Globe, ArrowRight, Loader2, CheckCircle2, XCircle, RefreshCw, Server } from "lucide-react";

interface MxRecord { priority: number; exchange: string; }
interface Result { domain: string; records: MxRecord[]; error?: string; }

export default function MxLookupPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const normalizeDomainInput = (value: string) => {
    const normalized = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;
  };

  const handleLookup = async () => {
    const d = normalizeDomainInput(domain);
    if (!d) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tools/mx-lookup?domain=${encodeURIComponent(d)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ domain: d, records: [], error: "Request failed — please try again" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLookup();
  };

  const handleReset = () => { setDomain(""); setResult(null); };

  const knownProviders: Record<string, string> = {
    "google.com": "Google Workspace",
    "googlemail.com": "Google Workspace",
    "aspmx.l.google.com": "Google Workspace",
    "gmail.com": "Gmail",
    "outlook.com": "Microsoft 365",
    "hotmail.com": "Microsoft 365",
    "protection.outlook.com": "Microsoft 365",
    "mail.protection.outlook.com": "Microsoft 365",
    "sendgrid.net": "SendGrid",
    "mailgun.org": "Mailgun",
    "amazonses.com": "Amazon SES",
    "pphosted.com": "Proofpoint",
    "mimecast.com": "Mimecast",
    "messagelabs.com": "Symantec",
    "barracudanetworks.com": "Barracuda",
  };

  const detectProvider = (records: MxRecord[]) => {
    for (const r of records) {
      for (const [key, provider] of Object.entries(knownProviders)) {
        if (r.exchange.includes(key)) return provider;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">MX Record Lookup</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">MX Record Lookup</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Instantly query the Mail Exchange (MX) records for any domain. Verify email routing, check priority, and identify the email provider.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-1.5">Domain Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. gmail.com or name@gmail.com"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {result && (
                <button onClick={handleReset} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <button
            onClick={handleLookup}
            disabled={!domain.trim() || loading}
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:brightness-100 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Looking up...</> : "Lookup MX Records"}
          </button>

          {result && (
            <div className="space-y-4 pt-2">
              {result.error || result.records.length === 0 ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-semibold text-foreground">No MX records found</p>
                    <p className="text-[13px] text-muted-foreground mt-1">
                      {result.error || `The domain "${result.domain}" has no MX records — it cannot receive email.`}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground">
                        {result.records.length} MX record{result.records.length > 1 ? "s" : ""} found for{" "}
                        <span className="text-primary font-mono">{result.domain}</span>
                      </p>
                      {detectProvider(result.records) && (
                        <p className="text-[12px] text-muted-foreground mt-0.5">
                          Provider detected: <span className="font-semibold text-foreground">{detectProvider(result.records)}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-12 px-4 py-2.5 bg-muted/50 border-b border-border/60">
                      <span className="col-span-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Priority</span>
                      <span className="col-span-10 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Mail Server</span>
                    </div>
                    {result.records.map((r, i) => (
                      <div key={i} className={`grid grid-cols-12 px-4 py-3 ${i < result.records.length - 1 ? "border-b border-border/60" : ""}`}>
                        <span className="col-span-2 font-mono text-[13px] text-muted-foreground">{r.priority}</span>
                        <div className="col-span-10 flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span className="font-mono text-[13px] text-foreground break-all">{r.exchange}</span>
                          {r.priority === Math.min(...result.records.map((x) => x.priority)) && (
                            <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex-shrink-0">Primary</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">How to read this</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      MX records with <strong className="text-foreground">lower priority numbers</strong> receive email first. If the primary server is unavailable, the next record in priority order is tried. Having multiple MX records provides redundancy.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <ToolsBottomCta description="EmaReach auto-validates MX records for every inbox you connect — no manual lookups needed." />
    </div>
  );
}
