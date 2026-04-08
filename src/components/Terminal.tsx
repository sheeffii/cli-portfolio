import { useMemo, useState, useRef, useEffect, useCallback } from "react";

const COMMANDS: Record<string, { description: string }> = {
  help: { description: "List available commands" },
  ls: { description: "List directory contents" },
  cat: { description: "Print file contents (e.g. cat about.json)" },
  cd: { description: "Change directory (e.g. cd projects/)" },
  touch: { description: "Create a file (demo)" },
  pwd: { description: "Print working directory" },
  whoami: { description: "Current user" },
  date: { description: "Show current date" },
  uptime: { description: "Show career uptime" },
  clear: { description: "Clear terminal" },
  neofetch: { description: "System info" },
};

interface Line {
  content: React.ReactNode;
  type: "input" | "output" | "error" | "system";
}

const TerminalPrompt = ({ value, onChange, onSubmit, onKeyDown, inputRef }: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) => (
  <div className="flex items-center gap-2 group">
    <span className="text-terminal-prompt font-semibold shrink-0">shefqet@portfolio</span>
    <span className="text-terminal-dim shrink-0">:</span>
    <span className="text-terminal-string shrink-0">~</span>
    <span className="text-terminal-dim shrink-0">$</span>
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        } else {
          onKeyDown(e);
        }
      }}
      className="flex-1 bg-transparent outline-none text-foreground caret-primary font-mono text-sm"
      spellCheck={false}
      autoComplete="off"
    />
  </div>
);

const renderHelp = () => (
  <div className="space-y-1">
    <p className="text-terminal-comment">{"// Available commands:"}</p>
    {Object.entries(COMMANDS).map(([cmd, { description }]) => (
      <div key={cmd} className="flex gap-4">
        <span className="text-terminal-highlight w-24 shrink-0">{cmd}</span>
        <span className="text-terminal-dim">{description}</span>
      </div>
    ))}
    <p className="text-terminal-dim text-xs mt-2">Tip: use <span className="text-terminal-highlight">Tab</span> for autocomplete.</p>
  </div>
);

const renderAbout = () => (
  <div className="space-y-2">
    <p className="text-terminal-comment">{"// about.json"}</p>
    <div className="text-sm space-y-1">
      <p><span className="text-terminal-keyword">{"{"}</span></p>
      <p className="pl-4"><span className="text-terminal-string">"name"</span><span className="text-terminal-dim">: </span><span className="text-terminal-highlight">"Shefqet Salihu"</span>,</p>
      <p className="pl-4"><span className="text-terminal-string">"role"</span><span className="text-terminal-dim">: </span><span className="text-terminal-highlight">"DevOps Engineer"</span>,</p>
      <p className="pl-4"><span className="text-terminal-string">"location"</span><span className="text-terminal-dim">: </span><span className="text-terminal-highlight">"Pristina, Kosovo"</span>,</p>
      <p className="pl-4"><span className="text-terminal-string">"summary"</span><span className="text-terminal-dim">: </span><span className="text-foreground">"Experienced DevOps Engineer with hands-on expertise in CI/CD pipelines and container orchestration. Proficient in Azure DevOps, Kubernetes, Terraform, and cloud platforms. Certified Terraform Associate and Google ACE."</span></p>
      <p><span className="text-terminal-keyword">{"}"}</span></p>
    </div>
  </div>
);

