import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain")?.trim().toLowerCase();
  if (!domain) return NextResponse.json({ error: "domain is required" }, { status: 400 });

  const normalized = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
  const clean = normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;

  if (!clean || clean.includes(" ") || clean.startsWith(".") || clean.endsWith(".")) {
    return NextResponse.json({ domain: clean, found: false, record: null, issues: ["Invalid domain or email"] }, { status: 400 });
  }

  try {
    const txtRecords = await dns.resolveTxt(clean);
    const spfRecords = txtRecords
      .map((r) => r.join(""))
      .filter((r) => r.startsWith("v=spf1"));

    if (spfRecords.length === 0) {
      return NextResponse.json({ domain: clean, found: false, record: null, issues: ["No SPF record found"] });
    }

    const record = spfRecords[0];
    const issues: string[] = [];

    if (spfRecords.length > 1) issues.push("Multiple SPF records detected — only one is allowed");
    if (record.includes("+all")) issues.push('"~all" or "-all" recommended instead of "+all"');
    if (!record.includes("~all") && !record.includes("-all") && !record.includes("?all") && !record.includes("+all")) {
      issues.push("No 'all' mechanism found — add ~all or -all at the end");
    }

    const mechanisms = record.split(" ").filter((p) => p !== "v=spf1");
    const lookupCount = mechanisms.filter((m) => /^(include:|a:|mx:|exists:|redirect=)/i.test(m)).length;
    if (lookupCount > 10) issues.push(`SPF lookup count is ~${lookupCount} (max allowed is 10)`);

    return NextResponse.json({ domain: clean, found: true, record, issues, lookupCount });
  } catch {
    return NextResponse.json({ domain: clean, found: false, record: null, issues: ["DNS lookup failed"] });
  }
}
