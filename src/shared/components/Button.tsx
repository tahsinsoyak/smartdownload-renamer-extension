import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400",
    secondary:
      "bg-white text-ink border border-[#e5e5e5] hover:bg-[#fafafa] active:bg-[#f0f0f0] dark:bg-panel dark:text-white dark:border-lift dark:hover:bg-lift dark:active:bg-lift",
    ghost:
      "text-muted-dark hover:text-ink hover:bg-[#f5f5f4] active:bg-[#e5e5e4] dark:text-muted dark:hover:text-white dark:hover:bg-panel dark:active:bg-lift",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-100 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
