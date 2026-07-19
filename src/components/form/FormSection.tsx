import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormSectionProps = {
  label: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Reusable numbered section row for the project inquiry form. */
export function FormSection({ label, children, className, contentClassName }: FormSectionProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-12 border-b border-vinus-ink/35 py-16 md:grid-cols-12 md:gap-8 md:py-24",
        className,
      )}
    >
      <h3 className="type-body font-medium md:col-span-3">{label}</h3>
      <div className={cn("md:col-span-8 md:col-start-5", contentClassName)}>{children}</div>
    </section>
  );
}
