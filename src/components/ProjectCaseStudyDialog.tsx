import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECTS, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function nodeInfo(raw: string): { title: string; subtitle: string; details: string[] } {
  const t = raw.toLowerCase();
  if (t.includes("github actions")) {
    return {
      title: raw,
      subtitle: "CI Orchestration",
      details: ["Build/test/publish pipelines", "PR checks + release automation", "Artifact promotion patterns"],
    };
  }
  if (t.includes("terraform")) {
    return { title: raw, subtitle: "IaC", details: ["Immutable infra changes", "State + drift management", "Modules + environments"] };
  }
  if (t.includes("packer")) {
    return { title: raw, subtitle: "Golden Images", details: ["AMI/image baking", "Faster deploys, fewer runtime surprises", "Repeatable base images"] };
  }
  if (t.includes("argocd") || t.includes("gitops")) {
    return { title: raw, subtitle: "GitOps Delivery", details: ["Desired state from Git", "Auto-sync + rollback", "Audit trail for changes"] };
  }
  if (t.includes("kubernetes") || t.includes("k8s")) {
    return { title: raw, subtitle: "Orchestration", details: ["Scheduling + scaling", "Rollouts + health checks", "Namespaces + isolation"] };
  }
  if (t.includes("helm")) {
    return { title: raw, subtitle: "Templating", details: ["Environment templating", "Release management", "Values-driven config"] };
  }
  if (t.includes("kafka")) {
    return { title: raw, subtitle: "Event Stream", details: ["Durable ingestion", "Consumer groups", "Backpressure + replay"] };
  }
  if (t.includes("fastapi")) {
    return { title: raw, subtitle: "API Service", details: ["Async-first backend", "Typed schemas + validation", "Operational endpoints"] };
  }
  if (t.includes("postgres")) {
    return { title: raw, subtitle: "Database", details: ["Relational storage", "Indexes + migrations", "Durability + backups"] };
  }
  if (t.includes("redis")) {
    return { title: raw, subtitle: "Cache/Queue", details: ["Low-latency caching", "Rate limiting/session", "Fast ephemeral storage"] };
  }
  if (t.includes("prometheus")) {
    return { title: raw, subtitle: "Metrics", details: ["Scrape + alert rules", "SLI/SLO building blocks", "Time-series storage"] };
  }
  if (t.includes("grafana")) {
    return { title: raw, subtitle: "Dashboards", details: ["Operational visibility", "Alert visualization", "Team-ready views"] };
  }
  if (t.includes("alertmanager")) {
    return { title: raw, subtitle: "Alert Routing", details: ["Dedup + grouping", "Paging policies", "Integrations (Slack/Discord)"] };
  }
  if (t.includes("discord")) {
    return { title: raw, subtitle: "Notifications", details: ["Fast feedback loops", "On-call routing", "Human-in-the-loop alerts"] };
  }
  if (t.includes("aws")) {
    return { title: raw, subtitle: "Cloud Runtime", details: ["Compute + networking", "IAM boundaries", "Production-grade primitives"] };
  }
  if (t.includes("ecr") || t.includes("docker")) {
    return { title: raw, subtitle: "Containers", details: ["Immutable artifacts", "Image registry + promotion", "Runtime reproducibility"] };
  }
  return { title: raw, subtitle: "Component", details: ["Part of the end-to-end delivery flow"] };
}

