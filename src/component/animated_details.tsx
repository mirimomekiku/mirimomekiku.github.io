import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/animation";

export function AnimatedDetails({
  enabled,
  summary,
  children,
  open = false,
  className = "experience-entry",
}: {
  enabled: boolean;
  summary: ReactNode;
  children: ReactNode;
  open?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const targetOpen = useRef(open);
  const { contextSafe } = useGSAP(
    () => {
      if (!enabled) animation.current?.progress(1);
    },
    { scope: ref, dependencies: [enabled] },
  );

  const toggle = contextSafe((event: MouseEvent<HTMLElement>) => {
    const details = ref.current;
    const body = content.current;
    if (!enabled || !details || !body) return;
    event.preventDefault();
    targetOpen.current = animation.current?.isActive()
      ? !targetOpen.current
      : !details.open;
    animation.current?.kill();
    const height = details.open ? body.getBoundingClientRect().height : 0;
    details.open = true;
    gsap.set(body, { height: "auto", overflow: "hidden" });
    const fullHeight = body.scrollHeight;
    animation.current = gsap.fromTo(
      body,
      { height },
      {
        height: targetOpen.current ? fullHeight : 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          details.open = targetOpen.current;
          gsap.set(body, { clearProps: "height,overflow" });
          ScrollTrigger.refresh();
        },
      },
    );
  });

  return (
    <details
      className={className}
      ref={ref}
      open={open}
      onToggle={() => ScrollTrigger.refresh()}
    >
      <summary onClick={toggle}>{summary}</summary>
      <div ref={content} className="detail-content">
        {children}
      </div>
    </details>
  );
}
