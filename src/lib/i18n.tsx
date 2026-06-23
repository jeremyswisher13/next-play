"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale, LocalizedText } from "@/lib/types";
import { ui } from "@/content/ui";

type UIStrings = (typeof ui)["en"];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Localize a { en, es } content pair to the active language. */
  t: (text: LocalizedText) => string;
  /** The UI string dictionary for the active language. */
  ui: UIStrings;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "nextplay.locale";

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Restore the saved language preference on first load.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLocaleState(stored);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  // Keep <html lang> in sync for accessibility + correct browser behavior.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "en" ? "es" : "en"),
    [locale, setLocale],
  );

  const t = useCallback(
    (text: LocalizedText) => (locale === "es" ? text.es : text.en),
    [locale],
  );

  const value: LocaleContextValue = {
    locale,
    setLocale,
    toggle,
    t,
    ui: ui[locale],
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
