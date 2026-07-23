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
      const heroEntrance = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      heroEntrance
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

      const revealElements = gsap.utils.toArray<HTMLElement>(
        "[data-reveal], .home-clients-title-block > *, .home-story-list, [data-service-grid]",
      );

      revealElements.forEach((element, index) => {
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

      const introContent = root.querySelector<HTMLElement>(".home-intro-content");
      const portfolioSection = root.querySelector<HTMLElement>(".home-portfolio");
      if (portfolioSection) {
        const syncPortfolioVisibility = (visible: boolean) => {
          portfolioSection.style.visibility = visible ? "" : "hidden";
        };
        const syncIntroVisibility = (visible: boolean) => {
          if (introContent) introContent.style.visibility = visible ? "" : "hidden";
        };

        syncIntroVisibility(false);
        syncPortfolioVisibility(false);

        ScrollTrigger.create({
          trigger: ".home-intro",
          start: "top 1px",
          end: "bottom top",
          onEnter: () => {
            syncIntroVisibility(true);
            syncPortfolioVisibility(false);
          },
          onEnterBack: () => {
            syncIntroVisibility(true);
            syncPortfolioVisibility(false);
          },
          onLeave: () => {
            syncIntroVisibility(false);
            syncPortfolioVisibility(true);
          },
          onLeaveBack: () => {
            syncIntroVisibility(false);
            syncPortfolioVisibility(true);
          },
          onRefresh: (self) => {
            const isActiveIntro = self.isActive && window.scrollY >= self.start;
            syncIntroVisibility(window.scrollY >= self.start && window.scrollY < self.end);
            syncPortfolioVisibility(!isActiveIntro);
          },
        });
      }

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
    }, rootRef);

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add("(max-width: 767px)", () => {
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

        ScrollTrigger.create({
          trigger: ".home-intro",
          start: "top top",
          end: "bottom top",
          pin: ".home-intro-content",
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.to(".home-intro-content", {
          y: -360,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-intro",
            start: "70% top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.utils.toArray<HTMLElement>(".home-portfolio-canvas--mobile [data-project-card]").forEach((card, index) => {
          gsap.from(card, {
            y: 88,
            duration: 0.86,
            delay: index * 0.055,
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
            { yPercent: direction * -2.5, scale: 1.06 },
            {
              yPercent: direction * 2.5,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            },
          );
        });
      }, rootRef);

      return () => {
        mobileContext.revert();
      };
    });

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

        if (window.matchMedia("(max-width: 2199px)").matches) {
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

        ScrollTrigger.create({
          trigger: ".home-intro",
          start: "top top",
          end: "bottom top",
          pin: ".home-intro-content",
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.to(".home-intro-content", {
          y: -760,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-intro",
            start: "70% top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.utils.toArray<HTMLElement>(".home-portfolio-canvas--desktop [data-project-card]").forEach((card, index) => {
          gsap.from(card, {
            y: 96,
            duration: 0.95,
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
            { yPercent: direction * -3.5, scale: 1.08 },
            {
              yPercent: direction * 3.5,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
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
