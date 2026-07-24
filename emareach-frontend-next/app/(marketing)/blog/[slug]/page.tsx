import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import { Button } from "@/components/ui/button";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";
import { isBotRequest } from "@/lib/is-bot-request";
import { processBlogHtml } from "@/lib/process-blog-html";
import { fetchBlogBySlug, fetchRelatedBlogs } from "@/lib/server-api";
import { SITE_URL } from "@/lib/seo";
import type { Blog } from "@/types/api";

const RELATED_POSTS_LIMIT = 3;

function normalizeMarkdownContent(raw: string | undefined | null): string {
  if (raw == null || typeof raw !== "string") return "";
  const trimmed = raw.trim();
  const fenceRegex = /^```(\w*)\n?([\s\S]*?)\n?```\s*$/;
  const match = trimmed.match(fenceRegex);
  if (match) return match[2].trim();
  return trimmed;
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const [postRaw, relatedRes] = await Promise.all([
    fetchBlogBySlug(slug),
    fetchRelatedBlogs(slug, RELATED_POSTS_LIMIT + 2),
  ]);

  if (!postRaw) notFound();

  const post = postRaw as unknown as Blog;
  const relatedBlogs = (relatedRes.blogs ?? []) as unknown as Blog[];
  const relatedPosts = relatedBlogs
    .filter((b) => b.slug !== post.slug)
    .slice(0, RELATED_POSTS_LIMIT);

  const isMarkdown = post.content && !post.content.startsWith("<");
  const isBot = await isBotRequest();

  return (
    <article className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-10 pb-20 lg:pt-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
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

        {post.featured_image_url && (
          <div className="rounded-xl overflow-hidden border border-border bg-muted mb-10">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="blog-prose prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-a:text-primary prose-img:rounded-lg prose-ol:list-decimal prose-ol:pl-6 prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 prose-strong:font-semibold prose-strong:text-foreground prose-p:leading-relaxed prose-code:text-foreground prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none text-foreground max-w-none">
          {post.content ? (
            isMarkdown ? (
              <BlogMarkdown isBot={isBot}>
                {normalizeMarkdownContent(post.content)}
              </BlogMarkdown>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: processBlogHtml(post.content, isBot) }} />
            )
          ) : (
            <p className="text-muted-foreground">No content yet.</p>
          )}
        </div>

        <div className="mt-10">
          <BlogShareButtons
            shareUrl={`${SITE_URL}/blog/${encodeURIComponent(post.slug)}`}
            title={post.title}
          />
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center gap-4">
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All posts
            </Button>
          </Link>
        </div>

        <section className="mt-14 rounded-2xl border border-border bg-muted/50 p-8 lg:p-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>EmaReach AI</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Ready to scale your cold email outreach?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of teams using EmaReach AI for AI-powered campaigns, domain warmup, and 95%+ deliverability. Start free — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "Request a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "blog_start_trial" }}
            />
          </div>
        </section>
      </div>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-14 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 lg:mb-10">
              Related posts
            </h2>
            <ul className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/blog/${encodeURIComponent(related.slug)}`}
                    className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                  >
                    {related.featured_image_url ? (
                      <div className="aspect-[16/9] overflow-hidden bg-muted">
                        <img
                          src={related.featured_image_url}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/80" />
                    )}
                    <div className="flex flex-col flex-1 min-h-0 p-6 lg:p-7">
                      <div className="flex-1 min-h-0">
                        <h3 className="text-lg lg:text-xl font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                          {related.title}
                        </h3>
                        {related.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3 mt-3 leading-relaxed">
                            {related.excerpt}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 pt-4 mt-auto text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                        Read article
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
