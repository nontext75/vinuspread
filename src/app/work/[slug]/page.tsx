"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

// Portfolio Database
const portfolioData: Record<string, {
  title: string;
  subtitle: string;
  category: string;
  image: string;
  client: string;
  period: string;
  overview: string;
  blocks: Array<{
    heading: string;
    body: string;
    image?: string;
  }>;
}> = {
  "mongdang": {
    title: "Mongdang",
    subtitle: "Brand Experience & Storytelling",
    category: "Character",
    image: "/vinus/work/mongdang.png",
    client: "Mongdang Studio",
    period: "2023.08",
    overview: "Mongdang is a storytelling-driven character brand project. We developed an endearing visual language and character systems that help brand narratives connect emotionally with children and parents alike.",
    blocks: [
      {
        heading: "Character System & Visual Identity",
        body: "Characters are not just drawings; they are vessels for brand messages. We focused on creating warm, organic shapes and approachable color schemes that resonate with audiences across physical and digital mediums.",
      }
    ]
  },
  "shinhan-easy": {
    title: "Shinhan Easy",
    subtitle: "Digital Experience & Mobile Web",
    category: "Web",
    image: "/vinus/work/shinhan-easy.jpg",
    client: "Shinhan Financial Group",
    period: "2023.02",
    overview: "A simplified and intuitive digital financial portal experience tailored for the modern mobile user. We prioritized speed, clarity, and direct path-to-action flows.",
    blocks: [
      {
        heading: "UX/UI Design System Integration",
        body: "Designed to minimize cognitive load, Shinhan Easy streamlines complex banking procedures into simple steps. We established a unified mobile grid system and clean typographic scales.",
      }
    ]
  },
  "crowdsourcing-platform-crowd-oh": {
    title: "Crowd OH!",
    subtitle: "Crowdsourcing Platform Design",
    category: "Web",
    image: "/vinus/work/crowd-oh.jpg",
    client: "Crowd OH Corp",
    period: "2022.11",
    overview: "Designing a next-generation crowdsourcing platform that connects creators and businesses. The interface leverages clean dashboard controls and rich interactive elements to keep contributors engaged.",
    blocks: [
      {
        heading: "Dashboard Experience",
        body: "The core challenge was to display massive amounts of work status data in an easily digestible layout. We developed high-performance grid dashboards and interactive project trackers.",
      }
    ]
  },
  "macadamia-website": {
    title: "macadamia",
    subtitle: "Product Strategy & UX/UI Design",
    category: "Web",
    image: "/vinus/work/macadamia.png",
    client: "Macadamia Labs",
    period: "2022.09",
    overview: "A premium product landing experience that highlights design principles and creative strategies. We combined clean layout spaces with fluid motion curves.",
    blocks: [
      {
        heading: "Interaction & Motion Design",
        body: "Leveraging modern web animation techniques, we designed subtle page transitions and scroll-driven interactive elements to build a premium, memorable landing experience.",
      }
    ]
  },
  "budongsan114-mediate-bizsolution": {
    title: "Budongsan114 Mediate BIZsolution",
    subtitle: "Enterprise B2B Product Strategy",
    category: "Web",
    image: "/vinus/work/budongsan114.jpg",
    client: "Budongsan 114",
    period: "2022.07",
    overview: "A comprehensive enterprise business platform that streamlines property management and agent communications, translating complex legacy systems into a clean SaaS format.",
    blocks: [
      {
        heading: "Optimizing B2B SaaS Systems",
        body: "We reorganized information structures into dedicated control grids, creating modular layouts that accommodate heavy daily user activity while reducing errors and workflow delays.",
      }
    ]
  },
  "donga-on-book": {
    title: "Donga On book",
    subtitle: "Branding & Digital Platform",
    category: "Web",
    image: "/vinus/work/donga-on-book.jpg",
    client: "Donga Publishing",
    period: "2022.06",
    overview: "Modernizing the traditional publishing experience into an interactive digital learning ecosystem, connecting educators and learners through intuitive tools.",
    blocks: [
      {
        heading: "Digital Learning Ecosystem",
        body: "We designed a modular content grid that supports text, interactive worksheets, and video assets seamlessly across devices, ensuring consistent user paths for students.",
      }
    ]
  },
  "aliot-brand-identity": {
    title: "Aliot Brand Identity",
    subtitle: "Corporate Visual Direction & Identity",
    category: "Web",
    image: "/vinus/work/aliot-brand-identity.jpg",
    client: "Aliot Technology",
    period: "2022.05",
    overview: "A clean, modern brand identity package and website for a tech startup, reflecting their focus on lightweight, high-performance visual solutions.",
    blocks: [
      {
        heading: "Visual Identity System",
        body: "We created a flexible brand system featuring sleek geometric details, a vibrant tech-blue primary accent, and clean layout hierarchies suitable for digital interfaces and print.",
      }
    ]
  },
  "the-frame-artstore-catalogue": {
    title: "The Frame Artstore Catalogue",
    subtitle: "Editorial Design & Branding System",
    category: "Web",
    image: "/vinus/work/the-frame-artstore.jpg",
    client: "Samsung Electronics",
    period: "2022.04",
    overview: "A design project organizing the artworks of Samsung Electronics' lifestyle TV 'The Frame' digital content platform 'Art Store'. Although a digital publication, we captured the tangible weight of a physical catalogue and the pacing of a gallery book, perfectly translating the product's premium texture.",
    blocks: [
      {
        heading: "A Catalogue for Art, Not Television.",
        body: "The Frame is not just a TV. It is a screen when active, and an art piece when off — a lifestyle TV that hangs like a picture frame on the wall. The Frame showcases over 5,000 digital artworks, including masterpieces from MoMA, The Met, and Musée d'Orsay.\n\nOur task was to introduce these pieces to users. Rather than a standard electronics manual, it needed to feel like a curated museum catalog.",
      },
      {
        heading: "A Museum Monograph on Digital Screens.",
        body: "The catalogue had to transcend a simple product guide and serve as the threshold to the world of The Frame. We organized the historical flow of Art Store works from ancient to modern art, ensuring that the product's technical details flowed in harmony with the art-historical weight. Our ultimate goal was to marry the reverence of an art monograph with the absolute clarity of an electronics catalogue within a digital format.",
      }
    ]
  }
};

