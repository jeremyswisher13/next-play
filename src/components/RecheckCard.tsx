"use client";

import { useState } from "react";
import Link from "next/link";
import { BellRing, CalendarPlus, Check, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { useIntake } from "@/lib/store";
import { downloadIcs } from "@/lib/ics";

const SEVENTY_TWO_HOURS = 72 * 60 * 60 * 1000;

export function RecheckCard() {
  const { ui } = useLocale();
  const { update } = useIntake();
  const [reminded, setReminded] = useState(false);

  function remind() {
    const at = new Date(Date.now() + SEVENTY_TWO_HOURS);
    update({ recheckAt: at.toISOString() });
    setReminded(true);
  }

  function addToCalendar() {
    const at = new Date(Date.now() + SEVENTY_TWO_HOURS);
    downloadIcs({
      title: `${ui.appName}: ${ui.result.recheckTitle}`,
      description: ui.result.recheckBody,
      at,
    });
  }

  return (
    <section className="no-print rounded-2xl border border-line bg-surface p-5">
      <h2 className="flex items-center gap-2 font-bold text-ink">
        <BellRing className="h-5 w-5 text-brand" aria-hidden="true" />
        {ui.result.recheckTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {ui.result.recheckBody}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={remind}>
          {reminded ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <BellRing className="h-4 w-4" aria-hidden="true" />
          )}
          {reminded ? ui.result.reminderSet : ui.result.setReminder}
        </Button>
        <Button variant="secondary" onClick={addToCalendar}>
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          {ui.result.addToCalendar}
        </Button>
        <Link href="/recheck" className={buttonVariants({ variant: "ghost" })}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {ui.result.recheckNow}
        </Link>
      </div>
    </section>
  );
}
