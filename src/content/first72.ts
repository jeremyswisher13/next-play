import type { First72Block } from "@/lib/types";

/**
 * Reusable first-72-hour content blocks. Shown on the /result page for the
 * monitor and sports-medicine pathways. No specific medication dosing — any
 * medication guidance is intentionally "ask your clinician."
 */
export const first72: First72Block[] = [
  {
    id: "painSwelling",
    title: { en: "Pain & swelling", es: "Dolor e hinchazón" },
    body: {
      en: "For the first 2–3 days, calm pain and swelling. Use ice wrapped in a thin cloth for 15–20 minutes a few times a day, and raise the injured area above heart level when you can. Short, gentle movement is usually better than complete stillness.",
      es: "Durante los primeros 2–3 días, calme el dolor y la hinchazón. Use hielo envuelto en un paño fino durante 15–20 minutos varias veces al día y eleve la zona lesionada por encima del nivel del corazón cuando pueda. Un movimiento suave y breve suele ser mejor que la quietud total.",
    },
  },
  {
    id: "relativeRest",
    title: { en: "Relative rest", es: "Descanso relativo" },
    body: {
      en: "Rest from the sport and from anything that clearly hurts — but you do not need total bed rest. Keep doing comfortable, pain-free daily activities so the area does not get stiff and weak.",
      es: "Descanse del deporte y de cualquier cosa que claramente duela — pero no necesita reposo total en cama. Siga haciendo actividades diarias cómodas y sin dolor para que la zona no se ponga rígida y débil.",
    },
  },
  {
    id: "movement",
    title: {
      en: "Safe movement",
      es: "Movimiento seguro",
    },
    body: {
      en: "Gently move the injured area within a comfortable, pain-free range several times a day. Stop anything that causes sharp or increasing pain. Easy motion helps healing; forcing it does not.",
      es: "Mueva suavemente la zona lesionada dentro de un rango cómodo y sin dolor varias veces al día. Deténgase si algo causa dolor agudo o creciente. El movimiento suave ayuda a sanar; forzarlo no.",
    },
  },
  {
    id: "compression",
    title: {
      en: "Compression & support",
      es: "Compresión y apoyo",
    },
    body: {
      en: "A simple elastic wrap or a brace can ease swelling and add comfort and support for ankles, knees, and wrists. It should feel snug, not tight — loosen it if the area becomes numb, cold, or more swollen below the wrap.",
      es: "Una venda elástica simple o una férula puede reducir la hinchazón y dar comodidad y apoyo a tobillos, rodillas y muñecas. Debe sentirse ajustada, no apretada — aflójela si la zona se entumece, se enfría o se hincha más por debajo de la venda.",
    },
  },
  {
    id: "noWorseReturn",
    title: {
      en: "Do not return to play if it is worsening",
      es: "No vuelva a jugar si está empeorando",
    },
    body: {
      en: "Symptoms should be improving over 2–3 days. Do not return to play while symptoms are present, and do not push through pain. If it is getting worse instead of better, treat that as a sign to get it checked.",
      es: "Los síntomas deberían ir mejorando en 2–3 días. No vuelva a jugar mientras haya síntomas y no siga a pesar del dolor. Si está empeorando en lugar de mejorar, tómelo como una señal para que lo revisen.",
    },
  },
  {
    id: "seekSooner",
    title: {
      en: "When to seek care sooner",
      es: "Cuándo buscar atención antes",
    },
    body: {
      en: "Get care sooner if pain becomes severe, swelling increases quickly, the area cannot bear weight or move, or you notice numbness, weakness, or tingling. For any emergency warning sign — such as confusion, fainting, chest pain, or trouble breathing — call 911.",
      es: "Busque atención antes si el dolor se vuelve intenso, la hinchazón aumenta rápido, la zona no puede apoyar peso ni moverse, o nota entumecimiento, debilidad u hormigueo. Ante cualquier signo de alarma de emergencia — como confusión, desmayo, dolor de pecho o dificultad para respirar — llame al 911.",
    },
  },
  {
    id: "medication",
    title: {
      en: "About pain medicine",
      es: "Sobre los analgésicos",
    },
    body: {
      en: "Ask your clinician or pharmacist before using pain medicine, especially for a child or teen. Follow the directions on the label, and do not use medicine to mask pain so you can keep playing.",
      es: "Consulte a su profesional médico o farmacéutico antes de usar analgésicos, especialmente en un niño o adolescente. Siga las indicaciones de la etiqueta y no use medicamentos para ocultar el dolor y seguir jugando.",
    },
  },
];
