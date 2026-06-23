"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useLocale } from "@/lib/i18n";

/** Persistent, low-key reminder that the app is guidance only. */
export function DisclaimerBanner() {
  const { ui } = useLocale();
  return (
    <footer className="no-print border-t border-line bg-surface px-4 py-3">
      <Link
        href="/disclaimer"
        className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-center text-xs text-muted hover:text-ink-soft"
      >
        <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{ui.disclaimer.bannerShort}</span>
      </Link>
    </footer>
  );
}
