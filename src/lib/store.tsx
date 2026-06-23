"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AthleteInfo,
  FunctionalAnswers,
  Intake,
  Locale,
} from "@/lib/types";
import { clearReminder } from "@/lib/reminder";

const STORAGE_KEY = "nextplay.intake";

export function emptyIntake(locale: Locale = "en"): Intake {
  return {
    locale,
    athlete: {},
    redFlags: [],
    functional: {},
  };
}

interface IntakeContextValue {
  intake: Intake;
  /** True once we've attempted to restore from sessionStorage. */
  hydrated: boolean;
  update: (patch: Partial<Intake>) => void;
  updateAthlete: (patch: Partial<AthleteInfo>) => void;
  updateFunctional: (patch: Partial<FunctionalAnswers>) => void;
  toggleRedFlag: (id: string) => void;
  clearRedFlags: () => void;
  reset: () => void;
}

const IntakeContext = createContext<IntakeContextValue | null>(null);

/**
 * Holds intake state for the whole flow. Local-first: state lives in React and
 * is mirrored to sessionStorage so a refresh on /result keeps the data. This is
 * intentionally isolated so it can be swapped for Supabase later without
 * touching the screens.
 */
export function IntakeProvider({ children }: { children: ReactNode }) {
  const [intake, setIntake] = useState<Intake>(() => emptyIntake());
  const [hydrated, setHydrated] = useState(false);
  const didHydrate = useRef(false);

  // Restore on mount.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Intake;
        setIntake({ ...emptyIntake(parsed.locale), ...parsed });
      }
    } catch {
      /* ignore */
    } finally {
      didHydrate.current = true;
      setHydrated(true);
    }
  }, []);

  // Persist on change (after hydration so we don't clobber stored data).
  useEffect(() => {
    if (!didHydrate.current) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(intake));
    } catch {
      /* ignore */
    }
  }, [intake]);

  const update = useCallback((patch: Partial<Intake>) => {
    setIntake((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateAthlete = useCallback((patch: Partial<AthleteInfo>) => {
    setIntake((prev) => ({ ...prev, athlete: { ...prev.athlete, ...patch } }));
  }, []);

  const updateFunctional = useCallback((patch: Partial<FunctionalAnswers>) => {
    setIntake((prev) => ({
      ...prev,
      functional: { ...prev.functional, ...patch },
    }));
  }, []);

  const toggleRedFlag = useCallback((id: string) => {
    setIntake((prev) => {
      const has = prev.redFlags.includes(id);
      return {
        ...prev,
        redFlagsAcknowledged: true,
        redFlags: has
          ? prev.redFlags.filter((x) => x !== id)
          : [...prev.redFlags, id],
      };
    });
  }, []);

  const clearRedFlags = useCallback(() => {
    setIntake((prev) => ({
      ...prev,
      redFlags: [],
      redFlagsAcknowledged: true,
    }));
  }, []);

  const reset = useCallback(() => {
    setIntake((prev) => emptyIntake(prev.locale));
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    clearReminder();
  }, []);

  const value: IntakeContextValue = {
    intake,
    hydrated,
    update,
    updateAthlete,
    updateFunctional,
    toggleRedFlag,
    clearRedFlags,
    reset,
  };

  return (
    <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>
  );
}

export function useIntake(): IntakeContextValue {
  const ctx = useContext(IntakeContext);
  if (!ctx) throw new Error("useIntake must be used within an IntakeProvider");
  return ctx;
}
