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
        title={<>Ideas and stories{" "}<br />worth sharing.</>}
        titleLabel="Ideas and stories worth sharing."
        description="Practical observations on brands, products, design principles, and the words that shape digital experiences."
        className="story-page-hero"
      />

      <section className="story-page-list subpage-content px-5 md:px-10 min-[2200px]:px-20">
        <div className="flex flex-col gap-0 md:border-t md:border-vinus-ink/10">
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
