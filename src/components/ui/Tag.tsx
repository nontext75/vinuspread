import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  selected?: boolean;
};

/** Selectable service tag with a single selected state. */
export function Tag({ children, selected = false, className, type = "button", ...props }: TagProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "type-body inline-flex h-11 items-center justify-center rounded-full border px-4 py-2.5 font-medium transition-colors duration-200 motion-safe:active:scale-[0.97]",
        selected
          ? "border-vinus-ink bg-vinus-ink text-white"
          : "border-vinus-ink/15 text-vinus-ink hover:border-vinus-ink",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
