import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  ChevronRight,
  Clock,
  Tag,
} from "lucide-react";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import { Button } from "@/components/ui/button";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { JsonLd } from "@/components/seo/JsonLd";
import { isBotRequest } from "@/lib/is-bot-request";
import {
  getResourceBySlug,
  resourceSlugs,
  resourcesData,
  RESOURCE_CATEGORIES,
} from "@/lib/resources-data";
import { SITE_URL, SITE_NAME, LOGO_URL, SITE_NAME_FULL } from "@/lib/seo";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resourceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceBySlug(slug);
  if (!article) return { title: "Resource Not Found | EmaReach" };

  const url = `${SITE_URL}/resources/${slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [SITE_NAME],
      siteName: SITE_NAME_FULL,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

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

export default async function ResourceSlugPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const article = getResourceBySlug(slug);
  if (!article) notFound();

  const isBot = await isBotRequest();
  const url = `${SITE_URL}/resources/${slug}`;
  const catLabel =
    RESOURCE_CATEGORIES.find((c) => c.slug === article.category)?.label ?? article.category;

  const related = article.relatedSlugs
    .map((s) => resourcesData.find((r) => r.slug === s))
    .filter(Boolean);

  /* ── JSON-LD schemas ── */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    inLanguage: "en-US",
    articleSection: catLabel,
    about: article.tags.join(", "),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <article className="min-h-screen bg-background">
      <JsonLd data={[articleJsonLd, faqJsonLd, breadcrumbJsonLd]} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-10 pb-20 lg:pt-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-medium line-clamp-1">{article.title}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                categoryBg[article.category] ?? "bg-muted"
              } ${categoryAccent[article.category] ?? "text-foreground"}`}
            >
              <Tag className="w-3 h-3" />
              {catLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} min read
            </span>
            <time
              dateTime={article.updatedAt}
              className="text-xs text-muted-foreground"
            >
              Updated{" "}
              {new Date(article.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

        {/* Article Body */}
        <div className="blog-prose prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-a:text-primary prose-img:rounded-lg prose-ol:list-decimal prose-ol:pl-6 prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 prose-strong:font-semibold prose-strong:text-foreground prose-p:leading-relaxed prose-code:text-foreground prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none text-foreground max-w-none prose-table:w-full prose-th:text-left prose-th:font-semibold prose-td:text-muted-foreground">
          <BlogMarkdown isBot={isBot}>{article.content}</BlogMarkdown>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-12 mb-12" />

        {/* FAQ Section */}
        {article.faqs.length > 0 && (
          <section aria-label="Frequently Asked Questions">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <BookMarked className="w-3.5 h-3.5" />
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {article.faqs.map((faq, i) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-card overflow-hidden"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 font-semibold text-foreground hover:bg-muted/30 transition-colors duration-150 list-none">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-open:rotate-90 transition-transform duration-200" />
                  </summary>
                  <div className="px-5 pb-5 pt-1 border-t border-border/50">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-12 mb-10" />
            <section aria-label="Related resources">
              <h2 className="text-xl font-bold mb-6">Related Guides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rel) => {
                  if (!rel) return null;
                  return (
                    <Link
                      key={rel.slug}
                      href={`/resources/${rel.slug}`}
                      className="group flex flex-col gap-2 p-5 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all duration-200"
                    >
                      <span
                        className={`text-xs font-semibold ${
                          categoryAccent[rel.category] ?? "text-primary"
                        }`}
                      >
                        {RESOURCE_CATEGORIES.find((c) => c.slug === rel.category)?.label ??
                          rel.category}
                      </span>
                      <span className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {rel.title}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-auto">
                        Read guide
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-violet-500/5 to-transparent p-8 text-center relative overflow-hidden">
          <div className="absolute -top-px left-8 right-8 h-0.5 gradient-primary rounded-full" />
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Put it into practice
          </p>
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            Ready to send cold emails that actually land?
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
            EmaReach includes inbox warm-up, AI personalization, and deliverability tools — free trial, no credit card needed.
          </p>
          <MarketingCtaButtons
            trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
          />
        </div>
      </div>
    </article>
  );
}
