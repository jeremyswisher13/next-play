"use client";

import Link from "next/link";
import {
  ArrowRight,
  Map,
  Check,
  X,
  Phone,
  ListChecks,
} from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { ui } = useLocale();
  const l = ui.landing;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="pt-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          {l.eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {l.heading}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{l.sub}</p>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/start" className={buttonVariants({ size: "lg" })}>
            {l.startCta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/roadmaps"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
            )}
          >
            <Map className="h-5 w-5" aria-hidden="true" />
            {l.roadmapsCta}
          </Link>
        </div>
      </section>

      {/* Emergency note */}
      <Card className="border-urgent-line bg-urgent-soft">
        <CardContent className="flex gap-3">
          <Phone
            className="mt-0.5 h-5 w-5 shrink-0 text-urgent"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-ink-soft">{l.emergencyNote}</p>
        </CardContent>
      </Card>

      {/* What it does / doesn't do */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 text-monitor">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-bold text-ink">{l.reassureTitle}</h2>
            </div>
            <ul className="mt-3 space-y-2">
              {l.reassure.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-soft">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-monitor"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-2 text-muted">
              <X className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-bold text-ink">{l.notDiagnosisTitle}</h2>
            </div>
            <ul className="mt-3 space-y-2">
              {l.notDiagnosis.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-soft">
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
