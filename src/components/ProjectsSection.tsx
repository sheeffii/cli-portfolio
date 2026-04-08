import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { usePortfolioActions } from "@/contexts/portfolio-actions";

export default function ProjectsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { openProjectBySlug } = usePortfolioActions();

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
                  className="flex flex-col p-4 rounded-lg border border-border/80 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in-up group cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  onClick={() => openProjectBySlug(project.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openProjectBySlug(project.slug);
                    }
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono ${project.tagColor}`}>{project.tag}</span>
                    <span className="text-terminal-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </div>
                  <h3 className="text-foreground font-display font-bold text-base mb-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] bg-secondary text-terminal-string rounded-sm border border-border">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] bg-secondary/60 text-terminal-dim rounded-sm border border-border">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/70">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      className="text-xs text-terminal-dim hover:text-primary transition-colors duration-200 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub
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
