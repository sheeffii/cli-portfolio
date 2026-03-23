import { useEffect, useRef, useState } from "react";

const PIPELINE_STEPS = [
  { tag: "system", text: "Initializing runner...", status: "OK", color: "text-foreground" },
  { tag: "lint", text: "Checking message payload for spam...", status: "[PASS]", color: "text-terminal-success" },
  { tag: "build", text: "Packaging artifact: message.tar.gz...", status: "Done", color: "text-terminal-keyword" },
  { tag: "security", text: "Scanning for vulnerabilities...", status: "No threats found.", color: "text-terminal-string" },
  { tag: "deploy", text: "Establishing secure tunnel to shefqet.salihu@prod...", status: "", color: "text-terminal-highlight" },
  { tag: "deploy", text: "Pushing to production branch...", status: "[100%]", color: "text-terminal-highlight" },
];

function PipelineLog({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < PIPELINE_STEPS.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onDone, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, onDone]);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">pipeline.log</span>
      </div>
      <div className="p-4 space-y-2 text-xs font-mono min-h-[200px]">
        {PIPELINE_STEPS.slice(0, visibleLines).map((step, i) => (
          <p key={i} className="animate-fade-in-up">
            <span className={step.color}>[{step.tag}]</span>
            <span className="text-foreground/80"> {step.text} </span>
            <span className="text-foreground font-bold">{step.status}</span>
          </p>
        ))}
        {visibleLines < PIPELINE_STEPS.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        )}
      </div>
    </div>
  );
}

function DeploySuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden animate-fade-in-up">
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">deployment.status</span>
      </div>
      <div className="p-8 flex flex-col items-center text-center space-y-4">
        <div className="w-14 h-14 rounded-full border-2 border-terminal-success flex items-center justify-center">
          <svg className="w-7 h-7 text-terminal-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-foreground font-bold tracking-widest text-sm uppercase">Deployment Successful</p>
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <p>Build ID: <span className="text-foreground/80">job_{Math.random().toString(36).slice(2, 9)}</span></p>
            <p>Deployment Time: <span className="text-foreground font-bold">{(Math.random() * 2 + 0.5).toFixed(2)}s</span></p>
            <p>Status: <span className="text-terminal-success">● Healthy</span></p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="mt-2 px-5 py-2 text-xs border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200 active:scale-[0.97] flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Pipeline
        </button>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"form" | "pipeline" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setPhase("pipeline");
  };

  const handleReset = () => {
    setPhase("form");
    setName("");
    setEmail("");
    setMessage("");
  };

  const links = [
    { label: "Email", value: "shefqetsalihu123@gmail.com", href: "mailto:shefqetsalihu123@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/shefqetsalihu", href: "https://linkedin.com/in/shefqetsalihu" },
    { label: "GitHub", value: "github.com/sheeffii", href: "https://github.com/sheeffii" },
    { label: "Phone", value: "+383 49 610 533", href: "tel:+38349610533" },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        {visible && (
          <>
            <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">cat .env.contact</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left — Contact Form */}
              <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                {phase === "form" && (
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">new-message.yml</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="text-terminal-keyword text-xs block mb-1.5">name:</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3 py-2.5 bg-secondary/30 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-terminal-keyword text-xs block mb-1.5">email:</label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full px-3 py-2.5 bg-secondary/30 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-terminal-keyword text-xs block mb-1.5">message:</label>
                        <textarea
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Let's build something great..."
                          rows={4}
                          className="w-full px-3 py-2.5 bg-secondary/30 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors resize-none"
                        />
                      </div>
                      <button
                        onClick={handleSubmit}
                        disabled={!name.trim() || !email.trim() || !message.trim()}
                        className="w-full py-2.5 bg-secondary/50 border border-border rounded-md text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        $ git push origin main
                      </button>
                    </div>
                  </div>
                )}
                {phase === "pipeline" && (
                  <PipelineLog onDone={() => setPhase("success")} />
                )}
                {phase === "success" && (
                  <DeploySuccess onReset={handleReset} />
                )}
              </div>

              {/* Right — Contact Links */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                {links.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                    className="group block p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-300 active:scale-[0.98]"
                    style={{ animationDelay: `${(i + 3) * 100}ms` }}
                  >
                    <p className="text-terminal-keyword text-xs mb-1 font-display">{link.label}</p>
                    <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors duration-200 break-all">
                      {link.value}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "600ms" }}>
              <p className="text-terminal-dim text-xs">
                <span className="text-terminal-comment">{"// "}</span>
                Built with React + TypeScript · Designed as a terminal
              </p>
              <p className="text-terminal-dim text-xs mt-1">
                © {new Date().getFullYear()} Shefqet Salihu
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
