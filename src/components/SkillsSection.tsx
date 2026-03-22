import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    key: "cloud",
    label: "Cloud Platforms",
    icon: "☁",
    items: ["AWS", "GCP", "Azure", "ECS Fargate", "Lambda", "CloudWatch"],
  },
  {
    key: "containers",
    label: "Containerization & Orchestration",
    icon: "◻",
    items: ["Docker", "Kubernetes", "Helm", "ArgoCD"],
  },
  {
    key: "ci_cd",
    label: "CI/CD & GitOps",
    icon: "⚙",
    items: ["Azure DevOps", "GitHub Actions", "Jenkins", "GitOps"],
  },
  {
    key: "iac",
    label: "Infrastructure as Code",
    icon: "▦",
    items: ["Terraform", "Ansible", "Terraform Cloud"],
  },
  {
    key: "monitoring",
    label: "Observability",
    icon: "◎",
    items: ["Prometheus", "Grafana", "Alertmanager", "CloudWatch"],
  },
  {
    key: "scripting",
    label: "Scripting & OS",
    icon: "▸",
    items: ["Bash", "Python", "Linux", "Networking"],
  },
];

const CERTIFICATIONS = [
  {
    name: "HashiCorp Terraform Associate",
    issued: "Issued 2025",
    href: "https://www.credly.com/badges/1e1a3d14-e9ab-45e2-9100-3216b4f46ee9",
    icon: "🟣",
  },
  {
    name: "Google Associate Cloud Engineer",
    issued: "Issued 2025",
    href: "https://www.credly.com/badges/0c253dc5-210f-479a-a3f1-86e216464358",
    icon: "☁",
  },
];

export default function SkillsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        {visible && (
          <>
            <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">cat skills.yml</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILL_GROUPS.map((group, i) => (
                <div
                  key={group.key}
                  className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(i + 1) * 80}ms` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-0.5 h-4 bg-terminal-error rounded-full" />
                    <span className="text-terminal-keyword text-xs font-mono">// {group.key}</span>
                  </div>
                  <h3 className="text-foreground font-semibold text-sm mb-3 font-display">{group.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs bg-secondary/80 text-terminal-highlight rounded-sm border border-border hover:border-primary/40 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-terminal-comment text-sm">// CERTIFICATIONS</span>
              </div>
              <h3 className="text-foreground font-display font-bold text-2xl mb-8">Industry Certified</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center gap-4 p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-300 active:scale-[0.98]"
                  >
                    <span className="text-2xl shrink-0">{cert.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-terminal-highlight group-hover:text-primary transition-colors duration-200 truncate">
                        {cert.name}
                      </p>
                      <p className="text-xs text-terminal-dim mt-0.5">
                        {cert.issued} · <span className="text-terminal-string group-hover:underline">View on Credly ↗</span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
