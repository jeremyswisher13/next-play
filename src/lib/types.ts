/**
 * Next Play — shared types (the contract every other file conforms to).
 *
 * Medical safety content is stored as { en, es } pairs (LocalizedText) so a
 * clinician edits BOTH languages side-by-side. Lists are arrays of LocalizedText
 * so every bullet keeps its English + Spanish together.
 */

export type Locale = "en" | "es";

/** A single piece of bilingual copy. Edit English and Spanish together. */
export interface LocalizedText {
  en: string;
  es: string;
}

export type Role =
  | "athlete"
  | "parent"
  | "coach"
  | "athleticTrainer"
  | "clinician";

export type CompetitionLevel =
  | "recreational"
  | "middleSchool"
  | "highSchool"
  | "club"
  | "college"
  | "adult";

export type BodyRegionId =
  | "head"
  | "neck"
  | "shoulder"
  | "elbow"
  | "wrist"
  | "hip"
  | "thigh"
  | "knee"
  | "calf"
  | "ankle"
  | "heat"
  | "other";

export type MechanismId =
  | "contact"
  | "twist"
  | "fall"
  | "sprinting"
  | "throwing"
  | "overuse"
  | "heat"
  | "unknown";

/** The four care pathways the triage engine can output. */
export type Pathway = "emergency" | "urgent" | "sportsMed" | "monitor";

export type RoadmapId =
  | "ankle"
  | "knee"
  | "hamstring"
  | "shoulder"
  | "elbowThrowing"
  | "concussion"
  | "heatIllness"
  | "calfAchilles"
  | "general";

export type YesNoUnsure = "yes" | "no" | "unsure";
export type Trend = "improving" | "unchanged" | "worsening";

/** Which screen of the red-flag checklist a flag belongs to. */
export type RedFlagCategory = "global" | "concussion" | "heat";

/** Severity tier — drives the triage engine. */
export type RedFlagTier = "emergency" | "urgent";

export interface RedFlag {
  id: string;
  label: LocalizedText;
  tier: RedFlagTier;
  category: RedFlagCategory;
  /** If set, only show this flag for these regions (in addition to category rules). */
  regions?: BodyRegionId[];
}

export interface AthleteInfo {
  age?: number;
  sport?: string;
  level?: CompetitionLevel;
  /** ISO local string from <input type="datetime-local">. */
  injuryDateTime?: string;
}

export interface FunctionalAnswers {
  canWalk?: YesNoUnsure;
  canMove?: YesNoUnsure;
  pop?: YesNoUnsure;
  swelling?: YesNoUnsure;
  bruising?: YesNoUnsure;
  /** Point tenderness directly over bone — key for growth-plate injuries in kids. */
  boneTenderness?: YesNoUnsure;
  continuedPlaying?: YesNoUnsure;
  trend?: Trend;
}

/** Everything the user tells us during intake. */
export interface Intake {
  role?: Role;
  locale: Locale;
  athlete: AthleteInfo;
  bodyRegion?: BodyRegionId;
  mechanism?: MechanismId;
  /** Ids of every checked red flag (global + concussion + heat). */
  redFlags: string[];
  /** True once the user has actively answered the warning-signs screen
   * (checked a flag or tapped "None") — gates Continue so it can't be skipped. */
  redFlagsAcknowledged?: boolean;
  functional: FunctionalAnswers;
  /** Free-text parent/athlete concerns for the clinician summary. */
  concerns?: string;
  /** ISO time when a 72-hour re-check becomes due (set by the user). */
  recheckAt?: string;
  /** Snapshot of the first assessment, captured when a re-check begins. */
  baseline?: {
    redFlags: string[];
    functional: FunctionalAnswers;
    capturedAt: string;
  };
}

/** Output of evaluateTriage() — deterministic, inspectable, localized. */
export interface TriageResult {
  pathway: Pathway;
  /** Why this pathway was chosen (localized, human-readable). */
  reasons: string[];
  /** Intake-specific "what to do now" highlights (localized). */
  recommendations: string[];
  /** Intake-specific "what not to do" highlights (localized). */
  restrictions: string[];
  roadmapType: RoadmapId;
}

/** Content shape for a single care pathway (rich, bilingual copy). */
export interface PathwayContent {
  id: Pathway;
  /** Short risk label, e.g. "Emergency now". */
  title: LocalizedText;
  /** One-line summary shown under the title. */
  summary: LocalizedText;
  /** Plain-language explanation paragraph. */
  explanation: LocalizedText;
  doNow: LocalizedText[];
  doNotDo: LocalizedText[];
  watchFor: LocalizedText[];
  nextStep: LocalizedText;
  rtpPrinciple: LocalizedText;
}

export interface RoadmapStage {
  title: LocalizedText;
  detail: LocalizedText;
}

export interface Roadmap {
  id: RoadmapId;
  name: LocalizedText;
  intro: LocalizedText;
  stages: RoadmapStage[];
}

export interface First72Block {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
}
