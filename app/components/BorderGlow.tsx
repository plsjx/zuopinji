"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useCallback, useRef } from "react";

type GlowStyle = CSSProperties & Record<`--${string}`, string | number>;

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
};

const gradientPositions = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "168 65 55",
  backgroundColor = "#0b1019",
  borderRadius = 28,
  glowRadius = 32,
  glowIntensity = 0.7,
  coneSpread = 24,
  colors = ["#39c2b1", "#6ea6ff", "#ff4b32"],
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType === "touch") return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx === 0 ? Number.POSITIVE_INFINITY : cx / Math.abs(dx);
    const ky = dy === 0 ? Number.POSITIVE_INFINITY : cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  const style: GlowStyle = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
  };

  const [h = "168", s = "65", l = "55"] = glowColor.split(/\s+/);
  [100, 60, 40, 20, 10].forEach((opacity, index) => {
    const key = index === 0 ? "--glow-color" : `--glow-color-${opacity}`;
    style[key] = `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * glowIntensity, 100)}%)`;
  });
  gradientPositions.forEach((position, index) => {
    style[`--gradient-${index + 1}`] =
      `radial-gradient(at ${position}, ${colors[colorMap[index] % colors.length]} 0, transparent 52%)`;
  });

  return (
    <div
      ref={cardRef}
      className={`borderGlowCard ${className}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => cardRef.current?.style.setProperty("--edge-proximity", "0")}
    >
      <span className="edgeLight" aria-hidden="true" />
      <div className="borderGlowInner">{children}</div>
    </div>
  );
}
