import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/animation";

export function usePortfolioMotion(
  scope: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onSection: (section: string) => void,
  progress: RefObject<HTMLProgressElement | null>,
  label: RefObject<HTMLSpanElement | null>,
) {
  const introPlayed = useRef(false);
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      root
        .querySelectorAll<HTMLElement>("[data-section]")
        .forEach((element) => {
          ScrollTrigger.create({
            trigger: element,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => onSection(element.dataset.section!),
            onEnterBack: () => onSection(element.dataset.section!),
          });
        });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const value = Math.round(self.progress * 100);
          if (progress.current) progress.current.value = value;
          if (label.current)
            label.current.textContent = `${String(value).padStart(2, "0")}%`;
        },
      });
      if (!enabled) return;
      if (!introPlayed.current) {
        introPlayed.current = true;
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .from(".terminal-header", { opacity: 0, duration: 0.4 })
          .from(".name-button", { opacity: 0, y: 8, duration: 0.8 }, 0.1)
          .from(
            ".role-line, .hero-lead, .hero-detail, .hero-links, .command-nav",
            { opacity: 0, y: 7, duration: 0.6, stagger: 0.08 },
            0.3,
          );
      }
      gsap.utils
        .toArray<HTMLElement>(
          ".section-heading, .about-grid, .skill-groups",
          root,
        )
        .forEach((element) =>
          gsap.from(element, {
            opacity: 0.35,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 95%", once: true },
          }),
        );
    },
    { scope, dependencies: [enabled], revertOnUpdate: true },
  );
}
