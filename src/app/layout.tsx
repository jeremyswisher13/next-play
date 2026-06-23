import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

export const metadata: Metadata = {
  title: {
    default: "Next Play — Clearer injury decisions. Safer return to play.",
    template: "%s · Next Play",
  },
  description:
    "Next Play helps athletes, parents, coaches, athletic trainers, and clinicians find the next safest step after a sports injury — in English or Spanish. Guidance only; not a diagnosis.",
  applicationName: "Next Play",
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
