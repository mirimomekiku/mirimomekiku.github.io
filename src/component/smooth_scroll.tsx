import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "../lib/gsap";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function SyncScrollTrigger() {
  useLenis(ScrollTrigger.update);
  return null;
}

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<LenisRef>(null);
  const skip = reduced();

  useEffect(() => {
    if (skip) return;
    const raf = (time: number) => lenis.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, [skip]);

  if (skip) return <>{children}</>;
  return (
    <ReactLenis
      root
      ref={lenis}
      options={{
        autoRaf: false,
        lerp: 0.09,
        wheelMultiplier: 0.95,
        anchors: { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) },
      }}
    >
      <SyncScrollTrigger />
      {children}
    </ReactLenis>
  );
}
