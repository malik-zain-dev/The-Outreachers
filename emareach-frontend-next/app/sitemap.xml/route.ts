/**
 * Serve sitemap XML: static pages + published blog posts from MongoDB.
 * No dependency on backend API.
 */

import { getAdminDb } from "@/lib/mongodb";
import { comparisonSlugs } from "@/lib/comparisons-data";
import { useCaseSlugs } from "@/lib/use-cases-data";
import { resourceSlugs } from "@/lib/resources-data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.emareach.com").replace(
  /\/$/,
  ""
);

const SITEMAP_STATIC: Array<[string, string, string]> = [
  ["/", "weekly", "1.0"],
  ["/why-us", "monthly", "0.8"],
  ["/features", "monthly", "0.9"],
  ["/use-cases", "weekly", "0.9"],
  ["/comparisons", "weekly", "0.9"],
  ["/how-it-works", "monthly", "0.9"],
  ["/testimonials", "monthly", "0.8"],
  ["/blog", "weekly", "0.9"],
  ["/resources", "weekly", "0.9"],
  ["/pricing", "weekly", "0.9"],
  ["/contact", "monthly", "0.8"],
  ["/login", "monthly", "0.6"],
  ["/signup", "monthly", "0.8"],
  ["/forgot-password", "yearly", "0.4"],
  ["/terms", "yearly", "0.5"],
  ["/privacy", "yearly", "0.5"],
  ["/refund", "yearly", "0.5"],
  ["/campaign-replies", "monthly", "0.6"],
  ["/cold-email-warmup-tool", "monthly", "0.8"],
  ["/instantly-alternative", "monthly", "0.8"],
  ["/cold-email-deliverability", "monthly", "0.8"],
  ["/email-marketing-tool", "monthly", "0.8"],
  ["/open-source-email-marketing-tool", "monthly", "0.8"],
  ["/free-email-autoresponder", "monthly", "0.8"],
  ["/business-email-marketing-software", "monthly", "0.8"],
  ["/email-blast-software", "monthly", "0.8"],
  ["/email-list-cleaner-tool", "monthly", "0.8"],
];

const SITEMAP_USE_CASES: Array<[string, string, string]> = useCaseSlugs.map((slug) => [
  `/use-cases/${slug}`,
  "weekly",
  "0.8",
]);

const SITEMAP_COMPARISONS: Array<[string, string, string]> = comparisonSlugs.map((slug) => [
  `/comparisons/${slug}`,
  "weekly",
  "0.8",
]);

const SITEMAP_RESOURCES: Array<[string, string, string]> = resourceSlugs.map((slug) => [
  `/resources/${slug}`,
  "monthly",
  "0.8",
]);

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function lastmod(d: Date | string | null | undefined): string {
  const today = new Date().toISOString().slice(0, 10);
  if (!d) return today;
  if (typeof d === "string") return d.slice(0, 10);
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return today;
}

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ];

  for (const [path, changefreq, priority] of [
    ...SITEMAP_STATIC,
    ...SITEMAP_USE_CASES,
    ...SITEMAP_COMPARISONS,
    ...SITEMAP_RESOURCES,
  ]) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${changefreq}</changefreq>`);
    lines.push(`    <priority>${priority}</priority>`);
    lines.push("  </url>");
  }

  try {
    const adminDb = getAdminDb();
    const cursor = adminDb
      .collection("blogs")
      .find({ status: "published" }, { projection: { slug: 1, published_at: 1 } })
      .sort({ published_at: -1 });

    for await (const blog of cursor) {
      const slug = blog.slug;
      if (!slug) continue;
      const loc = `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
      const lm = lastmod(blog.published_at);
      lines.push("  <url>");
      lines.push(`    <loc>${escapeXml(loc)}</loc>`);
      lines.push(`    <lastmod>${lm}</lastmod>`);
      lines.push("    <changefreq>monthly</changefreq>");
      lines.push("    <priority>0.8</priority>");
      lines.push("  </url>");
    }
  } catch (e) {
    console.error("[sitemap]", e);
    // Still return static entries
  }

  lines.push("</urlset>");
  const xml = lines.join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
