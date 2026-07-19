import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NextProjectLink({ href, title }: { href: string; title: string }) {
  return (
    <section className="flex h-[140px] w-full items-center justify-between gap-4 border-t border-vinus-ink/10 px-[var(--space-edge)] md:h-60 md:gap-8">
      <span className="type-label shrink-0 font-medium text-vinus-ink/45">Next Project</span>
      <Link href={href} className="group flex min-w-0 max-w-full items-center gap-4 md:gap-6">
        <span className="type-next-content-title min-w-0 truncate font-normal transition-opacity duration-200 group-hover:opacity-60">{title}</span>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-vinus-ink/10">
          <ArrowRight className="size-5 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}
