import React, { createContext, useCallback, useContext, useMemo } from "react";
import { toast } from "@/components/ui/sonner";

export type PortfolioSectionId = "experience" | "skills" | "projects" | "contact";

export type TerminalSkin = "green" | "amber" | "cyan" | "minimal";

export type PortfolioActions = {
  scrollToSection: (id: PortfolioSectionId) => void;
  openProjectBySlug: (slug: string) => void;
  openIncidentSimulator: () => void;
  copyToClipboard: (label: string, value: string) => Promise<void>;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setSkin: (skin: TerminalSkin) => void;
};

const PortfolioActionsContext = createContext<PortfolioActions | null>(null);

export function usePortfolioActions() {
  const ctx = useContext(PortfolioActionsContext);
  if (!ctx) throw new Error("usePortfolioActions must be used within PortfolioActionsProvider");
  return ctx;
}

type Props = {
  children: React.ReactNode;
  openProjectBySlug: (slug: string) => void;
  openIncidentSimulator: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setSkin: (skin: TerminalSkin) => void;
};

export function PortfolioActionsProvider({ children, openProjectBySlug, openIncidentSimulator, setTheme, setSkin }: Props) {
  const scrollToSection = useCallback((id: PortfolioSectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const copyToClipboard = useCallback(async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Copy failed");
    }
  }, []);

  const value = useMemo<PortfolioActions>(
    () => ({
      scrollToSection,
      openProjectBySlug,
      openIncidentSimulator,
      copyToClipboard,
      setTheme,
      setSkin,
    }),
    [copyToClipboard, openIncidentSimulator, openProjectBySlug, scrollToSection, setSkin, setTheme],
  );

  return <PortfolioActionsContext.Provider value={value}>{children}</PortfolioActionsContext.Provider>;
}

