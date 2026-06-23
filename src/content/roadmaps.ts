import type { LocalizedText, Roadmap, RoadmapId } from "@/lib/types";

/**
 * RETURN-TO-PLAY ROADMAPS
 *
 * Every roadmap uses the same 7 staged steps (STAGE_TITLES). Each injury only
 * customizes the `details` — one line per stage. To edit a roadmap, change its
 * intro and the 7 detail lines below. To change the stage names for ALL
 * roadmaps at once, edit STAGE_TITLES.
 *
 * These are GENERAL guides. The app never clears anyone — progression requires
 * a clinician or athletic trainer.
 */
export const STAGE_TITLES: LocalizedText[] = [
  { en: "Protect and calm symptoms", es: "Proteger y calmar los síntomas" },
  {
    en: "Restore normal daily function",
    es: "Recuperar la función diaria normal",
  },
  {
    en: "Restore mobility and strength",
    es: "Recuperar movilidad y fuerza",
  },
  {
    en: "Reintroduce sport-specific movement",
    es: "Reintroducir el movimiento específico del deporte",
  },
  { en: "Controlled practice", es: "Práctica controlada" },
  { en: "Full practice", es: "Práctica completa" },
  {
    en: "Competition — only after appropriate clearance",
    es: "Competencia — solo después de la autorización adecuada",
  },
];

interface RoadmapSource {
  name: LocalizedText;
  intro: LocalizedText;
  details: LocalizedText[]; // exactly 7, matching STAGE_TITLES
}

