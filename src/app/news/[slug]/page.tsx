import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid2X2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { CategoryBadge } from "@/components/CategoryBadge";
import { getStory, stories } from "@/lib/stories";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) return {};

  return {
    title: `${story.title} | Vinuspread`,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  const currentIndex = stories.findIndex((item) => item.slug === story.slug);
  const nextStory = stories[(currentIndex + 1) % stories.length];

  return (
    <main className="bg-white text-vinus-ink selection:bg-vinus-ink selection:text-white">
      <article className="story-detail-article pt-[72px]">
        <header className="story-detail-header flex h-[349px] flex-col gap-12 overflow-hidden px-6 pt-16 pb-24 md:gap-16 md:px-16 md:pt-24 md:pb-40">
          <Link
            href="/news"
            className="type-body inline-flex w-fit items-center gap-3 font-medium transition-opacity duration-200 hover:opacity-55 md:type-label"
          >
            <ArrowLeft aria-hidden="true" className="size-5 stroke-[1.25]" />
            Back to Story
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
            <div className="flex flex-col gap-6 md:col-span-10 md:gap-12">
              <p className="type-body font-medium">
                {story.category} · {story.date}
              </p>
              <h1 className="story-detail-title type-page max-w-[1900px] font-normal">{story.title}</h1>
            </div>
          </div>
        </header>

        <figure className="story-detail-cover relative h-[260px] w-full overflow-hidden bg-vinus-wash md:aspect-[2560/1280] md:h-auto">
          <Image
            src={story.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </figure>

        <div className="story-detail-body grid h-[1236px] grid-cols-1 gap-10 overflow-hidden px-6 py-16 md:grid-cols-12 md:gap-8 md:px-16 md:py-40">
          <aside className="flex flex-wrap content-start gap-2 md:col-span-2 md:flex-col md:gap-3">
            {story.tags.map((tag) => (
              <CategoryBadge key={tag}>{tag}</CategoryBadge>
            ))}
          </aside>

          <div className="flex flex-col gap-8 md:col-start-4 md:col-span-6 md:gap-32">
            <p className="type-editorial-heading font-normal">{story.intro}</p>

            {story.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-4 md:gap-8">
                <h2 className="type-editorial-heading font-medium">{section.heading}</h2>
                <div className="flex flex-col gap-4 md:gap-6">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="type-lead max-w-[900px] font-normal text-vinus-ink/65">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <nav className="story-detail-nav grid h-[88px] grid-cols-3 overflow-hidden border-t border-vinus-ink/10 md:h-[72px]">
          <Link href={`/news/${stories[(currentIndex - 1 + stories.length) % stories.length].slug}`} className="group flex items-center justify-center gap-3 border-r border-vinus-ink/10 md:justify-start md:px-16">
            <ArrowLeft aria-hidden="true" className="size-5 transition-transform group-hover:-translate-x-1" />
            <span className="type-label hidden md:inline">Previous story</span>
          </Link>
          <Link href="/news" aria-label="All stories" className="flex items-center justify-center border-r border-vinus-ink/10"><Grid2X2 className="size-4" /></Link>
          <Link href={`/news/${nextStory.slug}`} className="group flex items-center justify-center gap-3 md:justify-end md:px-16">
            <span className="type-label hidden md:inline">Next story</span>
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </article>

      <Footer />
    </main>
  );
}
