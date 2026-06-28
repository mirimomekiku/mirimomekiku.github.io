import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const bubbles: Bubble[] = [];
    const bubbleCount = 20;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 60 + 20,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        if (bubble.x - bubble.radius > canvas.width) bubble.x = -bubble.radius;
        if (bubble.x + bubble.radius < 0) bubble.x = canvas.width + bubble.radius;
        if (bubble.y - bubble.radius > canvas.height) bubble.y = -bubble.radius;
        if (bubble.y + bubble.radius < 0) bubble.y = canvas.height + bubble.radius;

        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `rgba(255, 182, 193, ${bubble.opacity * 1.5})`);
        gradient.addColorStop(0.5, `rgba(255, 192, 203, ${bubble.opacity})`);
        gradient.addColorStop(1, `rgba(255, 218, 233, ${bubble.opacity * 0.3})`);

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.2 }}
    />
  );
}
