import { redFlags } from "@/content/redFlags";
import type {
  BodyRegionId,
  Intake,
  MechanismId,
  Pathway,
  RoadmapId,
  TriageResult,
} from "@/lib/types";

/**
 * ============================================================================
 *  THE TRIAGE ENGINE  —  evaluateTriage(intake)
 * ============================================================================
 *
 *  This is the safety-critical heart of Next Play. It is deterministic and
 *  rules-based ON PURPOSE — no AI — so a physician can read, audit, and edit
 *  every decision.
 *
 *  Output: { pathway, reasons[], recommendations[], restrictions[], roadmapType }
 *    pathway:        "emergency" | "urgent" | "sportsMed" | "monitor"
 *    reasons:        why this pathway was chosen (localized)
 *    recommendations: intake-specific "what to do now" lines (localized)
 *    restrictions:    intake-specific "what not to do" lines (localized)
 *    roadmapType:    which return-to-play roadmap to show
 *
 *  HOW TO EDIT THE LOGIC
 *  • To change how a warning sign is treated, edit its `tier` in
 *    src/content/redFlags.ts ("emergency" or "urgent"). No change here needed.
 *  • To change the ordered decision rules, edit the if/else ladder below.
 *  • Rules are evaluated TOP TO BOTTOM. The first match wins, so the most
 *    dangerous conditions are checked first. When in doubt, the engine biases
 *    UP (toward more care), never down.
 *
 *  SAFETY INVARIANTS (kept true by these rules + the content files):
 *  • Never outputs "you are fine" or "cleared to play".
 *  • Never returns a diagnosis.
 *  • Head injury with any concussion symptom ⇒ no same-day return to play.
 *  • Heat with altered mental status / collapse ⇒ emergency.
 *  • Chest pain / fainting / trouble breathing / post-trauma neuro ⇒ emergency.
 * ============================================================================
 */
