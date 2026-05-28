import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl bg-surface shadow-card dark:bg-panel ${className}`}>
      {children}
    </div>
  );
}
