"use client";

import { functionalQuestions } from "@/content/functionalQuestions";
import { useIntake } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { FunctionalAnswers } from "@/lib/types";

interface Option {
  value: string;
  label: string;
}

function Segmented({
  options,
  value,
  onChange,
  label,
}: {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-3 gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-12 rounded-xl border px-2 py-2 text-sm font-semibold transition-colors",
              active
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-ink-soft hover:bg-canvas",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function FunctionalQuestions() {
  const { intake, updateFunctional } = useIntake();
  const { ui } = useLocale();

  const yesNo: Option[] = [
    { value: "yes", label: ui.common.yes },
    { value: "no", label: ui.common.no },
    { value: "unsure", label: ui.common.unsure },
  ];
  const trend: Option[] = [
    { value: "improving", label: ui.functional.improving },
    { value: "unchanged", label: ui.functional.unchanged },
    { value: "worsening", label: ui.functional.worsening },
  ];

  return (
    <div className="space-y-5">
      {functionalQuestions.map((q) => {
        const options = q.kind === "yesno" ? yesNo : trend;
        const current = intake.functional[q.key];
        return (
          <div key={q.key}>
            <p className="mb-2 font-medium text-ink">{ui.functional[q.key]}</p>
            <Segmented
              label={ui.functional[q.key]}
              options={options}
              value={current}
              onChange={(value) =>
                updateFunctional({ [q.key]: value } as Partial<FunctionalAnswers>)
              }
            />
          </div>
        );
      })}
    </div>
  );
}
