"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { ProjectMetaGrid } from "@/components/project/ProjectMetaGrid";
import { ProjectContentBlock } from "@/components/project/ProjectContentBlock";
import { NextProjectLink } from "@/components/project/NextProjectLink";

type PortfolioProject = {
  title: string;
  subtitle: string;
  category: string;
  image: string;
  client: string;
  period: string;
  overview: string;
  blocks: Array<{ heading: string; body: string; image?: string }>;
};

const portfolioData: Record<string, PortfolioProject> = {
  mongdang: {
    title: "Mongdang", subtitle: "Brand Experience & Storytelling", category: "Character", image: "/vinus/dummy-photo/work-01.jpg", client: "Mongdang Studio", period: "2023.08",
    overview: "Mongdang is a storytelling-driven character brand project. We developed an endearing visual language and character system that helps brand narratives connect emotionally with children and parents alike.",
    blocks: [{ heading: "Character System & Visual Identity", body: "Characters are not just drawings. They are vessels for brand messages. We focused on warm, organic shapes and approachable colors that work consistently across physical and digital media." }],
  },
  "shinhan-easy": {
    title: "Shinhan Easy", subtitle: "Digital Experience & Mobile Web", category: "Web", image: "/vinus/dummy-photo/work-02.jpg", client: "Shinhan Financial Group", period: "2023.02",
    overview: "A simplified and intuitive digital financial portal tailored for the modern mobile user. We prioritized speed, clarity, and direct paths to action.",
    blocks: [{ heading: "UX/UI Design System Integration", body: "Designed to minimize cognitive load, Shinhan Easy streamlines complex banking procedures into clear steps. We established a unified mobile grid and a concise typographic hierarchy." }],
  },
  "crowdsourcing-platform-crowd-oh": {
    title: "Crowd OH!", subtitle: "Crowdsourcing Platform Design", category: "Web", image: "/vinus/dummy-photo/work-03.jpg", client: "Crowd OH Corp", period: "2022.11",
    overview: "A next-generation crowdsourcing platform that connects creators and businesses. Clear controls and expressive interactions keep contributors engaged throughout each project.",
    blocks: [{ heading: "Dashboard Experience", body: "The core challenge was presenting substantial work-status data without visual overload. We developed modular dashboards and direct project tracking patterns for everyday use." }],
  },
  "macadamia-website": {
    title: "macadamia", subtitle: "Product Strategy & UX/UI Design", category: "Web", image: "/vinus/dummy-photo/work-04.jpg", client: "Macadamia Labs", period: "2022.09",
    overview: "A focused product experience that presents design principles and creative strategies through clear space, strong typography, and fluid interaction.",
    blocks: [{ heading: "Interaction & Motion Design", body: "Subtle page transitions and scroll-responsive elements give the experience rhythm while preserving fast, direct access to every piece of information." }],
  },
  "budongsan114-mediate-bizsolution": {
    title: "Budongsan114 Mediate BIZsolution", subtitle: "Enterprise B2B Product Strategy", category: "Web", image: "/vinus/dummy-photo/work-05.jpg", client: "Budongsan 114", period: "2022.07",
    overview: "A comprehensive enterprise platform that streamlines property management and agent communication, translating a complex legacy system into a clear business tool.",
    blocks: [{ heading: "Optimizing B2B Systems", body: "We reorganized information into dedicated control grids and modular workspaces that support intensive daily use while reducing errors and workflow delays." }],
  },
  "donga-on-book": {
    title: "Donga On book", subtitle: "Branding & Digital Platform", category: "Web", image: "/vinus/dummy-photo/work-06.jpg", client: "Donga Publishing", period: "2022.06",
    overview: "A traditional publishing experience transformed into an interactive digital learning ecosystem, connecting educators and learners through intuitive tools.",
    blocks: [{ heading: "Digital Learning Ecosystem", body: "A modular content grid supports text, worksheets, video, and interactive assets across devices while keeping the learning path consistent for students." }],
  },
  "aliot-brand-identity": {
    title: "Aliot Brand Identity", subtitle: "Corporate Visual Direction & Identity", category: "Web", image: "/vinus/dummy-photo/work-07.jpg", client: "Aliot Technology", period: "2022.05",
    overview: "A clean and flexible identity system for a technology company, designed to maintain visual clarity across product interfaces, communication, and print.",
    blocks: [{ heading: "Visual Identity System", body: "We created a flexible brand system with geometric details, a focused primary color, and a concise hierarchy suited to both digital interfaces and print." }],
  },
  "the-frame-artstore-catalogue": {
    title: "The Frame Artstore Catalogue", subtitle: "Editorial Design & Branding System", category: "Web", image: "/vinus/dummy-photo/work-08.jpg", client: "Samsung Electronics", period: "2022.04",
    overview: "A design project organizing the artworks of Samsung Electronics' lifestyle TV 'The Frame' digital content platform 'Art Store'. Although a digital publication, we captured the tangible weight of a physical catalogue and the pacing of a gallery book, perfectly translating the product's premium texture.",
    blocks: [
      { heading: "A Catalogue for Art, Not Television.", body: "The Frame is not just a TV. It is a screen when active, and an art piece when off — a lifestyle TV that hangs like a picture frame on the wall. The Frame showcases over 5,000 digital artworks, including masterpieces from MoMA, The Met, and Musée d'Orsay. Our task was to introduce these pieces to users. Rather than a standard electronics manual, it needed to feel like a curated museum catalog." },
      { heading: "A Museum Monograph on Digital Screens.", body: "The catalogue had to transcend a simple product guide and serve as the threshold to the world of The Frame. We organized the historical flow of Art Store works from ancient to modern art, ensuring that the product's technical details flowed in harmony with the art-historical weight. Our ultimate goal was to marry the reverence of an art monograph with the absolute clarity of an electronics catalogue within a digital format." },
    ],
  },
};

const projectSlugs = Object.keys(portfolioData);

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const reduceMotion = useReducedMotion();
  const { slug } = use(params);
  const project = portfolioData[slug];

  if (!project) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-vinus-paper px-6 text-center text-vinus-ink">
        <h1 className="type-heading font-normal">Project Not Found</h1>
        <Link href="/work" className="type-body mt-8 inline-flex items-center gap-[var(--space-inline)] text-vinus-ink/60"><ArrowLeft className="size-4" />Back to Experience</Link>
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
      <section data-header-theme="dark" className="relative h-[520px] w-full overflow-hidden bg-vinus-ink md:h-auto md:aspect-video">
        <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25" />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
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
        <Link href="/work" className="type-body group inline-flex items-center gap-3 font-medium text-vinus-ink transition-opacity hover:opacity-60 md:type-label md:text-vinus-ink/45"><ArrowLeft className="size-3.5 transition-transform duration-200 motion-safe:group-hover:-translate-x-1" /><span className="md:hidden">Back to Experience</span><span className="hidden md:inline">Back to Work</span></Link>
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