// Next project mapping utility
const projectSlugs = Object.keys(portfolioData);

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const currentSlug = resolvedParams.slug;
  const project = portfolioData[currentSlug];

  if (!project) {
    return (
      <main className="min-h-screen bg-[#faf9f6] text-[#0d0d0d] flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl font-light">Project Not Found</h1>
        <Link href="/work" className="mt-8 inline-flex items-center gap-2 text-sm text-[#0d0d0d]/60 hover:text-black">
          <ArrowLeft className="size-4" /> Back to Work
        </Link>
      </main>
    );
  }

  // Find next project
  const currentIndex = projectSlugs.indexOf(currentSlug);
  const nextIndex = (currentIndex + 1) % projectSlugs.length;
  const nextSlug = projectSlugs[nextIndex];
  const nextProject = portfolioData[nextSlug];

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0d0d0d] font-sans selection:bg-[#0d0d0d] selection:text-[#faf9f6]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="hero-background object-cover contrast-105 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25" />
        </div>
        
        {/* Headline Overlay */}
        <div className="absolute bottom-0 left-0 p-6 pb-24 md:p-16 md:pb-28 z-10 w-full text-white">
          <p className="text-xs md:text-sm uppercase tracking-widest text-white/70 font-medium mb-3">
            {project.category}
          </p>
          <h1 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[0.9] tracking-tight uppercase max-w-[1000px]">
            {project.title}
          </h1>
        </div>
      </section>

      {/* 2. METADATA SECTION */}
      <section className="w-full px-6 py-12 md:px-16 md:py-20">
        {/* Back Button positioned at the top of content */}
        <div className="mb-12">
          <Link href="/work" className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#0d0d0d]/45 hover:text-black transition-colors font-medium">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Work
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#0d0d0d]/10 pb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/40 font-medium">Client</span>
            <p className="text-base md:text-lg font-normal mt-2 text-[#0d0d0d]/80">{project.client}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/40 font-medium">Period</span>
            <p className="text-base md:text-lg font-normal mt-2 text-[#0d0d0d]/80">{project.period}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/40 font-medium">Category</span>
            <p className="text-base md:text-lg font-normal mt-2 text-[#0d0d0d]/80 uppercase">{project.category}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/40 font-medium">Subtitle</span>
            <p className="text-base md:text-lg font-normal mt-2 text-[#0d0d0d]/80">{project.subtitle}</p>
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW SECTION */}
      <section className="w-full px-6 py-12 md:px-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#0d0d0d]/10">
        <div className="md:col-span-3">
          <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/40 font-medium">Overview</span>
        </div>
        <div className="md:col-span-9 max-w-[840px]">
          <p className="text-[var(--type-body-lg)] font-normal leading-[1.5] text-[#0d0d0d]/70">
            {project.overview}
          </p>
        </div>
      </section>

      {/* 4. CONTENT BLOCKS SECTION */}
      <section className="w-full px-6 py-16 md:px-16 md:py-24 flex flex-col gap-24 md:gap-36">
        {project.blocks.map((block, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-36">
              <h2 className="text-[clamp(1.5rem,2.8vw,2.5rem)] font-normal leading-[1.1] text-[#0d0d0d]">
                {block.heading}
              </h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-[#0d0d0d]/65 font-light whitespace-pre-line">
                {block.body}
              </p>
            </div>
            <div className="lg:col-span-8 relative aspect-[16/10] w-full overflow-hidden bg-[#eae8e4] rounded-[0.25rem]">
              <Image
                src={project.image}
                alt={block.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-102"
              />
            </div>
          </div>
        ))}
      </section>

      {/* 5. NEXT PROJECT FOOTER */}
      <section className="w-full px-6 py-16 md:px-16 md:py-24 border-t border-[#0d0d0d]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/40 font-medium">Next Project</span>
        </div>
        <Link href={`/work/${nextSlug}`} className="group inline-flex items-center gap-6 w-full md:w-auto">
          <span className="text-3xl md:text-5xl tracking-tight uppercase group-hover:opacity-60 transition-opacity leading-none text-[#0d0d0d] font-normal">
            {nextProject.title}
          </span>
          <div className="size-12 rounded-full border border-[#0d0d0d]/10 flex items-center justify-center group-hover:bg-[#0d0d0d] group-hover:border-black transition-colors duration-300">
            <ArrowRight className="size-5 text-[#0d0d0d] group-hover:text-white transition-colors duration-300" />
          </div>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
