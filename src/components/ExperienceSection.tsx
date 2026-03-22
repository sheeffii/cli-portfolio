import { useEffect, useRef, useState } from "react";

const JOBS = [
  {
    company: "StarLabs",
    role: "DevOps Engineer",
    period: "10/2025 – Present",
    location: "Pristina, Kosovo",
    tasks: [
      "Production Vault on AWS with HA, KMS auto-unseal, S3/DynamoDB backend",
      "E2E CI/CD: GitHub Actions → Terraform → Docker → Packer",
      "Full observability: Prometheus + Grafana + Alertmanager + Discord",
    ],
  },
  {
    company: "Freelance",
    role: "DevOps Engineer",
    period: "01/2024 – 06/2025",
    location: "Remote",
    tasks: [
      "CI/CD automation with Azure DevOps, GitHub Actions, Docker, K8s",
      "GitOps pipelines for automated testing & deployments",
      "Terraform + Ansible IaC on AWS ECS Fargate with static IPs",
    ],
  },
  {
    company: "Vitech",
    role: "Web Developer",
    period: "08/2024 – 03/2025",
    location: "Pristina, Kosovo",
    tasks: [
      "WordPress site for lab & medical equipment company",
      "Product catalog integration & digital presence management",
    ],
  },
  {
    company: "Gjirafa",
    role: "DevOps Engineer",
    period: "01/2023 – 12/2023",
    location: "Pristina, Kosovo",
    tasks: [
      "CI/CD with Azure DevOps & Ansible automation",
      "Docker & Kubernetes orchestration at scale",
      "Ephemeral environments with custom Helm charts",
    ],
  },
  {
    company: "StarLabs",
    role: "Full Stack Intern",
    period: "02/2022 – 04/2022",
    location: "Pristina, Kosovo",
    tasks: [
      "Django & DRF development with PostgreSQL",
      "Frontend features with HTML, CSS, JavaScript",
    ],
  },
];

export default function ExperienceSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-4xl mx-auto">
        {visible && (
          <>
            <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">git log --oneline --career</span>
            </div>

            <div className="space-y-8">
              {JOBS.map((job, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l border-border hover:border-primary/50 transition-colors duration-300 animate-fade-in-up group"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-secondary border border-border group-hover:border-primary group-hover:bg-primary/20 transition-colors duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <span className="text-terminal-highlight font-semibold">{job.company}</span>
                      <span className="text-terminal-dim mx-2">·</span>
                      <span className="text-terminal-string">{job.role}</span>
                    </div>
                    <span className="text-terminal-dim text-xs shrink-0">{job.period}</span>
                  </div>
                  <p className="text-terminal-comment text-xs mb-2">{job.location}</p>
                  <ul className="space-y-1">
                    {job.tasks.map((task, j) => (
                      <li key={j} className="text-sm text-foreground/70 flex gap-2">
                        <span className="text-terminal-dim shrink-0">▸</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
