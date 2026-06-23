"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import { decodeIntake } from "@/lib/shareLink";
import { evaluateTriage, isIntakeReadyForResult } from "@/lib/triage";
import { ClinicianSummary } from "@/components/ClinicianSummary";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Intake } from "@/lib/types";

export default function SharedSummaryPage() {
  const { locale, setLocale, ui } = useLocale();
  // undefined = still decoding; null = invalid/missing.
  const [intake, setIntake] = useState<Intake | null | undefined>(undefined);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const decoded = hash ? decodeIntake(hash) : null;
    setIntake(decoded);
    if (decoded?.locale) setLocale(decoded.locale);
  }, [setLocale]);

  const result = useMemo(
    () =>
      intake && isIntakeReadyForResult(intake)
        ? evaluateTriage({ ...intake, locale })
        : null,
    [intake, locale],
  );

  if (intake === undefined) {
    return <div className="py-16 text-center text-muted">…</div>;
  }

  if (!intake || !result) {
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
      <Badge tone="brand">{ui.summary.readOnlyBadge}</Badge>

      {result.pathway === "emergency" ? (
        <a
          href="tel:911"
          className={cn(buttonVariants({ variant: "danger", size: "lg" }))}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {ui.result.callNow}
        </a>
      ) : null}

      <ClinicianSummary intake={intake} result={result} />

      <Link
        href="/start"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        {ui.result.incompleteCta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
