"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { RoleSelector } from "@/components/RoleSelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CompetitionLevel, Locale } from "@/lib/types";

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink placeholder:text-muted focus-visible:border-brand";

const levelOrder: CompetitionLevel[] = [
  "recreational",
  "middleSchool",
  "highSchool",
  "club",
  "college",
  "adult",
];

type WhenChip = "justNow" | "earlierToday" | "yesterday" | "daysAgo";

/** Map a relative chip to a datetime-local value ("YYYY-MM-DDTHH:mm"). */
function whenToLocal(kind: WhenChip): string {
  const d = new Date();
  if (kind === "earlierToday") d.setHours(Math.max(0, d.getHours() - 4));
  if (kind === "yesterday") d.setDate(d.getDate() - 1);
  if (kind === "daysAgo") d.setDate(d.getDate() - 3);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function StartPage() {
  const router = useRouter();
  const { locale, setLocale, ui } = useLocale();
  const { intake, update, updateAthlete } = useIntake();
  const [whenChip, setWhenChip] = useState<WhenChip | null>(null);

  const whenChips: { kind: WhenChip; label: string }[] = [
    { kind: "justNow", label: ui.start.injuryJustNow },
    { kind: "earlierToday", label: ui.start.injuryEarlierToday },
    { kind: "yesterday", label: ui.start.injuryYesterday },
    { kind: "daysAgo", label: ui.start.injuryDaysAgo },
  ];

  function chooseLanguage(l: Locale) {
    setLocale(l);
    update({ locale: l });
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          {ui.start.title}
        </h1>
        <p className="mt-1 text-ink-soft">{ui.start.sub}</p>
      </header>

      {/* Role */}
      <section className="space-y-3">
        <h2 className="font-bold text-ink">{ui.start.roleLabel}</h2>
        <RoleSelector
          value={intake.role}
          onChange={(role) => update({ role })}
        />
      </section>

      {/* Language */}
      <section className="space-y-3">
        <h2 className="font-bold text-ink">{ui.start.languageLabel}</h2>
        <div role="radiogroup" className="grid grid-cols-2 gap-3">
          {(["en", "es"] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={locale === l}
              onClick={() => chooseLanguage(l)}
              className={cn(
                "min-h-14 rounded-xl border text-base font-semibold transition-colors",
                locale === l
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-ink-soft hover:bg-canvas",
              )}
            >
              {l === "en" ? ui.language.en : ui.language.es}
            </button>
          ))}
        </div>
      </section>

      {/* Athlete info */}
      <section className="space-y-4">
        <h2 className="font-bold text-ink">{ui.start.athleteTitle}</h2>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink-soft">
              {ui.start.age}{" "}
              <span className="text-muted">({ui.common.optional})</span>
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={100}
              className={inputClass}
              placeholder={ui.start.agePlaceholder}
              value={intake.athlete.age ?? ""}
              onChange={(e) =>
                updateAthlete({
                  age: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink-soft">
              {ui.start.sport}{" "}
              <span className="text-muted">({ui.common.optional})</span>
            </span>
            <input
              type="text"
              className={inputClass}
              placeholder={ui.start.sportPlaceholder}
              value={intake.athlete.sport ?? ""}
              onChange={(e) => updateAthlete({ sport: e.target.value })}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-soft">
            {ui.start.level}{" "}
            <span className="text-muted">({ui.common.optional})</span>
          </span>
          <select
            className={inputClass}
            value={intake.athlete.level ?? ""}
            onChange={(e) =>
              updateAthlete({
                level: (e.target.value || undefined) as
                  | CompetitionLevel
                  | undefined,
              })
            }
          >
            <option value="">{ui.start.levelPlaceholder}</option>
            {levelOrder.map((lvl) => (
              <option key={lvl} value={lvl}>
                {ui.levels[lvl]}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1 block text-sm font-medium text-ink-soft">
            {ui.start.injuryWhen}{" "}
            <span className="text-muted">({ui.common.optional})</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            {whenChips.map((c) => (
              <button
                key={c.kind}
                type="button"
                aria-pressed={whenChip === c.kind}
                onClick={() => {
                  setWhenChip(c.kind);
                  updateAthlete({ injuryDateTime: whenToLocal(c.kind) });
                }}
                className={cn(
                  "min-h-12 rounded-xl border px-3 text-sm font-semibold transition-colors",
                  whenChip === c.kind
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-surface text-ink-soft hover:bg-canvas",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-semibold text-brand">
              {ui.start.injuryExact}
            </summary>
            <input
              type="datetime-local"
              className={cn(inputClass, "mt-2")}
              value={intake.athlete.injuryDateTime ?? ""}
              onChange={(e) => {
                setWhenChip(null);
                updateAthlete({ injuryDateTime: e.target.value || undefined });
              }}
            />
          </details>
        </div>
      </section>

      <Button
        size="lg"
        disabled={!intake.role}
        onClick={() => router.push("/intake")}
      >
        {ui.start.beginCta}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}
