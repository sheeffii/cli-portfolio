import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { POSTS } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/SiteLayout";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent } from "@/components/ui/card";

function estimateReadTimeMinutes(text: string) {
  const words = text
    .replace(/[`#>*_\-[\]()\n]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => POSTS.find((p) => p.slug === slug), [slug]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toc = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split("\n");
    const items: Array<{ depth: 2 | 3; text: string; id: string }> = [];
    for (const line of lines) {
      const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
      if (!m) continue;
      const depth = (m[1].length as 2 | 3);
      const text = (m[2] ?? "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      items.push({ depth, text, id });
    }
    return items;
  }, [post]);

  if (!post) {
    return (
      <SiteLayout>
        <div className="px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-terminal-error text-sm">Post not found.</p>
            <Link to="/blog" className="text-xs text-primary underline">
              Back to blog
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div className="min-w-0">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link to="/blog" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              ← back to blog
            </Link>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied");
                  } catch {
                    toast.error("Copy failed");
                  }
                }}
              >
                Copy link
              </Button>
              <Button asChild variant="secondary" size="sm">
                <a href="/#contact">Ask about this</a>
              </Button>
            </div>
          </div>

          <header className="space-y-3 mb-8">
            <p className="text-terminal-comment text-sm">{"// learning post"}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                {post.level}
              </Badge>
              <span className="text-[10px] text-terminal-dim">{post.date}</span>
              <span className="text-[10px] text-terminal-dim">{estimateReadTimeMinutes(post.content)} min read</span>
              {post.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                  {t}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
          </header>

          <Card className="border-border bg-card">
            <CardContent className="p-5 md:p-6">
              <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
                  return (
                    <h2
                      id={id}
                      {...props}
                      onMouseEnter={() => setActiveId(id)}
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
                  return (
                    <h3
                      id={id}
                      {...props}
                      onMouseEnter={() => setActiveId(id)}
                    >
                      {children}
                    </h3>
                  );
                },
                pre: ({ children, ...props }) => (
                  <pre
                    {...props}
                    className="rounded-lg border border-border bg-secondary/20 p-4 overflow-x-auto"
                  >
                    {children}
                  </pre>
                ),
                code: ({ children, className, ...props }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) return <code className={className} {...props}>{children}</code>;
                  return (
                    <code
                      {...props}
                      className="rounded bg-secondary/40 px-1.5 py-0.5 text-[0.85em]"
                    >
                      {children}
                    </code>
                  );
                },
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-2 border-primary/50 bg-secondary/20 rounded-md px-4 py-2"
                  >
                    {children}
                  </blockquote>
                ),
                a: ({ children, ...props }) => (
                  <a {...props} className="text-primary hover:underline">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
              </article>
            </CardContent>
          </Card>

          <div className="mt-10 pt-6 border-t border-border/70 flex items-center justify-between gap-4 flex-wrap">
            <Link to="/blog" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              ← more posts
            </Link>
            <div className="flex gap-2">
              <Button asChild size="sm">
                <a href="/#projects">See projects</a>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <a href="/#contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
              <p className="text-terminal-comment text-[10px] mb-3">// TABLE OF CONTENTS</p>
              {toc.length === 0 ? (
                <p className="text-xs text-muted-foreground">Add headings (## / ###) to show a TOC.</p>
              ) : (
                <nav className="space-y-1">
                  {toc.map((i) => (
                    <a
                      key={i.id}
                      href={`#${i.id}`}
                      className={[
                        "block text-xs transition-colors",
                        i.depth === 3 ? "pl-3" : "",
                        activeId === i.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      ].join(" ")}
                    >
                      {i.text}
                    </a>
                  ))}
                </nav>
              )}
              <div className="mt-4 pt-3 border-t border-border/70 flex gap-2">
                <Button asChild size="sm" className="w-full">
                  <a href="/#projects">Projects</a>
                </Button>
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <a href="/#contact">Contact</a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

