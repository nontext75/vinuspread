"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Play, X, Menu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const exoApeProjects = [
  {
    title: "Ottografie",
    subtitle: "Seamless Photographic Journey",
    src: "/cloned/project-abstract-glass.png",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
    widthClass: "w-full md:w-[45%]",
    parallaxSpeed: -60,
  },
  {
    title: "Amaterasu",
    subtitle: "Frontier Health Innovation",
    src: "/cloned/project-nextgen-ui.png",
    aspect: "aspect-[4/5] md:aspect-[16/10]",
    widthClass: "w-full md:w-[48%] md:ml-auto md:-mt-32",
    parallaxSpeed: 80,
  },
  {
    title: "Columbia Pictures",
    subtitle: "Celebrating a Century of Cinema",
    src: "/cloned/project-creative-agency.png",
    aspect: "aspect-[4/5] md:aspect-[4/3]",
    widthClass: "w-full md:w-[42%]",
    parallaxSpeed: -50,
  },
  {
    title: "Cambium",
    subtitle: "Pioneering Sustainable Solutions",
    src: "/cloned/project-tech-interface.png",
    aspect: "aspect-[4/5] md:aspect-[16/9]",
    widthClass: "w-full md:w-[52%] md:ml-auto md:-mt-20",
    parallaxSpeed: 70,
  },
];

