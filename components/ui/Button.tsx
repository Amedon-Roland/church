"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "relative overflow-hidden font-bold uppercase tracking-widest rounded-sm transition-all duration-300 inline-flex items-center justify-center group";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:shadow-[0_0_20px_rgba(55,83,157,0.5)] hover:scale-105",
    secondary: "bg-secondary text-white hover:shadow-[0_0_20px_rgba(191,139,37,0.5)] hover:scale-105",
    tertiary: "bg-[#512b18] text-white hover:bg-[#3e2112] hover:scale-105",
  };

  const sizeStyles = {
    sm: "px-6 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-sm",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.button>
  );
}
