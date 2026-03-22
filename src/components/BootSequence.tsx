import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "BIOS v3.2.1 — Shefqet Salihu Portfolio System", delay: 0 },
  { text: "Detecting hardware... OK", delay: 200 },
  { text: "Loading kernel modules... OK", delay: 400 },
  { text: "Mounting /dev/skills... OK", delay: 600 },
  { text: "Initializing CI/CD subsystem... OK", delay: 800 },
  { text: "Starting container runtime... OK", delay: 1000 },
  { text: "Cloud infrastructure ready [AWS, GCP]", delay: 1200 },
  { text: "", delay: 1400 },
  { text: "System ready. Welcome.", delay: 1600 },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, line.delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="w-full max-w-2xl px-8">
        <div className="space-y-1 text-sm">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {line.text === "" ? (
                <br />
              ) : i === BOOT_LINES.length - 1 ? (
                <p className="text-primary terminal-glow font-semibold mt-2">{line.text}</p>
              ) : (
                <p>
                  <span className="text-terminal-dim">[</span>
                  <span className="text-terminal-success"> OK </span>
                  <span className="text-terminal-dim">] </span>
                  <span className="text-foreground/70">{line.text}</span>
                </p>
              )}
            </div>
          ))}
          {visibleLines < BOOT_LINES.length && (
            <span className="inline-block w-2 h-4 bg-terminal-cursor animate-blink" />
          )}
        </div>
      </div>
    </div>
  );
}
