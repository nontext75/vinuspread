"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  title: string;
  variant: "icon" | "image";
  description?: string;
  details?: readonly string[];
  icon?: ReactNode;
  image?: string;
  imageAlt?: string;
  imageSizes?: string;
  mediaRatio?: "standard" | "business";
  href?: string;
  className?: string;
  arrowPlacement?: "copy" | "footer";
  dataServiceCard?: boolean;
  animate?: boolean;
  index?: number;
  mode?: "default" | "homeProcess" | "business";
};

/** Service card shared by the home process grid and Studio business section. */
export function ServiceCard({
  title,
  variant,
  description,
  details = [],
  icon,
  image,
  imageAlt = "",
  imageSizes = "(max-width: 767px) calc(100vw - 48px), 33vw",
  mediaRatio = "standard",
  href,
  className,
  arrowPlacement = "copy",
  dataServiceCard = false,
  animate = false,
  index = 0,
  mode = "default",
}: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const arrow = href ? (
    <ArrowUpRight
      aria-hidden="true"
      className="size-5 shrink-0 stroke-[1.25] text-vinus-ink/45 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
    />
  ) : null;
  const content = (
    <div
      className={cn(
        "service-card__inner group flex min-w-0 flex-col gap-[var(--space-compact)]",
        variant === "icon" && "p-0",
        mode === "homeProcess" && "overflow-hidden",
      )}
    >
      {variant === "image" && image && (
        <div
          className={cn(
            "service-card__media relative w-full overflow-hidden bg-vinus-wash",
            mediaRatio === "standard" && "service-card__media--standard",
            mediaRatio === "business" && "service-card__media--business",
          )}
        >
          <Image src={image} alt={imageAlt} fill sizes={imageSizes} className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.025]" />
        </div>
      )}
      {variant === "icon" && icon && <div className="service-card__icon flex size-[60px] items-center justify-center rounded-full bg-muted text-vinus-ink/55 [&_img]:size-7">{icon}</div>}
      <div className="service-card__body flex min-w-0 items-start justify-between gap-[var(--space-compact)]">
        <div
          className={cn(
            "service-card__copy flex min-w-0 flex-col gap-[var(--space-inline)]",
            mode === "business" && "md:gap-6",
          )}
        >
          <h3
            className={cn(
              "service-card__title body-lg font-normal",
              mode === "homeProcess" && "shrink-0 whitespace-normal min-[2200px]:whitespace-nowrap",
              mode === "business" && "heading-business-card font-medium",
            )}
          >
            {title}
          </h3>
          {description && (
            <p
              className={cn(
                "service-card__description body-md font-normal text-vinus-ink/65",
                mode === "business" && "text-vinus-ink",
              )}
            >
              {description}
            </p>
          )}
          {details.length > 0 && (
            <div
              className={cn(
                "service-card__details body-md flex flex-col gap-[var(--space-inline)] font-normal uppercase text-vinus-ink/65",
                mode === "homeProcess" && "shrink-0 normal-case",
              )}
            >
              {details.map((detail) => <span key={detail} className="block">{detail}</span>)}
            </div>
          )}
        </div>
        {arrowPlacement === "copy" && arrow && <span className="mt-1">{arrow}</span>}
      </div>
      {arrowPlacement === "footer" && arrow && <div className="flex items-start justify-end"><span className="flex size-8 items-center justify-center rounded-full border border-vinus-ink/10 opacity-40 [&_svg]:size-4">{arrow}</span></div>}
    </div>
  );

  return (
    <motion.article
      initial={animate && !reduceMotion ? { opacity: 0, y: 48 } : false}
      animate={animate && reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true, amount: 0.18, margin: "0px 0px -8% 0px" } : undefined}
      transition={animate ? { duration: reduceMotion ? 0 : 0.82, delay: reduceMotion ? 0 : index * 0.065, ease: [0.16, 1, 0.3, 1] } : undefined}
      className={cn("service-card min-w-0", mode === "homeProcess" && "service-card--home-process", className)}
      data-service-card={dataServiceCard ? "" : undefined}
    >
      {href ? <Link href={href} className="block">{content}</Link> : content}
    </motion.article>
  );
}
