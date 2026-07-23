"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/Footer";

import { ClientLogoGrid } from "@/components/ClientLogoGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { StudioPhilosophyCard } from "@/components/StudioPhilosophyCard";
import { SubpageHero } from "@/components/SubpageHero";
import { VisionFormula } from "@/components/VisionFormula";

const philosophies = [
  {
    tag: "Mind",
    title: "Define the Value",
    description: "We clarify what matters most, then turn it into decisions that make each project stronger.",
    image: "/vinus/dummy-photo/studio-01.jpg",
    placement: "order-1 xl:order-none min-[2200px]:col-span-5 min-[2200px]:col-start-1 min-[2200px]:row-start-1",
    mediaRatio: "studioWide",
  },
  {
    tag: "Think",
    title: "Question the Direction",
    description: "We ask better questions early, so strategy, structure, and design can move in one clear direction.",
    image: "/vinus/dummy-photo/studio-02.jpg",
    placement: "order-2 xl:order-none min-[2200px]:col-span-5 min-[2200px]:col-start-8 min-[2200px]:row-start-1",
    mediaRatio: "portrait",
  },
  {
    tag: "Behavior",
    title: "Shape the Experience",
    description: "We translate direction into interfaces, systems, and interactions that people can understand and use.",
    image: "/vinus/dummy-photo/studio-03.jpg",
    placement: "order-3 xl:order-none min-[2200px]:col-span-4 min-[2200px]:col-start-3 min-[2200px]:row-start-3",
    mediaRatio: "shortWide",
  },
] as const;

const businessFields = [
  { title: "Website", description: "Designing and developing web platforms optimized for brand and business value.", image: "/vinus/dummy-photo/work-02.jpg" },
  { title: "Mobile App", description: "Crafting intuitive and user-centered mobile UX/UI designs and application architectures.", image: "/vinus/dummy-photo/work-04.jpg" },
  { title: "Branding", description: "Building unique brand identities and cohesive visual systems that express core values.", image: "/vinus/dummy-photo/work-01.jpg" },
] as const;

const visionFormula: ReadonlyArray<{ label: string; meaning: string; tone?: "light" | "dark" }> = [
  { label: "Venus", meaning: "beauty" },
  { label: "Virus", meaning: "inspiration" },
  { label: "Spread", meaning: "action", tone: "dark" },
] as const;

export default function StudioPage() {
  const reduceMotion = useReducedMotion();
  const visionTitleLines = ["Spread", "the Beautiful", "Things"];
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;
  const wideImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wideScroll } = useScroll({ target: wideImageRef, offset: ["start end", "end start"] });
  const wideImageY = useTransform(wideScroll, [0, 1], ["-14%", "14%"]);
  const wideImageScale = useTransform(wideScroll, [0, 0.5, 1], [1.16, 1.08, 1.14]);

  const visionContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.11,
      },
    },
  };
  const visionLine = {
    hidden: reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 132, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 1.08, ease: easeOutExpo },
    },
  };
  const visionCopy = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.86, ease: easeOutExpo },
    },
  };
  return (
    <main className="subpage-wrapper selection:bg-vinus-ink selection:text-vinus-paper">
      <SubpageHero
        eyebrow="Studio"
        title={<><span>We elevate essential</span>{" "}<br /><span>value with beauty.</span></>}
        titleLabel="We elevate essential value with beauty."
        description="In a fast changing world, we help brands and products stay focused on what matters, then improve it through design, technology, and iteration."
        size="spacious"
        className="studio-page-hero"
      />

      <section className="studio-principles w-full overflow-visible border-b border-vinus-ink/10 px-[var(--space-edge)] pt-12 pb-20 md:py-[var(--space-section)]">
        <div className="studio-principles-grid grid grid-cols-1 md:grid-cols-3">
          {philosophies.map((item, index) => (
            <StudioPhilosophyCard
              key={item.tag}
              tag={item.tag}
              title={item.title}
              description={item.description}
              image={item.image}
              layoutClassName={item.placement}
              mediaRatio={item.mediaRatio}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="studio-vision flex w-full flex-col gap-8 overflow-visible border-b border-vinus-ink/10 px-[var(--space-edge)] py-16 md:gap-16 md:py-[var(--space-section)] min-[2200px]:gap-24 min-[2200px]:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22, margin: "0px 0px -10% 0px" }}
            variants={visionContainer}
            className="studio-vision-title-block flex flex-col items-center justify-center gap-8 text-center md:gap-12 min-[2200px]:h-[612px] min-[2200px]:gap-12"
          >
            <motion.p variants={visionCopy} className="body-md font-medium">Our Vision</motion.p>
            <h2 className="studio-vision-title display-studio-vision display-studio-vision-compact font-normal" aria-label="Spread the Beautiful Things">
              {visionTitleLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={visionLine} className="block will-change-transform">{line}</motion.span>
                </span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={visionCopy}
            className="body-lg mx-auto w-full max-w-[1040px] text-center font-normal"
          >
            We believe good design makes ideas clearer, experiences richer,<br className="hidden md:block" /> and every next step easier to share.
          </motion.p>

          <motion.div
            ref={wideImageRef}
            initial={reduceMotion ? false : { opacity: 0, y: 48 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="studio-wide-media relative w-full overflow-hidden bg-vinus-wash"
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ y: reduceMotion ? 0 : wideImageY, scale: reduceMotion ? 1 : wideImageScale }}
            >
              <Image src="/vinus/dummy-photo/studio-wide.jpg" alt="VINUSPREAD visual perspective" fill sizes="calc(100vw - 128px)" className="object-cover" />
            </motion.div>
            <motion.div variants={visionCopy} className="absolute inset-0 z-10 flex items-center justify-center">
              <VisionFormula items={visionFormula} />
            </motion.div>
          </motion.div>
      </section>


      <section className="studio-business w-full overflow-visible border-b border-vinus-ink/10 px-[var(--space-edge)] py-16 md:py-[var(--space-section)]">
        <div className="studio-business-heading flex max-w-[1200px] flex-col">
          <h2 className="heading-studio-business">Field of business</h2>
          <p className="body-studio-business max-w-[640px]">We provide optimized digital services, enabling users to interact easily and comfortably across digital touchpoints.</p>
        </div>
        <div className="studio-business-grid grid grid-cols-1">
          {businessFields.map((field, index) => (
            <ServiceCard
              key={field.title}
              title={field.title}
              description={field.description}
              variant="image"
              image={field.image}
              imageAlt=""
              href="/contact"
              className="studio-business-card min-h-[392px] overflow-visible border-t border-vinus-ink/10 pt-6 md:min-h-0"
              mediaRatio="business"
              mode="business"
              arrowPlacement="footer"
              animate
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="studio-clients flex w-full flex-col gap-[var(--space-section)] overflow-visible px-[var(--space-edge)] py-12 md:py-[var(--space-section)]">
        <div className="studio-clients-heading flex max-w-[1200px] flex-col">
          <h2 className="heading-feature font-normal">Clients &amp; Partners</h2>
          <p className="heading-md max-w-[1040px] font-normal">
            New value begins with the connection between people.<br className="hidden md:block" /> We do work that moves people&apos;s hearts.
          </p>
        </div>
        <ClientLogoGrid tone="light" dividers="top" />
      </section>

      <Footer />
    </main>
  );
}
