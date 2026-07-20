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
    tag: "mind",
    title: "Detailing the Value",
    description: "We add value in details. A difference in an unexpected, unseen place is what ultimately determines the level of completeness.",
    image: "/vinus/dummy-photo/studio-01.jpg",
    placement: "order-2 lg:order-none min-[2200px]:col-span-5 min-[2200px]:col-start-1 min-[2200px]:row-start-1",
    ratio: "h-auto w-full aspect-[4/3] min-[2200px]:aspect-[584/438]",
  },
  {
    tag: "think",
    title: "Asking and Answering",
    description: "We deeply contemplate the essence of value. True planning starts in the process of asking questions and finding answers.",
    image: "/vinus/dummy-photo/studio-02.jpg",
    placement: "order-1 lg:order-none min-[2200px]:col-span-5 min-[2200px]:col-start-8 min-[2200px]:row-start-1",
    ratio: "h-auto aspect-[4/5] min-[2200px]:h-[1243px] min-[2200px]:aspect-auto",
  },
  {
    tag: "behavior",
    title: "Discovering Experience",
    description: "We change the world by discovering experiences and practicing action. We realize the value of business to help our partners leap forward.",
    image: "/vinus/dummy-photo/studio-03.jpg",
    placement: "order-3 lg:order-none min-[2200px]:col-span-4 min-[2200px]:col-start-3 min-[2200px]:row-start-3",
    ratio: "h-auto aspect-[4/3] min-[2200px]:h-[592px] min-[2200px]:aspect-auto",
  },
] as const;

const businessFields = [
  { title: "Website", description: "Designing and developing web platforms optimized for brand and business value.", image: "/vinus/dummy-photo/work-02.jpg" },
  { title: "Mobile App", description: "Crafting intuitive and user-centered mobile UX/UI designs and application architectures.", image: "/vinus/dummy-photo/work-04.jpg" },
  { title: "Branding", description: "Building unique brand identities and cohesive visual systems that express core values.", image: "/vinus/dummy-photo/work-01.jpg" },
] as const;

const visionFormula = [
  { label: "Venus", meaning: "Beauty" },
  { label: "Virus", meaning: "Inspiration" },
  { label: "Spread", meaning: "Action", tone: "dark" },
] as const;

export default function StudioPage() {
  const reduceMotion = useReducedMotion();
  const enter = (distance = 36) => ({ opacity: 0, y: distance });
  const wideImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wideScroll } = useScroll({ target: wideImageRef, offset: ["start end", "end start"] });
  const wideImageY = useTransform(wideScroll, [0, 1], ["-14%", "14%"]);
  const wideImageScale = useTransform(wideScroll, [0, 0.5, 1], [1.16, 1.08, 1.14]);

  return (
    <main className="subpage-wrapper selection:bg-vinus-ink selection:text-vinus-paper">
      <SubpageHero
        eyebrow="Studio"
        title={<><span>We elevate essential</span><br /><span>value with beauty.</span></>}
        description="Even amidst the intense speed of a rapidly changing era, we focus on the unchanging essence of value, striving to create beautiful design that transcends structural and physical limits."
        size="spacious"
      />

      <section className="studio-principles h-[1646px] w-full overflow-hidden border-b border-vinus-ink/10 px-[var(--space-edge)] pt-12 pb-24 md:h-auto md:overflow-visible md:py-[var(--space-section)]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-8 min-[2200px]:grid-cols-[repeat(12,173.333px)] min-[2200px]:grid-rows-[1491px_48px_864px] min-[2200px]:gap-x-8 min-[2200px]:gap-y-0">
          {philosophies.map((item, index) => (
            <StudioPhilosophyCard
              key={item.tag}
              tag={item.tag}
              title={item.title}
              description={item.description}
              image={item.image}
              layoutClassName={item.placement}
              mediaClassName={item.ratio}
              descriptionClassName={item.tag === "think" ? "min-[2200px]:max-w-none" : undefined}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="studio-vision flex h-[1156px] w-full flex-col gap-8 overflow-hidden border-b border-vinus-ink/10 px-[var(--space-edge)] py-24 md:h-auto md:overflow-visible md:gap-16 md:py-[var(--space-section)] min-[2200px]:!h-[2900px]">
          <motion.div
            initial={reduceMotion ? false : enter(48)}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start justify-start gap-8 text-left md:items-center md:justify-center md:gap-12 md:pr-12 md:text-center min-[2200px]:h-[1384px]"
          >
            <p className="type-label font-medium md:hidden">Our Vision</p>
            <h2 className="type-studio-vision type-studio-vision--compact font-normal">Spread<br />the Beautiful<br />Things</h2>
            <p className="type-lead max-w-[960px] font-normal md:type-heading">
              We believe the visual works we create will change tomorrow&apos;s world<br className="hidden md:block" /> to be more beautiful than today.
            </p>
            <VisionFormula items={visionFormula} />
          </motion.div>

          <motion.div
            ref={wideImageRef}
            initial={reduceMotion ? false : { opacity: 0, y: 48 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[428px] w-full overflow-hidden bg-vinus-wash md:h-auto md:aspect-[2432/939] min-[2200px]:h-[939px]"
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ y: reduceMotion ? 0 : wideImageY, scale: reduceMotion ? 1 : wideImageScale }}
            >
              <Image src="/vinus/dummy-photo/studio-wide.jpg" alt="VINUSPREAD visual perspective" fill sizes="calc(100vw - 128px)" className="object-cover" />
            </motion.div>
          </motion.div>
      </section>


      <section className="studio-business h-[1660px] w-full overflow-hidden border-b border-vinus-ink/10 px-[var(--space-edge)] py-24 md:h-auto md:overflow-visible md:py-[var(--space-section)] min-[2200px]:!h-[1103px] min-[2200px]:overflow-hidden">
        <div className="flex max-w-[1200px] flex-col gap-10 md:gap-6">
          <h2 className="type-studio-business-title">Field of business</h2>
          <p className="type-studio-business-intro max-w-[640px]">We provide optimized digital services, enabling users to interact easily and comfortably across digital touchpoints.</p>
        </div>
        <div className="grid grid-cols-1 gap-10 pt-10 md:grid-cols-3 md:gap-8 md:pt-16">
          {businessFields.map((field, index) => (
            <ServiceCard
              key={field.title}
              title={field.title}
              description={field.description}
              variant="image"
              image={field.image}
              imageAlt=""
              href="/contact"
              className="studio-business-card h-[392px] overflow-hidden border-t border-vinus-ink/10 pt-6 md:h-auto md:overflow-visible"
              mediaClassName="aspect-[789/493]"
              titleClassName="type-business-card-title lowercase font-medium"
              descriptionClassName="text-vinus-ink"
              copyClassName="md:gap-6"
              arrowPlacement="footer"
              animate
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="studio-clients flex w-full flex-col gap-[var(--space-section)] px-[var(--space-edge)] py-24 md:py-[var(--space-section)]">
        <div className="flex max-w-[1130px] flex-col gap-[var(--space-content)]">
          <h2 className="type-feature font-normal">Clients &amp; Partners</h2>
          <p className="type-heading max-w-[1040px] font-normal">
            New value begins with the connection between people. We do work that moves people&apos;s hearts.
          </p>
        </div>
        <ClientLogoGrid tone="light" dividers="top" mobileLimit={20} />
      </section>

      <Footer />
    </main>
  );
}
