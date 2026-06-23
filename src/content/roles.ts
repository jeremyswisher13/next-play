import type { Role, LocalizedText } from "@/lib/types";

export interface RoleOption {
  id: Role;
  label: LocalizedText;
}

/** Who is using the app. Edit labels freely; ids are referenced by the code. */
export const roles: RoleOption[] = [
  { id: "athlete", label: { en: "Athlete", es: "Atleta" } },
  { id: "parent", label: { en: "Parent / guardian", es: "Padre / tutor" } },
  { id: "coach", label: { en: "Coach", es: "Entrenador" } },
  {
    id: "athleticTrainer",
    label: { en: "Athletic trainer (ATC)", es: "Entrenador atlético (ATC)" },
  },
  {
    id: "clinician",
    label: { en: "Clinician", es: "Profesional médico" },
  },
];
