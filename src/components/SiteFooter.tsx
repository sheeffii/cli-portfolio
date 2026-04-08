export default function SiteFooter() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-14 border-t border-border/60">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-xs text-terminal-dim">
          <span className="text-terminal-comment">{"// "}</span>
          Built with React + TypeScript · Designed like a terminal
        </div>
        <div className="text-xs text-terminal-dim">
          © {new Date().getFullYear()} Shefqet Salihu
        </div>
      </div>
    </footer>
  );
}

