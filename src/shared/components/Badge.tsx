import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{ variant?: "default" | "accent" | "success" }>;

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-600 dark:bg-lift dark:text-slate-300",
    accent: "bg-accent-soft text-accent-dark dark:bg-[#172c52] dark:text-blue-300",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
