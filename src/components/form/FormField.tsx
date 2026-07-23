import type { ChangeEvent, ReactNode } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export const formLabelClassName = "body-md font-normal text-vinus-ink";
export const formControlClassName = "body-form-control h-16 w-full border-b border-vinus-ink/35 bg-transparent py-4 outline-none transition-colors duration-200 placeholder:text-vinus-ink/45 focus:border-vinus-ink";
export const formCompactControlClassName = "body-form-control h-10 w-full border-b border-vinus-ink/35 bg-transparent py-2 outline-none transition-colors duration-200 placeholder:text-vinus-ink/45 focus:border-vinus-ink";
export const formTextareaClassName = "body-form-control w-full resize-y border border-vinus-ink/35 bg-white/55 p-6 outline-none placeholder:text-vinus-ink/45 focus:border-vinus-ink";

export type FormFieldProps = {
  label: string;
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
  description?: ReactNode;
  className?: string;
  variant?: "default" | "textarea";
};

export type FormFileControlProps = {
  id: string;
  fileName?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  compact?: boolean;
};

/** Form field primitive. Control and copy remain Hug-sized inside a gap-based stack. */
export function FormField({ label, children, required = false, htmlFor, description, className, variant = "default" }: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col", variant === "textarea" ? "gap-2" : "gap-1", className)}>
      <label htmlFor={htmlFor} className={cn(formLabelClassName, variant === "textarea" && "font-medium")}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {description && <p className="body-md text-vinus-ink/55">{description}</p>}
    </div>
  );
}

/** Shared file attachment control. Keeps button sizing and text style out of pages. */
export function FormFileControl({
  id,
  fileName,
  placeholder = "Select a file to attach...",
  onChange,
  className,
  compact = false,
}: FormFileControlProps) {
  return (
    <span className={cn("form-file-control flex min-w-0 items-center justify-between gap-3 border-b border-vinus-ink/35", compact ? "h-10" : "h-16", className)}>
      <span className="body-form-control min-w-0 truncate text-vinus-ink/45">{fileName ?? placeholder}</span>
      <label htmlFor={id} className={cn("form-file-control__button body-md inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-vinus-ink/35 font-medium transition-colors duration-200 hover:bg-vinus-ink hover:text-white", compact ? "min-h-8 px-3 py-1" : "min-h-11 px-4 py-2")}>
        <Upload className="size-3.5" />
        Browse
        <input id={id} type="file" onChange={onChange} className="hidden" />
      </label>
    </span>
  );
}
