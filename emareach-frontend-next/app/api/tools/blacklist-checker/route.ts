import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

const DOMAIN_BLACKLISTS = [
  { name: "Spamhaus DBL", host: "dbl.spamhaus.org" },
  { name: "SURBL multi", host: "multi.surbl.org" },
  { name: "URIBL", host: "multi.uribl.com" },
  { name: "Spamhaus ZEN (domain)", host: "zen.spamhaus.org" },
];

const IP_BLACKLISTS = [
  { name: "Spamhaus ZEN", host: "zen.spamhaus.org" },
  { name: "Barracuda", host: "b.barracudacentral.org" },
  { name: "SpamCop", host: "bl.spamcop.net" },
  { name: "SORBS SPAM", host: "spam.dnsbl.sorbs.net" },
  { name: "CBL / Abuseat", host: "cbl.abuseat.org" },
  { name: "NIXSPAM", host: "ix.dnsbl.manitu.net" },
];

function reverseIp(ip: string) {
  return ip.split(".").reverse().join(".");
}

function isIp(value: string) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
}

async function checkOne(query: string, blacklistHost: string): Promise<boolean> {
  try {
    await dns.resolve4(query + "." + blacklistHost);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("target")?.trim().toLowerCase();
  if (!target) return NextResponse.json({ error: "target is required" }, { status: 400 });

  const normalized = target.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
  const clean = normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;
  if (!clean || clean.includes(" ") || clean.startsWith(".") || clean.endsWith(".")) {
    return NextResponse.json({ error: "invalid target" }, { status: 400 });
  }

  const targetIsIp = isIp(clean);
  const lists = targetIsIp ? IP_BLACKLISTS : DOMAIN_BLACKLISTS;
  const lookup = targetIsIp ? reverseIp(clean) : clean;

  const results = await Promise.all(
    lists.map(async (bl) => {
      const listed = await checkOne(lookup, bl.host);
      return { name: bl.name, listed };
    })
  );

  const listedCount = results.filter((r) => r.listed).length;
  return NextResponse.json({ target: clean, isIp: targetIsIp, results, listedCount, clean: listedCount === 0 });
}
