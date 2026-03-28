"use client";
import { cn } from "@/lib/utils";
import type React from "react";

interface AuroraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "red" | "green" | "blue" | "gold";
  size?: "sm" | "md" | "lg";
}

const gradients: Record<string, string> = {
  default:
    "conic-gradient(from 0deg, #22E6FF, #2A79FF, #B14CFF, #FF3CAC, #22E6FF)",
  red: "conic-gradient(from 0deg, #FF2D55, #FF6B00, #FF2D55, #cc0000, #FF2D55)",
  green: "conic-gradient(from 0deg, #00FFA3, #1BFFD5, #00ff7f, #00FFA3)",
  blue: "conic-gradient(from 0deg, #2A79FF, #22E6FF, #7DF9FF, #2A79FF)",
  gold: "conic-gradient(from 0deg, #FFD700, #FF6B00, #FFD700, #FFA500, #FFD700)",
};

const glows: Record<string, string> = {
  default: "rgba(34,230,255,0.35)",
  red: "rgba(255,45,85,0.35)",
  green: "rgba(0,255,163,0.35)",
  blue: "rgba(42,121,255,0.35)",
  gold: "rgba(255,215,0,0.35)",
};

const sizes = {
  sm: { px: "14px", py: "7px", fontSize: "12px", borderRadius: "9px" },
  md: { px: "22px", py: "10px", fontSize: "14px", borderRadius: "11px" },
  lg: { px: "30px", py: "13px", fontSize: "15px", borderRadius: "13px" },
};

export function AuroraButton({
  children,
  variant = "default",
  size = "md",
  className,
  style,
  ...props
}: AuroraButtonProps) {
  const sz = sizes[size];
  const gradient = gradients[variant];
  const glow = glows[variant];

  return (
    <button
      className={cn(
        "relative inline-flex cursor-pointer select-none transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      style={{ padding: 0, background: "none", border: "none", ...style }}
      {...props}
    >
      {/* Border container with overflow-hidden */}
      <span
        className="relative inline-flex items-center justify-center overflow-hidden"
        style={{
          borderRadius: sz.borderRadius,
          padding: "2px",
        }}
      >
        {/* Spinning conic gradient — oversized to cover corners */}
        <span
          className="absolute"
          style={{
            inset: 0,
            background: gradient,
            animation: "aurora-spin 3s linear infinite",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
          }}
          aria-hidden="true"
        />
        {/* Dark glass inner layer */}
        <span
          className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold text-white"
          style={{
            background: "rgba(5, 8, 20, 0.88)",
            borderRadius: `calc(${sz.borderRadius} - 2px)`,
            padding: `${sz.py} ${sz.px}`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 18px ${glow}`,
            fontSize: sz.fontSize,
            letterSpacing: "0.01em",
          }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}
