import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
type Size = "default" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-strong shadow-sm active:bg-brand-strong",
  secondary:
    "bg-white text-ink border border-line hover:bg-canvas active:bg-canvas",
  outline:
    "bg-transparent text-brand border-2 border-brand hover:bg-brand-soft",
  ghost: "bg-transparent text-ink-soft hover:bg-canvas",
  danger: "bg-emergency text-white hover:brightness-95 active:brightness-90",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  default: "h-12 px-5 text-base",
  lg: "h-14 px-6 text-lg w-full",
};

export function buttonVariants({
  variant = "primary",
  size = "default",
}: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
