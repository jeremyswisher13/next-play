"use client";

import { bodyRegions } from "@/content/bodyRegions";
import { RadioCard } from "@/components/ui/radio-card";
import { useLocale } from "@/lib/i18n";
import type { BodyRegionId } from "@/lib/types";

interface BodyRegionSelectorProps {
  value?: BodyRegionId;
  onChange: (id: BodyRegionId) => void;
}

export function BodyRegionSelector({
  value,
  onChange,
}: BodyRegionSelectorProps) {
  const { t } = useLocale();
  return (
    <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
      {bodyRegions.map((region) => (
        <RadioCard
          key={region.id}
          selected={value === region.id}
          onSelect={() => onChange(region.id)}
          title={t(region.label)}
        />
      ))}
    </div>
  );
}
