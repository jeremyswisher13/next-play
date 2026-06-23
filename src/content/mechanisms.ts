import type { MechanismId, LocalizedText } from "@/lib/types";

export interface MechanismOption {
  id: MechanismId;
  label: LocalizedText;
}

/** How the injury happened. */
export const mechanisms: MechanismOption[] = [
  {
    id: "contact",
    label: { en: "Contact / collision", es: "Contacto / choque" },
  },
  {
    id: "twist",
    label: { en: "Twist / cut / pivot", es: "Giro / cambio de dirección" },
  },
  { id: "fall", label: { en: "Fall", es: "Caída" } },
  {
    id: "sprinting",
    label: { en: "Sprinting / running", es: "Esprintar / correr" },
  },
  {
    id: "throwing",
    label: {
      en: "Throwing / overhead",
      es: "Lanzar / movimiento por encima de la cabeza",
    },
  },
  {
    id: "overuse",
    label: { en: "Gradual overuse", es: "Sobreuso gradual" },
  },
  { id: "heat", label: { en: "Heat / exertion", es: "Calor / esfuerzo" } },
  { id: "unknown", label: { en: "Unknown", es: "No sé" } },
];

export function getMechanism(id?: MechanismId): MechanismOption | undefined {
  return mechanisms.find((m) => m.id === id);
}
