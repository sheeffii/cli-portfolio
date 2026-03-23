import { useState, useRef, useEffect, useCallback } from "react";

const COMMANDS: Record<string, { description: string }> = {
  help: { description: "List available commands" },
  about: { description: "Who is Shefqet?" },
  skills: { description: "Technical skills" },
  experience: { description: "Work experience" },
  education: { description: "Education & certifications" },
  contact: { description: "Contact information" },
  clear: { description: "Clear terminal" },
  neofetch: { description: "System info" },
  ls: { description: "List directory contents" },
  pwd: { description: "Print working directory" },
  whoami: { description: "Current user" },
  date: { description: "Show current date" },
  uptime: { description: "Show career uptime" },
  cat: { description: "Read a file (try: cat README.md)" },
  echo: { description: "Echo a message" },
  sudo: { description: "Try it..." },
  cowsay: { description: "Let the cow speak" },
  fortune: { description: "Random DevOps wisdom" },
  matrix: { description: "Enter the matrix" },
};

const FS: Record<string, string | Record<string, string>> = {
  "README.md": "# Shefqet Salihu\n> DevOps Engineer | Cloud Enthusiast | Automation Junkie\n\nWelcome to my portfolio. Type 'help' to explore.",
  "about.json": '{\n  "name": "Shefqet Salihu",\n  "role": "DevOps Engineer",\n  "location": "Pristina, Kosovo"\n}',
  "skills.yml": "cloud:\n  - AWS\n  - Terraform\n  - Ansible\ncontainers:\n  - Docker\n  - Kubernetes\n  - Helm",
  ".env.contact": "EMAIL=shefqetsalihu123@gmail.com\nLINKEDIN=linkedin.com/in/shefqetsalihu\nGITHUB=github.com/sheeffii",
  ".bashrc": 'export PS1="shefqet@portfolio:~$ "\nalias deploy="git push origin main"\nalias yolo="git push --force"',
  ".gitconfig": "[user]\n  name = Shefqet Salihu\n  email = shefqetsalihu123@gmail.com\n[core]\n  editor = vim",
  "deploy.sh": "#!/bin/bash\necho 'Building...'\ndocker build -t portfolio .\nkubectl apply -f k8s/\necho 'Deployed! 🚀'",
  projects: {
    "gamemetrics/": "dir",
    "vigilant/": "dir",
    "vault-ha/": "dir",
  },
};

const FORTUNES = [
  "It works on my machine — so we'll ship your machine.",
  "There are only two hard things: cache invalidation, naming things, and off-by-one errors.",
  "A DevOps engineer walks into a bar... provisions 3 replicas and enables auto-scaling.",
  "YAML: Yet Another Misaligned Line.",
  "The cloud is just someone else's computer... that's on fire.",
  "git push --force: because history is written by the victors.",
  "Kubernetes: because your deployment wasn't complex enough.",
  "Terraform plan: looks great. Terraform apply: surprise!",
  "Docker: works on every machine except the one that matters.",
  "DNS: it's always DNS.",
];

interface Line {
  content: React.ReactNode;
  type: "input" | "output" | "error" | "system";
}

const TerminalPrompt = ({ value, onChange, onSubmit, onKeyDown, inputRef }: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
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
        if (e.key === "Enter") onSubmit();
        else onKeyDown(e);
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
  <div className="space-y-1">
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      <span className="text-terminal-keyword">projects/</span>
      <span className="text-foreground/80">README.md</span>
      <span className="text-foreground/80">about.json</span>
      <span className="text-foreground/80">skills.yml</span>
      <span className="text-terminal-dim">.env.contact</span>
      <span className="text-terminal-dim">.bashrc</span>
      <span className="text-terminal-dim">.gitconfig</span>
      <span className="text-terminal-success">deploy.sh</span>
    </div>
  </div>
);

