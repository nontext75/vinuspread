"use client";

import { Grid, List as ListIcon } from "lucide-react";

export type PortfolioViewMode = "grid" | "list";

type PortfolioControlsProps<Category extends string> = {
  categories: readonly Category[];
  activeCategory: Category;
  getCount: (category: Category) => number;
  onCategoryChange: (category: Category) => void;
  viewMode: PortfolioViewMode;
  onViewModeChange: (mode: PortfolioViewMode) => void;
};

/** Shared Experience filters and grid/list view controls. */
export function PortfolioControls<Category extends string>({
  categories,
  activeCategory,
  getCount,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}: PortfolioControlsProps<Category>) {
  return (
    <div className="flex w-full items-center gap-2 text-vinus-ink md:w-auto md:max-w-full md:gap-3 md:rounded-full md:border md:border-white/15 md:bg-vinus-ink md:p-3 md:text-white md:shadow-[0_25px_25px_rgba(0,0,0,0.25)]">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:h-8 md:w-auto md:flex-none md:justify-start md:gap-3 md:border-r md:border-white/15 md:pr-3">
        {categories.map((category) => {
          const count = getCount(category);
          const disabled = count === 0;

          return (
            <button
              key={category}
              type="button"
              disabled={disabled}
              aria-pressed={activeCategory === category}
              onClick={() => onCategoryChange(category)}
              className={`type-label flex min-h-12 min-w-12 items-center justify-center whitespace-nowrap border-b px-1 font-medium transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vinus-ink md:min-h-8 md:min-w-0 md:rounded-full md:border-b-0 md:px-3 md:focus-visible:outline-white ${
                disabled
                  ? "cursor-not-allowed border-transparent text-vinus-ink/25 md:text-white/25"
                  : activeCategory === category
                    ? "border-vinus-ink text-vinus-ink md:bg-white"
                    : "border-transparent text-vinus-ink/45 hover:text-vinus-ink md:text-white/60 md:hover:text-white"
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span>{category}</span>
                <span className="hidden opacity-55 md:inline">{count}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="hidden h-8 w-[76px] shrink-0 items-center justify-end gap-3 md:flex">
        <button
          type="button"
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          onClick={() => onViewModeChange("grid")}
          className={`flex size-8 items-center justify-center rounded-full transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${viewMode === "grid" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
        >
          <Grid className="size-4" />
        </button>
        <button
          type="button"
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          onClick={() => onViewModeChange("list")}
          className={`flex size-8 items-center justify-center rounded-full transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${viewMode === "list" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
        >
          <ListIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
