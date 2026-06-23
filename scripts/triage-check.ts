/**
 * Standalone triage verification. Run with: npx tsx scripts/triage-check.ts
 * Exercises the spec's safety scenarios against the deterministic engine.
 */
import { evaluateTriage } from "../src/lib/triage";
import { screenedRedFlags } from "../src/content/redFlags";
import type { BodyRegionId, Intake, MechanismId, Pathway } from "../src/lib/types";

function intake(p: Partial<Intake>): Intake {
  return {
    locale: "en",
    athlete: {},
    redFlags: [],
    functional: {},
    ...p,
  };
}

let pass = 0;
let fail = 0;

function check(
  name: string,
  i: Intake,
  expectPathway: Pathway,
  opts: { roadmap?: string; restrictionIncludes?: string } = {},
) {
  const r = evaluateTriage(i);
  const problems: string[] = [];
  if (r.pathway !== expectPathway)
    problems.push(`pathway ${r.pathway} ≠ ${expectPathway}`);
  if (opts.roadmap && r.roadmapType !== opts.roadmap)
    problems.push(`roadmap ${r.roadmapType} ≠ ${opts.roadmap}`);
  if (
    opts.restrictionIncludes &&
    !r.restrictions.some((x) => x.toLowerCase().includes(opts.restrictionIncludes!.toLowerCase()))
  )
    problems.push(`restrictions missing "${opts.restrictionIncludes}"`);
  if (problems.length) {
    fail++;
    console.log(`✗ ${name}\n    ${problems.join("\n    ")}`);
    console.log(`    restrictions: ${JSON.stringify(r.restrictions)}`);
  } else {
    pass++;
    console.log(`✓ ${name}  →  ${r.pathway} / ${r.roadmapType}`);
  }
}

// 1. Loss of consciousness ⇒ emergency
check(
  "Head + loss of consciousness",
  intake({ bodyRegion: "head", mechanism: "contact", redFlags: ["loc"] }),
  "emergency",
  { roadmap: "concussion", restrictionIncludes: "return to play" },
);

// 2. Concussion symptom only ⇒ urgent + no same-day RTP
check(
  "Head + headache (concussion symptom)",
  intake({ bodyRegion: "head", mechanism: "contact", redFlags: ["conHeadache"] }),
  "urgent",
  { restrictionIncludes: "same-day" },
);

// 3. Ankle, cannot bear weight (flag) ⇒ urgent
check(
  "Ankle + cannot bear weight",
  intake({ bodyRegion: "ankle", mechanism: "twist", redFlags: ["cannotBearWeight"] }),
  "urgent",
  { roadmap: "ankle" },
);

// 4. Ankle, canWalk = no ⇒ urgent
check(
  "Ankle + canWalk=no",
  intake({ bodyRegion: "ankle", mechanism: "twist", functional: { canWalk: "no" } }),
  "urgent",
);

// 5. Throwing-arm overuse ⇒ sportsMed
check(
  "Elbow + throwing",
  intake({ bodyRegion: "elbow", mechanism: "throwing" }),
  "sportsMed",
  { roadmap: "elbowThrowing" },
);

// 6. Mild improving ankle tweak ⇒ monitor
check(
  "Ankle + twist, mild improving",
  intake({
    bodyRegion: "ankle",
    mechanism: "twist",
    functional: { canWalk: "yes", canMove: "yes", trend: "improving", pop: "no" },
  }),
  "monitor",
  { roadmap: "ankle" },
);

// 7. Heat + altered mental status ⇒ emergency
check(
  "Heat + altered mental status",
  intake({ bodyRegion: "heat", mechanism: "heat", redFlags: ["heatAltered"] }),
  "emergency",
  { roadmap: "heatIllness" },
);

// 8. Chest pain ⇒ emergency
check(
  "Chest pain",
  intake({ bodyRegion: "other", mechanism: "unknown", redFlags: ["chestPain"] }),
  "emergency",
);

// 9. Head impact, no symptoms ⇒ sportsMed + no same-day RTP
check(
  "Head + contact, no symptoms",
  intake({ bodyRegion: "head", mechanism: "contact" }),
  "sportsMed",
  { roadmap: "concussion", restrictionIncludes: "head" },
);

// 10. Knee twist + isolated pop ⇒ sportsMed
check(
  "Knee + twist + pop (no swelling)",
  intake({ bodyRegion: "knee", mechanism: "twist", functional: { pop: "yes", swelling: "no" } }),
  "sportsMed",
  { roadmap: "knee" },
);

// 11. Neuro symptoms after trauma ⇒ emergency
check(
  "Numbness/weakness",
  intake({ bodyRegion: "neck", mechanism: "contact", redFlags: ["numbnessWeakness"] }),
  "emergency",
  { roadmap: "general" },
);

// 12. Heat symptoms without altered status ⇒ urgent
check(
  "Heat + dizziness/weakness",
  intake({ bodyRegion: "heat", mechanism: "heat", redFlags: ["heatDizzyWeak"] }),
  "urgent",
  { roadmap: "heatIllness" },
);

