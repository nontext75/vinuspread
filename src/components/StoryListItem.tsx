"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const reduceMotion = true;
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      initial={variant === "home" || reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={variant === "home" || reduceMotion ? { opacity: 1 } : undefined}
      whileInView={variant === "home" ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.86,
        delay: reduceMotion ? 0 : index * 0.065,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group border-vinus-ink/10 bg-white",
          variant === "home"
          ? "home-story-row flex flex-col items-start gap-12 border-t border-[#e7e7e7] py-12 md:grid md:grid-cols-[144px_minmax(0,1fr)_24px] md:gap-12"
          : "story-archive-row grid min-h-[431px] grid-cols-[96px_minmax(0,1fr)] items-start gap-4 overflow-visible py-8 shadow-[inset_0_-1px_0_rgba(13,13,13,0.1)] md:min-h-60 md:grid-cols-[120px_minmax(0,1fr)_24px] md:gap-8 md:py-12",
      )}
    >
      <Link href={href} className="contents">
        <div
          ref={imageRef}
          className={cn(
            "relative shrink-0 overflow-hidden rounded-full bg-vinus-wash",
            variant === "home" ? "home-story-image size-36" : "size-24 md:size-[120px]",
          )}
        >
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : 1.14 }}>
            <Image
              src={image}
              alt=""
              fill
              sizes={variant === "home" ? "144px" : "(max-width: 767px) 96px, 120px"}
              loading={variant === "home" ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.06]"
            />
          </motion.div>
        </div>
        <div className={cn("flex min-w-0 flex-col self-start gap-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 md:col-start-2", variant === "home" ? "home-story-copy gap-3 md:gap-4" : "md:gap-4")}>
          <p className={cn("font-medium text-vinus-ink", variant === "home" ? "home-story-meta body-md font-normal text-vinus-secondary" : "label-sm md:font-normal")}>
            {category} · {date}
          </p>
          <h2
            className={cn(
              "font-medium text-vinus-ink transition-colors duration-300 group-hover:text-vinus-ink/80",
              variant === "home" ? "home-story-item-title heading-story-home" : "heading-story-item",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "font-normal text-vinus-ink/75",
              variant === "home" ? "home-story-excerpt body-md max-w-none text-vinus-ink" : "body-md max-w-[720px]",
            )}
          >
            {excerpt}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="hidden size-6 stroke-[1.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-1.5 motion-safe:group-hover:-translate-y-1.5 md:col-start-3 md:block"
        />
      </Link>
    </motion.div>
  );
}

