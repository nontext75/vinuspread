"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ClientLogoGrid } from "@/components/ClientLogoGrid";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PortfolioCard } from "@/components/PortfolioCard";
import { ServiceCard } from "@/components/ServiceCard";
import { StoryListItem } from "@/components/StoryListItem";
import { stories as storyEntries } from "@/lib/stories";
import { useHomeMotion } from "./home-motion";

type Project = {
  title: string;
  subtitle: string;
  category: string;
  src: string;
  slug: string;
  layout: string;
  mobileLayout: string;
  speed: number;
  mobileOnly?: boolean;
};

const projects: Project[] = [
  {
    title: "Mongdang",
    subtitle: "Brand Experience & Storytelling",
    category: "Character",
    src: "/vinus/dummy-photo/work-01.jpg",
    slug: "mongdang",
    layout: "home-project--mongdang",
    mobileLayout: "w-full",
    speed: -8,
  },
  {
    title: "Shinhan Easy",
    subtitle: "Digital Experience & Mobile Web",
    category: "Web",
    src: "/vinus/dummy-photo/work-02.jpg",
    slug: "shinhan-easy",
    layout: "home-project--shinhan",
    mobileLayout: "ml-[14%] w-[86%]",
    speed: 10,
  },
  {
    title: "Crowd OH!",
    subtitle: "Crowdsourcing Platform Design",
    category: "Web",
    src: "/vinus/dummy-photo/work-03.jpg",
    slug: "crowdsourcing-platform-crowd-oh",
    layout: "home-project--crowd",
    mobileLayout: "w-[92%]",
    speed: -7,
  },
  {
    title: "macadamia",
    subtitle: "Product Strategy & UX/UI Design",
    category: "Web",
    src: "/vinus/dummy-photo/work-04.jpg",
    slug: "macadamia-website",
    layout: "home-project--macadamia",
    mobileLayout: "ml-[8%] w-[92%]",
    speed: 8,
  },
  {
    title: "Budongsan114 Mediate BIZsolution",
    subtitle: "Product Strategy · UX/UI · Web",
    category: "Web",
    src: "/vinus/dummy-photo/work-05.jpg",
    slug: "budongsan114-mediate-bizsolution",
    layout: "home-project--budongsan",
    mobileLayout: "ml-[20%] w-[80%]",
    speed: -10,
  },
  {
    title: "DongA On book",
    subtitle: "Branding · Digital Design · Web",
    category: "Web",
    src: "/vinus/dummy-photo/work-06.jpg",
    slug: "donga-on-book",
    layout: "home-project--donga",
    mobileLayout: "ml-[7%] w-[93%]",
    speed: 7,
  },
];

const services = [
  { title: "Product Strategy", details: ["Discovery", "Roadmap", "AI Opportunity"] },
  { title: "Experience Design", details: ["UX/UI", "Web", "App", "Interaction"] },
  { title: "Brand Systems", details: ["Identity", "Visual Direction", "Content"] },
  { title: "Launch & Operation", details: ["CMS", "SEO", "Analytics", "Improvement"] },
];

const homeStoryContent = [
  {
    title: "Why You Shouldn't Choose Brand Colors by Instinct",
    excerpt:
      "Color is not just a matter of taste; it determines the perception and emotions of your brand. Even a small change can affect the entire way people perceive your brand.",
  },
  {
    title: "What Happens When You Don't Have Design Principles",
    excerpt:
      "Without clear principles, design sways with every piece of feedback and personal preference. Consistent standards keep all decisions moving in one direction.",
  },
  {
    title: "UX Writing: How to Start with a Single Button",
    excerpt:
      "We design starting from the shortest sentences users encounter most frequently. Even the wording of a single button shapes the direction of the experience and the next action.",
  },
] as const;

const stories = storyEntries.slice(0, 3).map((story, index) => ({
  title: homeStoryContent[index]?.title ?? story.title,
  excerpt: homeStoryContent[index]?.excerpt ?? story.excerpt,
  date: story.date,
  image: story.image,
  href: `/news/${story.slug}`,
}));

