"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type StudioPhilosophyCardProps = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  layoutClassName?: string;
  mediaRatio?: "landscape" | "portrait" | "studioWide" | "shortWide";
  imageSizes?: string;
  index?: number;
};

/** Reusable Studio philosophy card with flow-based, hug-height copy. */
export function StudioPhilosophyCard({
  tag,
  title,
  description,
  image,
  imageAlt,
  layoutClassName,
  mediaRatio = "landscape",
  imageSizes = "(max-width: 1023px) calc(100vw - 48px), 42vw",
  index = 0,
}: StudioPhilosophyCardProps) {
  const reduceMotion = true;
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.12, 1.16]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 96, scale: 0.985 }}
      animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.9,
        delay: reduceMotion ? 0 : index * 0.075,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("group flex min-w-0 flex-col gap-4 lg:gap-8 min-[2200px]:gap-12", layoutClassName)}
      data-studio-card={tag.toLowerCase()}
    >
      <div
        ref={mediaRef}
        className={cn(
          "studio-philosophy-card__media relative w-full shrink-0 overflow-hidden bg-vinus-wash",
          mediaRatio === "landscape" && "studio-philosophy-card__media--landscape",
          mediaRatio === "portrait" && "studio-philosophy-card__media--portrait",
          mediaRatio === "studioWide" && "studio-philosophy-card__media--studio-wide",
          mediaRatio === "shortWide" && "studio-philosophy-card__media--short-wide",
        )}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}
        >
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            priority={index === 0}
            sizes={imageSizes}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="display-studio-keyword">{tag}</h2>
        <h3 className="heading-md font-normal">{title}</h3>
        <p className="studio-philosophy-card__description body-lg max-w-[584px] font-normal text-vinus-ink">{description}</p>
      </div>
    </motion.article>
  );
}
