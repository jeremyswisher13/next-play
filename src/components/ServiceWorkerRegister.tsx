"use client";

import { useEffect } from "react";

/**
 * Registers the offline service worker — production (static export) only, so it
 * never interferes with `npm run dev`. The SW itself is generated into the
 * export by scripts/generate-sw.mjs.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator))
      return;
    const base = process.env.BASE_PATH || "";
    navigator.serviceWorker
      .register(`${base}/sw.js`, { scope: `${base}/` })
      .catch(() => {
        /* offline support is best-effort */
      });
  }, []);
  return null;
}
