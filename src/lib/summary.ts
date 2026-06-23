import type { Intake, Locale, LocalizedText, TriageResult } from "@/lib/types";
import { ui as uiDict } from "@/content/ui";
import { getBodyRegion } from "@/content/bodyRegions";
import { getMechanism } from "@/content/mechanisms";
import { getRedFlag, screenedRedFlags } from "@/content/redFlags";
import { roles } from "@/content/roles";
import { functionalQuestions } from "@/content/functionalQuestions";

export interface SummaryRow {
  label: string;
  value: string;
}

function formatDateTime(value: string | undefined, locale: Locale): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" });
}

/**
 * Build the clinician handoff summary as labelled rows. Used both for the
 * on-screen summary and (via summaryToText) for copy / share / print.
 */
export function buildSummaryRows(
  intake: Intake,
  result: TriageResult,
  locale: Locale,
  now: Date = new Date(),
): SummaryRow[] {
  const ui = uiDict[locale];
  const f = ui.summary.fields;
  const t = (x: LocalizedText) => (locale === "es" ? x.es : x.en);
  const np = ui.common.notProvided;

  const answerLabel = (key: string, val: string): string => {
    if (key === "trend") {
      return val === "improving"
        ? ui.functional.improving
        : val === "unchanged"
          ? ui.functional.unchanged
          : ui.functional.worsening;
    }
    return val === "yes"
      ? ui.common.yes
      : val === "no"
        ? ui.common.no
        : ui.common.unsure;
  };

  const functionalLines = functionalQuestions
    .map((q) => {
      const v = intake.functional[q.key];
      if (!v) return null;
      return `${ui.functional[q.key]} ${answerLabel(q.key, v)}`;
    })
    .filter((x): x is string => Boolean(x));

  // Partition the flags that were actually SCREENED (shown) into present /
  // absent, so the clinician sees what was checked-and-negative vs. never asked.
  const screened = screenedRedFlags(intake.bodyRegion, intake.mechanism);
  const presentFlags = screened
    .filter((rf) => intake.redFlags.includes(rf.id))
    .map((rf) => t(rf.label));
  const absentFlags = screened
    .filter((rf) => !intake.redFlags.includes(rf.id))
    .map((rf) => t(rf.label));

  const roleOpt = roles.find((r) => r.id === intake.role);
  const region = getBodyRegion(intake.bodyRegion);
  const mech = getMechanism(intake.mechanism);

  const pathwayLabel = ui.pathwayLabels[result.pathway];
  const reasons = result.reasons.join("; ");

  const rows: SummaryRow[] = [
    {
      label: f.generated,
      value: now.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
    { label: f.role, value: roleOpt ? t(roleOpt.label) : np },
    {
      label: f.language,
      value: locale === "es" ? ui.language.es : ui.language.en,
    },
    {
      label: f.age,
      value:
        intake.athlete.age != null
          ? `${intake.athlete.age} ${ui.summary.yearsOld}`
          : np,
    },
    { label: f.sport, value: intake.athlete.sport?.trim() || np },
    {
      label: f.level,
      value: intake.athlete.level ? ui.levels[intake.athlete.level] : np,
    },
    { label: f.region, value: region ? t(region.label) : np },
    { label: f.mechanism, value: mech ? t(mech.label) : np },
    {
      label: f.injuryWhen,
      value: formatDateTime(intake.athlete.injuryDateTime, locale) ?? np,
    },
    {
      label: f.redFlagsPresent,
      value: presentFlags.length
        ? presentFlags.join("\n")
        : ui.summary.noRedFlags,
    },
    {
      label: f.redFlagsAbsent,
      value: absentFlags.length ? absentFlags.join("\n") : np,
    },
    {
      label: f.functional,
      value: functionalLines.length ? functionalLines.join("\n") : np,
    },
    {
      label: f.pathway,
      value: reasons ? `${pathwayLabel} — ${reasons}` : pathwayLabel,
    },
    {
      label: f.concerns,
      value: intake.concerns?.trim() || ui.summary.noConcerns,
    },
  ];

  // If the injury was re-checked, append a "change since first check" row.
  if (intake.baseline) {
    const b = intake.baseline;
    const labelsFor = (ids: string[]) =>
      ids
        .map((id) => {
          const rf = getRedFlag(id);
          return rf ? t(rf.label) : null;
        })
        .filter((x): x is string => Boolean(x));
    const newFlags = labelsFor(
      intake.redFlags.filter((id) => !b.redFlags.includes(id)),
    );
    const resolved = labelsFor(
      b.redFlags.filter((id) => !intake.redFlags.includes(id)),
    );
    const nowTrend = intake.functional.trend
      ? answerLabel("trend", intake.functional.trend)
      : np;
    rows.push({
      label: f.rechecked,
      value: [
        `${ui.summary.recheckFirst}: ${formatDateTime(b.capturedAt, locale) ?? np}`,
        `${ui.summary.recheckNow}: ${nowTrend}`,
        `${ui.summary.recheckNew}: ${newFlags.length ? newFlags.join(", ") : ui.common.none}`,
        `${ui.summary.recheckResolved}: ${resolved.length ? resolved.join(", ") : ui.common.none}`,
      ].join("\n"),
    });
  }

  return rows;
}

/** Flatten the summary into copy/share/print-friendly plain text. */
export function summaryToText(
  intake: Intake,
  result: TriageResult,
  locale: Locale,
  now: Date = new Date(),
): string {
  const ui = uiDict[locale];
  const rows = buildSummaryRows(intake, result, locale, now);
  const header = `${ui.appName} — ${ui.summary.title}`;
  const body = rows
    .map((r) => `${r.label}: ${r.value.replace(/\n/g, "; ")}`)
    .join("\n");
  return `${header}\n\n${body}\n\n${ui.summary.disclaimerLine}`;
}
