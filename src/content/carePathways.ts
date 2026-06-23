import type { Pathway, PathwayContent } from "@/lib/types";

/**
 * CARE PATHWAY CONTENT — the words shown on the /result page for each pathway.
 *
 * Safety rules baked in (do not remove):
 *  • Never says "you are fine" or "cleared to play".
 *  • Never gives a diagnosis.
 *  • Never tells anyone to return to competition on the app's word alone.
 *  • Always points return-to-play decisions to a clinician/ATC.
 *
 * The intake-specific lines (e.g. "you reported you can't bear weight") are
 * added by the triage engine; these are the general per-pathway blocks.
 */
export const carePathways: Record<Pathway, PathwayContent> = {
  emergency: {
    id: "emergency",
    title: { en: "Emergency now", es: "Emergencia ahora" },
    summary: {
      en: "This needs emergency medical evaluation now.",
      es: "Esto necesita evaluación médica de emergencia ahora.",
    },
    explanation: {
      en: "Based on what you entered, there are warning signs that can be dangerous. This needs to be checked by emergency medical professionals right away. Do not wait to see if it gets better.",
      es: "Según lo que usted ingresó, hay signos de alarma que pueden ser peligrosos. Esto debe ser evaluado por profesionales de emergencia de inmediato. No espere a ver si mejora.",
    },
    doNow: [
      {
        en: "Call 911 (or your local emergency number) or go to the nearest emergency department now.",
        es: "Llame al 911 (o a su número de emergencia local) o vaya a la sala de emergencias más cercana ahora.",
      },
      {
        en: "Stay with the athlete and keep them calm and as still as possible.",
        es: "Quédese con el atleta y manténgalo calmado y lo más quieto posible.",
      },
      {
        en: "If a neck or spine injury is possible, do not move them — wait for emergency responders.",
        es: "Si es posible una lesión de cuello o columna, no lo mueva — espere a los servicios de emergencia.",
      },
      {
        en: "Have someone gather medical information and emergency contacts.",
        es: "Pida a alguien que reúna la información médica y los contactos de emergencia.",
      },
    ],
    doNotDo: [
      {
        en: "Do not return to play.",
        es: "No debe volver a jugar.",
      },
      {
        en: "Do not let the athlete drive themselves.",
        es: "No deje que el atleta conduzca solo.",
      },
      {
        en: "Do not give food or drink if urgent treatment may be needed.",
        es: "No le dé comida ni bebida si podría necesitar tratamiento urgente.",
      },
      {
        en: "Do not wait to “see how it goes.”",
        es: "No espere a “ver cómo evoluciona.”",
      },
    ],
    watchFor: [
      {
        en: "Becoming harder to wake, more confused, or unresponsive",
        es: "Que sea más difícil de despertar, más confundido o que no responda",
      },
      {
        en: "Worsening headache, repeated vomiting, or a seizure",
        es: "Dolor de cabeza que empeora, vómitos repetidos o una convulsión",
      },
      {
        en: "Trouble breathing, chest pain, or bluish lips",
        es: "Dificultad para respirar, dolor de pecho o labios azulados",
      },
      {
        en: "Numbness, weakness, or loss of movement",
        es: "Entumecimiento, debilidad o pérdida de movimiento",
      },
    ],
    nextStep: {
      en: "Emergency department now — or call 911 (or your local emergency number).",
      es: "Sala de emergencias ahora — o llame al 911 (o a su número de emergencia local).",
    },
    rtpPrinciple: {
      en: "No return to play. Any return to sport is decided only by the treating medical team after evaluation and recovery.",
      es: "No debe volver a jugar. Cualquier regreso al deporte lo decide únicamente el equipo médico tratante, después de la evaluación y la recuperación.",
    },
  },

  urgent: {
    id: "urgent",
    title: {
      en: "Urgent — same-day evaluation",
      es: "Urgente — evaluación el mismo día",
    },
    summary: {
      en: "This should be evaluated today.",
      es: "Esto se debe evaluar hoy.",
    },
    explanation: {
      en: "What you described can need same-day care. Depending on how it looks in person, that may mean sports medicine, urgent care, or the emergency department. It is safer to be checked today than to wait.",
      es: "Lo que usted describió puede necesitar atención el mismo día. Según cómo se vea en persona, eso puede significar medicina deportiva, atención urgente o la sala de emergencias. Es más seguro que lo revisen hoy que esperar.",
    },
    doNow: [
      {
        en: "Arrange an evaluation today — sports medicine, urgent care, or the ER.",
        es: "Organice una evaluación hoy — medicina deportiva, atención urgente o la sala de emergencias.",
      },
      {
        en: "Rest the injured area and avoid testing it.",
        es: "Descanse la zona lesionada y evite ponerla a prueba.",
      },
      {
        en: "Use support if you have it — crutches, a sling, or a brace — to avoid stressing the area.",
        es: "Use apoyo si lo tiene — muletas, un cabestrillo o una férula — para no forzar la zona.",
      },
      {
        en: "Apply ice wrapped in a cloth for 15–20 minutes for comfort and swelling.",
        es: "Aplique hielo envuelto en un paño durante 15–20 minutos para la molestia y la hinchazón.",
      },
      {
        en: "Write down when symptoms started and whether they are changing.",
        es: "Anote cuándo comenzaron los síntomas y si están cambiando.",
      },
    ],
    doNotDo: [
      {
        en: "Do not return to play or practice today.",
        es: "No debe volver a jugar ni entrenar hoy.",
      },
      {
        en: "Do not “walk it off” or push through the pain.",
        es: "No intente “aguantarlo” ni seguir a pesar del dolor.",
      },
      {
        en: "Do not exceed standard label directions on pain medicine without asking a clinician.",
        es: "No exceda las indicaciones de la etiqueta de los analgésicos sin consultar a un profesional.",
      },
      {
        en: "Do not ignore the injury if it gets worse — move up to emergency care.",
        es: "No ignore la lesión si empeora — busque atención de emergencia.",
      },
    ],
    watchFor: [
      {
        en: "Numbness, weakness, or tingling",
        es: "Entumecimiento, debilidad u hormigueo",
      },
      {
        en: "The area becoming cold, pale, or blue",
        es: "Que la zona se vuelva fría, pálida o azulada",
      },
      {
        en: "Rapidly increasing swelling or severe pain",
        es: "Hinchazón que aumenta rápido o dolor intenso",
      },
      {
        en: "For head injuries: confusion, repeated vomiting, or a worsening headache",
        es: "En lesiones de cabeza: confusión, vómitos repetidos o un dolor de cabeza que empeora",
      },
    ],
    nextStep: {
      en: "Same-day evaluation: sports medicine clinic, urgent care, or emergency department.",
      es: "Evaluación el mismo día: clínica de medicina deportiva, atención urgente o sala de emergencias.",
    },
    rtpPrinciple: {
      en: "No return to play today. Return is a staged process guided by a clinician after evaluation.",
      es: "No debe volver a jugar hoy. El regreso es un proceso por etapas guiado por un profesional después de la evaluación.",
    },
  },

  sportsMed: {
    id: "sportsMed",
    title: {
      en: "Schedule a sports medicine evaluation",
      es: "Programe una evaluación de medicina deportiva",
    },
    summary: {
      en: "This should be checked by a sports medicine clinician.",
      es: "Esto debe ser revisado por un profesional de medicina deportiva.",
    },
    explanation: {
      en: "What you described often needs a closer look — for example persistent pain, a possible overuse injury, or throwing-arm pain. A sports medicine evaluation can find the cause and guide a safe return.",
      es: "Lo que usted describió a menudo necesita una revisión más detallada — por ejemplo, dolor persistente, una posible lesión por sobreuso o dolor en el brazo de lanzar. Una evaluación de medicina deportiva puede encontrar la causa y guiar un regreso seguro.",
    },
    doNow: [
      {
        en: "Schedule a sports medicine or appropriate clinic visit in the next several days.",
        es: "Programe una visita de medicina deportiva o a la clínica adecuada en los próximos días.",
      },
      {
        en: "Rest from the activity that brings on the pain (relative rest).",
        es: "Descanse de la actividad que provoca el dolor (descanso relativo).",
      },
      {
        en: "Keep moving in pain-free ranges to avoid stiffness.",
        es: "Siga moviéndose en los rangos sin dolor para evitar la rigidez.",
      },
      {
        en: "Use ice or compression for comfort if there is swelling.",
        es: "Use hielo o compresión para la molestia si hay hinchazón.",
      },
      {
        en: "Track what makes it better or worse to share with the clinician.",
        es: "Anote qué lo mejora o lo empeora para compartirlo con el profesional.",
      },
    ],
    doNotDo: [
      {
        en: "Do not return to play while pain limits normal movement.",
        es: "No vuelva a jugar mientras el dolor limite el movimiento normal.",
      },
      {
        en: "Do not push through sharp or worsening pain.",
        es: "No siga a pesar de un dolor agudo o que empeora.",
      },
      {
        en: "Do not start an aggressive new training program until evaluated.",
        es: "No comience un programa de entrenamiento intenso y nuevo hasta que lo evalúen.",
      },
      {
        en: "Do not assume rest alone will fix an overuse or throwing injury.",
        es: "No suponga que solo el descanso curará una lesión por sobreuso o de lanzar.",
      },
    ],
    watchFor: [
      {
        en: "Pain that keeps getting worse or wakes you at night",
        es: "Dolor que sigue empeorando o que lo despierta por la noche",
      },
      {
        en: "New swelling, locking, giving way, or a feeling of instability",
        es: "Nueva hinchazón, bloqueo, que ceda o una sensación de inestabilidad",
      },
      {
        en: "Numbness, weakness, or tingling",
        es: "Entumecimiento, debilidad u hormigueo",
      },
      {
        en: "Any of the emergency warning signs",
        es: "Cualquiera de los signos de alarma de emergencia",
      },
    ],
    nextStep: {
      en: "Sports medicine clinic, primary care sports medicine, or orthopedics — within a few days.",
      es: "Clínica de medicina deportiva, medicina deportiva de atención primaria u ortopedia — en pocos días.",
    },
    rtpPrinciple: {
      en: "Return to play follows a staged roadmap once a clinician confirms it is safe to progress.",
      es: "El regreso al juego sigue una guía por etapas una vez que un profesional confirma que es seguro avanzar.",
    },
  },

  monitor: {
    id: "monitor",
    title: {
      en: "Monitor with a first-72-hour plan",
      es: "Vigilar con un plan para las primeras 72 horas",
    },
    summary: {
      en: "Mild symptoms with no warning signs right now — monitor closely.",
      es: "Síntomas leves sin signos de alarma por ahora — vigile de cerca.",
    },
    explanation: {
      en: "Right now there are no warning signs and symptoms seem mild. It is reasonable to monitor with the plan below — but keep watching closely. If anything gets worse, move up to getting it checked. “No warning signs now” does not mean “cleared to play.”",
      es: "Por ahora no hay signos de alarma y los síntomas parecen leves. Es razonable vigilar con el plan de abajo — pero siga observando de cerca. Si algo empeora, busque que lo revisen. “No hay signos de alarma ahora” no significa “autorizado para jugar.”",
    },
    doNow: [
      {
        en: "Follow the first 72-hour plan below.",
        es: "Siga el plan para las primeras 72 horas que aparece abajo.",
      },
      {
        en: "Protect the area and ease back into normal daily movement as comfort allows.",
        es: "Proteja la zona y retome el movimiento diario normal según lo permita la comodidad.",
      },
      {
        en: "Use ice or compression for comfort if it is swollen.",
        es: "Use hielo o compresión para la molestia si está hinchado.",
      },
      {
        en: "Recheck symptoms at least once a day.",
        es: "Revise los síntomas al menos una vez al día.",
      },
    ],
    doNotDo: [
      {
        en: "Do not return to full play while symptoms are present.",
        es: "No vuelva al juego completo mientras haya síntomas.",
      },
      {
        en: "Do not ignore symptoms that get worse instead of better.",
        es: "No ignore los síntomas que empeoran en lugar de mejorar.",
      },
      {
        en: "Do not treat “no warning signs now” as being cleared to play.",
        es: "No tome “no hay signos de alarma ahora” como una autorización para jugar.",
      },
    ],
    watchFor: [
      {
        en: "Symptoms getting worse instead of better over 2–3 days",
        es: "Síntomas que empeoran en lugar de mejorar durante 2–3 días",
      },
      {
        en: "New swelling, instability, or inability to bear weight",
        es: "Nueva hinchazón, inestabilidad o incapacidad para apoyar peso",
      },
      {
        en: "Numbness, weakness, or tingling",
        es: "Entumecimiento, debilidad u hormigueo",
      },
      {
        en: "Any emergency warning sign — then seek care right away",
        es: "Cualquier signo de alarma de emergencia — entonces busque atención de inmediato",
      },
    ],
    nextStep: {
      en: "If it is not clearly improving in a few days — or sooner if it worsens — schedule a sports medicine evaluation.",
      es: "Si no mejora claramente en unos días — o antes si empeora — programe una evaluación de medicina deportiva.",
    },
    rtpPrinciple: {
      en: "Returning to play is a gradual, staged process. Any return decision should involve a clinician, athletic trainer, or appropriate professional — not this app alone.",
      es: "Volver a jugar es un proceso gradual y por etapas. Cualquier decisión de regreso debe involucrar a un profesional médico, entrenador atlético o profesional adecuado — no solo esta aplicación.",
    },
  },
};

export function getPathwayContent(id: Pathway): PathwayContent {
  return carePathways[id];
}
