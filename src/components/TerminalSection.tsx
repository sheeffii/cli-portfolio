import { useEffect, useRef, useState } from "react";
import Terminal from "./Terminal";

export default function TerminalSection() {
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
      <div className="max-w-4xl mx-auto">
        {visible && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">interactive-cli --start</span>
            </div>
            <Terminal />
            <p className="text-terminal-comment text-xs mt-4 text-center">
              {"// Try: help, about, skills, experience, education, contact, neofetch"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
