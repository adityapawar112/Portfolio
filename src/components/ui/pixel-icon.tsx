import type { CSSProperties } from "react";

interface PixelIconProps {
  className?: string;
  source: string;
}

export function PixelIcon({ className = "", source }: PixelIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`pixel-icon ${className}`}
      style={{ "--pixel-icon": `url("${source}")` } as CSSProperties}
    />
  );
}
