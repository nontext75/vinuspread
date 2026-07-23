import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function CategoryBadge({ children, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "label-badge inline-flex min-w-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-muted px-4 py-2 text-vinus-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
