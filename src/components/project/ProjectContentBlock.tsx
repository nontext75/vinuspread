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
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.08, 1.12]);
  const mediaVariant = image.includes("budongsan-dashboard")
    ? "project-content-block__media--dashboard"
    : image.includes("budongsan-websites")
      ? "project-content-block__media--websites"
      : image.includes("budongsan-architecture")
        ? "project-content-block__media--architecture"
        : "project-content-block__media--standard";

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
        <h2
          className="heading-editorial font-normal"
        >
          {heading}
        </h2>
        <p
          className="body-md whitespace-pre-line font-normal text-vinus-ink/65"
        >
          {body}
        </p>
      </div>
      <div
        ref={mediaRef}
        className={`project-content-block__media relative w-full overflow-hidden bg-vinus-wash lg:order-2 ${mediaVariant} ${index === 0 ? "order-1" : "order-2"}`}
      >
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : imageScale }}>
          <Image src={image} alt={heading} fill sizes="(max-width: 1023px) calc(100vw - 48px), 66vw" className="object-cover" />
        </motion.div>
      </div>
    </motion.article>
  );
}

