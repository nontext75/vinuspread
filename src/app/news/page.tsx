"use client";

import { Footer } from "@/components/Footer";
import { StoryListItem } from "@/components/StoryListItem";
import { SubpageHero } from "@/components/SubpageHero";
import { stories } from "@/lib/stories";

export default function NewsPage() {
  return (
    <main className="subpage-wrapper selection:bg-vinus-ink selection:text-vinus-paper">
      <SubpageHero
        eyebrow="Story"
        title={<>Ideas and stories<br />worth sharing.</>}
        description="Practical observations on brands, products, design principles, and the words that shape digital experiences."
        className="max-md:min-h-[656px]"
      />

      <section className="subpage-content min-[2200px]:h-[821px]">
        <div className="flex flex-col gap-12 md:gap-0 md:border-t md:border-vinus-ink/10">
          {stories.map((article, index) => (
            <StoryListItem
              key={article.title}
              {...article}
              href={`/news/${article.slug}`}
              index={index}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
