"use client";

import {
  User,
  Users,
  ClipboardList,
  HeartPulse,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { roles } from "@/content/roles";
import { RadioCard } from "@/components/ui/radio-card";
import { useLocale } from "@/lib/i18n";
import type { Role } from "@/lib/types";

const icons: Record<Role, LucideIcon> = {
  athlete: User,
  parent: Users,
  coach: ClipboardList,
  athleticTrainer: HeartPulse,
  clinician: Stethoscope,
};

interface RoleSelectorProps {
  value?: Role;
  onChange: (role: Role) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const { t, ui } = useLocale();
  return (
    <div role="radiogroup" aria-label={ui.start.roleLabel} className="grid gap-3">
      {roles.map((role) => {
        const Icon = icons[role.id];
        return (
          <RadioCard
            key={role.id}
            name="role"
            selected={value === role.id}
            onSelect={() => onChange(role.id)}
            title={t(role.label)}
            icon={<Icon className="h-5 w-5" aria-hidden="true" />}
          />
        );
      })}
    </div>
  );
}
