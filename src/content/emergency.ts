import type { LocalizedText } from "@/lib/types";

/**
 * ON-FIELD EMERGENCY ACTIONS — the "kill-you-today" field emergencies.
 *
 * These are general bystander/responder steps aligned with widely taught
 * guidance (AHA/NATA/Korey Stringer Institute): CPR + AED for collapse,
 * COOL-FIRST cold-water immersion for exertional heat stroke, spinal motion
 * restriction for suspected neck/spine injury, and direct pressure for severe
 * bleeding. They are NOT a substitute for 911 / trained emergency care.
 *
 * Order matters: most time-critical first.
 */
export interface EmergencyAction {
  id: string;
  title: LocalizedText;
  when: LocalizedText;
  steps: LocalizedText[];
}

export const emergencyActions: EmergencyAction[] = [
  {
    id: "collapse",
    title: {
      en: "Collapsed or unresponsive",
      es: "Colapsado o sin respuesta",
    },
    when: {
      en: "Not moving, not responding, or not breathing normally.",
      es: "No se mueve, no responde o no respira con normalidad.",
    },
    steps: [
      {
        en: "Call 911 and send someone to get the AED right now.",
        es: "Llame al 911 y envíe a alguien por el DEA (desfibrilador) ahora mismo.",
      },
      {
        en: "If they are not breathing normally, start CPR — push hard and fast in the center of the chest.",
        es: "Si no respira con normalidad, comience RCP — empuje fuerte y rápido en el centro del pecho.",
      },
      {
        en: "Gasping, or brief jerking right after the collapse, can still be cardiac arrest — do not wait, start CPR.",
        es: "Jadear, o sacudidas breves justo después del colapso, aún puede ser un paro cardíaco — no espere, comience RCP.",
      },
      {
        en: "Use the AED as soon as it arrives and follow its spoken instructions.",
        es: "Use el DEA en cuanto llegue y siga sus instrucciones habladas.",
      },
      {
        en: "Keep going until emergency responders take over.",
        es: "Continúe hasta que los servicios de emergencia se hagan cargo.",
      },
    ],
  },
  {
    id: "heatStroke",
    title: { en: "Possible heat stroke", es: "Posible golpe de calor" },
    when: {
      en: "A hot, exhausted athlete who is confused, stumbling, or collapses in the heat.",
      es: "Un atleta acalorado y agotado que está confundido, se tambalea o colapsa con el calor.",
    },
    steps: [
      { en: "Call 911.", es: "Llame al 911." },
      {
        en: "Cool first, transport second — start cooling the body immediately.",
        es: "Primero enfríe, después traslade — comience a enfriar el cuerpo de inmediato.",
      },
      {
        en: "Get them into cold water if possible, or pack ice / cold wet towels onto the neck, armpits, and groin.",
        es: "Métalo en agua fría si es posible, o coloque hielo / toallas húmedas frías en el cuello, las axilas y la ingle.",
      },
      {
        en: "Keep cooling until help arrives — do not wait to cool at the hospital.",
        es: "Siga enfriando hasta que llegue la ayuda — no espere para enfriar en el hospital.",
      },
      {
        en: "Ease off active cooling once the athlete is clearly cooler and more alert or starts shivering, so they don't get too cold.",
        es: "Reduzca el enfriamiento activo cuando el atleta esté claramente más fresco y más alerta o empiece a temblar, para que no se enfríe demasiado.",
      },
    ],
  },
  {
    id: "spine",
    title: {
      en: "Possible neck or spine injury",
      es: "Posible lesión de cuello o columna",
    },
    when: {
      en: "Neck pain after trauma, or numbness, tingling, or weakness in the arms or legs.",
      es: "Dolor de cuello tras un golpe, o entumecimiento, hormigueo o debilidad en brazos o piernas.",
    },
    steps: [
      { en: "Call 911.", es: "Llame al 911." },
      {
        en: "Do not move the athlete or twist the neck.",
        es: "No mueva al atleta ni le gire el cuello.",
      },
      {
        en: "Do not sit them up or try to walk them off the field.",
        es: "No lo siente ni intente sacarlo del campo caminando.",
      },
      {
        en: "Keep the head and neck still, in the position you found them.",
        es: "Mantenga la cabeza y el cuello quietos, en la posición en que los encontró.",
      },
      {
        en: "Do not remove a helmet or shoulder pads — wait for trained responders.",
        es: "No le quite el casco ni las hombreras — espere a personal capacitado.",
      },
    ],
  },
  {
    id: "bleeding",
    title: { en: "Severe bleeding", es: "Sangrado intenso" },
    when: {
      en: "Heavy bleeding that does not slow down.",
      es: "Sangrado abundante que no disminuye.",
    },
    steps: [
      { en: "Call 911.", es: "Llame al 911." },
      {
        en: "Press firmly on the wound with a clean cloth and keep pressing.",
        es: "Presione firmemente la herida con un paño limpio y siga presionando.",
      },
      {
        en: "If it soaks through, add more cloth on top — do not remove the first layer.",
        es: "Si se empapa, agregue más tela encima — no retire la primera capa.",
      },
      {
        en: "If an arm or leg is bleeding badly and won't stop, use a tourniquet if you have one and know how.",
        es: "Si un brazo o una pierna sangra mucho y no se detiene, use un torniquete si tiene uno y sabe cómo.",
      },
      {
        en: "Keep the athlete still and warm until help arrives.",
        es: "Mantenga al atleta quieto y abrigado hasta que llegue la ayuda.",
      },
    ],
  },
];
