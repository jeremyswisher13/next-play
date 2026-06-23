"use client";

import { useLocale } from "@/lib/i18n";
import type { Roadmap } from "@/lib/types";

export function ReturnToPlayRoadmap({ roadmap }: { roadmap: Roadmap }) {
  const { t } = useLocale();
  return (
    <div>
      <p className="leading-relaxed text-ink-soft">{t(roadmap.intro)}</p>
      <ol className="mt-5 space-y-4">
        {roadmap.stages.map((stage, i) => (
          <li key={i} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              {i < roadmap.stages.length - 1 ? (
                <span className="mt-1 w-0.5 flex-1 bg-line" aria-hidden="true" />
              ) : null}
            </div>
            <div className="pb-1">
              <p className="font-bold text-ink">{t(stage.title)}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                {t(stage.detail)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
