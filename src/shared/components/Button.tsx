import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary:
      "border border-blue-600 bg-blue-600 text-white shadow-[0_6px_16px_rgba(37,99,235,0.2)] hover:border-blue-700 hover:bg-blue-700 active:bg-blue-800 dark:border-blue-400 dark:bg-blue-500 dark:hover:border-blue-300 dark:hover:bg-blue-400 dark:hover:text-night",
    secondary:
      "border border-[#cbd7e8] bg-white text-ink shadow-sm hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-700 dark:border-[#2a3c59] dark:bg-[#111f35] dark:text-white dark:hover:border-blue-500 dark:hover:bg-[#172842]",
    ghost:
      "border border-transparent text-muted-dark hover:bg-blue-50 hover:text-blue-700 dark:text-muted dark:hover:bg-lift dark:hover:text-blue-300",
    danger:
      "border border-rose-600 bg-rose-600 text-white hover:border-rose-700 hover:bg-rose-700 active:bg-rose-800",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
