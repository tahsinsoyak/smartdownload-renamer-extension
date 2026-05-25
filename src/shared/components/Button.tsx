import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }>;

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.18)] hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400",
    ghost: "bg-white text-slate-700 border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white shadow-[0_10px_22px_rgba(225,29,72,0.18)] hover:bg-rose-700"
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
