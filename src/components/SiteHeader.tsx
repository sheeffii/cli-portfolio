import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppearanceMenu from "@/components/AppearanceMenu";

export default function SiteHeader() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("home");

  const links = useMemo(
    () => [
      { id: "experience", label: "./experience", href: "/#experience" },
      { id: "skills", label: "./skills", href: "/#skills" },
      { id: "projects", label: "./projects", href: "/#projects" },
      { id: "contact", label: "./contact", href: "/#contact" },
    ],
    [],
  );

  useEffect(() => {
    if (!onHome) {
      if (pathname.startsWith("/blog")) setActive("blog");
      else setActive("home");
      return;
    }

    const ids = ["experience", "skills", "projects", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-24 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {onHome ? (
          <button
            type="button"
            className="text-sm font-semibold text-primary terminal-glow hover:opacity-90 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
          >
            sh:~
          </button>
        ) : (
          <Link className="text-sm font-semibold text-primary terminal-glow hover:opacity-90 transition-opacity" to="/">
            sh:~
          </Link>
        )}

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={[
                  "text-xs transition-colors duration-200",
                  active === l.id ? "text-primary" : "text-muted-foreground hover:text-primary",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/blog"
              className={[
                "text-xs transition-colors duration-200",
                active === "blog" ? "text-primary" : "text-muted-foreground hover:text-primary",
              ].join(" ")}
            >
              ./blog
            </Link>
          </div>

          <Link to="/blog" className="md:hidden text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
            ./blog
          </Link>

          <AppearanceMenu />
        </div>
      </div>
    </nav>
  );
}

