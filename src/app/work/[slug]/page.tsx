"use client";

import { use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Footer } from "@/components/Footer";
import { ProjectMetaGrid } from "@/components/project/ProjectMetaGrid";
import { ProjectContentBlock } from "@/components/project/ProjectContentBlock";
import { NextProjectLink } from "@/components/project/NextProjectLink";
import { portfolioData } from "@/lib/portfolio";

const projectSlugs = Object.keys(portfolioData);

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const reduceMotion = useReducedMotion();
  const { slug } = use(params);
  const project = portfolioData[slug];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0.3]);

  if (!project) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-vinus-paper px-6 text-center text-vinus-ink">
        <h1 className="type-heading font-normal">Project Not Found</h1>
        <Link href="/work" className="type-body mt-8 inline-flex items-center gap-[var(--space-inline)] text-vinus-ink/60"><ArrowLeft className="size-4" />목록으로 돌아가기</Link>
      </main>
    );
  }

  const currentIndex = projectSlugs.indexOf(slug);
  const nextSlug = projectSlugs[(currentIndex + 1) % projectSlugs.length];
  const nextProject = portfolioData[nextSlug];
  const contentBlocks = project.blocks.length > 1
    ? project.blocks
    : [project.blocks[0], { heading: "A System Built to Last.", body: project.overview, image: project.image }];

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-vinus-paper text-vinus-ink selection:bg-vinus-ink selection:text-vinus-paper">
      <section ref={heroRef} data-header-theme="dark" className="relative h-[520px] w-full overflow-hidden bg-vinus-ink md:h-auto md:aspect-video">
        <motion.div className="absolute inset-0 scale-[1.12] will-change-transform" style={{ y: reduceMotion ? 0 : heroImageY }}>
          <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: reduceMotion ? 0 : heroTextY, opacity: reduceMotion ? 1 : heroOpacity }}
          transition={{ duration: reduceMotion ? 0.01 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-1 flex flex-col items-start gap-2 px-[var(--space-edge)] text-white md:bottom-0 md:gap-3 md:pb-[var(--space-section)]"
        >
          <p className="type-label font-medium text-white/70">{project.category}</p>
          <h1 className="type-project-title max-w-full font-normal md:max-w-[1680px]">
            <span className="md:hidden">{project.title}</span>
            {slug === "the-frame-artstore-catalogue" ? (
              <span className="hidden md:block"><span className="block">The Frame</span><span className="block">Artstore Catalogue</span></span>
            ) : (
              <span className="hidden md:block">{project.title}</span>
            )}
          </h1>
        </motion.div>
      </section>


      <section className="flex h-[644px] w-full flex-col gap-12 border-b border-vinus-ink/10 px-[var(--space-edge)] pt-16 pb-24 md:h-auto md:py-24 min-[2200px]:!h-[325px]">
        <Link href="/work" className="type-body group inline-flex items-center gap-3 font-medium text-vinus-ink transition-opacity hover:opacity-60 md:type-label md:text-vinus-ink/45"><ArrowLeft className="size-3.5 transition-transform duration-200 motion-safe:group-hover:-translate-x-1" /><span>목록으로 돌아가기</span></Link>
        <ProjectMetaGrid
          items={[
            ["Client", project.client],
            ["Period", project.period],
            ["Category", project.category],
            ["Subtitle", project.subtitle],
          ].map(([label, value]) => ({ label, value }))}
        />
        <div className="flex flex-col gap-4 md:hidden">
          <span className="type-label font-medium text-vinus-ink">Overview</span>
          <p className="type-body font-normal text-vinus-ink/65">{project.overview}</p>
        </div>
      </section>

      <section className="hidden w-full grid-cols-1 gap-6 border-b border-vinus-ink/10 px-[var(--space-edge)] py-16 md:grid md:grid-cols-[584px_840px] md:gap-8 md:py-24 min-[2200px]:h-[264px]">
        <span className="type-label font-medium text-vinus-ink/45">Overview</span>
        <p className="type-body font-normal text-vinus-ink">{project.overview}</p>
      </section>

      <section className="flex h-[1348px] w-full flex-col gap-24 overflow-hidden px-[var(--space-edge)] pb-24 md:h-auto md:gap-[var(--space-major)] md:overflow-visible md:py-[var(--space-section)] min-[2200px]:!h-[2358px] min-[2200px]:overflow-hidden">
        {contentBlocks.map((block, index) => (
          <ProjectContentBlock
            key={block.heading}
            heading={block.heading}
            body={block.body}
            image={block.image ?? project.image}
            index={index}
          />
        ))}
      </section>

      <NextProjectLink href={`/work/${nextSlug}`} title={nextProject.title} />

      <Footer />
    </main>
  );
}
