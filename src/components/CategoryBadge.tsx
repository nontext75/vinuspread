import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function CategoryBadge({ children, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "type-label inline-flex h-8 min-w-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-current px-3 font-normal",
        className,
      )}
    >
      {children}
    </span>
  );
}
