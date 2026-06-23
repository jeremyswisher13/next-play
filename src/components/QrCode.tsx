"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/** Renders a value as a QR code image, generated entirely on-device. */
export function QrCode({
  value,
  size = 208,
  alt = "QR code",
}: {
  value: string;
  size?: number;
  alt?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then((url) => active && setSrc(url))
      .catch(() => active && setSrc(null));
    return () => {
      active = false;
    };
  }, [value, size]);

  if (!src) {
    return (
      <div
        className="animate-pulse rounded-xl bg-canvas"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={alt}
      className="rounded-xl border border-line bg-white"
    />
  );
}
