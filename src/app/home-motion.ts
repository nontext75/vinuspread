"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseHomeMotionParams = {
  rootRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
  projectSpeeds: number[];
};

export function useHomeMotion({
  rootRef,
  heroRef,
  reduceMotion,
  projectSpeeds,
}: UseHomeMotionParams) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      gsap.set(
        root.querySelectorAll(
          "[data-hero-reveal], [data-reveal], [data-project-media], [data-project-image], [data-service-card], .home-hero-content, .home-portfolio-column, .home-studio-content, .home-clients, .home-story-list",
        ),
        { clearProps: "all" },
      );
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".home-portfolio-title-line",
        { y: 120, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.05,
          stagger: 0.105,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".home-portfolio-heading",
            start: "top 76%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".home-portfolio-copy-line",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          delay: 0.28,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-portfolio-heading",
            start: "top 76%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.82,
            delay: (index % 3) * 0.035,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, rootRef);

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add("(min-width: 768px)", () => {
      const desktopContext = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        });

        heroTimeline
          .fromTo("[data-hero-image]", { scale: 1.14, yPercent: -8 }, { scale: 1.04, yPercent: 18 }, 0)
          .to(".home-hero-content", { yPercent: -14 }, 0);

        const heroTitleLines = root.querySelectorAll(".home-hero-title span");

        if (heroTitleLines.length >= 3) {
          heroTimeline
            .to(".home-hero-title span:nth-child(1)", { xPercent: -1.1 }, 0)
            .to(".home-hero-title span:nth-child(2)", { xPercent: 0.8 }, 0)
            .to(".home-hero-title span:nth-child(3)", { xPercent: -0.7 }, 0);
        } else {
          heroTimeline.to(".home-hero-title", { xPercent: -0.7 }, 0);
        }

        gsap.fromTo(
          ".home-intro-copy",
          { y: 120 },
          {
            y: -64,
            ease: "none",
            scrollTrigger: { trigger: ".home-intro", start: "top bottom", end: "bottom top", scrub: 1.6 },
          },
        );

        gsap.fromTo(
          ".home-portfolio-heading > div",
          { y: 120 },
          {
            y: -84,
            ease: "none",
            scrollTrigger: { trigger: ".home-portfolio", start: "top bottom", end: "top top", scrub: 1.45 },
          },
        );

        gsap.utils.toArray<HTMLElement>(".home-portfolio-canvas--desktop [data-project-card]").forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 160,
              opacity: 0,
              scale: 0.985,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.05,
              delay: index * 0.055,
              ease: "power4.out",
              overwrite: "auto",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 62%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card, index) => {
          const image = card.querySelector<HTMLElement>("[data-project-image]");
          if (!image) return;

          const speed = projectSpeeds[index] ?? 8;
          const distance = Math.max(8, Math.min(16, Math.abs(speed) * 1.25));
          const direction = Math.sign(speed || 1);

          gsap.fromTo(
            image,
            { yPercent: direction * -distance, scale: 1.12 },
            {
              yPercent: direction * distance,
              scale: 1.18,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.65 },
            },
          );
        });
      }, rootRef);

      return () => {
        desktopContext.revert();
      };
    });

    return () => {
      mediaQuery.revert();
      context.revert();
    };
  }, [heroRef, projectSpeeds, reduceMotion, rootRef]);
}
