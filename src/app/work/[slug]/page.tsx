"use client";

import { use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    blocks: [{ heading: "Dashboard Experience", body: "The challenge was to present complex work-status data clearly. We designed modular dashboards and direct project tracking patterns for everyday use." }],
  },
  "macadamia-website": {
    title: "macadamia", subtitle: "Product Strategy & UX/UI Design", category: "Web", image: "/vinus/dummy-photo/work-04.jpg", client: "Macadamia Labs", period: "2022.09",
    overview: "A focused product experience that presents design principles and creative strategies through clear space, strong typography, and fluid interaction.",
    blocks: [{ heading: "Interaction & Motion Design", body: "Subtle page transitions and scroll-responsive elements give the experience rhythm while preserving fast, direct access to every piece of information." }],
  },
  "budongsan114-mediate-bizsolution": {
    title: "Budongsan114 Mediate BIZsolution", subtitle: "Mediate BIZsolution for real estate brokers", category: "Web", image: "/vinus/project/budongsan-hero.png", client: "Budongsan 114", period: "2022.05",
    overview: "A B2B work solution for real estate brokers, designed to bring listing management, client response, and market analysis into one integrated platform.\nVINUSPREAD led the full UI design for the business solution, shaping complex real estate data into a practical workspace for daily operations.",
    blocks: [
      { heading: "Optimizing B2B Systems", body: "A B2B product is defined by the work it supports. We reorganized dense property information into focused dashboards and modular workspaces that reduce errors and make intensive daily tasks easier to scan.", image: "/vinus/project/budongsan-dashboard.png" },
      { heading: "A platform for brokers", body: "Clear navigation, consistent controls, and a practical information hierarchy help agents move between listings, customer work, and business tools without losing context.", image: "/vinus/project/budongsan-architecture.png" },
      { heading: "A connected digital ecosystem", body: "The final system connects public-facing services and professional tools through one visual language, creating a platform that can continue to grow with the business.", image: "/vinus/project/budongsan-websites.png" },
    ],
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
      { heading: "A Museum Monograph on Digital Screens.", body: "The catalogue needed to be more than a product guide. It had to open the world of The Frame with the pace of a curated art book. We organized the historical flow of Art Store works from ancient to modern art, balancing product clarity with the weight of art history." },
    ],
  },
};

const projectSlugs = Object.keys(portfolioData);
const budongsanDetailCopy = "Budongsan114 has long operated as a data driven real estate platform. Mediate BIZsolution extends that platform into the broker’s daily workflow, combining listing management, client management, market analysis, and operational tools in one place.\nThe goal was not to create another information website. It was to design a working desk for real estate professionals, where data, action, and decision making could happen in a clear sequence.";

