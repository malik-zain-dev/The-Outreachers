import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Clock, Search, Tag, X } from "lucide-react";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JsonLd } from "@/components/seo/JsonLd";
import { RESOURCE_CATEGORIES } from "@/lib/resources-data";
import {
  RESOURCES_PER_PAGE,
  filterResourcesSummaries,
  paginateResourcesSummaries,
} from "@/lib/resources-summary";
import { SITE_URL, SITE_NAME, getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/seo";
import { getPaginationItems } from "@/lib/pagination";

const PAGE_TITLE = "Resources | Cold Email Software Guides & Buyer's Guides | EmaReach";
const PAGE_DESCRIPTION =
  "In-depth buyer's guides, software reviews, strategy playbooks, and market data on cold email software — written by the EmaReach team to help you choose and use the right tools.";
const CANONICAL = `${SITE_URL}/resources`;

const categoryAccent: Record<string, string> = {
  "buying-guides": "text-violet-600 dark:text-violet-400",
  reviews: "text-blue-600 dark:text-blue-400",
  strategy: "text-emerald-600 dark:text-emerald-400",
  templates: "text-orange-600 dark:text-orange-400",
  "market-data": "text-rose-600 dark:text-rose-400",
};

const categoryBg: Record<string, string> = {
  "buying-guides": "bg-violet-500/10",
  reviews: "bg-blue-500/10",
  strategy: "bg-emerald-500/10",
  templates: "bg-orange-500/10",
  "market-data": "bg-rose-500/10",
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${CANONICAL}#webpage`,
  url: CANONICAL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

function buildResourcesHref(options: {
  page?: number;
  category?: string;
  search?: string;
}): string {
  const query = new URLSearchParams();
  if (options.page && options.page > 1) query.set("page", String(options.page));
  if (options.category) query.set("category", options.category);
  if (options.search?.trim()) query.set("q", options.search.trim());
  const qs = query.toString();
  return `/resources${qs ? `?${qs}` : ""}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const categorySlug = params.category ?? "";
  const searchQuery = params.q?.trim() ?? "";
  const activeCategory = RESOURCE_CATEGORIES.find((c) => c.slug === categorySlug);

  let baseTitle = activeCategory
    ? `${activeCategory.label} Resources | EmaReach`
    : PAGE_TITLE;
  if (searchQuery) {
    baseTitle = `Search: "${searchQuery}" | EmaReach Resources`;
  }
  const title = currentPage > 1 ? `${baseTitle} – Page ${currentPage}` : baseTitle;

  let description = activeCategory
    ? `${activeCategory.label} guides, reviews, and playbooks on cold email software from EmaReach.`
    : PAGE_DESCRIPTION;
  if (searchQuery) {
    description = `Search results for "${searchQuery}" across cold email software guides and reviews.`;
  }
  if (currentPage > 1) {
    description = `Page ${currentPage} of EmaReach resources. ${description}`;
  }

  const query = new URLSearchParams();
  if (currentPage > 1) query.set("page", String(currentPage));
  if (categorySlug) query.set("category", categorySlug);
  if (searchQuery) query.set("q", searchQuery);
  const qs = query.toString();
  const canonical = `${CANONICAL}${qs ? `?${qs}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", siteName: SITE_NAME },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const requestedPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const categorySlug = params.category ?? "";
  const searchQuery = params.q?.trim() ?? "";
  const activeCategory = RESOURCE_CATEGORIES.find((c) => c.slug === categorySlug);

  const filtered = filterResourcesSummaries({
    category: categorySlug || undefined,
    search: searchQuery || undefined,
  });
  const { items: articles, total, totalPages, currentPage } = paginateResourcesSummaries(
    filtered,
    requestedPage,
    RESOURCES_PER_PAGE
  );

  const showingFrom = total === 0 ? 0 : (currentPage - 1) * RESOURCES_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * RESOURCES_PER_PAGE, total);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={[getOrganizationJsonLd(), getWebSiteJsonLd(), webPageJsonLd]} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-violet-500/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <BookMarked className="w-4 h-4" />
              <span>Resources</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
              Cold Email Software{" "}
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Guides & Reviews
              </span>
              {currentPage > 1 && (
                <span className="block text-2xl sm:text-3xl mt-2 text-muted-foreground font-semibold">
                  Page {currentPage}
                </span>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Buyer&apos;s guides, honest tool reviews, strategy playbooks, and market data — everything you need to pick the right cold email software and use it well.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEARCH + CATEGORY FILTER ── */}
      <section className="border-b border-border/60 bg-muted/20 backdrop-blur-sm sticky top-[120px] z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-3 py-3">
          <form
            action="/resources"
            method="get"
            className="flex flex-col sm:flex-row gap-2 sm:items-center"
          >
            {categorySlug ? <input type="hidden" name="category" value={categorySlug} /> : null}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search guides, reviews, and topics…"
                className="pl-9 pr-9 h-10 bg-background"
                aria-label="Search resources"
              />
              {searchQuery ? (
                <Link
                  href={buildResourcesHref({ category: categorySlug || undefined })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </Link>
              ) : null}
            </div>
            <Button type="submit" variant="secondary" className="shrink-0 min-h-10">
              Search
            </Button>
          </form>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Link
              href={buildResourcesHref({ search: searchQuery || undefined })}
              className={`flex-shrink-0 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                categorySlug === ""
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </Link>
            {RESOURCE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={buildResourcesHref({
                  category: cat.slug,
                  search: searchQuery || undefined,
                })}
                className={`flex-shrink-0 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  categorySlug === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {total > 0 && (
            <p className="text-sm text-muted-foreground mb-6">
              Showing {showingFrom}–{showingTo} of {total} resource{total === 1 ? "" : "s"}
              {activeCategory ? ` in ${activeCategory.label}` : ""}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </p>
          )}

          {articles.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20 rounded-2xl border border-border bg-muted/30">
              <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No resources found for "${searchQuery}".`
                  : activeCategory
                    ? `No resources in "${activeCategory.label}" yet.`
                    : "No resources yet. Check back soon."}
              </p>
              {(searchQuery || activeCategory) && (
                <Link
                  href="/resources"
                  className="inline-block text-sm font-medium text-primary hover:underline"
                >
                  View all resources
                </Link>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => {
                const catLabel =
                  RESOURCE_CATEGORIES.find((c) => c.slug === article.category)?.label ??
                  article.category;
                return (
                  <Link
                    key={article.slug}
                    href={`/resources/${article.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary to-violet-500 transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

                    <div className="flex flex-col flex-1 p-6 gap-4">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            categoryBg[article.category] ?? "bg-muted"
                          } ${categoryAccent[article.category] ?? "text-foreground"}`}
                        >
                          <Tag className="w-3 h-3" />
                          {catLabel}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readingTimeMinutes} min read
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-3">
                        {article.title}
                      </h2>

                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>

                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all mt-auto pt-2 border-t border-border/50">
                        Read guide
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {articles.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 flex-wrap">
              {currentPage > 1 ? (
                <Link
                  href={buildResourcesHref({
                    page: currentPage - 1,
                    category: categorySlug || undefined,
                    search: searchQuery || undefined,
                  })}
                >
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
              )}

              {getPaginationItems(currentPage, totalPages).map((item, idx) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="h-9 min-w-9 inline-flex items-center justify-center px-1 text-muted-foreground"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={buildResourcesHref({
                      page: item === 1 ? undefined : item,
                      category: categorySlug || undefined,
                      search: searchQuery || undefined,
                    })}
                    className={`h-9 min-w-9 px-3 rounded-md border text-sm font-medium transition-colors inline-flex items-center justify-center ${
                      item === currentPage
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {item}
                  </Link>
                )
              )}

              {currentPage < totalPages ? (
                <Link
                  href={buildResourcesHref({
                    page: currentPage + 1,
                    category: categorySlug || undefined,
                    search: searchQuery || undefined,
                  })}
                >
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="py-16 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Ready to put it into practice?
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Stop reading. Start sending.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            EmaReach gives you the inbox warm-up, AI personalization, and deliverability tools you just read about — on a free trial, no credit card required.
          </p>
          <MarketingCtaButtons
            trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
          />
        </div>
      </section>
    </div>
  );
}
