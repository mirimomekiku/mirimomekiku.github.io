import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "../lib/animation";

export function usePortfolioMotion(
  scope: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const introPlayed = useRef(false);
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !enabled) return;
      if (!introPlayed.current) {
        introPlayed.current = true;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".site-header", { opacity: 0, y: -10, duration: 0.65 })
          .from(".hero-copy", { opacity: 0, y: 18, duration: 1 }, 0.15)
          .from(".hero-widgets", { opacity: 0, y: 12, duration: 0.75 }, 0.3)
          .from(
            ".hero-scroll, .scene-controls",
            { opacity: 0, y: 8, duration: 0.6 },
            0.6,
          );
      }
      gsap.utils
        .toArray<HTMLElement>(
          ".intro-section > h2, .intro-text, .section-meta, .about-intro, .skill-groups, .contact-heading > h2, .contact-grid",
          root,
        )
        .forEach((element) => {
          gsap.from(element, {
            y: 24,
            opacity: 0.2,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 93%", once: true },
          });
        });
      root.querySelectorAll<HTMLElement>(".case-media").forEach((element) => {
        gsap.from(element, {
          y: 32,
          opacity: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      const desktop = gsap.matchMedia();
      desktop.add("(min-width: 901px)", () => {
        root.querySelectorAll<HTMLElement>(".case-study").forEach((study) => {
          const artwork = study.querySelector(
            ".interface-window, .book-stack, .phone-frame",
          );
          if (artwork)
            gsap.fromTo(
              artwork,
              { yPercent: 3 },
              {
                yPercent: -3,
                ease: "none",
                scrollTrigger: {
                  trigger: study,
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
