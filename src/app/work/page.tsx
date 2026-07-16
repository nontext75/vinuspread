"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Grid, List as ListIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/Footer";

const projects = [
  {
    title: "Mongdang",
    subtitle: "Brand Experience & Storytelling",
    category: "Character",
    image: "/vinus/work/mongdang.png",
    href: "/work/mongdang",
  },
  {
    title: "Shinhan Easy",
    subtitle: "Digital Experience & Mobile Web",
    category: "Web",
    image: "/vinus/work/shinhan-easy.jpg",
    href: "/work/shinhan-easy",
  },
  {
    title: "Crowd OH!",
    subtitle: "Crowdsourcing Platform Design",
    category: "Web",
    image: "/vinus/work/crowd-oh.jpg",
    href: "/work/crowdsourcing-platform-crowd-oh",
  },
  {
    title: "macadamia",
    subtitle: "Product Strategy & UX/UI Design",
    category: "Web",
    image: "/vinus/work/macadamia.png",
    href: "/work/macadamia-website",
  },
  {
    title: "Budongsan114 Mediate BIZsolution",
    subtitle: "Enterprise B2B Product Strategy",
    category: "Web",
    image: "/vinus/work/budongsan114.jpg",
    href: "/work/budongsan114-mediate-bizsolution",
  },
  {
    title: "Donga On book",
    subtitle: "Branding & Digital Platform",
    category: "Web",
    image: "/vinus/work/donga-on-book.jpg",
    href: "/work/donga-on-book",
  },
  {
    title: "Aliot Brand Identity",
    subtitle: "Corporate Visual Direction & Identity",
    category: "Web",
    image: "/vinus/work/aliot-brand-identity.jpg",
    href: "/work/aliot-brand-identity",
  },
  {
    title: "The Frame Artstore Catalogue",
    subtitle: "Editorial Design & Branding System",
    category: "Web",
    image: "/vinus/work/the-frame-artstore.jpg",
    href: "/work/the-frame-artstore-catalogue",
  },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Dynamic filter lists & counts
  const categories = ["All", "Web", "Character", "Branding"];
  const getCount = (cat: string) => {
    if (cat === "All") return projects.length;
    return projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
  };

  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <main className="subpage-wrapper selection:bg-[#0d0d0d] selection:text-[#faf9f6]">
      {/* 1. Header Section */}
      <section className="subpage-header">
        <div className="subpage-header-inner">
          <p className="subpage-eyebrow">Experience</p>
          <h1 className="subpage-title mt-6">
            We Spread<br />the Beautiful Things
          </h1>
          <p className="subpage-description">
            We believe the visual work we create will make tomorrow more beautiful than today.
          </p>
        </div>
      </section>

      {/* 2. Grid & List Content */}
      <section className="subpage-content min-h-[500px]">
        {visibleProjects.length > 0 ? (
          viewMode === "grid" ? (
            // Grid View: Symmetrical 4-column layout with Motto-style labels
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {visibleProjects.map((project, idx) => (
                <motion.a
                  key={project.title}
                  href={project.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eae8e4] rounded-[0.25rem]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 48vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-103"
                    />
                  </div>
                  <div className="mt-6 flex justify-between items-baseline border-b border-[#0d0d0d]/5 pb-4">
                    <div className="min-w-0 pr-4">
                      <h2 className="text-lg md:text-xl font-normal leading-tight tracking-tight truncate">
                        {project.title}
                      </h2>
                      <p className="mt-1 truncate text-[var(--type-body)] font-normal text-[#0d0d0d]/55">{project.subtitle}</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[#0d0d0d]/45 shrink-0">
                      ({project.category})
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            // List View: Typographic list rows with fade-out on hover and preview hover cards
            <div className="border-t border-[#0d0d0d]/10">
              {visibleProjects.map((project, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnotherHovered = hoveredIdx !== null && hoveredIdx !== idx;

                return (
                  <a
                    key={project.title}
                    href={project.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`relative grid grid-cols-[1fr_auto] md:grid-cols-[1fr_2fr_auto] items-center border-b border-[#0d0d0d]/10 py-8 md:py-12 transition-opacity duration-300 ${
                      isAnotherHovered ? "opacity-25" : "opacity-100"
                    }`}
                  >
                    {/* Left: Project title & subtitle */}
                    <div>
                      <h2 className="text-2xl md:text-4xl font-normal tracking-tight">
                        {project.title}
                      </h2>
                      <p className="mt-2 text-[var(--type-body)] text-[#0d0d0d]/55">{project.subtitle}</p>
                    </div>

                    {/* Middle: Image preview revealed on hover (Desktop only) */}
                    <div className="hidden md:flex justify-center items-center relative h-16 overflow-hidden">
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -30 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute left-6 h-16 w-32 rounded overflow-hidden shadow-lg border border-[#0d0d0d]/10"
                          >
                            <Image
                              src={project.image}
                              alt=""
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right: Category in parentheses */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#0d0d0d]/50 font-light">
                        ({project.category})
                      </span>
                      <ArrowUpRight className="size-5 stroke-[1.2] text-[#0d0d0d]/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </a>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center text-center">
            <p className="text-lg text-[#0d0d0d]/45">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* 3. Floating Bottom Controller (Category Filters + View Toggle) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#0d0d0d]/95 backdrop-blur-md text-white rounded-full px-5 py-2.5 flex items-center gap-6 shadow-2xl border border-white/10 max-w-[90vw] md:max-w-max">
        {/* Category filters */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-6 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                activeFilter === cat
                  ? "bg-white text-black font-medium"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {cat} <span className="ml-0.5 text-xs opacity-50">{getCount(cat)}</span>
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`p-2 rounded-full transition-colors ${
              viewMode === "grid" ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            <Grid className="size-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`p-2 rounded-full transition-colors ${
              viewMode === "list" ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            <ListIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
