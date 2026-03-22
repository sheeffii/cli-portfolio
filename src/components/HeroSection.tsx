import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 relative">
      <div className="absolute inset-0 scanline opacity-30" />
      <div className="relative z-10 max-w-4xl">
        {visible && (
          <>
            <p
              className="text-terminal-comment text-sm mb-4 animate-fade-in-up"
              style={{ animationDelay: "0ms" }}
            >
              {"// Hello, World!"}
            </p>

            <h1
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95] tracking-tight animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Shefqet
              <br />
              <span className="text-primary terminal-glow">Salihu</span>
            </h1>

            <div
              className="mt-6 flex items-center gap-3 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-8 h-px bg-primary/50" />
              <p className="text-lg text-terminal-highlight font-display font-medium">
                DevOps Engineer
              </p>
            </div>

            <p
              className="mt-6 text-sm text-muted-foreground max-w-lg leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              Building resilient infrastructure with Terraform, Kubernetes & CI/CD.
              <br />
              Certified Terraform Associate · Google Cloud ACE · Based in Pristina.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              {["AWS", "Kubernetes", "Terraform", "Docker", "GitHub Actions", "Prometheus"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs border border-border bg-secondary/50 text-secondary-foreground rounded-sm hover:border-primary/40 hover:text-primary transition-colors duration-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div
              className="mt-10 flex gap-4 animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
            >
              <a
                href="https://github.com/sheeffii"
                target="_blank"
                rel="noopener"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="text-terminal-dim">→</span> github
              </a>
              <a
                href="https://linkedin.com/in/shefqetsalihu"
                target="_blank"
                rel="noopener"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="text-terminal-dim">→</span> linkedin
              </a>
              <a
                href="mailto:shefqetsalihu123@gmail.com"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="text-terminal-dim">→</span> email
              </a>
            </div>
          </>
        )}
      </div>

      {/* Decorative grid */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>
    </section>
  );
}