const workLayouts = [
  "md:col-span-7 md:col-start-1",
  "md:col-span-5 md:col-start-8 md:mt-48",
  "md:col-span-5 md:col-start-2 md:mt-8",
  "md:col-span-6 md:col-start-7 md:mt-56",
];

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div className="inline-block" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* @ts-expect-error dynamic component ref binding */}
      <div ref={btnRef} className={`will-change-transform ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: reduceMotion ? 1 : 0.065,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      syncTouch: false,
    });

    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0, 0);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }

      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line");
      gsap.fromTo(
        heroLines,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );

      const introText = document.querySelector(".intro-p");
      if (introText) {
        gsap.fromTo(
          introText,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 75%",
            },
          }
        );
      }

      const reelBox = document.querySelector(".reel-box");
      if (reelBox) {
        gsap.fromTo(
          reelBox,
          { scale: 0.8, borderRadius: "2rem" },
          {
            scale: 1,
            borderRadius: "0rem",
            ease: "none",
            scrollTrigger: {
              trigger: reelRef.current,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        ".reel-media",
        { scale: 1.14, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: reelRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".hero-background",
        { yPercent: 0, scale: 1.08 },
        {
          yPercent: 18,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((element) => {
        const distance = Number(element.dataset.float || 8);
        gsap.fromTo(
          element,
          { yPercent: distance },
          {
            yPercent: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      });

      const parallaxCards = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxCards.forEach((card) => {
        const speed = parseFloat(card.getAttribute("data-parallax") || "0");
        const distance = Math.max(-14, Math.min(14, speed / 6));
        const img = card.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -distance, scale: 1.12 },
            {
              yPercent: distance,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-[#0d0d0d] font-sans antialiased selection:bg-[#0d0d0d] selection:text-[#ffffff]">
      <div className="pointer-events-none fixed inset-0 z-50 custom-noise opacity-[0.02]" />

      {/* Floating Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-24 items-center justify-between px-6 text-white md:px-16">
        <a href="#" className="text-xl font-semibold tracking-tight">
          Exo Ape
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-tight">
            <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
            <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
            <a href="#news" className="hover:opacity-60 transition-opacity">News</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </nav>

          <MagneticButton>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-5 py-2.5 backdrop-blur-md transition-colors hover:bg-white hover:text-black"
            >
              <span className="text-xs uppercase tracking-widest font-medium">Menu</span>
              <Menu className="size-4 transition-transform group-hover:rotate-90" />
            </button>
          </MagneticButton>
        </div>
      </header>

      {/* Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0d0d0d] p-8 md:p-24 text-[#ffffff]"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Exo Ape</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/20 p-4 hover:bg-white hover:text-[#0d0d0d] transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto">
              {["Work", "Studio", "News", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none uppercase hover:translate-x-4 transition-transform duration-300"
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col md:flex-row justify-between gap-6 border-t border-white/10 pt-8 text-sm opacity-60">
              <p>Digital Design Studio — Netherlands</p>
              <a href="mailto:hello@exoape.com" className="hover:underline text-white">hello@exoape.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION (Exo Ape Full-Bleed Background Image Setup) */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end px-6 pt-[calc(74vh-4px)] pb-[240px] md:px-16 md:pt-[calc(77vh-4px)] md:pb-[240px] font-sans bg-[#0d0d0d] text-white overflow-hidden">
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cloned/hero_bg.png"
            alt="Hero background"
            fill
            priority
            className="hero-background object-cover opacity-85 filter contrast-105 brightness-95 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        </div>

        <div className="z-10 w-full max-w-[1800px] space-y-2 relative">
          <h1 className="hero-line text-[clamp(6rem,19vw,19rem)] font-normal leading-[0.96] tracking-tighter font-sans block">
            We design
          </h1>
          <h1 className="hero-line text-[clamp(6rem,19vw,19rem)] font-normal leading-[0.96] tracking-tighter font-sans block">
            sustainable
          </h1>
          <h1 className="hero-line text-[clamp(6rem,19vw,19rem)] font-normal leading-[0.96] tracking-tighter font-sans block">
            growth
          </h1>

          <div className="mt-[128px] max-w-[1200px]">
            <p className="text-xl md:text-2xl lg:text-3xl leading-[1.4] text-white/90 font-sans font-medium tracking-tight">
              We design sustainable growth together with our clients.<br />
              From brand inception through refinement and expansion — we're with you at every stage.<br />
              We'll be your trusted partner.
            </p>
          </div>

          <div className="mt-[128px]">
            <MagneticButton>
              <a
                href="#"
                download
                className="group inline-flex items-center gap-2 text-xl md:text-2xl font-normal border-b border-white pb-1.5 hover:opacity-60 transition-opacity text-white"
              >
                <span>Download Brochure</span>
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 2. INTRO DESCRIPTION SECTION */}
      <section ref={introRef} className="py-32 md:py-44 px-6 md:px-16 bg-[#ffffff] border-t border-[#0d0d0d]/10">
        <div className="max-w-[1100px] mx-auto">
          <p className="intro-p text-[clamp(1.8rem,3.8vw,3.6rem)] font-light leading-[1.18] tracking-tight text-[#0d0d0d] font-sans">
            We focus on our clients&apos; essential value and elevate it with beauty.
            <br />
            Even as times change relentlessly, we stay grounded in what doesn&apos;t.
            <br />
            We create beautiful design that transcends structural and physical limits.
          </p>
          <div className="mt-12">
            <a
              href="#studio"
              className="inline-flex items-center gap-3 text-lg font-sans font-medium border-b border-[#0d0d0d] pb-1 hover:opacity-60 transition-opacity"
            >
              The Studio
              <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section id="work" className="py-32 px-6 md:px-16 bg-[#ffffff]">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-28 border-b border-[#0d0d0d]/15 pb-12">
            <div>
              <h2 className="font-sans text-[72px] font-normal leading-[0.9] tracking-[-0.05em] md:text-[180px]">Work</h2>
              <p className="mt-5 max-w-[650px] font-sans text-base leading-relaxed text-[#0d0d0d]/70 md:text-lg">
                We spread the virus of beauty throughout the world.
                <br />
                We believe the visual work we create will make tomorrow more beautiful than today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-28 md:grid-cols-12 md:gap-x-8 md:gap-y-44">
            {exoApeProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className={`group relative will-change-transform ${workLayouts[idx]}`}
              >
                <div data-parallax={project.parallaxSpeed} className={`relative ${project.aspect} overflow-hidden bg-[#f4f4f4]`}>
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover filter grayscale contrast-125 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                </div>

                <div className="mt-6 flex justify-between items-start font-sans">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight font-sans">{project.title}</h3>
                    <p className="text-sm text-[#0d0d0d]/60 font-sans mt-1">{project.subtitle}</p>
                  </div>
                  <span className="text-sm font-mono text-[#0d0d0d]/40">0{idx + 1}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-28 text-center">
            <MagneticButton>
              <a
                href="#work"
                className="inline-flex items-center gap-3 rounded-full border border-[#0d0d0d]/30 px-8 py-4 text-base font-sans font-medium transition-colors hover:bg-[#0d0d0d] hover:text-white"
              >
                Browse all work
                <ArrowUpRight className="size-5" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 4. WORK IN MOTION */}
      <section ref={reelRef} className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="reel-box relative aspect-[16/9] w-full overflow-hidden bg-[#1a1a1a] will-change-transform">
          <Image
            src="/cloned/about_img.png"
            alt="Exo Ape Playreel background"
            fill
            className="reel-media object-cover opacity-70 grayscale contrast-125 will-change-transform"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <MagneticButton>
              <button
                onClick={() => setIsPlaying(true)}
                className="group flex items-center justify-center size-28 rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-[#0d0d0d]"
              >
                <Play className="size-9 fill-current transition-transform group-hover:scale-105" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 5. STUDIO / CONTINUITY */}
      <section id="studio" className="bg-white px-6 py-28 text-[#0d0d0d] md:px-16 md:py-44">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
            <p data-reveal className="text-[clamp(3.5rem,6.5vw,8rem)] font-normal leading-[0.96]">
              Always there.
              <br />
              From the first idea
              <br />
              to the last detail.
            </p>

            <p data-reveal className="mt-12 max-w-[760px] text-lg leading-[1.55] md:text-xl">
              VINUSPREAD is a product management group that partners with clients from the very first idea through completion and beyond. We don&apos;t simply deliver outcomes—we help define the direction. With AI woven into our process, we bring a faster, more experimental approach backed by over 20 years of experience in UI/UX, branding, and product design.
            </p>

            <nav data-reveal aria-label="Studio links" className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-5 text-xl font-medium md:text-2xl">
              <a href="#studio" className="group inline-flex items-center gap-4">
                <span className="border-b border-transparent transition-colors duration-200 group-hover:border-current">Explore our services</span>
                <ArrowUpRight className="size-5 stroke-[1.4] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="#work" className="group inline-flex items-center gap-4">
                <span className="border-b border-transparent transition-colors duration-200 group-hover:border-current">See our work</span>
                <ArrowUpRight className="size-5 stroke-[1.4] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </nav>
        </div>

        <div className="mt-28 grid grid-cols-12 gap-5 md:mt-40 md:gap-8">
          <div data-float="5" className="relative col-span-8 aspect-[4/5] overflow-hidden will-change-transform md:col-span-5 md:col-start-1">
            <Image
              src="/cloned/about_vertical.png"
              alt="VINUSPREAD studio architecture"
              fill
              sizes="(max-width: 768px) 68vw, 40vw"
              className="object-cover"
            />
          </div>
          <div data-float="-8" className="relative col-span-9 col-start-4 mt-20 aspect-[5/4] overflow-hidden will-change-transform md:col-span-6 md:col-start-7 md:mt-48">
            <Image
              src="/cloned/about_img.png"
              alt="Architectural detail"
              fill
              sizes="(max-width: 768px) 75vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="bg-white px-6 pb-28 text-[#0d0d0d] md:px-16 md:pb-44">
        <h2 data-reveal className="pb-14 text-[clamp(3.75rem,7vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.06em] md:pb-20">
          What
          <br />
          we manage.
        </h2>

        <div className="border-t border-[#0d0d0d]/10">
          {[
            { title: "Product Strategy", detail: "Discovery — Roadmap — Service Structure — AI Opportunity Mapping" },
            { title: "Experience Design", detail: "UX/UI — Web — App — Interaction" },
            { title: "Brand Systems", detail: "Identity — Character & IP — Visual Direction — Content Rules" },
            { title: "Launch & Operation", detail: "CMS — SEO — Analytics — Continuous Improvement" },
          ].map((service) => (
            <a
              key={service.title}
              data-reveal
              href="#contact"
              className="group grid grid-cols-1 gap-3 border-b border-[#0d0d0d]/10 py-7 transition-colors duration-200 hover:bg-[#f7f7f7] md:grid-cols-12 md:items-center md:gap-8 md:px-3 md:py-9"
            >
              <h3 className="text-xl font-medium tracking-[-0.015em] md:col-span-4 md:text-2xl">
                {service.title}
              </h3>
              <p className="text-xl font-normal uppercase leading-relaxed tracking-normal md:col-span-7 md:text-2xl">
                {service.detail}
              </p>
              <ArrowUpRight className="hidden size-5 justify-self-end stroke-[1.3] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1 md:block" />
            </a>
          ))}
        </div>
      </section>

      {/* 7. IDEAS & INSIGHTS */}
      <section id="news" className="bg-white px-6 py-28 text-[#0d0d0d] md:px-16 md:py-44">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div data-reveal className="lg:sticky lg:top-32">
              <p className="text-[clamp(4rem,7vw,8.5rem)] font-normal leading-[0.9]">
                Ideas &amp;
                <br />
                Insights
              </p>
              <a href="#news" className="group mt-10 inline-flex items-center gap-3 text-xl font-medium">
                View all stories
                <ArrowUpRight className="size-5 stroke-[1.4] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#0d0d0d]/10 lg:col-span-7">
            {[
              {
                title: "Why brand color should never be chosen by instinct alone",
                excerpt: "Color is more than preference. It shapes recognition, emotion, and the way a brand is remembered across every touchpoint.",
                date: "2026.04.20",
                image: "/cloned/project-branding-luxury.png",
              },
              {
                title: "What happens when design has no governing principle",
                excerpt: "A clear design principle keeps every decision moving in one direction, even when teams, products, and expectations change.",
                date: "2026.05.22",
                image: "/cloned/project-nextgen-ui.png",
              },
              {
                title: "Designing AI into the process, not onto the surface",
                excerpt: "The strongest use of AI is rarely the most visible one. Its real value appears in how teams explore, decide, and improve.",
                date: "2026.06.12",
                image: "/cloned/project-tech-interface.png",
              },
            ].map((article) => (
              <a
                key={article.title}
                data-reveal
                href="#contact"
                className="group grid grid-cols-[88px_1fr] gap-6 border-b border-[#0d0d0d]/10 py-9 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-9 md:py-12"
              >
                <div className="relative size-[88px] overflow-hidden rounded-full md:size-[120px]">
                  <Image src={article.image} alt="" fill sizes="120px" className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105" />
                </div>
                <div>
                  <p className="mb-4 text-base font-normal uppercase">Insight · {article.date}</p>
                  <h3 className="text-2xl font-medium leading-[1.15] md:text-4xl">{article.title}</h3>
                  <p className="mt-5 max-w-[680px] text-lg font-normal leading-[1.55]">{article.excerpt}</p>
                </div>
                <ArrowUpRight className="hidden size-6 stroke-[1.2] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 md:block" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER SECTION */}
      <Footer />

      {/* FULLSCREEN VIDEO MODAL */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 rounded-full bg-white/10 p-4 hover:bg-[#eae8e4] hover:text-[#0d0d0d] transition-colors"
            >
              <X className="size-6" />
            </button>
            <div className="w-full max-w-[1280px] aspect-[16/9] relative overflow-hidden bg-zinc-900 rounded-[1rem] ring-1 ring-white/10">
              <Image
                src="/cloned/about_img.png"
                alt="Exo Ape Playreel"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-8 text-center">
                <p className="text-xs uppercase tracking-widest text-[#eae8e4]/60 mb-2">Exo Ape PlayReel Stream</p>
                <h3 className="text-2xl font-light max-w-[480px]">Interactive PlayReel video stream simulation.</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




