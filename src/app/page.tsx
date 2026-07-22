"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const stories = storyEntries.map((story, index) => ({
  title: homeStoryContent[index]?.title ?? story.title,
  excerpt: homeStoryContent[index]?.excerpt ?? story.excerpt,
  date: story.date,
  image: story.image,
  href: `/news/${story.slug}`,
}));

function ProjectCard({ project }: { project: Project }) {
  return (
    <PortfolioCard
      image={project.src}
      imageAlt={project.title}
      title={project.title}
      subtitle={project.subtitle}
      category={project.category}
      href={`/work/${project.slug}`}
      layoutClassName={`home-project ${project.layout} ${project.mobileLayout} ${project.mobileOnly ? "home-project--mobile-only" : ""}`}
      mediaClassName="home-project-media"
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const syncDesktopScale = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1440 && viewportWidth < 2200) {
        root.style.setProperty("--home-desktop-scale", String(viewportWidth / 2560));
      } else {
        root.style.removeProperty("--home-desktop-scale");
      }
    };

    syncDesktopScale();
    window.addEventListener("resize", syncDesktopScale);
    return () => window.removeEventListener("resize", syncDesktopScale);
  }, []);

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
    <div ref={rootRef} className="home-page relative overflow-hidden bg-white text-vinus-ink">
      <section
        ref={heroRef}
        data-header-theme="dark"
        className="home-hero relative overflow-hidden bg-vinus-ink text-white"
      >
        <div className="absolute inset-0">
          <Image
            src="/vinus/dummy-photo/hero.jpg"
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
              className="home-hero-lead type-lead w-full max-w-[860px] text-white"
            >
              We work with brands from the first idea to the last detail, shaping direction, experience, and improvement together.
            </p>

            <span data-hero-reveal aria-hidden="true" className="block h-2 w-[120px] bg-white md:h-5" />

            <h1 className="home-hero-title font-normal">
              <span data-hero-reveal className="block">We design</span>
              <span data-hero-reveal className="block">sustainable</span>
              <span data-hero-reveal className="block">growth</span>
            </h1>
          </div>

          <p data-hero-reveal className="type-lead max-w-[1500px] font-normal text-white/70">
            From first idea to final detail, we work with you to find direction,
            <br />
            build better experiences, and keep improving what comes next.
          </p>

          <div data-hero-reveal>
            <ArrowLink href="/contact" inverse>Download Brochure</ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-intro relative border-t border-vinus-ink/10 bg-white">
        <div className="home-intro-content flex flex-col items-start gap-12 md:gap-16">
          <p data-reveal className="home-intro-copy type-heading">
            <span className="md:hidden">We focus on essential value and elevate it with beauty.</span>
            <span className="md:hidden">As times continue to change, we stay grounded in what lasts.<br />We create design that helps ideas move beyond their limits.</span>
            <span className="hidden md:block">
              We focus on essential value and<br />
              elevate it with beauty.<br />
              As times continue to change,<br />
              we stay grounded in what lasts.<br />
              We create design that helps ideas<br />
              move beyond their limits.
            </span>
          </p>
          <div data-reveal>
            <ArrowLink href="/studio">The Studio</ArrowLink>
          </div>
        </div>
      </section>

      <section id="work" className="home-portfolio relative bg-white">
        <div className="home-portfolio-heading border-b border-vinus-ink/10">
          <div className="flex max-w-[1680px] flex-col items-start gap-[var(--space-content)]">
            <h2 className="home-portfolio-title type-display font-normal" aria-label="Work">
              <span className="home-portfolio-title-line block">Work</span>
            </h2>
            <p className="home-portfolio-copy type-lead">
              <span className="home-portfolio-copy-line block">Selected work shaped through strategy, interface design,</span>
              <span className="home-portfolio-copy-line block">and brand systems built to keep improving.</span>
            </p>
          </div>
        </div>

        <div className="home-portfolio-canvas home-portfolio-canvas--mobile">
          {projects.map((project) => <ProjectCard key={`mobile-${project.title}`} project={project} />)}
        </div>

        <div className="home-portfolio-canvas home-portfolio-canvas--desktop">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>

        <div className="home-portfolio-cta flex justify-center" data-reveal>
          <ArrowLink href="/work">Browse all work</ArrowLink>
        </div>
      </section>

      <section ref={reelRef} data-header-theme="dark" className="home-reel relative overflow-hidden bg-white text-white">
        <motion.div
          className="absolute inset-0"
          style={{ y: reduceMotion ? 0 : reelImageY, scale: reduceMotion ? 1 : reelImageScale }}
        >
          <Image
            src="/vinus/dummy-photo/hero.jpg"
            alt="Vinuspread playreel"
            fill
            sizes="100vw"
            className="object-cover opacity-70"
          />
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
            className="flex size-28 items-center justify-center rounded-full border border-white/16 bg-white/55 text-white"
          >
            <Image src="/vinus/icons/playreel-play.svg" alt="" width={36} height={36} aria-hidden="true" />
          </motion.button>
        </div>
      </section>

      <section id="studio" className="home-studio flex items-center justify-center bg-white px-6 md:px-16">
        <div className="home-studio-content flex w-full max-w-[1500px] flex-col items-start gap-16 text-left md:gap-20 xl:gap-24">
          <h2 data-reveal className="home-studio-title type-page font-normal">How we work</h2>

          <div className="home-studio-intro grid w-full gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
            <p data-reveal className="home-studio-lead type-heading w-full">
              Always there, from first idea to final detail.
            </p>
            <p data-reveal className="home-studio-body type-lead w-full">
              Vinuspread works with teams from early direction to launch and beyond.
              <br className="hidden lg:block" />
              We use AI as a working method to plan, design, and improve experiences with over 20 years of practice in
              <br className="hidden lg:block" /> UI/UX, branding, and product design.
            </p>
          </div>

          <div
            data-service-grid
            className="grid w-full max-w-[1320px] grid-cols-1 border-y border-vinus-ink/10 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-12"
          >
            {services.map((service, index) => {
              return (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  details={service.details}
                  variant="icon"
                  icon={<Image src="/vinus/icons/service-card.svg" alt="" width={28} height={28} aria-hidden="true" />}
                  iconClassName="size-7"
                  titleClassName="shrink-0 whitespace-nowrap"
                  detailsClassName="shrink-0 normal-case"
                  contentClassName="overflow-hidden"
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

          <nav aria-label="Studio links" className="home-studio-links flex w-full max-w-[460px] flex-wrap justify-start gap-[var(--space-compact)] pt-2 xl:pt-4" data-reveal>
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
        <h2 id="clients-title" data-reveal className="type-section max-w-[1500px] font-normal">
          Clients we&apos;ve
          <br />
          partnered with.
        </h2>
        <ClientLogoGrid tone="dark" mobileLimit={20} />
      </section>

      <section id="news" className="home-story bg-white px-[var(--space-edge)]">
        <div className="home-story-grid grid gap-[var(--space-section)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--grid-gutter)]">
          <div>
            <div data-reveal className="home-story-heading flex flex-col items-start gap-[var(--space-content)] lg:sticky lg:top-32">
              <h2 className="type-page font-normal">
                <span className="block">Ideas &amp;</span>
                <span className="block">Insights</span>
              </h2>
              <div className="hidden lg:block">
                <ArrowLink href="/news">View all stories</ArrowLink>
              </div>
              <p className="type-lead lg:hidden">Ideas and insights for building meaningful experiences.</p>
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
                <p className="type-lead">Vinuspread PlayReel</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
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

        .home-hero-lead,
        .home-hero-content p.type-lead {
          font-size: 24px;
          line-height: 1.4;
        }

        .home-hero-title {
          font-size: 60px;
          line-height: 0.9;
        }

        .home-intro {
          height: 720px;
          padding: 96px 24px;
        }

        .home-intro-copy {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .home-portfolio {
          height: auto;
          margin-bottom: 0;
          padding: 96px 24px;
        }

        .home-portfolio-heading {
          border-bottom-color: transparent;
          padding-bottom: 0;
        }

        .home-portfolio-title,
        .home-portfolio-copy {
          overflow: hidden;
        }

        .home-portfolio-canvas {
          display: flex;
          flex-direction: column;
          gap: 48px;
          margin-top: 64px;
        }

        .home-portfolio-canvas--desktop {
          display: none;
        }

        .home-project-media {
          aspect-ratio: 1 / 1;
        }

        .home-portfolio-cta {
          margin-top: 96px;
        }

        .home-reel {
          height: 480px;
          min-height: 480px;
        }

        .home-studio {
          height: auto;
          min-height: 0;
          padding-top: 96px;
          padding-bottom: 96px;
        }

        .home-clients {
          height: auto;
          padding-top: 96px;
          padding-bottom: 96px;
        }

        .home-story {
          height: auto;
          padding-top: 96px;
          padding-bottom: 96px;
        }

        @media (min-width: 768px) and (max-width: 1439px) {
          .home-hero {
            min-height: max(100dvh, 1320px);
            padding: 220px 64px 120px;
          }

          .home-hero-title {
            font-size: min(14.22vw, 300px);
            line-height: 0.9;
          }

          .home-intro {
            min-height: 876px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 96px 64px;
          }

          .home-intro-content {
            width: min(1680px, 100%);
          }

          .home-intro-copy {
            width: min(1480px, 100%);
            gap: 32px;
            font-size: 64px;
            line-height: 72px;
          }

          .home-portfolio {
            height: auto;
            padding: 96px 64px;
          }

          .home-portfolio-heading {
            border-bottom-color: rgb(13 13 13 / 0.1);
            padding-bottom: 1px;
          }

          .home-portfolio-canvas {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
            gap: var(--space-section) var(--space-edge);
            margin-top: 96px;
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
            height: min(50vw, 1280px);
            min-height: 720px;
          }

          .home-clients {
            height: auto;
            padding: 160px 64px;
          }

          .home-story {
            height: auto;
            padding: 160px 64px;
          }
        }

        @media (min-width: 1440px) and (max-width: 2199px) {
          .home-page {
            width: 2560px;
            zoom: var(--home-desktop-scale);
          }
        }

        @media (min-width: 1440px) {
          .home-hero {
            height: 2356px;
            min-height: 0;
            padding: 418px 64px 0;
          }

          .home-hero-content {
            width: 1800px;
            height: auto;
          }

          .home-hero-lead span {
            white-space: nowrap;
          }

          .home-hero-content > div:last-child {
            height: 45px;
          }

          .home-hero-title {
            width: 1848px;
            font-size: 364px;
            line-height: 328px;
          }

          .home-hero-lead {
            line-height: 32px;
          }

          .home-intro {
            height: 845px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 64px;
          }

          .home-intro-content {
            width: 1440px;
          }

          .home-intro-copy {
            width: 1440px;
            gap: 32px;
            font-size: 64px;
            line-height: 72px;
          }

          .home-portfolio {
            height: auto;
            display: flex;
            flex-direction: column;
            margin: 0 0 160px;
            padding: 64px 0;
          }

          .home-portfolio-heading {
            width: 100%;
            height: auto;
            padding: 0 64px 1px;
          }

          .home-portfolio-title {
            max-width: 1320px;
            line-height: 0.92;
          }

          .home-portfolio-heading p {
            line-height: 32px;
          }

          .home-portfolio-canvas--mobile {
            display: none;
          }

          .home-portfolio-canvas--desktop {
            width: 100%;
            height: auto;
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            column-gap: 48px;
            row-gap: 88px;
            margin: 40px 0 0;
            padding: 72px 64px 80px;
          }

          .home-project {
            width: auto;
            margin: 0;
          }

          .home-project--mongdang {
            grid-column: 2 / span 4;
          }

          .home-project--shinhan {
            grid-column: 7 / span 3;
            margin-top: 96px;
          }

          .home-project--crowd {
            grid-column: 4 / span 3;
            margin-top: -24px;
          }

          .home-project--macadamia {
            grid-column: 8 / span 4;
            margin-top: 48px;
          }

          .home-project--budongsan {
            grid-column: 2 / span 3;
            margin-top: -8px;
          }

          .home-project--donga {
            grid-column: 6 / span 3;
            margin-top: 72px;
          }

          .home-project-media {
            aspect-ratio: 4 / 3;
          }

          .home-project--mobile-only {
            display: none;
          }

          .home-portfolio-cta {
            width: 100%;
            margin: 64px 0 0;
          }

          .home-reel {
            height: 1280px;
            min-height: 0;
          }

          .home-studio {
            height: auto;
            min-height: 0;
            padding-top: 160px;
            padding-bottom: 160px;
          }

          .home-studio-lead {
            font-size: 40px;
            line-height: 48px;
          }

          .home-studio-title {
            font-size: 120px;
            line-height: 104px;
          }

          .home-studio-body {
            line-height: 32px;
          }

          .home-studio-intro {
            width: 100%;
            max-width: none;
          }

          [data-service-grid] {
            height: auto;
            align-items: start;
          }

          .home-service-card {
            border-right-width: 0;
          }

          .home-clients {
            height: auto;
            min-height: 0;
            padding: 160px 64px;
          }

          .home-story {
            height: auto;
            padding: 160px 64px;
          }

          .home-story-grid {
            height: auto;
            grid-template-columns: 996px 1404px;
          }

          .home-story-row {
            height: 270px;
          }

          .home-story-row--last {
            height: 270px;
          }

          .home-page > footer {
            height: 732px;
          }
        }

        @media (max-width: 767px) {
          .home-hero {
            min-height: 760px;
            padding: 112px 24px 64px;
          }

          .home-hero-content {
            gap: 32px;
          }

          .home-hero-content > div:first-child {
            gap: 28px;
          }

          .home-hero-lead,
          .home-hero-content p.type-lead {
            font-size: 14px;
            line-height: 20px;
          }

          .home-hero-content > div:first-child > span {
            height: 4px;
            width: 64px;
          }

          .home-hero-title {
            max-width: 100%;
            font-size: clamp(56px, 16.2vw, 68px);
            line-height: 0.92;
          }

          .home-hero-content > div:last-child {
            margin-top: 0;
            max-width: 280px;
          }

          .home-intro-content p br:nth-of-type(5) {
            display: none;
          }

          .home-studio {
            align-items: flex-start;
            justify-content: flex-start;
          }

          .home-studio-content {
            align-items: flex-start;
            gap: 64px;
            text-align: left;
          }

          .home-studio-intro,
          .home-studio-links {
            display: none;
          }

          .home-service-card {
            height: 105px;
            border-bottom-width: 1px;
          }

          .home-service-card > a,
          .home-service-card > a > div {
            height: 100%;
          }

          .home-service-card > a > div {
            justify-content: center;
            gap: 0;
            padding: 0;
          }

          .home-service-card > a > div > div:first-child {
            display: none;
          }

          .home-service-card > a > div > div:nth-child(2) {
            align-items: center;
          }

          .home-service-card h3 {
            font-size: 20px;
            line-height: 28px;
            font-weight: 500;
          }

          .home-service-card p {
            display: flex;
            flex-wrap: wrap;
            gap: 0 4px;
            font-size: 14px;
            line-height: 20px;
            text-transform: none;
          }

          .home-service-card p span {
            display: inline;
          }

          .home-service-card p span:not(:last-child)::after {
            content: " ·";
          }

          [data-service-grid] {
            display: flex;
            height: 492px;
            flex-direction: column;
            gap: 24px;
            border: 0;
          }

          .home-project {
            width: 100% !important;
            margin-left: 0 !important;
          }

          .home-portfolio-cta {
            margin-top: 64px;
          }

          .home-clients {
            gap: 64px;
          }

          .home-clients > div {
            height: 720px;
          }

          .home-story-grid {
            display: flex;
            height: auto;
            flex-direction: column;
            gap: 64px;
          }

          .home-story-heading {
            height: auto;
            gap: 24px;
          }

          .home-story-heading h2 {
            font-size: 48px;
            line-height: 52px;
          }

          .home-story-grid > div:nth-child(2) {
            display: flex;
            height: auto;
            flex-direction: column;
            gap: 64px;
            border-top: 0;
          }

          .home-story-link {
            height: 24px;
          }

          .home-story h3 {
            text-wrap: balance;
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
