"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/Footer";

import { ClientLogoGrid } from "@/components/ClientLogoGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { StudioPhilosophyCard } from "@/components/StudioPhilosophyCard";
import { SubpageHero } from "@/components/SubpageHero";

const philosophies = [
  {
    tag: "mind",
    title: "Define the Value",
    description: "가장 중요한 가치를 먼저 정의하고, 프로젝트를 더 단단하게 만드는 판단으로 연결합니다.",
    image: "/vinus/dummy-photo/studio-01.jpg",
    placement: "order-2 lg:order-none min-[2200px]:col-span-5 min-[2200px]:col-start-1 min-[2200px]:row-start-1",
    ratio: "h-auto w-full aspect-[4/3] min-[2200px]:aspect-[584/438]",
  },
  {
    tag: "think",
    title: "Question the Direction",
    description: "초기 단계에서 더 나은 질문을 던지고, 전략과 구조, 디자인이 하나의 방향으로 움직이게 합니다.",
    image: "/vinus/dummy-photo/studio-02.jpg",
    placement: "order-1 lg:order-none min-[2200px]:col-span-5 min-[2200px]:col-start-8 min-[2200px]:row-start-1",
    ratio: "h-auto aspect-[4/5] min-[2200px]:h-[1243px] min-[2200px]:aspect-auto",
  },
  {
    tag: "behavior",
    title: "Shape the Experience",
    description: "정해진 방향을 사람들이 이해하고 사용할 수 있는 인터페이스, 시스템, 인터랙션으로 구체화합니다.",
    image: "/vinus/dummy-photo/studio-03.jpg",
    placement: "order-3 lg:order-none min-[2200px]:col-span-4 min-[2200px]:col-start-3 min-[2200px]:row-start-3",
    ratio: "h-auto aspect-[4/3] min-[2200px]:h-[592px] min-[2200px]:aspect-auto",
  },
] as const;

const businessFields = [
  { title: "Website", description: "브랜드와 비즈니스 가치에 맞는 웹 플랫폼을 설계하고 구축합니다.", image: "/vinus/dummy-photo/work-02.jpg" },
  { title: "Mobile App", description: "사용자 중심의 모바일 UX/UI와 직관적인 앱 구조를 설계합니다.", image: "/vinus/dummy-photo/work-04.jpg" },
  { title: "Branding", description: "브랜드의 핵심 가치를 담은 아이덴티티와 시각 시스템을 만듭니다.", image: "/vinus/dummy-photo/work-01.jpg" },
] as const;

const visionFormula: ReadonlyArray<{ label: string; meaning: string; tone?: "light" | "dark" }> = [
  { label: "vinus", meaning: "beauty" },
  { label: "virus", meaning: "inspiration" },
  { label: "spread", meaning: "action", tone: "dark" },
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
  const visionToken = {
    hidden: reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 72, scale: 0.88 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.84, ease: easeOutExpo },
    },
  };

  return (
    <main className="subpage-wrapper selection:bg-vinus-ink selection:text-vinus-paper">
      <SubpageHero
        eyebrow="Studio"
        title={<><span>We elevate essential</span><br /><span>value with beauty.</span></>}
        description="빠르게 변하는 환경 속에서도 브랜드와 제품이 중요한 가치에 집중하도록 돕고, 디자인과 기술, 반복적인 개선으로 더 나은 방향을 만듭니다."
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

      <section className="studio-vision flex h-[1320px] w-full flex-col gap-8 overflow-hidden border-b border-vinus-ink/10 px-[var(--space-edge)] py-24 md:h-auto md:overflow-visible md:gap-16 md:py-[var(--space-section)] min-[2200px]:!h-[2900px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22, margin: "0px 0px -10% 0px" }}
            variants={visionContainer}
            className="flex flex-col items-center justify-center gap-8 text-center md:gap-12 md:pr-12 min-[2200px]:h-[1384px] min-[2200px]:gap-[160px]"
          >
            <motion.p variants={visionCopy} className="type-label font-medium">Our Vision</motion.p>
            <h2 className="type-studio-vision type-studio-vision--compact font-normal" aria-label="Spread the Beautiful Things">
              {visionTitleLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={visionLine} className="block will-change-transform">{line}</motion.span>
                </span>
              ))}
            </h2>
            <motion.p variants={visionCopy} className="type-lead max-w-[960px] font-normal md:type-heading">
              좋은 디자인은 아이디어를 더 선명하게 만들고, 경험을 더 풍부하게 하며,<br className="hidden md:block" /> 다음 가능성을 더 쉽게 나눌 수 있게 한다고 믿습니다.
            </motion.p>
            <motion.div
              variants={visionContainer}
              aria-label={visionFormula.map(({ label, meaning }) => `${label}, ${meaning}`).join(" plus ")}
              className="type-body flex w-full flex-col items-center gap-2 md:w-auto md:flex-row md:flex-nowrap md:gap-6"
            >
              {visionFormula.map(({ label, meaning, tone = "light" }, index) => (
                <div key={`${label}-${meaning}`} className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row md:gap-6">
                  {index > 0 && (
                    <motion.span variants={visionCopy} aria-hidden="true" className="type-lead text-vinus-ink/40">+</motion.span>
                  )}
                  <motion.span
                    variants={visionToken}
                    className={`inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-full px-6 py-2 font-medium will-change-transform md:size-[clamp(160px,18vw,240px)] md:flex-col md:px-6 md:py-5 min-[2200px]:px-10 ${
                      tone === "dark" ? "bg-vinus-ink text-white" : "bg-vinus-wash text-vinus-ink"
                    }`}
                  >
                    <span className="type-label font-normal md:text-[clamp(24px,3vw,40px)] md:font-medium md:leading-tight">{label}</span>
                    <span className={`type-label font-normal md:text-[clamp(16px,1.8vw,24px)] md:leading-8 ${tone === "dark" ? "text-white/50" : "text-vinus-ink/50"}`}>
                      <span className="md:hidden">({meaning})</span>
                      <span className="hidden md:inline">{meaning}</span>
                    </span>
                  </motion.span>
                </div>
              ))}
            </motion.div>
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
          <p className="type-studio-business-intro max-w-[760px]">
            사용자가 다양한 디지털 접점에서 쉽고 편안하게 상호작용할 수 있도록<br className="hidden md:block" />
            디지털 서비스를 최적화합니다.
          </p>
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
              titleClassName="type-business-card-title font-medium"
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
            새로운 가치는 사람과 사람의 연결에서 시작됩니다.<br />
            우리는 사람의 마음을 움직이는 일을 만듭니다.
          </p>
        </div>
        <ClientLogoGrid tone="light" dividers="top" mobileLimit={20} />
      </section>

      <Footer />
    </main>
  );
}