// 13. Pop + swelling together ⇒ urgent
check(
  "Knee + pop + swelling",
  intake({ bodyRegion: "knee", mechanism: "twist", functional: { pop: "yes", swelling: "yes" } }),
  "urgent",
);

// 14. Hamstring sprint, mild ⇒ monitor, hamstring roadmap
check(
  "Thigh + sprinting, mild",
  intake({
    bodyRegion: "thigh",
    mechanism: "sprinting",
    functional: { canWalk: "yes", trend: "unchanged" },
  }),
  "monitor",
  { roadmap: "hamstring" },
);

// 15. Wrist overuse ⇒ sportsMed, general roadmap
check(
  "Wrist + overuse",
  intake({ bodyRegion: "wrist", mechanism: "overuse" }),
  "sportsMed",
  { roadmap: "general" },
);

// 16. Head injury with a non-impact mechanism still gets evaluated (was a
//     monitor under-triage before the safety fix).
check(
  "Head + twist, no symptoms",
  intake({ bodyRegion: "head", mechanism: "twist" }),
  "sportsMed",
  { roadmap: "concussion", restrictionIncludes: "head" },
);

// 17. Head + unknown mechanism, no symptoms ⇒ sportsMed (not monitor)
check(
  "Head + unknown, no symptoms",
  intake({ bodyRegion: "head", mechanism: "unknown" }),
  "sportsMed",
  { roadmap: "concussion" },
);

// 18. Concussion symptom coded under NECK still enforces no-same-day RTP
check(
  "Neck + foggy (concussion symptom)",
  intake({ bodyRegion: "neck", mechanism: "contact", redFlags: ["conFoggy"] }),
  "urgent",
  { restrictionIncludes: "same-day" },
);

// 19. Compartment-syndrome combination (two urgent flags → emergency)
check(
  "Compartment syndrome combo (severe pain + rapid swelling)",
  intake({
    bodyRegion: "calf",
    mechanism: "sprinting",
    redFlags: ["severePain", "rapidSwelling"],
  }),
  "emergency",
);

// 20. Young athlete + bone tenderness → physeal-fracture concern → sportsMed
check(
  "Young + bone tenderness (physeal concern)",
  intake({
    athlete: { age: 11 },
    bodyRegion: "ankle",
    mechanism: "twist",
    functional: { canWalk: "yes", boneTenderness: "yes", trend: "unchanged" },
  }),
  "sportsMed",
  { roadmap: "ankle" },
);

// 21. Adult bone-point tenderness still escalates (Ottawa-style fracture concern)
check(
  "Adult + bone tenderness → sportsMed",
  intake({
    athlete: { age: 22 },
    bodyRegion: "ankle",
    mechanism: "twist",
    functional: { canWalk: "yes", boneTenderness: "yes", trend: "improving" },
  }),
  "sportsMed",
);

// 21b. Adult, no bone tenderness, mild improving → still monitor (control)
check(
  "Adult + no bone tenderness, mild improving → monitor",
  intake({
    athlete: { age: 22 },
    bodyRegion: "ankle",
    mechanism: "twist",
    functional: { canWalk: "yes", boneTenderness: "no", trend: "improving" },
  }),
  "monitor",
);

// 21c. Head/neck + cannot move → emergency (spine/neuro)
check(
  "Head + cannot move → emergency",
  intake({
    bodyRegion: "head",
    mechanism: "contact",
    functional: { canMove: "no" },
  }),
  "emergency",
  { restrictionIncludes: "return to play" },
);

// 22. Second-impact: kept playing after a head injury with symptoms
check(
  "Second-impact (kept playing after head injury)",
  intake({
    bodyRegion: "head",
    mechanism: "contact",
    redFlags: ["conHeadache"],
    functional: { continuedPlaying: "yes" },
  }),
  "urgent",
  { restrictionIncludes: "same-day" },
);

// 23. Little League elbow: young thrower → sportsMed
check(
  "Young thrower + elbow",
  intake({ athlete: { age: 12 }, bodyRegion: "elbow", mechanism: "throwing" }),
  "sportsMed",
  { roadmap: "elbowThrowing" },
);

// ── Reachability: the dangerous flags must be checkable under mis-coding ─────
function reachable(
  name: string,
  region: BodyRegionId | undefined,
  mech: MechanismId | undefined,
  flagId: string,
) {
  const ok = screenedRedFlags(region, mech).some((f) => f.id === flagId);
  if (ok) {
    pass++;
    console.log(`✓ ${name}`);
  } else {
    fail++;
    console.log(`✗ ${name} — "${flagId}" not screened for ${region}/${mech}`);
  }
}

reachable("Heat-altered reachable: other + sprinting", "other", "sprinting", "heatAltered");
reachable("Heat-altered reachable: other + contact", "other", "contact", "heatAltered");
reachable("Heat-altered reachable: head + fall", "head", "fall", "heatAltered");
reachable("Concussion reachable: neck region", "neck", undefined, "conFoggy");
reachable("Concussion reachable: other + twist", "other", "twist", "conFoggy");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
