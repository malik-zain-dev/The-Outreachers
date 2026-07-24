import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

const COMMON_SELECTORS = ["default", "google", "mail", "k1", "s1", "s2", "selector1", "selector2", "mimecast", "sendgrid"];

async function resolveDkimRecord(host: string): Promise<string | null> {
  try {
    const txtRecords = await dns.resolveTxt(host);
    const txtValue = txtRecords.map((r) => r.join("")).join("");
    if (txtValue) return txtValue;
  } catch {
    // fallback to CNAME flow below
  }

  try {
    const cnameTargets = await dns.resolveCname(host);
    for (const cnameHost of cnameTargets) {
      try {
        const txtRecords = await dns.resolveTxt(cnameHost);
        const txtValue = txtRecords.map((r) => r.join("")).join("");
        if (txtValue) return txtValue;
      } catch {
        // keep trying other cname targets
      }
    }
  } catch {
    // no cname target
  }

  return null;
}

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain")?.trim().toLowerCase();
  const selector = req.nextUrl.searchParams.get("selector")?.trim() || "default";
  if (!domain) return NextResponse.json({ error: "domain is required" }, { status: 400 });

  const normalized = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
  const clean = normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;
  if (!clean || clean.includes(" ") || clean.startsWith(".") || clean.endsWith(".")) {
    return NextResponse.json({ error: "invalid domain" }, { status: 400 });
  }

  const dkimHost = `${selector}._domainkey.${clean}`;
  const selectorsToTry = [selector, ...COMMON_SELECTORS.filter((s) => s !== selector)];

  for (const candidateSelector of selectorsToTry) {
    const candidateHost = `${candidateSelector}._domainkey.${clean}`;
    const record = await resolveDkimRecord(candidateHost);
    if (!record) continue;

    const issues: string[] = [];
    if (!record.includes("v=DKIM1")) issues.push("Missing v=DKIM1 tag");
    if (!record.includes("p=")) issues.push("Missing public key (p= tag)");
    if (record.includes("p=;") || record.includes("p= ;")) issues.push("Public key is revoked (empty p= value)");
    if (candidateSelector !== selector) {
      issues.unshift(`No record found for selector "${selector}". Auto-detected "${candidateSelector}" instead.`);
    }

    return NextResponse.json({
      domain: clean,
      selector: candidateSelector,
      host: candidateHost,
      found: true,
      record,
      issues,
    });
  }

  return NextResponse.json({
    domain: clean,
    selector,
    host: dkimHost,
    found: false,
    record: null,
    issues: [`No DKIM record found at ${dkimHost}`],
  });
}
