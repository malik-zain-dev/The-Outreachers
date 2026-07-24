/**
 * Generates lib/resources-summary.ts from lib/resources-data.ts.
 * Run: npm run generate:resources-summary
 *
 * Keeps listing pages lightweight by excluding article bodies, FAQs, and related slugs.
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resourcesData, type ResourceArticle } from "../lib/resources-data";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "../lib/resources-summary.ts");

export type ResourceSummary = Pick<
  ResourceArticle,
  | "slug"
  | "title"
  | "metaDescription"
  | "keywords"
  | "category"
  | "tags"
  | "publishedAt"
  | "updatedAt"
  | "readingTimeMinutes"
  | "excerpt"
  | "heroLabel"
>;

function toSummary(article: ResourceArticle): ResourceSummary {
  return {
    slug: article.slug,
    title: article.title,
    metaDescription: article.metaDescription,
    keywords: article.keywords,
    category: article.category,
    tags: article.tags.filter(Boolean),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readingTimeMinutes: article.readingTimeMinutes,
    excerpt: article.excerpt,
    heroLabel: article.heroLabel,
  };
}

const summaries = resourcesData.map(toSummary);

const fileContents = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Regenerate with: npm run generate:resources-summary
 *
 * Lightweight listing data for /resources (no article bodies).
 */

import type { ResourceArticle } from "./resources-data";

export type ResourceSummary = Pick<
  ResourceArticle,
  | "slug"
  | "title"
  | "metaDescription"
  | "keywords"
  | "category"
  | "tags"
  | "publishedAt"
  | "updatedAt"
  | "readingTimeMinutes"
  | "excerpt"
  | "heroLabel"
>;

export const resourcesSummary: ResourceSummary[] = ${JSON.stringify(summaries, null, 2)};

export const RESOURCES_PER_PAGE = 12;

export function normalizeResourceSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function filterResourcesSummaries(options: {
  category?: string;
  search?: string;
}): ResourceSummary[] {
  const category = options.category?.trim() ?? "";
  const search = normalizeResourceSearchQuery(options.search ?? "");

  return resourcesSummary.filter((article) => {
    if (category && article.category !== category) return false;
    if (!search) return true;

    const haystack = [
      article.title,
      article.excerpt,
      article.metaDescription,
      article.keywords,
      article.heroLabel,
      ...article.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
}

export function paginateResourcesSummaries<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    total,
    totalPages,
    currentPage: safePage,
  };
}
`;

writeFileSync(outputPath, fileContents, "utf8");
console.log(`Wrote ${summaries.length} resource summaries to ${outputPath}`);
