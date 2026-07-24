import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","temp-mail.org","throwam.com","yopmail.com",
  "sharklasers.com","guerrillamailblock.com","grr.la","guerrillamail.info","spam4.me",
  "trashmail.com","dispostable.com","fakeinbox.com","mailnull.com","maildrop.cc",
]);

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

  const formatValid = EMAIL_REGEX.test(email);
  if (!formatValid) {
    return NextResponse.json({ email, formatValid: false, hasMx: false, isDisposable: false, verdict: "invalid" });
  }

  const domain = email.split("@")[1];
  const isDisposable = DISPOSABLE_DOMAINS.has(domain);

  let hasMx = false;
  try {
    const mx = await dns.resolveMx(domain);
    hasMx = mx.length > 0;
  } catch {
    hasMx = false;
  }

  const verdict = !hasMx ? "undeliverable" : isDisposable ? "disposable" : "valid";
  return NextResponse.json({ email, formatValid, hasMx, isDisposable, domain, verdict });
}
