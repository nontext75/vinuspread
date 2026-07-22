"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export type ProjectContentBlockProps = {
  heading: string;
  body: string;
  image: string;
  index: number;
};

export function ProjectContentBlock({ heading, body, image, index }: ProjectContentBlockProps) {
  const reduceMotion = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.1, 1.14]);
  const mediaAspect = image.includes("budongsan-dashboard")
    ? "aspect-[164/512]"
    : image.includes("budongsan-websites")
      ? "aspect-[202/512]"
      : image.includes("budongsan-architecture")
        ? "aspect-[2880/2151]"
        : "aspect-[1605/1003]";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-full flex-col items-start gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.06fr)] lg:gap-12"
    >
      <div className={`flex max-w-[780px] flex-col gap-6 lg:sticky lg:top-32 ${index === 0 ? "order-2 lg:order-1" : "order-1"}`}>
        <h2 className="type-editorial-heading font-normal">{heading}</h2>
        <p className="type-body whitespace-pre-line font-normal text-vinus-ink/65">{body}</p>
      </div>
      <div
        ref={mediaRef}
        className={`relative w-full overflow-hidden bg-vinus-wash lg:order-2 ${mediaAspect} ${index === 0 ? "order-1" : "order-2"}`}
      >
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}>
          <Image src={image} alt={heading} fill sizes="(max-width: 1023px) calc(100vw - 48px), 66vw" className="object-cover" />
        </motion.div>
      </div>
    </motion.article>
  );
}

