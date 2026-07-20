import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
      <article className="pt-[72px] md:pt-[96px]">
        <header className="flex min-h-[540px] flex-col gap-12 px-6 pt-16 pb-24 md:h-[620px] md:min-h-0 md:gap-16 md:overflow-hidden md:px-16 md:pt-24 md:pb-40">
          <Link
            href="/news"
            className="type-body inline-flex w-fit items-center gap-3 font-medium transition-opacity duration-200 hover:opacity-55 md:type-label"
          >
            <ArrowLeft aria-hidden="true" className="size-5 stroke-[1.25]" />
            스토리 목록으로
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
            <div className="flex flex-col gap-6 md:col-span-10 md:gap-12">
              <p className="type-body font-medium">
                {story.category} · {story.date}
              </p>
              <h1 className="type-page max-w-[1900px] font-normal">{story.title}</h1>
            </div>
          </div>
        </header>

        <figure className="relative aspect-[390/420] w-full overflow-hidden bg-vinus-wash md:aspect-[2560/1280]">
          <Image
            src={story.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </figure>

        <div className="grid grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:gap-8 md:px-16 md:py-40">
          <aside className="flex flex-wrap content-start gap-2 md:col-span-2 md:flex-col md:gap-3">
            {story.tags.map((tag) => (
              <CategoryBadge key={tag}>{tag}</CategoryBadge>
            ))}
          </aside>

          <div className="flex flex-col gap-20 md:col-start-4 md:col-span-6 md:gap-32">
            <p className="type-editorial-heading font-normal">{story.intro}</p>

            {story.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-6 md:gap-8">
                <h2 className="type-editorial-heading font-medium">{section.heading}</h2>
                <div className="flex flex-col gap-6">
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

        <nav className="h-[425px] border-t border-vinus-ink/10 px-6 py-16 md:h-auto md:px-16 md:py-24">
          <Link href={`/news/${nextStory.slug}`} className="group flex items-end justify-between gap-8">
            <div className="flex max-w-[1800px] flex-col gap-4">
              <span className="type-body font-medium">다음 스토리</span>
              <span className="type-story-next font-normal">{nextStory.title}</span>
            </div>
            <ArrowRight aria-hidden="true" className="size-12 shrink-0 stroke-[1.1] transition-transform duration-200 group-hover:translate-x-3 md:size-[92px]" />
          </Link>
        </nav>
      </article>

      <Footer />
    </main>
  );
}
