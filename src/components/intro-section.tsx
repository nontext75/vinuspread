"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => (1 - amount) * from + amount * to;
const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tallImageRef = useRef<HTMLDivElement>(null);
  const wideImageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef({ target: 0, current: 0, frame: 0 });

  useEffect(() => {
    const state = progressRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const section = sectionRef.current;
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      return clamp((window.innerHeight - rect.top) / (rect.height + window.innerHeight));
    };

    const render = () => {
      state.target = measure();
      state.current = reduceMotion ? state.target : lerp(state.current, state.target, 0.09);
      const progress = state.current;

      if (tallImageRef.current) {
        const local = easeOut((progress - 0.04) / 0.34);
        tallImageRef.current.style.opacity = String(local);
        tallImageRef.current.style.transform = `translate3d(${(1 - local) * -70}px, ${
          (1 - local) * 120
        }px, 0) scale(${0.94 + local * 0.06})`;
      }

      if (wideImageRef.current) {
        const local = easeOut((progress - 0.14) / 0.34);
        wideImageRef.current.style.opacity = String(local);
        wideImageRef.current.style.transform = `translate3d(${(1 - local) * 90}px, ${
          (1 - local) * 170
        }px, 0) scale(${0.92 + local * 0.08})`;
      }

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const local = easeOut((progress - 0.12 - index * 0.065) / 0.28);
        item.style.opacity = String(local);
        item.style.transform = `translate3d(0, ${(1 - local) * 76}px, 0)`;
      });

      state.frame = requestAnimationFrame(render);
    };

    state.frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(state.frame);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-header-theme="light"
      className="relative overflow-hidden bg-white px-5 py-28 md:px-12 md:py-40"
    >
      <div className="grid gap-16 md:grid-cols-[.45fr_.55fr]">
        <div className="relative min-h-[620px]">
          <div ref={tallImageRef} className="relative h-[520px] w-[58%] overflow-hidden opacity-0 will-change-transform">
            <Image
              src="/cloned/about_vertical.png"
              alt="Vinuspread studio detail"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
          <div
            ref={wideImageRef}
            className="absolute bottom-0 left-[34%] h-[500px] w-[50%] overflow-hidden bg-black/5 opacity-0 will-change-transform"
          >
            <Image
              src="/cloned/about_img.png"
              alt="Vinuspread workspace detail"
              fill
              sizes="36vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative pt-4">
          <h2
            ref={(node) => {
              itemRefs.current[0] = node;
            }}
            className="max-w-[760px] text-[clamp(3.4rem,5.8vw,6.5rem)] font-semibold leading-[.92] tracking-[-.065em] opacity-0 will-change-transform"
          >
            <span className="block">Always there.</span>
            <span className="block">From the first idea to</span>
            <span className="block">the last detail.</span>
          </h2>
          <p
            ref={(node) => {
              itemRefs.current[1] = node;
            }}
            className="mt-12 max-w-[760px] text-xl leading-9 text-black/72 opacity-0 will-change-transform"
          >
            Vinuspread is a product management group that partners with clients from the
            very first idea through to completion and beyond. We don't just deliver
            outcomes. We help define the direction. Working with AI as our methodology,
            we bring a faster, more experimental approach to every project backed by over
            20 years of experience in UI/UX, branding, and product design.
          </p>
          <p
            ref={(node) => {
              itemRefs.current[2] = node;
            }}
            className="mt-10 max-w-[760px] text-base leading-8 text-black/42 opacity-0 will-change-transform"
          >
            Vinuspread is a product management group that partners through the entire journey from project inception to final launch. We go beyond simple delivery, designing the future roadmap and long-term direction of the brand together.
          </p>
          <div
            ref={(node) => {
              itemRefs.current[3] = node;
            }}
            className="mt-20 space-y-5 text-2xl font-semibold tracking-[-.04em] opacity-0 will-change-transform"
          >
            <a href="#services" className="flex w-fit items-center gap-4">
              Explore our Services <ArrowUpRight className="size-5" />
            </a>
            <a href="#work" className="flex w-fit items-center gap-4">
              See our Work <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
