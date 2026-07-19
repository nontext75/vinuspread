import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  inverse?: boolean;
  className?: string;
};

/** Editorial arrow link shared by page calls-to-action. */
export function ArrowLink({ href, children, inverse = false, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "type-lead group inline-flex min-h-11 w-fit items-center gap-[var(--space-inline)] py-1 transition-opacity duration-200 ease-out hover:opacity-55 motion-safe:active:scale-[0.97]",
        inverse ? "text-white" : "text-vinus-ink",
        className,
      )}
    >
      <span>{children}</span>
      <Image
        src="/vinus/icons/arrow-link.svg"
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
        className={cn(
          "size-5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1",
          inverse && "invert",
        )}
      />
    </Link>
  );
}
