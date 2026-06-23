/**
 * UI chrome strings (buttons, labels, headings).
 *
 * English (`en`) is the source of truth. Spanish (`es`) is typed as
 * `typeof en`, so if you add an English key the build will FAIL until you add
 * the matching Spanish key. That guarantees the two languages never drift.
 *
 * Medical / safety copy does NOT live here — it lives next to the content it
 * describes in carePathways.ts, redFlags.ts, roadmaps.ts, first72.ts, etc.
 */

import type { Locale } from "@/lib/types";

const en = {
  appName: "Next Play",
  tagline: "Clearer injury decisions. Safer return to play.",

  nav: {
    home: "Home",
    start: "Start",
    roadmaps: "Roadmaps",
    about: "About",
    disclaimer: "Disclaimer",
  },

  common: {
    back: "Back",
    continue: "Continue",
    startOver: "Start over",
    yes: "Yes",
    no: "No",
    unsure: "Not sure",
    notProvided: "Not provided",
    none: "None",
    present: "Present",
    absent: "Not reported",
    optional: "optional",
    step: "Step",
    of: "of",
    selected: "selected",
  },

  disclaimer: {
    bannerShort:
      "Next Play is guidance only. It does not diagnose or replace medical care.",
    coreLine: "This app does not replace medical care.",
    emergencyLine:
      "If this is a life-threatening emergency, call 911 (or your local emergency number) now.",
  },

  language: {
    label: "Language",
    en: "English",
    es: "Español",
    toggleA11y: "Switch language",
  },

  landing: {
    eyebrow: "Sports injury navigator",
    heading: "What happened?",
    sub: "Answer a few quick questions about the injury and we'll show you the next safest step — in English or Spanish.",
    startCta: "Start injury check",
    roadmapsCta: "Browse return-to-play roadmaps",
    reassureTitle: "What Next Play does",
    reassure: [
      "Gives clear, calm next steps after a sports injury",
      "Flags warning signs that need urgent or emergency care",
      "Creates a clean summary you can share with a clinician",
    ],
    notDiagnosisTitle: "What Next Play does not do",
    notDiagnosis: [
      "It does not diagnose your injury",
      "It does not clear anyone to return to play",
      "It does not replace a doctor, athletic trainer, or emergency care",
    ],
    emergencyNote:
      "If someone is unconscious, has trouble breathing, has chest pain, a possible neck injury, or seems very unwell — call 911 now.",
    emergencyEntry: "Someone is hurt badly right now",
    emergencyEntrySub: "Open on-field emergency steps",
    recheckBannerTitle: "Time to check in",
    recheckBannerBody: "You set a 72-hour check-in. How is the injury doing now?",
    recheckBannerCta: "Start re-check",
  },

  start: {
    title: "A few details to begin",
    sub: "This helps us tailor the guidance. Nothing is shared automatically.",
    roleLabel: "Who is using Next Play right now?",
    languageLabel: "Preferred language",
    athleteTitle: "About the athlete",
    age: "Age",
    agePlaceholder: "e.g. 15",
    sport: "Sport",
    sportPlaceholder: "e.g. Soccer",
    level: "Competition level",
    levelPlaceholder: "Select level",
    injuryWhen: "Date and time of injury",
    beginCta: "Begin injury check",
  },

  levels: {
    recreational: "Recreational",
    middleSchool: "Middle school",
    highSchool: "High school",
    club: "Club / travel",
    college: "College",
    adult: "Adult / professional",
  },

  intake: {
    regionTitle: "Where is the injury?",
    regionSub: "Choose the main area. You can pick “Other” if it isn't listed.",
    mechanismTitle: "How did it happen?",
    mechanismSub: "Pick the closest match.",
    redFlagsTitle: "Any warning signs right now?",
    redFlagsSub: "Check anything that is true right now. If none are true, continue.",
    redFlagsNone: "None of these are happening",
    redFlagAlertTitle: "This may be an emergency",
    redFlagAlertBody: "One or more warning signs you checked can be dangerous. If you have not already, call 911 or get emergency care now.",
    functionalTitle: "How is the athlete doing?",
    functionalSub: "Answer what you can. “Not sure” is a fine answer.",
    seeResult: "See guidance",
    selectToContinue: "Select an option to continue",
  },

  functional: {
    canWalk: "Can the athlete walk / put weight on it?",
    canMove: "Can they move the injured area?",
    pop: "Did they hear or feel a “pop”?",
    swelling: "Is there swelling?",
    bruising: "Is there bruising?",
    boneTenderness: "Is the pain right on the bone (not just the soft tissue)?",
    continuedPlaying: "Did they keep playing after it happened?",
    trend: "Are symptoms improving, the same, or getting worse?",
    improving: "Improving",
    unchanged: "About the same",
    worsening: "Getting worse",
  },

  result: {
    yourPathway: "Recommended next step",
    why: "Why you're seeing this",
    doNow: "What to do now",
    doNotDo: "What not to do",
    watchFor: "What to watch for — seek care sooner if:",
    nextStep: "Suggested next care step",
    rtp: "Return-to-play principle",
    first72: "Your first 72 hours",
    roadmap: "Return-to-play roadmap",
    roadmapSub: "A general staged guide. Progress only as a clinician advises.",
    seeFullRoadmap: "See full roadmap",
    generateSummary: "Generate clinician summary",
    share: "Share with parent / coach / ATC",
    restartCta: "Start a new injury check",
    callNow: "Call 911 now",
    disclaimerAtBottom:
      "Next Play gives general guidance based on what you entered. It does not diagnose and does not replace evaluation by a clinician.",
    incompleteTitle: "Let's finish the injury check first",
    incompleteSub:
      "We don't have enough information yet to show guidance. Start the quick injury check.",
    incompleteCta: "Start injury check",
    recheckTitle: "Check back in",
    recheckBody:
      "Symptoms can change. Plan to re-check the injury in about 72 hours — sooner if anything gets worse.",
    setReminder: "Remind me in 72 hours",
    reminderSet: "Re-check reminder set",
    addToCalendar: "Add to calendar",
    recheckNow: "Re-check now",
    shareLink: "Copy share link",
    showQr: "Show QR code",
    linkCopied: "Link copied",
  },

  summary: {
    title: "Clinician handoff summary",
    sub: "Share this with the doctor, athletic trainer, or physical therapist.",
    copy: "Copy summary",
    copied: "Copied",
    print: "Print / Save as PDF",
    backToResult: "Back to guidance",
    fields: {
      generated: "Generated",
      role: "Completed by",
      language: "Language preference",
      age: "Athlete age",
      sport: "Sport",
      level: "Competition level",
      region: "Body region",
      mechanism: "Mechanism of injury",
      injuryWhen: "Date / time of injury",
      symptoms: "Key symptoms reported",
      redFlagsPresent: "Red flags present",
      redFlagsAbsent: "Red flags screened — not reported",
      functional: "Functional findings",
      pathway: "Care pathway generated",
      concerns: "Parent / athlete concerns",
    },
    yearsOld: "years old",
    noConcerns: "None entered",
    noRedFlags: "None of the screened red flags were reported.",
    disclaimerLine:
      "Generated by Next Play, a navigation tool. Not a diagnosis. Clinical judgment supersedes this summary.",
    qrTitle: "Hand off to a clinician or ATC",
    qrSub: "They can scan this code or open the link to see this summary. The athlete's injury details are contained inside the link itself — share it only with people you trust, because anyone who receives or forwards the link can view it.",
    openLink: "Open shareable summary",
    readOnlyBadge: "Read-only summary",
    hideQr: "Hide code",
  },

  share: {
    title: "Next Play — injury guidance summary",
    copiedToClipboard: "Summary copied to clipboard",
    scanToOpen: "Scan to open the summary",
  },

  roadmaps: {
    title: "Return-to-play roadmaps",
    sub: "General staged guides for common injuries. Every athlete is different — progress only with guidance from a clinician.",
    stagesLabel: "Stages",
  },

  about: {
    title: "About Next Play",
    backHome: "Back to home",
  },

  emergency: {
    title: "On-field emergency",
    intro:
      "If an athlete is collapsed, unresponsive, or in danger, call 911 (or your local emergency number) first — then follow the steps below. These are general steps for trained responders and bystanders. They do not replace professional emergency care.",
    whenLabel: "Use this if",
    stepsLabel: "Do this",
    safetyNote:
      "Only do what you are trained and able to do safely. When in doubt, wait for emergency responders and keep the athlete still.",
    backHome: "Back to home",
  },

  recheck: {
    title: "How is the injury now?",
    sub: "A quick re-check. Answer honestly — if anything is worse, we'll point you to the right next step.",
    trendQuestion: "Compared to before, the injury is:",
    newFlagsTitle: "Which warning signs are happening now? (check or uncheck)",
    seeUpdated: "See updated guidance",
    noInjuryTitle: "Nothing to re-check yet",
    noInjurySub: "Start an injury check first, then you can come back to re-check it.",
  },

  pathwayLabels: {
    emergency: "Emergency",
    urgent: "Urgent",
    sportsMed: "Sports medicine",
    monitor: "Monitor",
  },
};

