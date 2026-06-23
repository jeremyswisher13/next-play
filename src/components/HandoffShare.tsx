"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Link2, QrCode as QrIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";

// The QR library (~26 KB) loads only when the user taps "Show QR code".
const QrCode = dynamic(
  () => import("@/components/QrCode").then((m) => m.QrCode),
  { ssr: false },
);
import { buildShareUrl } from "@/lib/shareLink";
import type { Intake } from "@/lib/types";

/** Routable hand-off: copy a share link or show a QR a clinician/ATC can scan. */
export function HandoffShare({ intake }: { intake: Intake }) {
  const { ui } = useLocale();
  const [url, setUrl] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(buildShareUrl(intake));
  }, [intake]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="no-print rounded-2xl border border-line bg-surface p-5">
      <h3 className="font-bold text-ink">{ui.summary.qrTitle}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {ui.summary.qrSub}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={copy}>
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? ui.result.linkCopied : ui.result.shareLink}
        </Button>
        <Button variant="secondary" onClick={() => setShowQr((v) => !v)}>
          <QrIcon className="h-4 w-4" aria-hidden="true" />
          {showQr ? ui.summary.hideQr : ui.result.showQr}
        </Button>
      </div>
      {showQr && url ? (
        <div className="mt-5 flex flex-col items-center gap-2">
          <QrCode value={url} alt={ui.share.scanToOpen} />
          <p className="text-sm text-muted">{ui.share.scanToOpen}</p>
        </div>
      ) : null}
    </div>
  );
}
