"use client";

import { first72 } from "@/content/first72";
import { useLocale } from "@/lib/i18n";

export function First72HoursPlan() {
  const { t } = useLocale();
  return (
    <div className="space-y-4">
      {first72.map((block) => (
        <div key={block.id} className="rounded-xl bg-canvas p-4">
          <h3 className="font-bold text-ink">{t(block.title)}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {t(block.body)}
          </p>
        </div>
      ))}
    </div>
  );
}
