"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Mongdang",
    caption: "Character product experience",
    src: "/cloned/project-abstract-glass.png",
    className: "md:col-span-7 md:row-start-2 md:min-h-[74vh]",
    shift: "md:-ml-[8%]",
  },
  {
    title: "Shinhan Easy",
    caption: "Financial service UX",
    src: "/cloned/project-nextgen-ui.png",
    className: "md:col-span-4 md:col-start-9 md:row-start-3 md:min-h-[48vh]",
    shift: "md:ml-[10%]",
  },
  {
    title: "Crowd OH!",
    caption: "Crowdsourcing platform",
    src: "/cloned/project-creative-agency.png",
    className: "md:col-span-5 md:col-start-1 md:row-start-4 md:min-h-[58vh]",
    shift: "md:ml-[6%]",
  },
  {
    title: "macadamia",
    caption: "Learning product",
    src: "/cloned/project-tech-interface.png",
    className: "md:col-span-6 md:col-start-7 md:row-start-5 md:min-h-[64vh]",
    shift: "md:ml-[14%]",
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => (1 - amount) * from + amount * to;
const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef({ target: 0, current: 0, frame: 0 });

  useEffect(() => {
    const state = progressRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const section = sectionRef.current;
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height + window.innerHeight;
      return clamp((window.innerHeight - rect.top) / travel);
    };

    const render = () => {
      state.target = measure();
      state.current = reduceMotion ? state.target : lerp(state.current, state.target, 0.08);
      const progress = state.current;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const local = easeOut((progress - 0.08 - index * 0.13) / 0.3);
        const direction = index % 2 === 0 ? -1 : 1;
        const y = (1 - local) * (260 + index * 86);
        const x = (1 - local) * direction * (48 + index * 18);
        const rotate = (1 - local) * direction * (2.8 + index * 0.9);

        card.style.opacity = String(clamp(local * 1.18));
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${0.92 + local * 0.08})`;
      });

      imageRefs.current.forEach((image, index) => {
        if (!image) return;
        const y = (progress - 0.5) * (index % 2 === 0 ? -54 : 54);
        image.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      });

      state.frame = requestAnimationFrame(render);
    };

    state.frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(state.frame);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-header-theme="light"
      className="relative overflow-hidden bg-[#f7f7f2] px-5 py-24 text-[#111217] md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-y-20 md:grid-cols-12 md:grid-rows-[auto_620px_500px_620px_620px] md:gap-x-8 md:gap-y-20">
        <div className="md:col-span-8 md:col-start-2">
          <h2 className="text-[clamp(7rem,18vw,16rem)] font-semibold leading-[.78] tracking-[-.08em]">
            Work
          </h2>
        </div>

        <div className="md:col-span-4 md:col-start-9 md:row-start-2 md:pt-3">
          <p className="flex items-center gap-3 text-sm text-black/70">
            <span className="text-xl leading-none">+</span>
            Featured Projects
          </p>
          <p className="mt-12 text-[clamp(1.65rem,2.1vw,2.25rem)] leading-[1.16] tracking-[-.03em] text-black/86">
            <span className="block">Scroll through selected launches shaped from</span>
            <span className="block">product strategy, interface design, and brand systems.</span>
          </p>
          <a
            href="#contact"
            className="mt-12 inline-flex items-center gap-2 border-b border-black/35 pb-1 text-sm text-black/70 transition hover:border-black hover:text-black"
          >
            Browse all work
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        {projects.map((project, index) => (
          <a
            key={project.title}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            href="#contact"
            className={`group relative min-h-[420px] overflow-hidden bg-black opacity-0 will-change-transform ${project.className} ${project.shift}`}
          >
            <div
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={project.src}
                alt={`${project.title} visual`}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.58))]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white md:p-7">
              <div>
                <h3 className="text-3xl font-semibold tracking-[-.04em]">{project.title}</h3>
                <p className="mt-2 text-sm text-white/68">{project.caption}</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
