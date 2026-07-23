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
      <article className="story-detail-article">
        <header className="story-detail-header flex flex-col overflow-hidden">
          <Link
            href="/news"
            className="story-detail-back label-sm inline-flex w-fit items-center gap-3 font-medium transition-opacity duration-200 hover:opacity-55"
          >
            <ArrowLeft aria-hidden="true" className="size-5 stroke-[1.25]" />
            Back to Story
          </Link>

          <div className="story-detail-title-group flex flex-col">
            <p className="story-detail-meta font-medium">{story.category} · {story.date}</p>
            <h1 className="story-detail-title font-normal">
              {story.slug === "brand-colors-by-instinct" ? (
                <>Why You Shouldn&apos;t Choose Brand Colors <br />by Instinct</>
              ) : story.title}
            </h1>
          </div>
        </header>

        <figure className="story-detail-cover story-detail-cover-media relative w-full overflow-hidden bg-vinus-wash">
          <Image
            src={story.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </figure>

        <div className="story-detail-body overflow-hidden">
          <div className="story-detail-content flex flex-col">
            <p className="story-detail-intro whitespace-pre-line font-medium">{story.intro}</p>
            <div className="story-detail-divider h-px w-full bg-vinus-ink/10" />

            {story.sections.map((section) => (
              <section key={section.heading} className="story-detail-section flex flex-col">
                <h2 className="story-detail-section-title font-medium">{section.heading}</h2>
                <div className="story-detail-paragraphs flex flex-col">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="story-detail-paragraph font-normal">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="story-detail-tags flex flex-wrap">
              {story.tags.map((tag) => (
                <CategoryBadge key={tag}>{tag}</CategoryBadge>
              ))}
            </div>
          </div>
        </div>

        <nav className="story-detail-nav grid h-[88px] grid-cols-3 overflow-hidden border-t border-vinus-ink/10 md:h-[72px]">
          <Link href={`/news/${stories[(currentIndex - 1 + stories.length) % stories.length].slug}`} className="group flex items-center justify-center gap-3 border-r border-vinus-ink/10 md:justify-start md:px-16">
            <ArrowLeft aria-hidden="true" className="size-5 transition-transform group-hover:-translate-x-1" />
            <span className="label-sm hidden md:inline">Previous story</span>
          </Link>
          <Link href="/news" aria-label="All stories" className="flex items-center justify-center border-r border-vinus-ink/10"><Grid2X2 className="size-4" /></Link>
          <Link href={`/news/${nextStory.slug}`} className="group flex items-center justify-center gap-3 md:justify-end md:px-16">
            <span className="label-sm hidden md:inline">Next story</span>
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </article>

      <Footer />
    </main>
  );
}
