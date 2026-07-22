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
          "[data-hero-reveal], [data-reveal], [data-intro-line], [data-intro-link], [data-project-media], [data-project-image], [data-service-card], .home-hero-content, .home-portfolio-column, .home-studio-content, .home-clients, .home-story-list",
        ),
        { clearProps: "all" },
      );
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.72,
          stagger: 0.095,
          ease: "power4.out",
          clearProps: "transform",
        },
      );

      gsap.fromTo(
        ".home-portfolio-title-line",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.72,
          stagger: 0.105,
          ease: "power4.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".home-portfolio-heading",
            start: "top 76%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".home-portfolio-copy-line",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.64,
          delay: 0.28,
          stagger: 0.075,
          ease: "power3.out",
          clearProps: "transform",
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
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.64,
            delay: (index % 3) * 0.035,
            ease: "power4.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const introTimeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: ".home-intro",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
        },
      });

      introTimeline
        .set("[data-intro-line], [data-intro-link]", { opacity: 1, y: 84 })
        .to("[data-intro-line]", { y: 0, duration: 0.32, stagger: 0.035 }, 0.08)
        .to("[data-intro-link]", { y: 0, duration: 0.24 }, 0.28)
        .to(".home-intro-content", { y: -720, duration: 0.34, ease: "power3.in" }, 0.78);

      gsap.fromTo(
        ".home-studio-content [data-service-card]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.72,
          stagger: 0.085,
          ease: "power4.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".home-studio-content",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".home-clients > *",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.64,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".home-clients",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
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
          .fromTo("[data-hero-image]", { scale: 1.08, yPercent: -4 }, { scale: 1.03, yPercent: 8 }, 0);

        gsap.utils.toArray<HTMLElement>(".home-portfolio-canvas--desktop [data-project-card]").forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 96,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: index * 0.075,
              ease: "power4.out",
              overwrite: "auto",
              clearProps: "transform",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 62%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
          const image = card.querySelector<HTMLElement>("[data-project-image]");
          if (!image) return;

          gsap.set(image, { yPercent: 0, scale: 1.02 });
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
