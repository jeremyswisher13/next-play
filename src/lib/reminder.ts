import type { Intake } from "@/lib/types";

/**
 * A re-check reminder persisted to localStorage so it survives a closed tab
 * (the working intake lives in sessionStorage and clears when the tab closes).
 * Only written when the user explicitly sets a reminder — so we don't persist
 * injury data by default.
 */
const KEY = "nextplay.recheck";

export interface ReminderRecord {
  at: string;
  intake: Intake;
}

export function saveReminder(intake: Intake, at: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ at, intake }));
  } catch {
    /* ignore */
  }
}

export function loadReminder(): ReminderRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as ReminderRecord;
    if (!o || typeof o.at !== "string" || !o.intake) return null;
    return o;
  } catch {
    return null;
  }
}

export function clearReminder(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
