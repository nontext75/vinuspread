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
  href?: string;
  className?: string;
  contentClassName?: string;
  copyClassName?: string;
  iconClassName?: string;
  mediaClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  detailsClassName?: string;
  arrowPlacement?: "copy" | "footer";
  dataServiceCard?: boolean;
  animate?: boolean;
  index?: number;
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
  href,
  className,
  contentClassName,
  copyClassName,
  iconClassName,
  mediaClassName,
  titleClassName,
  descriptionClassName,
  detailsClassName,
  arrowPlacement = "copy",
  dataServiceCard = false,
  animate = false,
  index = 0,
}: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const arrow = href ? (
    <ArrowUpRight
      aria-hidden="true"
      className="size-5 shrink-0 stroke-[1.25] text-vinus-ink/45 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
    />
  ) : null;
  const content = (
    <div className={cn("group flex min-w-0 flex-col gap-[var(--space-compact)]", variant === "icon" && "p-[var(--space-compact)]", contentClassName)}>
      {variant === "image" && image && (
        <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-vinus-wash", mediaClassName)}>
          <Image src={image} alt={imageAlt} fill sizes={imageSizes} className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.025]" />
        </div>
      )}
      {variant === "icon" && icon && <div className={cn("flex size-8 items-center justify-center text-vinus-ink/55", iconClassName)}>{icon}</div>}
      <div className="flex min-w-0 items-start justify-between gap-[var(--space-compact)]">
        <div className={cn("flex min-w-0 flex-col gap-[var(--space-inline)]", copyClassName)}>
          <h3 className={cn("type-lead font-normal", titleClassName)}>{title}</h3>
          {description && <p className={cn("type-body font-normal text-vinus-ink/65", descriptionClassName)}>{description}</p>}
          {details.length > 0 && (
            <p className={cn("type-body font-normal uppercase text-vinus-ink/65", detailsClassName)}>
              {details.map((detail) => <span key={detail} className="block">{detail}</span>)}
            </p>
          )}
        </div>
        {arrowPlacement === "copy" && arrow && <span className="mt-1">{arrow}</span>}
      </div>
      {arrowPlacement === "footer" && arrow && <div className="flex items-start justify-end"><span className="flex size-8 items-center justify-center rounded-full border border-vinus-ink/10 opacity-40 [&_svg]:size-4">{arrow}</span></div>}
    </div>
  );

  return (
    <motion.article
      initial={animate && !reduceMotion ? { opacity: 0, y: 80, scale: 0.99 } : false}
      animate={animate && reduceMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={animate ? { once: true, amount: 0.18, margin: "0px 0px -8% 0px" } : undefined}
      transition={animate ? { duration: reduceMotion ? 0 : 0.82, delay: reduceMotion ? 0 : index * 0.065, ease: [0.16, 1, 0.3, 1] } : undefined}
      className={cn("min-w-0", className)}
      data-service-card={dataServiceCard ? "" : undefined}
    >
      {href ? <Link href={href} className="block">{content}</Link> : content}
    </motion.article>
  );
}
