import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

/** Scroll-driven transitions for every section. Skipped entirely under reduced motion. */
export function usePageMotion(scope: RefObject<HTMLElement | null>, filter: string) {
  const first = useRef(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desk: "(min-width: 861px)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          const desk = ctx.conditions.desk;

          /* hero: headline lifts away, widgets drift at different speeds */
          gsap.to(".hero-inner", {
            yPercent: -22,
            opacity: 0,
            scale: 0.94,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 30%", scrub: true },
          });
          if (desk) {
            gsap.utils.toArray<HTMLElement>(".widget").forEach((w, i) =>
              gsap.to(w, {
                y: -70 - (i % 5) * 38,
                ease: "none",
                scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
              }),
            );
          }

          /* section headings: lift in */
          gsap.utils.toArray<HTMLElement>(".work > .filters, .block .lede").forEach((el) =>
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }),
          );

          /* project cards: staggered rise with a slight tilt */
          gsap.set(".card", { y: 70, opacity: 0, scale: 0.95, rotate: (i) => (i % 2 ? 1.2 : -1.2) });
          ScrollTrigger.batch(".card", {
            start: "top 92%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.14,
                clearProps: "transform,opacity",
              }),
          });
          /* parallax inside each cover */
          gsap.utils
            .toArray<HTMLElement>(".cover.phones img, .cover.web .browser, .cover.plain span")
            .forEach((el) =>
              gsap.fromTo(
                el,
                { yPercent: 7 },
                {
                  yPercent: -7,
                  ease: "none",
                  scrollTrigger: { trigger: el.closest(".card"), start: "top bottom", end: "bottom top", scrub: true },
                },
              ),
            );

          /* experience */
          gsap.from(".about-copy p", {
            y: 36,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-grid", start: "top 85%", once: true },
          });
          gsap.from(".skills", {
            x: 60,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-grid", start: "top 85%", once: true },
          });
          gsap.utils.toArray<HTMLElement>(".timeline li").forEach((li) =>
            gsap.from(li, {
              x: -40,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: li, start: "top 92%", once: true },
            }),
          );

          /* art: tiles pop in from the middle, playlists slide up */
          gsap.set(".art-grid button", { scale: 0.8, opacity: 0, rotate: (i) => (i % 2 ? 4 : -4) });
          ScrollTrigger.batch(".art-grid button", {
            start: "top 92%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                scale: 1,
                opacity: 1,
                rotate: 0,
                duration: 0.9,
                ease: "back.out(1.4)",
                stagger: { each: 0.07, from: "center" },
                clearProps: "transform,opacity",
              }),
          });
          gsap.from(".playlists > div", {
            y: 50,
            opacity: 0,
            stagger: 0.14,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".playlists", start: "top 88%", once: true },
          });

          /* footer: rounds off as it arrives, contents rise */
          gsap.fromTo(
            ".footer",
            { borderTopLeftRadius: 72, borderTopRightRadius: 72 },
            {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              ease: "none",
              scrollTrigger: { trigger: ".footer", start: "top 100%", end: "top 30%", scrub: true },
            },
          );
          gsap.from(".footer-hello a", {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".footer-hello", start: "top 80%", once: true },
          });
          gsap.from(".footer-lists > div", {
            y: 50,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".footer-lists", start: "top 90%", once: true },
          });
        },
      );
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
        { y: 30, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", clearProps: "transform,opacity" },
      );
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [filter] },
  );
}
