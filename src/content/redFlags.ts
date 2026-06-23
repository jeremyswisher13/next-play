import type {
  BodyRegionId,
  MechanismId,
  RedFlag,
  RedFlagCategory,
} from "@/lib/types";

/**
 * RED FLAGS — the heart of the safety logic.
 *
 *  tier "emergency"  → forces the EMERGENCY pathway (call 911 / ER now).
 *  tier "urgent"     → forces at least the URGENT same-day pathway.
 *
 *  category:
 *    "global"     → always shown on the warning-signs screen.
 *    "concussion" → shown when the body region is Head/concussion.
 *    "heat"       → shown when region is Heat illness OR mechanism is Heat.
 *
 * To change triage behavior, change a flag's `tier` here — no engine edits
 * needed. To add a new warning sign, add an entry with a unique `id`.
 */
export const redFlags: RedFlag[] = [
  // ── Global EMERGENCY red flags ────────────────────────────────────────────
  {
    id: "loc",
    tier: "emergency",
    category: "global",
    label: {
      en: "Loss of consciousness, even briefly",
      es: "Pérdida del conocimiento, aunque sea breve",
    },
  },
  {
    id: "confusion",
    tier: "emergency",
    category: "global",
    label: {
      en: "Confusion, not acting normally, or a change in behavior",
      es: "Confusión, no actúa con normalidad o un cambio de comportamiento",
    },
  },
  {
    id: "repeatedVomiting",
    tier: "emergency",
    category: "global",
    label: { en: "Repeated vomiting", es: "Vómitos repetidos" },
  },
  {
    id: "severeHeadache",
    tier: "emergency",
    category: "global",
    label: {
      en: "Severe or quickly worsening headache after a hit to the head",
      es: "Dolor de cabeza intenso o que empeora rápido tras un golpe en la cabeza",
    },
  },
  {
    id: "neckPain",
    tier: "emergency",
    category: "global",
    label: {
      en: "Neck pain or neck tenderness after an injury",
      es: "Dolor o sensibilidad en el cuello después de una lesión",
    },
  },
  {
    id: "numbnessWeakness",
    tier: "emergency",
    category: "global",
    label: {
      en: "Numbness, weakness, or tingling in the arms or legs",
      es: "Entumecimiento, debilidad u hormigueo en los brazos o las piernas",
    },
  },
  {
    id: "chestPain",
    tier: "emergency",
    category: "global",
    label: {
      en: "Chest pain, fainting, or passing out",
      es: "Dolor de pecho, desmayo o pérdida del conocimiento",
    },
  },
  {
    id: "troubleBreathing",
    tier: "emergency",
    category: "global",
    label: { en: "Trouble breathing", es: "Dificultad para respirar" },
  },
  {
    // Exertional cardiac symptoms short of frank chest pain/fainting — these
    // must never sit in "monitor" (sudden cardiac death risk in young athletes).
    id: "exertionalCardiac",
    tier: "urgent",
    category: "global",
    label: {
      en: "Racing, pounding, or irregular heartbeat, or feeling lightheaded or unusually out of breath during exercise",
      es: "Latidos rápidos, fuertes o irregulares, o sentirse mareado o con falta de aire inusual durante el ejercicio",
    },
  },
  {
    id: "openWound",
    tier: "emergency",
    category: "global",
    label: {
      en: "Open wound with bone visible",
      es: "Herida abierta con el hueso a la vista",
    },
  },

  // ── Global URGENT red flags ───────────────────────────────────────────────
  {
    id: "severeDeformity",
    tier: "urgent",
    category: "global",
    label: {
      en: "Obvious deformity — a limb or joint looks out of place",
      es: "Deformidad evidente — una extremidad o articulación se ve fuera de lugar",
    },
  },
  {
    id: "cannotBearWeight",
    tier: "urgent",
    category: "global",
    label: {
      en: "Cannot put any weight on it or cannot use it at all",
      es: "No puede apoyar nada de peso o no puede usarla en absoluto",
    },
  },
  {
    id: "rapidSwelling",
    tier: "urgent",
    category: "global",
    label: {
      en: "Swelling that is getting worse quickly",
      es: "Hinchazón que empeora rápidamente",
    },
  },
  {
    id: "severePain",
    tier: "urgent",
    category: "global",
    label: {
      en: "Severe pain that seems out of proportion to the injury",
      es: "Dolor intenso que parece desproporcionado para la lesión",
    },
  },

  // ── Concussion symptoms (shown for Head region) ───────────────────────────
  // Present → URGENT pathway + explicit "no same-day return to play".
  {
    id: "conHeadache",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Headache or pressure in the head",
      es: "Dolor de cabeza o presión en la cabeza",
    },
  },
  {
    id: "conDizzy",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Dizziness or balance problems",
      es: "Mareo o problemas de equilibrio",
    },
  },
  {
    id: "conNausea",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Nausea or upset stomach",
      es: "Náuseas o malestar estomacal",
    },
  },
  {
    id: "conLight",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Sensitivity to light or noise",
      es: "Sensibilidad a la luz o al ruido",
    },
  },
  {
    id: "conFoggy",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Feeling foggy, slowed down, or “not right”",
      es: "Se siente confundido, lento o “que no está bien”",
    },
  },
  {
    id: "conMemory",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Trouble remembering or concentrating",
      es: "Dificultad para recordar o concentrarse",
    },
  },
  {
    id: "conVision",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "Blurred or double vision",
      es: "Visión borrosa o doble",
    },
  },
  {
    id: "conEmotion",
    tier: "urgent",
    category: "concussion",
    label: {
      en: "More emotional, irritable, or anxious than usual",
      es: "Más emocional, irritable o ansioso de lo normal",
    },
  },

  // ── Heat illness (shown for Heat region or Heat mechanism) ────────────────
  {
    id: "heatAltered",
    tier: "emergency",
    category: "heat",
    label: {
      en: "Confusion, fainting, collapse, or very hot / dry skin",
      es: "Confusión, desmayo, colapso o piel muy caliente / seca",
    },
  },
  {
    id: "heatPersistentVomiting",
    tier: "emergency",
    category: "heat",
    label: {
      en: "Persistent vomiting in the heat",
      es: "Vómitos persistentes con el calor",
    },
  },
  {
    id: "heatDizzyWeak",
    tier: "urgent",
    category: "heat",
    label: {
      en: "Dizziness, heavy sweating, or weakness in the heat",
      es: "Mareo, sudoración intensa o debilidad con el calor",
    },
  },
  {
    id: "heatCramps",
    tier: "urgent",
    category: "heat",
    label: {
      en: "Muscle cramps with heat or hard exertion",
      es: "Calambres musculares con el calor o esfuerzo intenso",
    },
  },
  {
    id: "heatHeadacheNausea",
    tier: "urgent",
    category: "heat",
    label: {
      en: "Headache or nausea during heat or exertion",
      es: "Dolor de cabeza o náuseas durante el calor o el esfuerzo",
    },
  },
];

