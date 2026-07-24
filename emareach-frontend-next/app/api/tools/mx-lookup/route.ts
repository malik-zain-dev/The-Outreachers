import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain")?.trim().toLowerCase();
  if (!domain) return NextResponse.json({ error: "domain is required" }, { status: 400 });

  const normalized = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
  const clean = normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;

  // Lightweight safety checks so malformed inputs fail fast with useful feedback.
  if (!clean || clean.includes(" ") || clean.startsWith(".") || clean.endsWith(".")) {
    return NextResponse.json({ domain: clean, records: [], error: "Invalid domain or email" }, { status: 400 });
  }

  try {
    const records = await dns.resolveMx(clean);
    records.sort((a, b) => a.priority - b.priority);
    return NextResponse.json({ domain: clean, records });
  } catch {
    return NextResponse.json({ domain: clean, records: [], error: "No MX records found" });
  }
}
