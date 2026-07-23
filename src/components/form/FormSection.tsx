import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormSectionProps = {
  label: string;
  children: ReactNode;
  variant?: "default" | "essentials" | "services";
};

/** Reusable numbered section row for the project inquiry form. */
export function FormSection({ label, children, variant = "default" }: FormSectionProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-12 border-b border-vinus-ink/35 py-16 md:grid-cols-12 md:gap-8 md:py-24",
        variant === "services" && "md:min-h-[349px]",
      )}
    >
      <h3 className="body-md font-medium md:col-span-3">{label}</h3>
      <div
        className={cn(
          "md:col-span-8 md:col-start-5",
          variant === "essentials" && "grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2",
          variant === "services" && "flex min-h-[156px] flex-col gap-6",
        )}
      >
        {children}
      </div>
    </section>
  );
}