function BudongsanDetailContent() {
  return (
    <>
      <article className="budongsan-content-block budongsan-content-block--first">
        <div className="budongsan-content-copy">
          <h2>A platform for brokers</h2>
          <p>{budongsanDetailCopy}</p>
        </div>
        <div className="budongsan-content-media budongsan-content-media--dashboard-first">
          <Image src="/vinus/project/budongsan-dashboard.png" alt="Budongsan114 broker dashboard overview" fill sizes="100vw" loading="eager" unoptimized />
        </div>
        <div className="budongsan-content-media budongsan-content-media--dashboard-second">
          <Image src="/vinus/project/budongsan-dashboard.png" alt="Budongsan114 listing management dashboard" fill sizes="100vw" loading="eager" unoptimized />
        </div>
      </article>

      <article className="budongsan-content-block budongsan-content-block--second">
        <div className="budongsan-content-copy">
          <h2>A platform for brokers</h2>
          <p>{budongsanDetailCopy}</p>
        </div>
        <div className="budongsan-content-media budongsan-content-media--architecture">
          <Image src="/vinus/project/budongsan-architecture.png" alt="Architecture representing a durable digital foundation" fill sizes="100vw" loading="eager" unoptimized />
        </div>
        <div className="budongsan-content-media budongsan-content-media--websites">
          <Image src="/vinus/project/budongsan-websites.png" alt="Budongsan114 connected website experiences" fill sizes="100vw" loading="eager" unoptimized />
        </div>
      </article>
    </>
  );
}

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const reduceMotion = true;
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
        <h1 className="heading-md font-normal">Project Not Found</h1>
        <Link href="/work" className="body-md mt-8 inline-flex items-center gap-[var(--space-inline)] text-vinus-ink/60"><ArrowLeft className="size-4" />Back to Experience</Link>
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
      <section ref={heroRef} data-header-theme="dark" className="project-detail-hero relative h-[480px] w-full overflow-hidden bg-vinus-ink md:aspect-video md:h-auto">
        <motion.div className="absolute inset-0 scale-[1.12] will-change-transform" style={{ y: reduceMotion ? 0 : heroImageY }}>
          <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="project-detail-overlay absolute inset-0" />
        <Link href="/work" className="project-detail-back absolute z-10 inline-flex items-center gap-3 text-white">
          <ArrowLeft aria-hidden="true" className="size-5 stroke-[1.25]" />
          <span>Back to Experience</span>
        </Link>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: reduceMotion ? 0 : heroTextY, opacity: reduceMotion ? 1 : heroOpacity }}
          transition={{ duration: reduceMotion ? 0.01 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-start gap-3 px-[var(--space-edge)] text-white sm:bottom-14 md:bottom-0 md:gap-3 md:pb-[var(--space-section)]"
        >
          <p className="label-sm font-medium text-white/70">{project.category}</p>
          <h1
            aria-label={project.title}
            className="display-project-title max-w-full font-normal md:max-w-[1680px]"
          >
            {slug !== "budongsan114-mediate-bizsolution" && (
              <span aria-hidden="true" className="md:hidden">{project.title}</span>
            )}
            {slug === "budongsan114-mediate-bizsolution" ? (
              <span aria-hidden="true"><span className="block">Budongsan114</span><span className="block">Mediate Bizsolution</span></span>
            ) : slug === "the-frame-artstore-catalogue" ? (
              <span aria-hidden="true" className="hidden md:block"><span className="block">The Frame</span><span className="block">Artstore Catalogue</span></span>
            ) : (
              <span aria-hidden="true" className="hidden md:block">{project.title}</span>
            )}
          </h1>
        </motion.div>
      </section>


      <section className="project-detail-meta flex w-full flex-col justify-center overflow-visible border-b border-vinus-ink/10 px-[var(--space-edge)] py-0 md:py-20 min-[2200px]:py-24">
        <ProjectMetaGrid
          items={[
            ["Client", project.client],
            ["Period", project.period],
            ["Category", project.category],
            ["Subtitle", project.subtitle],
          ].map(([label, value]) => ({ label, value }))}
        />
      </section>

      <section className="project-detail-overview w-full overflow-visible border-b border-vinus-ink/10">
        <div className="project-detail-overview-inner">
          <span className="label-sm font-medium text-vinus-ink/45">Overview</span>
          <p className="body-md whitespace-pre-line font-normal text-vinus-ink">{project.overview}</p>
        </div>
      </section>

      <section className={`project-detail-content flex w-full flex-col overflow-visible ${slug === "budongsan114-mediate-bizsolution" ? "budongsan-detail-content" : "justify-between gap-16 px-[var(--space-edge)] py-16 md:gap-[var(--space-major)] md:py-[var(--space-section)] min-[2200px]:gap-[192px] min-[2200px]:py-[128px]"}`}>
        {slug === "budongsan114-mediate-bizsolution" ? (
          <BudongsanDetailContent />
        ) : (
          contentBlocks.map((block, index) => (
            <ProjectContentBlock
              key={block.heading}
              heading={block.heading}
              body={block.body}
              image={block.image ?? project.image}
              index={index}
            />
          ))
        )}
      </section>

      <NextProjectLink href={`/work/${nextSlug}`} title={nextProject.title} />

      <Footer />
    </main>
  );
}
