"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/i18n";
import { IntakeProvider } from "@/lib/store";

/** Client providers shared across every route. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <IntakeProvider>{children}</IntakeProvider>
    </LocaleProvider>
  );
}