function ArchitectureFlow({ architecture }: { architecture: string }) {
  const nodes = architecture
    .split("→")
    .map((s) => s.trim())
    .filter(Boolean);

  const enriched = useMemo(() => nodes.map((n) => nodeInfo(n)), [nodes]);
  const [selected, setSelected] = useState(0);

  return (
    <div className="rounded-lg border border-border bg-secondary/20 p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, hsl(var(--primary)) 0, transparent 40%), radial-gradient(circle at 80% 30%, hsl(var(--accent)) 0, transparent 42%)",
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-terminal-comment text-[10px]">// ARCHITECTURE (click a node)</p>
          <p className="text-terminal-dim text-[10px]">hover = hint · click = pin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Flow */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              {enriched.map((info, i) => {
                const isSelected = i === selected;
                return (
                  <div key={`${info.title}-${i}`} className="flex items-center gap-2">
                    <HoverCard openDelay={120}>
                      <HoverCardTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setSelected(i)}
                          className={cn(
                            "px-3 py-2 rounded-md border bg-card transition-colors text-left",
                            isSelected ? "border-primary/60 shadow-sm shadow-primary/10" : "border-border hover:border-primary/40",
                          )}
                        >
                          <p className="text-[11px] text-foreground/90 font-mono whitespace-nowrap">{info.title}</p>
                          <p className="text-[10px] text-terminal-dim mt-0.5">{info.subtitle}</p>
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent align="start" className="w-72">
                        <p className="text-xs font-semibold text-foreground">{info.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{info.subtitle}</p>
                        <ul className="mt-2 space-y-1">
                          {info.details.slice(0, 3).map((d) => (
                            <li key={d} className="text-[11px] text-foreground/80 flex gap-2">
                              <span className="text-terminal-success">◆</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </HoverCardContent>
                    </HoverCard>

                    {i < enriched.length - 1 && (
                      <span className={cn("text-terminal-dim text-xs select-none", isSelected ? "opacity-90" : "opacity-60")} aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-terminal-comment text-[10px] mb-2">// NODE DETAILS</p>
            <p className="text-sm font-semibold text-foreground">{enriched[selected]?.title ?? "—"}</p>
            <p className="text-xs text-muted-foreground mt-1">{enriched[selected]?.subtitle ?? ""}</p>
            <div className="mt-3 space-y-2">
              {(enriched[selected]?.details ?? []).map((d) => (
                <p key={d} className="text-xs text-foreground/80 flex gap-2">
                  <span className="text-terminal-highlight shrink-0">▸</span>
                  <span>{d}</span>
                </p>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border/70">
              <p className="text-[11px] text-terminal-dim">
                Interview angle: explain tradeoffs (security boundaries, scaling, rollout strategy, observability).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="architecture">Architecture</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg border border-border bg-secondary/20 p-4">
              <p className="text-terminal-comment text-[10px] mb-2">// SUMMARY</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-terminal-keyword text-xs tracking-widest uppercase mb-2">Highlights</p>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="text-xs text-foreground/80 flex gap-2">
                    <span className="text-terminal-success shrink-0">◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-terminal-keyword text-xs tracking-widest uppercase mb-2">Outcomes</p>
              <ul className="space-y-1.5">
                {(project.outcomes ?? []).map((o) => (
                  <li key={o} className="text-xs text-foreground/80 flex gap-2">
                    <span className="text-terminal-highlight shrink-0">▸</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
              {(!project.outcomes || project.outcomes.length === 0) && (
                <p className="text-xs text-terminal-dim">Add measurable outcomes for extra credibility.</p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-secondary/20 p-4">
              <p className="text-terminal-comment text-[10px] mb-2">// QUICK TECH</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 10).map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="architecture" className="mt-4 space-y-4">
        <ArchitectureFlow architecture={project.architecture} />
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-terminal-comment text-[10px] mb-2">// NOTES</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This is a high-level flow. In interviews, I can break down scaling, security boundaries, and observability decisions per node.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="tech" className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-terminal-keyword text-xs tracking-widest uppercase mb-2">Tech stack</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-[10px] border border-border bg-secondary/40">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function ProjectCaseStudyDialog({
  open,
  onOpenChange,
  projectSlug,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectSlug: string | null;
}) {
  const project = projectSlug ? PROJECTS.find((p) => p.slug === projectSlug) : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <div className="border-b border-border bg-background/60 backdrop-blur px-6 py-4">
          <DialogHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <DialogTitle className="font-display truncate">
                  {project ? project.title : "Project"}
                </DialogTitle>
                <DialogDescription>
                  {project ? "Cleaner, easier to scan. Details split into tabs." : "Project details"}
                </DialogDescription>
              </div>
              {project?.github && (
                <Button asChild variant="secondary" size="sm" className="shrink-0">
                  <a href={project.github} target="_blank" rel="noopener">
                    ↗ GitHub
                  </a>
                </Button>
              )}
            </div>

            {project && (
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("text-xs font-mono", project.tagColor)}>{project.tag}</span>
                {project.env && (
                  <span className="flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded border border-terminal-success/30 text-terminal-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-terminal-success" />
                    {project.env}
                  </span>
                )}
                <span className="text-[10px] text-terminal-dim">slug: {project.slug}</span>
              </div>
            )}
          </DialogHeader>
        </div>

        <ScrollArea className="h-[70vh]">
          <div className="px-6 py-5">
            {project ? <ProjectCaseStudy project={project} /> : <p className="text-sm text-muted-foreground">Not found.</p>}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

