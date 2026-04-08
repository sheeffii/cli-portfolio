import { useEffect, useMemo, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { PROJECTS } from "@/data/projects";
import { usePortfolioActions, type PortfolioSectionId, type TerminalSkin } from "@/contexts/portfolio-actions";

type Action = {
  group: string;
  label: string;
  keywords?: string;
  shortcut?: string;
  run: () => void;
};

const SECTION_ACTIONS: Array<{ id: PortfolioSectionId; label: string; shortcut: string }> = [
  { id: "experience", label: "Go to Experience", shortcut: "G E" },
  { id: "skills", label: "Go to Skills", shortcut: "G S" },
  { id: "projects", label: "Go to Projects", shortcut: "G P" },
  { id: "contact", label: "Go to Contact", shortcut: "G C" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { scrollToSection, openProjectBySlug, openIncidentSimulator, copyToClipboard, setTheme, setSkin } = usePortfolioActions();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const actions = useMemo<Action[]>(() => {
    const base: Action[] = [
      ...SECTION_ACTIONS.map((s) => ({
        group: "Navigate",
        label: s.label,
        keywords: `goto go ${s.id}`,
        shortcut: s.shortcut,
        run: () => scrollToSection(s.id),
      })),
      {
        group: "Actions",
        label: "Copy Email",
        keywords: "copy email contact",
        shortcut: "C E",
        run: () => void copyToClipboard("Email", "shefqetsalihu123@gmail.com"),
      },
      {
        group: "Actions",
        label: "Copy LinkedIn",
        keywords: "copy linkedin contact",
        shortcut: "C L",
        run: () => void copyToClipboard("LinkedIn", "https://linkedin.com/in/shefqetsalihu"),
      },
      {
        group: "Appearance",
        label: "Theme: Dark",
        keywords: "theme dark",
        run: () => setTheme("dark"),
      },
      {
        group: "Appearance",
        label: "Theme: Light",
        keywords: "theme light",
        run: () => setTheme("light"),
      },
      {
        group: "Appearance",
        label: "Theme: System",
        keywords: "theme system",
        run: () => setTheme("system"),
      },
      ...(["green", "amber", "minimal", "cyan"] as TerminalSkin[]).map((skin) => ({
        group: "Appearance",
        label: `Terminal skin: ${skin}`,
        keywords: `skin ${skin} terminal`,
        run: () => setSkin(skin),
      })),
      {
        group: "Fun",
        label: "Incident simulator",
        keywords: "simulate outage incident postmortem",
        run: () => openIncidentSimulator(),
      },
    ];

    const projectActions: Action[] = PROJECTS.map((p) => ({
      group: "Projects",
      label: `Open: ${p.title}`,
      keywords: `${p.title} ${p.tag} ${p.tech.join(" ")}`,
      run: () => openProjectBySlug(p.slug),
    }));

    return [...base, ...projectActions];
  }, [copyToClipboard, openIncidentSimulator, openProjectBySlug, scrollToSection, setSkin, setTheme]);

  const grouped = useMemo(() => {
    const map = new Map<string, Action[]>();
    for (const a of actions) {
      const arr = map.get(a.group) ?? [];
      arr.push(a);
      map.set(a.group, arr);
    }
    return map;
  }, [actions]);

  const run = (a: Action) => {
    setOpen(false);
    a.run();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command… (Ctrl+K)" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Array.from(grouped.entries()).map(([group, items], idx) => (
          <div key={group}>
            {idx > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {items.map((a) => (
                <CommandItem key={`${group}-${a.label}`} value={`${a.label} ${a.keywords ?? ""}`} onSelect={() => run(a)}>
                  <span>{a.label}</span>
                  {a.shortcut && <CommandShortcut>{a.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

