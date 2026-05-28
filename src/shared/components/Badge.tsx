import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{ variant?: "default" | "accent" | "success" }>;

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-[#f5f5f4] text-muted-dark dark:bg-panel dark:text-muted",
    accent: "bg-accent-soft text-accent-dark dark:bg-[#022c22] dark:text-teal-300",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
