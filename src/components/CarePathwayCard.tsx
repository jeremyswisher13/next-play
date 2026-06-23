"use client";

import {
  Siren,
  AlertTriangle,
  CalendarClock,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n";
import { getPathwayContent } from "@/content/carePathways";
import type { Pathway } from "@/lib/types";
import { cn } from "@/lib/utils";

const visual: Record<
  Pathway,
  { tone: NonNullable<BadgeProps["tone"]>; icon: LucideIcon; accent: string }
> = {
  emergency: {
    tone: "emergency",
    icon: Siren,
    accent: "border-emergency-line bg-emergency-soft",
  },
  urgent: {
    tone: "urgent",
    icon: AlertTriangle,
    accent: "border-urgent-line bg-urgent-soft",
  },
  sportsMed: {
    tone: "sportsmed",
    icon: CalendarClock,
    accent: "border-sportsmed-line bg-sportsmed-soft",
  },
  monitor: {
    tone: "monitor",
    icon: ClipboardCheck,
    accent: "border-monitor-line bg-monitor-soft",
  },
};

export function CarePathwayCard({ pathway }: { pathway: Pathway }) {
  const { t, ui } = useLocale();
  const content = getPathwayContent(pathway);
  const v = visual[pathway];
  const Icon = v.icon;

  return (
    <section className={cn("rounded-2xl border-2 p-5 sm:p-6", v.accent)}>
      <Badge tone={v.tone}>
        <Icon className="h-4 w-4" aria-hidden="true" />
        {ui.pathwayLabels[pathway]}
      </Badge>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        {t(content.title)}
      </h1>
      <p className="mt-1 text-lg font-semibold text-ink-soft">
        {t(content.summary)}
      </p>
      <p className="mt-3 leading-relaxed text-ink-soft">
        {t(content.explanation)}
      </p>
    </section>
  );
}
