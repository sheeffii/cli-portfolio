import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border border-border bg-card p-8 relative overflow-hidden">
            <div className="absolute inset-0 scanline opacity-40 pointer-events-none" />
            <p className="text-terminal-comment text-sm mb-3">{"// 404: route not found"}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Command not found</h1>
            <p className="text-sm text-muted-foreground mt-4">
              The path <span className="text-foreground/80 font-mono">{location.pathname}</span> doesn’t exist.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/">Return home</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/blog">Go to blog</Link>
              </Button>
              <Button asChild variant="secondary">
                <a href="/#projects">View projects</a>
              </Button>
            </div>

            <div className="mt-8 pt-4 border-t border-border/70">
              <p className="text-xs text-terminal-dim">
                Tip: use <span className="text-foreground">Ctrl+K</span> on the homepage for quick navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
