import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "compact";
}>;

export function Button({ children, className = "", variant = "primary", size = "default", ...props }: ButtonProps) {
  const compact = size === "compact";
  const variants = {
    primary:
      compact
        ? "border border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-700 hover:bg-blue-700 active:bg-blue-800 dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-night"
        : "border border-blue-600 bg-blue-600 text-white shadow-[0_6px_16px_rgba(37,99,235,0.2)] hover:border-blue-700 hover:bg-blue-700 active:bg-blue-800 dark:border-blue-400 dark:bg-blue-500 dark:hover:border-blue-300 dark:hover:bg-blue-400 dark:hover:text-night",
    secondary:
      compact
        ? "border border-[#ccd7e7] bg-white text-ink hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700 dark:border-lift dark:bg-panel dark:text-white dark:hover:border-blue-500 dark:hover:bg-lift"
        : "border border-[#cbd7e8] bg-white text-ink shadow-sm hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-700 dark:border-[#2a3c59] dark:bg-[#111f35] dark:text-white dark:hover:border-blue-500 dark:hover:bg-[#172842]",
    ghost:
      "border border-transparent text-muted-dark hover:bg-blue-50 hover:text-blue-700 dark:text-muted dark:hover:bg-lift dark:hover:text-blue-300",
    danger:
      "border border-rose-600 bg-rose-600 text-white hover:border-rose-700 hover:bg-rose-700 active:bg-rose-800",
  };
  const sizes = {
    default: "rounded-xl px-3.5 py-2.5 text-[13px]",
    compact: "rounded-lg px-3 py-2 text-sm",
  };

  return (
    <button
      className={`font-display inline-flex cursor-pointer items-center justify-center gap-1.5 font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
