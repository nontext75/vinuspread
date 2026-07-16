"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Play, X, Menu, Compass, PanelsTopLeft, Shapes, RefreshCw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const vinuspreadProjects = [
  {
    title: "Mongdang",
    subtitle: "Character · Brand Experience",
    src: "/vinus/work/mongdang.png",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
    widthClass: "w-full md:w-[45%]",
    parallaxSpeed: -60,
  },
  {
    title: "Shinhan Easy",
    subtitle: "Digital Experience · Web",
    src: "/vinus/work/shinhan-easy.jpg",
    aspect: "aspect-[4/5] md:aspect-[16/10]",
    widthClass: "w-full md:w-[48%] md:ml-auto md:-mt-32",
    parallaxSpeed: 80,
  },
  {
    title: "Crowd OH!",
    subtitle: "Crowdsourcing Platform · Web",
    src: "/vinus/work/crowd-oh.jpg",
    aspect: "aspect-[4/5] md:aspect-[4/3]",
    widthClass: "w-full md:w-[42%]",
    parallaxSpeed: -50,
  },
  {
    title: "macadamia",
    subtitle: "Product Strategy · UX/UI · Web",
    src: "/vinus/work/macadamia.png",
    aspect: "aspect-[4/5] md:aspect-[16/9]",
    widthClass: "w-full md:w-[52%] md:ml-auto md:-mt-20",
    parallaxSpeed: 70,
  },
  {
    title: "Budongsan114 Mediate BIZsolution",
    subtitle: "Product Strategy · UX/UI · Web",
    src: "/vinus/work/budongsan114.jpg",
    aspect: "aspect-[4/5] md:aspect-[5/6]",
    widthClass: "w-full md:w-[38%]",
    parallaxSpeed: -45,
  },
  {
    title: "DongA On book",
    subtitle: "Branding · Digital Design · Web",
    src: "/vinus/work/donga-on-book.jpg",
    aspect: "aspect-[4/5] md:aspect-[16/10]",
    widthClass: "w-full md:w-[58%] md:ml-auto",
    parallaxSpeed: 65,
  },
];

const workLayouts = [
  "md:col-span-4 md:col-start-1 md:max-w-[600px] md:justify-self-start",
  "md:col-span-3 md:col-start-6 md:mt-24 md:max-w-[460px] md:justify-self-center",
  "md:col-span-3 md:col-start-10 md:mt-48 md:max-w-[460px] md:justify-self-end",
  "md:col-span-3 md:col-start-1 md:mt-8 md:max-w-[460px] md:justify-self-start",
  "md:col-span-4 md:col-start-5 md:mt-32 md:max-w-[600px] md:justify-self-center",
  "md:col-span-3 md:col-start-10 md:mt-4 md:max-w-[460px] md:justify-self-end",
  "md:col-span-4 md:col-start-1 md:mt-16 md:max-w-[600px] md:justify-self-start",
  "md:col-span-3 md:col-start-6 md:mt-40 md:max-w-[460px] md:justify-self-center",
  "md:col-span-3 md:col-start-10 md:mt-16 md:max-w-[460px] md:justify-self-end",
  "md:col-span-4 md:col-start-5 md:mt-24 md:max-w-[600px] md:justify-self-center",
];

const serviceAreas = [
  { title: "Product Strategy", details: ["Discovery", "Roadmap", "AI Opportunity"], icon: Compass },
  { title: "Experience Design", details: ["UX/UI", "Web", "App", "Interaction"], icon: PanelsTopLeft },
  { title: "Brand Systems", details: ["Identity", "Visual Direction", "Content"], icon: Shapes },
  { title: "Launch & Operation", details: ["CMS", "SEO", "Analytics", "Improvement"], icon: RefreshCw },
];