const renderSkills = () => {
  const categories = [
    { name: "Cloud & IaC", items: ["AWS", "Terraform", "Ansible", "Serverless"] },
    { name: "CI/CD", items: ["Azure DevOps", "GitHub Actions", "Jenkins", "ArgoCD", "GitOps"] },
    { name: "Containers", items: ["Docker", "Kubernetes", "Helm", "ECS Fargate"] },
    { name: "Monitoring", items: ["Prometheus", "Grafana", "CloudWatch", "Alertmanager"] },
    { name: "Languages", items: ["Python", "JavaScript", "HTML/CSS", "Flask", "Django"] },
    { name: "Databases", items: ["PostgreSQL", "MySQL"] },
  ];
  return (
    <div className="space-y-3">
      <p className="text-terminal-comment">{"// cat skills.yml"}</p>
      {categories.map((cat) => (
        <div key={cat.name}>
          <p className="text-terminal-keyword">{cat.name}:</p>
          <div className="flex flex-wrap gap-2 pl-4 mt-1">
            {cat.items.map((item) => (
              <span key={item} className="px-2 py-0.5 bg-secondary text-terminal-highlight text-xs rounded-sm border border-border">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderExperience = () => {
  const jobs = [
    { company: "StarLabs", role: "DevOps Engineer", period: "10/2025 – Present", highlights: ["Production Vault on AWS with HA, KMS auto-unseal", "E2E CI/CD with GitHub Actions, Terraform, Docker, Packer", "Monitoring: Prometheus, Grafana, Alertmanager, Discord alerts"] },
    { company: "Freelancer", role: "DevOps Engineer", period: "01/2024 – 06/2025", highlights: ["CI/CD automation with Azure DevOps, GitHub Actions, Docker, K8s", "GitOps pipelines for automated testing & deployments", "IaC with Terraform & Ansible on AWS ECS Fargate"] },
    { company: "Vitech", role: "Web Developer", period: "08/2024 – 03/2025", highlights: ["WordPress development for lab equipment company", "Product catalog integration & UX optimization"] },
    { company: "Gjirafa", role: "DevOps Engineer", period: "01/2023 – 12/2023", highlights: ["CI/CD with Azure DevOps & Ansible automation", "Docker & Kubernetes orchestration", "Ephemeral environments with custom Helm charts"] },
    { company: "StarLabs", role: "Full Stack Intern", period: "02/2022 – 04/2022", highlights: ["Django & DRF development", "PostgreSQL optimization", "Agile collaboration"] },
  ];
  return (
    <div className="space-y-4">
      <p className="text-terminal-comment">{"// git log --oneline --career"}</p>
      {jobs.map((job, i) => (
        <div key={i} className="border-l border-border pl-4">
          <p>
            <span className="text-terminal-highlight">{job.company}</span>
            <span className="text-terminal-dim"> — </span>
            <span className="text-terminal-string">{job.role}</span>
          </p>
          <p className="text-terminal-dim text-xs">{job.period}</p>
          <ul className="mt-1 space-y-0.5">
            {job.highlights.map((h, j) => (
              <li key={j} className="text-sm">
                <span className="text-terminal-dim">▸ </span>
                <span className="text-foreground/80">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const renderEducation = () => (
  <div className="space-y-3">
    <p className="text-terminal-comment">{"// cat education.md"}</p>
    <div className="space-y-3">
      <div className="border-l border-border pl-4">
        <p className="text-terminal-highlight">LIFE from Gjirafa — Fellow</p>
        <p className="text-terminal-dim text-xs">05/2022 – 04/2023 | 5.9% acceptance rate</p>
        <p className="text-sm text-foreground/80 mt-1">9-month intensive: Backend, Frontend, DevOps, 40h/week</p>
      </div>
      <div className="border-l border-border pl-4">
        <p className="text-terminal-highlight">BSc. Engineering Chemistry</p>
        <p className="text-terminal-dim text-xs">University of Pristina, 2018</p>
      </div>
      <div className="mt-4">
        <p className="text-terminal-keyword">Certifications:</p>
        <div className="pl-4 mt-1 space-y-1">
          <p className="text-sm"><span className="text-terminal-success">✓</span> <span className="text-foreground/80">HashiCorp Terraform Associate (003)</span> <span className="text-terminal-dim">— Mar 2025</span></p>
          <p className="text-sm"><span className="text-terminal-success">✓</span> <span className="text-foreground/80">Google Associate Cloud Engineer</span> <span className="text-terminal-dim">— Aug 2025</span></p>
        </div>
      </div>
    </div>
  </div>
);

const renderContact = () => (
  <div className="space-y-2">
    <p className="text-terminal-comment">{"// cat .env.contact"}</p>
    <div className="space-y-1 text-sm">
      <p><span className="text-terminal-keyword">EMAIL</span><span className="text-terminal-dim">=</span><a href="mailto:shefqetsalihu123@gmail.com" className="text-terminal-string hover:underline">shefqetsalihu123@gmail.com</a></p>
      <p><span className="text-terminal-keyword">PHONE</span><span className="text-terminal-dim">=</span><span className="text-terminal-highlight">+38349610533</span></p>
      <p><span className="text-terminal-keyword">LINKEDIN</span><span className="text-terminal-dim">=</span><a href="https://linkedin.com/in/shefqetsalihu" target="_blank" rel="noopener" className="text-terminal-string hover:underline">linkedin.com/in/shefqetsalihu</a></p>
      <p><span className="text-terminal-keyword">GITHUB</span><span className="text-terminal-dim">=</span><a href="https://github.com/sheeffii" target="_blank" rel="noopener" className="text-terminal-string hover:underline">github.com/sheeffii</a></p>
      <p><span className="text-terminal-keyword">LOCATION</span><span className="text-terminal-dim">=</span><span className="text-terminal-highlight">Pristina, Kosovo</span></p>
    </div>
  </div>
);

const renderNeofetch = () => (
  <div className="flex gap-6 items-start">
    <pre className="text-terminal-success text-xs leading-tight shrink-0">{`
   ╔═══════════╗
   ║  ░█▀▀░█░█ ║
   ║  ░▀▀█░█▀█ ║
   ║  ░▀▀▀░▀░▀ ║
   ╚═══════════╝`}</pre>
    <div className="text-sm space-y-0.5">
      <p><span className="text-terminal-highlight">shefqet</span><span className="text-terminal-dim">@</span><span className="text-terminal-highlight">portfolio</span></p>
      <p className="text-terminal-dim">─────────────────</p>
      <p><span className="text-terminal-keyword">OS</span><span className="text-terminal-dim">: </span><span className="text-foreground/80">DevOps Linux x86_64</span></p>
      <p><span className="text-terminal-keyword">Host</span><span className="text-terminal-dim">: </span><span className="text-foreground/80">Pristina, Kosovo</span></p>
      <p><span className="text-terminal-keyword">Uptime</span><span className="text-terminal-dim">: </span><span className="text-foreground/80">3+ years in DevOps</span></p>
      <p><span className="text-terminal-keyword">Shell</span><span className="text-terminal-dim">: </span><span className="text-foreground/80">bash 5.2.15</span></p>
      <p><span className="text-terminal-keyword">Packages</span><span className="text-terminal-dim">: </span><span className="text-foreground/80">Docker, K8s, Terraform, Ansible</span></p>
      <p><span className="text-terminal-keyword">Certs</span><span className="text-terminal-dim">: </span><span className="text-foreground/80">Terraform Associate, GCP ACE</span></p>
      <div className="flex gap-1 mt-2">
        {["bg-red-500","bg-green-500","bg-yellow-500","bg-blue-500","bg-purple-500","bg-cyan-500","bg-white","bg-orange-500"].map((c,i)=>(
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
      </div>
    </div>
  </div>
);

const renderLs = () => (
  <div className="flex flex-wrap gap-x-6 gap-y-1">
    <span className="text-terminal-keyword">projects/</span>
    <span className="text-foreground/80">README.md</span>
    <span className="text-foreground/80">about.json</span>
    <span className="text-foreground/80">skills.yml</span>
    <span className="text-terminal-dim">.env.contact</span>
    <span className="text-terminal-dim">education.md</span>
    <span className="text-terminal-dim">.bashrc</span>
    <span className="text-terminal-dim">.gitconfig</span>
    <span className="text-terminal-success">deploy.sh</span>
  </div>
);

type FsNode =
  | { type: "dir"; children: Record<string, FsNode> }
  | { type: "file"; kind: "about" | "skills" | "experience" | "education" | "contact" | "text"; content?: string };

const FS: FsNode = {
  type: "dir",
  children: {
    "README.md": { type: "file", kind: "text", content: "Welcome. Try: cat about.json" },
    "about.json": { type: "file", kind: "about" },
    "skills.yml": { type: "file", kind: "skills" },
    "experience.log": { type: "file", kind: "experience" },
    "education.md": { type: "file", kind: "education" },
    ".env.contact": { type: "file", kind: "contact" },
    projects: {
      type: "dir",
      children: {
        "deploy.sh": { type: "file", kind: "text", content: "#!/usr/bin/env bash\n# demo file\n" },
        "pipelines.md": { type: "file", kind: "text", content: "CI/CD notes: build → test → scan → deploy\n" },
      },
    },
  },
};

function splitPath(p: string) {
  const cleaned = p.trim().replaceAll("\\", "/");
  return cleaned.split("/").filter((x) => x.length > 0);
}

function normalizeCwd(parts: string[]) {
  const out: string[] = [];
  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return out;
}

function resolvePath(cwd: string[], inputPath: string) {
  const raw = inputPath.trim();
  if (!raw) return cwd;
  const absolute = raw.startsWith("/");
  const parts = splitPath(raw);
  return normalizeCwd(absolute ? parts : [...cwd, ...parts]);
}

function getNode(pathParts: string[]): FsNode | null {
  let node: FsNode = FS;
  for (const p of pathParts) {
    if (node.type !== "dir") return null;
    node = node.children[p];
    if (!node) return null;
  }
  return node;
}

function listDir(pathParts: string[]) {
  const node = getNode(pathParts);
  if (!node) return { ok: false as const, error: "No such file or directory" };
  if (node.type !== "dir") return { ok: false as const, error: "Not a directory" };
  const entries = Object.keys(node.children).sort((a, b) => a.localeCompare(b));
  return { ok: true as const, entries };
}

function completePath(cwd: string[], partial: string) {
  const raw = partial.trim();
  const isAbs = raw.startsWith("/");
  const parts = raw === "" ? [] : raw.replaceAll("\\", "/").split("/");
  const baseParts = parts.slice(0, -1).filter(Boolean);
  const prefix = (parts.at(-1) ?? "").trim();
  const dirParts = resolvePath(isAbs ? [] : cwd, (isAbs ? "/" : "") + baseParts.join("/"));
  const dir = getNode(dirParts);
  if (!dir || dir.type !== "dir") return [];
  return Object.keys(dir.children)
    .filter((k) => k.toLowerCase().startsWith(prefix.toLowerCase()))
    .map((k) => {
      const child = dir.children[k];
      const suffix = child.type === "dir" ? "/" : "";
      const full = [...baseParts, k + suffix].join("/");
      return (isAbs ? "/" : "") + full;
    });
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { content: <p className="text-terminal-comment">{"// Welcome. Type 'help' for commands. Try: ls, cat about.json"}</p>, type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userFiles, setUserFiles] = useState<Record<string, string>>({});

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();
    const [verbRaw, ...restRaw] = trimmed.split(/\s+/);
    const verb = (verbRaw ?? "").toLowerCase();
    const rest = restRaw.join(" ");

    const newLines: Line[] = [
      ...lines,
      {
        content: (
          <div className="flex items-center gap-2">
            <span className="text-terminal-prompt font-semibold">shefqet@portfolio</span>
            <span className="text-terminal-dim">:</span>
            <span className="text-terminal-string">~</span>
            <span className="text-terminal-dim">$</span>
            <span className="text-foreground">{cmd}</span>
          </div>
        ),
        type: "input",
      },
    ];

    if (verb === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    let output: React.ReactNode;
    if (verb === "help") output = renderHelp();
    else if (verb === "neofetch") output = renderNeofetch();
    else if (verb === "pwd") output = <p className="text-foreground/80">/home/shefqet/portfolio{cwd.length ? `/${cwd.join("/")}` : ""}</p>;
    else if (verb === "whoami") output = <p className="text-terminal-highlight">shefqet</p>;
    else if (verb === "date") output = <p className="text-foreground/80">{new Date().toString()}</p>;
    else if (verb === "uptime") {
      output = (
        <div className="text-sm">
          <p className="text-foreground/80">
            up 3 years, 6 months, load average: <span className="text-terminal-success">0.42</span>, <span className="text-terminal-success">0.38</span>, <span className="text-terminal-success">0.35</span>
          </p>
          <p className="text-terminal-dim mt-1">STATUS: caffeinated and deploying</p>
        </div>
      );
    } else if (verb === "ls") {
      const target = rest.trim();
      const targetParts = resolvePath(cwd, target);
      const listed = listDir(target ? targetParts : cwd);
      if (!listed.ok) {
        output = <p className="text-terminal-error">ls: {target || "."}: {listed.error}</p>;
      } else {
        output = (
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {listed.entries.map((e) => {
              const node = getNode([...targetParts, e]) ?? getNode([...cwd, e]);
              const isDir = node?.type === "dir";
              return (
                <span key={e} className={isDir ? "text-terminal-keyword" : "text-foreground/80"}>
                  {e}{isDir ? "/" : ""}
                </span>
              );
            })}
          </div>
        );
      }
    } else if (verb === "cd") {
      const target = rest.trim();
      const next = resolvePath(cwd, target || "/");
      const node = getNode(next);
      if (!node) output = <p className="text-terminal-error">cd: {target}: No such file or directory</p>;
      else if (node.type !== "dir") output = <p className="text-terminal-error">cd: {target}: Not a directory</p>;
      else {
        setCwd(next);
        output = <p className="text-terminal-dim"> </p>;
      }
    } else if (verb === "touch") {
      const name = rest.trim();
      if (!name) output = <p className="text-terminal-error">touch: missing file operand</p>;
      else {
        const path = resolvePath(cwd, name);
        const key = "/" + path.join("/");
        setUserFiles((prev) => ({ ...prev, [key]: "" }));
        output = <p className="text-terminal-dim"> </p>;
      }
    } else if (verb === "cat") {
      const argRaw = rest.trim();
      if (!argRaw) {
        output = (
          <p className="text-terminal-error">
            cat: missing operand. Try: <span className="text-terminal-highlight">cat about.json</span>
          </p>
        );
      } else {
        const path = resolvePath(cwd, argRaw);
        const key = "/" + path.join("/");
        if (key in userFiles) {
          output = <pre className="text-xs text-foreground/80 whitespace-pre-wrap">{userFiles[key]}</pre>;
        } else {
          const node = getNode(path);
          if (!node) output = <p className="text-terminal-error">cat: {argRaw}: No such file</p>;
          else if (node.type !== "file") output = <p className="text-terminal-error">cat: {argRaw}: Is a directory</p>;
          else {
            switch (node.kind) {
              case "about":
                output = renderAbout();
                break;
              case "skills":
                output = renderSkills();
                break;
              case "experience":
                output = renderExperience();
                break;
              case "education":
                output = renderEducation();
                break;
              case "contact":
                output = renderContact();
                break;
              case "text":
                output = <pre className="text-xs text-foreground/80 whitespace-pre-wrap">{node.content ?? ""}</pre>;
                break;
              default:
                output = <p className="text-terminal-error">cat: unsupported file</p>;
            }
          }
        }
      }
    } else if (lower === "sudo") {
      output = (
        <div className="space-y-1">
          <p className="text-terminal-error">Permission denied</p>
          <p className="text-terminal-dim text-xs">This incident will be reported... to nobody.</p>
        </div>
      );
    } else if (lower === "exit") {
      output = <p className="text-terminal-dim">There is no escape. You're stuck admiring this portfolio forever.</p>;
    } else {
      output = (
        <p className="text-terminal-error">
          bash: {lower}: command not found. Type <span className="text-terminal-highlight">'help'</span> for available commands.
        </p>
      );
    }

    newLines.push({ content: output, type: "output" });
    setLines(newLines);
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const current = input.trim();
      const lower = current.toLowerCase();
      if (!lower) return;

      const parts = lower.split(/\s+/);
      const [verb, ...rest] = parts;
      const arg = rest.join(" ");

      const showMatches = (matches: string[]) => {
        setLines((prev) => [
          ...prev,
          { content: <p className="text-terminal-dim">{matches.join("  ")}</p>, type: "output" },
        ]);
      };

      if (verb === "cat" || verb === "cd" || verb === "ls") {
        const matches = completePath(cwd, arg);
        if (matches.length === 1) setInput(`${verb} ${matches[0]}`);
        else if (matches.length > 1) showMatches(matches);
        return;
      }

      // Default command autocomplete
      const allCommands = Object.keys(COMMANDS);
      const matches = allCommands.filter((c) => c.startsWith(lower));

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        let prefix = matches[0];
        for (const m of matches) {
          while (!m.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
          }
        }
        if (prefix.length > current.length) {
          setInput(prefix);
        } else {
          showMatches(matches);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      if (history[newIndex]) {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          shefqet@portfolio: ~{cwd.length ? `/${cwd.join("/")}` : ""}
        </span>
      </div>
      {/* Terminal body */}
      <div ref={scrollRef} className="p-4 h-[420px] overflow-y-auto space-y-3 text-sm relative">
        <div className="absolute inset-0 scanline" />
        {lines.map((line, i) => (
          <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 30}ms` }}>
            {line.content}
          </div>
        ))}
        <TerminalPrompt
          value={input}
          onChange={setInput}
          onSubmit={() => processCommand(input)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef as React.RefObject<HTMLInputElement>}
        />
      </div>
    </div>
  );
}
