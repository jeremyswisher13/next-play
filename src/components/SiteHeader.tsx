"use client";

import Link from "next/link";
import { Activity, Siren } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/lib/i18n";

export function SiteHeader() {
  const { ui } = useLocale();
  return (
    <header className="no-print sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          {ui.appName}
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/emergency"
            aria-label={ui.nav.emergency}
            title={ui.nav.emergency}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-emergency-line bg-emergency-soft text-emergency hover:brightness-95"
          >
            <Siren className="h-5 w-5" aria-hidden="true" />
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
