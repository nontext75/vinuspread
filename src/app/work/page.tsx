"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioListItem } from "@/components/PortfolioListItem";
import { PortfolioControls, type PortfolioViewMode } from "@/components/PortfolioControls";
import { portfolioProjects } from "@/lib/portfolio";

const projects = portfolioProjects.map((project) => ({ ...project, href: `/work/${project.slug}` }));

const categories = ["All", "Web", "Character", "Branding"] as const;
type Category = (typeof categories)[number];

export default function WorkPage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<PortfolioViewMode>("grid");
  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  const countFor = (category: Category) => category === "All"
    ? projects.length
    : projects.filter((project) => project.category === category).length;

  return (
    <main className="subpage-wrapper selection:bg-vinus-ink selection:text-vinus-paper">
      <SubpageHero
        eyebrow="Experience"
        title={<>We Spread<br />the Beautiful Things</>}
        description={<>제품 전략, 인터페이스 디자인, 브랜드 시스템으로 완성한<br className="hidden md:block" />주요 프로젝트를 소개합니다.</>}
        size="spacious"
        className="max-md:min-h-[520px]"
      />

      <section className="subpage-content flex flex-col gap-16 !pt-14 !pb-[68px] md:gap-8 md:!pt-0 md:!pb-[70px]">
        <AnimatePresence mode="wait" initial={false}>
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-start gap-12 sm:grid sm:grid-cols-2 sm:gap-x-[var(--grid-gutter)] sm:gap-y-12 sm:content-start lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          >
            {visibleProjects.map((project, index) => (
              <PortfolioCard
                key={project.title}
                {...project}
                index={index}
                animate
                imageSizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, (max-width: 1535px) 25vw, 20vw"
                layoutClassName="w-full"
                mediaClassName="aspect-[4/3]"
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="border-t border-vinus-ink/10"
          >
            {visibleProjects.map((project, index) => (
              <PortfolioListItem
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </motion.div>
        )}
        </AnimatePresence>

        <div className="order-first z-20 flex w-full justify-start md:sticky md:bottom-8 md:order-last md:justify-center md:pb-2">
          <PortfolioControls
            categories={categories}
            activeCategory={activeFilter}
            getCount={countFor}
            onCategoryChange={setActiveFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
