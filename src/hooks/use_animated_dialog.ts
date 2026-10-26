import { useRef } from "react";
import { gsap, useGSAP } from "../lib/animation";

export function useAnimatedDialog(
  open: boolean,
  enabled: boolean,
  onClosed: () => void,
) {
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const callback = useRef(onClosed);
  callback.current = onClosed;

  function finish() {
    closing.current = false;
    ref.current?.close();
    callback.current();
  }

  const { contextSafe } = useGSAP(
    () => {
      const dialog = ref.current;
      if (!dialog || !open) {
        closing.current = false;
        return;
      }
      if (!enabled && closing.current) {
        finish();
        return;
      }
      if (!dialog.open) {
        dialog.showModal();
        dialog.scrollTop = 0;
      }
      if (!enabled) return;

      gsap.fromTo(
        dialog,
        { autoAlpha: 0, y: 28, scale: 0.96, "--backdrop-opacity": 0 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          "--backdrop-opacity": 1,
          duration: 0.42,
          ease: "power3.out",
        },
      );
    },
    { scope: ref, dependencies: [open, enabled], revertOnUpdate: true },
  );

  const close = contextSafe(() => {
    const dialog = ref.current;
    if (!dialog || closing.current) return;
    if (!enabled) return finish();
    closing.current = true;
    gsap.to(dialog, {
      autoAlpha: 0,
      y: 18,
      scale: 0.98,
      "--backdrop-opacity": 0,
      duration: 0.23,
      ease: "power2.in",
      overwrite: true,
      onComplete: finish,
    });
  });

  return { ref, close };
}
