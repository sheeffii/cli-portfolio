export type Project = {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  architecture: string;
  highlights: string[];
  outcomes?: string[];
  tech: string[];
  github?: string;
  env?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "gamemetricspro",
    tag: "GitOps",
    tagColor: "text-terminal-success",
    title: "GameMetricsPro",
    description:
      "Real-time game telemetry needed event-driven ingestion at scale with GitOps-driven delivery and full observability — no manual deployments.",
    architecture:
      "GitHub Actions → Docker Build → ECR → ArgoCD Sync → Kubernetes (K8s/) → Kafka → Services → Prometheus/Grafana",
    highlights: [
      "Full GitOps pipeline: push → image → manifest update → ArgoCD sync",
      "Kafka-backed real-time game metrics event stream",
      "Chaos experiments folder for resilience testing",
      "43 commits — iterative infra hardening across 10+ services",
    ],
    outcomes: [
      "Zero-click deployments via ArgoCD sync",
      "End-to-end observability with Prometheus + Grafana",
      "Event-driven ingestion designed for burst traffic",
    ],
    tech: ["Kubernetes", "ArgoCD", "Kafka", "Docker", "Terraform", "Prometheus", "Grafana", "GitHub Actions"],
    github: "https://github.com/sheeffii/GameMetricsPro",
  },
  {
    slug: "vigilant",
    tag: "FinOps",
    tagColor: "text-terminal-string",
    title: "Vigilant — Cloud Command Center",
    description:
      "Developers make manual AWS Console changes that never return to Terraform, creating invisible security drift and cost bleed.",
    architecture:
      "LocalStack (Docker) → Terraform tfstate → Drift Engine → FastAPI → React Dashboard → PostgreSQL → Redis",
    highlights: [
      "Detects infrastructure drift: live vs Terraform-managed resources",
      "FinOps cost bleed estimation (hourly → monthly)",
      "GeoIP traffic risk analysis on unmanaged infrastructure",
      "Local-first lab — safely iterates before real AWS deployment",
    ],
    outcomes: ["Detect drift before it becomes an outage", "Local-first environment for safe experiments"],
    tech: ["Python", "FastAPI", "Terraform", "LocalStack", "Docker", "PostgreSQL", "Redis", "React"],
    github: "https://github.com/sheeffii/Vigilant",
  },
  {
    slug: "full-devops-project",
    tag: "CI/CD",
    tagColor: "text-terminal-error",
    title: "Full DevOps Project",
    description:
      "Production teams needed a fully automated, observable, and reproducible delivery pipeline for app + bot + infra — all triggered from a single push.",
    architecture:
      "GitHub Actions → Terraform → Packer → AWS EC2 → ECR → Docker (Node.js App + Discord Bot) → Prometheus + Grafana + Alertmanager → Discord Alerts",
    highlights: [
      "Full stack deployed in ~10-12 minutes end-to-end",
      "3 independent CI/CD pipelines: infra, app, Discord bot",
      "Vault-secured secrets with S3/DynamoDB state backend",
      "Real-time Discord alerts for CPU, memory, disk & service health",
    ],
    outcomes: ["End-to-end push-to-prod delivery in minutes", "Actionable alerts routed to Discord"],
    tech: ["Terraform", "Packer", "GitHub Actions", "AWS EC2", "ECR", "Docker", "Prometheus", "Grafana", "Alertmanager"],
    github: "https://github.com/sheeffii/full_devops_project",
  },
  {
    slug: "ephemeral-environments",
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
    outcomes: ["Faster PR feedback loops", "No shared-env conflicts", "Auto-clean teardown on merge"],
    tech: ["Azure DevOps", "Helm", "Kubernetes", "Docker", "Bash"],
    github: "https://github.com/sheeffii",
  },
  {
    slug: "ecs-fargate",
    tag: "Cloud",
    tagColor: "text-terminal-highlight",
    title: "AWS ECS Fargate Deployment",
    description:
      "Containerized applications needed scalable serverless hosting with consistent static IPs and automated deployments.",
    architecture: "GitHub Actions → DockerHub → AWS ECS Fargate → Application Load Balancer → Static IP (Elastic IP)",
    highlights: [
      "Serverless container orchestration at scale",
      "Consistent static IP for downstream integrations",
      "Automated push-to-deploy workflow",
      "Cost-optimized Fargate task definitions",
    ],
    outcomes: ["Automated deployments with consistent networking", "Scalable runtime without managing servers"],
    tech: ["AWS ECS", "Fargate", "GitHub Actions", "Docker", "DockerHub", "ALB"],
    github: "https://github.com/sheeffii",
    env: "Production",
  },
];

