"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export type StoryListItemProps = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  href: string;
  index?: number;
  variant?: "archive" | "home";
};

/** Reusable story row. Layout is flow-based so every text layer keeps hug height. */
export function StoryListItem({
  title,
  excerpt,
  date,
  category,
  image,
  href,
  index = 0,
  variant = "archive",
}: StoryListItemProps) {
  const reduceMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reduceMotion ? 0 : 0.36,
        delay: reduceMotion ? 0 : index * 0.035,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn(
        "group border-vinus-ink/10 bg-white",
          variant === "home"
          ? "home-story-row flex flex-col items-start gap-4 md:grid md:grid-cols-[174px_minmax(0,1fr)_24px] md:gap-[var(--space-content)] md:border-b md:py-[var(--space-content)]"
          : "flex flex-col items-start gap-4 md:grid md:grid-cols-[120px_minmax(0,1fr)_24px] md:gap-9 md:py-12 md:shadow-[inset_0_-1px_0_rgba(13,13,13,0.1)]",
      )}
    >
      <Link href={href} className="contents">
        <div
          ref={imageRef}
          className={cn(
            "relative shrink-0 overflow-hidden rounded-full bg-vinus-wash",
            variant === "home" ? "size-24 md:size-[174px]" : "size-24 md:size-[120px]",
          )}
        >
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : 1.12 }}>
            <Image
              src={image}
              alt=""
              fill
              sizes={variant === "home" ? "(max-width: 767px) 96px, 174px" : "(max-width: 767px) 96px, 120px"}
              className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.04]"
            />
          </motion.div>
        </div>
        <div className={cn("flex min-w-0 flex-col self-start gap-4 md:col-start-2", variant === "home" ? "md:gap-6" : "md:gap-3")}>
          <p className={cn("font-medium text-vinus-ink", variant === "home" ? "type-body md:font-normal md:text-vinus-ink/65" : "type-label md:font-normal")}>
            {category} · {date}
          </p>
          <h2
            className={cn(
              "font-medium text-vinus-ink transition-opacity duration-200 group-hover:opacity-65",
              variant === "home" ? "type-story-title type-story-title--home" : "type-story-title",
            )}
          >
            {title}
          </h2>
          <p className={cn("type-body font-normal text-vinus-ink", variant === "home" ? "max-w-[680px]" : "max-w-[720px]")}>{excerpt}</p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="hidden size-6 stroke-[1.2] transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 md:col-start-3 md:block"
        />
      </Link>
    </motion.div>
  );
}
