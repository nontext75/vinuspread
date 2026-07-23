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
      className={cn("body-md flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:flex-nowrap md:gap-12", className)}
    >
      {items.map(({ label, meaning, tone = "light" }, index) => (
        <div key={`${label}-${meaning}`} className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:gap-12">
          {index > 0 && <span aria-hidden="true" className="body-lg shrink-0 text-vinus-ink/40">+</span>}
          <span
            className={cn(
              "inline-flex size-28 shrink-0 flex-col items-center justify-center gap-1 rounded-full px-4 py-4 font-medium md:size-[clamp(160px,18vw,240px)] md:px-6 md:py-5 min-[2200px]:px-10",
              tone === "dark" ? "bg-vinus-ink text-white" : "bg-vinus-wash text-vinus-ink",
            )}
          >
            <span className="heading-formula-word font-medium">{label}</span>
            <span className={cn("label-formula-caption font-normal", tone === "dark" ? "text-white/50" : "text-vinus-ink/50")}>
              {meaning}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