const renderCowsay = (msg: string) => {
  const text = msg || "Moo! I'm a DevOps cow 🐄";
  const border = "─".repeat(text.length + 2);
  return (
    <pre className="text-terminal-highlight text-xs">
{` ┌${border}┐
 │ ${text} │
 └${border}┘
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
    </pre>
  );
};

const renderMatrix = () => (
  <div className="space-y-1">
    <p className="text-terminal-success font-bold">Wake up, Shefqet...</p>
    <p className="text-terminal-success">The Matrix has you...</p>
    <p className="text-terminal-success">Follow the white rabbit. 🐇</p>
    <pre className="text-terminal-success/60 text-xs leading-tight mt-2">
{`01001001 01110100 00100111 01110011
01100001 01101100 01110111 01100001
01111001 01110011 00100000 01000100
01001110 01010011 00101110 00101110`}
    </pre>
    <p className="text-terminal-dim text-xs mt-1">Knock knock, Neo. (It was DNS all along.)</p>
  </div>
);

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { content: <p className="text-terminal-comment">{"// Welcome to Shefqet's portfolio. Type 'help' for commands."}</p>, type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = cmd.trim().split(/\s+/);
    const base = parts[0]?.toLowerCase() || "";
    const args = parts.slice(1).join(" ");

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

    if (trimmed === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    let output: React.ReactNode;
    switch (base) {
      case "help": output = renderHelp(); break;
      case "about": output = renderAbout(); break;
      case "skills": output = renderSkills(); break;
      case "experience": output = renderExperience(); break;
      case "education": output = renderEducation(); break;
      case "contact": output = renderContact(); break;
      case "neofetch": output = renderNeofetch(); break;
      case "ls": output = renderLs(); break;
      case "pwd":
        output = <p className="text-foreground/80">/home/shefqet/portfolio</p>;
        break;
      case "whoami":
        output = <p className="text-terminal-highlight">shefqet — DevOps Engineer, breaker of YAML, tamer of pipelines</p>;
        break;
      case "date":
        output = <p className="text-foreground/80">{new Date().toString()}</p>;
        break;
      case "uptime":
        output = (
          <div className="text-sm">
            <p className="text-foreground/80">
              up 3 years, 6 months, load average: <span className="text-terminal-success">0.42</span>, <span className="text-terminal-success">0.38</span>, <span className="text-terminal-success">0.35</span>
            </p>
            <p className="text-terminal-dim mt-1">STATUS: caffeinated and deploying</p>
          </div>
        );
        break;
      case "cat": {
        const file = args;
        if (!file) {
          output = <p className="text-terminal-error">cat: missing file operand. Try: cat README.md</p>;
        } else if (FS[file] && typeof FS[file] === "string") {
          output = (
            <pre className="text-foreground/80 text-xs whitespace-pre-wrap">{FS[file] as string}</pre>
          );
        } else {
          output = <p className="text-terminal-error">cat: {file}: No such file or directory</p>;
        }
        break;
      }
      case "echo":
        output = <p className="text-foreground/80">{args || ""}</p>;
        break;
      case "sudo":
        output = (
          <div className="space-y-1">
            <p className="text-terminal-error">Permission denied: nice try though 😏</p>
            <p className="text-terminal-dim text-xs">This incident will be reported... to nobody.</p>
          </div>
        );
        break;
      case "cowsay":
        output = renderCowsay(args);
        break;
      case "fortune":
        output = (
          <div>
            <p className="text-terminal-comment">{"// DevOps wisdom of the day:"}</p>
            <p className="text-terminal-highlight mt-1 italic">"{FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}"</p>
          </div>
        );
        break;
      case "matrix":
        output = renderMatrix();
        break;
      case "rm":
        output = (
          <p className="text-terminal-error">
            {args.includes("-rf") ? "🔥 rm -rf /? Bold. But this portfolio is immutable. Try Terraform destroy instead." : "rm: operation not permitted on this portfolio"}
          </p>
        );
        break;
      case "vim":
      case "nano":
      case "vi":
        output = <p className="text-terminal-dim">Opening {base}... just kidding, this is a portfolio, not a server 😄</p>;
        break;
      case "exit":
        output = <p className="text-terminal-dim">There is no escape. You're stuck admiring this portfolio forever.</p>;
        break;
      case "ping":
        output = (
          <div className="space-y-0.5 text-xs">
            <p className="text-foreground/80">PING shefqet.dev (127.0.0.1): 56 data bytes</p>
            <p className="text-foreground/80">64 bytes from shefqet.dev: icmp_seq=0 ttl=64 time=<span className="text-terminal-success">0.042ms</span></p>
            <p className="text-foreground/80">64 bytes from shefqet.dev: icmp_seq=1 ttl=64 time=<span className="text-terminal-success">0.038ms</span></p>
            <p className="text-terminal-dim mt-1">--- shefqet.dev ping statistics ---</p>
            <p className="text-terminal-dim">2 packets transmitted, 2 received, 0% packet loss</p>
          </div>
        );
        break;
      default:
        output = (
          <p className="text-terminal-error">
            bash: {trimmed}: command not found. Type <span className="text-terminal-highlight">'help'</span> for available commands.
          </p>
        );
    }

    newLines.push({ content: output, type: "output" });
    setLines(newLines);
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;

      // Check if it's a cat command — autocomplete file names
      if (current.startsWith("cat ")) {
        const partial = current.slice(4);
        const files = Object.keys(FS).filter(f => typeof FS[f] === "string" && f.startsWith(partial));
        if (files.length === 1) {
          setInput("cat " + files[0]);
        } else if (files.length > 1) {
          // Show possible completions
          const newLines: Line[] = [
            ...lines,
            { content: <p className="text-terminal-dim">{files.join("  ")}</p>, type: "output" },
          ];
          setLines(newLines);
        }
        return;
      }

      // Autocomplete command names
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(current));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const newLines: Line[] = [
          ...lines,
          { content: <p className="text-terminal-dim">{matches.join("  ")}</p>, type: "output" },
        ];
        setLines(newLines);
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
        <span className="text-xs text-muted-foreground ml-2">shefqet@portfolio: ~</span>
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
