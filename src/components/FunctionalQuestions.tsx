"use client";

import { functionalQuestionsFor } from "@/content/functionalQuestions";
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
          <label
            key={opt.value}
            className={cn(
              "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 py-2 text-center text-sm font-semibold transition-colors",
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
              active
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-ink-soft hover:bg-canvas",
            )}
          >
            <input
              type="radio"
              name={label}
              checked={active}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
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
      {functionalQuestionsFor(intake.bodyRegion).map((q) => {
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
