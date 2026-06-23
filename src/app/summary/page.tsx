"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { evaluateTriage, isIntakeReadyForResult } from "@/lib/triage";
import { ClinicianSummary } from "@/components/ClinicianSummary";
import { HandoffShare } from "@/components/HandoffShare";
import { buttonVariants } from "@/components/ui/button";

export default function SummaryPage() {
  const { locale, ui } = useLocale();
  const { intake, hydrated } = useIntake();

  const ready = isIntakeReadyForResult(intake);
  const result = useMemo(
    () => (ready ? evaluateTriage({ ...intake, locale }) : null),
    [intake, locale, ready],
  );

  if (!hydrated) {
    return <div className="py-16 text-center text-muted">…</div>;
  }

  if (!ready || !result) {
    return (
      <div className="space-y-5 py-8 text-center">
        <h1 className="text-2xl font-extrabold text-ink">
          {ui.result.incompleteTitle}
        </h1>
        <p className="text-ink-soft">{ui.result.incompleteSub}</p>
        <Link href="/start" className={buttonVariants({ size: "lg" })}>
          {ui.result.incompleteCta}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link
        href="/result"
        className="no-print inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {ui.summary.backToResult}
      </Link>

      <header className="no-print">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          {ui.summary.title}
        </h1>
        <p className="mt-1 text-ink-soft">{ui.summary.sub}</p>
      </header>

      <ClinicianSummary intake={intake} result={result} />

      <HandoffShare intake={intake} />
    </div>
  );
}
