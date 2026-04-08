export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  content: string;
};

export const POSTS: Post[] = [
  {
    slug: "gitops-in-plain-english",
    title: "GitOps in plain English (and why it works)",
    date: "2026-04-01",
    tags: ["GitOps", "CI/CD", "Kubernetes"],
    level: "Beginner",
    summary: "A beginner-friendly explanation of GitOps with practical mental models and a simple workflow.",
    content: `## What is GitOps?
GitOps means **Git is the source of truth** for what should run in production.
Instead of “clicking around” in a cluster, you change config in Git and a controller continuously reconciles the runtime to match.

> Think of it like: **Git is desired state**, the cluster is actual state, and the controller is the reconciliation loop.

## The loop (simple mental model)
1. You change app/config in Git
2. CI builds an artifact (container image)
3. Your GitOps controller (ex: ArgoCD) detects changes and applies them
4. Drift gets corrected automatically (or at least detected loudly)

## Minimal example
You update a Helm values file (or Kustomize overlay), commit it, and ArgoCD syncs:

\`\`\`yaml
# values-prod.yaml
image:
  repository: ghcr.io/acme/api
  tag: "2026.04.01-1"

resources:
  requests:
    cpu: "200m"
    memory: "256Mi"
\`\`\`

## Why teams like it
- **Auditable**: every change has a commit/PR
- **Rollback is obvious**: revert the commit
- **Consistent environments**: same patterns across dev/stage/prod

## Common pitfalls (and fixes)
- **Secret sprawl** → use External Secrets / Vault integration
- **Unreviewed prod changes** → enforce PR approvals + protected branches
- **No progressive delivery** → add canary/rollout checks (Argo Rollouts, Flagger)
`,
  },
  {
    slug: "terraform-drift-and-how-to-stop-it",
    title: "Terraform drift: what it is and how to stop it",
    date: "2026-03-18",
    tags: ["Terraform", "IaC", "FinOps"],
    level: "Intermediate",
    summary: "How drift happens, how to detect it, and guardrails that keep your infra clean.",
    content: `## Drift basics
Drift is the difference between **declared state** (Terraform) and **real state** (cloud).
It usually happens when people “quick fix” something in the console and forget to bring it back into code.

## Symptoms you’ll see
- Security groups that don’t match the repo
- “mystery” resources with no ownership
- cost spikes (FinOps pain)

## Guardrails that actually work
### 1) Restrict console changes
Use least privilege. In prod, most humans should not have permissions to mutate infra directly.

### 2) Drift detection in CI
Run a scheduled plan and alert on changes:

\`\`\`bash
terraform init
terraform plan -detailed-exitcode
\`\`\`

- exit code **0**: no diff
- exit code **2**: drift detected

### 3) Make it easy to do the right thing
If “making a PR” is slower than console edits, people will do console edits.
Provide templates, modules, and quick review loops.
`,
  },
  {
    slug: "kubernetes-rollouts-without-fear",
    title: "Kubernetes rollouts without fear",
    date: "2026-02-07",
    tags: ["Kubernetes", "SRE", "Observability"],
    level: "Intermediate",
    summary: "A practical rollout checklist: probes, metrics, safe rollbacks, and what to watch in dashboards.",
    content: `## The checklist (production)
### Readiness / liveness
Your rollout is only as safe as your probes.

### Requests / limits
Avoid noisy neighbor issues and OOM surprises.

### Watch the right signals
Track:
- error rate (5xx)
- latency (p95/p99)
- saturation (CPU/memory)

### Progressive delivery
If you can, do canary:
- 10% traffic → observe → 50% → 100%

## A rollout snippet
\`\`\`yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1
\`\`\`
`,
  },
];