type UIStrings = typeof en;

const es: UIStrings = {
  appName: "Next Play",
  tagline: "Decisiones más claras. Un regreso al juego más seguro.",

  nav: {
    home: "Inicio",
    start: "Comenzar",
    roadmaps: "Guías",
    about: "Acerca de",
    disclaimer: "Aviso legal",
  },

  common: {
    back: "Atrás",
    continue: "Continuar",
    startOver: "Empezar de nuevo",
    yes: "Sí",
    no: "No",
    unsure: "No estoy seguro(a)",
    notProvided: "No indicado",
    none: "Ninguno",
    present: "Presente",
    absent: "No reportado",
    optional: "opcional",
    step: "Paso",
    of: "de",
    selected: "seleccionado(s)",
  },

  disclaimer: {
    bannerShort:
      "Next Play solo ofrece orientación. No diagnostica ni reemplaza la atención médica.",
    coreLine: "Esta aplicación no reemplaza la atención médica.",
    emergencyLine:
      "Si se trata de una emergencia que pone en riesgo la vida, llame al 911 (o a su número de emergencia local) ahora.",
  },

  language: {
    label: "Idioma",
    en: "English",
    es: "Español",
    toggleA11y: "Cambiar idioma",
  },

  landing: {
    eyebrow: "Guía de lesiones deportivas",
    heading: "¿Qué pasó?",
    sub: "Responda unas preguntas rápidas sobre la lesión y le mostraremos el siguiente paso más seguro, en inglés o español.",
    startCta: "Comenzar evaluación",
    roadmapsCta: "Ver guías de regreso al juego",
    reassureTitle: "Qué hace Next Play",
    reassure: [
      "Da pasos claros y tranquilos después de una lesión deportiva",
      "Señala signos de alarma que requieren atención urgente o de emergencia",
      "Crea un resumen claro que puede compartir con un profesional médico",
    ],
    notDiagnosisTitle: "Qué no hace Next Play",
    notDiagnosis: [
      "No diagnostica la lesión",
      "No autoriza a nadie a volver a jugar",
      "No reemplaza a un médico, entrenador atlético ni a la atención de emergencia",
    ],
    emergencyNote:
      "Si la persona está inconsciente, tiene dificultad para respirar, dolor de pecho, una posible lesión del cuello, o se ve muy mal, llame al 911 ahora.",
    emergencyEntry: "Alguien está gravemente herido ahora",
    emergencyEntrySub: "Abrir los pasos de emergencia en el campo",
    recheckBannerTitle: "Hora de revisar",
    recheckBannerBody: "Programó una revisión de 72 horas. ¿Cómo va la lesión ahora?",
    recheckBannerCta: "Comenzar revisión",
  },

  start: {
    title: "Algunos datos para empezar",
    sub: "Esto nos ayuda a ajustar la orientación. Nada se comparte automáticamente.",
    roleLabel: "¿Quién está usando Next Play en este momento?",
    languageLabel: "Idioma preferido",
    athleteTitle: "Sobre el atleta",
    age: "Edad",
    agePlaceholder: "ej. 15",
    sport: "Deporte",
    sportPlaceholder: "ej. Fútbol",
    level: "Nivel de competencia",
    levelPlaceholder: "Seleccione el nivel",
    injuryWhen: "Fecha y hora de la lesión",
    beginCta: "Comenzar evaluación",
  },

  levels: {
    recreational: "Recreativo",
    middleSchool: "Secundaria (middle school)",
    highSchool: "Preparatoria (high school)",
    club: "Club / viaje",
    college: "Universidad",
    adult: "Adulto / profesional",
  },

  intake: {
    regionTitle: "¿Dónde es la lesión?",
    regionSub: "Elija el área principal. Puede elegir “Otro” si no aparece.",
    mechanismTitle: "¿Cómo ocurrió?",
    mechanismSub: "Elija la opción más parecida.",
    redFlagsTitle: "¿Hay signos de alarma en este momento?",
    redFlagsSub: "Marque lo que sea cierto ahora mismo. Si no hay ninguno, continúe.",
    redFlagsNone: "Ninguno de estos está ocurriendo",
    redFlagAlertTitle: "Esto puede ser una emergencia",
    redFlagAlertBody: "Uno o más signos de alarma que marcó pueden ser peligrosos. Si aún no lo ha hecho, llame al 911 o busque atención de emergencia ahora.",
    functionalTitle: "¿Cómo está el atleta?",
    functionalSub: "Responda lo que pueda. “No estoy seguro(a)” es una respuesta válida.",
    seeResult: "Ver orientación",
    selectToContinue: "Seleccione una opción para continuar",
  },

  functional: {
    canWalk: "¿Puede caminar o apoyar peso?",
    canMove: "¿Puede mover la zona lesionada?",
    pop: "¿Escuchó o sintió un “tronido”?",
    swelling: "¿Hay hinchazón?",
    bruising: "¿Hay moretones?",
    boneTenderness: "¿El dolor es justo sobre el hueso (no solo en el tejido blando)?",
    continuedPlaying: "¿Siguió jugando después de que ocurrió?",
    trend: "¿Los síntomas están mejorando, igual o empeorando?",
    improving: "Mejorando",
    unchanged: "Más o menos igual",
    worsening: "Empeorando",
  },

  result: {
    yourPathway: "Siguiente paso recomendado",
    why: "Por qué ve esto",
    doNow: "Qué hacer ahora",
    doNotDo: "Qué no hacer",
    watchFor: "A qué estar atento — busque atención antes si:",
    nextStep: "Siguiente paso de atención sugerido",
    rtp: "Principio para el regreso al juego",
    first72: "Sus primeras 72 horas",
    roadmap: "Guía de regreso al juego",
    roadmapSub: "Una guía general por etapas. Avance solo según lo indique un profesional.",
    seeFullRoadmap: "Ver guía completa",
    generateSummary: "Generar resumen para el médico",
    share: "Compartir con padre / entrenador / ATC",
    restartCta: "Comenzar una nueva evaluación",
    callNow: "Llame al 911 ahora",
    disclaimerAtBottom:
      "Next Play ofrece orientación general según lo que usted ingresó. No diagnostica y no reemplaza la evaluación de un profesional.",
    incompleteTitle: "Primero terminemos la evaluación",
    incompleteSub:
      "Todavía no tenemos suficiente información para mostrar orientación. Comience la evaluación rápida.",
    incompleteCta: "Comenzar evaluación",
    recheckTitle: "Vuelva a revisar",
    recheckBody:
      "Los síntomas pueden cambiar. Planee revisar la lesión en unas 72 horas — antes si algo empeora.",
    setReminder: "Recordarme en 72 horas",
    reminderSet: "Recordatorio de revisión activado",
    addToCalendar: "Agregar al calendario",
    recheckNow: "Revisar ahora",
    shareLink: "Copiar enlace para compartir",
    showQr: "Mostrar código QR",
    linkCopied: "Enlace copiado",
  },

  summary: {
    title: "Resumen para el profesional médico",
    sub: "Comparta esto con el médico, entrenador atlético o fisioterapeuta.",
    copy: "Copiar resumen",
    copied: "Copiado",
    print: "Imprimir / Guardar como PDF",
    backToResult: "Volver a la orientación",
    fields: {
      generated: "Generado",
      role: "Completado por",
      language: "Idioma preferido",
      age: "Edad del atleta",
      sport: "Deporte",
      level: "Nivel de competencia",
      region: "Región del cuerpo",
      mechanism: "Mecanismo de la lesión",
      injuryWhen: "Fecha / hora de la lesión",
      symptoms: "Síntomas principales reportados",
      redFlagsPresent: "Signos de alarma presentes",
      redFlagsAbsent: "Signos de alarma evaluados — no reportados",
      functional: "Hallazgos funcionales",
      pathway: "Vía de atención generada",
      concerns: "Preocupaciones del padre / atleta",
    },
    yearsOld: "años",
    noConcerns: "Ninguna ingresada",
    noRedFlags: "No se reportó ninguno de los signos de alarma evaluados.",
    disclaimerLine:
      "Generado por Next Play, una herramienta de orientación. No es un diagnóstico. El juicio clínico tiene prioridad sobre este resumen.",
    qrTitle: "Entregar a un médico o ATC",
    qrSub: "Pueden escanear este código o abrir el enlace para ver este resumen. Los datos de la lesión del atleta están dentro del propio enlace — compártalo solo con personas de confianza, porque cualquiera que reciba o reenvíe el enlace podrá verlo.",
    openLink: "Abrir resumen para compartir",
    readOnlyBadge: "Resumen de solo lectura",
    hideQr: "Ocultar código",
  },

  share: {
    title: "Next Play — resumen de orientación de la lesión",
    copiedToClipboard: "Resumen copiado al portapapeles",
    scanToOpen: "Escanee para abrir el resumen",
  },

  roadmaps: {
    title: "Guías de regreso al juego",
    sub: "Guías generales por etapas para lesiones comunes. Cada atleta es diferente — avance solo con la orientación de un profesional.",
    stagesLabel: "Etapas",
  },

  about: {
    title: "Acerca de Next Play",
    backHome: "Volver al inicio",
  },

  emergency: {
    title: "Emergencia en el campo",
    intro:
      "Si un atleta está colapsado, no responde o está en peligro, llame primero al 911 (o a su número de emergencia local) — luego siga los pasos de abajo. Estos son pasos generales para personas capacitadas y testigos. No reemplazan la atención de emergencia profesional.",
    whenLabel: "Use esto si",
    stepsLabel: "Haga esto",
    safetyNote:
      "Haga solo lo que esté capacitado y pueda hacer con seguridad. Ante la duda, espere a los servicios de emergencia y mantenga al atleta quieto.",
    backHome: "Volver al inicio",
  },

  recheck: {
    title: "¿Cómo está la lesión ahora?",
    sub: "Una revisión rápida. Responda con sinceridad — si algo empeora, le indicaremos el siguiente paso adecuado.",
    trendQuestion: "En comparación con antes, la lesión está:",
    newFlagsTitle: "¿Qué signos de alarma están ocurriendo ahora? (marque o desmarque)",
    seeUpdated: "Ver orientación actualizada",
    noInjuryTitle: "Nada que revisar todavía",
    noInjurySub: "Primero comience una evaluación; luego podrá volver a revisarla.",
  },

  pathwayLabels: {
    emergency: "Emergencia",
    urgent: "Urgente",
    sportsMed: "Medicina deportiva",
    monitor: "Vigilar",
  },
};

export const ui: Record<Locale, UIStrings> = { en, es };
