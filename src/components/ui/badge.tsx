import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "neutral"
  | "brand"
  | "emergency"
  | "urgent"
  | "sportsmed"
  | "monitor";

const tones: Record<Tone, string> = {
  neutral: "bg-canvas text-ink-soft border-line",
  brand: "bg-brand-soft text-brand-strong border-brand-ring",
  emergency: "bg-emergency-soft text-emergency border-emergency-line",
  urgent: "bg-urgent-soft text-urgent border-urgent-line",
  sportsmed: "bg-sportsmed-soft text-sportsmed border-sportsmed-line",
  monitor: "bg-monitor-soft text-monitor border-monitor-line",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
