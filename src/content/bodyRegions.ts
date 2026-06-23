import type { BodyRegionId, LocalizedText } from "@/lib/types";

export interface BodyRegionOption {
  id: BodyRegionId;
  label: LocalizedText;
}

/**
 * Body regions shown on the "Where is the injury?" step.
 * The icon shown in the UI is mapped from `id` inside BodyRegionSelector.
 */
export const bodyRegions: BodyRegionOption[] = [
  { id: "head", label: { en: "Head / concussion", es: "Cabeza / conmoción" } },
  { id: "neck", label: { en: "Neck / spine", es: "Cuello / columna" } },
  { id: "shoulder", label: { en: "Shoulder", es: "Hombro" } },
  {
    id: "elbow",
    label: { en: "Elbow / throwing arm", es: "Codo / brazo de lanzar" },
  },
  { id: "wrist", label: { en: "Wrist / hand", es: "Muñeca / mano" } },
  { id: "hip", label: { en: "Hip / groin", es: "Cadera / ingle" } },
  {
    id: "thigh",
    label: {
      en: "Thigh / hamstring / quad",
      es: "Muslo / isquiotibial / cuádriceps",
    },
  },
  { id: "knee", label: { en: "Knee", es: "Rodilla" } },
  {
    id: "calf",
    label: { en: "Calf / Achilles", es: "Pantorrilla / tendón de Aquiles" },
  },
  { id: "ankle", label: { en: "Ankle / foot", es: "Tobillo / pie" } },
  {
    id: "heat",
    label: { en: "Heat illness / collapse", es: "Enfermedad por calor / colapso" },
  },
  { id: "other", label: { en: "Other", es: "Otra zona" } },
];

export function getBodyRegion(id?: BodyRegionId): BodyRegionOption | undefined {
  return bodyRegions.find((r) => r.id === id);
}
