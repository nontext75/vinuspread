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
  size?: "standard" | "feature";
  mediaRatio?: "square" | "landscape" | "wide";
  layoutClassName?: string;
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
  size = "standard",
  mediaRatio = "square",
  layoutClassName,
  animate = false,
  index = 0,
}: PortfolioCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={animate && !reduceMotion ? { opacity: 0, y: 72 } : false}
      animate={animate && reduceMotion ? { opacity: 1 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true, amount: 0.16, margin: "0px 0px -8% 0px" } : undefined}
      transition={animate ? {
        duration: reduceMotion ? 0 : 0.9,
        delay: reduceMotion ? 0 : (index % 6) * 0.075,
        ease: [0.16, 1, 0.3, 1],
      } : undefined}
      className={cn("project-card w-full min-w-0", size === "feature" && "project-card--feature", layoutClassName)}
      data-project-card
    >
      <Link href={href} className="project-card__link group flex min-w-0 flex-col">
        <div
          className={cn(
            "project-card__media relative w-full overflow-hidden bg-vinus-wash",
            mediaRatio === "square" && "project-card__media--square",
            mediaRatio === "landscape" && "project-card__media--landscape",
            mediaRatio === "wide" && "project-card__media--wide",
          )}
          data-project-media
        >
          <div className="absolute inset-0" data-project-image>
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes={imageSizes}
              loading={size === "feature" ? "eager" : "lazy"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.035]"
            />
          </div>
          <div className="absolute inset-0 bg-vinus-ink/0 transition-colors duration-500 ease-out group-hover:bg-vinus-ink/5" />
          {category && (
            <CategoryBadge className="absolute right-4 bottom-4 z-10">
              {category}
            </CategoryBadge>
          )}
        </div>
        <div className="project-card__copy flex min-w-0 flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
          <div className="project-card__title-row flex min-w-0 items-start">
            <h3
              className={cn(
                "min-w-0 break-words whitespace-normal transition-colors duration-300 group-hover:text-vinus-ink/80",
                size === "feature" ? "heading-card-large font-medium" : "heading-card font-medium",
              )}
            >
              {title}
            </h3>
          </div>
          <p
            className="body-md w-full font-normal break-words whitespace-normal text-vinus-ink/70"
          >
            {subtitle}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