const sources: Record<RoadmapId, RoadmapSource> = {
  ankle: {
    name: { en: "Ankle injury", es: "Lesión de tobillo" },
    intro: {
      en: "A general guide for ankle sprains and similar ankle injuries. Move to the next stage only when the current one is pain-free.",
      es: "Una guía general para esguinces y lesiones similares de tobillo. Avance a la siguiente etapa solo cuando la actual no cause dolor.",
    },
    details: [
      {
        en: "Protect the ankle, limit weight-bearing to what is comfortable, and control swelling with compression and elevation.",
        es: "Proteja el tobillo, apoye solo el peso que sea cómodo y controle la hinchazón con compresión y elevación.",
      },
      {
        en: "Walk normally without a limp and manage stairs before progressing.",
        es: "Camine con normalidad sin cojear y suba y baje escaleras antes de avanzar.",
      },
      {
        en: "Restore full ankle motion and rebuild calf and ankle strength and balance.",
        es: "Recupere todo el movimiento del tobillo y reconstruya la fuerza y el equilibrio de la pantorrilla y el tobillo.",
      },
      {
        en: "Add jogging, then cutting, hopping, and pivoting without pain or new swelling.",
        es: "Agregue trote, luego cambios de dirección, saltos y giros sin dolor ni hinchazón nueva.",
      },
      {
        en: "Non-contact, sport-specific drills at controlled speed.",
        es: "Ejercicios sin contacto, específicos del deporte, a velocidad controlada.",
      },
      {
        en: "Full-speed practice with normal confidence and no swelling afterward.",
        es: "Práctica a velocidad completa con confianza normal y sin hinchazón después.",
      },
      {
        en: "Return to competition once a clinician or athletic trainer agrees the ankle is ready.",
        es: "Vuelva a competir cuando un profesional o entrenador atlético confirme que el tobillo está listo.",
      },
    ],
  },
  knee: {
    name: { en: "Knee injury", es: "Lesión de rodilla" },
    intro: {
      en: "A general guide for knee injuries. A “pop,” swelling, or the knee giving way deserves a clinician's evaluation before progressing.",
      es: "Una guía general para lesiones de rodilla. Un “tronido,” hinchazón o que la rodilla ceda merece la evaluación de un profesional antes de avanzar.",
    },
    details: [
      {
        en: "Protect the knee, control swelling, and avoid movements that make it give way.",
        es: "Proteja la rodilla, controle la hinchazón y evite los movimientos que hacen que ceda.",
      },
      {
        en: "Walk and do stairs comfortably with full weight on the leg.",
        es: "Camine y suba escaleras con comodidad, apoyando todo el peso en la pierna.",
      },
      {
        en: "Restore full motion and rebuild quad, hamstring, and hip strength.",
        es: "Recupere todo el movimiento y reconstruya la fuerza del cuádriceps, isquiotibiales y cadera.",
      },
      {
        en: "Add running, then cutting, jumping, and controlled landings.",
        es: "Agregue carrera, luego cambios de dirección, saltos y aterrizajes controlados.",
      },
      {
        en: "Non-contact, sport-specific drills with good control and no instability.",
        es: "Ejercicios sin contacto, específicos del deporte, con buen control y sin inestabilidad.",
      },
      {
        en: "Full-speed practice without swelling, pain, or the knee giving way.",
        es: "Práctica a velocidad completa sin hinchazón, dolor ni que la rodilla ceda.",
      },
      {
        en: "Return to competition only after clearance — especially after a pop, swelling, or instability.",
        es: "Vuelva a competir solo después de la autorización — sobre todo tras un tronido, hinchazón o inestabilidad.",
      },
    ],
  },
  hamstring: {
    name: {
      en: "Hamstring / thigh injury",
      es: "Lesión de isquiotibiales / muslo",
    },
    intro: {
      en: "A general guide for hamstring and thigh muscle strains. Hamstrings re-injure easily, so do not rush the sprinting stages.",
      es: "Una guía general para distensiones del isquiotibial y del muslo. Los isquiotibiales se vuelven a lesionar con facilidad, así que no apresure las etapas de esprintar.",
    },
    details: [
      {
        en: "Protect the muscle, avoid aggressive stretching, and ease into daily movement.",
        es: "Proteja el músculo, evite los estiramientos agresivos y retome el movimiento diario poco a poco.",
      },
      {
        en: "Walk and climb stairs without a limp or sharp pain.",
        es: "Camine y suba escaleras sin cojear ni dolor agudo.",
      },
      {
        en: "Rebuild hamstring strength and length gradually, including lengthened-position work.",
        es: "Reconstruya la fuerza y la longitud del isquiotibial de forma gradual, incluyendo trabajo en posición alargada.",
      },
      {
        en: "Progress jogging to striding and faster running as pain allows.",
        es: "Avance del trote a zancadas y carrera más rápida según lo permita el dolor.",
      },
      {
        en: "Add sport-specific sprinting and change of direction at controlled effort.",
        es: "Agregue esprints y cambios de dirección específicos del deporte con esfuerzo controlado.",
      },
      {
        en: "Full-speed sprinting and practice without pulling or pain.",
        es: "Esprints a velocidad completa y práctica sin tirones ni dolor.",
      },
      {
        en: "Return to competition once sprinting is pain-free and a clinician agrees.",
        es: "Vuelva a competir cuando esprintar no cause dolor y un profesional esté de acuerdo.",
      },
    ],
  },
  shoulder: {
    name: { en: "Shoulder injury", es: "Lesión de hombro" },
    intro: {
      en: "A general guide for shoulder injuries. Build overhead and throwing load slowly and stop with sharp pain.",
      es: "Una guía general para lesiones de hombro. Aumente la carga por encima de la cabeza y de lanzar lentamente y deténgase ante un dolor agudo.",
    },
    details: [
      {
        en: "Protect the shoulder, rest from overhead and painful positions, and ease the pain.",
        es: "Proteja el hombro, descanse de las posiciones por encima de la cabeza y dolorosas, y calme el dolor.",
      },
      {
        en: "Use the arm for daily tasks like dressing and reaching without sharp pain.",
        es: "Use el brazo para tareas diarias como vestirse y alcanzar objetos sin dolor agudo.",
      },
      {
        en: "Restore full motion and rebuild rotator cuff and shoulder-blade strength.",
        es: "Recupere todo el movimiento y reconstruya la fuerza del manguito rotador y del omóplato.",
      },
      {
        en: "Add throwing or overhead sport movements gradually — start light and short.",
        es: "Agregue movimientos de lanzar o por encima de la cabeza de forma gradual — empiece ligero y corto.",
      },
      {
        en: "Controlled sport-specific drills, building throwing distance and volume in steps.",
        es: "Ejercicios controlados específicos del deporte, aumentando la distancia y el volumen de lanzar por pasos.",
      },
      {
        en: "Full practice with normal strength and no pain during or after.",
        es: "Práctica completa con fuerza normal y sin dolor durante ni después.",
      },
      {
        en: "Return to competition once strength and control return and a clinician agrees.",
        es: "Vuelva a competir cuando regresen la fuerza y el control y un profesional esté de acuerdo.",
      },
    ],
  },
  elbowThrowing: {
    name: {
      en: "Elbow / throwing-arm pain",
      es: "Dolor de codo / brazo de lanzar",
    },
    intro: {
      en: "A general guide for elbow and throwing-arm pain. Throwing-arm pain in young athletes deserves respect — get it evaluated before building back up.",
      es: "Una guía general para el dolor de codo y del brazo de lanzar. El dolor del brazo de lanzar en atletas jóvenes merece atención — evalúelo antes de volver a aumentar la carga.",
    },
    details: [
      {
        en: "Stop throwing, protect the elbow, and calm the pain.",
        es: "Deje de lanzar, proteja el codo y calme el dolor.",
      },
      {
        en: "Use the arm for daily activities without elbow pain.",
        es: "Use el brazo para actividades diarias sin dolor de codo.",
      },
      {
        en: "Restore motion and rebuild forearm, wrist, and shoulder strength.",
        es: "Recupere el movimiento y reconstruya la fuerza del antebrazo, la muñeca y el hombro.",
      },
      {
        en: "Begin a gradual interval throwing program — short, light, with rest days.",
        es: "Comience un programa de lanzamiento por intervalos gradual — corto, ligero y con días de descanso.",
      },
      {
        en: "Build throwing distance, then intensity, in controlled steps and without pain.",
        es: "Aumente la distancia de lanzar y luego la intensidad, en pasos controlados y sin dolor.",
      },
      {
        en: "Return to full throwing volume and practice without pain or loss of control.",
        es: "Vuelva al volumen completo de lanzar y a la práctica sin dolor ni pérdida de control.",
      },
      {
        en: "Return to competition or pitching only after a clinician clears it.",
        es: "Vuelva a competir o a lanzar solo después de que un profesional lo autorice.",
      },
    ],
  },
  concussion: {
    name: { en: "Concussion", es: "Conmoción cerebral" },
    intro: {
      en: "A general guide based on stepwise concussion recovery. There is no same-day return to play after a suspected concussion, and full-contact stages need written medical clearance.",
      es: "Una guía general basada en la recuperación por pasos de la conmoción. No hay regreso al juego el mismo día tras una sospecha de conmoción, y las etapas de contacto completo requieren autorización médica por escrito.",
    },
    details: [
      {
        en: "Stop activity right away. Rest the brain and body for the first 1–2 days, then begin light activity as tolerated.",
        es: "Detenga la actividad de inmediato. Descanse el cerebro y el cuerpo los primeros 1–2 días, luego comience actividad ligera según lo tolere.",
      },
      {
        en: "Return to learning first — school and daily tasks before sport, without significantly worsening symptoms.",
        es: "Primero regrese al aprendizaje — la escuela y las tareas diarias antes que el deporte, sin que los síntomas empeoren de forma importante.",
      },
      {
        en: "Add light aerobic activity (walking, stationary bike) that does not bring on symptoms.",
        es: "Agregue actividad aeróbica ligera (caminar, bicicleta fija) que no provoque síntomas.",
      },
      {
        en: "Progress to sport-specific exercise with no head-impact risk, if symptom-free.",
        es: "Avance a ejercicio específico del deporte sin riesgo de golpe en la cabeza, si no hay síntomas.",
      },
      {
        en: "Non-contact training and drills once cleared to that stage.",
        es: "Entrenamiento y ejercicios sin contacto una vez autorizado para esa etapa.",
      },
      {
        en: "Full-contact practice only after written medical clearance.",
        es: "Práctica de contacto completo solo después de la autorización médica por escrito.",
      },
      {
        en: "Return to competition only after medical clearance and completing the stepwise progression.",
        es: "Vuelva a competir solo después de la autorización médica y de completar la progresión por pasos.",
      },
    ],
  },
  heatIllness: {
    name: { en: "Heat illness", es: "Enfermedad por calor" },
    intro: {
      en: "A general guide after heat illness. Severe heat illness with confusion or collapse is a medical emergency. Prior heat illness raises future risk, so reintroduce heat carefully.",
      es: "Una guía general después de una enfermedad por calor. La enfermedad por calor grave con confusión o colapso es una emergencia médica. Una enfermedad por calor previa aumenta el riesgo futuro, así que reintroduzca el calor con cuidado.",
    },
    details: [
      {
        en: "Stop activity, move to a cool place, cool the body, and hydrate. Severe cases are medical emergencies.",
        es: "Detenga la actividad, vaya a un lugar fresco, enfríe el cuerpo e hidrátese. Los casos graves son emergencias médicas.",
      },
      {
        en: "Return to normal daily activity and full hydration before any training.",
        es: "Regrese a la actividad diaria normal y a la hidratación completa antes de cualquier entrenamiento.",
      },
      {
        en: "Rebuild light activity in cooler conditions, watching how the body responds.",
        es: "Reanude la actividad ligera en condiciones más frescas, observando cómo responde el cuerpo.",
      },
      {
        en: "Gradually reintroduce sport activity with heat acclimatization over several days.",
        es: "Reintroduzca la actividad deportiva de forma gradual con aclimatación al calor durante varios días.",
      },
      {
        en: "Controlled practice in the heat with frequent breaks and fluids.",
        es: "Práctica controlada en el calor con descansos frecuentes y líquidos.",
      },
      {
        en: "Full practice once tolerating heat and exertion normally.",
        es: "Práctica completa una vez que tolere el calor y el esfuerzo con normalidad.",
      },
      {
        en: "Return to competition after clearance, with a hydration and heat-acclimatization plan.",
        es: "Vuelva a competir después de la autorización, con un plan de hidratación y aclimatación al calor.",
      },
    ],
  },
  calfAchilles: {
    name: {
      en: "Calf / Achilles pain",
      es: "Dolor de pantorrilla / Aquiles",
    },
    intro: {
      en: "A general guide for calf and Achilles pain. A sudden pop with severe pain or weakness pushing off needs urgent evaluation.",
      es: "Una guía general para el dolor de pantorrilla y de Aquiles. Un tronido repentino con dolor intenso o debilidad al impulsarse necesita evaluación urgente.",
    },
    details: [
      {
        en: "Protect the calf and Achilles, limit painful push-off, and control swelling.",
        es: "Proteja la pantorrilla y el Aquiles, limite el impulso doloroso y controle la hinchazón.",
      },
      {
        en: "Walk normally without a limp; a small heel lift may add comfort.",
        es: "Camine con normalidad sin cojear; una pequeña alza en el talón puede dar más comodidad.",
      },
      {
        en: "Rebuild calf strength and motion with progressive heel raises.",
        es: "Reconstruya la fuerza y el movimiento de la pantorrilla con elevaciones de talón progresivas.",
      },
      {
        en: "Add jogging, then hopping and faster running as pain allows.",
        es: "Agregue trote, luego saltos y carrera más rápida según lo permita el dolor.",
      },
      {
        en: "Sport-specific drills with cutting and sprinting at controlled speed.",
        es: "Ejercicios específicos del deporte con cambios de dirección y esprints a velocidad controlada.",
      },
      {
        en: "Full-speed practice without pain or a sense of weakness.",
        es: "Práctica a velocidad completa sin dolor ni sensación de debilidad.",
      },
      {
        en: "Return to competition once strong and pain-free and a clinician agrees.",
        es: "Vuelva a competir cuando esté fuerte y sin dolor y un profesional esté de acuerdo.",
      },
    ],
  },
  general: {
    name: { en: "General injury", es: "Lesión general" },
    intro: {
      en: "A general staged guide that applies to most injuries when a specific roadmap is not listed. Progress one stage at a time, and only with guidance from a clinician.",
      es: "Una guía general por etapas que aplica a la mayoría de las lesiones cuando no hay una guía específica. Avance una etapa a la vez y solo con la orientación de un profesional.",
    },
    details: [
      {
        en: "Protect the injured area, calm pain and swelling, and avoid aggravating movements.",
        es: "Proteja la zona lesionada, calme el dolor y la hinchazón y evite los movimientos que la agravan.",
      },
      {
        en: "Restore normal daily activities — walking, stairs, dressing — without significant pain.",
        es: "Recupere las actividades diarias normales — caminar, escaleras, vestirse — sin dolor importante.",
      },
      {
        en: "Rebuild full motion, strength, and balance around the injured area.",
        es: "Reconstruya todo el movimiento, la fuerza y el equilibrio alrededor de la zona lesionada.",
      },
      {
        en: "Gradually reintroduce the movements your sport requires.",
        es: "Reintroduzca de forma gradual los movimientos que requiere su deporte.",
      },
      {
        en: "Non-contact, sport-specific practice at controlled effort.",
        es: "Práctica sin contacto, específica del deporte, con esfuerzo controlado.",
      },
      {
        en: "Full-speed practice without pain, swelling, or instability.",
        es: "Práctica a velocidad completa sin dolor, hinchazón ni inestabilidad.",
      },
      {
        en: "Return to competition only after symptoms resolve and an appropriate professional agrees.",
        es: "Vuelva a competir solo después de que los síntomas desaparezcan y un profesional adecuado esté de acuerdo.",
      },
    ],
  },
};

function build(id: RoadmapId): Roadmap {
  const src = sources[id];
  return {
    id,
    name: src.name,
    intro: src.intro,
    stages: STAGE_TITLES.map((title, i) => ({
      title,
      detail: src.details[i],
    })),
  };
}

export const roadmaps: Roadmap[] = (Object.keys(sources) as RoadmapId[]).map(
  build,
);

export function getRoadmap(id: RoadmapId): Roadmap {
  return roadmaps.find((r) => r.id === id) ?? build("general");
}
