"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { Key, ArrowRight, Loader2, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface Result {
  domain: string;
  selector: string;
  host: string;
  found: boolean;
  record: string | null;
  issues: string[];
}

export default function DkimCheckerPage() {
  const [domain, setDomain] = useState("");
  const [selector, setSelector] = useState("default");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const commonSelectors = ["default", "google", "mail", "k1", "s1", "s2", "selector1", "selector2", "mimecast", "sendgrid"];

  const normalizeDomainInput = (value: string) => {
    const normalized = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;
  };

  const handleCheck = async () => {
    const d = normalizeDomainInput(domain);
    const s = selector.trim() || "default";
    if (!d) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tools/dkim-checker?domain=${encodeURIComponent(d)}&selector=${encodeURIComponent(s)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ domain: d, selector: s, host: `${s}._domainkey.${d}`, found: false, record: null, issues: ["Request failed — please try again"] });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setDomain(""); setSelector("default"); setResult(null); };

  const truncate = (s: string, max = 80) => s.length > max ? s.slice(0, max) + "..." : s;

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">DKIM Record Checker</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">DKIM Record Checker</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Query the DKIM public key for a domain and selector to validate your signing configuration is live and properly set up.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-1.5">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="yourdomain.com or name@yourdomain.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-1.5">DKIM Selector</label>
              <input
                type="text"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="default"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Common Selectors</p>
            <div className="flex flex-wrap gap-1.5">
              {commonSelectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelector(s)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                    selector === s
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCheck}
              disabled={!domain.trim() || loading}
              className="flex-1 py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : "Check DKIM Record"}
            </button>
            {result && (
              <button onClick={handleReset} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>

          {result && (
            <div className="space-y-4 pt-2">
              {!result.found ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">DKIM record not found</p>
                      <p className="text-[13px] text-muted-foreground mt-1">
                        No record found at <code className="font-mono text-foreground">{result.host}</code>
                      </p>
                      <p className="text-[13px] text-muted-foreground mt-2">
                        Try a different selector — check your email provider&apos;s setup guide for the correct selector name.
                      </p>
                    </div>
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
                        ? "DKIM record found and valid"
                        : `DKIM record found — ${result.issues.length} issue${result.issues.length > 1 ? "s" : ""} detected`}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Hostname Queried</p>
                      <code className="font-mono text-[12px] text-foreground">{result.host}</code>
                    </div>
                    {result.record && (
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1 mt-3">Record Value</p>
                        <code className="block font-mono text-[11px] text-foreground break-all leading-relaxed">{truncate(result.record, 200)}</code>
                      </div>
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
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">What is a DKIM selector?</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  A DKIM selector is a label used to look up the correct public key. It&apos;s specified in every outgoing email as <code className="font-mono bg-muted px-1 rounded text-foreground text-[11px]">s=selectorname</code> in the DKIM-Signature header. Your email provider tells you which selector to use during setup.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ToolsBottomCta description="EmaReach sets up DKIM for every sending domain automatically — no DNS expertise needed." />
    </div>
  );
}
