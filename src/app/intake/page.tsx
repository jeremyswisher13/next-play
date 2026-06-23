"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BodyRegionSelector } from "@/components/BodyRegionSelector";
import { MechanismSelector } from "@/components/MechanismSelector";
import { RedFlagChecklist } from "@/components/RedFlagChecklist";
import { FunctionalQuestions } from "@/components/FunctionalQuestions";

const TOTAL = 4;

export default function IntakePage() {
  const router = useRouter();
  const { ui } = useLocale();
  const { intake, update } = useIntake();
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // Move focus to the new step heading so screen readers announce the change.
    headingRef.current?.focus();
  }, [step]);

  const canContinue =
    step === 0
      ? Boolean(intake.bodyRegion)
      : step === 1
        ? Boolean(intake.mechanism)
        : true;

  const titles = [
    ui.intake.regionTitle,
    ui.intake.mechanismTitle,
    ui.intake.redFlagsTitle,
    ui.intake.functionalTitle,
  ];
  const subs = [
    ui.intake.regionSub,
    ui.intake.mechanismSub,
    ui.intake.redFlagsSub,
    ui.intake.functionalSub,
  ];

  function back() {
    if (step === 0) router.push("/start");
    else setStep((s) => s - 1);
  }

  function next() {
    if (!canContinue) return;
    if (step === TOTAL - 1) router.push("/result");
    else setStep((s) => s + 1);
  }

  return (
    <div className="space-y-6">
      <Progress
        current={step + 1}
        total={TOTAL}
        label={`${ui.common.step} ${step + 1} ${ui.common.of} ${TOTAL}`}
      />

      <header>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-extrabold tracking-tight text-ink outline-none"
        >
          {titles[step]}
        </h1>
        <p className="mt-1 text-ink-soft">{subs[step]}</p>
      </header>

      <div>
        {step === 0 && (
          <BodyRegionSelector
            value={intake.bodyRegion}
            onChange={(bodyRegion) => update({ bodyRegion })}
          />
        )}
        {step === 1 && (
          <MechanismSelector
            value={intake.mechanism}
            onChange={(mechanism) => update({ mechanism })}
          />
        )}
        {step === 2 && <RedFlagChecklist />}
        {step === 3 && <FunctionalQuestions />}
      </div>

      {!canContinue ? (
        <p className="text-sm font-medium text-muted">
          {ui.intake.selectToContinue}
        </p>
      ) : null}

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={back} className="flex-1">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          {ui.common.back}
        </Button>
        <Button onClick={next} disabled={!canContinue} className="flex-1">
          {step === TOTAL - 1 ? ui.intake.seeResult : ui.common.continue}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
