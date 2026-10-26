import { useRef } from "react";
import { Flip, gsap, ScrollTrigger, useGSAP } from "../lib/animation";

/** Capture before a React update; animate the resulting geometry after commit. */
export function useAnimatedLayout(key: string, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const snapshot = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const previousHeight = useRef(0);
  const animation = useRef<gsap.core.Timeline | null>(null);

  function capture() {
    const element = ref.current;
    if (!element || !enabled) return;
    animation.current?.progress(1);
    gsap.killTweensOf(element);
    gsap.set(element, { clearProps: "height" });
    previousHeight.current = element.offsetHeight;
    snapshot.current = Flip.getState(
      element.querySelectorAll("[data-layout-item]"),
    );
  }

  useGSAP(
    () => {
      const element = ref.current;
      const state = snapshot.current;
      snapshot.current = null;
      if (!element || !state || !enabled) {
        ScrollTrigger.refresh();
        return;
      }

      const nextHeight = element.offsetHeight;
      animation.current = Flip.from(state, {
        targets: element.querySelectorAll("[data-layout-item]"),
        duration: 0.65,
        ease: "power3.inOut",
        scale: true,
        nested: true,
        prune: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 24, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              stagger: 0.025,
              clearProps: "transform,opacity,visibility",
            },
          ),
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.fromTo(
        element,
        { height: previousHeight.current },
        {
          height: nextHeight,
          duration: 0.65,
          ease: "power3.inOut",
          clearProps: "height",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    },
    { scope: ref, dependencies: [key, enabled], revertOnUpdate: true },
  );

  return { ref, capture };
}
