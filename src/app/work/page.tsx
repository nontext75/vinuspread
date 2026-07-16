"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const projects = [
  { title: "Mongdang", category: "Character", image: "/vinus/work/mongdang.png", href: "https://vinus-website.vercel.app/work/mongdang" },
  { title: "Shinhan Easy", category: "Web", image: "/vinus/work/shinhan-easy.jpg", href: "https://vinus-website.vercel.app/work/shinhan-easy" },
  { title: "Crowdsourcing Platform Crowd OH!", category: "Web", image: "/vinus/work/crowd-oh.jpg", href: "https://vinus-website.vercel.app/work/crowdsourcing-platform-crowd-oh" },
  { title: "macadamia", category: "Web", image: "/vinus/work/macadamia.png", href: "https://vinus-website.vercel.app/work/macadamia-website" },
  { title: "Budongsan114 Mediate BIZsolution", category: "Web", image: "/vinus/work/budongsan114.jpg", href: "https://vinus-website.vercel.app/work/budongsan114-mediate-bizsolution" },
  { title: "Donga On book", category: "Web", image: "/vinus/work/donga-on-book.jpg", href: "https://vinus-website.vercel.app/work/donga-on-book" },
  { title: "Aliot Brand Identity", category: "Web", image: "/vinus/work/aliot-brand-identity.jpg", href: "https://vinus-website.vercel.app/work/aliot-brand-identity" },
  { title: "The Frame Artstore Catalogue", category: "Web", image: "/vinus/work/the-frame-artstore.jpg", href: "https://vinus-website.vercel.app/work/the-frame-artstore-catalogue" },
];

const filters = [
  { label: "All", count: 8 },
  { label: "UI/UX", count: 0 },
  { label: "Branding", count: 0 },
  { label: "Web", count: 7 },
  { label: "App", count: 0 },
  { label: "Etc", count: 0 },
];

const layouts = [
  "md:col-span-5 md:col-start-1",
  "md:col-span-4 md:col-start-8 md:mt-36",
  "md:col-span-4 md:col-start-2 md:mt-8",
  "md:col-span-5 md:col-start-8 md:mt-44",
  "md:col-span-5 md:col-start-1 md:mt-10",
  "md:col-span-4 md:col-start-8 md:mt-40",
  "md:col-span-4 md:col-start-2 md:mt-6",
  "md:col-span-5 md:col-start-8 md:mt-36",
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <main className="min-h-screen bg-white text-[#0d0d0d]">
      <header className="fixed inset-x-0 top-0 z-40 flex h-24 items-center justify-between px-6 mix-blend-difference text-white md:px-16">
        <Link href="/" className="text-xl font-semibold tracking-tight">vinuspread</Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-medium md:gap-7">
          <Link href="/work" aria-current="page" className="border-b border-current pb-1">Work</Link>
          <Link href="/studio" className="hidden transition-opacity hover:opacity-50 md:block">Studio</Link>
          <Link href="/news" className="hidden transition-opacity hover:opacity-50 md:block">News</Link>
          <Link href="/contact" className="rounded-full border border-white/40 px-5 py-2.5 transition-colors hover:bg-white hover:text-black">Contact</Link>
        </nav>
      </header>

      <section className="px-6 pb-24 pt-[24vh] md:px-16 md:pb-36 md:pt-[28vh]">
        <div className="flex items-end justify-between gap-8 border-b border-[#0d0d0d]/15 pb-10 md:pb-14">
          <h1 className="text-[clamp(4.5rem,13vw,13rem)] font-normal leading-[0.78] tracking-[-0.065em]">Experience</h1>
          <p className="hidden pb-2 text-sm tabular-nums text-[#0d0d0d]/45 md:block">8 projects</p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <p className="text-sm uppercase text-[#0d0d0d]/45 md:col-span-3">Seamless new experiences</p>
          <p className="max-w-[820px] text-[clamp(1.25rem,2.1vw,2rem)] leading-[1.4] tracking-[-0.025em] md:col-span-8">
            우리는 치밀한 리서치와 전략을 바탕으로 브랜드와 사용자의 경험을 설계하며,<br className="hidden md:block" />
            새롭지만 직관적인 디지털 경험으로 더 가치 있는 브랜드를 만들어갑니다.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#0d0d0d]/12 py-5 md:mt-24 md:gap-x-9">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setActiveFilter(filter.label)}
              aria-pressed={activeFilter === filter.label}
              className={`text-sm uppercase transition-opacity ${activeFilter === filter.label ? "opacity-100" : "opacity-35 hover:opacity-70"}`}
            >
              {filter.label}<sup className="ml-1 text-[10px]">{filter.count}</sup>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-40 md:px-16 md:pb-56">
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-24 md:grid-cols-12 md:gap-x-10 md:gap-y-28">
            {visibleProjects.map((project, index) => (
              <a key={project.title} href={project.href} className={`group block ${layouts[index] ?? "md:col-span-5"}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 46vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase text-[#0d0d0d]/45">{project.category}</p>
                    <h2 className="mt-2 text-[clamp(1.35rem,2vw,2.2rem)] font-medium leading-[1.1] tracking-[-0.035em]">{project.title}</h2>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 stroke-[1.2] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[42vh] items-center justify-center border-b border-[#0d0d0d]/12 text-center">
            <p className="text-lg text-[#0d0d0d]/45">No projects in this category yet.</p>
          </div>
        )}
      </section>

      <section className="bg-[#1a1a1a] px-6 py-24 text-white md:px-16 md:py-36">
        <p className="text-sm uppercase text-white/40">Next page</p>
        <Link href="/studio" className="group mt-7 flex items-end justify-between border-b border-white/20 pb-6">
          <span className="text-[clamp(4rem,11vw,11rem)] font-normal leading-[0.8] tracking-[-0.06em]">Studio</span>
          <ArrowUpRight className="size-[clamp(2rem,4vw,4rem)] stroke-[1] transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
