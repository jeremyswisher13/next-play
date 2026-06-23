"use client";

import { ChevronDown } from "lucide-react";
import { roadmaps } from "@/content/roadmaps";
import { ReturnToPlayRoadmap } from "@/components/ReturnToPlayRoadmap";
import { useLocale } from "@/lib/i18n";

export default function RoadmapsPage() {
  const { t, ui } = useLocale();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          {ui.roadmaps.title}
        </h1>
        <p className="mt-1 text-ink-soft">{ui.roadmaps.sub}</p>
      </header>

      <div className="space-y-3">
        {roadmaps.map((roadmap) => (
          <details
            key={roadmap.id}
            className="group rounded-2xl border border-line bg-surface"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-bold text-ink [&::-webkit-details-marker]:hidden">
              <span>{t(roadmap.name)}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-5">
              <ReturnToPlayRoadmap roadmap={roadmap} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