export function getRedFlag(id: string): RedFlag | undefined {
  return redFlags.find((f) => f.id === id);
}

/**
 * Which warning-sign categories are SHOWN for a given injury. Global is always
 * shown. Concussion and heat groups are shown not only for the obvious region,
 * but also for plausible-mis-coding cases, so a head impact coded under "neck"
 * or a collapse-in-heat coded under "sprinting" can still surface the dangerous
 * flags. This is the single source of truth used by both the checklist and the
 * clinician summary, so they always agree on what was screened.
 */
export function screenedCategories(
  bodyRegion?: BodyRegionId,
  mechanism?: MechanismId,
): RedFlagCategory[] {
  const categories: RedFlagCategory[] = ["global"];
  // Concussion symptoms: head/neck regions, impact mechanisms, or the "other"
  // catch-all (a head/whiplash injury can be coded under any of these).
  if (
    bodyRegion === "head" ||
    bodyRegion === "neck" ||
    bodyRegion === "other" ||
    mechanism === "contact" ||
    mechanism === "fall"
  ) {
    categories.push("concussion");
  }
  // Heat symptoms: the heat region, or ANY exertional mechanism — heat illness
  // can strike during any hard activity and is frequently mis-coded. The flags
  // are self-qualifying ("in the heat"), so they read as not-applicable when
  // they don't apply.
  if (
    bodyRegion === "heat" ||
    mechanism === "heat" ||
    mechanism === "sprinting" ||
    mechanism === "unknown" ||
    mechanism === "contact" ||
    mechanism === "fall" ||
    mechanism === "overuse" ||
    mechanism === "throwing" ||
    mechanism === "twist"
  ) {
    categories.push("heat");
  }
  return categories;
}

/** The actual red flags shown for a given injury (in display order). */
export function screenedRedFlags(
  bodyRegion?: BodyRegionId,
  mechanism?: MechanismId,
): RedFlag[] {
  const categories = screenedCategories(bodyRegion, mechanism);
  return redFlags.filter((f) => categories.includes(f.category));
}
