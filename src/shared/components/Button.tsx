import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary:
      "border border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-700 hover:bg-blue-700 active:bg-blue-800 dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-night",
    secondary:
      "border border-[#ccd7e7] bg-white text-ink hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700 dark:border-lift dark:bg-panel dark:text-white dark:hover:border-blue-500 dark:hover:bg-lift",
    ghost:
      "border border-transparent text-muted-dark hover:bg-blue-50 hover:text-blue-700 dark:text-muted dark:hover:bg-lift dark:hover:text-blue-300",
    danger:
      "border border-rose-600 bg-rose-600 text-white hover:border-rose-700 hover:bg-rose-700 active:bg-rose-800",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
