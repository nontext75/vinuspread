"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CategoryBadge } from "@/components/CategoryBadge";
import { cn } from "@/lib/utils";

export type PortfolioCardProps = {
  image: string;
  title: string;
  subtitle: string;
  href: string;
  category?: string;
  imageAlt?: string;
  imageSizes?: string;
  layoutClassName?: string;
  mediaClassName?: string;
  animate?: boolean;
  index?: number;
};

/** Shared portfolio card; parent grids own placement while card internals stay flow-based. */
export function PortfolioCard({
  image,
  title,
  subtitle,
  href,
  category,
  imageAlt = "",
  imageSizes = "(max-width: 767px) calc(100vw - 48px), 50vw",
  layoutClassName,
  mediaClassName,
  animate = false,
  index = 0,
}: PortfolioCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={animate && !reduceMotion ? { opacity: 0, y: 32 } : false}
      animate={animate && reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.64, delay: reduceMotion ? 0 : (index % 4) * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={cn("min-w-0", layoutClassName)}
      data-project-card
    >
      <Link href={href} className="group flex min-w-0 flex-col gap-4 md:gap-6">
        <div
          className={cn(
            "relative aspect-square w-full overflow-hidden bg-vinus-wash",
            mediaClassName,
          )}
          data-project-media
        >
          <div className="absolute inset-0" data-project-image>
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes={imageSizes}
              className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.025]"
            />
          </div>
        </div>
        <div className="flex min-w-0 items-start justify-between gap-4 md:gap-6">
          <div className="flex min-w-0 flex-col gap-2 md:gap-3">
            <h3 className="type-card-title w-full text-pretty break-words whitespace-normal">{title}</h3>
            <p className="type-body w-full text-pretty font-normal break-words whitespace-normal text-vinus-ink">{subtitle}</p>
          </div>
          {category && <CategoryBadge className="shrink-0 text-vinus-ink">{category}</CategoryBadge>}
        </div>
      </Link>
    </motion.article>
  );
}
