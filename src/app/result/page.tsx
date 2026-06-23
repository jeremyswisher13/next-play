"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  Info,
  ListChecks,
  Ban,
  Eye,
  Stethoscope,
  Footprints,
  Clock,
  Map,
  Phone,
  FileText,
  RotateCcw,
  ArrowRight,
  Check,
} from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { evaluateTriage, isIntakeReadyForResult } from "@/lib/triage";
import { getPathwayContent } from "@/content/carePathways";
import { getRoadmap } from "@/content/roadmaps";
import { summaryToText } from "@/lib/summary";
import { CarePathwayCard } from "@/components/CarePathwayCard";
import { First72HoursPlan } from "@/components/First72HoursPlan";
import { ReturnToPlayRoadmap } from "@/components/ReturnToPlayRoadmap";
import { ShareSummaryButton } from "@/components/ShareSummaryButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="flex items-center gap-2 font-bold text-ink">
        {icon}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({
  items,
  marker,
}: {
  items: string[];
  marker: ReactNode;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 leading-relaxed text-ink-soft">
          <span className="mt-0.5 shrink-0" aria-hidden="true">
            {marker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const { locale, t, ui } = useLocale();
  const { intake, hydrated, reset } = useIntake();

  const ready = isIntakeReadyForResult(intake);

  const result = useMemo(
    () => (ready ? evaluateTriage({ ...intake, locale }) : null),
    [intake, locale, ready],
  );

  const summaryText = useMemo(
    () => (result ? summaryToText(intake, result, locale) : ""),
    [intake, result, locale],
  );

  // Wait for sessionStorage hydration before deciding the intake is incomplete.
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

  const content = getPathwayContent(result.pathway);
  const roadmap = getRoadmap(result.roadmapType);

  const doNowItems = Array.from(
    new Set([...result.recommendations, ...content.doNow.map(t)]),
  );
  const doNotItems = Array.from(
    new Set([...result.restrictions, ...content.doNotDo.map(t)]),
  );
  const watchItems = content.watchFor.map(t);

  const showFirst72 =
    result.pathway === "monitor" || result.pathway === "sportsMed";

  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">
        {ui.result.yourPathway}
      </p>

      <CarePathwayCard pathway={result.pathway} />

      {result.pathway === "emergency" ? (
        <a
          href="tel:911"
          className={cn(buttonVariants({ variant: "danger", size: "lg" }))}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {ui.result.callNow}
        </a>
      ) : null}

      {result.reasons.length ? (
        <Section
          icon={<Info className="h-5 w-5 text-brand" aria-hidden="true" />}
          title={ui.result.why}
        >
          <BulletList
            items={result.reasons}
            marker={
              <span className="block h-1.5 w-1.5 translate-y-2 rounded-full bg-muted" />
            }
          />
        </Section>
      ) : null}

      <Section
        icon={<ListChecks className="h-5 w-5 text-monitor" aria-hidden="true" />}
        title={ui.result.doNow}
      >
        <BulletList
          items={doNowItems}
          marker={<Check className="h-4 w-4 text-monitor" />}
        />
      </Section>

      <Section
        icon={<Ban className="h-5 w-5 text-emergency" aria-hidden="true" />}
        title={ui.result.doNotDo}
      >
        <BulletList
          items={doNotItems}
          marker={<Ban className="h-4 w-4 text-emergency" />}
        />
      </Section>

      <Section
        icon={<Eye className="h-5 w-5 text-urgent" aria-hidden="true" />}
        title={ui.result.watchFor}
      >
        <BulletList
          items={watchItems}
          marker={
            <span className="block h-1.5 w-1.5 translate-y-2 rounded-full bg-urgent" />
          }
        />
      </Section>

      <Section
        icon={<Stethoscope className="h-5 w-5 text-brand" aria-hidden="true" />}
        title={ui.result.nextStep}
      >
        <p className="leading-relaxed text-ink-soft">{t(content.nextStep)}</p>
      </Section>

      <Section
        icon={<Footprints className="h-5 w-5 text-brand" aria-hidden="true" />}
        title={ui.result.rtp}
      >
        <p className="leading-relaxed text-ink-soft">
          {t(content.rtpPrinciple)}
        </p>
      </Section>

      {showFirst72 ? (
        <Section
          icon={<Clock className="h-5 w-5 text-brand" aria-hidden="true" />}
          title={ui.result.first72}
        >
          <First72HoursPlan />
        </Section>
      ) : null}

      <Section
        icon={<Map className="h-5 w-5 text-brand" aria-hidden="true" />}
        title={`${ui.result.roadmap}: ${t(roadmap.name)}`}
      >
        <p className="mb-4 text-sm text-muted">{ui.result.roadmapSub}</p>
        <ReturnToPlayRoadmap roadmap={roadmap} />
        <Link
          href="/roadmaps"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          {ui.result.seeFullRoadmap}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Section>

      {/* Actions */}
      <div className="no-print flex flex-col gap-3 pt-1">
        <Link href="/summary" className={buttonVariants({ size: "lg" })}>
          <FileText className="h-5 w-5" aria-hidden="true" />
          {ui.result.generateSummary}
        </Link>
        <ShareSummaryButton
          text={summaryText}
          variant="secondary"
          className="h-14 w-full text-lg"
        />
        <Button
          variant="ghost"
          onClick={() => {
            reset();
            router.push("/start");
          }}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {ui.result.restartCta}
        </Button>
      </div>

      <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
        {ui.result.disclaimerAtBottom} {ui.disclaimer.coreLine}
      </p>
    </div>
  );
}
