import { useEffect, useRef, useState } from "react";

const letters: Record<string, string[]> = {
  J: ["11111", "00010", "00010", "00010", "10010", "10010", "01100"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
};

function word(text: string, ink: string) {
  return Array.from({ length: 7 }, (_, row) =>
    [...text]
      .map((letter) =>
        [...letters[letter][row]]
          .map((pixel) => (pixel === "1" ? ink : "  "))
          .join(""),
      )
      .join("  "),
  ).join("\n");
}

export function AsciiName({ variant }: { variant: number }) {
  const ink = ["██", "▓▓", "##", "░█"][variant % 4];
  return (
    <pre
      className="ascii-name"
      aria-hidden="true"
    >{`${word("JHON", ink)}\n\n${word("LLOYD", ink)}`}</pre>
  );
}

export function AsciiPortrait() {
  const ref = useRef<HTMLPreElement>(null);
  const [portrait, setPortrait] = useState("  /\\_/\\\n ( o.o )\n  > ^ <");
  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      const width = 48,
        height = 60;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0, width, height);
      const pixels = context.getImageData(0, 0, width, height).data;
      const ramp = "@%#*+=-:. ";
      const lines = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => {
          const index = (y * width + x) * 4;
          if (pixels[index + 3] < 100) return " ";
          const luminance =
            pixels[index] * 0.2126 +
            pixels[index + 1] * 0.7152 +
            pixels[index + 2] * 0.0722;
          return ramp[
            Math.min(
              ramp.length - 1,
              Math.floor((luminance / 256) * ramp.length),
            )
          ];
        }).join(""),
      ).join("\n");
      setPortrait(lines);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        image.src = "/assets/images/avatar-halftone.png";
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      cancelled = true;
      observer.disconnect();
      image.onload = null;
    };
  }, []);
  return (
    <pre
      ref={ref}
      className="ascii-portrait"
      role="img"
      aria-label="ASCII portrait of Jhon Lloyd Viernes"
    >
      {portrait}
    </pre>
  );
}
