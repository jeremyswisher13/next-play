"use client";

import Link from "next/link";
import { Phone, ArrowLeft, Siren, AlertTriangle } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { emergencyActions } from "@/content/emergency";
import { buttonVariants } from "@/components/ui/button";

export default function EmergencyPage() {
  const { t, ui } = useLocale();

  return (
    <div className="space-y-5">
      <header>
        <div className="flex items-center gap-2 text-emergency">
          <Siren className="h-6 w-6" aria-hidden="true" />
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            {ui.emergency.title}
          </h1>
        </div>
        <p className="mt-2 leading-relaxed text-ink-soft">{ui.emergency.intro}</p>
      </header>

      <a href="tel:911" className={buttonVariants({ variant: "danger", size: "lg" })}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        {ui.result.callNow}
      </a>

      {emergencyActions.map((action) => (
        <section
          key={action.id}
          className="rounded-2xl border-2 border-emergency-line bg-emergency-soft p-5"
        >
          <h2 className="text-lg font-bold text-ink">{t(action.title)}</h2>
          <p className="mt-1 text-sm font-semibold text-emergency">
            {ui.emergency.whenLabel}: {t(action.when)}
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">
            {ui.emergency.stepsLabel}
          </p>
          <ol className="mt-2 space-y-2.5">
            {action.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed text-ink-soft">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emergency text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span>{t(step)}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <p className="flex gap-2 rounded-xl bg-canvas p-4 text-sm text-ink-soft">
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0 text-urgent"
          aria-hidden="true"
        />
        <span>{ui.emergency.safetyNote}</span>
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {ui.emergency.backHome}
      </Link>
    </div>
  );
}
