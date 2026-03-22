import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "Email", value: "shefqetsalihu123@gmail.com", href: "mailto:shefqetsalihu123@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/shefqetsalihu", href: "https://linkedin.com/in/shefqetsalihu" },
    { label: "GitHub", value: "github.com/sheeffii", href: "https://github.com/sheeffii" },
    { label: "Phone", value: "+383 49 610 533", href: "tel:+38349610533" },
  ];

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-4xl mx-auto">
        {visible && (
          <>
            <div className="flex items-center gap-3 mb-12 animate-fade-in-up">
              <span className="text-terminal-prompt text-sm font-semibold">$</span>
              <span className="text-foreground text-sm">cat .env.contact</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  className="group p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-300 animate-fade-in-up active:scale-[0.98]"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <p className="text-terminal-keyword text-xs mb-1 font-display">{link.label}</p>
                  <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors duration-200 break-all">
                    {link.value}
                  </p>
                </a>
              ))}
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
