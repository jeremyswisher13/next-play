"use client";

import { useEffect, useState } from "react";
import { Link2, Check } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";
import { buildShareUrl } from "@/lib/shareLink";
import type { Intake } from "@/lib/types";

export function ShareLinkButton({
  intake,
  variant = "secondary",
  className,
}: {
  intake: Intake;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const { ui } = useLocale();
  const [url, setUrl] = useState("");
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
    <>
      <Button variant={variant} onClick={copy} className={className}>
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
        {copied ? ui.result.linkCopied : ui.result.shareLink}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? ui.result.linkCopied : ""}
      </span>
    </>
  );
}
