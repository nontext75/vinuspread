"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
    src: "/vinus/home/figma-mongdang.png",
    slug: "mongdang",
    layout: "home-project--mongdang",
    mobileLayout: "w-full",
    speed: -8,
  },
  {
    title: "Shinhan Easy",
    subtitle: "Digital Experience & Mobile Web",
    category: "Web",
    src: "/vinus/home/figma-shinhan.png",
    slug: "shinhan-easy",
    layout: "home-project--shinhan",
    mobileLayout: "ml-[14%] w-[86%]",
    speed: 10,
  },
  {
    title: "Crowd OH!",
    subtitle: "Crowdsourcing Platform Design",
    category: "Web",
    src: "/vinus/home/figma-crowd.png",
    slug: "crowdsourcing-platform-crowd-oh",
    layout: "home-project--crowd",
    mobileLayout: "w-[92%]",
    speed: -7,
  },
  {
    title: "macadamia",
    subtitle: "Product Strategy & UX/UI Design",
    category: "Web",
    src: "/vinus/home/figma-macadamia.png",
    slug: "macadamia-website",
    layout: "home-project--macadamia",
    mobileLayout: "ml-[8%] w-[92%]",
    speed: 8,
  },
  {
    title: "Budongsan114 Mediate BIZsolution",
    subtitle: "Enterprise B2B Product Strategy",
    category: "Web",
    src: "/vinus/home/figma-budongsan.png",
    slug: "budongsan114-mediate-bizsolution",
    layout: "home-project--budongsan",
    mobileLayout: "ml-[20%] w-[80%]",
    speed: -10,
  },
  {
    title: "DongA On book",
    subtitle: "Branding · Digital Design · Web",
    category: "Web",
    src: "/vinus/home/figma-donga.png",
    slug: "donga-on-book",
    layout: "home-project--donga",
    mobileLayout: "ml-[7%] w-[93%]",
    speed: 7,
  },
];

const services = [
  { title: "Product Strategy", details: ["Discovery", "Roadmap", "AI Opportunity"], icon: "/vinus/icons/service-strategy.svg" },
  { title: "Experience Design", details: ["UX/UI", "Web", "App"], icon: "/vinus/icons/service-experience.svg" },
  { title: "Brand Systems", details: ["Identity", "Visual Direction", "Content"], icon: "/vinus/icons/service-brand.svg" },
  { title: "Launch & Operation", details: ["CMS", "SEO", "Analytics"], icon: "/vinus/icons/service-launch.svg" },
];

const homeStoryContent = [
  {
    image: "/vinus/stories/home-story-01.png",
  },
  {
    image: "/vinus/stories/home-story-02.png",
  },
  {
    image: "/vinus/stories/home-story-03.jpg",
  },
] as const;

