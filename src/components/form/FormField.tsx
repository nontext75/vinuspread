import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const formLabelClassName = "type-body font-normal text-vinus-ink";
export const formControlClassName = "type-body h-[61px] w-full border-b border-vinus-ink/35 bg-transparent py-4 outline-none transition-colors duration-200 placeholder:text-vinus-ink/45 focus:border-vinus-ink";

export type FormFieldProps = {
  label: string;
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
  description?: ReactNode;
  className?: string;
  labelClassName?: string;
};

/** Form field primitive. Control and copy remain Hug-sized inside a gap-based stack. */
export function FormField({ label, children, required = false, htmlFor, description, className, labelClassName }: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className={cn(formLabelClassName, labelClassName)}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {description && <p className="type-body text-vinus-ink/55">{description}</p>}
    </div>
  );
}
