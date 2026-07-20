"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type StudioPhilosophyCardProps = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  layoutClassName?: string;
  mediaClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
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
  mediaClassName,
  titleClassName,
  descriptionClassName,
  imageSizes = "(max-width: 1023px) calc(100vw - 48px), 42vw",
  index = 0,
}: StudioPhilosophyCardProps) {
  const reduceMotion = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.12, 1.16]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 132, scale: 0.97, clipPath: "inset(24% 0 0 0)" }}
      animate={reduceMotion ? { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)" } : undefined}
      whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : 1.02,
        delay: reduceMotion ? 0 : index * 0.11,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("group flex min-w-0 flex-col gap-4 lg:gap-8 min-[2200px]:gap-12", layoutClassName)}
    >
      <div ref={mediaRef} className={cn("relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-vinus-wash", mediaClassName)}>
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
        <h2 className="type-value-word">{tag}</h2>
        <h3 className={cn("type-lead font-medium md:type-heading md:font-normal", titleClassName)}>{title}</h3>
        <p className={cn("type-body max-w-[584px] font-normal text-vinus-ink md:type-lead", descriptionClassName)}>{description}</p>
      </div>
    </motion.article>
  );
}