export function evaluateTriage(intake: Intake): TriageResult {
  const locale = intake.locale;
  /** Pick the right language for an inline reason/recommendation. */
  const L = (en: string, es: string) => (locale === "es" ? es : en);

  const fn = intake.functional;
  const region = intake.bodyRegion;
  const mech = intake.mechanism;
  const isHead = region === "head";

  // Which red flags did the user actually check?
  const checked = redFlags.filter((f) => intake.redFlags.includes(f.id));
  const checkedEmergency = checked.filter((f) => f.tier === "emergency");
  const checkedUrgent = checked.filter((f) => f.tier === "urgent");
  const hasConcussionSymptom = checked.some((f) => f.category === "concussion");
  const hasFlag = (id: string) => intake.redFlags.includes(id);
  // Heat context = heat region/mechanism OR any heat symptom was checked (so a
  // heat collapse mis-coded under a non-heat region still gets cooling guidance
  // and the heat-illness roadmap).
  const isHeat =
    region === "heat" ||
    mech === "heat" ||
    checked.some((f) => f.category === "heat");

  // Inability to move the head or neck after injury is a spine/neuro emergency,
  // not merely "urgent".
  const neuroImmobility =
    (region === "head" || region === "neck") && fn.canMove === "no";

  // ── COMBINATIONS that are dangerous together (escalate beyond single flags) ─
  // Compartment syndrome: severe pain out of proportion + rapidly worsening
  // swelling is a limb-threatening surgical emergency, not merely "urgent".
  const compartmentPattern = hasFlag("severePain") && hasFlag("rapidSwelling");
  // Second-impact concern: a head injury where the athlete kept playing.
  const secondImpactConcern =
    isHead && (hasConcussionSymptom || mech === "contact" || mech === "fall") &&
    fn.continuedPlaying === "yes";

  // ── AGE / SKELETAL MATURITY ───────────────────────────────────────────────
  // In a still-growing athlete the growth plate (physis) is weaker than nearby
  // ligament/tendon, so a "sprain" is more likely a physeal fracture and
  // apophysitis (e.g. Osgood-Schlatter, Sever's, Little League elbow) is common.
  const age = intake.athlete.age;
  const skeletallyImmature = age != null && age <= 14;

  const reasons: string[] = [];
  const recommendations: string[] = [];
  const restrictions: string[] = [];

  let roadmapType: RoadmapId = roadmapForRegion(region);
  if (roadmapType === "general" && isHeat) roadmapType = "heatIllness";

  /** Localized label for a checked red flag. */
  const flagLabel = (id: string) => {
    const f = checked.find((x) => x.id === id)!;
    return locale === "es" ? f.label.es : f.label.en;
  };

  let pathway: Pathway;

  // ── RULE 1 — EMERGENCY ────────────────────────────────────────────────────
  // Any emergency-tier red flag forces emergency. This includes loss of
  // consciousness, confusion, repeated vomiting, severe headache after head
  // impact, neck pain after trauma, neuro symptoms, chest pain/fainting,
  // trouble breathing, open fracture, and heat illness with altered mental
  // status — see src/content/redFlags.ts.
  if (checkedEmergency.length > 0 || compartmentPattern || neuroImmobility) {
    pathway = "emergency";
    checkedEmergency.forEach((f) => reasons.push(flagLabel(f.id)));
    if (neuroImmobility) {
      reasons.push(
        L(
          "Not being able to move the head or neck after an injury can mean a serious neck/spine injury and needs emergency evaluation. Do not move the athlete.",
          "No poder mover la cabeza o el cuello después de una lesión puede indicar una lesión grave de cuello o columna y necesita evaluación de emergencia. No mueva al atleta.",
        ),
      );
    }
    if (compartmentPattern) {
      reasons.push(
        L(
          "Severe pain together with rapidly worsening swelling can signal a dangerous build-up of pressure in the limb (compartment syndrome) and needs emergency evaluation.",
          "El dolor intenso junto con hinchazón que empeora rápido puede indicar una acumulación de presión peligrosa en la extremidad (síndrome compartimental) y necesita evaluación de emergencia.",
        ),
      );
    }
    recommendations.push(
      L(
        "Call 911 (or your local emergency number) or go to the nearest emergency department now.",
        "Llame al 911 (o a su número de emergencia local) o vaya a la sala de emergencias más cercana ahora.",
      ),
    );
    restrictions.push(L("Do not return to play.", "No debe volver a jugar."));
  }

  // ── RULE 2 — URGENT (same-day evaluation) ─────────────────────────────────
  // Any urgent-tier red flag (deformity, cannot bear weight, rapidly worsening
  // swelling, severe pain, concussion symptoms, heat symptoms) OR functional
  // findings that suggest a significant injury.
  else if (
    checkedUrgent.length > 0 ||
    fn.canWalk === "no" ||
    fn.canMove === "no" ||
    (fn.pop === "yes" && fn.swelling === "yes")
  ) {
    pathway = "urgent";
    checkedUrgent.forEach((f) => reasons.push(flagLabel(f.id)));
    if (fn.canWalk === "no")
      reasons.push(
        L(
          "The athlete cannot put weight on it.",
          "El atleta no puede apoyar peso.",
        ),
      );
    if (fn.canMove === "no")
      reasons.push(
        L(
          "The athlete cannot move the injured area.",
          "El atleta no puede mover la zona lesionada.",
        ),
      );
    if (fn.pop === "yes" && fn.swelling === "yes")
      reasons.push(
        L(
          "A “pop” together with swelling can signal a significant injury.",
          "Un “tronido” junto con hinchazón puede indicar una lesión importante.",
        ),
      );
    recommendations.push(
      L(
        "Arrange a same-day evaluation — sports medicine, urgent care, or the ER.",
        "Organice una evaluación el mismo día — medicina deportiva, atención urgente o la sala de emergencias.",
      ),
    );
    restrictions.push(
      L(
        "No return to play until it has been evaluated.",
        "No debe volver a jugar hasta que lo evalúen.",
      ),
    );
    if (hasFlag("severePain")) {
      recommendations.push(
        L(
          "Because the pain is severe, watch for compartment syndrome: get emergency care right away if the area becomes very tight, numb, cold, or pale, or the pain keeps climbing.",
          "Como el dolor es intenso, vigile el síndrome compartimental: busque atención de emergencia de inmediato si la zona se pone muy tensa, entumecida, fría o pálida, o el dolor sigue aumentando.",
        ),
      );
    }
  }

  // ── RULE 3 — HEAD / CONCUSSION region → always evaluate ────────────────────
  // ANY head-region injury (regardless of mechanism) with no red flags checked
  // still gets an evaluation rather than falling through to "monitor". The body
  // region alone justifies a concussion evaluation — we bias toward more care.
  else if (isHead) {
    pathway = "sportsMed";
    reasons.push(
      L(
        "A head injury should be checked, even if symptoms are mild right now.",
        "Una lesión en la cabeza debe revisarse, aunque los síntomas sean leves por ahora.",
      ),
    );
    recommendations.push(
      L(
        "Have the athlete evaluated for a possible concussion before any return to play.",
        "Haga que evalúen al atleta por una posible conmoción antes de cualquier regreso al juego.",
      ),
    );
  }

  // ── RULE 4 — SPORTS MEDICINE evaluation ───────────────────────────────────
  // Overuse, throwing-arm pain, symptoms that are getting worse, or an isolated
  // "pop" (which can signal a ligament injury even without swelling).
  else if (
    mech === "overuse" ||
    mech === "throwing" ||
    fn.trend === "worsening" ||
    fn.pop === "yes" ||
    fn.boneTenderness === "yes"
  ) {
    pathway = "sportsMed";
    if (fn.boneTenderness === "yes")
      reasons.push(
        skeletallyImmature
          ? L(
              "In a still-growing athlete, tenderness right over the bone can mean a growth-plate (physeal) injury rather than a simple sprain, and should be checked.",
              "En un atleta que aún está creciendo, el dolor justo sobre el hueso puede ser una lesión de la placa de crecimiento (fisis) y no un simple esguince, y debe revisarse.",
            )
          : L(
              "Tenderness right over the bone can be a sign of a fracture rather than a simple sprain, and is worth an evaluation.",
              "El dolor justo sobre el hueso puede ser señal de una fractura y no de un simple esguince, y conviene una evaluación.",
            ),
      );
    if (mech === "overuse")
      reasons.push(
        L(
          "Gradual, overuse-type pain usually needs a closer look.",
          "El dolor gradual por sobreuso suele necesitar una revisión más detallada.",
        ),
      );
    if (mech === "throwing")
      reasons.push(
        L(
          "Throwing or overhead arm pain should be evaluated.",
          "El dolor del brazo al lanzar o por encima de la cabeza debe evaluarse.",
        ),
      );
    if (fn.trend === "worsening")
      reasons.push(
        L(
          "Symptoms that are getting worse should be checked.",
          "Los síntomas que empeoran deben revisarse.",
        ),
      );
    if (fn.pop === "yes")
      reasons.push(
        L(
          "A “pop” at the time of injury can signal a ligament injury and is worth checking.",
          "Un “tronido” al momento de la lesión puede indicar una lesión de ligamento y conviene revisarlo.",
        ),
      );
    recommendations.push(
      L(
        "Schedule a sports medicine evaluation in the next several days.",
        "Programe una evaluación de medicina deportiva en los próximos días.",
      ),
    );
  }

  // ── RULE 5 — MONITOR ──────────────────────────────────────────────────────
  // The safe remainder. By elimination, anything reaching here has NO red flags
  // (every flag is emergency- or urgent-tier and was caught above), can bear
  // weight and move, is not worsening, and is not an overuse/throwing/pop case.
  // That is the "no warning signs, mild" picture the monitor pathway is for.
  else {
    pathway = "monitor";
    reasons.push(
      L(
        "No warning signs were reported and symptoms appear mild.",
        "No se reportaron signos de alarma y los síntomas parecen leves.",
      ),
    );
    recommendations.push(
      L(
        "Follow the first 72-hour plan and recheck symptoms regularly.",
        "Siga el plan para las primeras 72 horas y revise los síntomas con regularidad.",
      ),
    );
    restrictions.push(
      L(
        "Do not return to play if symptoms get worse.",
        "No vuelva a jugar si los síntomas empeoran.",
      ),
    );
  }

  // ── CROSS-CUTTING SAFETY (applied on top of the pathway above) ────────────

  // For any non-emergency, non-monitor pathway add the standard no-RTP line.
  if (pathway === "sportsMed") {
    restrictions.push(
      L(
        "No return to play while pain limits normal movement.",
        "No vuelva a jugar mientras el dolor limite el movimiento normal.",
      ),
    );
  }

  // CONCUSSION: ANY reported concussion symptom enforces "no same-day return to
  // play" — regardless of which body region was selected (a head impact may be
  // coded under neck/other). Head region gets the same message even with no
  // specific symptom checked.
  const noSameDayRtp = L(
    "No same-day return to play after a suspected concussion.",
    "No debe volver a jugar el mismo día tras una sospecha de conmoción.",
  );
  if (hasConcussionSymptom) {
    pushUnique(restrictions, noSameDayRtp);
  } else if (isHead) {
    if (pathway === "emergency" || pathway === "urgent") {
      pushUnique(restrictions, noSameDayRtp);
    } else {
      pushUnique(
        restrictions,
        L(
          "If this involved a blow to the head, do not return to play today and watch closely for new symptoms like headache, dizziness, confusion, or vomiting.",
          "Si hubo un golpe en la cabeza, no vuelva a jugar hoy y vigile de cerca síntomas nuevos como dolor de cabeza, mareo, confusión o vómito.",
        ),
      );
    }
  }

  // HEAT: reinforce cooling for any non-emergency heat pathway.
  if (isHeat && pathway !== "emergency") {
    pushUnique(
      recommendations,
      L(
        "Move to a cool place, cool the body, and hydrate.",
        "Vaya a un lugar fresco, enfríe el cuerpo e hidrátese.",
      ),
    );
  }

  // SECOND-IMPACT: a head injury where the athlete kept playing.
  if (secondImpactConcern) {
    pushUnique(
      reasons,
      L(
        "The athlete kept playing after a head injury. Returning to play before recovery raises the risk of a second, more serious brain injury — they should be removed from play and evaluated.",
        "El atleta siguió jugando después de una lesión en la cabeza. Volver a jugar antes de recuperarse aumenta el riesgo de una segunda lesión cerebral más grave — debe ser retirado del juego y evaluado.",
      ),
    );
    pushUnique(restrictions, noSameDayRtp);
  }

  // APOPHYSITIS: growth-plate overuse pattern in a young athlete (informational
  // reason only — the pathway is already a sports-medicine evaluation).
  if (skeletallyImmature && (mech === "overuse" || mech === "throwing")) {
    const note = apophysitisNote(region, mech, locale);
    if (note) pushUnique(reasons, note);
  }

  return { pathway, reasons, recommendations, restrictions, roadmapType };
}

