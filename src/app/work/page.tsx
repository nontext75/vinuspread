"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioListItem } from "@/components/PortfolioListItem";
import { PortfolioControls, type PortfolioViewMode } from "@/components/PortfolioControls";

const projects = [
  { title: "Mongdang", subtitle: "Brand Experience & Storytelling", category: "Character", image: "/vinus/dummy-photo/work-01.jpg", href: "/work/mongdang" },
  { title: "Shinhan Easy", subtitle: "Digital Experience & Mobile Web", category: "Web", image: "/vinus/dummy-photo/work-02.jpg", href: "/work/shinhan-easy" },
  { title: "Crowd OH!", subtitle: "Crowdsourcing Platform Design", category: "Web", image: "/vinus/dummy-photo/work-03.jpg", href: "/work/crowdsourcing-platform-crowd-oh" },
  { title: "macadamia", subtitle: "Product Strategy & UX/UI Design", category: "Web", image: "/vinus/dummy-photo/work-04.jpg", href: "/work/macadamia-website" },
  { title: "Budongsan114 Mediate BIZsolution", subtitle: "Enterprise B2B Product Strategy", category: "Web", image: "/vinus/dummy-photo/work-05.jpg", href: "/work/budongsan114-mediate-bizsolution" },
  { title: "Donga On book", subtitle: "Branding & Digital Platform", category: "Web", image: "/vinus/dummy-photo/work-06.jpg", href: "/work/donga-on-book" },
  { title: "Aliot Brand Identity", subtitle: "Corporate Visual Direction & Identity", category: "Web", image: "/vinus/dummy-photo/work-07.jpg", href: "/work/aliot-brand-identity" },
  { title: "The Frame Artstore Catalogue", subtitle: "Editorial Design & Branding System", category: "Web", image: "/vinus/dummy-photo/work-08.jpg", href: "/work/the-frame-artstore-catalogue" },
] as const;

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
        title={<>We Spread{" "}<br />the Beautiful Things</>}
        titleLabel="We Spread the Beautiful Things"
        description="Explore selected work shaped through product strategy, interface design, and brand systems."
        className="experience-page-hero"
      />

      <section className="experience-page-list relative overflow-visible">
        <AnimatePresence mode="wait" initial={false}>
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="experience-page-grid grid w-full grid-cols-1 content-start"
          >
            {visibleProjects.map((project, index) => (
              <PortfolioCard
                key={project.title}
                {...project}
                index={index}
                animate
                mediaRatio="landscape"
                imageSizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
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

        <div className="experience-page-controls">
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
