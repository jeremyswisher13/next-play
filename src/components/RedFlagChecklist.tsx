"use client";

import { Check } from "lucide-react";
import { redFlags, screenedCategories } from "@/content/redFlags";
import { CheckboxRow } from "@/components/ui/checkbox-row";
import { useIntake } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { RedFlagCategory } from "@/lib/types";

const headings: Record<RedFlagCategory, { en: string; es: string } | null> = {
  global: null,
  concussion: { en: "Concussion symptoms", es: "Síntomas de conmoción" },
  heat: { en: "Heat-related symptoms", es: "Síntomas relacionados con el calor" },
};

/**
 * Shows global warning signs always, plus concussion symptoms (when the region
 * is Head) and heat symptoms (when region is Heat illness or mechanism is Heat).
 */
export function RedFlagChecklist() {
  const { intake, toggleRedFlag, clearRedFlags } = useIntake();
  const { t, ui } = useLocale();

  const categories: RedFlagCategory[] = screenedCategories(
    intake.bodyRegion,
    intake.mechanism,
  );

  const noneSelected = intake.redFlags.length === 0;

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const flags = redFlags.filter((f) => f.category === category);
        const heading = headings[category];
        return (
          <div key={category} className="space-y-3">
            {heading ? (
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted">
                {t(heading)}
              </h3>
            ) : null}
            {flags.map((flag) => (
              <CheckboxRow
                key={flag.id}
                checked={intake.redFlags.includes(flag.id)}
                onToggle={() => toggleRedFlag(flag.id)}
                label={t(flag.label)}
                tone="alert"
              />
            ))}
          </div>
        );
      })}

      <button
        type="button"
        onClick={clearRedFlags}
        aria-pressed={noneSelected}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition-colors min-h-14",
          noneSelected
            ? "border-monitor bg-monitor-soft ring-1 ring-monitor"
            : "border-line hover:bg-canvas",
        )}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
            noneSelected ? "border-monitor bg-monitor text-white" : "border-line",
          )}
          aria-hidden="true"
        >
          {noneSelected ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
        </span>
        <span className="font-semibold text-ink">{ui.intake.redFlagsNone}</span>
      </button>
    </div>
  );
}
