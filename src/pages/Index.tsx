import { useState, useCallback } from "react";
import BootSequence from "@/components/BootSequence";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Index() {
  const [booted, setBooted] = useState(false);
  const handleComplete = useCallback(() => setBooted(true), []);

  if (!booted) {
    return <BootSequence onComplete={handleComplete} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-24 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-primary terminal-glow">sh:~</span>
          <div className="flex gap-6">
            {["experience", "skills", "projects", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                ./{s}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <HeroSection />
      <div id="experience"><ExperienceSection /></div>
      <div id="skills"><SkillsSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="contact"><ContactSection /></div>
    </div>
  );
}
