import { useEffect, useState, useCallback } from "react";
import BootSequence from "@/components/BootSequence";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CommandPalette from "@/components/CommandPalette";
import { ProjectCaseStudyDialog } from "@/components/ProjectCaseStudyDialog";
import { IncidentSimulatorDialog } from "@/components/IncidentSimulatorDialog";
import { PortfolioActionsProvider, type TerminalSkin } from "@/contexts/portfolio-actions";
import { useTheme } from "next-themes";
import SiteLayout from "@/components/SiteLayout";

export default function Index() {
  const [booted, setBooted] = useState(false);
  const handleComplete = useCallback(() => setBooted(true), []);
  const [projectSlug, setProjectSlug] = useState<string | null>(null);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const { setTheme } = useTheme();

  const setSkin = useCallback((skin: TerminalSkin) => {
    const root = document.documentElement;
    if (skin === "green") root.removeAttribute("data-skin");
    else root.setAttribute("data-skin", skin);
    localStorage.setItem("portfolio:shell-skin", skin);
  }, []);

  const openProjectBySlug = useCallback((slug: string) => setProjectSlug(slug), []);
  const openIncidentSimulator = useCallback(() => setIncidentOpen(true), []);

  useEffect(() => {
    const savedSkin = (localStorage.getItem("portfolio:shell-skin") ?? "green") as TerminalSkin;
    setSkin(savedSkin);
  }, [setSkin]);

  const skipBoot = typeof window !== "undefined" && localStorage.getItem("portfolio:skip-boot") === "1";
  const bootReady = booted || skipBoot;

  if (!bootReady) {
    return <BootSequence onComplete={handleComplete} />;
  }

  return (
    <PortfolioActionsProvider
      openProjectBySlug={openProjectBySlug}
      openIncidentSimulator={openIncidentSimulator}
      setTheme={setTheme}
      setSkin={setSkin}
    >
      <SiteLayout>
        <CommandPalette />

        <HeroSection />
        <div id="experience"><ExperienceSection /></div>
        <div id="skills"><SkillsSection /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="contact"><ContactSection /></div>

        <ProjectCaseStudyDialog
          open={projectSlug !== null}
          onOpenChange={(o) => !o && setProjectSlug(null)}
          projectSlug={projectSlug}
        />

        <IncidentSimulatorDialog open={incidentOpen} onOpenChange={setIncidentOpen} />
      </SiteLayout>
    </PortfolioActionsProvider>
  );
}
