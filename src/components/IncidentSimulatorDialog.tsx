import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "Alert",
    line: "[pager] ALERT: api_error_rate > 5% for 5m",
    hint: "A good on-call response starts with confirming blast radius.",
  },
  {
    title: "Triage",
    line: "[triage] Check dashboards (latency, 5xx, saturation)",
    hint: "Look for correlation: deploys, spikes, downstream dependency issues.",
  },
  {
    title: "Mitigate",
    line: "[mitigation] Roll back deployment + scale up replicas",
    hint: "Stop the bleeding first, then investigate deeper.",
  },
  {
    title: "Postmortem",
    line: "[postmortem] Root cause: bad cache config + missing canary guardrail",
    hint: "Write action items: canary, config validation, better SLO alerts.",
  },
] as const;

export function IncidentSimulatorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setStep(0);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display">Incident simulator</DialogTitle>
          <DialogDescription>Quick DevOps credibility demo: alert → triage → mitigate → postmortem.</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-3">
          {STEPS.slice(0, step + 1).map((s, i) => (
            <div key={s.title} className="space-y-1">
              <p className="text-terminal-keyword text-xs">{`// ${s.title.toUpperCase()}`}</p>
              <p className={i === 0 ? "text-terminal-error text-xs font-mono" : "text-terminal-string text-xs font-mono"}>{s.line}</p>
              <p className="text-terminal-dim text-[11px]">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Step {step + 1}/{STEPS.length}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Back
            </Button>
            <Button size="sm" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

