"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { aboutParagraphs } from "@/content/pages";

export default function AboutPage() {
  const { t, ui } = useLocale();
  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          {ui.tagline}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
          {ui.about.title}
        </h1>
      </header>

      <div className="space-y-4">
        {aboutParagraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-ink-soft">
            {t(p)}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-brand">
        <Link href="/disclaimer" className="hover:underline">
          {ui.nav.disclaimer}
        </Link>
        <Link href="/" className="inline-flex items-center gap-1 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {ui.about.backHome}
        </Link>
      </div>
    </div>
  );
}
