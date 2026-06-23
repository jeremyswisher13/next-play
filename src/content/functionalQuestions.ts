import type { BodyRegionId } from "@/lib/types";

/**
 * The functional questions, in order. Labels and answer text live in
 * src/content/ui.ts under `functional` (so they stay parity-checked across
 * English/Spanish). This file defines the order, answer type, and — important
 * for usability — WHICH body regions each question is relevant to, so we never
 * ask a concussion about bruising or a shoulder about walking.
 */

export type FunctionalKey =
  | "canWalk"
  | "canMove"
  | "pop"
  | "swelling"
  | "bruising"
  | "boneTenderness"
  | "continuedPlaying"
  | "trend";

export interface FunctionalQuestion {
  key: FunctionalKey;
  /** "yesno" = Yes / No / Not sure. "trend" = Improving / Same / Worsening. */
  kind: "yesno" | "trend";
  /** Body regions where this question makes sense (and is shown). */
  regions: BodyRegionId[];
}

const LOWER: BodyRegionId[] = ["hip", "thigh", "knee", "calf", "ankle"];
const UPPER: BodyRegionId[] = ["shoulder", "elbow", "wrist"];
const LIMB: BodyRegionId[] = [...LOWER, ...UPPER];
const LIMB_OTHER: BodyRegionId[] = [...LIMB, "other"];
const ALL: BodyRegionId[] = [
  "head",
  "neck",
  "shoulder",
  "elbow",
  "wrist",
  "hip",
  "thigh",
  "knee",
  "calf",
  "ankle",
  "heat",
  "other",
];

export const functionalQuestions: FunctionalQuestion[] = [
  // Weight-bearing only makes sense for the lower body.
  { key: "canWalk", kind: "yesno", regions: LOWER },
  // "Move the injured area" applies to limbs (not head/neck/heat).
  { key: "canMove", kind: "yesno", regions: LIMB_OTHER },
  // A "pop" is a joint/tendon question.
  { key: "pop", kind: "yesno", regions: LIMB },
  { key: "swelling", kind: "yesno", regions: LIMB_OTHER },
  { key: "bruising", kind: "yesno", regions: LIMB_OTHER },
  { key: "boneTenderness", kind: "yesno", regions: LIMB_OTHER },
  // These two are relevant to every injury (incl. concussion, heat).
  { key: "continuedPlaying", kind: "yesno", regions: ALL },
  { key: "trend", kind: "trend", regions: ALL },
];

/** The functional questions relevant to a given body region. */
export function functionalQuestionsFor(
  region?: BodyRegionId,
): FunctionalQuestion[] {
  if (!region) return functionalQuestions;
  return functionalQuestions.filter((q) => q.regions.includes(region));
}
