import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

/** Scroll-driven transitions for every section. Skipped entirely under reduced motion. */
export function usePageMotion(scope: RefObject<HTMLElement | null>, filter: string) {
  const first = useRef(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* hero: copy lifts away while the engraving drifts slower than the page */
        gsap.to(".hero-inner", {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 20%", scrub: true },
        });
        gsap.to(".hero-art img", {
          yPercent: 10,
          scale: 1.04,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });

        /* section ledes + filters */
        gsap.utils.toArray<HTMLElement>(".section-lede").forEach((el) =>
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }),
        );

        /* tiles and project cards: staggered rise, panels follow a beat later */
        gsap.set(".bento .tile, .card", { y: 60, opacity: 0 });
        ScrollTrigger.batch(".bento .tile, .card", {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform,opacity",
            }),
        });

        /* experience */
        gsap.from(".skills > div", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills", start: "top 88%", once: true },
        });
        gsap.utils.toArray<HTMLElement>(".timeline li").forEach((li) =>
          gsap.from(li, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: li, start: "top 94%", once: true },
          }),
        );

        /* art */
        gsap.set(".art-grid button", { opacity: 0, scale: 0.92 });
        ScrollTrigger.batch(".art-grid button", {
          start: "top 94%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: { each: 0.06, from: "start" },
              clearProps: "transform,opacity",
            }),
        });
        gsap.from(".playlists .tile", {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".playlists", start: "top 90%", once: true },
        });

        /* footer */
        gsap.from(".footer-lists > div", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-lists", start: "top 92%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  /* filtering re-flows the grid: replay a quick entrance for the visible cards */
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", clearProps: "transform,opacity" },
      );
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [filter] },
  );
}
