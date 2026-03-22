import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    tag: "GitOps",
    tagColor: "text-terminal-success",
    title: "GameMetricsPro",
    description: "Real-time game telemetry needed event-driven ingestion at scale with GitOps-driven delivery and full observability — no manual deployments.",
    architecture: "GitHub Actions → Docker Build → ECR → ArgoCD Sync → Kubernetes (K8s/) → Kafka → Services → Prometheus/Grafana",
    highlights: [
      "Full GitOps pipeline: push → image → manifest update → ArgoCD sync",
      "Kafka-backed real-time game metrics event stream",
      "Chaos experiments folder for resilience testing",
      "43 commits — iterative infra hardening across 10+ services",
    ],
    tech: ["Kubernetes", "ArgoCD", "Kafka", "Docker", "Terraform", "Prometheus", "Grafana", "GitHub Actions"],
    github: "https://github.com/sheeffii",
  },
  {
    tag: "FinOps",
    tagColor: "text-terminal-string",
    title: "Vigilant — Cloud Command Center",
    description: "Developers make manual AWS Console changes that never return to Terraform, creating invisible security drift and cost bleed.",
    architecture: "LocalStack (Docker) → Terraform tfstate → Drift Engine → FastAPI → React Dashboard → PostgreSQL → Redis",
    highlights: [
      "Detects infrastructure drift: live vs Terraform-managed resources",
      "FinOps cost bleed estimation (hourly → monthly)",
      "GeoIP traffic risk analysis on unmanaged infrastructure",
      "Local-first lab — safely iterates before real AWS deployment",
    ],
    tech: ["Python", "FastAPI", "Terraform", "LocalStack", "Docker", "PostgreSQL", "Redis", "React"],
    github: "https://github.com/sheeffii",
  },
  {
    tag: "CI/CD",
    tagColor: "text-terminal-error",
    title: "Full DevOps Project",
    description: "Production teams needed a fully automated, observable, and reproducible delivery pipeline for app + bot + infra — all triggered from a single push.",
    architecture: "GitHub Actions → Terraform → Packer → AWS EC2 → ECR → Docker (Node.js App + Discord Bot) → Prometheus + Grafana + Alertmanager → Discord Alerts",
    highlights: [
      "Full stack deployed in ~10-12 minutes end-to-end",
      "3 independent CI/CD pipelines: infra, app, Discord bot",
      "Vault-secured secrets with S3/DynamoDB state backend",
      "Real-time Discord alerts for CPU, memory, disk & service health",
    ],
    tech: ["Terraform", "Packer", "GitHub Actions", "AWS EC2", "ECR", "Docker", "Prometheus", "Grafana", "Alertmanager"],
    github: "https://github.com/sheeffii",
  },
  {
    tag: "K8s",
    tagColor: "text-terminal-keyword",
    title: "Ephemeral Environments System",
    description: "Feature branches were tested in shared environments causing conflicts and slow integration cycles.",
    architecture: "Azure DevOps PR Trigger → Helm Chart → Isolated Namespace → Automated Teardown on Merge",
    highlights: [
      "Per-PR isolated test environments",
      "Automatic namespace cleanup on merge",
      "Custom Helm chart for environment templating",
      "Parallel feature testing with zero conflicts",
    ],
    tech: ["Azure DevOps", "Helm", "Kubernetes", "Docker", "Bash"],
    github: "https://github.com/sheeffii",
  },
  {
    tag: "Cloud",
    tagColor: "text-terminal-highlight",
    title: "AWS ECS Fargate Deployment",
    description: "Containerized applications needed scalable serverless hosting with consistent static IPs and automated deployments.",
    architecture: "GitHub Actions → DockerHub → AWS ECS Fargate → Application Load Balancer → Static IP (Elastic IP)",
    highlights: [
      "Serverless container orchestration at scale",
      "Consistent static IP for downstream integrations",
      "Automated push-to-deploy workflow",
      "Cost-optimized Fargate task definitions",
    ],
    tech: ["AWS ECS", "Fargate", "GitHub Actions", "Docker", "DockerHub", "ALB"],
    github: "https://github.com/sheeffii",
    env: "Production",
  },
];

export default function ProjectsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        {visible && (
          <>
            <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">ls ~/projects --detailed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECTS.map((project, i) => (
                <div
                  key={project.title}
                  className="flex flex-col p-5 rounded-lg border border-border bg-card hover:border-primary/20 transition-all duration-300 animate-fade-in-up group"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono ${project.tagColor}`}>{project.tag}</span>
                    <span className="text-terminal-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">☆</span>
                  </div>
                  <h3 className="text-foreground font-display font-bold text-base mb-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{project.description}</p>

                  {/* Architecture */}
                  <div className="p-3 rounded bg-secondary/50 border border-border mb-4">
                    <p className="text-terminal-comment text-[10px] mb-1">// ARCHITECTURE</p>
                    <p className="text-xs text-terminal-highlight leading-relaxed font-mono break-words">{project.architecture}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-4 flex-1">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="text-xs text-foreground/70 flex gap-1.5">
                        <span className="text-terminal-success shrink-0">◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] bg-secondary text-terminal-string rounded-sm border border-border">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      className="text-xs text-terminal-dim hover:text-primary transition-colors duration-200 flex items-center gap-1"
                    >
                      ↗ View on GitHub
                    </a>
                    {project.env && (
                      <span className="flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded border border-terminal-success/30 text-terminal-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-terminal-success" />
                        {project.env}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
