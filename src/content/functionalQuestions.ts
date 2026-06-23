/**
 * The functional questions, in order. Labels and answer text live in
 * src/content/ui.ts under `functional` (so they stay parity-checked across
 * English/Spanish). This file only defines the order and answer type.
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
}

export const functionalQuestions: FunctionalQuestion[] = [
  { key: "canWalk", kind: "yesno" },
  { key: "canMove", kind: "yesno" },
  { key: "pop", kind: "yesno" },
  { key: "swelling", kind: "yesno" },
  { key: "bruising", kind: "yesno" },
  { key: "boneTenderness", kind: "yesno" },
  { key: "continuedPlaying", kind: "yesno" },
  { key: "trend", kind: "trend" },
];
