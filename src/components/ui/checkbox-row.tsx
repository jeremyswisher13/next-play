import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxRowProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  /** "alert" tints the selected state toward a warning look. */
  tone?: "default" | "alert";
}

/**
 * A large, tappable multi-select row (used for the red-flag checklist).
 * State is conveyed by a checkbox icon + label, not color alone.
 */
export function CheckboxRow({
  checked,
  onToggle,
  label,
  tone = "default",
}: CheckboxRowProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border bg-surface px-4 py-4 text-left transition-colors min-h-16",
        checked
          ? tone === "alert"
            ? "border-urgent bg-urgent-soft ring-1 ring-urgent"
            : "border-brand bg-brand-soft ring-1 ring-brand"
          : "border-line hover:border-brand-ring hover:bg-canvas",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          checked
            ? tone === "alert"
              ? "border-urgent bg-urgent text-white"
              : "border-brand bg-brand text-white"
            : "border-line",
        )}
        aria-hidden="true"
      >
        {checked ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
      </span>
      <span className="flex-1 font-medium text-ink">{label}</span>
    </button>
  );
}
