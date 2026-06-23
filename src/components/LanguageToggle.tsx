"use client";

import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";

/** Segmented English / Español switch. Instant — no page reload. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, ui } = useLocale();
  const { update } = useIntake();

  function choose(value: Locale) {
    setLocale(value);
    update({ locale: value }); // keep intake (and any share link) in sync
  }
  const options: { value: Locale; label: string }[] = [
    { value: "en", label: ui.language.en },
    { value: "es", label: ui.language.es },
  ];

  return (
    <div
      role="group"
      aria-label={ui.language.toggleA11y}
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface p-1",
        className,
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => choose(opt.value)}
          aria-pressed={locale === opt.value}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
            locale === opt.value
              ? "bg-brand text-white"
              : "text-ink-soft hover:bg-canvas",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
