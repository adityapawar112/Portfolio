import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "default" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

/**
 * Adapted from the MIT-licensed 8bitcn Button component for this Vite project.
 * The nested spans preserve its pixel-corner construction without requiring
 * the full shadcn runtime.
 */
export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`bit-button bit-button-${variant} ${className}`}
      data-slot="8bit-button"
      type="button"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="bit-edge bit-edge-top" />
      <span aria-hidden="true" className="bit-edge bit-edge-bottom" />
      <span aria-hidden="true" className="bit-edge bit-edge-left" />
      <span aria-hidden="true" className="bit-edge bit-edge-right" />
      <span aria-hidden="true" className="bit-corner bit-corner-tl" />
      <span aria-hidden="true" className="bit-corner bit-corner-tr" />
      <span aria-hidden="true" className="bit-corner bit-corner-bl" />
      <span aria-hidden="true" className="bit-corner bit-corner-br" />
    </button>
  );
}
