import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

/**
 * A large, tappable single-select option. Selection is shown with a filled
 * ring AND a check icon — never color alone.
 */
export function RadioCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  className,
}: RadioCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border bg-surface px-4 py-4 text-left transition-colors min-h-16",
        selected
          ? "border-brand ring-2 ring-brand bg-brand-soft"
          : "border-line hover:border-brand-ring hover:bg-canvas",
        className,
      )}
    >
      {icon ? (
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            selected ? "bg-brand text-white" : "bg-canvas text-ink-soft",
          )}
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{title}</span>
        {description ? (
          <span className="mt-0.5 block text-sm text-muted">{description}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-brand bg-brand text-white" : "border-line",
        )}
        aria-hidden="true"
      >
        {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
      </span>
    </button>
  );
}
