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

const restingSelector = [
  "[data-hero-reveal]",
  "[data-reveal]",
  "[data-intro-line]",
  "[data-intro-link]",
  "[data-project-card]",
  "[data-project-image]",
  "[data-reel-image]",
  "[data-service-card]",
  ".home-clients-title-block > *",
  ".home-story-list",
  "[data-service-grid]",
].join(", ");

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
      gsap.set(root.querySelectorAll(restingSelector), {
        opacity: 1,
        visibility: "visible",
        transform: "none",
        clipPath: "none",
      });
      return;
    }

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          "[data-motion='hero-lead']",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 0.78, clearProps: "transform,opacity,visibility" },
          0,
        )
        .fromTo(
          "[data-motion='hero-rule']",
          { autoAlpha: 0, scaleX: 0, transformOrigin: "left center" },
          { autoAlpha: 1, scaleX: 1, duration: 0.68, clearProps: "transform,opacity,visibility" },
          0.12,
        )
        .fromTo(
          "[data-motion='hero-title']",
          { autoAlpha: 0, yPercent: 78, rotate: 1.5, clipPath: "inset(0 0 100% 0)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotate: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.02,
            stagger: 0.075,
            clearProps: "transform,opacity,visibility,clipPath",
          },
          0.2,
        )
        .fromTo(
          "[data-motion='hero-summary'], [data-motion='hero-cta']",
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            stagger: 0.09,
            clearProps: "transform,opacity,visibility",
          },
          0.52,
        );

      gsap.utils
        .toArray<HTMLElement>(
          "[data-reveal], .home-clients-title-block > *, .home-story-list, [data-service-grid]",
        )
        .forEach((element, index) => {
          gsap.from(element, {
            y: 56,
            duration: 0.84,
            delay: (index % 4) * 0.035,
            ease: "power4.out",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          });
        });

      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 48,
          duration: 0.76,
          delay: index * 0.045,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.fromTo(
        "[data-reel-image]",
        { yPercent: -12, scale: 1.14 },
        {
          yPercent: 12,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-reel",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, rootRef);

    const media = gsap.matchMedia();

    media.add("(max-width: 767px), (pointer: coarse)", () => {
      const mobileContext = gsap.context(() => {
        gsap.fromTo(
          "[data-intro-line], [data-intro-link]",
          { y: 80 },
          {
            y: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".home-intro",
              start: "top 82%",
              end: "top 28%",
              scrub: 0.9,
            },
          },
        );

        const projectCanvas = window.matchMedia("(max-width: 1024px)").matches
          ? ".home-portfolio-canvas--mobile"
          : ".home-portfolio-canvas--desktop";
        animateProjects(`${projectCanvas} [data-project-card]`, 2.5, 1.06, 0.9);
      }, rootRef);

      return () => mobileContext.revert();
    });

    media.add("(min-width: 768px) and (pointer: fine)", () => {
      const desktopContext = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-image]",
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1.03,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.15,
            },
          },
        );

        if (window.matchMedia("(max-width: 1024px)").matches) {
          gsap.fromTo(
            "[data-intro-line], [data-intro-link]",
            { y: 144 },
            {
              y: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: ".home-intro",
                start: "top 76%",
                end: "top 18%",
                scrub: 1,
              },
            },
          );
        }

        const projectCanvas = window.matchMedia("(max-width: 1024px)").matches
          ? ".home-portfolio-canvas--mobile"
          : ".home-portfolio-canvas--desktop";
        animateProjects(`${projectCanvas} [data-project-card]`, 3.5, 1.08, 1.1);
      }, rootRef);

      return () => {
        desktopContext.revert();
      };
    });

    function animateProjects(selector: string, travel: number, scale: number, scrub: number) {
      gsap.utils.toArray<HTMLElement>(selector).forEach((card, index) => {
        gsap.from(card, {
          y: selector.includes("--mobile") ? 88 : 96,
          duration: selector.includes("--mobile") ? 0.86 : 0.95,
          delay: (index % 6) * 0.055,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        const image = card.querySelector<HTMLElement>("[data-project-image]");
        if (!image) return;

        const direction = (projectSpeeds[index] ?? 0) < 0 ? -1 : 1;
        gsap.fromTo(
          image,
          { yPercent: direction * -travel, scale },
          {
            yPercent: direction * travel,
            scale,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub,
            },
          },
        );
      });
    }

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      media.revert();
      context.revert();
    };
  }, [heroRef, projectSpeeds, reduceMotion, rootRef]);
}
