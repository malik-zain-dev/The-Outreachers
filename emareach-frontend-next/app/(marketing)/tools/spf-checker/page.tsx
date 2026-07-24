"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { Shield, ArrowRight, Loader2, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface Result {
  domain: string;
  found: boolean;
  record: string | null;
  issues: string[];
  lookupCount?: number;
  error?: string;
}

export default function SpfCheckerPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const normalizeDomainInput = (value: string) => {
    const normalized = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;
  };

  const handleCheck = async () => {
    const d = normalizeDomainInput(domain);
    if (!d) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tools/spf-checker?domain=${encodeURIComponent(d)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ domain: d, found: false, record: null, issues: ["Request failed — please try again"] });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setDomain(""); setResult(null); };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">SPF Record Checker</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">SPF Record Checker</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Verify whether a domain has a valid SPF record, check its syntax, and identify authentication gaps that could hurt deliverability.
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
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="e.g. yourdomain.com or name@yourdomain.com"
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
            onClick={handleCheck}
            disabled={!domain.trim() || loading}
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : "Check SPF Record"}
          </button>

          {result && (
            <div className="space-y-4 pt-2">
              {!result.found ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">{result.error || result.issues[0] || "No SPF record found"}</p>
                      <p className="text-[13px] text-muted-foreground mt-1">
                        {result.issues[0] === "DNS lookup failed"
                          ? `Could not query DNS for ${result.domain}. Check domain spelling and try again.`
                          : `${result.domain} does not have an SPF record. Anyone can spoof email from this domain.`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-red-500/20">
                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Recommended Fix</p>
                    <code className="block font-mono text-[12px] bg-background/60 border border-border rounded-lg px-3 py-2 text-foreground break-all">
                      v=spf1 include:_spf.yourmailprovider.com ~all
                    </code>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`rounded-2xl border p-4 flex items-center gap-3 ${result.issues.length === 0 ? "border-emerald-500/20 bg-emerald-500/5" : "border-amber-500/20 bg-amber-500/5"}`}>
                    {result.issues.length === 0 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    )}
                    <p className="text-[13px] font-semibold text-foreground">
                      {result.issues.length === 0
                        ? `SPF record found and looks valid for ${result.domain}`
                        : `SPF record found for ${result.domain} — ${result.issues.length} issue${result.issues.length > 1 ? "s" : ""} detected`}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">SPF Record</p>
                    <code className="block font-mono text-[12px] text-foreground break-all leading-relaxed">{result.record}</code>
                    {result.lookupCount !== undefined && (
                      <p className={`text-[12px] mt-2 ${result.lookupCount > 10 ? "text-red-500" : result.lookupCount > 7 ? "text-amber-500" : "text-muted-foreground"}`}>
                        DNS lookups: {result.lookupCount}/10{result.lookupCount > 10 ? " — exceeds limit!" : result.lookupCount > 7 ? " — approaching limit" : ""}
                      </p>
                    )}
                  </div>

                  {result.issues.length > 0 && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <p className="text-[12px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">Issues</p>
                      <ul className="space-y-2">
                        {result.issues.map((issue) => (
                          <li key={issue} className="flex items-start gap-2 text-[13px] text-foreground">
                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">SPF Qualifier Guide</p>
                <div className="space-y-2">
                  {[
                    { q: "+all", desc: "Accepts mail from all servers — dangerous, do not use" },
                    { q: "~all", desc: "Soft fail — mail from unlisted servers is marked but accepted" },
                    { q: "-all", desc: "Hard fail — mail from unlisted servers is rejected (strictest)" },
                    { q: "?all", desc: "Neutral — no policy, treated as neither pass nor fail" },
                  ].map((item) => (
                    <div key={item.q} className="flex items-start gap-3">
                      <code className="text-[12px] font-mono bg-muted px-1.5 py-0.5 rounded text-foreground flex-shrink-0">{item.q}</code>
                      <span className="text-[12px] text-muted-foreground">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ToolsBottomCta description="EmaReach automatically configures SPF, DKIM, and DMARC for every domain you add." />
    </div>
  );
}
