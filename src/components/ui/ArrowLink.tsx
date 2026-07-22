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
        "group inline-flex h-[47px] w-fit items-center gap-2 py-2 text-[24px] font-medium leading-[1.3] tracking-[0] transition-opacity duration-200 ease-out hover:opacity-55 motion-safe:active:scale-[0.97]",
        inverse ? "text-white" : "text-vinus-ink",
        className,
      )}
    >
      <span className="border-b border-current leading-none">{children}</span>
      <Image
        src="/vinus/icons/arrow-link.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        className={cn(
          "size-6 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1",
          inverse && "invert",
        )}
      />
    </Link>
  );
}
