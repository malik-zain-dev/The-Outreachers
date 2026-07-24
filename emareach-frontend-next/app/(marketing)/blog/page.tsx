import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import { Button } from "@/components/ui/button";
import { fetchBlogs } from "@/lib/server-api";
import { getPaginationItems } from "@/lib/pagination";
import { SITE_URL } from "@/lib/seo";
import type { Blog } from "@/types/api";

const BLOG_CATEGORIES = [
  {
    slug: "cold-email",
    label: "Cold email",
    heading: "Cold email strategy & playbooks",
    description:
      "Cold email strategies, templates, and outreach playbooks to book more meetings and land replies — from the EmaReach team.",
  },
  {
    slug: "deliverability",
    label: "Deliverability",
    heading: "Email deliverability guides",
    description:
      "Email deliverability guides on inbox placement, DNS setup, warm-up, and avoiding spam filters so your cold emails actually get read.",
  },
  {
    slug: "automation",
    label: "Automation",
    heading: "Outreach automation insights",
    description:
      "Outreach automation tips on follow-up sequences, workflows, and scaling cold email without losing the personal touch.",
  },
  {
    slug: "product-updates",
    label: "Product updates",
    heading: "EmaReach product updates",
    description:
      "The latest EmaReach product updates, new features, and improvements for cold email, deliverability, and inbox management.",
  },
  {
    slug: "tutorials",
    label: "Tutorials",
    heading: "Cold email tutorials & how-tos",
    description:
      "Step-by-step EmaReach tutorials and how-to guides for setting up campaigns, domains, inboxes, and cold email automation.",
  },
] as const;

const DEFAULT_HEADING = "Cold email & outreach insights";
const DEFAULT_DESCRIPTION =
  "Guides and updates on cold email, deliverability, and inbox placement. The cold email platform built to land emails in the inbox.";

const BLOGS_PER_PAGE = 10;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const categorySlug = params.category ?? "";
  const activeCategory = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);

  const topic = activeCategory ? activeCategory.label : "Cold email";
  const baseTitle = activeCategory
    ? `${activeCategory.label} Articles | EmaReach Blog`
    : "Blog | EmaReach – Cold Email That Lands in the Inbox";
  const title = currentPage > 1 ? `${baseTitle} – Page ${currentPage}` : baseTitle;

  const baseDescription = activeCategory
    ? activeCategory.description
    : DEFAULT_DESCRIPTION;
  const description =
    currentPage > 1
      ? `Page ${currentPage} of ${topic.toLowerCase()} articles, guides, and updates from the EmaReach blog.`
      : baseDescription;

  // Self-referencing canonical so each category/page is its own indexable URL.
  const query = new URLSearchParams();
  if (currentPage > 1) query.set("page", String(currentPage));
  if (categorySlug) query.set("category", categorySlug);
  const qs = query.toString();
  const canonical = `${SITE_URL}/blog${qs ? `?${qs}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const categorySlug = params.category ?? "";
  const activeCategory = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);
  const tagFilter = activeCategory ? activeCategory.label : null;

  const { blogs: rawBlogs, total } = await fetchBlogs(
    currentPage,
    BLOGS_PER_PAGE,
    tagFilter ?? undefined
  );
  const blogs = (rawBlogs ?? []) as unknown as Blog[];
  const totalCount = total ?? blogs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / BLOGS_PER_PAGE));

  const heading = activeCategory ? activeCategory.heading : DEFAULT_HEADING;
  const headingSuffix = currentPage > 1 ? ` – Page ${currentPage}` : "";
  const intro = activeCategory
    ? activeCategory.description
    : "Tips, deliverability guides, and automation trends from the EmaReach team.";

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {heading}
              {headingSuffix}
            </h1>
            <p className="text-lg text-muted-foreground">
              {intro}
            </p>
          </div>

          {blogs.length === 0 && (
            <div className="max-w-md mx-auto text-center py-16 rounded-xl border border-border bg-muted/30">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {tagFilter ? `No posts in "${tagFilter}". Try another category or view all.` : "No posts yet. Check back soon."}
              </p>
              {tagFilter && (
                <Link href="/blog" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                  View all posts
                </Link>
              )}
            </div>
          )}
          {blogs.length > 0 && (
            <div className="grid lg:grid-cols-[1fr_280px] gap-10 max-w-7xl mx-auto items-start">
              <div className="min-w-0">
                <div className="lg:hidden flex flex-wrap gap-2 mb-6">
                  <Link
                    href="/blog"
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      categorySlug === "" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    All
                  </Link>
                  {BLOG_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/blog?category=${encodeURIComponent(cat.slug)}`}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        categorySlug === cat.slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 min-w-0">
                  {blogs.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      {post.featured_image_url ? (
                        <div className="aspect-video overflow-hidden bg-muted">
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="p-5 lg:p-6">
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="hidden lg:block sticky top-28 space-y-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Categories</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/blog"
                        className={categorySlug === "" ? "text-primary font-medium" : "text-foreground hover:text-primary transition-colors"}
                      >
                        All
                      </Link>
                    </li>
                    {BLOG_CATEGORIES.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/blog?category=${encodeURIComponent(cat.slug)}`}
                          className={categorySlug === cat.slug ? "text-primary font-medium" : "text-foreground hover:text-primary transition-colors"}
                        >
                          {cat.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <p className="font-semibold text-sm mb-2">Ready to scale outreach?</p>
                  <p className="text-xs text-muted-foreground mb-4">Get the platform that lands in the inbox.</p>
                  <MarketingCtaButtons
                    layout="stack"
                    size="sm"
                    trackLabels={{ primary: "book_demo", secondary: "blog_start_trial" }}
                    className="w-full [&_a]:w-full"
                  />
                </div>
              </aside>
            </div>
          )}

          {blogs.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 flex-wrap">
              {currentPage > 1 ? (
                <Link href={currentPage === 2 ? (categorySlug ? `/blog?category=${encodeURIComponent(categorySlug)}` : "/blog") : `/blog?page=${currentPage - 1}${categorySlug ? `&category=${encodeURIComponent(categorySlug)}` : ""}`}>
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
                    href={
                      item === 1
                        ? categorySlug ? `/blog?category=${encodeURIComponent(categorySlug)}` : "/blog"
                        : `/blog?page=${item}${categorySlug ? `&category=${encodeURIComponent(categorySlug)}` : ""}`
                    }
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
                <Link href={`/blog?page=${currentPage + 1}${categorySlug ? `&category=${encodeURIComponent(categorySlug)}` : ""}`}>
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

          <div className="max-w-3xl mx-auto mt-20 text-center">
            <p className="text-muted-foreground mb-4">
              Ready to scale your outreach?
            </p>
            <MarketingCtaButtons
              trackLabels={{ primary: "book_demo", secondary: "blog_start_trial" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
