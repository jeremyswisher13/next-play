import type { Intake } from "@/lib/types";

/**
 * Encode an intake into a shareable link. The data is placed in the URL
 * FRAGMENT (after "#"), which browsers never send to the server — so the
 * summary travels inside the link itself and is not stored or transmitted to
 * any backend. The /s page decodes it and re-derives the triage result.
 *
 * Note: this is an MVP-grade handoff. For production, a server-side store with
 * access control (e.g. Supabase + a short-lived token) is the right model;
 * URL-encoded PHI can still be exposed if a link is forwarded carelessly.
 */

function toBase64Url(str: string): string {
  const b64 = btoa(unescape(encodeURIComponent(str)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  return decodeURIComponent(escape(atob(b64 + pad)));
}

export function encodeIntake(intake: Intake): string {
  const rest: Intake = { ...intake };
  delete rest.recheckAt; // not relevant to a handoff
  return toBase64Url(JSON.stringify(rest));
}

export function decodeIntake(encoded: string): Intake | null {
  try {
    const obj = JSON.parse(fromBase64Url(encoded)) as Intake;
    if (!obj || typeof obj !== "object") return null;
    // Only trust a known locale — a bogus value would break ui[locale] lookups
    // and could poison the saved language preference.
    if (obj.locale !== "en" && obj.locale !== "es") return null;
    // Defensive defaults so a malformed link still renders safely.
    return {
      locale: obj.locale,
      athlete: obj.athlete ?? {},
      redFlags: Array.isArray(obj.redFlags) ? obj.redFlags : [],
      functional: obj.functional ?? {},
      role: obj.role,
      bodyRegion: obj.bodyRegion,
      mechanism: obj.mechanism,
      concerns: obj.concerns,
    };
  } catch {
    return null;
  }
}

/** Full shareable URL pointing at the read-only /s handoff page. */
export function buildShareUrl(intake: Intake): string {
  const base = process.env.BASE_PATH || "";
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${base}/s/#${encodeIntake(intake)}`;
}
