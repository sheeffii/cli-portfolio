import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    label: "Cloud & IaC",
    icon: "☁",
    items: [
      { name: "AWS", level: 90 },
      { name: "Terraform", level: 95 },
      { name: "Ansible", level: 85 },
      { name: "Serverless", level: 75 },
    ],
  },
  {
    label: "CI/CD",
    icon: "⚙",
    items: [
      { name: "GitHub Actions", level: 92 },
      { name: "Azure DevOps", level: 88 },
      { name: "Jenkins", level: 70 },
      { name: "ArgoCD", level: 80 },
    ],
  },
  {
    label: "Containers",
    icon: "◻",
    items: [
      { name: "Docker", level: 95 },
      { name: "Kubernetes", level: 90 },
      { name: "Helm", level: 85 },
      { name: "ECS Fargate", level: 78 },
    ],
  },
  {
    label: "Observability",
    icon: "◎",
    items: [
      { name: "Prometheus", level: 88 },
      { name: "Grafana", level: 90 },
      { name: "CloudWatch", level: 80 },
      { name: "Alertmanager", level: 85 },
    ],
  },
];

export default function SkillsSection() {
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
    <section ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        {visible && (
          <>
            <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">cat skills.yml</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILL_GROUPS.map((group, i) => (
                <div
                  key={group.label}
                  className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(i + 1) * 120}ms` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{group.icon}</span>
                    <h3 className="text-terminal-keyword font-semibold text-sm font-display">{group.label}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground/80">{skill.name}</span>
                          <span className="text-terminal-dim tabular-nums">{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/70 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: visible ? `${skill.level}%` : "0%" }}
                          />
                        </div>
                      </div>
                    ))}
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
