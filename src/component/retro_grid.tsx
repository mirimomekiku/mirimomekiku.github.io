interface RetroGridProps {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
}

export function RetroGrid({
  className = "",
  angle = 70,
  cellSize = 50,
  opacity = 0.5,
  lightLineColor = "rgba(244,114,182,0.3)",
}: RetroGridProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{ perspective: "200px" }}
    >
      <div
        className="absolute inset-0"
        style={{ transform: `rotateX(${angle}deg)` }}
      >
        <div
          className="animate-grid"
          style={{
            backgroundImage: `linear-gradient(to_right, ${lightLineColor} 1px, transparent 0), linear-gradient(to_bottom, ${lightLineColor} 1px, transparent 0)`,
            backgroundRepeat: "repeat",
            backgroundSize: `${cellSize}px ${cellSize}px`,
            height: "300vh",
            width: "600vw",
            marginLeft: "-200%",
            transformOrigin: "100% 0 0",
            opacity,
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff5f7]/60 to-[#fff5f7]" />
    </div>
  );
}
