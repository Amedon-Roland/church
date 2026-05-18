"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "gold" | "ink" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  withArrow?: boolean;
}

export function Button({
  children,
  variant = "gold",
  size = "md",
  className,
  onClick,
  type = "button",
  fullWidth = false,
  withArrow = false,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-full overflow-hidden group transition-all duration-300 will-change-transform";

  const variants = {
    gold: "btn-gold",
    ink: "btn-ink",
    ghost: "btn-ghost",
    outline:
      "bg-transparent text-txt-main border border-border-strong hover:border-secondary hover:text-secondary",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-sm",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        )}
      </span>
    </motion.button>
  );
}
