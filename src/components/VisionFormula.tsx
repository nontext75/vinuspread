import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type VisionFormulaItem = {
  label: string;
  meaning: string;
  tone?: "light" | "dark";
};

export type VisionFormulaProps = {
  items: readonly VisionFormulaItem[];
  className?: string;
};

/** Brand-word formula assembled from reusable semantic tags and gap tokens. */
export function VisionFormula({ items, className }: VisionFormulaProps) {
  return (
    <div
      aria-label={items.map(({ label, meaning }) => `${label}, ${meaning}`).join(" plus ")}
      className={cn("type-body flex w-full flex-col items-center gap-2 md:w-auto md:flex-row md:flex-nowrap md:gap-6", className)}
    >
      {items.map(({ label, meaning, tone = "light" }, index) => (
        <Fragment key={`${label}-${meaning}`}>
          {index > 0 && <span aria-hidden="true" className="type-lead text-vinus-ink/40">+</span>}
          <span
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-full px-6 py-2 font-medium md:size-[clamp(160px,18vw,240px)] md:flex-col md:px-6 md:py-5 min-[2200px]:px-10",
              tone === "dark" ? "bg-vinus-ink text-white" : "bg-vinus-wash text-vinus-ink",
            )}
          >
            <span className="md:text-[clamp(24px,3vw,40px)] md:leading-tight">{label}</span>
            <span className={cn("type-label font-normal md:text-[clamp(16px,1.8vw,24px)] md:leading-8", tone === "dark" ? "text-white/50" : "text-vinus-ink/50")}>
              {meaning}
            </span>
          </span>
        </Fragment>
      ))}
    </div>
  );
}
