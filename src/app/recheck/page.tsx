"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { isIntakeReadyForResult } from "@/lib/triage";
import { clearReminder } from "@/lib/reminder";
import { RedFlagChecklist } from "@/components/RedFlagChecklist";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Trend } from "@/lib/types";

export default function RecheckPage() {
  const router = useRouter();
  const { ui } = useLocale();
  const { intake, hydrated, updateFunctional, update } = useIntake();

  // Snapshot the first assessment once, before the user edits anything here, so
  // the hand-off summary can show change over time.
  useEffect(() => {
    if (!hydrated) return;
    if (!intake.baseline && isIntakeReadyForResult(intake)) {
      update({
        baseline: {
          redFlags: [...intake.redFlags],
          functional: { ...intake.functional },
          capturedAt: new Date().toISOString(),
        },
      });
    }
    // Capture exactly once on entry; intentionally not re-running on edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (!hydrated) {
    return <div className="py-16 text-center text-muted">…</div>;
  }

  if (!isIntakeReadyForResult(intake)) {
    return (
      <div className="space-y-5 py-8 text-center">
        <h1 className="text-2xl font-extrabold text-ink">
          {ui.recheck.noInjuryTitle}
        </h1>
        <p className="text-ink-soft">{ui.recheck.noInjurySub}</p>
        <Link href="/start" className={buttonVariants({ size: "lg" })}>
          {ui.result.incompleteCta}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const trendOptions: { value: Trend; label: string }[] = [
    { value: "improving", label: ui.functional.improving },
    { value: "unchanged", label: ui.functional.unchanged },
    { value: "worsening", label: ui.functional.worsening },
  ];
  const trend = intake.functional.trend;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          {ui.recheck.title}
        </h1>
        <p className="mt-1 text-ink-soft">{ui.recheck.sub}</p>
      </header>

      <section>
        <h2 className="mb-2 font-bold text-ink">{ui.recheck.trendQuestion}</h2>
        <div role="radiogroup" className="grid grid-cols-3 gap-2">
          {trendOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={trend === opt.value}
              onClick={() => updateFunctional({ trend: opt.value })}
              className={cn(
                "min-h-12 rounded-xl border px-2 py-2 text-sm font-semibold transition-colors",
                trend === opt.value
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-ink-soft hover:bg-canvas",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-bold text-ink">{ui.recheck.newFlagsTitle}</h2>
        <RedFlagChecklist />
      </section>

      <Button
        size="lg"
        onClick={() => {
          update({ recheckAt: undefined });
          clearReminder();
          router.push("/result");
        }}
      >
        {ui.recheck.seeUpdated}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}
