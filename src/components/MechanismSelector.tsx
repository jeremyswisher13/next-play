"use client";

import { mechanisms } from "@/content/mechanisms";
import { RadioCard } from "@/components/ui/radio-card";
import { useLocale } from "@/lib/i18n";
import type { MechanismId } from "@/lib/types";

interface MechanismSelectorProps {
  value?: MechanismId;
  onChange: (id: MechanismId) => void;
}

export function MechanismSelector({ value, onChange }: MechanismSelectorProps) {
  const { t } = useLocale();
  return (
    <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
      {mechanisms.map((mech) => (
        <RadioCard
          key={mech.id}
          selected={value === mech.id}
          onSelect={() => onChange(mech.id)}
          title={t(mech.label)}
        />
      ))}
    </div>
  );
}
