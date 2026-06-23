import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

// Absolute base for link-preview metadata (iMessage/Slack/Twitter fetch these).
const SITE_URL = "https://jeremyswisher13.github.io/next-play";
const OG_IMAGE = `${SITE_URL}/og.png`;
const TITLE = "Next Play — Clearer injury decisions. Safer return to play.";
const DESCRIPTION =
  "Bilingual (English / Español) sports-injury navigator. Find the next safest step after a sports injury — emergency, urgent, sports-medicine, or monitor. Guidance only; not a diagnosis.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Next Play",
  },
  description: DESCRIPTION,
  applicationName: "Next Play",
  openGraph: {
    type: "website",
    siteName: "Next Play",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Next Play — Clearer injury decisions. Safer return to play.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ServiceWorkerRegister />
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
              {children}
            </main>
            <DisclaimerBanner />
          </div>
        </Providers>
      </body>
    </html>
  );
}
