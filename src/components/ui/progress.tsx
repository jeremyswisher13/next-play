import { cn } from "@/lib/utils";

interface ProgressProps {
  current: number; // 1-based
  total: number;
  label?: string;
  className?: string;
}

/** Slim step-progress bar for the intake wizard. */
export function Progress({ current, total, label, className }: ProgressProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1.5 text-sm font-medium text-muted">{label}</div>
      ) : null}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label={label || "Progress"}
        aria-valuetext={label || undefined}
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