/** A growth-plate overuse note tailored to common youth apophysitis sites. */
function apophysitisNote(
  region: BodyRegionId | undefined,
  mech: MechanismId | undefined,
  locale: string,
): string | null {
  const L = (en: string, es: string) => (locale === "es" ? es : en);
  if ((region === "elbow" || region === "shoulder") && mech === "throwing")
    return L(
      "In a young thrower, throwing-arm pain can come from the growth plate (e.g. Little League elbow or shoulder) and should be evaluated before more throwing.",
      "En un lanzador joven, el dolor del brazo de lanzar puede venir de la placa de crecimiento (p. ej., codo u hombro de Ligas Menores) y debe evaluarse antes de seguir lanzando.",
    );
  if (region === "knee")
    return L(
      "In a still-growing athlete, knee pain with activity can come from the growth area below the kneecap (Osgood-Schlatter) and is worth checking.",
      "En un atleta que aún crece, el dolor de rodilla con la actividad puede venir de la zona de crecimiento debajo de la rótula (Osgood-Schlatter) y conviene revisarlo.",
    );
  if (region === "calf" || region === "ankle")
    return L(
      "In a still-growing athlete, heel pain can come from the growth plate in the heel (Sever's) and is worth checking.",
      "En un atleta que aún crece, el dolor de talón puede venir de la placa de crecimiento del talón (Sever) y conviene revisarlo.",
    );
  return null;
}

/** Map the injured body region to its return-to-play roadmap. */
function roadmapForRegion(region?: BodyRegionId): RoadmapId {
  switch (region) {
    case "head":
      return "concussion";
    case "heat":
      return "heatIllness";
    case "ankle":
      return "ankle";
    case "knee":
      return "knee";
    case "thigh":
      return "hamstring";
    case "shoulder":
      return "shoulder";
    case "elbow":
      return "elbowThrowing";
    case "calf":
      return "calfAchilles";
    // neck, wrist, hip, other, or unset → the general staged roadmap
    default:
      return "general";
  }
}

function pushUnique(arr: string[], value: string) {
  if (!arr.includes(value)) arr.push(value);
}

/** True once the user has answered enough to compute a meaningful result. */
export function isIntakeReadyForResult(intake: Intake): boolean {
  return Boolean(intake.bodyRegion && intake.mechanism);
}