const clientWork = [
  { name: "DongA On book", scope: "Branding · Digital Design · Web Development" },
  { name: "Samyang", scope: "Digital Design · Web Development" },
  { name: "Lotte Cinema", scope: "UX/UI Design · App Development" },
  { name: "Samsung Electronics", scope: "Digital Design · Creative Direction" },
  { name: "Seoul Paik Hospital", scope: "Digital Design · Web Development" },
  { name: "Realty 114", scope: "Strategy · UX/UI Design · App Development" },
  { name: "Macadamia", scope: "Strategy · UX/UI Design" },
  { name: "Smart City Jungnang", scope: "Strategy · Digital Design" },
  { name: "CJ CheilJedang", scope: "Digital Design · Creative Direction" },
  { name: "Hankook Tire", scope: "Digital Design · Web Development" },
  { name: "Nexon", scope: "Brand Identity · Digital Design" },
  { name: "LG Electronics", scope: "Digital Design · UX/UI" },
];

const insights = [
  {
    title: "브랜드 컬러, 감으로 고르면 안 되는 이유",
    excerpt: "컬러는 단순한 취향이 아니라 브랜드의 인식과 감정을 결정합니다. 작은 변화도 사람들이 브랜드를 받아들이는 방식 전체에 영향을 줄 수 있습니다.",
    date: "2026.04.20",
    image: "/vinus/insights/brand-color.jpg",
    href: "https://vinus-website.vercel.app/story/post-1779326372529",
  },
  {
    title: "디자인 원칙이 없으면 생기는 일들",
    excerpt: "명확한 원칙이 없으면 디자인은 그때그때의 피드백과 취향에 흔들립니다. 일관된 기준은 모든 결정을 한 방향으로 움직이게 합니다.",
    date: "2026.05.22",
    image: "/vinus/insights/design-principles.png",
    href: "https://vinus-website.vercel.app/story/post-1779449177212",
  },
  {
    title: "UX 라이팅, 버튼 하나부터 시작하는 법",
    excerpt: "사용자가 가장 자주 마주치는 짧은 문장부터 명확하게 설계합니다. 버튼 하나의 표현도 경험의 방향과 다음 행동을 결정합니다.",
    date: "2026.05.01",
    image: "/vinus/insights/ux-writing.png",
    href: "https://vinus-website.vercel.app/story/ux-3",
  },
];

const textActionClass =
  "group inline-flex items-center gap-3 border-b border-current pb-1.5 text-[clamp(1.125rem,1.4vw,1.5rem)] font-normal leading-none transition-opacity duration-200 hover:opacity-55";

