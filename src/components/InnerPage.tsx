"use client";

import { ArrowUpRight } from "lucide-react";

type InnerPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  items: Array<{ title: string; detail: string; href?: string }>;
};

export function InnerPage({ eyebrow, title, description, items }: InnerPageProps) {
  return (
    <main className="subpage-wrapper selection:bg-[#0d0d0d] selection:text-[#faf9f6]">
      {/* 1. Header Section */}
      <section className="subpage-header">
        <div className="subpage-header-inner">
          <p className="subpage-eyebrow">{eyebrow}</p>
          <h1 className="subpage-title mt-6">{title}</h1>
          <p className="subpage-description">{description}</p>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="subpage-content">
        <div className="border-t border-[#0d0d0d]/10 pt-16">
          {items.map((item) => {
            const content = (
              <>
                <h2 className="text-[clamp(1.5rem,2.8vw,3rem)] font-normal leading-[1.1]">{item.title}</h2>
                <p className="max-w-[620px] text-base leading-[1.55] text-[#0d0d0d]/55 md:text-lg">{item.detail}</p>
                {item.href && <ArrowUpRight className="size-6 stroke-[1.2]" />}
              </>
            );

            return item.href ? (
              <a key={item.title} href={item.href} className="grid gap-5 border-b border-[#0d0d0d]/12 py-9 md:grid-cols-[1fr_1fr_auto] md:items-center md:py-12">{content}</a>
            ) : (
              <div key={item.title} className="grid gap-5 border-b border-[#0d0d0d]/12 py-9 md:grid-cols-2 md:items-center md:py-12">{content}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