function ProjectCard({ project }: { project: Project }) {
  const isWideCard = project.layout === "home-project--mongdang" || project.layout === "home-project--macadamia";

  return (
    <PortfolioCard
      image={project.src}
      imageAlt={project.title}
      title={project.title}
      subtitle={project.subtitle}
      category={project.category}
      href={`/work/${project.slug}`}
      size="feature"
      mediaRatio={isWideCard ? "wide" : "landscape"}
      layoutClassName={`home-project ${project.layout} ${project.mobileLayout} ${project.mobileOnly ? "home-project--mobile-only" : ""}`}
      imageSizes="(max-width: 767px) 92vw, (max-width: 2199px) 50vw, 1368px"
    />
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLElement>(null);
  const playReelTriggerRef = useRef<HTMLButtonElement>(null);
  const playReelDialogRef = useRef<HTMLDivElement>(null);
  const playReelCloseRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayReelPresent, setIsPlayReelPresent] = useState(false);
  const { scrollYProgress: reelProgress } = useScroll({
    target: reelRef,
    offset: ["start end", "end start"],
  });
  const reelImageY = useTransform(reelProgress, [0, 1], ["-12%", "12%"]);
  const reelImageScale = useTransform(reelProgress, [0, 0.5, 1], [1.14, 1.04, 1.1]);
  const projectSpeeds = useMemo(() => projects.map((project) => project.speed), []);

  useEffect(() => {
    if (!isPlayReelPresent) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const reelTrigger = playReelTriggerRef.current;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const focusFrame = requestAnimationFrame(() => playReelCloseRef.current?.focus({ preventScroll: true }));

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsPlaying(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        playReelDialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;

      const focusTarget = previousFocus && document.contains(previousFocus) ? previousFocus : reelTrigger;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [isPlayReelPresent]);

  useHomeMotion({
    rootRef,
    heroRef,
    reduceMotion: Boolean(reduceMotion),
    projectSpeeds,
  });

  return (
    <div ref={rootRef} className="home-page relative bg-white text-vinus-ink">
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="home-hero relative overflow-hidden bg-vinus-ink text-white"
      >
        <div className="absolute inset-0">
          <Image
            src="/vinus/dummy-photo/hero-figma.jpg"
            alt="Modern residential architecture"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover will-change-transform"
            data-hero-image
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
        </div>

        <div className="home-hero-content relative flex flex-col items-start gap-[var(--space-section)]">
          <div className="flex w-full flex-col items-start gap-[var(--space-section)]">
            <p
              data-hero-reveal
              className="home-hero-lead body-xl w-full max-w-[860px] text-white"
            >
              We work with brands from the first idea
              <br />
              to the last detail, shaping direction, experience, and improvement together.
            </p>

            <span data-hero-reveal aria-hidden="true" className="block h-2 w-[120px] bg-white" />

            <h1 className="home-hero-title display-hero font-normal">
              <span data-hero-reveal className="block">We design</span>
              <span data-hero-reveal className="block">sustainable</span>
              <span data-hero-reveal className="block">growth</span>
            </h1>
          </div>

          <p data-hero-reveal className="body-xl max-w-[1500px] font-normal text-white/70 min-[2200px]:w-[1500px]">
            From first idea to final detail, we work with you to find direction,
            <br />
            build better experiences, and keep improving what comes next.
          </p>

          <div data-hero-reveal>
            <ArrowLink href="/contact" inverse>Download Brochure</ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-intro relative bg-white">
        <div className="home-intro-content flex flex-col items-start gap-12 md:gap-16">
          <p className="home-intro-copy heading-intro font-medium">
            <span data-intro-line className="md:hidden">We focus on essential value and elevate it with beauty. As times continue to change, we stay grounded in what lasts. We create design that helps ideas move beyond their limits.</span>
            <span className="hidden md:block">
              <span data-intro-line className="block">We focus on essential value and</span>
              <span data-intro-line className="block">elevate it with beauty.</span>
              <span data-intro-line className="block">As times continue to change,</span>
              <span data-intro-line className="block">we stay grounded in what lasts.</span>
              <span data-intro-line className="block">We create design that helps ideas</span>
              <span data-intro-line className="block">move beyond their limits.</span>
            </span>
          </p>
          <div data-intro-link>
            <ArrowLink href="/studio">The Studio</ArrowLink>
          </div>
        </div>
      </section>

      <section id="work" className="home-portfolio relative bg-white">
        <div className="home-portfolio-heading">
          <div className="home-portfolio-title-block flex max-w-[1680px] flex-col items-start gap-[var(--space-content)]">
            <h2 className="home-portfolio-title display-giant font-normal" aria-label="Experience">
              <span className="home-portfolio-title-line block">Experience</span>
            </h2>
            <p className="home-portfolio-copy body-xl">
              <span className="home-portfolio-copy-line block">Selected work shaped through strategy, interface design,</span>
              <span className="home-portfolio-copy-line block">and brand systems built to keep improving.</span>
            </p>
          </div>
          <div className="home-portfolio-cta" data-reveal>
            <ArrowLink href="/work">Browse all work</ArrowLink>
          </div>
          <div className="home-portfolio-divider" aria-hidden="true" />
        </div>

        <div className="home-portfolio-canvas home-portfolio-canvas--mobile">
          {projects.map((project) => <ProjectCard key={`mobile-${project.title}`} project={project} />)}
        </div>

        <div className="home-portfolio-canvas home-portfolio-canvas--desktop">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>

      </section>

      <section ref={reelRef} data-header-theme="dark" className="home-reel relative overflow-hidden bg-vinus-black text-white">
        <motion.div
          className="absolute inset-0"
          data-reel-image
          style={{ y: reduceMotion ? 0 : reelImageY, scale: reduceMotion ? 1 : reelImageScale }}
        >
          <Image
            src="/vinus/dummy-photo/hero.jpg"
            alt="Vinuspread playreel"
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-vinus-black/25" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            ref={playReelTriggerRef}
            type="button"
            aria-label="Play Vinuspread reel"
            aria-expanded={isPlayReelPresent}
            aria-controls="playreel-dialog"
            onClick={() => {
              setIsPlayReelPresent(true);
              setIsPlaying(true);
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="playreel-button flex items-center justify-center rounded-full border border-white/16 bg-white/55 text-white"
          >
            <Image src="/vinus/icons/playreel-play.svg" alt="" width={36} height={36} aria-hidden="true" />
          </motion.button>
        </div>
      </section>

      <section id="studio" className="home-studio flex items-center justify-center bg-white px-6 md:px-16">
        <div className="home-studio-content flex w-full max-w-[1500px] flex-col items-start gap-16 text-left md:gap-20 xl:gap-24">
          <div className="home-studio-heading-block flex w-full flex-col items-start gap-[var(--space-major)] md:gap-12">
            <h2 data-reveal className="home-studio-title display-section font-normal">How we work</h2>

            <div className="home-studio-intro grid w-full gap-[var(--space-studio-intro)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <p data-reveal className="home-studio-lead heading-lead w-full font-medium">
                Always there, from first<br className="hidden md:block" /> idea to final detail.
              </p>
              <p data-reveal className="home-studio-body body-lg w-full">
                Vinuspread works with teams from early direction to launch and beyond. We use AI as a working method to plan, design, and improve experiences with over 20 years of practice in UI/UX, branding, and product design.
              </p>
            </div>
          </div>

          <div
            data-service-grid
            className="grid w-full max-w-[1320px] grid-cols-1 border-y border-vinus-ink/10 py-[var(--space-edge)] text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-12"
          >
            {services.map((service, index) => {
              return (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  details={service.details}
                  variant="icon"
                  icon={<Image src="/vinus/icons/service-card.svg" alt="" width={28} height={28} aria-hidden="true" />}
                  mode="homeProcess"
                  className={`home-service-card border-vinus-ink/10 ${
                    index < services.length - 1 ? "lg:border-r" : ""
                  } max-lg:border-b max-lg:last:border-b-0 sm:[&:nth-child(odd)]:border-r`}
                  dataServiceCard
                  animate
                  index={index}
                />
              );
            })}
          </div>

          <nav aria-label="Studio links" className="home-studio-links flex w-full max-w-[520px] flex-wrap justify-start gap-[var(--space-studio-links)] xl:self-center" data-reveal>
            <ArrowLink href="/studio">Explore our services</ArrowLink>
            <ArrowLink href="/work">See our work</ArrowLink>
          </nav>
        </div>
      </section>

      <section
        data-header-theme="dark"
        aria-labelledby="clients-title"
        className="home-clients flex flex-col gap-[var(--space-section)] bg-vinus-charcoal px-[var(--space-edge)] text-white"
      >
        <div className="home-clients-title-block flex w-full flex-col items-start gap-[var(--space-clients-title)]">
          <h2 id="clients-title" data-reveal className="display-section w-full font-normal text-white">
            Clients we&apos;ve
            <br />
            partnered with.
          </h2>
          <p data-reveal className="home-clients-copy body-lg w-full font-normal text-white">
            <span className="block">We work with teams across industries, building long-term value through strategy,</span>
            <span className="block">design, and continuous improvement.</span>
          </p>
        </div>
        <ClientLogoGrid tone="dark" mobileLimit={20} />
      </section>

      <section id="news" className="home-story bg-white px-[var(--space-edge)]">
        <div className="home-story-grid grid gap-[var(--space-section)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--grid-gutter)]">
          <div>
            <div data-reveal className="home-story-heading flex flex-col items-start gap-[var(--space-content)]">
              <h2 className="display-section font-normal">
                <span className="block">Ideas &amp;</span>
                {" "}
                <span className="block">Insights</span>
              </h2>
              <div className="hidden lg:block">
                <ArrowLink href="/news">View all stories</ArrowLink>
              </div>
              <p className="body-lg lg:hidden">Ideas and insights for building meaningful experiences.</p>
            </div>
          </div>

          <div className="home-story-list shadow-[inset_0_1px_0_rgba(13,13,13,0.1)]">
            {stories.map((story, index) => (
              <StoryListItem
                key={story.title}
                {...story}
                category="Insight"
                variant="home"
                index={index}
              />
            ))}
          </div>
          <div className="home-story-link lg:hidden">
            <ArrowLink href="/news">View all stories</ArrowLink>
          </div>
        </div>
      </section>

      <Footer />

      <AnimatePresence onExitComplete={() => setIsPlayReelPresent(false)}>
        {isPlaying && (
          <motion.div
            ref={playReelDialogRef}
            id="playreel-dialog"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Vinuspread playreel"
            className="fixed inset-0 z-50 flex items-center justify-center bg-vinus-ink/95 p-6 text-white"
          >
            <button
              ref={playReelCloseRef}
              type="button"
              aria-label="Close playreel"
              onClick={() => setIsPlaying(false)}
              className="absolute right-6 top-6 flex size-12 items-center justify-center rounded-full border border-white/30 transition-colors duration-200 hover:bg-white hover:text-vinus-ink"
            >
              <X className="size-5" />
            </button>
            <div className="relative aspect-video w-full max-w-[1280px] overflow-hidden">
              <Image src="/vinus/dummy-photo/reel.jpg" alt="Vinuspread playreel" fill className="object-cover opacity-75" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                <p className="body-lg">Vinuspread PlayReel</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .home-hero {
          min-height: 980px;
          height: auto;
          padding: 96px 20px 64px;
        }

        .home-hero-content {
          height: auto;
          max-width: 1800px;
          gap: 48px;
        }

        .home-page {
          overflow-x: clip;
        }

        .home-intro {
          height: 530px;
          padding: 96px 20px 64px;
        }

        .home-intro-copy {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .home-portfolio {
          height: auto;
          margin-bottom: 0;
          padding: 64px 20px;
        }

        .home-portfolio-heading {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
          padding-bottom: 0;
        }

        .home-portfolio-title {
          overflow: visible;
        }

        .home-portfolio-copy {
          --type-body-xl-line: 1.3;
        }

        .home-portfolio-divider {
          display: block;
          height: 1px;
          width: 100%;
          background: var(--color-vinus-line);
        }

        .home-portfolio-canvas {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
        }

        .home-portfolio-canvas--desktop {
          display: none;
        }

        .home-portfolio-cta {
          margin-top: 0;
        }

        .home-reel {
          height: 420px;
          min-height: 420px;
        }

        .home-studio {
          height: auto;
          min-height: 1028px;
          padding: 64px 20px 0;
        }

        .home-clients {
          min-height: 1242px;
          padding-top: 64px;
          padding-bottom: 80px;
        }

        .home-story {
          min-height: 1806px;
          padding-top: 64px;
          padding-bottom: 80px;
        }

        @media (min-width: 768px) and (max-width: 2199px) {
          .home-page {
            --type-display-hero-size: 160px;
            --type-display-hero-line: 1;
          }

          .home-hero {
            min-height: 1823px;
            padding: 120px 40px 96px;
          }

          .home-intro {
            min-height: 674px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 160px 40px 0;
          }

          .home-hero-content,
          .home-hero-content > div:first-child {
            gap: 120px;
          }

          .home-intro-content {
            width: min(944px, 100%);
            gap: 48px;
          }

          .home-intro-copy {
            width: min(944px, 100%);
            gap: 0;
          }

          [data-intro-link] {
            align-self: center;
          }

          [data-intro-link] a {
            min-width: 253px;
          }

          .home-portfolio {
            height: 1977px;
            padding: 96px 40px 0;
          }

          .home-portfolio-heading {
            gap: 40px;
            padding-bottom: 0;
          }

          .home-portfolio-title-block {
            width: min(944px, 100%);
            gap: 16px;
          }

          .home-portfolio-copy {
            --type-body-xl-size: 20px;
            --type-body-xl-line: 1.3;
          }

          .home-portfolio {
            --type-body-link-size: 20px;
          }

          .home-portfolio-divider {
            display: block;
          }

          .home-portfolio-canvas {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
            gap: 32px var(--space-edge);
            margin-top: 40px;
          }

          .home-portfolio-canvas--desktop {
            display: none;
          }

          .home-project {
            width: 100%;
            margin-left: 0;
          }

          .home-project--mongdang {
            grid-column: 1;
            grid-row: 1;
          }

          .home-project--shinhan {
            grid-column: 2;
            grid-row: 1;
            width: 68%;
            justify-self: end;
          }

          .home-project--crowd {
            grid-column: 1;
            grid-row: 2;
            width: 68%;
          }

          .home-project--macadamia {
            grid-column: 2;
            grid-row: 2;
          }

          .home-project--budongsan {
            grid-column: 1;
            grid-row: 3;
            width: 82%;
          }

          .home-project--donga {
            grid-column: 2;
            grid-row: 3;
            width: 82%;
            justify-self: end;
          }

          .home-project--mobile-only {
            display: none;
          }

          .home-reel {
            height: 640px;
            min-height: 640px;
          }

          .home-studio {
            height: 849px;
            min-height: 0;
            padding: 96px 40px 0;
            padding-bottom: 0;
            padding-left: 40px;
            padding-right: 40px;
            align-items: flex-start;
            justify-content: flex-start;
          }

          .home-studio-content {
            width: 944px;
            max-width: 944px;
            gap: 48px;
          }

          .home-studio-heading-block {
            gap: 48px;
          }

          .home-studio-lead {
            --type-heading-lead-size: 40px;
            --type-heading-lead-line: 1.1;
          }

          .home-studio-body {
            --type-body-lg-size: 20px;
            --type-body-lg-line: 1.4;
          }

          [data-service-grid] {
            width: 944px;
            max-width: 944px;
            height: 211px;
          }

          .home-studio-links {
            height: 42px;
          }

          .home-clients {
            --type-display-section-size: 80px;
            height: 976px;
            min-height: 0;
            padding: 96px 40px;
          }

          .home-clients-title-block {
            gap: 20px;
          }

          .home-clients {
            gap: 48px;
          }

          .home-clients-copy {
            --type-body-lg-size: 20px;
            --type-body-lg-line: 1.3;
          }

          .home-clients .client-logo-grid {
            height: 504px;
          }

          .home-story {
            --type-display-section-size: 80px;
            height: 1330px;
            min-height: 0;
            padding: 96px 40px;
          }

          .home-story-grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
            width: 944px;
            height: auto;
          }

          .home-story-heading {
            width: 944px;
            gap: 40px;
          }

          .home-story-list {
            width: 944px;
            height: 858px;
          }

          .home-story-row {
            height: 286px;
          }

          .home-page > footer {
            height: 785px;
            min-height: 0;
          }
        }

        @media (min-width: 2200px) {
          .home-hero {
            height: 2508px;
            min-height: 0;
            padding: 120px 64px 0;
          }

          .home-hero-content {
            width: 1800px;
            height: auto;
            gap: 120px;
          }

          .home-hero-content > div:first-child {
            gap: 120px;
          }

          .home-hero-content > div:first-child > span {
            height: 8px;
          }

          .home-hero-lead span {
            white-space: nowrap;
          }

          .home-hero-content > div:last-child {
            height: 45px;
          }

          .home-hero-title {
            width: 2432px;
          }

          .home-intro {
            height: 883px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 200px 560px;
          }

          .home-intro-content {
            transform: none;
            min-height: 0;
            width: 1440px;
            margin: 0 auto;
            justify-content: flex-start;
            padding-top: 0;
            gap: 64px;
          }

          .home-intro-copy {
            width: 1440px;
            gap: 0;
          }

          [data-intro-link] {
            align-self: flex-start;
          }

          [data-intro-link] a {
            min-width: 0;
          }

          .home-portfolio {
            height: 3226px;
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 128px 0 0;
          }

          .home-portfolio-heading {
            width: 100%;
            height: auto;
            gap: 96px;
            padding: 0 64px;
          }

          .home-portfolio-divider {
            display: block;
          }

          .home-portfolio-title {
            max-width: 1320px;
          }

          .home-portfolio-copy {
            --type-body-xl-line: 1.1667;
          }

          .home-portfolio-canvas--mobile {
            display: none;
          }

          .home-portfolio-canvas--desktop {
            --home-work-col: calc((100% - 528px) / 12);
            position: relative;
            display: block;
            width: calc(100% - 128px);
            height: 2380px;
            margin: 96px 64px 0;
            padding: 0;
          }

          .home-project {
            position: absolute;
            width: auto;
            margin: 0;
          }

          .home-project--mongdang {
            left: calc(var(--home-work-col) + 48px);
            top: 0;
            width: calc(var(--home-work-col) * 4 + 144px);
          }

          .home-project--shinhan {
            left: calc(var(--home-work-col) * 6 + 288px);
            top: 96px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-project--crowd {
            left: calc(var(--home-work-col) * 3 + 144px);
            top: 720px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-project--macadamia {
            left: calc(var(--home-work-col) * 7 + 336px);
            top: 792px;
            width: calc(var(--home-work-col) * 4 + 144px);
          }

          .home-project--budongsan {
            left: calc(var(--home-work-col) + 48px);
            top: 1570px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-project--donga {
            left: calc(var(--home-work-col) * 5 + 240px);
            top: 1680px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-project--mobile-only {
            display: none;
          }

          .home-reel {
            height: 1280px;
            min-height: 0;
          }

          .home-studio {
            height: 1154px;
            min-height: 0;
            align-items: flex-start;
            justify-content: center;
            padding-top: 128px;
            padding-bottom: 128px;
          }

          .home-studio-content {
            width: 1440px !important;
            max-width: 1440px !important;
            gap: 96px;
          }

          .home-studio-intro {
            width: 100%;
            max-width: none;
          }

          [data-service-grid] {
            width: 1440px !important;
            max-width: 1440px !important;
            height: 360px;
            align-items: stretch;
          }

          .home-service-card {
            border-right-width: 0;
          }

          .home-clients {
            height: 1109px;
            min-height: 0;
            padding: 160px 64px 160px;
          }

          .home-story {
            height: 985px;
            min-height: 0;
            padding: 128px 64px 0;
          }

          .home-story-grid {
            height: 720px;
            grid-template-columns: 1168px 1168px;
            column-gap: 96px;
          }

          .home-story-heading {
            gap: 96px;
          }

          .home-story-row {
            height: 240px;
          }

          .home-story-row--last {
            height: 240px;
          }

          .home-page > footer {
            height: 714px;
          }
        }

        @media (max-width: 767px) {
          .home-hero {
            min-height: 1047px;
            padding: 64px 20px 64px;
            --type-display-hero-size: 60px;
            --type-display-hero-line: 1;
          }

          .home-hero-content,
          .home-hero-content > div:first-child {
            gap: 48px;
          }

          .home-hero-content > div:first-child > span {
            height: 4px;
            width: 64px;
          }

          .home-hero-title {
            max-width: 100%;
          }

          .home-hero {
            --type-body-xl-size: 16px;
            --type-body-xl-line: 1.375;
          }

          .home-hero-content > div:last-child {
            margin-top: 0;
            max-width: 280px;
          }

          .home-portfolio {
            height: 2684px;
            min-height: 0;
          }

          .home-intro-content {
            gap: 48px;
          }

          .home-intro-copy {
            gap: 0;
          }

          [data-intro-link] {
            align-self: center;
          }

          [data-intro-link] a {
            min-width: 0;
          }

          .home-studio {
            align-items: flex-start;
            justify-content: flex-start;
          }

          .home-studio-content {
            width: 350px;
            max-width: 350px;
            align-items: flex-start;
            gap: 32px;
            text-align: left;
          }

          .home-studio-heading-block {
            gap: 24px;
          }

          .home-studio-intro {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            width: 350px;
          }

          .home-studio-body {
            --type-body-lg-size: 16px;
            --type-body-lg-line: 1.4;
          }

          .home-studio-links {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 220px;
          }

          [data-service-grid] {
            display: flex;
            width: 350px;
            max-width: 350px;
            height: 446px;
            flex-direction: column;
            gap: 24px;
            border: 0;
          }

          .home-project {
            width: 100% !important;
            margin-left: 0 !important;
          }

          .home-clients {
            gap: 32px;
          }

          .home-clients-copy {
            --type-body-lg-size: 14px;
            --type-body-lg-line: 1.4;
          }

          .home-clients .client-logo-grid {
            height: 896px;
          }

          .home-story-grid {
            display: flex;
            height: auto;
            flex-direction: column;
            gap: 32px;
          }

          .home-story-heading {
            height: 142px;
            gap: 24px;
          }

          .home-story-grid > div:nth-child(2) {
            display: flex;
            height: 1425px;
            flex-direction: column;
            gap: 64px;
            border-top: 0;
          }

          .home-story-link {
            order: 2;
            height: 24px;
          }

          .home-story-list {
            order: 3;
            height: 1425px;
            margin-top: 16px;
          }

          .home-story h3 {
            text-wrap: balance;
          }

          .home-story {
            height: 1799px;
            min-height: 0;
            padding-left: 20px;
            padding-right: 20px;
          }

          .home-clients {
            height: 1242px;
            min-height: 0;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 64px;
          }

          .home-page > footer {
            height: 945px;
            min-height: 0;
          }
        }

        @media (min-width: 768px) and (max-width: 2199px) {
          .home-story-row {
            min-height: 0;
            height: 286px;
          }

          .home-story-list {
            height: 858px;
            overflow: visible;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-page *,
          .home-page *::before,
          .home-page *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
