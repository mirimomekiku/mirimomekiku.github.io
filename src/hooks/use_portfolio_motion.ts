import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/animation";

export function usePortfolioMotion(
  scope: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onStoryChange: (index: number) => void,
) {
  const introPlayed = useRef(false);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      // Story state stays accurate with motion disabled and during native scrolling.
      root
        .querySelectorAll<HTMLElement>("[data-story]")
        .forEach((story, index) => {
          ScrollTrigger.create({
            trigger: story,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => onStoryChange(index),
            onEnterBack: () => onStoryChange(index),
          });
        });

      if (!enabled) return;
      if (!introPlayed.current) {
        introPlayed.current = true;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".site-header", { y: -16, opacity: 0, duration: 0.65 })
          .from(
            ".hero-line-inner",
            { yPercent: 110, duration: 1.1, stagger: 0.12 },
            0.1,
          )
          .from(
            ".hero-character .avatar img",
            { y: 60, scale: 0.94, opacity: 0, duration: 1.1 },
            0.25,
          )
          .from(".hero-speech", { y: 22, opacity: 0, duration: 0.7 }, 0.65)
          .from(
            ".scroll-note, .hero-bottom",
            { y: 14, opacity: 0, duration: 0.6, stagger: 0.1 },
            0.8,
          );
      }

      gsap.utils
        .toArray<HTMLElement>(
          ".intro-copy, .section-heading, .background-heading h2, .background-lead, .skill-groups, .contact-section h2, .email-button",
          root,
        )
        .forEach((element) =>
          gsap.from(element, {
            y: 36,
            opacity: 0.2,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          }),
        );

      root
        .querySelectorAll<HTMLElement>(".featured-project")
        .forEach((story) => {
          gsap.from(
            story.querySelectorAll(
              ".featured-header, .product-scene, .game-scene, .featured-caption",
            ),
            {
              y: 48,
              opacity: 0,
              duration: 0.95,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: story, start: "top 85%", once: true },
            },
          );
        });

      const desktop = gsap.matchMedia();
      desktop.add("(min-width: 901px)", () => {
        gsap.to(".hero-character", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        root
          .querySelectorAll<HTMLElement>(".featured-project")
          .forEach((story) => {
            const label = story.querySelector(".floating-label");
            if (label)
              gsap.fromTo(
                label,
                { y: 18 },
                {
                  y: -18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: story,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
            const phone = story.querySelector(".game-screen");
            if (phone)
              gsap.fromTo(
                phone,
                { yPercent: 6 },
                {
                  yPercent: -6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: story,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
          });
      });

      return () => desktop.revert();
    },
    { scope, dependencies: [enabled], revertOnUpdate: true },
  );
}
