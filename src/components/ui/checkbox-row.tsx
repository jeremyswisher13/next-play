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
 * A large, tappable multi-select row backed by a real (visually hidden)
 * checkbox input, so it is fully keyboard-operable with correct semantics.
 * State is conveyed by a checkbox icon + label, not color alone.
 */
export function CheckboxRow({
  checked,
  onToggle,
  label,
  tone = "default",
}: CheckboxRowProps) {
  return (
    <label
      className={cn(
        "flex w-full cursor-pointer items-start gap-3 rounded-xl border bg-surface px-4 py-4 text-left transition-colors min-h-16",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
        checked
          ? tone === "alert"
            ? "border-urgent bg-urgent-soft ring-1 ring-urgent"
            : "border-brand bg-brand-soft ring-1 ring-brand"
          : "border-line hover:border-brand-ring hover:bg-canvas",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />
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
    </label>
  );
}
