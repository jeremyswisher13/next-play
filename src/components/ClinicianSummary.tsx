"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareSummaryButton } from "@/components/ShareSummaryButton";
import { useLocale } from "@/lib/i18n";
import { buildSummaryRows, summaryToText } from "@/lib/summary";
import type { Intake, TriageResult } from "@/lib/types";

export function ClinicianSummary({
  intake,
  result,
}: {
  intake: Intake;
  result: TriageResult;
}) {
  const { locale, ui } = useLocale();
  // Stable "generated" time for this view.
  const now = useMemo(() => new Date(), []);
  const rows = useMemo(
    () => buildSummaryRows(intake, result, locale, now),
    [intake, result, locale, now],
  );
  const text = useMemo(
    () => summaryToText(intake, result, locale, now),
    [intake, result, locale, now],
  );
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4">
      <div className="no-print flex flex-wrap gap-2">
        <Button variant="primary" onClick={copy}>
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? ui.summary.copied : ui.summary.copy}
        </Button>
        <Button variant="secondary" onClick={() => window.print()}>
          <Printer className="h-4 w-4" aria-hidden="true" />
          {ui.summary.print}
        </Button>
        <ShareSummaryButton text={text} label={ui.result.share} />
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? ui.summary.copied : ""}
        </span>
      </div>

      <div className="print-block rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-lg font-bold text-ink">
          {ui.appName} — {ui.summary.title}
        </h2>
        <dl className="mt-4 divide-y divide-line">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-0.5 py-2.5 sm:grid-cols-3"
            >
              <dt className="text-sm font-semibold text-muted">{row.label}</dt>
              <dd className="whitespace-pre-line text-ink sm:col-span-2">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
          {ui.summary.disclaimerLine}
        </p>
      </div>
    </div>
  );
}
