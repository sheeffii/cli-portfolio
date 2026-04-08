import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TerminalSkin = "green" | "amber" | "cyan" | "minimal";

export default function AppearanceMenu() {
  const { theme, setTheme } = useTheme();
  const [skin, setSkinState] = useState<TerminalSkin>("green");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("portfolio:shell-skin") ?? "green") as TerminalSkin;
    setSkinState(saved);
    if (saved === "green") document.documentElement.removeAttribute("data-skin");
    else document.documentElement.setAttribute("data-skin", saved);

    const rm = localStorage.getItem("portfolio:reduce-motion") === "1";
    setReduceMotion(rm);
    if (rm) document.documentElement.classList.add("reduce-motion");
  }, []);

  const onSkin = (value: string) => {
    const s = value as TerminalSkin;
    setSkinState(s);
    if (s === "green") document.documentElement.removeAttribute("data-skin");
    else document.documentElement.setAttribute("data-skin", s);
    localStorage.setItem("portfolio:shell-skin", s);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="h-8 px-2.5 text-xs">
          <Paintbrush className="h-3.5 w-3.5" />
          Appearance
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme ?? "system"} onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Terminal skin</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={skin} onValueChange={onSkin}>
          <DropdownMenuRadioItem value="green">Green phosphor</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amber">Amber</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="minimal">Minimal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cyan">Cyan</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            localStorage.setItem("portfolio:skip-boot", "1");
          }}
        >
          Skip boot next time
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            const next = !reduceMotion;
            setReduceMotion(next);
            localStorage.setItem("portfolio:reduce-motion", next ? "1" : "0");
            document.documentElement.classList.toggle("reduce-motion", next);
          }}
        >
          {reduceMotion ? "Enable motion" : "Reduce motion"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