const textActionIconClass =
  "size-5 stroke-[1.4] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1";

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
  const [showIntro, setShowIntro] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShowIntro(false);
      return;
    }

    const timeout = window.setTimeout(() => setShowIntro(false), 700);
    return () => window.clearTimeout(timeout);
  }, []);

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

      gsap.fromTo(
        ".reel-media",
        { scale: 1.12, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
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
      <AnimatePresence>
        {showIntro && (
          <motion.div
            aria-hidden="true"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0d0d0d] text-white"
          >
            <div className="flex flex-col items-center gap-5">
              <motion.span
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl font-medium tracking-[-0.03em] md:text-2xl"
              >
                vinuspread
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-px w-28 origin-left bg-white/70"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-50 custom-noise opacity-[0.02]" />

      {/* Floating Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-24 items-center justify-between px-6 text-white mix-blend-difference md:px-16">
        <a href="/" className="text-xl font-semibold tracking-tight">
          vinuspread
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-tight">
            <a href="/work" className="hover:opacity-60 transition-opacity">Work</a>
            <a href="/studio" className="hover:opacity-60 transition-opacity">Studio</a>
            <a href="/news" className="hover:opacity-60 transition-opacity">News</a>
            <a href="/contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </nav>

          <MagneticButton>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3 rounded-full border border-white/40 px-5 py-2.5 transition-colors hover:bg-white hover:text-black"
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
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0d0d0d] text-[#ffffff]"
          >
            <div className="flex h-24 shrink-0 items-center justify-between px-6 md:px-16">
              <span className="text-xl font-semibold tracking-tight">vinuspread</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#0d0d0d]"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-6 px-6 md:px-16">
              {["Work", "Studio", "News", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
                >
                  <a
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none uppercase hover:translate-x-4 transition-transform duration-300"
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="mx-6 mb-8 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 text-sm opacity-60 md:mx-16 md:mb-12 md:flex-row">
              <p>Product Management &amp; Design Studio — Seoul, Korea</p>
              <a href="mailto:vinus@vinus.co.kr" className="hover:underline text-white">vinus@vinus.co.kr</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-start px-6 pt-[28dvh] pb-[250px] md:px-16 md:pt-[29dvh] md:pb-[250px] font-sans bg-[#0d0d0d] text-white overflow-hidden">
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cloned/about_img.png"
            alt="Bright modern architecture"
            fill
            priority
            className="hero-background object-cover contrast-105 brightness-105 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px]">
          <div className="flex flex-col items-start gap-[90px]">
            <p className="hero-line text-[clamp(1.125rem,1.4vw,1.5rem)] font-normal leading-[1.5] text-white">
              <span className="block">We uncover the ideas that matter most to people and businesses.</span>
              <span className="block">We shape them into clear, meaningful experiences built for change.</span>
              <span className="block">We create lasting value through design that grows with you.</span>
            </p>

            <div aria-hidden="true" className="h-5 w-[120px] bg-white" />

            <div>
              <h1 className="hero-line text-[clamp(7.2rem,22.8vw,22.8rem)] font-normal leading-[0.9] tracking-tighter font-sans block">
                We design
              </h1>
              <h1 className="hero-line text-[clamp(7.2rem,22.8vw,22.8rem)] font-normal leading-[0.9] tracking-tighter font-sans block">
                sustainable
              </h1>
              <h1 className="hero-line text-[clamp(7.2rem,22.8vw,22.8rem)] font-normal leading-[0.9] tracking-tighter font-sans block">
                growth
              </h1>
            </div>
          </div>

          <div className="mt-[128px] max-w-[1500px]">
            <p className="text-[clamp(1.125rem,1.4vw,1.5rem)] leading-[1.5] text-white/90 font-sans font-medium tracking-tight">
              We design sustainable growth together with our clients.<br className="hidden lg:block" />
              From brand inception through refinement and expansion — we're with you at every stage.<br className="hidden lg:block" />
              We'll be your trusted partner.
            </p>
          </div>

          <div className="mt-[128px]">
            <MagneticButton>
              <a
                href="#"
                download
                className={`${textActionClass} text-white`}
              >
                <span>Download Brochure</span>
                <ArrowUpRight className={textActionIconClass} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 2. INTRO DESCRIPTION SECTION */}
      <section ref={introRef} className="py-32 md:py-44 px-6 md:px-16 bg-[#ffffff] border-t border-[#0d0d0d]/10">
        <div className="max-w-[1300px] mx-auto">
          <p className="intro-p text-[clamp(1.8rem,3.8vw,3.6rem)] font-light leading-[1.18] tracking-tight text-[#0d0d0d] font-sans">
            We focus on our clients&apos; essential value and elevate it with beauty.
            <br />
            Even as times change relentlessly, we stay grounded in what doesn&apos;t.
            <br />
            We create beautiful design that transcends structural and physical limits.
          </p>
          <div className="mt-12">
            <a
                href="/studio"
              className={textActionClass}
            >
              The Studio
              <ArrowUpRight className={textActionIconClass} />
            </a>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section id="work" className="overflow-hidden bg-[#ffffff] py-32">
        <div>
          <div className="mx-6 mb-28 border-b border-[#0d0d0d]/15 pb-12 md:mx-16">
            <div className="max-w-[1680px]">
              <h2 className="font-sans text-[clamp(3.25rem,5.8vw,7rem)] font-normal leading-[0.92] tracking-[-0.05em]">Work</h2>
              <p className="mt-5 max-w-[900px] font-sans text-[clamp(1.125rem,1.4vw,1.5rem)] leading-[1.5] text-[#0d0d0d]/70">
                We spread the virus of beauty throughout the world.
                <br />
                We believe the visual work we create will make tomorrow more beautiful than today.
              </p>
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-y-24 px-6 md:grid-cols-12 md:gap-x-[clamp(1.5rem,2.4vw,3.25rem)] md:gap-y-20 md:px-16">
            {vinuspreadProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className={`group relative w-full will-change-transform ${workLayouts[idx]}`}
              >
                <div data-parallax={project.parallaxSpeed} className={`relative ${project.aspect} overflow-hidden bg-[#f4f4f4]`}>
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                </div>

                <div className="mt-6 font-sans">
                  <div>
                    <h3 className="text-xl font-medium tracking-tight font-sans md:text-2xl">{project.title}</h3>
                    <p className="text-sm text-[#0d0d0d]/60 font-sans mt-1">{project.subtitle}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-36 px-6 text-center md:px-16">
            <MagneticButton>
              <a
                href="/work"
                className={textActionClass}
              >
                Browse all work
                <ArrowUpRight className={textActionIconClass} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 4. WORK IN MOTION */}
      <section ref={reelRef} className="relative overflow-hidden bg-white text-white">
        <div className="relative h-[75svh] min-h-[520px] w-full overflow-hidden md:h-[92svh] md:min-h-[720px]">
          <Image
            src="/cloned/about_img.png"
            alt="vinuspread playreel background"
            fill
            sizes="100vw"
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
      <section id="studio" className="bg-white px-6 py-20 text-[#0d0d0d] md:px-16 md:py-28">
        <div className="relative hidden min-h-[820px] lg:block">
          <div className="absolute inset-0 z-10 mx-auto flex max-w-[1320px] flex-col items-center justify-center text-center">
            <h2 data-reveal className="text-[clamp(3.25rem,5.8vw,7rem)] font-normal leading-[0.92] tracking-[-0.05em]">
              How we work
            </h2>
            <p data-reveal className="mx-auto mt-8 whitespace-nowrap text-center text-[clamp(2rem,3.2vw,3.75rem)] font-normal leading-[1.02] text-[#0d0d0d]/75">
              Always there, from first idea to final detail.
            </p>

            <p data-reveal className="mt-8 max-w-[720px] text-base leading-[1.55] md:text-lg">
              Vinuspread is a product management group that partners with clients from the first idea through completion and beyond. We help define the direction, using AI to work faster and more experimentally—backed by over 20 years of experience in UI/UX, branding, and product design.
            </p>

            <div data-reveal className="mt-10 grid w-full max-w-[1120px] grid-cols-4 border-y border-[#0d0d0d]/10 text-left">
              {serviceAreas.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div key={service.title} className="border-r border-[#0d0d0d]/10 px-5 py-6 last:border-r-0">
                    <ServiceIcon aria-hidden="true" className="size-7 stroke-[1.25] text-[#0d0d0d]/55" />
                    <h3 className="mt-8 text-[clamp(1.125rem,1.4vw,1.5rem)] font-normal leading-[1.1]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm uppercase leading-[1.65] text-[#0d0d0d]/65 xl:text-[15px]">
                      {service.details.map((detail) => <span key={detail} className="block">{detail}</span>)}
                    </p>
                  </div>
                );
              })}
            </div>

            <nav data-reveal aria-label="Studio links" className="mt-10 flex flex-wrap justify-center gap-x-9 gap-y-4">
              <a href="/studio" className={textActionClass}>
                <span>Explore our services</span>
                <ArrowUpRight className={textActionIconClass} />
              </a>
              <a href="/work" className={textActionClass}>
                <span>See our work</span>
                <ArrowUpRight className={textActionIconClass} />
              </a>
            </nav>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <h2 data-reveal className="text-[clamp(3.25rem,12vw,5rem)] font-normal leading-[0.92] tracking-[-0.05em]">
              How we work
            </h2>
            <p data-reveal className="mx-auto mt-7 whitespace-nowrap text-center text-[clamp(1.25rem,5vw,2rem)] font-normal leading-[1.02] text-[#0d0d0d]/75">
              Always there, from first idea to final detail.
            </p>
            <p data-reveal className="mt-8 max-w-[680px] text-base leading-[1.55]">
              Vinuspread is a product management group that partners with clients from the first idea through completion and beyond. We help define the direction, using AI to work faster and more experimentally—backed by over 20 years of experience in UI/UX, branding, and product design.
            </p>

            <div data-reveal className="mt-9 grid w-full grid-cols-2 border-l border-t border-[#0d0d0d]/10 text-left">
              {serviceAreas.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div key={service.title} className="border-b border-r border-[#0d0d0d]/10 px-4 py-5">
                    <ServiceIcon aria-hidden="true" className="size-6 stroke-[1.25] text-[#0d0d0d]/55" />
                    <h3 className="mt-6 text-base font-normal leading-[1.15]">{service.title}</h3>
                    <p className="mt-3 text-[13px] uppercase leading-[1.65] text-[#0d0d0d]/65">
                      {service.details.map((detail) => <span key={detail} className="block">{detail}</span>)}
                    </p>
                  </div>
                );
              })}
            </div>

            <nav data-reveal aria-label="Studio links" className="mt-9 flex flex-wrap justify-center gap-6">
              <a href="/studio" className={textActionClass}>Explore our services <ArrowUpRight className={textActionIconClass} /></a>
              <a href="/work" className={textActionClass}>See our work <ArrowUpRight className={textActionIconClass} /></a>
            </nav>
          </div>

        </div>

      </section>

      {/* 6. CLIENTS */}
      <section aria-labelledby="clients-heading" className="bg-[#1a1a1a] px-6 py-28 text-white md:px-16 md:py-44">
        <h2
          id="clients-heading"
          data-reveal
          className="max-w-[1500px] text-[clamp(3.25rem,5.8vw,7rem)] font-normal leading-[0.92] tracking-[-0.05em]"
        >
          Clients we&apos;ve
          <br />
          partnered with.
        </h2>

        <div className="mt-14 grid grid-cols-2 border-l border-t border-white/12 md:mt-20 md:grid-cols-4 xl:grid-cols-8">
          {clientWork.map((client) => (
            <div
              key={client.name}
              data-reveal
              className="flex min-h-32 flex-col justify-between border-b border-r border-white/12 p-5 md:min-h-40 xl:min-h-44"
            >
              <span className="text-[clamp(1rem,1.25vw,1.35rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white/85">{client.name}</span>
              <span className="mt-8 text-[10px] uppercase leading-[1.45] text-white/40">{client.scope}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. IDEAS & INSIGHTS */}
      <section id="news" className="bg-white px-6 py-28 text-[#0d0d0d] md:px-16 md:py-44">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-5">
            <div data-reveal className="lg:sticky lg:top-32">
              <h2 className="max-w-full text-[clamp(3.25rem,5.8vw,7rem)] font-normal leading-[0.92]">
                <span className="block whitespace-nowrap">Ideas &amp;</span>
                <span className="block whitespace-nowrap">Insights</span>
              </h2>
              <a href="/news" className={`${textActionClass} mt-10`}>
                View all stories
                <ArrowUpRight className={textActionIconClass} />
              </a>
            </div>
          </div>

          <div className="border-t border-[#0d0d0d]/10 lg:col-span-7">
            {insights.map((article) => (
              <a
                key={article.title}
                data-reveal
                href={article.href}
                className="group grid grid-cols-[88px_1fr] gap-6 border-b border-[#0d0d0d]/10 py-9 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-9 md:py-12"
              >
                <div className="relative size-[88px] overflow-hidden rounded-full md:size-[120px]">
                  <Image src={article.image} alt="" fill sizes="120px" className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105" />
                </div>
                <div>
                  <p className="mb-4 text-sm font-normal uppercase text-[#0d0d0d]/55">Insight · {article.date}</p>
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
                alt="vinuspread playreel"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-8 text-center">
                <p className="text-xs uppercase tracking-widest text-[#eae8e4]/60 mb-2">vinuspread PlayReel Stream</p>
                <h3 className="text-2xl font-light max-w-[480px]">Interactive PlayReel video stream simulation.</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




