"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { disclaimerParagraphs, disclaimerTitle } from "@/content/pages";
import { Card, CardContent } from "@/components/ui/card";

export default function DisclaimerPage() {
  const { t, ui } = useLocale();
  return (
    <div className="space-y-5">
      <header className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          {t(disclaimerTitle)}
        </h1>
      </header>

      <Card>
        <CardContent className="space-y-4">
          {disclaimerParagraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-ink-soft">
              {t(p)}
            </p>
          ))}
        </CardContent>
      </Card>

      <p className="text-center font-semibold text-ink">
        {ui.disclaimer.emergencyLine}
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {ui.about.backHome}
      </Link>
    </div>
  );
}
