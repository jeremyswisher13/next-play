"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";

interface ShareSummaryButtonProps {
  text: string;
  label?: string;
  variant?: ButtonProps["variant"];
  className?: string;
}

/**
 * Shares the clinician summary. Uses the native share sheet when available
 * (great on phones), and falls back to copying to the clipboard otherwise.
 */
export function ShareSummaryButton({
  text,
  label,
  variant = "secondary",
  className,
}: ShareSummaryButtonProps) {
  const { ui } = useLocale();
  const [copied, setCopied] = useState(false);

  async function handle() {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.share) {
      try {
        await nav.share({ title: ui.share.title, text });
        return;
      } catch {
        /* user cancelled or share failed — fall through to copy */
      }
    }
    try {
      await nav?.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <Button variant={variant} onClick={handle} className={className}>
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Share2 className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? ui.share.copiedToClipboard : (label ?? ui.result.share)}
    </Button>
  );
}
