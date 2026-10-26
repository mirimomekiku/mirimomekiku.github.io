import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/animation";
import "lenis/dist/lenis.css";

const options = {
  autoRaf: false,
  lerp: 0.09,
  smoothWheel: true,
  syncTouch: false,
};

export function SmoothScroll({ locked }: { locked: boolean }) {
  const ref = useRef<LenisRef>(null);
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    const update = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    if (locked) lenis?.stop();
    else lenis?.start();
  }, [lenis, locked]);

  useEffect(() => {
    if (!lenis) return;
    function onAnchorClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const hash = anchor.getAttribute("href");
      const target = hash && document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      if (location.hash !== hash) history.pushState(null, "", hash);
      lenis!.scrollTo(target, {
        offset: -24,
        duration: 1.1,
        immediate: anchor.classList.contains("skip-link"),
        onComplete: () => {
          const original = target.getAttribute("tabindex");
          if (original === null) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (original === null)
            target.addEventListener(
              "blur",
              () => target.removeAttribute("tabindex"),
              { once: true },
            );
        },
      });
    }
    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, [lenis]);

  return <ReactLenis ref={ref} root options={options} />;
}
