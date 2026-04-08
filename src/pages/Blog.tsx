import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { POSTS, type Post } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SiteLayout from "@/components/SiteLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SortKey = "newest" | "oldest" | "title";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function estimateReadTimeMinutes(text: string) {
  const words = text
    .replace(/[`#>*_\-[\]()\n]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <Card className="hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all active:scale-[0.99]">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] text-terminal-dim">{post.date}</p>
            <p className="text-[10px] text-terminal-dim">{estimateReadTimeMinutes(post.content)} min read</p>
          </div>
          <h3 className="font-display font-semibold text-foreground mt-2 leading-snug">{post.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge variant="secondary" className="text-[10px] border border-border bg-secondary/40">
              {post.level}
            </Badge>
            {post.tags.slice(0, 4).map((t) => (
              <Badge key={t} variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                {t}
              </Badge>
            ))}
            {post.tags.length > 4 && (
              <Badge variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                +{post.tags.length - 4}
              </Badge>
            )}
          </div>
          <div className="mt-3 text-[11px] text-terminal-dim">
            read →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("newest");

  const allTags = useMemo(() => ["All", ...uniq(POSTS.flatMap((p) => p.tags)).sort((a, b) => a.localeCompare(b))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = POSTS.slice();

    if (activeTag !== "All") list = list.filter((p) => p.tags.includes(activeTag));
    if (q) {
      list = list.filter((p) => {
        const hay = `${p.title} ${p.summary} ${p.tags.join(" ")} ${p.level}`.toLowerCase();
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });

    return list;
  }, [activeTag, query, sort]);

  const featured = useMemo(() => {
    const list = POSTS.slice().sort((a, b) => b.date.localeCompare(a.date));
    return list[0] ?? null;
  }, []);

  return (
    <SiteLayout>
      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="text-terminal-comment text-sm mb-2">{"// Engineering notes, runbooks, and mini-guides"}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Engineering <span className="text-primary terminal-glow">Blog</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
                Practical DevOps posts you can actually use: patterns, checklists, and “how I’d debug it” writeups.
              </p>
            </div>

            <div className="flex gap-3 items-center flex-wrap">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts…"
                className="w-[260px]"
              />
              <div className="flex gap-2">
                <Button variant={sort === "newest" ? "default" : "secondary"} size="sm" onClick={() => setSort("newest")}>
                  Newest
                </Button>
                <Button variant={sort === "oldest" ? "default" : "secondary"} size="sm" onClick={() => setSort("oldest")}>
                  Oldest
                </Button>
                <Button variant={sort === "title" ? "default" : "secondary"} size="sm" onClick={() => setSort("title")}>
                  Title
                </Button>
              </div>
            </div>
          </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {featured && (
              <Card className="relative overflow-hidden border-border bg-secondary/20">
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
                <CardContent className="p-5">
                  <p className="text-terminal-comment text-xs mb-2">{"// featured"}</p>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <h2 className="font-display text-2xl font-bold text-foreground leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                        {featured.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <Badge variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                          {featured.level}
                        </Badge>
                        {featured.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-terminal-dim">{featured.date}</p>
                      <Button asChild>
                        <Link to={`/blog/${featured.slug}`}>Read post</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs value={activeTag} onValueChange={setActiveTag}>
              <TabsList className="w-full justify-start flex-wrap h-auto">
                {allTags.map((t) => (
                  <TabsTrigger key={t} value={t} className="text-xs">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTag} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-6">No posts match your filters.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-secondary/20 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">tips.md</p>
            </div>
            <ScrollArea className="h-[520px]">
              <div className="p-4">
                <div className="space-y-3">
                  <p className="text-terminal-comment text-xs">{"// How I write posts"}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Each post aims for: <span className="text-foreground">a clear mental model</span>, a{" "}
                    <span className="text-foreground">checklist</span>, and at least one{" "}
                    <span className="text-foreground">practical snippet</span>.
                  </p>
                  <div className="rounded-md border border-border bg-secondary/30 p-3">
                    <p className="text-[11px] text-terminal-dim">
                      Suggested learning path:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>1) GitOps basics</li>
                      <li>2) Terraform drift guardrails</li>
                      <li>3) Safer Kubernetes rollouts</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-border/70">
                    <p className="text-xs text-terminal-dim">
                      Want a shareable post link? Open any post card.
                    </p>
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <a href="/#contact">Ask a question</a>
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      </div>
    </SiteLayout>
  );
}

