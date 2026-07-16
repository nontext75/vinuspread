"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const insights = [
  {
    title: "Why You Shouldn't Choose Brand Colors by Instinct",
    excerpt: "Color is not just a matter of taste; it determines the perception and emotions of your brand. Even a small change can affect the entire way people perceive your brand.",
    date: "2026.04.20",
    category: "Insight",
    image: "/vinus/insights/brand-color.jpg",
    href: "https://vinus-website.vercel.app/story/post-1779326372529",
  },
  {
    title: "What Happens When You Don't Have Design Principles",
    excerpt: "Without clear principles, design sways with every piece of feedback and personal preference. Consistent standards keep all decisions moving in one direction.",
    date: "2026.05.22",
    category: "Insight",
    image: "/vinus/insights/design-principles.png",
    href: "https://vinus-website.vercel.app/story/post-1779449177212",
  },
  {
    title: "UX Writing: How to Start with a Single Button",
    excerpt: "We design starting from the shortest sentences users encounter most frequently. Even the wording of a single button shapes the direction of the experience and the next action.",
    date: "2026.05.01",
    category: "Insight",
    image: "/vinus/insights/ux-writing.png",
    href: "https://vinus-website.vercel.app/story/ux-3",
  },
];

export default function NewsPage() {
  return (
    <main className="subpage-wrapper selection:bg-[#0d0d0d] selection:text-[#faf9f6]">
      {/* 1. Header Section */}
      <section className="subpage-header">
        <div className="subpage-header-inner">
          <p className="subpage-eyebrow">Story</p>
          <h1 className="subpage-title mt-6">
            Ideas and stories<br />worth sharing.
          </h1>
          <p className="subpage-description">
            Practical observations on brands, products, design principles, and the words that shape digital experiences.
          </p>
        </div>
      </section>

      {/* 2. Story List Section */}
      <section className="subpage-content">
        <div className="border-t border-[#0d0d0d]/10">
          {insights.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className="group grid grid-cols-[88px_1fr] gap-6 border-b border-[#0d0d0d]/10 py-9 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-9 md:py-12"
            >
              {/* Circular Image */}
              <div className="relative size-[88px] overflow-hidden rounded-full md:size-[120px] shrink-0 bg-[#eae8e4]">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 88px, 120px"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-103"
                />
              </div>

              {/* Text content */}
              <div className="min-w-0">
                <p className="mb-3 text-[var(--type-label)] font-medium uppercase text-[#0d0d0d]/45">
                  {article.category} · {article.date}
                </p>
                <h2 className="text-2xl font-normal leading-[1.15] md:text-3.5xl tracking-tight transition-opacity group-hover:opacity-70">
                  {article.title}
                </h2>
                <p className="mt-4 max-w-[720px] text-[var(--type-body)] font-normal leading-[1.6] text-[#0d0d0d]/60">
                  {article.excerpt}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-start justify-end pt-1">
                <ArrowUpRight className="size-6 stroke-[1.2] text-[#0d0d0d]/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