const stories = storyEntries.slice(0, 3).map((story, index) => ({
  title: story.title,
  excerpt: story.excerpt,
  date: story.date,
  image: homeStoryContent[index]?.image ?? story.image,
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
  const playReelTriggerRef = useRef<HTMLButtonElement>(null);
  const playReelDialogRef = useRef<HTMLDivElement>(null);
  const playReelCloseRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayReelPresent, setIsPlayReelPresent] = useState(false);
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
        <div className="absolute inset-0 will-change-transform" data-hero-image>
          <Image
            src="/vinus/dummy-photo/hero-figma.jpg"
            alt="Modern residential architecture"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="home-hero-content relative flex flex-col items-start gap-[var(--space-section)]">
          <div className="flex w-full flex-col items-start gap-[var(--space-section)]">
            <p
              data-hero-reveal
              data-motion="hero-lead"
              className="home-hero-lead body-xl w-full max-w-[860px] text-white"
            >
              We work with brands from the first idea
              <br className="hidden md:block" />
              to the last detail, shaping direction, experience, and improvement together.
            </p>

            <span data-hero-reveal data-motion="hero-rule" aria-hidden="true" className="block h-2 w-[120px] bg-white" />

            <h1 className="home-hero-title display-hero font-normal">
              <span data-hero-reveal data-motion="hero-title" className="block">We design</span>
              <span data-hero-reveal data-motion="hero-title" className="block">sustainable</span>
              <span data-hero-reveal data-motion="hero-title" className="block">growth</span>
            </h1>
          </div>

          <p data-hero-reveal data-motion="hero-summary" className="home-hero-summary body-xl max-w-[1500px] font-normal text-white md:font-medium min-[2200px]:w-[1500px]">
            From first idea to final detail, we work with you to find direction,
            <br className="home-hero-summary-break" />
            build better experiences, and keep improving what comes next.
          </p>

          <div data-hero-reveal data-motion="hero-cta">
            <ArrowLink href="/contact" inverse className="[&>span]:border-0">Download Brochure</ArrowLink>
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
            <ArrowLink href="/studio" className="[&>span]:border-0">The Studio</ArrowLink>
          </div>
        </div>
      </section>

      <section id="work" className="home-portfolio relative bg-white">
        <div className="home-portfolio-heading">
          <div data-reveal className="home-portfolio-title-block flex max-w-[1680px] flex-col items-start gap-[var(--space-content)]">
            <h2 className="home-portfolio-title display-giant font-normal" aria-label="Experience">
              <span className="home-portfolio-title-line block">Experience</span>
            </h2>
            <p className="home-portfolio-copy body-xl">
              <span className="home-portfolio-copy-line block">Selected work shaped through strategy, interface design,</span>
              <span className="home-portfolio-copy-line block">and brand systems built to keep improving.</span>
            </p>
          </div>
          <div className="home-portfolio-cta" data-reveal>
            <ArrowLink href="/work" className="[&>span]:border-0">Browse all work</ArrowLink>
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

      <section data-header-theme="dark" className="home-reel relative overflow-hidden bg-vinus-black text-white">
        <div
          className="absolute inset-0"
          data-reel-image
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
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            ref={playReelTriggerRef}
            type="button"
            aria-label="Play Vinuspread reel"
            aria-expanded={isPlayReelPresent}
            aria-controls="playreel-dialog"
            onClick={() => {
              setIsPlayReelPresent(true);
              setIsPlaying(true);
            }}
            className="playreel-button relative block rounded-full"
          >
            <span className="absolute -inset-[29.76%]" aria-hidden="true">
              <Image src="/vinus/icons/play-button-shadow.svg" alt="" fill sizes="268px" />
            </span>
            <span className="absolute inset-[10.71%]" aria-hidden="true">
              <Image src="/vinus/icons/play-button-outer.svg" alt="" fill sizes="132px" />
            </span>
            <span className="absolute inset-[22.62%]" aria-hidden="true">
              <span className="absolute -top-[10.87%] -right-[30.43%] -bottom-[50%] -left-[30.43%]">
                <Image src="/vinus/icons/play-button-inner.svg" alt="" fill sizes="148px" />
              </span>
            </span>
            <span className="absolute inset-[17.86%]" aria-hidden="true">
              <Image src="/vinus/icons/play-button-ring.svg" alt="" fill sizes="108px" />
            </span>
            <span className="absolute top-[39.88%] right-[38.1%] bottom-[39.88%] left-[41.67%]" aria-hidden="true">
              <Image src="/vinus/icons/play-button-icon.svg" alt="" fill sizes="34px" />
            </span>
          </button>
        </div>
      </section>

      <section id="studio" className="home-studio flex items-center justify-center bg-white px-6 md:px-16">
        <div className="home-studio-content flex w-full max-w-[1500px] flex-col items-start gap-16 text-left md:gap-20 xl:gap-24">
          <div className="home-studio-heading-block flex w-full flex-col items-start gap-[var(--space-major)] md:gap-12">
            <h2 data-reveal className="home-studio-title display-section font-normal">How we work</h2>

            <div className="home-studio-intro grid w-full gap-[var(--space-studio-intro)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <p data-reveal className="home-studio-lead heading-lead w-full font-medium">
                <span className="min-[2200px]:block">Always there, from first idea </span>
                <span className="min-[2200px]:block">to final detail.</span>
              </p>
              <p data-reveal className="home-studio-body body-lg w-full">
                Vinuspread works with teams from early direction to launch and beyond.
                <br className="home-studio-tablet-break" />
                {" "}We use AI as a working method to plan, design, and improve experiences with
                <br className="home-studio-tablet-break" />
                {" "}over 20 years of practice in UI/UX, branding, and product design.
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
                    icon={<Image src={service.icon} alt="" width={24} height={24} aria-hidden="true" />}
                  mode="homeProcess"
                  className={`home-service-card border-vinus-ink/10 ${
                    index < services.length - 1 ? "lg:border-r" : ""
                  } max-lg:border-b max-lg:last:border-b-0 sm:[&:nth-child(odd)]:border-r`}
                  dataServiceCard
                  index={index}
                />
              );
            })}
          </div>

          <nav aria-label="Studio links" className="home-studio-links flex w-full max-w-[520px] flex-wrap justify-start gap-[var(--space-studio-links)] xl:self-center" data-reveal>
            <ArrowLink href="/studio" className="[&>span]:border-0">Explore our services</ArrowLink>
            <ArrowLink href="/work" className="[&>span]:border-0">See our work</ArrowLink>
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
          <p data-reveal className="home-clients-copy home-clients-copy--wide body-lg w-full font-normal text-white">
            <span className="block">We work with teams across industries, building long-term value through strategy,</span>
            <span className="block">design, and continuous improvement.</span>
          </p>
          <p data-reveal className="home-clients-copy home-clients-copy--mobile body-lg w-full font-normal text-white">
            Selected work shaped through strategy, interface design,
            <br />
            and brand systems built to keep improving.
          </p>
        </div>
        <ClientLogoGrid tone="dark" />
      </section>

      <section id="news" className="home-story bg-white px-[var(--space-edge)]">
        <div className="home-story-grid grid gap-[var(--space-section)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--grid-gutter)]">
          <div data-reveal className="home-story-heading flex flex-col items-start">
            <h2 className="display-section font-normal">
              <span>Ideas&amp;</span>
              <br className="home-story-title-break" />
              <span className="home-story-title-second">Insights</span>
            </h2>
            <ArrowLink href="/news" className="home-story-cta [&>span]:border-0">
              View all stories
            </ArrowLink>
          </div>

          <div className="home-story-list">
            {stories.map((story, index) => (
              <StoryListItem
                key={story.href}
                {...story}
                category="Insight"
                variant="home"
                index={index}
              />
            ))}
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
          padding: 0 20px;
          background: #08090d;
        }

        .home-hero-content {
          height: auto;
          max-width: 1800px;
          gap: 48px;
          margin-top: 254px;
        }

        .home-hero-summary-break {
          display: block;
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

        .home-portfolio-title-block {
          width: 100%;
          max-width: none;
          gap: 32px;
        }

        .home-portfolio-title {
          overflow: visible;
          --type-display-giant-size: 44px;
          --type-display-giant-line: 1;
        }

        .home-portfolio-copy {
          width: 100%;
          --type-body-xl-size: 16px;
          --type-body-xl-line: 1.4;
        }

        .home-portfolio-divider {
          display: block;
          height: 1px;
          width: 100%;
          background: var(--color-vinus-line);
        }

        .home-portfolio-canvas {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: 311px 329px 329px 311px 360px 329px;
          gap: 48px;
          margin-top: 32px;
        }

        .home-portfolio-canvas--desktop {
          display: none;
        }

        .home-portfolio-cta {
          margin-top: 0;
        }

        .home-portfolio .home-project {
          width: 100%;
          margin-left: 0;
          align-self: start;
          --type-heading-card-large-size: 24px;
          --type-heading-card-large-line: 1.2;
          --type-body-md-size: 14px;
          --type-body-md-line: 1.5;
        }

        .home-portfolio .project-card__link {
          gap: 24px;
        }

        .home-portfolio .project-card__copy {
          gap: 8px;
        }

        .home-reel {
          height: 420px;
          min-height: 420px;
        }

        .home-studio {
          height: 953px;
          min-height: 0;
          padding: 64px 20px;
        }

        .home-studio-tablet-break {
          display: none;
        }

        .home-clients {
          --type-display-section-size: 44px;
          --type-display-section-line: 1;
          min-height: 1242px;
          padding-top: 64px;
          padding-bottom: 80px;
        }

        .home-clients-title-block {
          gap: 32px;
        }

        .home-clients-copy {
          --type-body-lg-size: 16px;
          --type-body-lg-line: 1.4;
        }

        .home-clients-copy--wide {
          display: none;
        }

        .home-clients-copy--mobile {
          display: block;
        }

        .home-clients .client-logo-grid {
          border-width: 0;
          grid-template-rows: repeat(14, 64px);
          box-shadow:
            inset 1px 0 rgb(71 71 71 / 0.65),
            inset 0 1px rgb(71 71 71 / 0.65);
        }

        .home-clients .client-logo-cell {
          height: 64px;
          min-height: 64px;
          border-width: 0;
          box-shadow:
            inset -1px 0 rgb(71 71 71 / 0.65),
            inset 0 -1px rgb(71 71 71 / 0.65);
        }

        .home-clients .client-logo {
          opacity: 0.68;
          transform: scale(0.6);
          transform-origin: center;
        }

        .home-story {
          --type-display-section-size: 44px;
          --type-display-section-line: 1;
          height: 1701px;
          min-height: 0;
          padding: 64px 20px;
        }

        .home-story-grid {
          display: flex;
          width: 350px;
          height: 1573px;
          flex-direction: column;
          gap: 32px;
        }

        .home-story-heading {
          width: 350px;
          height: 116px;
          gap: 32px;
        }

        .home-story-title-break {
          display: none;
        }

        .home-story-heading h2 {
          width: 100%;
        }

        .home-story-title-second::before {
          content: " ";
        }

        .home-story-cta {
          height: 40px;
          font-size: 12.52px;
          font-weight: 500;
          line-height: 1.4;
        }

        .home-story-list {
          display: flex;
          width: 350px;
          height: 1425px;
          flex-direction: column;
        }

        .home-story-row {
          height: 475px;
          min-height: 475px;
          border-width: 0;
          box-shadow: inset 0 1px #e7e7e7;
        }

        .home-story-item-title {
          line-height: 1.2;
        }

        @media (min-width: 768px) and (max-width: 2199px) {
          .home-page {
            --type-display-hero-size: 160px;
            --type-display-hero-line: 1;
          }

          .home-hero {
            height: clamp(1823px, calc(50.595vw + 1304.91px), 2418px);
            min-height: clamp(1823px, calc(50.595vw + 1304.91px), 2418px);
            padding-inline: clamp(40px, calc(2.041vw + 19.1px), 64px);
          }

          .home-intro {
            height: clamp(674px, calc(17.772vw + 492.01px), 883px);
            min-height: clamp(674px, calc(17.772vw + 492.01px), 883px);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding:
              clamp(160px, calc(3.401vw + 125.17px), 200px)
              clamp(40px, calc(2.041vw + 19.1px), 64px)
              0;
            border-top: 1px solid rgb(8 9 13 / 0.1);
          }

          .home-hero-content,
          .home-hero-content > div:first-child {
            gap: 120px;
          }

          .home-hero-content {
            margin-top: clamp(430px, calc(20.068vw + 224.1px), 666px);
          }

          .home-hero-summary-break {
            display: none;
          }

          .home-intro-content {
            width: min(clamp(944px, calc(42.177vw + 512.03px), 1440px), 100%);
            gap: 48px;
            align-items: center;
          }

          .home-intro-copy {
            width: min(clamp(944px, calc(42.177vw + 512.03px), 1440px), 100%);
            gap: 0;
            text-align: center;
          }

          [data-intro-link] {
            align-self: center;
          }

          [data-intro-link] a {
            min-width: 253px;
          }

          .home-portfolio {
            height: auto;
            min-height: 1949px;
            padding: 96px 40px;
          }

          .home-portfolio-heading {
            gap: 40px;
            padding-bottom: 0;
          }

          .home-portfolio-title-block {
            width: min(944px, 100%);
            gap: 32px;
          }

          .home-portfolio-title {
            --type-display-giant-size: 72px;
            --type-display-giant-line: 1;
          }

          .home-portfolio-copy {
            --type-body-xl-size: 20px;
            --type-body-xl-line: 1.4;
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
            grid-template-rows: repeat(3, auto);
            align-items: start;
            gap: 48px 24px;
            margin-top: 40px;
          }

          .home-portfolio-canvas--desktop {
            display: none;
          }

          .home-project {
            width: 100%;
            margin-left: 0;
          }

          .home-portfolio .home-project {
            --type-heading-card-large-size: 28px;
            --type-heading-card-large-line: 1.2;
            --type-body-md-size: 16px;
            --type-body-md-line: 1.5;
            --type-label-badge-size: 12px;
          }

          .home-portfolio .project-card__media {
            aspect-ratio: 4 / 3;
          }

          .home-portfolio-cta > a {
            width: 253px;
          }

          .home-project--mongdang {
            grid-column: 1;
            grid-row: 1;
          }

          .home-project--shinhan {
            grid-column: 2;
            grid-row: 1;
          }

          .home-project--crowd {
            grid-column: 1;
            grid-row: 2;
          }

          .home-project--macadamia {
            grid-column: 2;
            grid-row: 2;
          }

          .home-project--budongsan {
            grid-column: 1;
            grid-row: 3;
          }

          .home-project--donga {
            grid-column: 2;
            grid-row: 3;
          }

          .home-project--mobile-only {
            display: none;
          }

          .home-reel {
            height: clamp(640px, calc(54.422vw + 82.72px), 1280px);
            min-height: clamp(640px, calc(54.422vw + 82.72px), 1280px);
          }

          .home-studio {
            height: clamp(804px, calc(29.762vw + 499.24px), 1154px);
            min-height: 0;
            padding:
              clamp(96px, calc(2.721vw + 68.14px), 128px)
              clamp(40px, calc(2.041vw + 19.1px), 64px);
            align-items: flex-start;
            justify-content: flex-start;
          }

          .home-studio-content {
            width: 100%;
            max-width: clamp(944px, calc(42.177vw + 512.03px), 1440px);
            gap: 48px;
          }

          .home-studio-heading-block {
            gap: 48px;
          }

          .home-studio-title {
            --type-display-section-size: 72px;
            --type-display-section-line: 1;
          }

          .home-studio-intro {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .home-studio-tablet-break {
            display: inline;
          }

          .home-studio-lead {
            --type-heading-lead-size: 36px;
            --type-heading-lead-line: 1.12;
            font-size: 36px;
            line-height: 1.12;
          }

          .home-studio-body {
            --type-body-lg-size: 20px;
            --type-body-lg-line: 1.4;
          }

          [data-service-grid] {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
            width: 100%;
            max-width: clamp(944px, calc(42.177vw + 512.03px), 1440px);
            height: 206px;
            padding: 0;
            border: 0;
            align-items: start;
          }

          .home-studio-links {
            width: 554px;
            max-width: none;
            height: 42px;
            flex-wrap: nowrap;
            gap: 48px;
          }

          .home-studio-links > a {
            width: 253px;
            justify-content: space-between;
          }

          .home-studio {
            --type-body-link-size: 20px;
            --type-body-link-line: 1.3;
          }

          .home-studio .home-service-card {
            height: 206px;
            border: 0;
          }

          .home-studio .service-card--home-process .service-card__inner,
          .home-studio .service-card__copy {
            height: auto;
            gap: 20px;
          }

          .home-studio .service-card--home-process .service-card__icon {
            display: flex;
            width: 60px;
            height: 60px;
          }

          .home-studio .service-card__title {
            font-size: 20px;
            font-weight: 500;
            line-height: 1.3;
          }

          .home-studio .service-card__details {
            gap: 4px;
            font-size: 16px;
            line-height: 1.5;
          }

          .home-studio .service-card__icon img {
            width: 24px;
            height: 24px;
          }

          .home-clients {
            --type-display-section-size: 72px;
            height: clamp(976px, calc(11.31vw + 860.19px), 1109px);
            min-height: 0;
            padding:
              clamp(96px, calc(5.442vw + 40.27px), 160px)
              clamp(40px, calc(2.041vw + 19.1px), 64px);
          }

          .home-clients-title-block {
            gap: 32px;
          }

          .home-clients {
            gap: 48px;
          }

          .home-clients-copy {
            --type-body-lg-size: 20px;
            --type-body-lg-line: 1.4;
          }

          .home-clients-copy--wide {
            display: block;
          }

          .home-clients-copy--mobile {
            display: none;
          }

          .home-clients .client-logo-grid {
            height: 504px;
            grid-template-rows: repeat(7, 72px);
          }

          .home-clients .client-logo-cell {
            height: 72px;
            min-height: 72px;
          }

          .home-clients .client-logo {
            transform: scale(0.75);
          }

          .home-story {
            --type-display-section-size: 72px;
            height: 1242px;
            min-height: 0;
            padding: 96px 40px;
          }

          .home-story-grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
            width: 100%;
            max-width: clamp(944px, calc(42.177vw + 512.03px), 1440px);
            height: 1050px;
          }

          .home-story-heading {
            width: 100%;
            max-width: clamp(944px, calc(42.177vw + 512.03px), 1440px);
            height: 152px;
            gap: 40px;
          }

          .home-story-cta {
            font-size: 14.56px;
          }

          .home-story-list {
            width: 100%;
            max-width: 944px;
            height: 858px;
          }

          .home-story-row {
            height: 286px;
            min-height: 286px;
          }

        }

        @media (min-width: 2200px) {
          .home-hero {
            height: 2418px;
            min-height: 0;
            padding: 0 64px;
          }

          .home-hero-content {
            width: 1800px;
            height: auto;
            gap: 120px;
            margin-top: 666px;
          }

          .home-hero-summary-break {
            display: block;
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
            height: 3192px;
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
            --type-display-giant-size: 120px;
            --type-display-giant-line: 1;
          }

          .home-portfolio-title-block {
            width: 100%;
            max-width: none;
          }

          .home-portfolio-copy {
            --type-body-xl-size: 24px;
            --type-body-xl-line: 1.4;
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

          .home-portfolio .home-project {
            --type-heading-card-large-size: 36px;
            --type-heading-card-large-line: 1.2;
            --type-body-md-size: 16px;
            --type-body-md-line: 1.5;
            --type-label-badge-size: 14px;
          }

          .home-portfolio .home-project--mongdang {
            left: calc(var(--home-work-col) + 48px);
            top: 0;
            width: calc(var(--home-work-col) * 4 + 144px);
          }

          .home-portfolio .home-project--shinhan {
            left: calc(var(--home-work-col) * 6 + 288px);
            top: 96px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-portfolio .home-project--crowd {
            left: calc(var(--home-work-col) * 3 + 144px);
            top: 720px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-portfolio .home-project--macadamia {
            left: calc(var(--home-work-col) * 7 + 336px);
            top: 792px;
            width: calc(var(--home-work-col) * 4 + 144px);
          }

          .home-portfolio .home-project--budongsan {
            left: calc(var(--home-work-col) + 48px);
            top: 1570px;
            width: calc(var(--home-work-col) * 3 + 96px);
          }

          .home-portfolio .home-project--donga {
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

          .home-studio-heading-block {
            height: 304px;
            gap: 48px;
          }

          .home-studio-title {
            --type-display-section-size: 120px;
            --type-display-section-line: 1;
          }

          .home-studio-intro {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 96px;
            align-items: start;
            width: 100%;
            max-width: none;
          }

          .home-studio-tablet-break {
            display: none;
          }

          .home-studio-lead {
            --type-heading-lead-size: 48px;
            --type-heading-lead-line: 1.12;
            font-size: 48px;
            line-height: 1.12;
          }

          .home-studio-body {
            --type-body-lg-size: 24px;
            --type-body-lg-line: 1.4;
          }

          [data-service-grid] {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 48px;
            width: 1440px !important;
            max-width: 1440px !important;
            height: 355px;
            padding: 64px 0;
            border-top: 1px solid #e7e7e7;
            border-bottom: 1px solid #e7e7e7;
            align-items: start;
          }

          .home-service-card {
            border-right-width: 0;
          }

          .home-studio .service-card__inner,
          .home-studio .service-card__copy {
            gap: 24px;
          }

          .home-studio .service-card__title {
            font-size: 24px;
            font-weight: 500;
            line-height: 1.3;
          }

          .home-studio .service-card__details {
            gap: 8px;
            font-size: 16px;
            line-height: 1.5;
          }

          .home-studio-links {
            width: 482px;
            max-width: 482px;
            flex-wrap: nowrap;
            gap: 48px;
          }

          .home-studio-links > a {
            width: auto;
          }

          .home-studio {
            --type-body-link-size: 24px;
            --type-body-link-line: 1.3;
          }

          .home-clients {
            --type-display-section-size: 120px;
            height: 1109px;
            min-height: 0;
            padding: 160px 64px 160px;
          }

          .home-clients-title-block {
            height: 340px;
          }

          .home-clients-copy {
            --type-body-lg-size: 24px;
            --type-body-lg-line: 1.4;
          }

          .home-clients-copy--wide {
            display: block;
          }

          .home-clients-copy--mobile {
            display: none;
          }

          .home-clients .client-logo-grid {
            grid-template-rows: repeat(4, 88.25px);
          }

          .home-clients .client-logo-cell {
            height: 88.25px;
            min-height: 88.25px;
          }

          .home-clients .client-logo {
            transform: none;
          }

          .home-story {
            --type-display-section-size: 120px;
            height: 985px;
            min-height: 0;
            padding: 128px 64px 0;
          }

          .home-story-grid {
            display: grid;
            width: 2432px;
            height: 729px;
            grid-template-columns: 1168px 1168px;
            column-gap: 96px;
          }

          .home-story-heading {
            width: 1168px;
            height: 376px;
            gap: 96px;
          }

          .home-story-list {
            width: 1168px;
            height: 729px;
          }

          .home-story-title-break {
            display: initial;
          }

          .home-story-title-second::before {
            content: none;
          }

          .home-story-cta {
            font-size: 16.74px;
          }

          .home-story-row {
            height: 243px;
            min-height: 243px;
          }

          .home-story-row--last {
            height: 243px;
          }

        }

        @media (max-width: 767px) {
          .home-hero {
            height: 890px;
            min-height: 890px;
            padding: 0 20px;
            --type-display-hero-size: 60px;
            --type-display-hero-line: 1;
          }

          .home-hero-content,
          .home-hero-content > div:first-child {
            gap: 48px;
          }

          .home-hero-content > div:first-child > span {
            height: 4px;
            width: 80px;
          }

          .home-intro {
            border-top: 1px solid rgb(8 9 13 / 0.1);
          }

          .home-intro-content {
            align-items: center;
          }

          .home-intro-copy {
            text-align: center;
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
            height: 2618px;
            min-height: 0;
          }

          .home-portfolio-title-block {
            height: 142px;
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
            gap: 32px;
          }

          .home-studio-title {
            --type-display-section-size: 44px;
            --type-display-section-line: 1;
          }

          .home-studio-intro {
            display: flex;
            height: 183px;
            flex-direction: column;
            gap: 16px;
            width: 350px;
          }

          .home-studio-lead {
            --type-heading-lead-size: 28px;
            --type-heading-lead-line: 1.12;
            font-size: 28px;
            line-height: 1.12;
          }

          .home-studio-body {
            --type-body-lg-size: 14px;
            --type-body-lg-line: 1.5;
          }

          .home-studio-links {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 220px;
          }

          [data-service-grid] {
            display: grid;
            grid-template-columns: repeat(2, 167px);
            grid-template-rows: repeat(2, 185px);
            width: 350px;
            max-width: 350px;
            height: 402px;
            gap: 32px 16px;
            padding: 0;
            border: 0;
          }

          .home-studio .home-service-card {
            width: 167px;
            height: 185px;
            border: 0;
          }

          .home-studio .service-card--home-process .service-card__inner,
          .home-studio .service-card__copy {
            height: auto;
            gap: 16px;
          }

          .home-studio .service-card--home-process .service-card__inner {
            justify-content: flex-start;
          }

          .home-studio .service-card--home-process .service-card__icon {
            display: flex;
          }

          .home-studio .service-card--home-process .service-card__body,
          .home-studio .service-card--home-process .service-card__copy {
            align-items: flex-start;
          }

          .home-studio .service-card__title {
            width: 100%;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.4;
          }

          .home-studio .service-card__details {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            gap: 4px;
            font-size: 14px;
            line-height: 1.5;
          }

          .home-studio .service-card__details span {
            display: block;
          }

          .home-studio .service-card__details span:not(:last-child)::after {
            content: none;
          }

          .home-studio .service-card__icon img {
            width: 24px;
            height: 24px;
          }

          .home-studio {
            --type-body-link-size: 20px;
            --type-body-link-line: 1.3;
          }

          .home-project {
            width: 100% !important;
            margin-left: 0 !important;
          }

          .home-clients {
            gap: 32px;
          }

          .home-clients-copy {
            --type-body-lg-size: 16px;
            --type-body-lg-line: 1.375;
          }

          .home-clients .client-logo-grid {
            height: 896px;
          }

          .home-clients {
            height: 1242px;
            min-height: 0;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 64px;
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
